# vue 生命周期
    - 生命周期：Vue 实例从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期，各个阶段有相对应的事件钩子

# 周期过程
    >> 生命周期钩子
    >> 组件相关钩子函数： beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destoryed
    >> 还有两个特殊的（使用keep-alive）：activated、deactivated（不详述）
## beforeCreate：
    ```
        - 组件状态:: 实例初始化之后，this指向创建的实例，不能访问到data、computed、watch、methods上的方法和数据
        - 最佳实践:: 常用于初始化非响应式变量
        - 实例初始化之后
        - this指向创建的实例
        - 数据观测（data observer）和event/watcher配置尚未完成
        - 不能访问到methods、data、computed、watch上的方法和数据
    ```
##  created	
    ```
        - 组件状态:: 实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到$el属性，$ref属性内容为空数组
        - 最佳实践:: 常用于简单的ajax请求，页面的初始化
        - 实例创建完成，并已经完成以下配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调
        - 此时可以调用methods中定义的方法，修改data的数据，并且可触发响应式变化、computed值重新计算，watch到变更等
        - 还未挂载到DOM，不能访问到$el属性，$ref属性内容为空数组
        -   new Vue({
                data () {
                    return {
                    a : 1
                    }
                } ,
                created (){
                    console.log( this.a )  // 1
                }
            })
        - 这个生命周期阶段比较常用，比如ajax请求获取初始化数据对实例进行初始化预处理等操作；但要注意在结合vue-router使用时，进入created生命周期阶段后是无法对挂载实例进行拦截的，此时实例已经创建完成；故如果需要某些数据获取完成情况才允许进入页面的场景，建议在路由钩子beforeRouteEnter中实现

    ```
##  beforeMount	
    ```
        - 组件状态:: 在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数
        - 最佳实践:: -
        - 在挂载开始之前被调用

        - 注意：从vue生命周期图可以看出
        - 当new Vue({...})的配置中没有el属性时，生命周期暂停，等待vm.$mount(el)调用时才继续
        - beforeMount之前，会找到对应的template，并编译成render函数
        -（这个步骤如果使用.vue文件和运行时版本将会在构建时提前完成）

        - template查找的优先级顺序:
        - template参数 > el 外部HTML
        - 如果指定了render函数，则直接采用render函数，即忽略template参数和el外部HTML
        - 写个栗子测试：
            <div id="app">template outside</div>
            ...
            import App from './App.vue';  // App是任一Vue组件对象

            new Vue({
            el: '#app',
            // template: '<p>template inside</p>',   // part inside
            // render: h => h(App)     //  part render
            })
        - 需要Vue完整版本支持，注释part inside和part render依次打开即可观察到三次不同的结果
        - Vue的编译过程暂略
    ```	
##  mounted	
    ```
        - 组件状态:: 实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问
        - 最佳实践:: 常用于获取VNode信息和操作，ajax请求
        - el被新创建的$el替换 ---- 怎么理解？

        - 这个可以理解为挂载前为实例寻找了一个暂时容身之处el，编译完成($el创建完成)后替换这个容身之处完成实例的挂载
        如：之前那个栗子中，将part render打开后观察生成的DOM结构，<div id="app">template outside</div>这个节点即原el已经被替换掉

        - 实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问

        - 虽然经常观察到先进入子组件mounted，但根据Vue官方文档：

        - 注意 `mounted` 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染
        - 完毕，可以用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick) 

        - 在这个阶段改变data上的值，相关的computed属性可以立刻更新；但需要进入到下一次DOM更新，才能看到DOM上数据更新

        - 栗子：

        -   new Vue({
                el: '#app',
                template: '<p id="testa">{{a}}</p>',
                router,
                data ()
                        {
                            return {
                    a : 0
                    }
                },
                mounted() {
                    this.a ++;
                    console.log(this.b);   //  2
                    console.log(document.getElementById('testa').innerHTML)  //  0
                },
                computed :{
                    b (){
                    return this.a+1;
                    }
                }
            })
        - beforeRouteEnter的next的勾子比mounted触发还要靠后 - 这个待会说到路由相关钩子时再展开
    ```
##  beforeupdate
    ```
        - 组件状态:: 响应式数据更新时调用，发生在虚拟DOM打补丁之前
        - 最佳实践:: 适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器
        - 这里的更新对象是模板，即需要虚拟 DOM 重新渲染和打补丁，beforeUpdate发生在以上两个流程之前，此时新的虚拟DOM已经生成

        - 如果发生变更的数据在模板中并没有使用（包括直接和间接，间接：比如某个依赖该数据的计算属性在模板中使用了），则不会触发更新流程！！！

        - 如：

            new Vue({
                el: '#app',
                template: '<p id="testa">{{a}}</p>',
                router,
                data ()
                {
                    return {
                    a : 0,
                    b :  1
                    }
                },
                mounted (){
                    this.b ++;   //   b并没有在模板中使用
                },
                beforeUpdate (){
                    debugger;  //  不会进入这个断点
                }
            })
        - 在一些参考文章中看到：
        - 在这个钩子函数中，可以对状态进行进一步更改，不会再次触发重渲染流程 --- 这个说法有问题
        - 如果对状态进行变更会导致重新进入beforeUpdate（这里变更的状态同样要在模板中使用，如果变更没有在模板中使用的data，才不会再次触发重渲染流程）
        - 而且若变更操作不是基础类型的简单赋值，还会引起死循环（不断重新进入beforeUpdate）！

        - 看看这个栗子，依次把注释打开测试

            new Vue({
                el: '#app',
                template: '<p id="testa">{{a}}</p>',
                router,
                data ()
                {
                    return {
                    a : 0,
                    c:  0
                    }
                },
                beforeUpdate() {
                    console.log(document.getElementById('testa').innerHTML)
                    // this.c = 1;   //  this.c没有在模板中使用，变更不会引起重渲染流程
                    // this.a = 3;  //  会再次进入一次重渲染流程，第二次进入时发现a仍是3，值没有变更，不会再次重渲染
                    // this.a ++;   //  会引起死循环，每次进入重渲染流程时，a的值都会变更
                },
                updated() {
                    console.log(document.getElementById('testa').innerHTML)
                }
            })
        - 应该避免在这个钩子函数中操作数据
    ```
##  updated
    ```
        - 组件状态:: 虚拟 DOM 重新渲染和打补丁之后调用，组件DOM已经更新，可执行依赖于DOM的操作
        - 最佳实践:: 避免在这个钩子函数中操作数据，可能陷入死循环
        - 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

        - 当这个钩子被调用时，组件 DOM 已经更新，可以执行依赖于 DOM 的操作

        - 注意 `updated` 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，
        - 可以用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick) 
        - 同样，应该避免在这个钩子函数中操作数据


    ```
##  beforeDestroy
    ```
        - 组件状态:: 实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例
        - 最佳实践:: 常用于销毁定时器、解绑全局事件、销毁插件对象等操作
        - 实例销毁之前调用。在这一步，实例仍然完全可用，this仍能获取到实例

        - 一般在这一步中进行：销毁定时器、解绑全局事件、销毁插件对象等操作
    ```
##  destroyed
    ```
        - 组件状态:: 实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
        - 最佳实践:: –
        - Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
    ```
## 注意

    — created阶段的ajax请求与mounted请求的区别：前者页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态
    - mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染
    - 完毕，可以用 vm.$nextTick
    - vue2.0之后主动调用$destroy()不会移除dom节点，不推荐直接destroy这种做法，如果实在需要这样用可以在这个生命周期钩子中手动移除dom节点

# 单个组件的生命周期
    LiftCycle.vue
    - 初始化组件时，仅执行了beforeCreate/Created/beforeMount/mounted四个钩子函数
    - 当改变data中定义的变量（响应式变量）时，会执行beforeUpdate/updated钩子函数
    - 当切换组件（当前组件未缓存）时，会执行beforeDestory/destroyed钩子函数
    - 初始化和销毁时的生命钩子函数均只会执行一次，beforeUpdate/updated可多次执行

# 父子组件的生命周期

# 兄弟组件的生命周期

