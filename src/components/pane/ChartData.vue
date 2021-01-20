<template>
  <div>
    <ul>
      <li v-for="(set, setKey) in chartData.sets" :key="setKey">
        <input type="text" v-model="set.label" />
        <input type="text" v-model="set.color" />
        <table>
          <tr>
            <th>Etiqueta</th>
            <th>Valor</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr v-for="(dataRow, dataKey) in chartData.data" :key="setKey + dataKey">
            <td><input type="text" v-model="dataRow.label" /></td>
            <td><input type="text" v-model="dataRow.values[setKey].number" /></td>
            <td><input type="text" v-model="dataRow.values[setKey].color" /></td>
            <td><input type="checkbox" v-model="dataRow.values[setKey].highlight" /></td>
            <td><button @click="deleteRow(dataKey)">Del</button></td>
          </tr>
        </table>
        <button @click="newRow">New row</button>
        <hr>
        <button @click="newSet">New set</button>
        <button @click="deleteSet(setKey)">Del set</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'chart-data',

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
      this.chartData.sets.push({ label: '', color: '' })
      this.chartData.data.forEach(row => {
        row.values.push({ number: 0, color: 'inherit', highlight: false })
      })
    },

    newRow () {
      const sets = this.chartData.sets.length
      let values = []
      for (let i = 0; i < sets; i++) {
        values.push({ number: 0, color: 'inherit', highlight: false })
      }

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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
