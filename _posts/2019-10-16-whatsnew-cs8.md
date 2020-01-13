---
layout: post
title: C# 8.0 무엇이 달라졌을까
featured-img: cs8logo.png
categories: C#
---

.NET Core 3.0 버전이 정식 출시되었습니다. 더불어 C# 8.0에 대한 프리뷰 버전을 지원합니다. C#은 언어의 발전 속도가 매우 빠른 것 같습니다. C#이 첫 선을 보인 것이 2003년인데 16년 동안 7번의 메이저 버전업이 있었습니다.

## readonly 멤버

readonly 키워드를 구조체의 멤버에 적용할 수 있습니다. 구조체의 상태값을 변경시키지 않는 다는 의미로 명시적으로 readonly 키워드를 붙여줄 수 있습니다.

```cs
public struct Point
{
    public double X { get; set; }
    public double Y { get; set; }
    public double Distance => Math.Sqrt(X * X + Y * Y);

    public override string ToString() =>
        $"({X}, {Y}) is {Distance} from the origin";
}
```

ToString 메소드는 Point 구조체의 어떤 상태도 변경하지 않기 때문에 readonly를 붙여줄 수 있습니다.

```cs
public readonly override string ToString() =>
        $"({X}, {Y}) is {Distance} from the origin";
```

구조체의 상태 값을 변경시키는 경우에는 컴파일 에러가 납니다.  
다음 함수는 X, Y의 값을 변경시키기 때문에 readonly 키워드를 붙일 경우 컴파일되지 않습니다.

```cs
public readonly void Translate(int xOffset, int yOffset)
{
    X += xOffset;
    Y += yOffset;
}
```

사실 readonly를 붙이지 않아도 상관없어 보이는 함수에 readonly를 붙여서 얻는 이득은 무엇일까요? 컴파일러에게 함수의 디자인 의도를 명시적으로 전달하여 이에 따라 최적화하기 위해서라고 MSDN에서는 설명합니다.

## 기본 인터페이스 멤버

기본적으로 인터페이스는 메소드를 구현할 수 없습니다. 메소드를 구현하기 위해서는 추상 클래스(abstract class)를 사용해야 했습니다. C# 8.0부터는 인터페이스도 구현이 가능합니다.

## 더 많은 패턴

### 스위치 표현식

switch문을 표현하는 다른 방법이 추가되었습니다. 전통적인 방법은 다음과 같이 switch, case, default로 구성되었습니다.

```cs
public static RGBColor FromRainbowClassic(Rainbow colorBand)
{
    switch (colorBand)
    {
        case Rainbow.Red:
            return new RGBColor(0xFF, 0x00, 0x00);
        case Rainbow.Orange:
            return new RGBColor(0xFF, 0x7F, 0x00);
        case Rainbow.Yellow:
            return new RGBColor(0xFF, 0xFF, 0x00);
        case Rainbow.Green:
            return new RGBColor(0x00, 0xFF, 0x00);
        case Rainbow.Blue:
            return new RGBColor(0x00, 0x00, 0xFF);
        case Rainbow.Indigo:
            return new RGBColor(0x4B, 0x00, 0x82);
        case Rainbow.Violet:
            return new RGBColor(0x94, 0x00, 0xD3);
        default:
            throw new ArgumentException(message: "invalid enum value", paramName: nameof(colorBand));
    };
}
```

상당히 코드가 길어졌습니다. 스위치 표현식은 이를 다음과 같이 간략하게 표련합니다.

```cs
public static RGBColor FromRainbow(Rainbow colorBand) =>
    colorBand switch
    {
        Rainbow.Red    => new RGBColor(0xFF, 0x00, 0x00),
        Rainbow.Orange => new RGBColor(0xFF, 0x7F, 0x00),
        Rainbow.Yellow => new RGBColor(0xFF, 0xFF, 0x00),
        Rainbow.Green  => new RGBColor(0x00, 0xFF, 0x00),
        Rainbow.Blue   => new RGBColor(0x00, 0x00, 0xFF),
        Rainbow.Indigo => new RGBColor(0x4B, 0x00, 0x82),
        Rainbow.Violet => new RGBColor(0x94, 0x00, 0xD3),
        _              => throw new ArgumentException(message: "invalid enum value", paramName: nameof(colorBand)),
    };
```

기존 방식과 몇 가지 차이점이 눈에 띕니다.

* 변수가 switch 키워드 앞에 옵니다. 순서가 다르기 때문에 스위치 표현식과 스위치문을 눈으로 구분할 수 있습니다.
* case와 :는 =>로 대체됩니다.
* 간략화된 표현식에서 _는 default를 의미합니다.
* 구문이 아닌 표현식입니다.

### 프로퍼티 패턴

프로퍼티 패턴은 스위치 표현식에서 객체 자체를 검사하는 것이 아닌 객체의 특정 프로퍼티를 검사합니다. 다음 예문은 switch 표현식으로 Address 클래스의 State라는 프로퍼티로 분기를 타게 됩니다.

```cs
public static decimal ComputeSalesTax(Address location, decimal salePrice) =>
    location switch
    {
        { State: "WA" } => salePrice * 0.06M,
        { State: "MN" } => salePrice * 0.75M,
        { State: "MI" } => salePrice * 0.05M,
        // other cases removed for brevity...
        _ => 0M
    };
```

### 튜플 패턴

몇몇 알고리즘은 여러 입력값이 필요할 때가 있습니다. 튜플 패턴은 두 가지 이상의 값을 한 번에 표현할 때 사용할 수 있습니다. 다음 스위치 표현식은 두 값을 한 번에 검사합니다.

```cs
public static string RockPaperScissors(string first, string second)
    => (first, second) switch
    {
        ("rock", "paper") => "rock is covered by paper. Paper wins.",
        ("rock", "scissors") => "rock breaks scissors. Rock wins.",
        ("paper", "rock") => "paper covers rock. Paper wins.",
        ("paper", "scissors") => "paper is cut by scissors. Scissors wins.",
        ("scissors", "rock") => "scissors is broken by rock. Rock wins.",
        ("scissors", "paper") => "scissors cuts paper. Scissors wins.",
        (_, _) => "tie"
    };
```

### 포지셔널 패턴

튜플 패턴과 유사하게 두 가지 이상의 값을 한 번에 사용하고 싶을 때 포지셔널 패턴을 이용할 수 있습니다. 다음 예문에서 C# 7.0에서 추가된 Deconstruct 메소드를 포지셔널 패턴을 이용해 구현했습니다.

```cs
public class Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y) => (X, Y) = (x, y);

    public void Deconstruct(out int x, out int y) =>
        (x, y) = (X, Y);
}
```

## using 선언

using 선언은 using 키워드로 변수를 선언합니다. 컴파일러에게 해당 스코프가 끝날 때 선언된 변수를 dispose 하도록 알립니다.

```cs
static void WriteLinesToFile(IEnumerable<string> lines)
{
    using var file = new System.IO.StreamWriter("WriteLines2.txt");
    foreach (string line in lines)
    {
        if (!line.Contains("Second"))
        {
            file.WriteLine(line);
        }
    }
    // file is disposed here
}
```

```cs
static void WriteLinesToFile(IEnumerable<string> lines)
{
    using (var file = new System.IO.StreamWriter("WriteLines2.txt"))
    {
        foreach (string line in lines)
        {
            if (!line.Contains("Second"))
            {
                file.WriteLine(line);
            }
        }
    } // file is disposed here
}
```

첫 번째 구문처럼 구현하면 함수 스택이 해제될 때 자원이 같이 해제되지만, 두 번째 구문처럼 괄호를 이용하면 괄호가 끝날 때 해제되는 차이가 있습니다. StreamWriter는 IDisposable을 구현하여 Unmanaged 자원을 다루기 때문에 해제가 필수입니다. 위와 같이 선언하면 자동으로 해제되기 때문에 편리합니다.

## static 로컬 함수

로컬 함수란 클래스 안에 또 클래스를 선언하는 nested 클래스처럼 함수 안에 선언 할 수 있는 함수입니다.

```cs
int M()
{
    int y;
    LocalFunction();
    return y;

    void LocalFunction() => y = 0;  // Local function
}
```

위 예제에서 LocalFunction이 로컬 함수의 예입니다. 로컬 함수는 C# 7.0부터 지원된 기능입니다.

c#에서 static 키워드는 클래스의 전역 멤버로 선언하는 용도로 사용됩니다. 이 static 키워들 로컬 함수에 적용하여 static 로컬 함수를 만들 수 있습니다. static이기 때문에 함수 내의 멤버 변수를 참조하지 않습니다. 현재는 scope 말고는 기존 로컬 함수와의 큰 차이는 없어 보입니다.

```cs
int M()
{
    int y = 5;
    int x = 7;
    return Add(x, y);

    static int Add(int left, int right) => left + right; // Static local function
}
```

## 소멸 가능한 ref struct

ref struct는 한마디로 스택 영역에만 생성될 수 있는 구조체입니다. 힙(heap)공간에 생성이 안되며, 따라서 박싱을 해서는 안됩니다. 일반적으로 클래스는 레퍼런스 타입이라 힙공간에 생성되고 구조체는 밸류 타입이라 스택에 생성된다 생각하지만 이는 잘못된 생각입니다. 박싱을 하게 되면 힙공간에 데이터를 쓰고 그 주소값을 따오기 구조체라도 힙에 생성이 됩니다. 또한 클래스의 필드 멤버로 선언하게 되면 역시 클래스와 같이 힙 공간에 할당이 됩니다. ref struct로 해서는 안되는 것들의 목록은 다음과 같습니다.

* 박싱(Boxing)
* 클래스나 구조체의 멤버로 선언하거나 static 키워드 붙이기
* async 메소드나 람다식의 파라미터로 사용

안되는 게 많아보이는데 할 수 있는 것들은 다음과 같습니다.

* async가 아닌 일반 메소드의 파라미터
* 메소드의 리턴 값
* 로컬 변수

ref키워드로 선언한 struct 구조체는 인터페이스를 구현할 수 없습니다. 그래서 IDisposable도 구현할 수 없습니다. 그렇기 때문에 ref struct를 소멸시킬 수 있도록, 구조체 내에 반드시 void Dispose() 메소드를 가지고 있어야 합니다. readonly ref struct에도 동일하게 적용됩니다.

## Nullable 레퍼런스 타입

일반적으로 밸류 타입은 Non-nullable이고 레퍼런스 타입은 Nullable으로 알고 있습니다. int, char 등은 값이 null일 수 없기에 null을 대입하기 위해서는 ?를 붙여서 사용해야 합니다.

```cs
int a = null; // compile error

int? b = null; // OK

string c = null; // OK

string? d = null; // compile error on C# 7.0
```

C# 8.0에서 string?과 같은 Nullable 레퍼런스 타입이 가능해진다면 언제 사용해야 할까요? C# 8.0에서는 Nullable annotation context라고 하여 Nullable 작동 방식을 설정할 수 있습니다. csproj 파일을 수정하여 Nullable annotation context을 활성화하면 레퍼런스 타입이 기본적으로 Non-nullable이 됩니다. 이럴 때 Nullable 레퍼런스 타입을 사용하여 레퍼런스 타입이 null이 될 수 있음을 명시적으로 표현하게 됩니다.

## 비동기 스트림

스트림(Stream)을 비동기로 사용할 수 있습니다.

* async 키워드를 사용합니다.
* 반환 형식은 IAsyncEnumerable\<T\>입니다.
* 반환할 때 yield return을 사용합니다.

반환식이 일반적인 return이 아니라 yield return인 점이 기존의 async 비동기 메소드와 차이입니다. 실제 예문은 다음과 같습니다.

```cs
public static async System.Collections.Generic.IAsyncEnumerable<int> GenerateSequence()
{
    for (int i = 0; i < 20; i++)
    {
        await Task.Delay(100);
        yield return i;
    }
}
```

## 색인과 범위

어떤 시퀀스에서 특정 원소 또는 범위를 좀 더 쉽게 나타낼 수 있습니다.

* System.Index로 인덱싱을 표현합니다.
* ^ 연산자로 시퀀스의 끝으로부터의 인덱스를 표현할 수 있습니다.
* System.Range로 범위를 표현합니다.
* .. 연산자로 시퀀스의 특정 범위를 표현할 수 있습니다.

다음 예제는 ^ 연산자를 설명해줍니다.

```cs
var words = new string[]
{
                // 시작부터의 인덱스    끝부터의 인덱스
    "The",      // 0                   ^9
    "quick",    // 1                   ^8
    "brown",    // 2                   ^7
    "fox",      // 3                   ^6
    "jumped",   // 4                   ^5
    "over",     // 5                   ^4
    "the",      // 6                   ^3
    "lazy",     // 7                   ^2
    "dog"       // 8                   ^1
};              // 9 (or words.Length) ^0
```

배열의 특정 요소를 다음과 같이 호출할 수 있습니다.

```cs
Console.WriteLine($"The last word is {words[^1]}");
// writes "dog"
```

배열의 일정 범위를 가져오고 싶다면 다음과 같이 사용합니다.

```cs
var quickBrownFox = words[1..4];
```

배열만이 색인과 범위를 지원하는 것이 아닙니다. string 문자열 형식이나 Span\<T\>, ReadOnlySpan\<T\>에도 사용할 수 있습니다. 어느 타입이라도 인덱서를 통해 Index와 Range 파라미터를 구현했다면, 색인과 범위를 적용할 수 있습니다. List\<T\>의 경우 색인은 지원하지만 범위는 지원하지 않습니다.

## null 병합 대입 연산자

??= 이라는 널 병합 대입 연산자를 가집니다. ?? 연산자는 원래 null 병합 연산자라고 해서 연산자 좌측의 식이 null일 경우 연산자 오른쪽의 식을 값을 사용하도록 합니다.

```cs
int? a = null;
int b = a ?? 30;
```

위 예제에서 b는 nullable이 아니기 때문에 a를 그냥 대입하면 컴파일 에러가 발생합니다. 하지만 null 병합 연산자를 써줘서 a가 null이라고 판단될 경우 30을 대입해주기 때문에 문제 없이 컴파일됩니다.

??= 연산자는 좌측에 대입까지 해줍니다.

```cs
a ??= 30;
```

위 식은 아래와 동일합니다.

```cs
if (a == null)
    a = 30;
```

??= 연산자의 결합 방향은 오른쪽입니다.

```cs
a ?? b ?? c
a ??= b ??= c

// 위 식은 아래와 같이 계산.

a ?? (b ?? c)
a ??= (b ??= c)
```

## 관리되지 않는 컨스트럭티드 타입

C# 7.3 이전에는 타입 인자가 하나 이상 있는 컨스트럭티드 타입을 만들 때 관리되지 않는 타입으로 만들 수 없었습니다. 하지만 C# 8.0 부터는 가능합니다.

```cs
public struct Coords<T>
{
    public T X;
    public T Y;
}
```

> 이전에는 Coords\<int\>와 같은 형태는 만들 수 없었습니다.

사용자 정의 구조체가 관리되지 않는 타입 유형(int, byte 같은 built-in 타입이나 enum, pointer 등)을 필드로 포함하면, 제네릭으로 만들 수 없었습니다. C# 8.0에서는 관리되지 않는 컨스트럭티드 타입이 됩니다.

## nested 식의 stackalloc

C# 8.0부터 stackalloc 연산자의 1결과는 System.Span\<T\> 또는 System.ReadOnlySpan\<T\>의 타입을 가집니다.

## Reference

<https://docs.microsoft.com/ko-kr/dotnet/csharp/whats-new/csharp-8>  
<https://devblogs.microsoft.com/dotnet/building-c-8-0/>  
<https://docs.microsoft.com/ko-kr/dotnet/csharp/whats-new/csharp-version-history>  
<https://msdn.microsoft.com/en-us/magazine/mt833440>  
<https://docs.microsoft.com/ko-kr/dotnet/csharp/tutorials/default-interface-members-versions>  
<https://kalapos.net/Blog/ShowPost/DotNetConceptOfTheWeek16-RefStruct>  
<https://dotnetcoretutorials.com/2018/12/19/nullable-reference-types-in-c-8/>
