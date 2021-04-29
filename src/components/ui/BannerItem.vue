<template>
  <article :class="['banner-item', { 'disabled': !disabled }]" ref="wrapper">
    <router-link :event="disabled ? 'click' : false" :to="`/editor/${banner.id}`" class="banner-item-link">
      <div class="banner-item-thumbnail">
        <img :src="banner.preview" alt="" v-if="banner.preview">
        <b-icon :icon="template.icon" :pack="template.iconPack || 'far'" size="is-large" v-else />
      </div>
      <div class="banner-item-info">
        <div class="banner-type"><b-icon :icon="template.icon" :pack="template.iconPack || 'far'" />{{ template.name }}</div>
        <div class="banner-saved"><b-icon icon="save" pack="far" />{{ banner.updated_at | formatTime }}</div>
      </div>
    </router-link>
    <form :class="['banner-title', { saving }]" @submit.prevent="rename">
      <div @click="handleTitleClick" class="banner-title-input-wrapper">
        <input
          v-model="title"
          :disabled="disabled || saving"
          ref="input"
          @blur="handleBlur"
          autocomplete="off"
          spellcheck="off">
      </div>
      <button @click="handleClick" type="button" v-if="!saving">
        <b-icon :icon="disabled ? 'pen' : 'check'" pack="far" />
      </button>
      <font-awesome-icon :icon="['far', 'circle-notch']" spin v-else />
    </form>
    <button @click="remove" class="banner-delete"><b-icon icon="trash" pack="far" />Esborrar</button>
  </article>
</template>

<script>
import http from '@/http'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ca'
dayjs.extend(relativeTime)
dayjs.locale('ca')

export default {
  name: 'banner-item',

  props: {
    banner: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      title: '',
      saving: false,
      disabled: true
    }
  },

  mounted () {
    this.title = this.banner.title
  },

  computed: {
    template () {
      const { templates } = this.$store.state
      return templates.find(template => template.id === this.banner.type)
    }
  },

  filters: {
    formatTime (time) {
      const now = dayjs()
      const lastSaved = dayjs(time)
      return now.to(lastSaved)
    }
  },

  methods: {
    handleBlur () {
      this.rename()
    },

    handleClick () {
      if (this.disabled) {
        this.disabled = false
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      } else {
        this.rename()
        this.$nextTick(() => {
          this.$refs.wrapper.focus()
        })
      }
    },

    handleTitleClick () {
      if (this.disabled) {
        this.$router.push(`/editor/${this.banner.id}`)
      }
    },

    async rename () {
      this.saving = true
      const title = this.title || this.template.name
      const banner = await http.rename(this.banner.id, title)
      this.title = banner.title
      this.saving = false
      setTimeout(() => { this.disabled = true }, 200)
    },

    async remove () {
      const { id } = this.banner
      await http.remove(id)
      this.$emit('remove', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.banner-item {
  position: relative;
  padding: 1rem 0;
  will-change: transform max-width opacity;

  &-thumbnail {
    background: $gray-400;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;
    height: 13.25rem;
    width: 13.25rem;
    transition: .25s ease-in-out;
    margin: 0 .75rem;
    overflow: hidden;

    .icon {
      color: $white;
    }
  }

  &-link {
    &:focus {
      outline: none;

      .banner-item-thumbnail {
        box-shadow: $focus-shadow;
        transform: rotate($rotation) scale(1.02);
      }
    }
  }

  &.disabled {
    .banner-title-input-wrapper {
      cursor: pointer;
    }

    .banner-item-link {
      cursor: default;
    }
  }

  &-info {
    margin: 3rem .75rem 0 .75rem;

    .icon {
      font-size: 1rem;
    }
  }

  .banner-type, .banner-saved, .banner-delete {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: $gray-700;
    margin-top: .25rem;
    white-space: nowrap;
    text-overflow: ellipsis;

    .icon {
      font-size: 1.25rem;
      margin-right: .5rem;
    }
  }

  .banner-title {
    position: absolute;
    top: 14.85rem;
    display: flex;
    align-items: center;
    color: $gray-darkest;
    max-width: 180px;
    margin-bottom: .5rem;
    line-height: 1.3;
    margin: 0 .75rem;

    input {
      font-size: 1.12rem;
      width: 100%;
      border: none;
      background: transparent;
      border-radius: .25rem;
      text-overflow: ellipsis;
      padding-right: 2rem;

      &:disabled {
        color: $gray-darkest;
        color: pointer;
      }
    }

    &-input-wrapper {
      cursor: pointer;
    }

    &.saving {
      opacity: .5;
    }

    button {
      display: block;
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      color: $gray-700;
      transition: .1s ease-in-out;
      cursor: pointer;
      border-radius: .25rem;

      &:hover {
        color: $gray-900;
      }

      &:focus {
        outline: 0;
      }

      &:focus-visible {
        box-shadow: $focus-shadow;
      }
    }

    input {
      &:focus {
        opacity: 1;
        outline: none;
        box-shadow: $focus-shadow;
      }
    }
  }

    .banner-delete {
      opacity: 0;
      color: red;
      transition: .25s ease-in-out;
      border-radius: .25rem;
      display: inline-flex;
      padding-right: .25rem;
      margin: .2rem .75rem 0;

      &:focus {
        opacity: 1;
        outline: none;
        box-shadow: $focus-shadow;
      }

      &:hover {
        text-decoration: underline;
      }
    }

  &:hover, &:focus, &:focus-within {
    .banner-delete, button, input {
      opacity: 1;
    }

    .banner-title::after {
      width: 50px;
    }
  }

  &:hover:not(.disabled) {
    .banner-item-thumbnail {
      transform: rotate($rotation) scale(1.02);
    }
  }

  button {
    border: none;
    padding: 0;
    background: transparent;
    appearance: none;
    cursor: pointer;
  }
}
</style>
