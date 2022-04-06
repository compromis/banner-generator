<template>
  <div class="c-field image-upload-field">
    <div class="c-field-info">
      <label>{{ label }}</label>
    </div>
    <div class="c-field-content">
      <b-upload
        @input="setPicture"
        drag-drop
        accept="image/*"
        :type="'picture' in errors && displayErrors ? 'is-danger' : ''">
        <div class="content has-text-centered" v-if="!picture && !loading">
          <b-icon icon="upload" size="is-large" />
          <p>Arrosega la foto</p>
        </div>
        <div class="content has-text-centered" v-else-if="loading">
          <font-awesome-icon :icon="['far', 'circle-notch']" class="icon icon-loading" spin />
          <p>Carregant...</p>
        </div>
        <AdvancedCropping :preview="preview" :ratio="ratio" v-model="pos" v-else />
      </b-upload>
      <div v-if="fieldName in errors && displayErrors" class="error-text">Has d'ajuntar una foto</div>
      <b-message v-if="advice" type="is-warning" size="is-small" class="resolution-warning">
        {{ advice }}
      </b-message>
      <b-button
        v-if="picture"
        @click="$emit('delete')"
        class="remove-image"
        type="is-danger"
        size="is-small"
        icon-right="times">
      </b-button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import AdvancedCropping from './AdvancedCropping'

export default {
  components: {
    AdvancedCropping
  },

  props: {
    picture: {
      type: [Object, File],
      default: null
    },
    crop: {
      type: Object,
      required: true
    },
    displayErrors: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Object,
      default: () => {}
    },
    fieldName: {
      type: String,
      default: 'picture'
    },
    label: {
      type: String,
      default: 'Foto'
    },
    ratio: {
      type: Number,
      default: 1
    },
    preview: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      loading: false
    }
  },

  mounted () {
    this.$root.$on('pictureFinishedUploading', (state) => {
      this.loading = !state
    })
  },

  computed: {
    advice () {
      const { banner } = this.$store.state
      const fieldName = `${this.fieldName}Dimensions`

      if (!banner || !banner[fieldName]) return false

      const { height, width } = banner[fieldName]

      return height < 800 || width < 800
        ? 'Aquesta foto es veurà pixelada. Recomanem utilitzar fotos amb una resolució de 800x800 com a mínim.'
        : false
    },

    pos: {
      get () {
        return this.crop
      },

      set (crop) {
        this.$emit('crop', crop)
      }
    }
  },

  methods: {
    setPicture (picture) {
      this.loading = true
      this.$emit('upload', picture, this.ratio)
    }
  }
}
</script>

<style lang="scss">
@import "../../sass/variables";

.image-upload-field {
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .75rem;
    min-height: 4.65rem;
  }

  .upload {
    margin-bottom: .5rem;
  }

  .c-field-content {
    position: relative;
  }

  .remove-image {
    position: absolute;
    right: 1rem;
    top: .75rem;
    border-top-right-radius: 6px;
  }

  .error-text {
    color: #f14668;
    font-size: 0.75rem;
    padding: .5rem 0 0;
  }

  .picture-preview {
    display: flex;
    align-items: center;

    img {
      width: 4.5rem;
      height: 4.5rem;
      object-fit: cover;
      border-radius: .25rem;
      margin-right: .5rem;
    }

    span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .upload-draggable {
    &:hover {
      border-color: $primary;
      background: mix($primary, $white, 5%);
    }

    &.is-danger {
      border-color: $danger;
    }
  }

  &.has-addons {
    flex-direction: column;
    width: 100%;
  }

  .resolution-warning {
    margin: 0;
  }
}

.icon-loading.svg-inline--fa.fa-w-16 {
  width: 2.25rem;
}
</style>
