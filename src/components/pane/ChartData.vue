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
          </tr>
          <tr v-for="(dataEntry, dataKey) in chartData.data" :key="setKey + dataKey">
            <td><input type="text" v-model="dataEntry.label" /></td>
            <td><input type="text" v-model="dataEntry.values[setKey]" /></td>
          </tr>
        </table>
        <button @click="newRow">New row</button>
        <hr>
        <button @click="newSet">New set</button>
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
    },

    newRow () {
      this.chartData.data.push({ label: '', values: [] })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
