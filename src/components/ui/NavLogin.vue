<template>
  <div class="nav-login">
    <template v-if="isLoggedIn">
      <c-dropdown name="user" :label="user.first_name" icon="user-circle" is-ghost>
        <c-dropdown-item to="/my-banners">
          <font-awesome-icon :icon="['far', 'square']" fixed-width class="mr-2" />
          Les meues targes
        </c-dropdown-item>
        <c-dropdown-item @click.native="logout" aria-role="listitem">
          <font-awesome-icon :icon="['far', 'sign-out-alt']" fixed-width class="mr-2" />
          Tanca sessió
        </c-dropdown-item>
    </c-dropdown>
    </template>
    <template v-else>
      <a :href="ssoLoginUrl" class="button is-ghost">
        <span class="is-hidden-mobile mr-2">Les meues targes</span>
        <font-awesome-icon :icon="['far', 'user-circle']" />
      </a>
    </template>
  </div>
</template>

<script>
import http from '@/http'
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
      return this.$store.getters['auth/isLoggedIn']
    }
  },

  methods: {
    async logout () {
      const guest = await http.guest()
      this.$store.commit('auth/logout')
      this.$store.commit('auth/setToken', guest.token.token)
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";

  .nav-login {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 50;

    .c-dropdown {
        margin: -.75rem;
    }

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
