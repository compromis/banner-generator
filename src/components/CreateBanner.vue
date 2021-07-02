<template>
  <div></div>
</template>

<script>
import http from '@/http'

export default {
  async mounted () {
    const { type } = this.$route.params
    const { templates, auth } = this.$store.state
    const title = templates.find(template => template.id === type).name
    http.setToken(auth.token)
    const banner = await http.create(type, title)
    this.$router.push(`/editor/${banner.ref}`)
  }
}
</script>
