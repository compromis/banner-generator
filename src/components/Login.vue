<template>
  <div>
    Carregant
  </div>
</template>

<script>
import { API } from '@/http'

export default {
  async mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (!token) {
      this.$router.push('/')
    }

    await this.$store.commit('auth/setToken', token)
    const http = new API()
    const user = await http.user()
    this.$store.commit('auth/setUser', user)
    this.$router.push('/my-banners')
  }
}
</script>
