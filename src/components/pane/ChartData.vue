<template>
  <div>
    <ul>
      <li v-for="(set, setKey) in chartdata.datasets" :key="setKey">
        <input type="text" v-model="set.label" />
        <input type="text" v-model="set.backgroundColor" />
        <table>
          <tr>
            <th>Etiqueta</th>
            <th>Valor</th>
          </tr>
          <tr v-for="(datapoint, i) in set.data" :key="set.label + i">
            <td><input type="text" v-model="chartdata.labels[i]" /></td>
            <td><input type="text" v-model="set.data[i]" /></td>
          </tr>
        </table>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'chart-data',

  data () {
    return {
      chartdata: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
