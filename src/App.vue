<template>
  <div id="app" :class="'route-' + $route.name">
    <app-header
      :in-workspace="$route.name === 'workspace'" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <app-background :hidden="backgroundHidden" />
    <portal-target name="confirm" />
    <portal-target name="help" class="help-block" />
  </div>
</template>

<script>
import http from './http'
import AppHeader from './components/AppHeader'
import AppBackground from './components/AppBackground'

export default {
  name: 'app',

  components: {
    AppHeader,
    AppBackground
  },

  data () {
    return {
      backgroundHidden: false
    }
  },

  created () {
    /// Hide background blobs when user in the workspace
    this.backgroundHidden = this.$route.name === 'workspace'
    this.setGuest()
  },

  watch: {
    '$route' (to) {
      // Hide background blobs when user navigates to the workspace
      this.backgroundHidden = to.name === 'workspace'
    }
  },

  methods: {
    async setGuest () {
      const { token } = this.$store.state.auth

      if (!token) {
        const guest = await http.guest()
        this.$store.commit('auth/setToken', guest.token.token)
      }
    }
  }
}
</script>
