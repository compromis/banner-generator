<template>
  <div :class="{
    'speaker-list': true,
    'accepts-description': acceptsDescription,
    'accepts-picture': acceptsPicture
  }">
    <label class="label">{{ label }}</label>
    <ul class="speakers">
      <li v-for="(speaker, i) in speakers" :key="i" class="speaker-item">
        <b-field class="speaker-name" :type="speaker.name ? '' : displayErrors ? 'is-danger' : ''">
          <b-input
            :placeholder="placeholder"
            :ref="`speaker${i}`"
            :name="`speaker${i}`"
            v-model="speaker.name"
            @keyup.enter.native="addSpeaker"
            size="is-small"
            :icon="icon"
            :maxlength="maxLengthName">
          </b-input>
        </b-field>
        <b-field class="speaker-description" v-if="acceptsDescription">
          <b-input
            placeholder="Càrrec"
            v-model="speaker.description"
            @keyup.enter.native="addSpeaker"
            :name="`speaker_desc${i}`"
            size="is-small"
            icon="credit-card-blank"
            :maxlength="maxLengthDescription">
          </b-input>
        </b-field>
        <b-field class="speaker-picture" v-if="acceptsPicture">
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
        </b-field>
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
      <b-button @click="addSpeaker" size="is-small" rounded icon-left="plus">{{ labelAdd }}</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'speaker-list',

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
  @import "../sass/variables";

  .speaker-list {
    margin-bottom: 1rem;
  }

  .speakers {
    margin-bottom: .75rem;

    &-add {
      margin-bottom: .75rem;
    }
  }

  .speaker {
    &-item {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-areas: "name remove";
      grid-gap: .75rem;
      border-bottom: 1px $gray-200 solid;
      padding: .75rem 0;

      .field {
        margin-bottom: 0;
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
      grid-area: remove;
    }
  }

  .accepts-picture.accepts-description {
    .speaker-item {
      grid-template-columns: 4.35rem 1fr auto;
      grid-template-areas:
        "picture name remove"
        "picture description remove";
    }
  }

  .accepts-description {
    .speaker-item {
      grid-template-columns: 1fr auto;
      grid-template-areas:
        "name remove"
        "description remove";
    }
  }

  .accepts-picture {
    .speaker-item {
      grid-template-columns: 4.35rem 1fr auto;
      grid-template-areas:
        "picture name remove"
        "picture description remove";
    }
  }

  .upload-draggable.is-danger {
    border-color: $danger;
  }
</style>
