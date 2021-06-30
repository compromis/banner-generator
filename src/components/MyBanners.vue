<template>
  <div :class="['my-banners', { loading }]">
    <div class="my-banners-toolbar">
      <h1>Les meues targes</h1>
      <div class="sort-dropdown">
        <select class="text-button sort-button" @input="sort">
          <option value="updated_at.desc">Més recents primer</option>
          <option value="updated_at.asc">Més antigues primer</option>
          <option value="title.asc">Alfabèticament</option>
          <option value="type.asc">Per tipus</option>
        </select>
        <font-awesome-icon :icon="['far', 'chevron-down']" class="icon" />
      </div>
      <router-link to="/" class="text-button new-banner">
        <font-awesome-icon :icon="['far', 'plus']" class="icon" /> Nova tarja
      </router-link>
    </div>
    <template v-if="banners.length">
      <transition name="fade" mode="out-in">
        <div key="banners" v-if="!sorting">
          <transition-group name="list" tag="div" class="my-banners-list">
            <banner-item v-for="banner in banners" :key="banner.id" :banner="banner" @remove="getBanners"/>
          </transition-group>
        </div>
        <div key="sorting" v-else></div>
      </transition>
    </template>
    <div v-else class="empty">
      Encara no has creat cap tarja
    </div>
    <button v-if="page != lastPage || loading" class="text-button load-banners" @click="appendBanners">
      <template v-if="loading"><font-awesome-icon :icon="['far', 'circle-notch']" class="icon" spin />Carregant...</template>
      <template v-else-if="banners.length"><font-awesome-icon :icon="['far', 'chevron-down']" class="icon" />Més targes</template>
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
      pageTracker: 1,
      lastPage: 1,
      order: 'updated_at',
      by: 'desc',
      limit: 10,
      sorting: false
    }
  },

  created () {
    const { user } = this.$store.state.auth

    if (!user) {
      this.$router.push('/')
    }

    this.$store.commit('setTemplate', null)
    this.$store.commit('updateBanner', null)
    this.getBanners()
  },

  methods: {
    async getBanners () {
      this.loading = true
      const { pageTracker, order, by, limit } = this
      const bannersToLoad = (pageTracker * limit)
      const { data, lastPage } = await http.myBanners(1, order, by, bannersToLoad)
      this.banners = data
      this.page = 1
      this.lastPage = lastPage
      setTimeout(() => { this.loading = false }, 1000) // linger on loading while animations play
    },

    async appendBanners () {
      this.page++
      this.pageTracker++
      this.loading = true
      const { page, order, by, limit } = this
      const { data, lastPage } = await http.myBanners(page, order, by, limit)
      this.banners.push(...data)
      this.lastPage = lastPage
      setTimeout(() => { this.loading = false }, 1000) // linger on loading while animations play
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
      margin: 0 -.75rem;
    }

    .text-button {
      display: flex;
      align-items: center;
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
        font-size: 1.25rem;
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

    .sort-button, .new-banner {
      padding: .5rem .75rem;
      background: $white;
    }

    .sort-dropdown {
      position: relative;
      color: $gray-700;
      margin-right: .75rem;
      font-size: 1.25rem;
      border: 1px $gray-200 solid;
      border-radius: .65rem;

      select {
        padding-right: 2.75rem;
      }

      .icon {
        position: absolute;
        right: .75rem;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: $gray-400;
      }

      &:hover {
        border-color: $gray-100;
      }
    }
  }

  .empty {
    font-size: 1.75rem;
    text-align: center;
    margin: 10rem 0;
    color: $gray-600;
  }

@media (max-width: $md-breakpoint) {
  .my-banners {
    padding: 5.25rem 1rem 0;
  }

  .navbar.navbar--light .nav-login {
    color: $gray-900 !important;
  }
}

@media (max-width: $xs-breakpoint) {
  .my-banners {
    &-toolbar {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      column-gap: .5rem;
    }

    .sort-dropdown {
      margin: 0;

      select {
        width: 100%;
      }
    }

    h1 {
      margin-bottom: 1rem;
      grid-column: span 2;
    }
  }
}
</style>
