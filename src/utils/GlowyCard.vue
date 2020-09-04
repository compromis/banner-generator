<template>
  <div class="glowy-card">

  </div>
</template>

<script>
export default {
  name: 'glowy-card',

  props: {
    image: {
      type: File,
      default: () => null
    },
    gradient: {
      type: String,
      default: 'orange',
      validator: function (value) {
        return ['orange', 'feminism', 'green', 'black'].indexOf(value) !== -1
      }
    },
    edge: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
