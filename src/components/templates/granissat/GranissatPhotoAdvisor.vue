<template>
  <details class="advisor">
    <summary class="advisor-summary">Consells per a triar una foto</summary>
    <div class="advisor-content">
      <p>
        Recomanem que les fotografies siguen explicatives de la frase que acompanyen
        però sense ser massa evidents, sempre buscant anar més enllà. Prioritzem primers plans,
        propers i detalls.
      </p>
    </div>
  </details>
</template>

<style lang="scss">
  @import "../../../sass/variables";

  .advisor {
    border-bottom: 1px $gray-300 solid;
    font-size: 0.85rem;

    &-summary {
      cursor: pointer;
      padding: .5rem 1rem;
      color: $gray-700;

      &:hover {
        background: $gray-100;
      }
    }

    &-content {
      padding: .25rem 1rem 1rem 1rem;
      font-size: 1rem;

      p:not(:last-child) {
        margin-bottom: .5rem;
      }
    }
  }
</style>
