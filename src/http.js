import axios from 'axios'
import store from './store/index'

export default class API {
  constructor () {
    this.apiUrl = 'http://localhost:3333'
    this.token = store.state.auth.token
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.headers.common.Authorization = 'Bearer ' + this.token
    axios.defaults.headers.common['X-XSRF-TOKEN'] = ''
  }

  user () {
    return this._call('get', 'auth/user')
  }

  myBanners () {
    return this._call('get', 'banners')
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
