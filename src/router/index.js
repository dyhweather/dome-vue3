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
        component: () => import('../views/home/index.vue')
      },
      {
        path: '/about',
        name: 'about',
        meta: { title: '关于', icon: 'AppstoreOutlined'},
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/image',
        name: 'image',
        meta: { title: '图片', icon: 'AppstoreOutlined'},
        component: () => import('../views/image/index.vue')
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
            meta: { title: '工艺物料', icon: 'BorderLeftOutlined'},
            component: () => import('../views/technologyManage/matter/Index.vue')
          },
        ]
      },
    ]
  },
  {
    path: '/visualization',
    name: 'visualization',
    meta: { title: '可视化大屏', icon: 'MailOutlined'},
    component: () => import('../views/visualization/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
