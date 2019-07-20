import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import KepalaKeluarga from '@/views/KepalaKeluarga'
import Warga from '@/views/Warga'
import RetribusiKebersihan from '@/views/RetribusiKebersihan'
import RetribusiKeamanan from '@/views/RetribusiKeamanan'
import Temporary from '@/views/Temporary'
import Document from '@/views/Document'

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
      path: '/kepalakeluarga',
      name: 'kepalaKeluarga',
      component: KepalaKeluarga
    },
    {
      path: '/warga',
      name: 'warga',
      component: Warga
    },
    {
      path: '/retribusikebersihan',
      name: 'retribusiKebersihan',
      component: RetribusiKebersihan
    },
    {
      path: '/retribusikeamanan',
      name: 'retribusiKeamanan',
      component: RetribusiKeamanan
    },
    {
      path: '/temporary',
      name: 'temporary',
      component: Temporary
    },
    {
      path: '/document',
      name: 'document',
      component: Document
    },
  ]
})
