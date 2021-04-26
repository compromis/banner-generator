<template>
  <div :class="['my-banners', { loading }]">
    <div class="my-banners-toolbar">
      <h1>Les meues targes</h1>
      <select class="text-button sort-button" @input="sort">
        <option value="updated_at.desc">Més recents primer</option>
        <option value="updated_at.asc">Més antics primer</option>
        <option value="title.asc">Alfabeticament</option>
        <option value="type.asc">Per tipus</option>
      </select>
      <router-link to="/" class="text-button new-banner">
        <font-awesome-icon :icon="['far', 'plus']" class="icon" />Nova tarja
      </router-link>
    </div>
    <transition name="fade" mode="out-in">
      <div key="al" v-if="!sorting">
        <transition-group name="list" tag="div" class="my-banners-list" mode="in-out">
          <banner-item v-for="banner in banners" :key="banner.id" :banner="banner" @remove="getBanners"/>
        </transition-group>
      </div>
    </transition>
    <button v-if="page != lastPage" class="text-button load-banners" @click="appendBanners">
      <template v-if="loading"><font-awesome-icon :icon="['far', 'circle-notch']" class="icon" spin />Carregant...</template>
      <template v-else><font-awesome-icon :icon="['far', 'chevron-down']" class="icon" />Més targes</template>
    </button>
  </div>
</template>

<script>
import BannerItem from '@/components/ui/BannerItem'
import http from '@/http'

export default {
  name: 'my-banners',

  components: {
    BannerItem
  },

  data () {
    return {
      banners: [],
      loading: true,
      page: 1,
      lastPage: 1,
      order: 'updated_at',
      by: 'desc',
      limit: 10,
      sorting: false
    }
  },

  mounted () {
    this.$store.commit('setTemplate', null)
    this.$store.commit('updateBanner', null)
    this.getBanners()
  },

  methods: {
    async getBanners () {
      this.loading = true
      const { page, order, by, limit } = this
      const bannersToLoad = (page * limit)
      const { data, lastPage } = await http.myBanners(1, order, by, bannersToLoad)
      this.banners = data
      this.lastPage = lastPage
      this.loading = false
    },

    async appendBanners () {
      this.page++
      this.loading = true
      const { page, order, by, limit } = this
      const { data, lastPage } = await http.myBanners(page, order, by, limit)
      this.banners.push(...data)
      this.lastPage = lastPage
      this.loading = false
    },

    sort (e) {
      this.sorting = true
      this.banners = []
      this.$nextTick(() => {
        const [order, by] = e.target.value.split('.')
        this.order = order
        this.by = by
        this.getBanners()
        this.sorting = false
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../sass/variables";

  .my-banners {
    padding-top: 5.25rem;
    margin: 0 auto;
    max-width: 72.5rem;

    &-toolbar {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    &.loading {
      pointer-events: none;
    }

    h1 {
      font-size: 2rem;
      color: $gray-700;
      margin-right: auto;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin: 0 -.75rem;
    }

    .text-button {
      display: flex;
      padding: 1rem;
      border-radius: .5rem;
      justify-content: center;
      color: $gray-700;
      font-size: 1.25rem;
      border: none;
      background: transparent;
      appearance: none;
      cursor: pointer;
      transition: .25s ease-in-out;

      .icon {
        display: block;
        margin-right: .5rem;
        transition: .65s ease-in-out;
        transform-origin: center center;
      }

      &:hover {
        background: $gray-100;
      }

      &:focus {
        outline: none;
        box-shadow: $focus-shadow;
      }

      &:hover, &:focus {
        background: $gray-100;
      }
    }

    .load-banners {
      margin: auto;
    }

    .sort-button, .sort-by-button, .new-banner {
      padding: .65rem .65rem;
    }

    select {
      option {
        padding: 0;
      }
    }
  }
</style>
