<template>
  <div class="c-field image-upload-field">
    <div class="c-field-info">
      <label>{{ label }}</label>
    </div>
    <div class="c-field-content">
      <b-upload
        @input="(picture) => $emit('upload', picture, ratio)"
        drag-drop
        accept="image/*"
        :type="'picture' in errors && displayErrors ? 'is-danger' : ''">
        <div class="content has-text-centered" v-if="!picture">
          <b-icon icon="upload" size="is-large" />
          <p>Arrosega la foto</p>
        </div>
        <div class="picture-preview has-text-centered" v-else>
          <img :src="preview" alt="Imatge" />
          <span v-if="picture">{{ picture.name }}</span>
        </div>
      </b-upload>
      <div v-if="'picture' in errors && displayErrors" class="error-text">Has d'ajuntar una foto</div>
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
export default {
  name: 'picture-upload',

  props: {
    picture: {
      type: [Object, File],
      default: null
    },
    displayErrors: Boolean,
    errors: Object,
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
}
</style>
