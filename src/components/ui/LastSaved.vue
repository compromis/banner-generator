<template>
  <div class="last-saved">
    <span v-if="saving" class="saving">
      <font-awesome-icon :icon="['far', 'save']" class="mr-2" />
      <span class="is-hidden-mobile">Desant...</span>
    </span>
    <span v-else-if="lastSaved">
      <span v-if="displayDate" :class="{ 'just-saved': justSaved }">
        <font-awesome-icon v-if="justSaved" :icon="['far', 'save']" class="mr-2" />
        <span class="is-hidden-mobile">Desat {{ displayDate }}</span>
      </span>
    </span>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ca'
dayjs.extend(relativeTime)
dayjs.locale('ca')

export default {
  data () {
    return {
      interval: null,
      displayDate: null,
      justSaved: false
    }
  },
  computed: {
    saving () {
      return false
    },
    lastSaved () {
      return this.$store.state.bannerMeta.updated_at
    }
  },
  watch: {
    lastSaved () {
      this.refresh()
      this.justSaved = true
      setTimeout(() => { this.justSaved = false }, 3000)
    }
  },
  mounted () {
    this.interval = setInterval(this.refresh, 30000)
    this.refresh()
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    refresh () {
      if (!this.lastSaved) return
      const now = dayjs()
      const savedAt = dayjs(this.lastSaved)
      this.displayDate = now.to(savedAt)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";

  .last-saved {
    display: flex;
    align-items: center;
    color: $gray-600;
    padding: 0 1rem;

    span {
      transition: .25s ease;
    }
  }

  .just-saved {
    color: $green;
  }

  .saving {
    animation: saving 2s infinite;
  }

  @keyframes saving {
    0% {
      opacity: 1;
    }

    50% {
      opacity: .5;
    }

    100% {
      opacity: 1;
    }
  }

  @media (max-width: $xs-breakpoint) {
    .last-saved {
      padding: 0;
    }
  }
</style>
