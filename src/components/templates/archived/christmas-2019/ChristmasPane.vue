<template>
  <div :class="{ 'pane christmas-pane': true, 'pane-916': aspect === 1 }">
    <b-field label="Idioma">
      <b-tabs
        id="style-tabs"
        type="is-toggle"
        size="is-small"
        v-model="properties.language"
        class="tabs-field"
        expanded>
        <b-tab-item label="Valencià"></b-tab-item>
        <b-tab-item label="Castellà"></b-tab-item>
      </b-tabs>
    </b-field>

    <b-field
      label="Nom del municipi"
      :type="properties.localLabel ? '' : displayErrors ? 'is-danger' : ''"
      :message="properties.localLabel ? '' : displayErrors ? `Has d'omplir un el nom del municipi` : ''">
      <b-input placeholder="Alacant" maxlength="30" v-model="properties.localLabel"></b-input>
    </b-field>

    <b-field
      label="Colors">
      <ul class="colors">
        <li :class="{'selected': properties.color === 1}" @click="properties.color = 1"><span class="color-1 color-green"><span class="color-2 color-yellow"></span></span></li>
        <li :class="{'selected': properties.color === 2}" @click="properties.color = 2"><span class="color-1 color-red"><span class="color-2 color-yellow"></span></span></li>
        <li :class="{'selected': properties.color === 3}" @click="properties.color = 3"><span class="color-1 color-yellow"><span class="color-2 color-green"></span></span></li>
        <li :class="{'selected': properties.color === 4}" @click="properties.color = 4"><span class="color-1 color-yellow"><span class="color-2 color-red"></span></span></li>
      </ul>
    </b-field>
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin.js'

export default {
  name: 'generic-pane',

  mixins: [PaneMixin],

  data () {
    return {
      properties: {
        style: 'green',
        language: 0,
        color: 1
      }
    }
  },

  watch: {
    properties: {
      handler: function (properties) {
        // Check if canvas can be downloaded
        this.isDownloadable = (
          properties.localLabel !== ''
        )
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../sass/variables";
  @import "./colors";

  .colors {
    display: grid;
    grid-template-rows: 3.25rem;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    margin: 0;
    padding: 0;

    li {
      border: 2px $gray-200 solid;
      padding: 2px;
      display: flex;
      align-items: stretch;
      justify-content: stretch;
      border-radius: 5px;
      overflow: hidden;
      transition: .25s ease-in-out;

      span {
        width: 100%;
        height: 100%;
      }

      .color-1 {
        display: flex;
        align-items: stretch;
        justify-content: stretch;
        padding: 10px;
        border-radius: 4px;
      }

      &.selected,
      &.selected:hover {
        border-color: $primary;
      }

      &:hover {
        border-color: $gray-400;
      }
    }
  }

  .color {
    &-green {
      background: $green;
    }
    &-red {
      background: $red;
    }
    &-yellow {
      background: $yellow;
    }
  }

  .pane-916 {
    display: flex;
    flex-direction: column;

    .text-wrapper {
      order: 1;
    }
  }
</style>
