import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Dashboard/Login'
import Home from '@/views/Dashboard/Home'
import Warga from '@/views/Dashboard/Warga'
import WargaTemp from '@/views/Dashboard/WargaTemp'
import RetribusiKebersihan from '@/views/Dashboard/RetribusiKebersihan'
import RetribusiKeamanan from '@/views/Dashboard/RetribusiKeamanan'
import Document from '@/views/Dashboard/Document'
import Siskamling from '@/views/Dashboard/Siskamling'

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
    {
      path: '/wargatemp',
      name: 'wargatemp',
      component: WargaTemp
    },
    {
      path: '/retribusikebersihan',
      name: 'retribusikebersihan',
      component: RetribusiKebersihan
    },
    {
      path: '/retribusikeamanan',
      name: 'retribusikeamanan',
      component: RetribusiKeamanan
    },
    {
      path: '/document',
      name: 'document',
      component: Document
    },
    {
      path: '/siskamling',
      name: 'siskmaling',
      component: Siskamling
    },
  ]
})
