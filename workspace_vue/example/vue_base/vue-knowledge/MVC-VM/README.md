# MVC、MVP、MVVM三种区别及适用场合

## MVC
    - MVC模式最初生根于服务器端的Web开发，后来渐渐能够胜任客户端Web开发，能够满足其复杂性和丰富性。

    - MVC是Model-View-Controller的缩写，它将应用程序划分为三个部分：

        Model: 模型（用于封装与应用程序的业务逻辑相关的数据以及对数据的处理方法）

        View: 视图（渲染页面）

        Controller: 控制器（M和V之间的连接器，用于控制应用程序的流程，及页面的业务逻辑）


MVC
MVC模式最初生根于服务器端的Web开发，后来渐渐能够胜任客户端Web开发，能够满足其复杂性和丰富性。



MVC是Model-View-Controller的缩写，它将应用程序划分为三个部分：

Model: 模型（用于封装与应用程序的业务逻辑相关的数据以及对数据的处理方法）

View: 视图（渲染页面）

Controller: 控制器（M和V之间的连接器，用于控制应用程序的流程，及页面的业务逻辑）

MVC特点：

MVC模式的特点在于实现关注点分离，即应用程序中的数据模型与业务和展示逻辑解耦。在客户端web开发中，就是将模型(M-数据、操作数据)、视图(V-显示数据的HTML元素)之间实现代码分离，松散耦合，使之成为一个更容易开发、维护和测试的客户端应用程序。

View 传送指令到 Controller ；

Controller 完成业务逻辑后，要求 Model 改变状态 ；

Model 将新的数据发送到 View，用户得到反馈。

MVC流程：

MVC流程一共有两种，在日常开发中都会使用到。

一种是通过 View 接受指令，传递给 Controller，然后对模型进行修改或者查找底层数据，最后把改动渲染在视图上。 


另一种是通过controller接受指令，传给Controller： 


MVC优点：

耦合性低，视图层和业务层分离，这样就允许更改视图层代码而不用重新编译模型和控制器代码。
重用性高
生命周期成本低
MVC使开发和维护用户接口的技术含量降低
可维护性高，分离视图层和业务逻辑层也使得WEB应用更易于维护和修改
部署快
MVC缺点：

不适合小型，中等规模的应用程序，花费大量时间将MVC应用到规模并不是很大的应用程序通常会得不偿失。

视图与控制器间过于紧密连接，视图与控制器是相互分离，但却是联系紧密的部件，视图没有控制器的存在，其应用是很有限的，反之亦然，这样就妨碍了他们的独立重用。

视图对模型数据的低效率访问，依据模型操作接口的不同，视图可能需要多次调用才能获得足够的显示数据。对未变化数据的不必要的频繁访问，也将损害操作性能。

MVC应用：

在web app 流行之初， MVC 就应用在了java（struts2）和C#（ASP.NET）服务端应用中，后来在客户端应用程序中，基于MVC模式，AngularJS应运而生。

MVP
MVP（Model-View-Presenter）是MVC的改良模式，由IBM的子公司Taligent提出。和MVC的相同之处在于：Controller/Presenter负责业务逻辑，Model管理数据，View负责显示只不过是将 Controller 改名为 Presenter，同时改变了通信方向。

MVP特点：

M、V、P之间双向通信。
View 与 Model 不通信，都通过 Presenter 传递。Presenter完全把Model和View进行了分离，主要的程序逻辑在Presenter里实现。
View 非常薄，不部署任何业务逻辑，称为”被动视图”（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。
Presenter与具体的View是没有直接关联的，而是通过定义好的接口进行交互，从而使得在变更View时候可以保持Presenter的不变，这样就可以重用。不仅如此，还可以编写测试用的View，模拟用户的各种操作，从而实现对Presenter的测试–从而不需要使用自动化的测试工具。
与MVC区别：



在MVP中，View并不直接使用Model，它们之间的通信是通过Presenter (MVC中的Controller)来进行的，所有的交互都发生在Presenter内部。 

在MVC中，View会直接从Model中读取数据而不是通过 Controller。
MVP优点：

模型与视图完全分离，我们可以修改视图而不影响模型；
可以更高效地使用模型，因为所有的交互都发生在一个地方——Presenter内部；
我们可以将一个Presenter用于多个视图，而不需要改变Presenter的逻辑。这个特性非常的有用，因为视图的变化总是比模型的变化频繁；
如果我们把逻辑放在Presenter中，那么我们就可以脱离用户接口来测试这些逻辑（单元测试）。
MVP缺点：

视图和Presenter的交互会过于频繁，使得他们的联系过于紧密。也就是说，一旦视图变更了，presenter也要变更。

MVP应用： 
可应用与Android开发。

MVVM
MVVM是Model-View-ViewModel的简写。微软的WPF(Windows Presentation Foundation–微软推出的基于Windows 的用户界面框架)带来了新的技术体验, 使得软件UI层更加细节化、可定制化。与此同时，在技术层面，WPF也带来了 诸如Binding（绑定）、Dependency Property（依赖属性）、Routed Events（路由事件）、Command（命令）、DataTemplate（数据模板）、ControlTemplate（控制模板）等新特性。MVVM模式其实是MV模式与WPF结合的应用方式时发展演变过来的一种新型架构模式。它立足于原有MVP框架并且把WPF的新特性糅合进去，以应对客户日益复杂的需求变化。



MVVM优点：

MVVM模式和MVC模式类似，主要目的是分离视图（View）和模型（Model），有几大优点：

低耦合，视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的”View”上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。

可重用性，可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑。

独立开发，开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计，使用Expression Blend可以很容易设计界面并生成xml代码。

可测试，界面向来是比较难于测试的，而现在测试可以针对ViewModel来写。

-- https://blog.csdn.net/victoryzn/article/details/78392128