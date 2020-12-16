import CompromisLogo from '@/components/utils/CompromisLogo'
import moment from 'moment'
moment.locale('ca')

export default {
  components: {
    CompromisLogo
  },

  props: {
    banner: Object,
    aspect: String
  },

  computed: {
    objectPosition () {
      const objectPosition = (this.banner.pictureAspect === 'vertical')
        ? '0% ' + (100 - this.banner.picturePos) + '%'
        : (100 - this.banner.picturePos) + '% 0%'
      return { objectPosition }
    }
  },

  filters: {
    formatDate (date) {
      return moment(date).format('dddd, D MMMM')
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

    // deprecated
    formatLocal (local) {
      return local
        .trim()
        .replace(/^per/gi, '')
        .replace(/#/g, '')
    }
  },

  methods: {
    fontSize (text, maxFontSize, minFontSize, maxLength, multiplier, returnInt) {
      const adjust = multiplier ? multiplier / 100 : 1
      const propLength = text.length / maxLength
      const fontSize = (maxFontSize * adjust) + propLength * ((minFontSize * adjust) - (maxFontSize * adjust))
      return returnInt ? fontSize : `${fontSize}px`
    }
  }
}
