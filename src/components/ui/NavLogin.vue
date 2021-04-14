<template>
  <div class="nav-login">
    <template v-if="isLoggedIn">
      <b-dropdown :triggers="['hover', 'click']" aria-role="list" position="is-bottom-left">
        <template #trigger>
          <b-button
              label="Username"
              type="is-ghost"
              class="button"
              icon-right="user-circle" />
        </template>

        <b-dropdown-item aria-role="listitem" has-link>
          <router-link to="/my-banners">
            <font-awesome-icon :icon="['far', 'square']" fixed-width />
            Les meues targes
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item aria-role="listitem">
          <font-awesome-icon :icon="['far', 'sign-out-alt']" fixed-width />
          Tanca sessió
        </b-dropdown-item>
        </b-dropdown>
    </template>
    <template v-else>
      <a href="https://compromis.net/espai/auth/sso/targes_local" class="button is-ghost">
        Les meues targes
        <font-awesome-icon :icon="['far', 'user-circle']" />
      </a>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return !!this.$store.state.auth.token
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
