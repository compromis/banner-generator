<template>
  <router-link to="/" class="banner-item-add">
    <b-icon icon="plus" pack="far" size="is-large" />
    <div>Nova tarja</div>
  </router-link>
</template>

<script>
export default {
  name: 'banner-add'
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.banner-item-add {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid $gray-400;
    border-radius: 30px;
    height: 180px;
    width: 180px;
    transition: .25s ease-in-out;
    color: $gray-700;

  &:focus {
    outline: none;
    box-shadow: $focus-shadow;
  }
}
</style>
