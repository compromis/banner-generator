import Vue from 'vue'
import Router from 'vue-router'
import TemplateSelector from './components/TemplateSelector'
import AppWorkspace from './components/AppWorkspace'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: TemplateSelector
    },
    {
      path: '/*',
      name: 'workspace',
      component: AppWorkspace
    }
  ]
})
