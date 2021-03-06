<template>
  <div class="chart-data">
    <ul class="sets">
      <li v-for="(set, setKey) in chartData.sets" :key="setKey" :class="{ hidden: setKey >= maxSets }">
        <input type="text" maxlength="20" v-model="set.label" class="set-name" placeholder="Nom del set" :ref="`setLabel${setKey}`" />
        <button v-if="chartData.sets.length > 1" @click="deleteSet(setKey)" class="c-button-circle remove set-remove">-</button>

        <table class="set-data">
          <tr>
            <th>Etiqueta</th>
            <th width="80">Valor</th>
            <th>
              <swatches
                v-model="set.color"
                :colors="config.availableColors"
                @input="(color) => handleColorChange(setKey, color)"
                popover-to="left"
                swatch-size="20"
                :trigger-style="{ height: '1.15rem', width: '1.15rem' }"
                :disabled="setColorDisabled">
              </swatches>
            </th>
            <th class="centered-col"><font-awesome-icon :icon="['far', 'highlighter']" /></th>
            <th></th>
          </tr>
          <tr
            v-for="(dataRow, dataKey) in chartData.data"
            :key="setKey + dataKey"
            :class="{ hidden: dataKey >= maxRows }"
          >
            <td class="has-input">
              <input
                type="text"
                v-model="dataRow.label"
                maxlength="24"
                :ref="`label${setKey}${dataKey}`"
                @keydown="handleValueKeyDown($event, 'label', setKey, dataKey)"
              />
            </td>
            <td class="has-input">
              <input
                type="number"
                v-model="dataRow.values[setKey].number"
                :ref="`value${setKey}${dataKey}`"
                @keydown="handleValueKeyDown($event, 'value', setKey, dataKey)"
              />
            </td>
            <td>
              <swatches
                :colors="config.availableColors"
                v-model="dataRow.values[setKey].color"
                popover-to="left"
                swatch-size="20"
                :trigger-style="{ height: '1.15rem', width: '1.15rem' }"
                :disabled="rowColorDisabled">
              </swatches>
            </td>
            <td>
              <b-checkbox
                v-model="dataRow.values[setKey].highlight"
                :true-value="true"
                :false-value="false">
              </b-checkbox>
            </td>
            <td>
              <button v-if="chartData.data.length > 1" @click="deleteRow(dataKey)" class="c-button-circle remove">-</button>
            </td>
          </tr>
        </table>
        <button v-if="chartData.data[0].values.length < maxRows" @click="newRow(setKey)" class="c-button c-button-sm">
          <font-awesome-icon :icon="['far', 'plus']" />
          Nova fila
        </button>
      </li>
    </ul>
    <button v-if="chartData.sets.length < maxSets" @click="newSet" class="c-button">
        <font-awesome-icon :icon="['far', 'plus']" />
        Nou set
    </button>
  </div>
</template>

<script>
import Swatches from 'vue-swatches'
import config from './config'

export default {
  name: 'chart-data',

  components: {
    Swatches
  },

  model: {
    prop: 'chart',
    event: 'updateChart'
  },

  data () {
    return {
      config
    }
  },

  props: {
    chart: {
      type: Object,
      required: true
    },
    chartType: {
      type: String,
      required: true
    }
  },

  computed: {
    chartData: {
      get () {
        return this.chart
      },

      set (chart) {
        this.$emit('updateChart', chart)
      }
    },

    maxSets () {
      return this.config.maxSets[this.chartType]
    },

    maxRows () {
      return this.config.maxRows[this.chartType]
    },

    rowColorDisabled () {
      return this.config.rowColorDisabled.in.includes(this.chartType) ||
        (this.chartData.sets.length > 1 && !this.config.setColorDisabled.in.includes(this.chartType))
    },

    setColorDisabled () {
      return this.config.setColorDisabled.in.includes(this.chartType)
    }
  },

  methods: {
    newSet () {
      // Assaign colors in set order
      const color = this.config.colorDefaults[this.chartData.sets.length] || '#BDC3C8'
      // Add new set
      this.chartData.sets.push({ label: '', color })
      // Add data rows
      this.chartData.data.forEach(row => {
        // Reset first set's colors in case they've changed
        row.values[0].color = this.chartData.sets[0].color
        // Add new data row for set
        row.values.push({ number: 0, color, highlight: false })
      })
      // Focus new set field
      this.$nextTick(() => {
        this.$refs[`setLabel${this.chartData.sets.length - 1}`][0].focus()
      })
    },

    newRow (setKey) {
      // Add new row to each set
      let values = []
      this.chartData.sets.forEach(set => {
        values.push({ number: 0, color: set.color, highlight: false })
      })
      this.chartData.data.push({ label: '', values })

      // Focus new row field
      this.$nextTick(() => {
        this.$refs[`label${setKey}${this.chartData.data.length - 1}`][0].focus()
      })
    },

    deleteRow (rowKey) {
      if (this.chartData.data.length > 1) {
        this.chartData.data.splice(rowKey, 1)
      }
    },

    deleteSet (setKey) {
      if (this.chartData.sets.length > 1) {
        this.chartData.sets.splice(setKey, 1)
        this.chartData.data.forEach(row => {
          row.values.splice(setKey, 1)
        })
      }
    },

    handleColorChange (setKey, color) {
      // Change color of all rows
      this.chartData.data.forEach(row => {
        row.values[setKey].color = color
      })
    },

    handleValueKeyDown (e, col, setKey, dataKey) {
      // Focus adjacent fields o create new row if enter
      switch (e.key) {
        case 'ArrowDown':
          const nextDataKey = dataKey + 1
          if (col === 'label' && this.$refs[col + setKey + nextDataKey]) {
            this.$refs[col + setKey + nextDataKey][0].focus()
          }
          break
        case 'ArrowUp':
          const prevDataKey = dataKey - 1
          if (col === 'label' && this.$refs[col + setKey + prevDataKey]) {
            this.$refs[col + setKey + prevDataKey][0].focus()
          }
          break
        case 'Enter':
          this.newRow(setKey)
          break
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .chart-data {
    border-bottom: 1px $gray-300 solid;

    .set-data {
      th {
        font-size: .85rem;
        font-weight: normal;
        color: $gray-800;
        padding: .5rem;
        border-bottom: 1px $gray-200 solid;
        vertical-align: middle;

        &:first-child {
          padding-left: 1rem;
        }

        &:last-child {
          border-right: 0;
        }

        &.centered-col {
          text-align: center;
        }
      }

      td {
        border-bottom: 1px $gray-200 solid;
        border-right: 1px $gray-200 solid;
        padding: .5rem;

        &.has-input {
          padding: 0;
        }

        &:first-child input {
          padding-left: 1rem;
        }

        &:last-child {
          border-right: 0;
        }
      }

      input[type='text'],
      input[type='number'] {
        width: 100%;
        border: 0;
        padding: .5rem;
        color: $gray-900;

        &:focus {
          background: $gray-100;
          outline: 0;
        }
      }

      input[type='number'] {
        text-align: right;
      }

      .hidden {
        opacity: .5;
        pointer-events: none;
        cursor: not-allowed;
      }

      .b-checkbox.checkbox:not(.button) {
        margin-right: 0;
        display: flex;

        .control-label {
          display: none;
        }

        input[type=checkbox] + .check {
          border-width: 1px;
          height: 1.15rem;
          width: 1.15rem;
        }
      }

      .vue-swatches {
        height: 1.15rem;

        &--is-disabled {
          opacity: .5;
        }
      }
    }

    .sets {
      li {
        position: relative;
        border-bottom: 1px $gray-200 solid;

        &.hidden {
          opacity: .5;
          pointer-events: none;
          cursor: not-allowed;
        }
      }

      .set-name {
        font-size: 1.15rem;
        border: 0;
        color: $gray-900;
        padding: .5rem 1rem;
        width: 100%;

        &::placeholder {
          color: $gray-400;
        }

        &:focus {
          outline: 0;
          background: $gray-100;
        }
      }

      .set-remove {
        position: absolute;
        top: .65rem;
        right: .6rem;
      }
    }
  }
</style>
