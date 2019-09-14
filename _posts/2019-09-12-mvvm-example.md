---
layout: post
title: 예시로 알아보는 MVC vs MVP vs MVVM
featured-img: tictactoe
categories: 디자인패턴 MVVM WPF
---

>이 포스트는 Eric Maxwell의 [MVC vs. MVP vs. MVVM on Android](https://academy.realm.io/posts/eric-maxwell-mvc-mvp-and-mvvm-on-android/)를 참고하여 작성했습니다.

MVC, MVP, MVVM같은 디자인 패턴에 대한 설명을 듣는 다면 한 번에 쉽게 이해되지 않습니다.  
그럴 때는 직접 예시를 보는게 가장 빠른 방법입니다.  
WPF개발 환경에서 3가지 디자인 패턴의 비교를 해보겠습니다.

## TicTacToe

틱택토 게임은 오목과 유사한 게임으로 3x3 사이즈의 판에 가장 먼저 한 줄을 만드는 사람이 승리합니다.  
규칙이 간단하고, 9개의 칸만 만들 수 있으면 어디서나 할 수 있다는 것이 장점입니다.

![TicTacToe](/assets/img/posts/mvvm-example/tictactoe.png)

해당 예시는 MVVM의 이해를 돕기 위해 WPF로 제작되었습니다.  
소스 코드는 <https://github.com/Kayuse88/wpf-TicTacToe-example>에서 확인할 수 있습니다.  
MVC, MVP, MVVM에 대한 자세한 설명은 [이전 포스트](https://kayuse88.github.io/mvvm-pattern)를 참고해주세요.

## MVC

MVC패턴은 고전적인 디자인 방법으로 Model, View, Controller로 구성되어 있습니다.

![틱택토MVC](/assets/img/posts/mvvm-example/tictactoemvc.png)

### Model

모델은 비즈니스 로직을 처리하고, 데이터를 저장하는 역할을 합니다. 틱택토 어플리케이션에서는 판(보드), 각각의 칸(셀), 그리고 사용자(플레이어)를 각각의 모델로 삼고 있습니다. 모델은 디자인 패턴에 관계 없이 같은 모델 클래스를 공유합니다.

사용자는 X, O의 두 가지 플레이어를 나타냅니다.  
칸(셀)은 현재 자신의 칸에 어떤 플레이어가 수를 뒀는지 저장하고 나타냅니다.  
판(보드)는 3x3의 전체 판을 나타냅니다. 각각의 칸에 착수했을 때 플레이어를 마킹하고 승자를 계산하는 비즈니스 로직을 수행합니다.

### View

뷰는 XAML 마크업 언어로 구성되어있습니다. WPF의 특징이기도 하며 XAML을 이용해서 HTML 웹페이지를 작성하듯이 뷰 레이아웃을 구성할 수 있습니다. 안드로이드의 레이아웃 XML을 안다면 이해가 쉽습니다.

MVC 패턴에서 뷰는 모델의 내용을 알지 못하고 컨트롤러가 뷰의 상태를 제어합니다. 사용자가 버튼을 클릭하거나 값을 입력하는 등의 행동을 할 때 이벤트의 발생을 컨트롤러에 전달합니다.

### Controller

컨트롤러는 뷰와 모델을 접착시키는 접착제의 역할을 합니다. 예시에서는 별도의 컨트롤러를 만들지 않고 XAML.cs를 컨트롤러로 사용했습니다. 엄밀히 말하면 XAML의 cs파일은 Partial class라고 해서 XAML부분과 결합하여 하나의 클래스가 됩니다. 뷰랑 컨트롤러가 하나의 클래스에 혼재한다고 보면 되지만 구현의 편의를 위해 마치 별도의 컨트롤러인 것처럼 취급합니다.  
코드를 직접 살펴보겠습니다.

```cs
using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Controls;
using TicTacToeExample.Model;
using static TicTacToeExample.Model.Players;

namespace TicTacToeExample.View
{
    // Refer to Maxwell's TicTacToe.
    // https://github.com/ericmaxwell2003/ticTacToe
    /// <summary>
    /// Interaction logic for Mvc.xaml
    /// </summary>
    public partial class Mvc : Page
    {
        #region Fields
        private Board model;
        #endregion

        #region Constructors
        public Mvc()
        {
            InitializeComponent();

            model = new Board();
        }
        #endregion

        #region Methods
        private void Reset()
        {
            StackPanel_Winner.Visibility = Visibility.Hidden;
            TextBlock_Winner.Text = "";

            model.Restart();

            for (int i = 0; i < WrapPanel_ButtonGrid.Children.Count; i++)
            {
                ((Button)WrapPanel_ButtonGrid.Children[i]).Content = "";
            }
        }
        #endregion

        #region EventMethods
        private void TicTacToe_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;

            int row = Convert.ToInt32(((string)button.Tag).Substring(0, 1));
            int col = Convert.ToInt32(((string)button.Tag).Substring(1, 1));

            Debug.WriteLine("Click on Row: " + row + " Col: " + col, String.Constants.Mvc);

            Player? playerThatMoved = model.Mark(row, col);

            if (playerThatMoved != null)
            {
                button.Content = playerThatMoved;
                if (model.GetWinner() != null)
                {
                    TextBlock_Winner.Text = playerThatMoved.ToString();
                    StackPanel_Winner.Visibility = Visibility.Visible;
                }
            }
        }

        private void ResetButton_Click(object sender, RoutedEventArgs e)
        {
            Reset();
        }
        #endregion
    }
}
```

컨트롤러가 뷰의 입력을 받는 것은 이벤트 핸들러를 통해 이루어집니다. 안드로이드에서 OnClickListener를 사용해 봤다면 이해가 쉽습니다. WPF에선 이벤트 핸들러의 지정을 코드상에서 할 수도 있지만 UI 관련된 이벤트는 보통 XAML에서 직접 지정하는 편입니다. 따라서 setOnClickListener와 같은 역할은 누가 하는지 헷갈리실 필요는 없습니다.

```xml
<Button HorizontalAlignment="Left" VerticalAlignment="Top" Margin="15" Width="100" Content="{x:Static string:MainUI.Reset}" Click="ResetButton_Click"/>
```

`Click="ResetButton_Click"`과 같은 식으로 XAML 컨트롤에 직접 지정해주게 됩니다.

뷰와 모델을 분리할 수 있지만 몇 가지 단점이 있습니다.

#### 컨트롤러 고려사항

* 테스트 용이성 - 컨트롤러는 WPF 라이브러리를 참조하기 때문에 단위 테스트가 힘듭니다. RoutedEventArgs 클래스 같은 입력 변수는 어떻게 통제할까요?
* 모듈 및 유연성 - 만약 뷰의 내용을 고친다고 합니다. 그렇다면 뷰를 참조하는 컨트롤러의 내용까지 모조리 고쳐야 합니다. 작업량이 늘어나게 됩니다. 작은 프로젝트면 금방 고칠것이나 프로젝트의 규모가 커질수록 단순 작업량이 늘어나게 됩니다.
* 유지보수성 - 유연성과 비슷한 점으로 뷰의 규모에 따라 컨트롤러에 너무 많은 로직이 포함되게 됩니다. 단순하게 값을 전달하고 뷰를 갱신하는 것만 해도 많은 줄의 코드가 양산되고 유지보수가 힘들게 됩니다. 여기에 동적인 화면 구성, 모델의 관리 등의 내용이 들어가면 점점 비대한 컨트롤러가 됩니다.

MVC패턴의 문제점을 해결하기 위해 MVP 패턴을 보겠습니다.

## MVP

MVP 패턴은 컨트롤러를 프레젠터로 대체했습니다. 뷰와 프레젠터는 각각 ITicTacToeView와 ITicTacToePresenter라는 인터페이스를 통해 서로 참조하게 됩니다. 클래스의 직접 참조 대신 인터페이스를 사용하는 이유는 여기서는 간단하게 결합도를 낮추고 OOP의 다형성을 위해서라고만 설명하겠습니다.

![틱택토MVP](/assets/img/posts/mvvm-example/tictactoemvp.png)

### MVP - View

XAML.cs는 컨트롤러의 역할을 버리고 이제 뷰의 완전한 일부가 됩니다. 뷰의 이벤트 입력을 프레젠터에 전달하고, 프레젠터에서 온 명령에 따라 뷰를 갱신하는 로직을 가지고 있습니다. WPF에서는 이렇게 XAML의 뒷쪽에서 수행하는 로직을 Code-Behind라고 지칭합니다. 비하인드 코드는 정적인 마크업 언어의 한계로 구현하기 힘든 내용을 도와주는 역할을 합니다. XAML에서도 Behavior와  트리거 등으로 최대한 동적인 페이지 구성이 가능하지만 구현 난이도가 상당히 올라간다는 단점이 있습니다.

### Presenter

컨트롤러와 상당히 유사한 구조지만, 프레젠터는 뷰를 직접적으로 갱신하지 않습니다. 대신 인터페이스를 통해 뷰에게 갱신을 요청하게 됩니다.

```cs
using TicTacToeExample.Model;
using static TicTacToeExample.Model.Players;

namespace TicTacToeExample.Presenter
{
    class TicTacToePresenterImpl : ITicTacToePresenter
    {
        #region Fields
        private readonly Board model;
        private readonly ITicTacToeView view;
        #endregion

        #region Constructors
        public TicTacToePresenterImpl(ITicTacToeView view)
        {
            this.model = new Board();
            this.view = view;
        }
        #endregion

        #region ITacTacToePresenter Implementation
        public void ButtonSelected(int row, int col)
        {
            Player? playerThatMoved = model.Mark(row, col);

            if (playerThatMoved != null)
            {
                view.SetButtonText(row, col, playerThatMoved.ToString());

                if (model.GetWinner() != null)
                {
                    view.ShowWinner(playerThatMoved.ToString());
                }
            }
        }

        public void Reset()
        {
            view.ClearWinnerDisplay();
            view.ClearButtons();
            model.Restart();
        }
        #endregion
    }
}
```

프레젠터는 컨트롤러와 다르게 UI 컨트롤을 참조하지 않습니다. 그래서 단위 테스트가 매우 용이해졌습니다. 또한 대부분의 로직이 인터페이스 명령을 호출하는 형태이기 때문에 코드도 간결해졌습니다.  
여기에도 단점은 있습니다.

#### 프레젠터 고려사항

* 유지보수성 - 프레젠터의 코드는 간결해졌지만 여전히 뷰를 간접적으로 참조합니다. 뷰에 완전히 새로운 내용을 표시하고 싶다면 뷰의 인터페이스 자체를 고쳐야 합니다.
* 다형성 - 하나의 프레젠터를 가지고 다양한 뷰를 표현할 수 있을까요? 예를들어 안드로이드와 iOS 두 가지 뷰를 만들고 각각의 뷰에 내용을 표시한다면 대부분의 로직은 공통적일 것입니다. 하지만 안드로이드TV와 VR을 동시에 타겟으로 잡는다면? 상이한 입력체계때문에 프레젠터에 상당한 예외처리와 기기별 분기를 만들어줘야 합니다. 이렇게 세세하게 특정짓는 것은 OOP의 다형성 및 추상화를 위배하게 됩니다. 결국 별도의 뷰에 맞는 프레젠터를 각각 제작해야합니다.

## MVVM

WPF에서 MVVM은 데이터바인딩으로 구현하게 됩니다. 데이터 바인딩은 WPF의 존재 이유라고 봐도 무방할 정도입니다. 물론 데이터바인딩이 WPF의 전유물은 아닙니다. 안드로이드에서도 데이터 바인딩 라이브러리가 추가되어 사용하는 것으로 알고 있습니다. .NET의 크로스플랫폼 프레임워크인 자마린도 MVVM을 적극 지향하고 있습니다.

![틱택토mvvm](/assets/img/posts/mvvm-example/tictactoemvvm.png)

### MVVM - View

MVVM의 특징은 뷰의 비하인드 코드가 거의 존재하지 않는다는 점입니다.

```cs
using System.Windows.Controls;

namespace TicTacToeExample.View
{
    /// <summary>
    /// Interaction logic for Mvvm.xaml
    /// </summary>
    public partial class Mvvm : Page
    {
        public Mvvm()
        {
            InitializeComponent();
        }
    }
}
```

뷰의 비하인드 코드는 기본 생성되는 초기화 코드밖에 없습니다. 처음 MVVM을 접하면 가장 당황하게 되는 것이 이 부분일 겁니다. 아무 코드가 없는데 어떻게 뷰가 갱신되고 입력이 전달될까?하는 생각이 들게 됩니다. 해답은 뷰의 XAML 구현부에 있습니다.

```xml
    <Page.DataContext>
        <viewmodel:MvvmViewModel/>
    </Page.DataContext>
```

이 부분이 데이터컨텍스트를 뷰모델로 지정해주기 때문에 뷰의 내용을 반영할 수 있습니다. 데이터 컨텍스트란 뭘까요?

#### DataContext

데이터 컨텍스트란 일종의 경로라고 볼 수 있습니다. 콘솔 창에서 명령어를 입력할 때 현재 경로에 있는 파일을 참조할 때는 그냥 파일명만 입력할 수 있지만 다른 폴더에 있는 파일을 참조할 때는 절대 경로를 사용하게 됩니다. 데이터 컨텍스트는 XAML에서 현재 경로를 지정해주는 역할을 한다고 보면됩니다. 경로를 지정하면 Binding 구문에서 해당 경로의 프로퍼티에 접근할 수 있습니다. 상당히 복잡한 듯 보이지만 이해하고 나면 쉽습니다. 다만 Android의 데이터바인딩과는 다르게 직관적이지 않다는 점이 흠입니다.  
데이터 컨텍스트를 지정하고 바인딩을 하면 데이터가 뷰에 표시됩니다. 하지만 값이 실시간으로 바뀔 때 갱신되지는 않습니다. 데이터 갱신을 위해서는 `INotifyPropertyChanged` 인터페이스를 상속받아 구현해야 합니다.

#### INotifyPropertyChanged

```cs
public class ViewModelBase : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;

    protected void NotifyPropertyChanged([CallerMemberName] string propertyName = "")
    {
        var handler = PropertyChanged;
        handler?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

ViewModelBase는 해당 인터페이스를 구현한 구현체입니다. 이 클래스를 다시 상속해서 뷰모델을 만들면 됩니다. INotifyPropertyChanged는 프로퍼티가 변경되었을 때 이벤트를 발생시켜 알리겠다는 인터페이스입니다. 뷰가 이 인터페이스를 상속한 클래스의 프로퍼티를 바인딩하면 값이 변경되었을 때 PropertyChanged 이벤트가 호출되고 자동으로 값이 변경됩니다. 복잡하다면 그냥 이런 인터페이스를 구현하면 된다만 알아두면 됩니다.

한 가지 짚고 넘어갈 것이 MVVM에서 뷰의 비하인드 코드가 아무것도 없어야 할까요? MVVM 순수주의자 같은 사람들은 절대로 어떤 논리적 코드도 구현하면 안된다고 합니다. 어떤 사람은 뷰에 관련된 시각적 요소에 한정해서는 코드를 구현해도 된다고 합니다. 저는 MVVM의 구조만 지킨다면 편한대로 쓰면 된다고 생각합니다. 패턴이란 것도 결국 생산성과 편리함을 위해서 쓰는 것인데 반대로 이게 개발자의 목을 조른다면 의미가 없다고 생각합니다.

### ViewModel

뷰모델은 추상화된 뷰입니다. 세부적인 뷰의 표현 방식만 없지 뷰에 표시되어야 하는 내용, 입력값에 대한 반응 등 추상적인 개념은 모두 포함되어 있습니다. 뷰는 뷰모델을 각각의 화면에 맞게 표현만 해주면 됩니다.

```cs
using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Windows.Input;
using TicTacToeExample.Command;
using TicTacToeExample.Model;
using static TicTacToeExample.Model.Players;

namespace TicTacToeExample.ViewModel
{
    public class MvvmViewModel : ViewModelBase
    {
        #region InnerClasses
        public class Cell : ViewModelBase
        {
            private Player? _marker;

            public string RowCol { get; private set; }
            public Player? Marker
            {
                get { return _marker; }
                set
                {
                    _marker = value;
                    NotifyPropertyChanged();
                }
            }

            public Cell(int row, int col)
            {
                string rowcol = "" + row + col;
                RowCol = rowcol;
            }
        }
        #endregion

        #region Fields
        private string _winner;
        private ObservableCollection<Cell> _cells;
        private Board _model;
        #endregion

        #region Properties
        public string Winner
        {
            get { return _winner; }
            set
            {
                _winner = value;
                NotifyPropertyChanged();
            }
        }

        public ObservableCollection<Cell> Cells
        {
            get { return _cells; }
            set
            {
                _cells = value;
                NotifyPropertyChanged();
            }
        }
        #endregion

        #region Commands
        public ICommand CellCommand { get; set; }
        public ICommand ResetCommand { get; set; }
        #endregion

        #region Constructors
        public MvvmViewModel()
        {
            _model = new Board();
            Cells = new ObservableCollection<Cell>();

            for (int i = 0; i < 3; i++)
                for (int j = 0; j < 3; j++)
                    Cells.Add(new Cell(i, j));

            CellCommand = new SimpleCommand<string>(CellSelect);
            ResetCommand = new SimpleCommand(Reset);
        }
        #endregion

        #region Methods
        private void CellSelect(string parameter)
        {
            int row = Convert.ToInt32(parameter.Substring(0, 1));
            int col = Convert.ToInt32(parameter.Substring(1, 1));

            Debug.WriteLine("Click on Row: " + row + " Col: " + col, String.Constants.Mvvm);

            Player? playerThatMoved = _model.Mark(row, col);

            if (playerThatMoved != null)
            {
                Cells[row * 3 + col].Marker = playerThatMoved;
                Winner = _model.GetWinner() == null ? null : _model.GetWinner().ToString();
            }
        }

        private void Reset()
        {
            foreach (var cell in Cells)
            {
                cell.Marker = null;
            }
            Winner = null;
            _model.Restart();
        }
        #endregion
    }
}
```

뷰모델은 뷰에 대한 참조가 전혀 없습니다. 함수들도 단위 테스트에 편리하게 구현되어 있습니다. TDD에 있어 매우 유리한 구조입니다.  
ICommand란 인터페이스가 보이는 데 이것은 MVC, MVP의 뷰에서 Click 이벤트에 반응하던 핸들러와 유사한 것입니다. 뷰모델은 추상화된 뷰이기 때문에 직접적인 이벤트 핸들러를 포함하지 않지만 추상화된 핸들러로서 ICommand를 가지고 있습니다. 이를 구현한 RoutedCommand란 클래스가 WPF에 기본으로 포함되어 있지만 복잡하기 때문에 보통은 MVVM 프레임워크의 것을 사용하는 경우가 많습니다.

뷰모델은 추상화된 뷰이기 때문에 하나의 뷰모델을 여러 뷰가 바인딩해서 사용할 수 있습니다. 원소스 멀티플랫폼인데 자마린 같은 크로스플랫폼 개발 방식에 적합해 보입니다.

#### MVVM 고려사항

* 유지보수성 - MVVM에서 뷰모델은 뷰의 추상화 계층이기에 뷰에 필요한 모든 내용을 다 담고 있습니다. 따라서 코드가 비대해지게 됩니다.

## 결론

똑같은 화면을 가진 어플리케이션을 서로 다른 3가지 패턴으로 구현해 실제로 어떤 차이점이 있는지 비교했습니다. 설명을 위해 MVP도 구현을 했지만, 실제로 WPF에서는 MVP패턴은 거의 사용되지 않습니다. 프레임워크 자체가 MVVM패턴을 염두해두고 만들어졌기 때문에 MVVM을 사용하는 것이 매우 편리합니다.

그렇지만 결국에는 자신이 쓰기 좋다고 판단되는 패턴을 사용하시기 바랍니다. 해당 소스에 대해 궁금한 점은 메일이나 깃허브 페이지에 남겨놓으시면 답변해드리겠습니다.
