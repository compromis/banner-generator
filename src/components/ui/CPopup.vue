<template>
  <transition name="slide-fade">
    <div class="card popup-card" v-if="showPopup">
      <div class="info"><slot></slot></div>
      <div class="popup-buttons"><slot name="buttons"></slot></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.popup-card {
  position: absolute;
  padding: 1rem;
  top: .75rem;
  right: .75rem;
  width: 100%;
  max-width: 325px;
  z-index: 100;
  display: flex;
  flex-direction: column;

  .info {
    font-size: 1.15rem;
    margin-bottom: 1.75rem;
  }

  .popup-buttons {
    display: flex;
    justify-content: flex-end;
  }
}

@media (max-width: $xs-breakpoint) {
  .popup-card {
      position: fixed;
      top: 4.75rem;
      left: 50%;
      transform: translateX(-50%);
  }
}
</style>
