<template>
  <div class="banner-item-modal">
    <div class="modal-content">
      <p>Estàs segur que vols esborrar aquesta tarja? Aquesta acció no pot desfer-se.</p>
      <div>
        <b-button type="is-danger" @click="$emit('remove')">Sí, esborra</b-button>
        <b-button type="is-light" @click="$emit('close')">Cancelar</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.banner-item-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: rgba($white, 0.6);
  backdrop-filter: blur(7px);
  height: 24rem;
  z-index: 10;
  text-align: center;

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 15rem;
    width: 100%;
    padding: 0 1.5rem;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.25;
    margin-bottom: .75rem;
  }

  .button {
    width: 80%;
    padding: .2rem .9rem;
    margin-bottom: .3rem;
  }
}
</style>
