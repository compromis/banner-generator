import moment from 'moment'

export default {
  computed: {
    banner () {
      return this.$store.state.banner
    },

    aspect () {
      return this.$store.state.aspect
    },

    objectPosition () {
      return this.computeObjectPosition()
    },

    backgroundPosition () {
      return this.computeBackgroundPosition()
    }
  },

  filters: {
    formatDate (date) {
      return moment(date).locale('ca').format('dddd, D MMMM')
    },

    formatTime (time) {
      return moment(time).format('H:mm')
    },

    formatQuote (quote) {
      if (!['?', '!', '.'].includes(quote.substring(quote.length - 1, quote.length))) {
        return quote + '.”'
      } else {
        return quote + '”'
      }
    },

    formatString (string) {
      if (string.includes('graphic design is my passion')) {
        const body = document.getElementsByTagName('body')[0]
        body.classList.add('easter-egg')
      }

      return string
        .replace(/'/g, '’')
        .replace(/Mònica Oltra/gi, 'Mónica Oltra')
        .replace(/Monica Oltra/gi, 'Mónica Oltra')
    },

    formatNumber (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    formatLocal (local) {
      return local
        .trim()
        .replace(/^per/gi, '')
        .replace(/ per /gi, '')
        .replace(/^pel/gi, '')
        .replace(/#/g, '')
    }
  },

  methods: {
    fontSize (text, maxFontSize, minFontSize, maxLength, multiplier, returnInt) {
      const adjust = multiplier ? multiplier / 100 : 1
      const propLength = text.length / maxLength
      const fontSize = (maxFontSize * adjust) + propLength * ((minFontSize * adjust) - (maxFontSize * adjust))
      return returnInt ? fontSize : `${fontSize}px`
    },

    formatDateLocale (date, lang = 'val') {
      const locales = { cas: 'es', val: 'ca' }
      return moment(date).locale(locales[lang]).format('dddd, D MMMM')
    },

    computeObjectPosition (prefix) {
      const pictureAspect = prefix ? `${prefix}PictureAspect` : 'pictureAspect'
      const picturePos = prefix ? `${prefix}PicturePos` : 'picturePos'

      const objectPosition = (this.banner[pictureAspect] === 'vertical')
        ? '0% ' + (100 - this.banner[picturePos]) + '%'
        : (100 - this.banner[picturePos]) + '% 0%'

      return {
        objectPosition
      }
    },

    computeBackgroundPosition (prefix) {
      const pictureAspect = prefix ? `${prefix}PictureAspect` : 'pictureAspect'
      const pictureCrop = prefix ? `${prefix}PictureCrop` : 'pictureCrop'

      // Adavanced Cropping
      const { scale, x, y } = this.banner[pictureCrop]
      const backgroundSize = (this.banner[pictureAspect] === 'vertical')
        ? `${scale}% auto`
        : `auto ${scale}%`
      const backgroundPosition = `${x}% ${y}%`

      return { backgroundSize, backgroundPosition }
    }
  }
}
