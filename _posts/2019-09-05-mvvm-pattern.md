---
layout: post
title: MVVM이란 무엇인가?
featured-img: msdn-mvvm-pattern.png
categories: 디자인패턴 MVVM
---

WPF를 개발하려고 도전하는 분들은 한 번쯤 MVVM이란 말을 들어봤을 겁니다. 최근에는 안드로이드와 iOS 개발에서도 많이 유행하고 있지만, MVVM 패턴을 제대로 구현한 프레임워크는 WPF가 최초입니다.

개념적인 원리는 마틴 파울러(Martin Fowler)가 2004년에 프리젠테이션 모델(PM)을 통해 선보였습니다. PM 모델은 MVP와 유사했습니다. 특이한 점은 PM이라는 레이어가 뷰의 추상화 계층을 담당하고 뷰는 단지 PM을 렌더링하는 역할일 뿐입니다.

2005년에 WPF와 실버라이트 설계자인 존 고스맨(John Gossman)에 의해 MVVM 패턴이 공개되었습니다. MVVM의 핵심 역시 뷰를 추상화한 뷰모델이 존재하고, 뷰모델에서는 뷰의 상태와 행동을 정의합니다. 파울러는 PM모델이 플랫폼에 독립적인 UI를 생성하기 위한 패턴으로 소개했다면, 고스맨은 사용자 인터페이스를 간단하게 생성하기 위해 MVVM을 소개했습니다.

일반적인 MVC 패턴으로 애플리케이션을 개발하다 MVVM을 사용하게 되면 많이 당황하게 됩니다. 일반적인 기초 입문 서적은 코드에서 뷰를 참조하고 사용자 입력에 대한 입력을 코드에서 처리한 다음 결괏값을 직접 뷰에 갱신하도록 안내하고 있습니다. 이런 방식의 개발은 직관적이고 코드가 간단해진다는 장점이 있지만, 좀 더 큰 규모의 프로젝트를 구현할 때는 오히려 작업량이 많아질뿐더러, UI와의 결합 때문에 테스트에 있어 단점이 됩니다.

## MVC (Model-View-Controller)

![MVC Pattern][mvc]

[mvc]: /assets/img/posts/mvvm-pattern/mvcpattern.png "MVC Pattern"

MVC패턴은 70년대에 그 개념이 정립되었을 만큼 오래된 고전적인 패턴입니다. 획기적인 개발은 잘했지만 상용화는 못 하기로 유명한 제록스 연구소에서 개발되었습니다. MFC를 이용한 개발이 대세였을 때 많이 쓰였으며, 최근까지도 모바일 및 웹에서 쓰고 있습니다.

Model은 데이터를 담당합니다.

View는 사용자에게 표시되는 영역입니다.

Controller는 MVC의 특징으로 사용자의 입력을 받아 처리하기도 하고 모델에서 넘어온 결과를 뷰에 반영하도록 지시하기도 합니다. 간단하게 모델과 뷰를 컨트롤한다고 생각하면 쉽습니다.

## MVP (Model-View-Presenter)

![MVP Pattern][mvp]

[mvp]: /assets/img/posts/mvvm-pattern/mvppattern.png "MVP Pattern"

Presenter는 Contoller와 비슷한 역할을 하는 것처럼 보이지만, Controller가 하는 것보다는 중재자의 역할에 가깝습니다. 뷰와 모델은 서로를 알지 못하고 프레젠터를 통해 한다리 건너서 상호작용을 하게 됩니다.
프레젠터는 컨트롤러와 다르게 뷰의 내용을 직접적으로 참조하지 않고 대신 간접적으로 명령만 내리게 됩니다. 따라서 UI 종속적인 코드가 제거되기 때문에 테스트가 훨씬 용이합니다.

## MVVM (Model-View-ViewModel)

![MVVM Pattern][mvvm]

[mvvm]: /assets/img/posts/mvvm-pattern/mvvmpattern.png "MVVM Pattern"

ViewModel은 View의 추상화 계층입니다. 뷰모델은 뷰를 알지 못하고 단지 Notify만 하게 됩니다. 등록된 뷰가 이를 확인하고 스스로 결과를 반영하여 사용자에게 보여줍니다.

MVVM이 MVP에 비해 갖는 장점은 여기에 있습니다. 프레젠터는 UI 종속적인 코드를 제거했지만 결국 뷰 자체를 참조해야만 합니다. 그렇기 때문에 플랫폼에 종속적인 구조를 가질 수 밖에 없습니다. 하지만 뷰모델은 아예 뷰를 참조할 필요가 없이 그냥 자신이 할 일만 하면 됩니다.

![.NET 5 Platform][net5]

[net5]: /assets/img/posts/mvvm-pattern/dotnet5_platform.png ".NET 5"

이런 방식으로 구조를 설계하면 하나의 뷰모델에 다양한 뷰를 사용할 수 있습니다. 즉 .NET에서 추구하는 멀티플랫폼에 적합한 구조라고 할 수 있습니다. MS에서는 .NET을 통해 모바일, 콘솔, 데스크톱, 웹, TV, HMD 등 다양한 사용자 환경을 통합하려 합니다. 만약 이런 환경별로 개별적으로 개발하고 테스트한다면 많은 리소스가 요구되겠지만, MVVM 패턴으로 동일한 뷰모델을 사용하고 단지 기기별로 다른 뷰만 사용하면 훨씬 개발이 편리해지겠습니다.

## 마치며

이것저것 많은 내용을 설명해드렸지만 간단하게 말하자면 이렇습니다.

만약 애플리케이션을 개발하고자 한다면 꼭 MVVM 패턴을 적용해서 개발하기를 추천합니다. 회사에서 개발하고자 하는 상용프로젝트나 오픈소스로 공개되는 프로젝트들은 이런 방식으로 개발하는 것이 훨씬 좋다고 보면 됩니다.

물론 간단한 보조 툴을 만들어서 작업하려는데 MVVM 패턴을 적용해 개발하는건 건 닭 잡는데 소잡는 칼 쓰는 격이 될 수 있습니다. 그리고 반드시 MVVM을 써야만 하는 것도 아닙니다. 상황에 따라 어떤 디자인 패턴을 쓰고 개발하는게 최적인지를 판단하는게 개발자의 제일 중요한 역량이 아닐까 합니다.

### Reference

<https://msdn.microsoft.com/en-us/magazine/dd419663.aspx>
<https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter>
<https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel>
<https://devblogs.microsoft.com/dotnet/introducing-net-5>
