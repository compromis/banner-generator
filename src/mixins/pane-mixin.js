import { EventBus } from '@/event-bus.js'
import PictureUpload from '@/components/pane/PictureUpload.vue'
import RangeSlider from '@/components/pane/RangeSlider.vue'
import CInputText from '@/components/pane/CInputText'
import CSelect from '@/components/pane/CSelect'
import CField from '@/components/pane/CField'
import ColorSelector from '@/components/pane/ColorSelector'

export default {
  // Shared components across templates
  components: {
    RangeSlider,
    PictureUpload,
    CInputText,
    CSelect,
    CField,
    ColorSelector
  },

  // Shared data across templates
  data () {
    return {
      properties: {
        theme: 'glowy',
        mode: 'white',
        picture: null,
        picturePreview: '',
        picturePos: 50,
        pictureAspect: 'horizontal',
        pictureDimensions: null,
        hashtag: '',
        hasLocalLabel: false,
        localLabel: ''
      },
      errors: {},
      aspect: 0,
      isDownloadable: false,
      displayErrors: false,
      paneDimmed: false,
      availableColors: {
        glowy: ['none', 'orange', 'lgbt', 'feminism'],
        blobs: ['orange', 'lgbt', 'feminism'],
        blobless: ['orange', 'black', 'lgbt', 'feminism']
      }
    }
  },

  created () {
    // Emit default properties to canvas on creation
    this.$emit('updated', this.properties)

    // Update aspect
    EventBus.$on('aspectUpdated', (aspect) => { this.aspect = aspect })

    // Display errors
    EventBus.$on('checkForErrors', (check) => {
      this.displayErrors = check
      this.errors = {}
      this.validate()
      if (check && !this.isDownloadable) {
        window.scrollTo({
          top: 400,
          behavior: 'smooth'
        })
      }
    })
  },

  mounted () {
    EventBus.$emit('paneLoaded', true)
  },

  // Emit banner property changes to canvas
  watch: {
    properties: {
      handler: function (properties) {
        this.$emit('updated', properties)
        this.errors = {}
        this.validate()
        this.isDownloadable = Object.keys(this.errors).length === 0

        if ('color' in properties && !this.availableColors[properties.theme].includes(properties.color)) {
          this.properties.color = 'orange'
        }
      },
      deep: true
    },

    isDownloadable: function (isDownloadable) {
      this.$emit('updateIsDownloadable', isDownloadable)
    }
  },

  // Shared functionality across templates
  methods: {
    updateImage (image) {
      this.properties.picture = image
      this.properties.picturePreview = URL.createObjectURL(image)

      const img = new Image()
      img.onload = () => {
        const { width, height } = img
        this.properties.pictureAspect = (width / height > 1) ? 'horizontal' : 'vertical'
        this.properties.pictureDimensions = { width, height }
      }
      img.src = this.properties.picturePreview
    },

    updateHashtag (hashtag) {
      if (!hashtag) {
        this.properties.hashtag = ''
        return
      }

      const formattedHashtag = hashtag.replace(/ /g, '')

      if (hashtag[0] === '#') {
        this.properties.hashtag = formattedHashtag
      } else {
        this.properties.hashtag = '#' + formattedHashtag
      }
    },

    dimPane (dimmed) {
      this.paneDimmed = dimmed
    },

    fieldRequired (fields) {
      Object.keys(fields).forEach(field => {
        if (!this.properties[field]) {
          if (field in this.errors) {
            this.errors[field].push(fields[field])
          } else {
            this.errors[field] = [fields[field]]
          }
        }
      })
    },

    pictureRequired () {
      if (!this.properties.picture) {
        this.errors.picture = ['Has de seleccionar una foro']
      }
    },

    allCapsDisallowed (...fields) {
      const errorMessage = 'Recomanem no escriure tot el text en majúscules'
      fields.forEach(field => {
        if (this.properties[field].toUpperCase() === this.properties[field] && this.properties[field]) {
          if (field in this.errors) {
            this.errors[field].push(errorMessage)
          } else {
            this.errors[field] = [errorMessage]
          }
        }
      })
    },

    setFieldType (field) {
      return field in this.errors && this.displayErrors ? 'is-danger' : ''
    },

    setFieldMessage (field) {
      return field in this.errors && this.displayErrors ? this.errors[field].join('. ') : ''
    }
  }
}
