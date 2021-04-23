<template>
  <div :class="['my-banners', { loading }]">
    <h1>Les meues targes</h1>
    <div class="my-banners-list">
      <banner-add />
      <banner-item v-for="banner in banners" :key="banner.id" :banner="banner" @remove="getBanners()"/>
      <button v-if="page != lastPage" class="load-banners" @click="loadBanners()">
        <template v-if="loading"><font-awesome-icon :icon="['far', 'circle-notch']" class="icon" spin />Carregant...</template>
        <template v-else><font-awesome-icon :icon="['far', 'sync']" class="icon" />Carrega més targes</template>
      </button>
    </div>
  </div>
</template>

<script>
import BannerItem from '@/components/ui/BannerItem'
import BannerAdd from '@/components/ui/BannerAdd'
import http from '@/http'

export default {
  name: 'my-banners',

  components: {
    BannerItem,
    BannerAdd
  },

  data () {
    return {
      banners: [],
      loading: true,
      page: 1,
      lastPage: 1,
      order: 'updated_at',
      by: 'desc'
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
      const { page, order, by } = this
      const { data, lastPage } = await http.myBanners(page, order, by)
      this.banners.push(...data)
      this.lastPage = lastPage
      this.loading = false
    },

    loadBanners () {
      this.page++
      this.getBanners()
    }
  }
}
</script>

<style lang="scss">
  @import "../sass/variables";

  .my-banners {
    display: grid;
    grid-template-rows: 1fr auto;
    padding-top: 5.25rem;
    margin: 0 auto;
    position: relative;
    max-width: 984px;

    &.loading {
      opacity: .5;
      pointer-events: none;
    }

    h1 {
      font-size: 2rem;
      color: $gray-700;
      margin-bottom: 1.5rem;
    }

    &-list {
      display: grid;
      grid-template-columns: repeat(5, 180px);
      gap: 1.5rem;
      width: 100%;
    }

    .load-banners {
      display: flex;
      padding: 1rem;
      margin: auto;
      border-radius: .5rem;
      justify-content: center;
      color: $gray-700;
      font-size: 1.25rem;
      border: none;
      background: transparent;
      appearance: none;
      cursor: pointer;
      grid-column: span 5;
      transition: .25s ease-in-out;

      .icon {
        display: block;
        margin-right: .5rem;
        transition: .65s ease-in-out;
        transform-origin: center center;
      }

      &:hover {
        background: $gray-100;

        .icon {
          transform: rotate(360deg);
        }
      }

      &:focus {
        outline: none;
        box-shadow: $focus-shadow;
      }

      &:hover, &:focus {
        background: $gray-100;
      }
    }
  }
</style>
