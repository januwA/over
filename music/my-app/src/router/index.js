import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index1 from '@comp/tab-routers/index1.vue'
import index2 from '@comp/tab-routers/index2.vue'
import index3 from '@comp/tab-routers/index3.vue'
import index4 from '@comp/tab-routers/index4.vue'
import notFound from '@comp/404.vue'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index1'
    },
    {
      path: '*',
      name: '404',
      component: notFound
    },
    {
      path: '/index1',
      name: '推荐',
      component: index1
    },
    {
      path: '/index2',
      name: '歌手',
      component: index2
    },
    {
      path: '/index3',
      name: '排行',
      component: index3
    },
    {
      path: '/index4',
      name: '搜索',
      component: index4
    }
  ]
})
