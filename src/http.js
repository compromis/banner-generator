import axios from 'axios'
import store from './store/index'

export class API {
  constructor () {
    this.apiUrl = process.env.VUE_APP_BACKEND_URL
    this.token = store.state.auth.token
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.headers.common.Authorization = 'Bearer ' + this.token
    axios.defaults.headers.common['X-XSRF-TOKEN'] = ''
  }

  user () {
    return this._call('get', 'auth/user')
  }

  myBanners (page, order, by, limit) {
    return this._call('get', 'banners', { params: { page, order, by, limit } })
  }

  banner (id) {
    return this._call('get', `banners/${id}`)
  }

  create (type, title) {
    return this._call('post', 'banners', { type, title })
  }

  rename (id, title) {
    return this._call('patch', `banners/${id}/rename`, { title })
  }

  remove (id) {
    return this._call('delete', `banners/${id}`)
  }

  _call (method, path, params) {
    return new Promise((resolve, reject) => {
      axios[method](this.apiUrl + '/api/' + path, params).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error.response.data)
      })
    })
  }
}

export default new API()
