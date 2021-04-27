<template>
  <div :class="['rename-title', { saving, editing }]">
    <form @submit.prevent="rename">
      <input
        ref="title"
        aria-label="Títol"
        type="text"
        class="rename-title-input"
        :placeholder="template.name"
        :disabled="saving"
        autocomplete="off"
        spellcheck="off"
        v-model="title"
        @focus="focused"
        @blur="rename">
      <button type="submit" class="rename-title-submit">
        <font-awesome-icon :icon="['far', 'check']" class="icon-check" />
      </button>
      <button type="button" class="rename-title-edit" @click="$refs.title.focus()">
        <font-awesome-icon :icon="['far', 'pen']" class="icon-pen" />
      </button>
    </form>
  </div>
</template>

<script>
import http from '@/http'

export default {
  data () {
    return {
      saving: false,
      editing: false
    }
  },

  methods: {
    async rename () {
      this.saving = true
      this.editing = false
      const title = this.title || this.template.name
      const banner = await http.rename(this.bannerMeta.id, title)
      this.title = banner.title
      this.saving = false
    },

    focused () {
      this.editing = true
    }
  },

  computed: {
    bannerMeta () {
      return this.$store.state.bannerMeta
    },

    title: {
      get () {
        const banner = this.bannerMeta
        return banner ? banner.title : ''
      },
      set (title) {
        this.$store.commit('updateBannerTitle', title)
      }
    },

    template () {
      const { templates } = this.$store.state
      return templates.find(template => template.id === this.bannerMeta.type)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";

  .rename-title {
    position: relative;

    form {
      flex-grow: 1;
    }

    &-input {
      width: 100%;
      background: transparent;
      border: 1px transparent solid;
      color: $white;
      border-radius: .25rem;
      padding: .25rem 2rem .25rem .5rem;
      font-size: 1.25rem;
      opacity: .75;
      transition: .2s ease;

      &::placeholder {
        color: $gray-600;
      }

      &:disabled {
        opacity: .5;
      }
    }

    // Hover/focus-within on parent prevents loss
    // of input styles when hovering/focusing submit button
    &:hover {
      .rename-title-input {
        border-color: rgba($white, .25);
        opacity: 1;
      }

      .rename-title-edit {
        display: block;
      }
    }

    &.editing {
      .rename-title-input {
        outline: 0;
        background: rgba($white, .15);
        border-color: transparent;
        opacity: 1;
      }

      .rename-title-submit {
        display: block;
      }

      .rename-title-edit {
        display: none;
      }
    }

    &-submit,
    &-edit {
      display: none;
      appearance: none;
      background: transparent;
      border: 0;
      position: absolute;
      right: .25rem;
      top: 0;
      bottom: 0;
      color: $white;
      cursor: pointer;
      border-radius: .25rem;
      transition: .2s ease;

      &:hover {
        background: rgba($white, .25);
      }

      &:focus {
        outline: 0;
        box-shadow: 0 0 0 1px $white;
      }
    }
  }
</style>
