<template>
  <a href="https://somriure.compromis.net" target="_blank" class="psa card elsomriure">
    <span class="psa-flare">✨Nou</span>
    <h4>Generador d'<img src="../../assets/elsomriure.svg" alt="El Somriure" class="elsomriure-logo" /></h4>
    <p>Presentem una nova ferramenta per a generar edicions impreses d'El Somriure per al vostre col·lectiu local</p>
  </a>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";

  .psa {
    position: relative;
    display: block;
    margin: 4rem 1rem 3rem 1rem;
    padding: 1.5rem 1.75rem;
    transition: .25s ease;

    &:hover {
      transform: translateY(-.5rem);
      box-shadow: $raised-shadow;

      .psa-flare {
        background: $orange;
      }
    }

    h4 {
      font-size: 2rem;
      color: $gray-600;
      line-height: 1.1;
      margin-bottom: .5rem;
    }

    p {
      color: $gray-600;
      font-size: 1.1rem;
      line-height: 1.25;
      margin: 0;
    }

    &-flare {
      position: absolute;
      background: $blue;
      padding: .25rem .5rem;
      border-radius: .25rem;
      color: $white;
      font-weight: bold;
      font-size: 1rem;
      position: absolute;
      right: 1rem;
      top: -.85rem;
      transition: .25s ease-in-out;
    }
  }

  .elsomriure {
    &-logo {
      height: 1.75rem;
    }
  }
</style>
