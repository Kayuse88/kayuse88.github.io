---
layout: post
title: Xaml MVVM 프레임워크 소개
featured-img: prismlibrary.png
categories: MVVM
---

MVVM 디자인 패턴은 장점이 무수히 많아 설명하기 힘들 정도입니다. MVVM 디자인 패턴에 대해 알고 싶다면 [이전 포스트](https://kayuse88.github.io/mvvm-pattern)를 참조해주세요.

MVVM 패턴은 장점도 많지만 손이 많이 간다는 단점이 있습니다. 이런 문제점을 해결하기 위해서 MVVM 프레임워크가 존재합니다. Xaml을 이용하는 .NET 환경에서 인기 있는 프레임워크는 다음과 같이 크게 세 가지가 있습니다.

* MVVM Light Toolkit
* Caliburn.Micro
* Prism Library

WPF에 한정하지 않고 Xaml 프레임워크라고 한 이유는 위 세 프레임워크 모두 WPF 뿐만 아니라 UWP, Xamarin도 지원하기 때문입니다. Silverlight와 Windows Phone도 지원했지만 단종된 플랫폼이기에 더 이상의 지원은 없을 것입니다.

## MVVM Light Toolkit

![MVVMLight](/assets/img/posts/mvvm-framework/mvvmlight.png)
> 공식 홈페이지: <http://www.mvvmlight.net>

MVVM Light Toolkit은 MVVM 프레임 워크 중 아마 가장 널리 알려지고 쓰이는 것으로 유명합니다. Laurent Bugnion란 개발자가 만들었으며, 현재는 Github에 MIT 라이센스로 공개되어 있습니다. 최근에는 업데이트가 거의 없고 상대적으로 다른 프레임워크에 비해 방치된 상태입니다. Light라는 이름답게 MVVM에 꼭 필요한 기능만을 담고 있는 경량 프레임워크입니다. RelayCommand, ViewModelBase, ObservableObject 같은 유명한 구현체 이름이 여기에서 유래한 것이 많습니다. 컨테이너가 자바의 Spring처럼 IoC(Inversion of Control) 기능을 제공하기 때문에 역시 DI(Dependency Injection)를 사용할 수 있습니다. Messenger, NavigationService, EventToCommand 등 대다수의 개념이 이미 정립되고 구현되어 있습니다.

MVVM Light의 단점은 방치된 지 오래되었기에 C#의 발전과 비교해 프레임워크의 코딩 스타일이 낡았고, 메모리 누수 같은 버그가 고쳐지지 않은 상태로 방치되고 있습니다.[출처](https://mikaelkoskinen.net/post/wp7-mvvmlight-eventtocommand-leaking-memory)

## Caliburn.Micro

![Caliburn](/assets/img/posts/mvvm-framework/caliburnmicro.png)
> 공식 홈페이지: <https://caliburnmicro.com>

Caliburn.Micro는 Caliburn에서 이어진 프로젝트로 모든 Xaml 플랫폼을 지원하는 MV* 프레임워크입니다. MV*이라는 것은 MVC, MVP, MVVM등 모든 디자인 패턴을 아우른다는 뜻입니다. Caliburn은 지속적으로 관리가 되고 있으며, MVVM Light만큼이나 가볍다고 느껴집니다.

Caliburn.Micro의 특징은 극도의 편리함입니다.  
예를 들어, 데이터바인딩을 위해 일반적으로는 다음과 같이 Binding을 이용하여 명시적으로 구현합니다.

```xml
<TextBlock Text={Binding Path=Hello}/>
```

> 명시적 바인딩

그러나 Caliburn.Micro에서는 다음과 같이 할 수 있습니다.

```xml
<TextBlock x:Name="Hello">
```

즉 x:Name에 바인딩할 프로퍼티와 같은 이름만 명명해주면 자동으로 바인딩이 됩니다.

그러나 지나치게 편리함을 추구한 나머지 프레임워크에서 간소화한 점이 너무 많아 디버깅 시에 상당히 힘들다는 단점이 있습니다.

## Prism Library

![MVVMLight](/assets/img/posts/mvvm-framework/prismlibrary.png)
> 공식 홈페이지: <https://prismlibrary.github.io>

Prism Library는 .NET Foundation의 관리하에 진행되는 프로젝트입니다. .NET Foundation은 그동안 마이크로소프트가 관리했던 .NET을 좀 더 오픈소스 친화적으로 만들고자 설립한 별도의 조직입니다. .NET Core, 자마린, ASP.NET, ReactiveX(Rx) 등도 이 곳에서 관리됩니다.

Prism은 다른 프레임워크에 비해 상당히 크고 무겁습니다. Enterprise 환경을 염두해 두고 만들었기 때문이며 기능도 상당히 풍부한 편입니다. 실제로 해외에는 Prism 라이브러리를 이용한 상용 WPF 솔루션이 상당히 존재합니다. Prism의 특징은 모듈화가 간편하다는 점입니다. 작은 Prism 모듈들을 조합하여 하나의 큰 솔루션을 만드는 형태입니다. 이러한 모듈을 하나에 모으기 위한 카달로그란 개념이 존재합니다. 그 밖에 Region, Composite Command 등 Prism만의 독특한 개념이 존재하기 때문에 배우기 까다로운 편입니다.

Prism은 기능이 매우 다양하고, MVVM 프레임워크가 제공할 수 있는 거의 모든 것을 제공합니다. 심지어 DI 컨테이너를 Unity 혹은 MEF로 선택까지 할 수 있습니다.

그러나 단점이 없는 것은 아니며, 일단 프레임워크가 지나치게 크고 무겁다는 점이 있습니다. 또한 버전업이 매우 빠른데 Prism 7의 경우 거의 갈아엎다 싶을 정도로 구현 방식이 변경되었습니다. 힘들게 배워도 사용법을 다시 배워야 한다는 점입니다. 그리고 현재(2019. 09.) UWP에 대한 지원은 무기한 연기된 상태입니다. UWP의 난해함으로 인해 코드를 거의 전부 새로 작성해야할 수준이라고 합니다.

## 결론

개인적으로는 중소형 프로젝트에는 Caliburn.Micro를 대형 프로젝트에는 Prism을 추천하고 싶습니다. Caliburn.Micro의 단순함은 작은 프로젝트를 MVVM로 진행할 때 많은 번거로움을 덜어주며, Prism의 모듈화 및 막강한 기능은 대형 엔터프라이즈 프로젝트를 진행할 때 유지보수를 편하게 해줍니다. 직접 예제를 몇 개 따라해보고 어느 프레임워크가 자신에게 더 맞는 지 선택해보면 되겠습니다.
