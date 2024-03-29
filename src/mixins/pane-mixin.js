import http from '@/http'
import { debounce } from 'lodash'
import PictureUpload from '@/components/pane/PictureUpload.vue'
import RangeSlider from '@/components/pane/RangeSlider.vue'
import CInputText from '@/components/pane/CInputText'
import CSelect from '@/components/pane/CSelect'
import CField from '@/components/pane/CField'
import ColorSelector from '@/components/pane/ColorSelector'
import LogoSelector from '@/components/pane/LogoSelector'
import AdvancedPictureUpload from '@/components/pane/AdvancedPictureUpload'

export default {
  // Shared components across templates
  components: {
    RangeSlider,
    PictureUpload,
    AdvancedPictureUpload,
    CInputText,
    CSelect,
    CField,
    ColorSelector,
    LogoSelector
  },

  // Shared data across templates
  data () {
    return {
      properties: { // Default props for all templates
        theme: 'blobless',
        mode: 'white',
        picture: null,
        picturePreview: '',
        picturePos: 50,
        pictureCrop: {
          scale: 100,
          x: 50,
          y: 50
        },
        pictureAspect: 'horizontal',
        pictureDimensions: null,
        hashtag: '',
        hasLocalLabel: false,
        localLabel: '',
        logo: 'compromis'
      },
      paneDimmed: false
    }
  },

  computed: {
    availableColors () {
      return this.$store.state.availableColors
    },

    aspect () {
      return this.$store.state.aspect
    },

    aspectProperties () {
      return this.$store.state.aspects[this.aspect]
    },

    displayErrors: {
      get () {
        return this.$store.state.displayErrors
      },

      set (value) {
        this.$store.commit('setDisplayErrors', value)
      }
    },

    errors () {
      return this.$store.state.errors
    },

    isInTransparentMode () {
      return this.$store.state.settings.transparentMode
    }
  },

  async mounted () {
    const { content } = this.$store.state.bannerMeta

    if (content) { // Set props from database
      let properties
      if (typeof content === 'object') {
        this.properties = { ...content }
      } else {
        properties = JSON.parse(content)
        this.properties = properties
      }

      // For backwards compatibility, set default pictureCrop if not present
      if (!this.properties.pictureCrop) {
        this.properties.pictureCrop = { scale: 100, x: 50, y: 50 }
      }

      this.$store.commit('updateBanner', properties)
    } else { // Set default props for tempate
      this.$store.commit('updateBanner', this.properties)
    }

    this.$root.$on('checkForErrors', () => {
      this.checkForErrors()
    })
  },

  // Emit banner property changes to canvas
  watch: {
    properties: {
      handler: function (properties) {
        this.$store.commit('updateBanner', properties)
        this.checkForErrors()

        // Check color is available in selected theme
        // Otherwise, default to orange
        if ('color' in properties && !this.$store.state.availableColors[properties.theme].includes(properties.color)) {
          this.properties.color = 'orange'
        }

        // Update
        this.save(this)
      },
      deep: true
    },

    aspect () {
      // Check theme is available in selected aspect
      // Otherwise default to blobless
      if (this.availableThemes && !this.availableThemes.includes(this.properties.theme)) {
        this.properties.theme = this.availableThemes[0]
      }

      // update default ratio
      const { ratio } = this.aspectProperties
      this.refreshImageAspect({ ratio })
    }
  },

  // Shared functionality across templates
  methods: {
    save: debounce(async (self) => {
      const { banner, bannerMeta } = self.$store.state
      if (!banner) return

      // Remove blobs from object saved to db
      const keys = Object.keys(banner)
      const keysToRemove = keys.filter((key) => key.includes('Blob'))
      const bannerToSave = { ...banner }
      for (const keyToRemove of keysToRemove) {
        delete bannerToSave[keyToRemove]
      }
      const updated = await http.update(bannerMeta.ref, JSON.stringify(bannerToSave))
      self.$store.commit('setBannerMeta', updated)
    }, 1000),

    checkForErrors () {
      this.$store.commit('updateErrors', {})
      this.validate()
      this.$store.commit('updateIsDownloadable', Object.keys(this.errors).length === 0)
    },

    async updateImage (image, ratio) {
      this.customUpdateImage('', image, ratio || 1)
    },

    removeImage (prefix) {
      const picture = prefix ? `${prefix}Picture` : 'picture'
      const picturePreview = prefix ? `${prefix}PicturePreview` : 'picturePreview'
      const pictureBlob = prefix ? `${prefix}PictureBlob` : 'pictureBlob'
      const pictureDimensions = prefix ? `${prefix}PictureDimensions` : 'pictureDimensions'

      this.properties = Object.assign({}, this.properties, {
        [picture]: null,
        [picturePreview]: null,
        [pictureBlob]: null,
        [pictureDimensions]: null
      })
    },

    async customUpdateImage (prefix, image, ratio) {
      const { ref } = this.$store.state.bannerMeta
      const picture = prefix ? `${prefix}Picture` : 'picture'
      const picturePreview = prefix ? `${prefix}PicturePreview` : 'picturePreview'
      const pictureBlob = prefix ? `${prefix}PictureBlob` : 'pictureBlob'
      const pictureAspect = prefix ? `${prefix}PictureAspect` : 'pictureAspect'
      const pictureCrop = prefix ? `${prefix}PictureCrop` : 'pictureCrop'
      const pictureDimensions = prefix ? `${prefix}PictureDimensions` : 'pictureDimensions'

      // Upload to AWS
      const formData = new FormData()
      formData.append('picture', image, image.name)
      const uploaded = await http.uploadPicture(ref, formData, picture)
      this.$root.$emit('pictureFinishedUploading', true)

      // Set picture and calc dimensions
      this.properties[picture] = image
      this.properties[picturePreview] = uploaded.picture + '?t=' + new Date().getTime()
      this.properties[pictureBlob] = URL.createObjectURL(image)

      const img = new Image()
      img.onload = () => {
        const { width, height } = img
        this.properties[pictureAspect] = (width / height > ratio) ? 'horizontal' : 'vertical'
        this.properties[pictureDimensions] = { width, height }
        this.properties[pictureCrop] = { scale: 100, x: 50, y: 50 }
      }
      img.src = this.properties[pictureBlob]
    },

    refreshImageAspect ({ prefix, ratio, image }) {
      const picturePreview = prefix ? `${prefix}PicturePreview` : 'picturePreview'
      const pictureBlob = prefix ? `${prefix}PictureBlob` : 'pictureBlob'
      const pictureAspect = prefix ? `${prefix}PictureAspect` : 'pictureAspect'

      const img = new Image()
      img.onload = () => {
        const { width, height } = img
        this.properties[pictureAspect] = (width / height > ratio) ? 'horizontal' : 'vertical'
      }
      img.src = image || this.properties[pictureBlob] || this.properties[picturePreview]
    },

    noImageCropping (prefix, ratio = 1) {
      const pictureDimensions = prefix ? `${prefix}PictureDimensions` : 'pictureDimensions'
      if (!this.properties[pictureDimensions]) return true

      const { width, height } = this.properties[pictureDimensions]
      const imageRatio = parseFloat(width / height).toFixed(2)
      const templateRatio = parseFloat(ratio).toFixed(2)

      return imageRatio === templateRatio
    },

    updateCrop (crop, prefix) {
      const pictureCrop = prefix ? `${prefix}PictureCrop` : 'pictureCrop'
      this.properties[pictureCrop] = crop
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
          this.$store.commit('addError', { field, message: fields[field] })
        }
      })
    },

    pictureRequired (field = 'picture') {
      if (!this.properties.picture && !this.isInTransparentMode) {
        this.$store.commit('addError', { field, message: 'Has de seleccionar una foto' })
      }
    },

    allCapsDisallowed (...fields) {
      const message = 'Recomanem no escriure tot el text en majúscules'
      fields.forEach(field => {
        if (this.properties[field].toUpperCase() === this.properties[field] && this.properties[field]) {
          this.$store.commit('addError', { field, message })
        }
      })
    },

    setFieldType (field) {
      const { errors, displayErrors } = this
      return field in errors && displayErrors ? 'is-danger' : ''
    },

    setFieldMessage (field) {
      const { errors, displayErrors } = this
      return field in errors && displayErrors ? errors[field].join('. ') : ''
    }
  }
}
