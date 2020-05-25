---
layout: post
title: 이진 힙(Binary Heap)
featured-img: Heap_add_step2.png
categories: 알고리즘 자료구조
---

## 힙(Heap)

힙(Heap)이란 트리 기반 자료구조로 힙 속성을 만족하는 거의 완전한 트리입니다. 힙 속성이란 예를 들어, 최대힙(Max Heap)일 경우 부모 노드는 반드시 자식 노드보다 값이 커야 한다는 법칙입니다. 따라서 최상위 노드는 최대값을 가지게 됩니다. 이러한 힙의 특성으로 힙은 우선순위 큐를 구현하는데 적합한 자료구조입니다.  
한 가지 참고사항으로 힙은 부모와 자식 노드간의 관계만이 정의되어 있을 뿐, 형제 또는 사촌 노드 간의 우선순위는 정해진 것이 없습니다.

## 이진 힙(Binary Heap)

이진 힙은 힙 중에서 가장 널리 쓰이는 형태 중 하나로 이진 트리 형태인 힙입니다. 이진 트리는 각 노드의 자식 노드가 반드시 2개 이하인 트리입니다. 이진 힙은 힙정렬 알고리즘을 위한 자료구조로서 1964년 J. W. J. 윌리엄이 발표하였습니다.

이진 힙은 완전 이진 트리라는 조건을 만족해야 합니다. 완전 이진 트리는 모든 레벨의 노드가 채워져 있어야 하며, 마지막 레벨은 왼쪽부터 차 있어야 합니다.

### 삽입(Insert)

힙에 원소를 추가하기 위해서 업힙이라는 작업을 수행해야 합니다. 다음은 15를 최대 힙에 추가하는 과정입니다.

1. 원소를 힙의 가장 마지막 노드에 추가.  
![Insert1](/assets/img/posts/binary-heap/Heap_add_step1.svg)

2. 추가한 원소를 부모와 비교. 순서가 힙 조건과 일치한다면 중지.  
![Insert2](/assets/img/posts/binary-heap/Heap_add_step2.svg)

3. 힙 조건과 순서가 맞지 않다면 부모와 위치를 교환. 힙 조건일 일치할 때까지 2~3번을 반복.  
![Insert3](/assets/img/posts/binary-heap/Heap_add_step3.svg)

### 삭제(Delete)

루트 노드는 힙의 종류에 따라 최대값 혹은 최소값을 가지게 됩니다. 따라서 최대값이나 최소값을 탐색할 때 걸리는 시간은 항상 O(1)입니다. 값을 추출하고 다음 값을 루트로 만드는 작업을 다운힙이라 합니다. 다음은 최대 힙에서 삭제를 하는 과정입니다.

1. 힙의 루트 노드를 삭제.  
![Delete1](/assets/img/posts/binary-heap/Heap_delete_step1.svg)

2. 마지막 노드를 루트로 이동. 루트를 자식 노드와 비교. 이 때, 두 자식 노드 중 최대 힙인 경우 더 큰 자식과 비교하며 최소 힙인 경우 더 작은 자식과 비교함. 순서가 힙 조건과 일치한다면 중지.  
![Delete2](/assets/img/posts/binary-heap/Heap_delete_step2.svg)

3. 만약 순서가 맞지 않는다면 위치를 교환. 힙 조건일 일치할 때까지 2~3번을 반복.  
![Delete3](/assets/img/posts/binary-heap/Heap_delete_step3.svg)

### 구현

이진 힙을 구현하는 방법은 완전 이진 트리를 구현하는 방법과 같습니다. 완전 이진 트리는 배열(Array)을 이용하여 구현할 수도 있고, 그래프처럼 노드 객체를 이용하여 구현할 수도 있습니다. 이진 힙을 구현할 때는 배열을 많이 사용합니다.

```java
public class MaxHeap {
    int Capacity;
    int Size;
    int[] Elements;

    public MaxHeap(int maximumSize) {
        Capacity = maximumSize;
        Elements = new int[maximumSize + 1];
        Size = 0;
        // Elements[0] is sentinel
        Elements[0] = Integer.MAX_VALUE;
    }

    public boolean isFull() {
        return Size == Capacity;
    }

    public boolean isEmpty() {
        return Size == 0;
    }

    public void insert(int value) {
        int i;

        if (isFull())
            throw new ArrayStoreException();

        for (i = ++Size; Elements[i / 2] < value; i /= 2)
            Elements[i] = Elements[i / 2];

        Elements[i] = value;
    }

    public int findMax() {
        if (Size == 0)
            throw new ArithmeticException();

        return Elements[1];
    }

    public int deleteMax() {
        int max, last;
        int i, child;

        if (isEmpty())
            throw new ArithmeticException();

        max = Elements[1];
        last = Elements[Size--];

        for (i = 1; i * 2 <= Size; i = child) {
            // Find smaller child.
            child = i * 2;
            if (child != Size && Elements[child + 1] > Elements[child])
                child++;

            if (last < Elements[child])
                Elements[i] = Elements[child];
            else
                break;
        }

        Elements[i] = last;

        return max;
    }
}
```

>[Github](https://github.com/Kayuse88/maxheap-example)에서 힙 정렬이 포함된 전체 코드를 볼 수 있습니다.

Java로 구현한 최대힙입니다. 자바에는 PriorityQueue가 존재하며 최소힙과 같은 기능을 하기 때문에 따로 구현해서 사용할 필요는 없습니다. 최대힙 또한 역순 정렬 비교자를 이용하여 구현이 가능합니다.

## 힙 정렬(Heap Sort)

힙에서 자료를 꺼낼 때 가장 큰(작은) 값부터 나오는 성질을 이용한 정렬이 힙 정렬입니다. 힙에 자료를 하나 넣을 때 평균 O(logn)의 복잡도를 가지며 이를 n번 반복하기 때문에 전체 복잡도는 O(nlogn)이 됩니다. insert(int value) 내부 for문의 증감식이 i /= 2이기 때문에 logn 의 속도를 가지기 때문입니다. 힙 정렬은 퀵 정렬과 평균 시간 복잡도는 동일하지만, 퀵 정렬이 최악의 경우 O(n^2)이 나오는 것에 비해 언제나 O(nlogn)을 넘지 않기 때문에 일장일단이 있습니다.

## Reference

Mark Allen Weiss, Data Structures and Algorithm Analsis in C 2ed  
<https://en.wikipedia.org/wiki/Heap_(data_structure)>  
<https://en.wikipedia.org/wiki/Binary_heap>
