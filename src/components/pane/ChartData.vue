<template>
  <div>
    <ul>
      <li v-for="(set, setKey) in chartData.sets" :key="setKey">
        <input type="text" v-model="set.label" />
        <button @click="deleteSet(setKey)">Del set</button>

        <table>
          <tr>
            <th>Etiqueta</th>
            <th>Valor</th>
            <th><swatches v-model="set.color" @input="(color) => handleColorChange(setKey, color)"></swatches></th>
            <th></th>
            <th></th>
          </tr>
          <tr v-for="(dataRow, dataKey) in chartData.data" :key="setKey + dataKey">
            <td><input type="text" v-model="dataRow.label" /></td>
            <td><input type="text" v-model="dataRow.values[setKey].number" /></td>
            <td>
              <swatches v-model="dataRow.values[setKey].color"></swatches>
            </td>
            <td><input type="checkbox" v-model="dataRow.values[setKey].highlight" /></td>
            <td><button @click="deleteRow(dataKey)">X</button></td>
          </tr>
        </table>
        <button @click="newRow">New row</button>
        <hr>
      </li>
    </ul>
    <button @click="newSet">New set</button>
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
    }
  },

  methods: {
    newSet () {
      const color = 'orangered'
      this.chartData.sets.push({ label: '', color })
      this.chartData.data.forEach(row => {
        row.values.push({ number: 0, color, highlight: false })
      })
    },

    newRow () {
      let values = []
      this.chartData.sets.forEach(set => {
        values.push({ number: 0, color: set.color, highlight: false })
      })

      this.chartData.data.push({ label: '', values })
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
      // Change color
      this.chartData.data.forEach(row => {
        row.values[setKey].color = color
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
