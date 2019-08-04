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
import Pengumuman from '@/views/Pengumuman'
import Siskamling from '@/views/Siskamling'
import Register from '@/views/Register'

Vue.use(Router)

export default new Router({
  //MASTER LEADER
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
    {
      path: '/pengumuman',
      name: 'pengumuman',
      component: Pengumuman
    },
    {
      path: '/siskamling',
      name: 'siskamling',
      component: Siskamling
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
  ]
})
