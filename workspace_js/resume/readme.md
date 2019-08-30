美丽联合：

1、console.log(["a",,"b",,].length)//4? ? 注意这里未填写元素的位置的值为undefined。所以这里的length为4.但是最后一个，后面不会再补值。["a",,"b",,]=>["a", undefined, "b", undefined]

面试：

1、事件处理函数中的e.target和e.currentTarget有什么区别（饿了么，shopee）：

e.target:一个触发事件的对象的引用。当前触发事件的元素对象的引用。

e.currentTarget:当事件遍历DOM时，标识事件的当前目标。注册事件处理函数的元素对象。相当于未改变指向的this。

2、es6中的forEach和for...of遍历了解吗？

forEach：是es6中为数组新增的方法，可以遍历数组，接收两个参数，一个为回调函数，一个为函数内部this指向的对象。回调函数接收三个参数，分别表示：item,index,arr

https://blog.csdn.net/w1502713507/article/details/82828076


1. vue、react异同点（有的甚至会问到angular、backbone）
       2. eventLoop原理
       3. 防抖和节流 讲原理，手写代码，逐行讲解

       4. 水平垂直居中的多种方式
       5. promise、generator、async、await怎么使用，有什么区别
       6. 前端性能优化的方法，优先级
       7. 自己实现一个路由，思路
       8. 数组最大差值
       9. CORS原理
      10. 设计一个select组件，你会做哪些考量
      11. BFC的原理及应用场景
      12.从浏览器输入url直到页面渲染，期间有哪些步骤

      13. 改变this的几种方式；apply/call/bind 有什么区别

      14. webpack配置项都有哪些，其中loader和plugin有什么区别，有没有看过或者写过webpack的插件
      15. Array都用过什么方法

      16.promise、generator、async/await 有什么区别
      17. 异步有哪些场景，怎么解决异步
      18.localStorage、sessionStorage 区别；应用业务场景
      19.如何区分行内、块级元素
      20.ES6+有哪些新特性，介绍一下使用过的特性，经由babel编译后的代码是怎样的；如果让你实现promise/promise.all/async/await 你会怎么实现
     21.vuex、redux流程有什么区别，哪种更好，如果你设计，能有什么改进
     22.js的构造函数、工厂模式、单例模式、观察者模式、装饰器模式

     23.选一到两个你比较满意或者印象深刻的项目，讲讲你在其中起到的作用，遇到过什么比较有挑战的问题，如何解决

     24.vue、react、es6 等等 最近有什么新进展？
     25.vue的观察者模式，有什么缺陷吗，尤雨溪vue3.0打算怎么优化，或者有什么其他改进点

     26.变量提升、函数提升的code题

     27.SSR服务端渲染了解过吗
     28.vue和react对diff算法的优化有哪些；你觉得最新的这些框架和以前jquery相比有什么优势

     29.bfs 和 dfs 算法

    1.HTML5新增了哪些元素?移除了哪些元素，对浏览器兼容性的影响?如何区分HTML5

    2.js的几种继承方式

    3.元素水平垂直居中的几种方式

    4.什么是事件捕获，事件冒泡，触发顺序?

    5.闭包的定义及其对页面性能的影响,闭包的特性

    选择题

    prototype与_proto_

    组合模式