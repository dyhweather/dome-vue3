import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/Index.vue'

export const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页', icon: 'MailOutlined'},
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        meta: { title: '关于', icon: 'AppstoreOutlined'},
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/technologyManage',
        name: 'technologyManage',
        meta: { title: '工艺管理', icon: 'SettingOutlined'},
        component: () => import('../views/technologyManage/Index.vue'),
        children: [
          {
            path: '/technologyManage/matter',
            name: 'matter',
            meta: { title: '工艺物料'},
            component: () => import('../views/technologyManage/matter/Index.vue')
          },
        ]
      },
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
