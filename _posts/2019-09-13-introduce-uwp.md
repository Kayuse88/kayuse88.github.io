---
layout: post
title: Universal Windows Platform이란?
featured-img: universalapps-overview
categories: UWP
---

![UWP-Platform](/assets/img/posts/introduce-uwp/universalapps-overview.png)

UWP 앱은 Windows 10 이후 마이크로소프트 사에서 밀어주고 있는 차세대 범 윈도우 플랫폼입니다.  
윈도우 뿐만 아니라 IoT, Xbox, 서피스, 홀로렌즈, 모바일 등 다양한 환경을 타겟으로 합니다.

마이크로소프트에서 제시하는 UWP 앱의 특징은 다음과 같습니다.

* 보안성: UWP앱은 접근할 데이터와 자원에 대한 선언을 합니다. 따라서 사용자가 이를 허락해야만 접근할 수 있습니다.
* 윈도우 10이 돌아가는 모든 기기에서 같은 API를 호출할 수 있습니다.
* 다양한 화면 크기, 해상도, DPI에 맞춰 UI를 적용할 수 있습니다.
* 마이크로소프트 스토어를 윈도우 10이 돌아가는 모든 기기에서 사용할 수 있으며 앱으로 돈을 벌 다양한 기회를 제공합니다.
* 기기 고장에 대한 위험 요소 없이 어플리케이션 설치 및 제거가 가능합니다.
* 사용성: 라이브 타일, 푸시 알림, 윈도우 타임라인, 코타나의 픽업 기능 등으로 사용성을 끌어냅니다.
* C#, C++, 비주얼 베이직, 자바스크립트로 프로그래밍이 가능합니다. UI의 경우 XAML, HTML, 다이렉트X로 작성할 수 있습니다.

## 보안

윈도우 비스타부터 도입되었던 UAC가 좀 더 강화되었다고 생각하면 됩니다.   안드로이드나 iOS처럼 어플리케이션이 접근하는 시스템 영역을 좀 더 세분화하여 사용자에게 제어 권한을 주게 됩니다.

## 공통 API

같은 .NET 플랫폼을 사용하기 때문에 가능합니다. 최근 마이크로소프트에서 닷넷 5를 발표했는데 닷넷 코어 및 닷넷 프레임워크로 나누어졌던 생태계를 하나의 닷넷으로 통합하려는 움직임입니다. 기존의 닷넷 프레임워크는 윈도우 생태계에 종속적이였고 맥이나 리눅스에서는 모노를 이용한 닷넷 코어쪽을 사용하는 모습이었죠.

## 적응형 컨트롤 및 입력

지금은 대부분의 개발 프레임워크가 지원하는 환경입니다.

![hig-device](/assets/img/posts/introduce-uwp/hig-device-primer.png)

화면 종류 뿐만 아니라 입력에 있어서도 XBOX 컨트롤러, 키보드, 마우스, 터치, 펜 등 다양한 입력 수단을 지원합니다.

## 마이크로소프트 스토어

![MS Store](/assets/img/posts/introduce-uwp/microsoft-store.png)
> 좀 횡한 것 같은데...

마이크로소프트 스토어를 사용할 수 있다는 점인데, 마이크로소프트 스토어를 좀 방치한다는 생각이 들어서 잘 될지는 모르겠습니다. 일단 Windows 10 Mobile의 실패로 인해 모바일에서의 마이크로소프트 스토어는 유명무실해진 상태입니다. PC의 마이크로소프트 스토어도 현재까지는 관리도 잘 안되고 관심도 없어 보입니다. 자사의 게임도 경쟁사인 Steam 등으로 출시하는 상황입니다. 안드로이드의 플레이 스토어도 처음에는 방치한다는 비판을 받았지만 구글이 적극적으로 개선했는데, 마이크로소프트도 이런 행동을 하길 기대합니다.

![Uninstaller](/assets/img/posts/introduce-uwp/programuninstall.png)
>비슷한 기능을 하는 레거시의 프로그램 제거와 모던의 앱 및 기능

어플리케이션이 일종의 샌드박스형식으로 설치, 제거되기 때문에 설치시 레지스트리를 건드려서 제거 때 애를 먹던 이전보다는 많이 편리해졌습니다. 사용자들은 더 이상 제어판의 프로그램 제거나 언인스톨러를 사용할 필요 없이 시작메뉴에서 어플리케이션을 오른쪽 클릭 후 제거만 눌러주면 됩니다. 마치 iOS나 안드로이드에서 X버튼이나 휴지통으로 끌어서 제거하듯이 간편하게 제거할 수 있습니다. 하지만 문제는 아직 윈도우에는 레거시 요소들이 남아있고 프로그램 제거 기능은 남아있습니다. 제어판의 프로그램 제거에서 보이는 목록과 설정의 앱 및 기능에서 보여주는 목록은 다릅니다. 일부 사용자들에겐 레거시와 모던 환경의 공존으로 인한 혼선이 올 수 있습니다.

## 지속적인 사용자 경험

윈도우 10에서 추가된 여러가지 요소인데, 처음에는 UWP 기능으로 홍보하고 사용가능하게 했으나 최근에는 Win32같은 구형 개발환경에서도 Windows 10 API를 호출해서 일부 기능을 사용할 수 있습니다.

![Cortana](/assets/img/posts/introduce-uwp/Windows_Cortana_v20_1920_LaunchCortana_img.jpg)

다만 한국한정으로 아직(2019년 09월 기준) 코타나 기능을 사용할 수 없는 점은 아쉽습니다. 한국MS에서 하루빨리 코타나에게 한국어를 가르쳤으면 합니다.

## 멀티랭귀지

UWP만의 특징이라기 보다는 .NET의 특징 같은 것인데, .NET은 멀티랭귀지 원플랫폼을 지향하기 때문에 다양한 언어로 UWP 앱을 작성할 수 있습니다. 아무래도 많은 개발자 풀을 확보하기 위해서일 것입니다. 다만 이 경우 언어의 파편화 문제가 발생할 수 있는데, 개발자들은 레퍼런스가 필요한데 레퍼런스가 다양한 언어로 흩어져 있는 것은 좋지 않습니다. 예를 들어 UWP의 C++/WinRT의 레퍼런스는 현재 턱없이 부족하기 때문에 C# 레퍼런스를 참고해서 개발해야 합니다.

![Win10Calc](/assets/img/posts/introduce-uwp/win10-calc.png)
>윈도우10의 계산기 앱이 C++/WinRT로 작성되었습니다.

## 미래

UWP의 전망이 아직은 밝지는 않아보입니다. 마이크로소프트도 자사의 VS Code를 일렉트론으로 제작하여 배포하고 있으며, 브라우저인 엣지도 UWP 기반에서 크로미움으로 갈아타면서 Win32기반으로 바뀔 예정입니다. VS Code는 리눅스와 맥 환경을 지원하기 위해 어쩔 수 없는 선택이지만, 다시 말하면 최근 대세인 크로스플랫폼에 있어서 Windows 10 전용으로 나오는 UWP는 큰 단점을 가지는 셈입니다. 포팅을 통해 UWP버전 앱을 만드는 방법도 있고 자마린의 경우 UWP를 완벽히 지원하는 등 이런 단점을 개선하려는 움직임도 있습니다. UWP의 밝은 미래를 위해서 플랫폼 홀더인 마이크로소프트가 많은 지원을 아끼지 않았으면 합니다.

### Reference

<https://docs.microsoft.com/ko-kr/windows/uwp/get-started/universal-application-platform-guide>
<https://www.windowscentral.com/microsoft-confirms-plans-rebuild-edge-ground-using-chromium-windows-10>
<https://blogs.windows.com/windowsdeveloper/2019/03/06/announcing-the-open-sourcing-of-windows-calculator/>
<https://en.wikipedia.org/wiki/Visual_Studio_Code>