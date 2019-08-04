import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Dashboard/Login'
import Home from '@/views/Dashboard/Home'
import Warga from '@/views/Dashboard/Warga'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/warga',
      name: 'warga',
      component: Warga
    },
  ]
})
