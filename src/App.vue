<template>
  <div id="app">
    <app-header
      :in-workspace="$route.name === 'workspace'" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <app-background :hidden="backgroundHidden" />
  </div>
</template>

<script>
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
  },

  watch: {
    '$route' (to, from) {
      // Hide background blobs when user navigates to the workspace
      this.backgroundHidden = to.name === 'workspace'
    }
  }
}
</script>
