<template>
  <div class="nav-login">
    <template v-if="isLoggedIn">
      <c-dropdown :label="user.first_name" icon="user-circle" isGhost>
        <c-dropdown-item>
          <router-link to="/my-banners">
            <font-awesome-icon :icon="['far', 'square']" fixed-width />
            Les meues targes
          </router-link>
        </c-dropdown-item>
        <c-dropdown-item @click.native="logout" aria-role="listitem">
          <font-awesome-icon :icon="['far', 'sign-out-alt']" fixed-width />
          Tanca sessió
        </c-dropdown-item>
    </c-dropdown>
    </template>
    <template v-else>
      <a :href="ssoLoginUrl" class="button is-ghost">
        Les meues targes
        <font-awesome-icon :icon="['far', 'user-circle']" />
      </a>
    </template>
  </div>
</template>

<script>
import CDropdown from './CDropdown.vue'
import CDropdownItem from './CDropdownItem.vue'

export default {
  data () {
    return {
      ssoLoginUrl: process.env.VUE_APP_SSO_LOGIN_URL
    }
  },

  components: {
    CDropdown,
    CDropdownItem
  },

  computed: {
    user () {
      return this.$store.state.auth.user
    },

    isLoggedIn () {
      return !!this.$store.state.auth.user
    }
  },

  methods: {
    logout () {
      this.$store.commit('auth/logout')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";

  .nav-login {
    position: relative;
    z-index: 50;

    .button {
      color: $white;
      transition: .25s ease;

      &:hover {
        color: $white;
        text-decoration: none;
        background: rgba($white, .15);
      }

      &:focus {
        outline: 0;
        box-shadow: 0 0 0 2px $white;
      }

      .fa-user-circle {
        margin-left: .5rem;
      }
    }
  }
</style>
