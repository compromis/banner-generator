import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import templates from '@/components/templates/templates'
import aspects from '@/components/templates/aspects'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    templates,
    aspects,
    template: null,
    aspect: '11',
    banner: null,
    bannerMeta: null,
    errors: {},
    displayErrors: false,
    isDownloadable: true,
    availableColors: {
      glowy: ['none', 'orange', 'lgbt', 'feminism', 'transparent'],
      blobs: ['orange', 'lgbt', 'feminism', 'transparent'],
      blobless: ['orange', 'black', 'lgbt', 'feminism', 'transparent']
    },
    settings: {
      showArchive: false,
      showLogoSelector: false,
      transparentMode: false
    }
  },
  mutations: {
    setTemplate (state, template) {
      state.template = template
    },

    setAspect (state, aspect) {
      state.aspect = aspect
    },

    setBannerMeta (state, banner) {
      state.bannerMeta = banner
    },

    updateBanner (state, banner) {
      state.banner = banner
    },

    updateBannerTitle (state, title) {
      state.bannerMeta.title = title
    },

    updateChild (state, value) {
      state.child = value
    },

    updateErrors (state, errors) {
      state.errors = errors
    },

    addError (state, { field, message }) {
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
  },
  modules: {
    auth
  },
  plugins: [createPersistedState({
    paths: ['auth']
  })]
})
