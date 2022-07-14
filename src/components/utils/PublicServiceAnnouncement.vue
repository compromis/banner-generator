<template>
  <div class="tools">
    <h2>Més ferramentes</h2>
    <div class="psas">
      <a href="https://somriure.compromis.net" target="_blank" class="psa card elsomriure">
        <h4>Generador de Revistes</h4>
        <p>Genera revistes impreses per al teu col·lectiu local de forma senzilla i ràpida.</p>
      </a>
      <a href="https://comprom.is/crea" target="_blank" class="psa card shorturls">
        <h4>comprom.is/crea</h4>
        <p>Genera adreces curtes comprom.is per a compartir en xarxes i veure quanta gent fa clic.</p>
      </a>
      <a href="https://disseny.compromis.net" target="_blank" class="psa card disseny">
        <h4>Recursos de marca</h4>
        <p>Descarrega el logo del teu col·lectiu, tipografies i més recursos de disseny.</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import "../../sass/variables";

  .tools {
    margin: 4rem 1rem 3rem 1rem;

    h2 {
      color: rgba($gray-900, 0.25);
      font-size: 3rem;
      font-weight: bold;
      letter-spacing: -1px;
      line-height: 1;
      margin-bottom: 2rem;
    }
  }

  .psas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .psa {
    position: relative;
    display: block;
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
    grid-column: 1 / -1;

    &-logo {
      height: 1.75rem;
    }
  }
</style>
