<template>
  <a href="#" class="banner-item">
    <div class="banner-item-thumbnail">
      <img src="" alt="" v-if="banner.thumbnail">
      <b-icon :icon="template.icon" :pack="template.iconPack || 'far'" size="is-large" v-else />
    </div>
    <div class="banner-item-info">
      <div class="banner-title"><input :placeholder="banner.title" :disabled="disabled" ref="input" @blur="update()"><button @click="handleClick()"><b-icon :icon="disabled ? 'pen' : 'check'" pack="far" /></button></div>
      <div class="banner-type"><b-icon :icon="template.icon" :pack="template.iconPack || 'far'" />{{ template.name }}</div>
      <div class="banner-saved"><b-icon icon="save" pack="far" />{{ banner.lastSaved }}</div>
      <a href="#" class="banner-delete"><b-icon icon="trash" pack="far" />Esborrar</a>
    </div>
  </a>
</template>

<script>
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
      disabled: true
    }
  },

  computed: {
    template () {
      const { templates } = this.$store.state
      return templates.find(template => template.id === this.banner.type)
    }
  },

  methods: {
    update () {
      this.disabled = true
    },

    handleClick () {
      if (this.disabled) {
        this.disabled = false
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      } else {
        this.disabled = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.banner-item {
  &-thumbnail {
    background: $gray-400;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    height: 180px;
    width: 180px;
    transition: .25s ease-in-out;

    .icon {
      color: $white;
    }
  }

  &-info {
    margin-top: 1rem;

    .banner-title {
      position: relative;
      display: flex;
      color: $gray-darkest;
      max-width: 180px;
      margin-bottom: .5rem;
      line-height: 1.3;

      input {
        font-size: 1.12rem;
        width: 180px;
        border: none;
        background: transparent;
        border-radius: .25rem;

        &:disabled {
          color: $gray-darkest;
        }
      }

      .icon {
        font-size: 1rem;
      }

      button {
        opacity: 0;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        border: none;
        padding: 0;
        background: transparent;
        z-index: 1;
        color: $gray-700;
        transition: .1s ease-in-out;
        cursor: pointer;
        border-radius: .25rem;
      }

      &::after {
        content: '';
        position: absolute;
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 80%);
        right: 2px;
        top: 1px;
        height: 20px;
        width: 24px;
      }

      button, input {
        &:focus {
          opacity: 1;
          outline: none;
          box-shadow: $focus-shadow;
        }
      }
    }

    .banner-type, .banner-saved, .banner-delete {
      display: flex;
      align-items: center;
      font-size: 1rem;
      color: $gray-700;
      margin-top: .25rem;

      .icon {
        font-size: 1.25rem;
        margin-right: .5rem;
      }
    }

    .banner-delete {
      opacity: 0;
      color: red;
      transition: .25s ease-in-out;
      border-radius: .25rem;
      display: inline-flex;
      padding-right: .25rem;

      &:focus {
        opacity: 1;
        outline: none;
        box-shadow: $focus-shadow;
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &:hover, &:focus, &:focus-within {
    .banner-item-thumbnail {
      transform: rotate($rotation) scale(1.02);
    }

    .banner-delete, button, input {
      opacity: 1;
    }

    .banner-title::after {
      width: 50px;
    }
  }

  &:focus {
    outline: none;

    .banner-item-thumbnail {
      box-shadow: $focus-shadow;
    }
  }
}
</style>
