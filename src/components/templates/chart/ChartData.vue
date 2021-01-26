<template>
  <div class="chart-data">
    <ul class="sets">
      <li v-for="(set, setKey) in chartData.sets" :key="setKey" :class="{ hidden: setKey >= maxSets }">
        <input type="text" v-model="set.label" class="set-name" placeholder="Nom del set" :ref="`setLabel${setKey}`" />
        <button @click="deleteSet(setKey)" class="remove set-remove">-</button>

        <table class="set-data">
          <tr>
            <th>Etiqueta</th>
            <th width="80">Valor</th>
            <th>
              <swatches
                v-model="set.color"
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
              <button @click="deleteRow(dataKey)" class="remove">-</button>
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

export default {
  name: 'chart-data',

  components: {
    Swatches
  },

  model: {
    prop: 'chart',
    event: 'updateChart'
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
      const max = {
        'bar-vertical': 4,
        'bar-horizontal': 4,
        'lines': 6,
        'doughnut': 1
      }

      return max[this.chartType]
    },

    maxRows () {
      const max = {
        'bar-vertical': 10,
        'bar-horizontal': 10,
        'lines': 40,
        'doughnut': 10
      }

      return max[this.chartType]
    },

    rowColorDisabled () {
      // Disabled if line charts or more than one set
      const disabledIn = ['lines']
      return disabledIn.includes(this.chartType) || this.chartData.sets.length > 1
    },

    setColorDisabled () {
      // Disabled in doughnut charts
      const disabledIn = ['doughnut']
      return disabledIn.includes(this.chartType)
    }
  },

  methods: {
    newSet () {
      // Default colors in order of set creation
      const colors = ['orangered', '#2980B9', '#1CA085', '#8E43AD']
      const color = colors[this.chartData.sets.length]
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
      this.chartData.data.splice(rowKey, 1)
    },

    deleteSet (setKey) {
      this.chartData.sets.splice(setKey, 1)
      this.chartData.data.forEach(row => {
        row.values.splice(setKey, 1)
      })
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
          const prevDataKey = dataKey + 1
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

    .remove {
      display: flex;
      background: $gray-100;
      color: $gray-700;
      border: 0;
      appearance: none;
      border-radius: 2rem;
      padding: 0;
      margin: 0;
      align-items: center;
      justify-content: center;
      height: 1.15rem;
      width: 1.15rem;
      box-shadow: 0 0 0 2px white;

      &:hover {
        background: $gray-200;
        color: $gray-900;
      }

      &:focus {
        outline: 0;
        box-shadow: 0 0 0 2px $gray-300;
      }
    }
  }
</style>
