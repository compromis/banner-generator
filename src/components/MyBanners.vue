<template>
  <div class="my-banners">
    <h1>Les meues targes</h1>
    <div class="my-banners-list">
      <banner-item v-for="banner in banners" :key="banner.id" :banner="banner"/>
    </div>
  </div>
</template>

<script>
import BannerItem from '@/components/ui/BannerItem'

export default {
  name: 'my-banners',

  components: {
    BannerItem
  },

  data () {
    return {
      banners: [
        {
          id: '1',
          type: 'Headline',
          title: 'Titular de Carles Mulet',
          lastSaved: 'Fa 2 mesos',
          thumbnail: null
        },
        {
          id: '2',
          type: 'Quote',
          title: 'Frase de Carles Mulet',
          lastSaved: 'Fa 3 mesos',
          thumbnail: null
        },
        {
          id: '3',
          type: 'Tweet',
          title: 'Tweet de Carles Mulet',
          lastSaved: 'Fa 3 mesos',
          thumbnail: null
        }
      ]
    }
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
