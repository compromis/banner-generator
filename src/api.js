function encode (data) {
  return Object.keys(data)
    .map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    )
    .join('&')
}

export default {
  saveToServer: (data) => {
    fetch('https://compromis.net/espai/targes/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encode(data)
    })
  },

  submitForm: (data) => {
    return new Promise((resolve, reject) => {
      fetch('https://compromis.net/espai/targes/contact/?test=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encode(data)
      }).then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(new Error(error.statusText))
      })
    })
  },

  fetchTweet: (id) => {
    return new Promise((resolve, reject) => {
      fetch('https://services.compromis.net/api/tweet/' + id)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText)
          }
          return response.json()
        })
        .then(data => {
          resolve(data)
        })
        .catch(error => {
          reject(new Error(error.statusText))
        })
    })
  }
}
