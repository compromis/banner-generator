import Vue from 'vue'
import Router from 'vue-router'
import TemplateSelector from './components/TemplateSelector'
import AppWorkspace from './components/AppWorkspace'
import MyBanners from './components/MyBanners'
import Login from './components/Login'
import CreateBanner from './components/CreateBanner'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'start',
      component: TemplateSelector
    },
    {
      path: '/my-banners',
      name: 'mybanners',
      component: MyBanners
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/editor/:id',
      name: 'workspace',
      component: AppWorkspace
    },
    {
      path: '/create/:type',
      name: 'create',
      component: CreateBanner
    }
  ]
})
