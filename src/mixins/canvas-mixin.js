import CompromisLogo from '@/utils/CompromisLogo'
import moment from 'moment'
moment.locale('ca')

export default {
  components: {
    CompromisLogo
  },

  props: {
    banner: Object,
    aspect: String,
    color: String
  },

  computed: {
    objectPosition: function () {
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

    formatLocal (local) {
      return local
        .replace(/^per/gi, '')
        .replace(/#/g, '')
    }
  },

  methods: {
    fontSize (prop, maxFontSize, minFontSize, maxLength) {
      const propLength = this.banner[prop].length / maxLength
      const fontSize = maxFontSize + propLength * (minFontSize - maxFontSize)
      return `${fontSize}px`
    }
  }
}
