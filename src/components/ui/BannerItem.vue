<template>
  <div class="banner-item">
    <div class="banner-item-thumbnail">

    </div>
    <div class="banner-item-info">
      <div class="banner-title"></div>
      <div class="banner-type"></div>
      <div class="banner-saved"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'banner-item'
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
.banner-item {
  &-thumbnail {
    background: $gray-400;
    border-radius: 30px;
    height: 180px;
    width: 180px;
  }
}
</style>
