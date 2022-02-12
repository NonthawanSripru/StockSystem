import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../components/loginPage.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/ShowDetails',
    name: 'ShowDetails',
    component: () => import('../views/ShowDetails.vue')
  },
  {
    path: '/ScanQR-Product',
    name: 'ScanQr',
    component: () => import('../views/ScanQr.vue')
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/home/:page',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../components/loginPage.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
