import Vue from 'vue'
import Router from 'vue-router'
import TemplateSelector from './components/TemplateSelector'
import CreateBanner from './components/CreateBanner'
import AppWorkspace from './components/AppWorkspace'
import Login from './components/Login'
const MyBanners = () => import('./components/MyBanners')
const Admin = () => import('./components/Admin')

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
      name: 'my-banners',
      component: MyBanners
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/editor/:ref',
      name: 'workspace',
      component: AppWorkspace
    },
    {
      path: '/create/:type',
      name: 'create',
      component: CreateBanner
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
