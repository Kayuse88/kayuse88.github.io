---
layout: post
title: Task.Wait과 await의 차이점
# featured-img:
categories: C# .NET
---

Stack Overflow에서 발견한 흥미로운 질문과 답변입니다.

출처: <https://stackoverflow.com/questions/9519414/whats-the-difference-between-task-start-wait-and-async-await>

.NET 프레임워크 4.5 버전 이후에서는 비동기 프로그래밍을 쉽게 할 수 있도록 async/await 연산자를 사용할 수 있습니다.
또한 System.Threading.Tasks 네임스페이스에는 비동기 작업을 나타내는 Task 클래스를 제공하는데 Task.Wait 메소드를 사용할 수 있습니다.
질문자는 async/await 연산자를 사용하는 것과 해당 메소드를 이용하는 것에 어떤 차이가 있는지 질문합니다.

예시 코드는 다음과 같습니다.

```cs
public void MyMethod()
{
  Task t = Task.Factory.StartNew(DoSomethingThatTakesTime);
  t.Wait();
  UpdateLabelToSayItsComplete();
}

public async void MyMethod()
{
  var result = Task.Factory.StartNew(DoSomethingThatTakesTime);
  await result;
  UpdateLabelToSayItsComplete();
}

private void DoSomethingThatTakesTime()
{
  Thread.Sleep(10000);
}
```

답변으로 채택된 것은 마이크로소프트에서 C# 컴파일러를 개발했던 Eric Lippert란 분의 대답입니다.

>당신은 레스토랑에서 웨이터에게 점심을 주문했습니다. 주문을 건넨 후에, 친구가 들어와 당신 옆에 앉아 대화를 시작했습니다. 당신에겐 두 가지 선택안이 있습니다. 친구를 무시하고 작업이 완료되는 것을 기다리는 것 -- 수프가 도착할 때까지 기다리고, 기다리는 동안 아무것도 하지 않을 수 있습니다. 또는 친구의 말에 대답하고, 친구가 말을 멈췄을 때 웨이터가 수프를 당신에게 가져다주는 것입니다.

>Task.Wait은 작업이 완료될 때까지 블록 상태에 둡니다 -- 작업이 완료될 때까지 친구를 무시하는 것이죠. await은 메시지를 메시지 큐에 넣는 작업을 계속 진행하고, 작업이 완료되었을 때 "그 기다림(await) 뒤에 남은 걸 마저 가져가세요"라고 적힌 메시지를 큐에 넣는 것입니다. 친구랑 이야기하고, 잠깐 대화를 중단했을 때 수프가 도착하는 것이죠.

## 해설

Task.Wait과 await을 레스토랑의 음식 주문에 비유를 해서 설명을 한 것이 재밌습니다. 즉, Task.Wait은 Task가 끝날 때까지 기다리는 블로킹 동기화 방식이고, await은 해당 Task가 완료될 때까지 다른 작업을 진행하다가 작업이 완료되면 해당 작업 이후 남겨진 루틴을 처리하는 논블록 비동기 방식입니다. 함수에 남겨진 루틴을 처리하기 위해 await에 해당되는 작업이 완료되었을 때, 해당 구문으로 돌아가라는 명령을 작업 항목 큐에 삽입하는 것입니다.

## Reference

<https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=netframework-4.8>
<https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/>
