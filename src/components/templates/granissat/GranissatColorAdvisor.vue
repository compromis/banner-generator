<template>
  <b-message v-if="color === 'feminist'">
    El color morat està reservat per a targes de temes feministes.
  </b-message>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    }
  }
}
</script>
