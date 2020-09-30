<template>
  <div :class="{
    'speaker-list': true,
    'c-field' : true,
    'accepts-description': acceptsDescription,
    'accepts-picture': acceptsPicture
  }">
    <label class="label c-field-info">{{ label }}</label>
    <ul class="speakers">
      <li v-for="(speaker, i) in speakers" :key="i" class="speaker-item">
        <c-input-text
          class="speaker-name"
          :type="speaker.name ? '' : displayErrors ? 'is-danger' : ''"
          :label="placeholder"
          :ref="`speaker${i}`"
          :name="`speaker${i}`"
          v-model="speaker.name"
          @keyup.enter.native="addSpeaker"
          size="is-small"
          :icon="icon"
          :maxlength="maxLengthName"
          small
        />
        <c-input-text
          class="speaker-description"
          v-if="acceptsDescription"
          label="Càrrec"
          v-model="speaker.description"
          @keyup.enter.native="addSpeaker"
          :name="`speaker_desc${i}`"
          size="is-small"
          icon="credit-card-blank"
          :maxlength="maxLengthDescription"
          small
        />
        <c-field class="speaker-picture" v-if="acceptsPicture">
          <b-upload
            @input="(image) => updateSpeakerPicture(image, i)"
            drag-drop
            accept="image/*"
            :type="speaker.picture ? '' : displayErrors ? 'is-danger' : ''">
            <div class="content has-text-centered" v-if="!speaker.picture">
              <b-icon icon="upload" size="is-small"></b-icon>
            </div>
            <div v-else class="content has-image-centered">
              <img :src="speaker.picture" alt="Imatge" />
            </div>
          </b-upload>
        </c-field>
        <div class="speaker-remove">
          <b-button
            @click="deleteSpeaker(i)"
            size="is-small"
            type="is-danger"
            icon-right="times"
            v-if="speakers.length > minSpeakers">
            </b-button>
        </div>
      </li>
    </ul>
    <div v-if="speakers.length < maxSpeakers" class="speakers-add">
      <button @click="addSpeaker" class="c-button">
        <font-awesome-icon :icon="['far', 'plus']" />
        {{ labelAdd }}
      </button>
    </div>
  </div>
</template>

<script>
import CInputText from '@/components/pane/CInputText'

export default {
  name: 'speaker-list',

  components: {
    CInputText
  },

  props: {
    defaultSpeakers: {
      type: Array,
      default: () => []
    },
    acceptsPicture: {
      type: Boolean,
      default: true
    },
    acceptsDescription: {
      type: Boolean,
      default: true
    },
    minSpeakers: {
      type: Number,
      default: 1
    },
    maxSpeakers: {
      type: Number,
      default: 4
    },
    maxLengthName: {
      type: Number,
      default: 25
    },
    maxLengthDescription: {
      type: Number,
      default: 45
    },
    displayErrors: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Ponents'
    },
    labelAdd: {
      type: String,
      default: 'Afegeix ponent'
    },
    placeholder: {
      type: String,
      default: 'Nom del ponent'
    },
    icon: {
      type: String,
      default: 'user'
    }
  },

  data () {
    return {
      speakers: []
    }
  },

  created () {
    this.speakers = this.defaultSpeakers
  },

  watch: {
    speakers: {
      handler: function () {
        this.$emit('updated', this.speakers)
      },
      deep: true
    }
  },

  methods: {
    addSpeaker () {
      if (this.speakers.length >= this.maxSpeakers) return
      this.speakers.push({ name: '', description: '', picture: null })
      this.$nextTick(function () {
        const lastSpeaker = this.speakers.length - 1
        this.$refs[`speaker${lastSpeaker}`][0].focus()
      })
    },

    deleteSpeaker (i) {
      this.speakers.splice(i, 1)
    },

    updateSpeakerPicture (image, i) {
      const img = new Image()
      this.speakers[i].picture = URL.createObjectURL(image)
      img.src = this.speakers[i].picture
    }
  }
}
</script>

<style lang="scss">
  @import "../../sass/variables";

  .speakers-add .c-button {
    font-size: .85rem;
  }

  .speaker {
    &-item {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-areas: "name";
      padding: 0;
      position: relative;

      .field {
        margin-bottom: 0;
      }

      &:first-child {
        padding-top: .25rem;
      }
    }

    &-name {
      grid-area: name;
    }

    &-description {
      grid-area: description;
    }

    &-name, &-description {
      .control .help.counter {
        margin-right: 0.8em;
        position: relative;
        margin-top: -2.9rem;
        z-index: 10;
        color: $gray-600;
        font-size: .65rem;
      }

      .input {
        padding-right: 2.75rem;
      }
    }

    &-picture {
      grid-area: picture;
      align-self: stretch;
      display: grid;
      align-items: stretch;
      padding: $field-padding;
      border-right: 1px solid $gray-300;
      border-bottom: 1px solid $gray-300;

      .control {
        display: flex;
        align-items: stretch;
      }

      .has-text-centered {
        padding-top: 1rem;
      }

      .has-image-centered {
        margin: .15rem;
        border-radius: .25rem;
        overflow: hidden;
        height: 3.15rem;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
    }

    &-remove {
      position: absolute;
      top: 0;
      left: 0;
      padding: .25rem;

      .button {
        border-radius: 100%;
      }
    }
  }

  :not(.accepts-picture) {
    .speaker-item {
      grid-template-columns: 3rem 1fr;
      grid-template-areas:
        "remove name"
        "remove description";
    }

    .speaker-remove {
      position: relative;
      grid-area: "remove";
    }
  }

  .accepts-picture.accepts-description {
    .speaker-item {
      grid-template-columns: 6rem 1fr auto;
      grid-template-areas:
        "picture name"
        "picture description";
    }
  }

  .accepts-description {
    .speaker-item {
      grid-template-columns: 1fr auto;
      grid-template-areas:
        "name"
        "description";
    }
  }

  .accepts-picture {
    .speaker-item {
      grid-template-columns: 4.35rem 1fr auto;
      grid-template-areas:
        "picture name"
        "picture description";
    }
  }

  .upload-draggable.is-danger {
    border-color: $danger;
  }
</style>
