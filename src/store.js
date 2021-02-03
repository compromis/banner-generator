import Vue from 'vue'
import Vuex from 'vuex'
import templates from '@/components/templates/templates'
import aspects from '@/components/templates/aspects'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    templates,
    aspects,
    template: null,
    aspect: '11',
    banner: null,
    errors: {},
    displayErrors: false,
    isDownloadable: true,
    availableColors: {
      glowy: ['none', 'orange', 'lgbt', 'feminism'],
      blobs: ['orange', 'lgbt', 'feminism'],
      blobless: ['orange', 'black', 'lgbt', 'feminism']
    },
    settings: {
      showArchive: false,
      showLogoSelector: false
    }
  },
  mutations: {
    setTemplate (state, template) {
      state.template = template
    },

    setAspect (state, aspect) {
      state.aspect = state.template.aspects[aspect]
    },

    updateBanner (state, banner) {
      state.banner = banner
    },

    updateErrors (state, errors) {
      state.errors = errors
    },

    addError (state, error) {
      const { field, message } = error
      if (field in state.errors) {
        state.errors[field].push(message)
      } else {
        state.errors[field] = [message]
      }
    },

    updateIsDownloadable (state, isDownloadable) {
      state.isDownloadable = isDownloadable
    },

    setDisplayErrors (state, displayErrors) {
      state.displayErrors = displayErrors
    },

    updateSettings (state, { prop, value }) {
      state.settings[prop] = value
      localStorage.setItem('settings', JSON.stringify(state.settings))
    },

    initialiseStore (state) {
      const settings = localStorage.getItem('settings')
      if (settings) {
        state.settings = JSON.parse(settings)
      }
    }
  }
})
