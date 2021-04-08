import Vue from 'vue'
import Router from 'vue-router'
import TemplateSelector from './components/TemplateSelector'
import AppWorkspace from './components/AppWorkspace'
import MyBanners from './components/MyBanners'

Vue.use(Router)

export default new Router({
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
      path: '/*',
      name: 'workspace',
      component: AppWorkspace
    }
  ]
})
