<template>
  <div></div>
</template>

<script>
import http from '@/http'

export default {
  async mounted () {
    await this.guestOrUser()

    const { type } = this.$route.params
    const title = this.$store.state.templates.find(template => template.id === type).name
    const banner = await http.create(type, title)
    this.$router.push(`/editor/${banner.ref}`)
  },

  methods: {
    async guestOrUser () {
      const { token } = this.$store.state.auth

      if (!token) {
        const guest = await http.guest()
        this.$store.commit('auth/setToken', guest.token.token)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
