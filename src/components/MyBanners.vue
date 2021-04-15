<template>
  <div class="my-banners">
    <h1>Les meues targes</h1>
    <div class="my-banners-list">
      <banner-item v-for="banner in banners" :key="banner.id" :banner="banner" @remove="getBanners()"/>
      <banner-add />
    </div>
  </div>
</template>

<script>
import BannerItem from '@/components/ui/BannerItem'
import BannerAdd from '@/components/ui/BannerAdd'
import Http from '@/http'

export default {
  name: 'my-banners',

  components: {
    BannerItem,
    BannerAdd
  },

  data () {
    return {
      banners: [
        {
          title: 'asfsafsfa',
          type: 'Headline'
        }
      ]
    }
  },

  methods: {
    async getBanners () {
      const api = new Http()
      this.banners = await api.myBanners()
      console.log(this.banners)
    }
  },

  mounted () {
    this.getBanners()
  }
}
</script>

<style lang="scss" scoped>
  @import "../sass/variables";

  .my-banners {
    display: grid;
    grid-template-rows: 1fr auto;
    padding-top: 5.25rem;
    margin: 0 auto;
    position: relative;
    max-width: 1000px;

    h1 {
      font-size: 2rem;
      color: $gray-700;
    }

    &-list {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 180px;
      gap: 1.5rem;
      width: 100%;
      flex-direction: row;
    }
  }
</style>
