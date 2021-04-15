<template>
  <div>

  </div>
</template>

<script>
import http from '@/http'

export default {
  async mounted () {
    const { type } = this.$route.params
    const title = this.$store.state.templates.find(template => template.id === type).name
    const banner = await http.create(type, title)
    this.$router.push(`/editor/${banner.id}`)
  }
}
</script>

<style lang="scss" scoped>

</style>
