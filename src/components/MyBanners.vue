<template>
  <div class="my-banners">
    <h1>Les meues targes</h1>
    <div class="my-banners-list">
      <banner-item />
    </div>
  </div>
</template>

<script>
import BannerItem from '@/components/ui/BannerItem'

export default {
  name: 'my-banners',

  components: {
    BannerItem
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
  }
</style>
