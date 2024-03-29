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
          small />
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
          small />
        <c-field class="speaker-picture" v-if="acceptsPicture" edge>
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
          <button v-if="speakers.length > minSpeakers" class="c-button-circle speaker-remove" @click="deleteSpeaker(i)">-</button>
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
import CField from '@/components/pane/CField.vue'
import CInputText from '@/components/pane/CInputText'
import http from '@/http'

export default {
  name: 'speaker-list',

  components: {
    CInputText,
    CField
  },

  props: {
    value: {
      type: Array,
      required: true
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

  computed: {
    speakers: {
      get () {
        return this.value
      },

      set (speakers) {
        this.$emit('input', speakers)
      }
    }
  },

  methods: {
    addSpeaker () {
      if (this.speakers.length >= this.maxSpeakers) return
      this.speakers.push({ name: '', description: '', picture: null })
      this.$nextTick(function () {
        const lastSpeaker = this.speakers.length - 1
        this.$refs['speaker' + lastSpeaker][0].$refs['speaker' + lastSpeaker].focus()
      })
    },

    deleteSpeaker (i) {
      this.speakers.splice(i, 1)
    },

    async updateSpeakerPicture (image, i) {
      const { ref } = this.$store.state.bannerMeta
      const img = new Image()
      this.speakers[i].picture = URL.createObjectURL(image)
      img.src = this.speakers[i].picture

      // Upload to AWS
      const formData = new FormData()
      formData.append('picture', image, image.name)
      const uploaded = await http.uploadPicture(ref, formData, 'speaker-' + i)
      this.$root.$emit('pictureFinishedUploading', true)
      this.speakers[i].uploadedPicture = uploaded.picture
    }
  }
}
</script>

<style lang="scss">
  @import "../../sass/variables";

  .pane {
    .speakers-add .c-button {
      font-size: .85rem;
    }

    .speakers {
      margin-top: .75rem;
      margin-bottom: -1px;
    }

    .speaker {
      &-item {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas: "name";
        padding: 0;
        position: relative;
        border: 1px $gray-200 solid;
        margin: 1rem;
        border-radius: .5rem;

        .field {
          margin-bottom: 0;
        }
      }

      &-name {
        grid-area: name;
      }

      &-description {
        grid-area: description;
        border-bottom: 0;
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
        border-right: 1px solid $gray-200;
        border-bottom: 0;

        & > div {
          display: flex;
        }

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
        top: .25rem;
        right: -.25rem;

        .button {
          border-radius: 100%;
          width: 1.25rem;
          padding: 0;
          height: 1.25rem !important;
        }
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
  }
</style>
