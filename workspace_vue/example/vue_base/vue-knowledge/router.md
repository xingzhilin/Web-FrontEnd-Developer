# 路由守卫：
    - 全局&路由独享：beforeEach、beforeResolve（v2.5.0+新增）、afterEach ；beforeEnter（路由独享，类似beforeEach）
    - 组件内：beforeRouteEnter、beforeRouteUpdate (2.2 新增)、beforeRouteLeave
# 路由守卫 —— 路由级别的（全局&路由独享）

## router.beforeEach
    - 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中
    router.beforeEach((to, from, next) => {
        console.log('全局前置守卫：beforeEach -- next需要调用')
        next()
    })
    一般在这个守卫方法中进行全局拦截，比如必须满足某种条件（用户登录等）才能进入路由的情况

    参数to和from都是路由对象Route
    next是个Function，有以下几种用法（from api文档）

    next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）
    next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址 —— 也就是说并不是单纯的中断，还会检查URL的变更以保证不会错误的进入到next路由
    next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。可传递的参数与router.push中选项一致
    next(error): (v2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调
## router.beforeResolve (v 2.5.0+)
    全局解析守卫

        和beforeEach类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
        即在 beforeEach 和 组件内beforeRouteEnter 之后

    参数和beforeEach一致，也需要调用next对导航确认

## router.afterEach
    全局后置钩子
    在所有路由跳转结束的时候调用
    这些钩子不会接受 next 函数也不会改变导航本身

## beforeEnter
    可直接定义在路由配置上，和beforeEach方法参数、用法相同

    路由守卫 —— 组件内
## beforeRouteEnter
    在渲染该组件的对应路由被确认前调用，用法和参数与beforeEach类似，next需要被主动调用
    注意：

    此时组件实例还未被创建，不能访问this
    可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数
    beforeRouteEnter (to, from, next) {
    // 这里还无法访问到组件实例，this === undefined
    next( vm => {
        // 通过 `vm` 访问组件实例
    })
    }
    可以在这个守卫中请求服务端获取数据，当成功获取并能进入路由时，调用next并在回调中通过 vm访问组件实例进行赋值等操作
    beforeRouteEnter触发在导航确认、组件实例创建之前：beforeCreate之前；而next中函数的调用在mounted之后：为了确保能对组件实例的完整访问
    beforeRouteUpdate (v 2.2+)
    在当前路由改变，并且该组件被复用时调用，可以通过this访问实例， next需要被主动调用，不能传回调

    对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，组件实例会被复用，该守卫会被调用
    当前路由query变更时，该守卫会被调用
    vue-router推荐的数据获取方法二中，结合beforeRouteEnter使用，在路由参数变更时可以重新获取数据，获取成功再调用next()，参考：https://router.vuejs.org/zh-c...
    之前在手机浏览器中好像发现这个守卫的bug？@TODO 待确认

## beforeRouteLeave
    导航离开该组件的对应路由时调用，可以访问组件实例 this，next需要被主动调用，不能传回调

    总结
    结合并扩展Vue-router官方文档的说明：

    导航行为被触发，此时导航未被确认。
    在失活的组件里调用离开守卫 beforeRouteLeave。
    调用全局的 beforeEach 守卫。
    在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
    在路由配置里调用 beforeEnter。
    解析异步路由组件（如果有）。
    在被激活的组件里调用 beforeRouteEnter。
    调用全局的 beforeResolve 守卫 (2.5+)，标示解析阶段完成。
    导航被确认。
    调用全局的 afterEach 钩子。
    非重用组件，开始组件实例的生命周期

    beforeCreate&created
    beforeMount&mounted
    触发 DOM 更新。
    用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
    导航完成