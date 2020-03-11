---
layout: post
title: BaGet을 이용한 NuGet 서버 구축
featured-img: nugetlogo.png
categories: .NET
---

## NuGet

Nuget(이하 누겟)이란 닷넷 프로젝트에서 사용할 수 있는 의존성 관리자입니다. 자바의 메이븐에서 빌드 툴의 기능을 뺀 의존성 관리 기능만 남은 것과 비슷합니다.
비주얼 스튜디오에는 기본적으로 누겟이 탑재되어 있으며, 닷넷 프로젝의 참조 관리를 매우 편하게 할 수 있습니다. 메이븐이나 그래들에서 pom.xml이나 build.gradle에 직접 의존성을 기입하던 것과 달리 GUI 매니저를 제공하고 있으며, NuGet.org에서 패키지 검색 및 업데이트 알림을 쉽게 받을 수 있습니다.

## Private NuGet Server

회사에서 개발한 프로젝트를 누겟으로 배포할 경우 외부로 공개할 라이브러리가 아닌 이상 NuGet.org를 이용할 수 없습니다. 그런 경우 사설 누겟 서버를 설치해서 운용하게 됩니다. 마이크로소프트에서 공식적으로 홍보하는 방법은 다음과 같습니다.

* Local Feeds
* NuGet.Server
* NuGet Gallery
* Azure Artifact
* Github package registry

일단 클라우드 솔루션은 가장 간편하지만 비용이 비쌉니다. 이미 구독 중인 플랜이 있다면 괜찮겠지만, 소규모 스타트업이나 중소기업에서 도입하기는 부담스럽습니다. 마소에서 인수한 깃헙에도 패키지 레지스트리가 있지만, 오픈소스에만 무료로 제공되며 프라이빗 레지스트리의 경우 무료 플랜은 500MB 저장소와 제한이 있습니다.

### Local Feeds

설치형으로 사용할 수 있는 세가지 플랜 중 로컬 피드는 폴더 구조만으로 패키지를 관리하고 파일 공유를 통해 배포하게 됩니다. 가장 단순하지만 양이 늘어날 경우 관리도 힘들고 파일 공유를 이용하기에 보안적으로도 좋지 않습니다.

### NuGet.Server

NuGet.Server는 간단한 웹서버로 api를 제공하며, 구축이 간편한데 NuGet.Server 자체도 누겟 패키지이기 때문에 ASP.NET 웹 어플리케이션을 하나 생성하여 설치만 하면 구성이 끝납니다. ASP.NET 웹 어플리케이션이라 리눅스에서 돌릴 수 없고 오직 닷넷 프레임워크가 설치된 윈도우 서버에서만 돌릴 수 있다는 치명적인 단점이 있습니다. 최근에 시험적으로 윈도우 버전이 지원되기 시작한 도커를 활용하지 못한다는 점도 있으며, 대시보드도 매우 단순하게 현재 정보 및 캐시 삭제 정도만 제공합니다.

### NuGet Gallery

실제 NuGet.org를 구동하는 데 사용되는 프로젝트입니다. 마찬가지로 ASP.NET 웹 어플리케이션으로 리눅스에서는 구동할 수 없으며, 추가적으로 SQL Server 2016 이상의 DB가 필요합니다. 대신 오픈소스 프로젝트이기 때문에 원하는 대로 커스터마이징해서 사용할 수 있다는 장점이 있습니다. .NET Core 프레임워크로 컨버팅하여 멀티 OS 지원을 하고 특정 DB에 대한 의존성만 없앤다면 좀 더 좋은 솔루션이 될 수 있을 것 같습니다.

## BaGet

BaGet(이하 바겟)은 오픈소스 누겟 서버입니다. 마이크로소프트의 누겟 패키지 관리자의 개발자인 Loïc Sharma가 토이 프로젝트로 제작한 프로그램으로 간단한 사용법과 실제 NuGet.org와 매우 유사한 대시보드를 제공하는 것이 장점입니다. ASP.NET Core로 제작되었기 때문에 리눅스 환경에서도 구동 가능하며, 도커를 이용하여 실행할 수 있습니다. 클라우드 친화적으로 설계되어 애져 또는 AWS나 GCP 같은 메이저한 클라우드 플랫폼을 지원합니다.

여기에서는 도커를 이용하여 리눅스에서 로컬 바겟 서버를 구축하는 방법을 설명하겠습니다.

### 설치

도커가 설치된 리눅스 서버가 필요합니다. 도커만 설치되어 있다면 MAC이나 Windows에서도 가능합니다.

먼저 baget.env라는 환경설정 파일을 하나 만들고 다음과 같은 내용을 입력합니다.

```bash
# The following config is the API Key used to publish packages.
# You should change this to a secret value to secure your server.
ApiKey=NUGET-SERVER-API-KEY

Storage__Type=FileSystem
Storage__Path=/var/baget/packages
Database__Type=Sqlite
Database__ConnectionString=Data Source=/var/baget/baget.db
Search__Type=Database
```

다음과 같이 Docker Hub로부터 이미지를 Pull해옵니다.

```bash
docker pull loicsharma/baget
```

이미지를 끌어왔다면 실행시키기만 하면 됩니다.

```bash
docker run --rm --name nuget-server -p 5555:80 --env-file baget.env -v "$(pwd)/baget-data:/var/baget" loicsharma/baget:latest
```

웹브라우저에서 도커를 실행한 PC의 IP 주소:5555를 입력하면 다음과 같은 BaGet 화면을 볼 수 있습니다.

![Baget](/assets/img/posts/baget-nuget/BaGetmain.png)

### Nuget 업로드 및 내려받기

BaGet은 v3 API를 지원하므로 서버 IP와 포트번호에 /v3/index.json을 붙인 주소를 이용하여 목록 조회 및 업로드가 가능합니다.

```html
http://(서버주소):(포트번호)/v3/index.json
```

업로드 시 사용할 API 키는 baget.env에 작성한 값을 사용합니다. 기본값은 NUGET-SERVER-API-KEY이며 보안을 위해 다른 값을 사용할 수 있습니다.

## Reference

<https://docs.microsoft.com/en-us/nuget/hosting-packages/overview>
<https://loic-sharma.github.io/BaGet>
