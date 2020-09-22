<template>
  <b-field
      label="Foto"
      class="image-upload-field"
      :type="fieldName in errors && displayErrors ? 'is-danger' : ''"
      :message="fieldName in errors && displayErrors ? errors[fieldName].join('. ') : ''">
      <b-upload
        @input="(picture) => $emit('upload', picture)"
        drag-drop
        accept="image/*"
        :type="picture ? '' : displayErrors ? 'is-danger' : ''">
        <div class="content has-text-centered" v-if="!picture">
          <b-icon icon="upload" size="is-large" />
          <p>Arrosega la foto</p>
        </div>
        <div class="picture-preview has-text-centered" v-else>
          <img :src="preview" alt="Imatge" />
          <span>{{ picture.name }}</span>
        </div>
      </b-upload>
      <b-button
        v-if="picture"
        @click="$emit('delete')"
        class="remove-image"
        type="is-danger"
        size="is-small"
        icon-right="times">
      </b-button>
    </b-field>
</template>

<script>
export default {
  name: 'picture-upload',

  props: {
    picture: File,
    displayErrors: Boolean,
    errors: Object,
    fieldName: {
      type: String,
      default: 'picture'
    }
  },

  computed: {
    preview: function () {
      return URL.createObjectURL(this.picture)
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

  .remove-image {
    position: absolute;
    right: 0;
    top: 2rem;
    border-top-right-radius: 6px;
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
