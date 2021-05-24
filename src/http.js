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

  banner (ref) {
    return this._call('get', `banners/${ref}`)
  }

  create (type, title) {
    return this._call('post', 'banners', { type, title })
  }

  rename (ref, title) {
    return this._call('patch', `banners/${ref}/rename`, { title })
  }

  remove (ref) {
    return this._call('delete', `banners/${ref}`)
  }

  update (ref, content) {
    return this._call('patch', `banners/${ref}`, { content })
  }

  preview (ref, preview) {
    return this._call('patch', `banners/${ref}/preview`, { preview })
  }

  uploadPicture (ref, picture, name) {
    return this._call('post', `banners/${ref}/upload/${name}`, picture)
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
