import Home from '@/views/Home.vue'
import ActiveClass from '@/components/ActiveClass.vue';
// import TestIndex from '@/components/pages/TEST.vue';
// views 单独的router
export const HomeRouter = {
  path: '/',
  name: 'HomeLink',
  meta: {
    title: 'Home'
  },
  component: Home,

};
export const HomeRouter2 = {
    path: '/home',
    name: 'HomeLink',
    meta: {
      title: 'Home'
    },
    component: Home,
  
  };
export const ActiveClassRouter = {
    path: '/ActiveClass',
    name: 'ActiveClassLink',
    meta: {
      title: 'ActiveClass'
    },
    component: ActiveClass,
  };
  

// export const testRouter = {
//   path: '/test',
//   name: 'testIndexLink',
//   meta: {
//     title: 'test'
//   },
//   component: TestIndex
// };
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    HomeRouter,
    HomeRouter2,
    ActiveClassRouter
];
