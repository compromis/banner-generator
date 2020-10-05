<template>
  <b-datepicker
    :value="value"
    @input="(date) => $emit('input', date)"
    :placeholder="placeholder"
    :id="id"
    icon="calendar-alt"
    :min-date="new Date()"
    :max-date="maxDate"
    :first-day-of-week="1"
    :month-names="['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Augost', 'Setembre', 'Octubre', 'Novembre', 'Desembre']"
    :day-names="['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds']">
  </b-datepicker>
</template>

<script>
export default {
  name: 'date-picker',

  props: {
    value: Date,
    placeholder: String,
    id: String
  },

  computed: {
    maxDate: function () {
      let date = new Date()
      date.setFullYear(date.getFullYear() + 1)
      return date
    }
  }
}
</script>

<style lang="scss">
.datepicker {
  .datepicker-table .datepicker-cell {
    padding: 0.25rem 0.5rem;
  }

  .datepicker-content {
    height: auto;
  }
}

.pagination .pagination-next,
.pagination .pagination-previous {
  display: none;
}
</style>
