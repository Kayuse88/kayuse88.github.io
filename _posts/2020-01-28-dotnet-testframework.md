---
layout: post
title: .NET 테스트 프레임워크
featured-img: xunit-logo.png
categories: .NET 테스트
---

## 유닛 테스트

유닛 테스트(Unit Test) 또는 단위 테스트는 프로그램을 작은 단위로 나누어 의도한 대로 동작하는 지 검증하는 작업입니다. TDD와 CI/CD가 주목받으며 단위 테스트는 날이 갈 수록 그 위상과 중요성이 높아지고 있습니다.

.NET에서도 자바의 유명한 JUnit처럼 단위 테스트를 도와주는 프레임워크가 있습니다. 가장 메이저한 몇 가지 테스트 프레임워크를 소개하면 다음과 같습니다.

## MSTest

MSTest는 비주얼 스튜디오에서 기본적으로 제공하는 테스트 프레임워크입니다. 기본 제공되는 테스트 프레임워크답게 비주얼 스튜디오와의 기능적 통합이 잘 되어 있습니다. 테스트 템플릿이 기본 제공되며, 테스트 러너(테스트를 실행하고 결과를 도시해주는 실행 환경) 또한 비주얼 스튜디오에서 제공되며, 쉽게 테스트를 수행하고 결과를 확인할 수 있습니다.

MSTest는 C#과 닷넷을 만든 MS에서 만들었지만, 정작 MS에서도 잘 사용되지 않는 것 같습니다. 다음은 C# 컴파일러인 Roslyn의 단위 테스트 코드 중 하나입니다.

```cs
using Roslyn.Test.Utilities;
using System;
using System.Collections.Concurrent;
using Xunit;

namespace Microsoft.CodeAnalysis.UnitTests
{
    public class EventListenerGuard
    {
        /// 주석...
        [WorkItem(8936, "https://github.com/dotnet/roslyn/issues/8936")]
        [Fact]
        public void GuardAgainstRace()
        {
            // This code will trigger the load of CDSCollectionETWBCLProvider
            var dictionary = new ConcurrentDictionary<int, int>();
            dictionary.Clear();

            var log = typeof(ConcurrentDictionary<int, int>)
                .Assembly
                .GetType("System.Collections.Concurrent.CDSCollectionETWBCLProvider")
                .GetField("Log", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static)
                .GetValue(null);
            Assert.NotNull(log);
        }
    }
}
```

Roslyn은 오픈 소스로 전향되어 닷넷 파운데이션에서 관리하지만 실제 대부분의 개발에는 MS의 엔지니어들이 개발에 참여합니다. 위 코드도 3명의 MS 엔지니어들이 작성한 코드입니다. MSTest는 VS에서 기본 제공되는데도 불구하고 왜 서드파티 프레임워크가 더 널리 사용될까 하는 의문이 있었습니다. 뒤에 소개될 NUnit과 xUnit의 장점을 읽어보게 되면 왜 더 이상 MSTest가 사용되지 않는지 알 수 있습니다.

## NUnit

NUnit은 닷넷에서 가장 인기있는 단위 테스트 프레임워크입니다. JUnit의 닷넷 포팅버전으로 시작하여 지금은 닷넷 플랫폼의 많은 기능들을 지원하고 있습니다. 2002년에 첫 버전이 발표되었기에 많은 레퍼런스와 문서화된 자료가 있습니다. 강력한 JUnit의 포팅 버전 답게 NUnit도 많은 장점을 가지고 있습니다. MSTest와 비교할 때 다음과 같은 장점이 있습니다.

* 속도가 빠르다
* [TestCase](NUnit 3.0에서는 [Theory])를 통한 패러미터화된 테스트
* Assert.Throws를 이용한 예외 발생 확인
* 32비트와 64비트를 지원한다.
* 추상 클래스를 TestFixture로 지정하여 상속 가능
* private 클래스를 TestFixture로 지정 가능
* 좀 더 다양한 Assert 구문
* 병렬화된 테스트 수행

위의 예시 중 몇 가지는 현재 MSTest에서도 가능한 항목입니다. 하지만 NUnit의 빠르고 기민한 업데이트로 인해, 정체되었던 MSTest보다 개발자들의 지지를 더 얻을 수 있었습니다. 하지만 NUnit에서의 한계를 느끼고 몇몇 개발자들이 새로운 테스트 프레임워크를 창조했습니다.

## xUnit

xUnit은 NUnit v2 의 개발자가 만든 테스트 프레임워크입니다. 좀 더 TDD에 적합한 모던한 테스트 프레임워크로 최근 인기를 많이 얻었습니다.

현재 .NET 환경에서 테스트 프레임워크를 사용해야한다면 단연 추천하는 프레임워크입니다. xUnit의 장점은 무수히 많습니다.

* Resharper, CodeRush, TestDriven.NET, Xamarin과 같은 현대적인 플러그인, 프레임워크와의 자연스러운 융합  
(실제로 테스트 러너가 제공되는 Resharper와 같은 플러그인이 있다면, 테스트를 수행할 때 xUnit의 테스트 러너를 별도로 설치할 필요도 없음)
* (중요)간결한 테스트 구문으로 테스트 코드 생산성 향상
* 지속적인 업데이트 및 커뮤니티의 지원

간결한 테스트 구문이 매우 큰 장점입니다. 고작 구문이 간결한게 장점이 될까라고 생각할 수도 있지만, 간결한 구문에서 나오는 생산성과 배우기 쉽다는 점은 정말 중요하다고 생각합니다. 파이썬과 루비같은 생산성 높은 스크립트 언어가 대세가 된 개발 패러다임을 생각한다면 이 점은 절대 간과할 수 없습니다.

예를 들어 NUnit 또는 MSTest에서 테스트를 위한 사전 준비작업은 \[SetUp\], \[TestInitialize\] 같은 어트리뷰트를 이용하여 수행합니다. 그러나 xUnit에서는 테스트를 수행할 Class의 생성자에서 준비 작업을 수행하면 됩니다. 매우 직관적으로 이해할 수 있는 흐름입니다.

또한 xUnit의 가장 근본적인 차이점은 바로 테스트 메소드 중심의 테스트 구현이라는 것입니다. NUnit과 MSTest는 테스트를 구현하기 위해서는 먼저 테스트 메소드들이 포함될 테스트 클래스를 선언해야 했습니다. 하지만 xUnit은 그런 테스트 클래스가 필요 없으며, 모든 어셈블리의 public 클래스에 존재하는 테스트 메소드를 찾아서 테스트를 수행합니다. 각각의 테스트 메소드를 수행할 때마다 해당 메소드가 포함된 클래스의 새로운 인스턴스를 생성하기 때문에 고립된 환경에서 병렬적으로 단위 테스트를 수행할 수 있습니다. TDD 환경에 매우 적합한 모던한 테스트 프레임워크라 할 수 있습니다.

TDD가 널리 알려지고 대중화된 요즘에 .NET에서의 테스트를 구현한다면 xUnit을 사용해 볼 것을 꼭 권합니다.

## Reference

<http://georgemauer.net/2015/05/01/why-not-mstest>  
<https://osherove.com/blog/2010/3/5/nunit-vs-mstest-nunit-wins-for-unit-testing.html>  
<https://xunit.net/docs/comparisons>
