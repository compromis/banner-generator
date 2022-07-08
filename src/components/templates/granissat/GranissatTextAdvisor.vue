<template>
  <details class="advisor">
    <summary class="advisor-summary">Consells per a elaborar el text</summary>
    <div class="advisor-content">
      <p>
        Les frases sempre començaran en majúscules “Som molt de...” i acabaran amb un punt final.
      </p>
      <p>
        Les frases escollides en la campanya han de fugir d’evidències o de proclames massa crues o directes.
        Perseguirem la construcció d’un relat bonic, optimista, encoratjador, creatiu i empoderant que ajude
        a generar l’univers al voltant de Compromís: Tot el que som. En eixe sentit és preferible el
        “Som molt de donar la cara” abans que “Som molt d’antifeixisme”, o “Som molt d’acollir” abans que
        “Som molt d’antirracisme”.
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
