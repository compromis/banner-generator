<template>
  <div class="c-field">
    <div class="c-field-info"><label>Disposició</label></div>
    <div class="theme-selector">
      <label v-if="layouts.includes('right')" :class="{checked: value === 'right'}">
        <input type="radio" name="theme" value="right" :checked="value === 'right'" @change="$emit('input', $event.target.value)" class="sr-only">
        <svg viewBox="0 0 50.47 50.46">
          <path class="st0" d="M44.93,49.96H5.53c-2.77,0-5.03-2.26-5.03-5.03V5.53C.5,2.76,2.76,.5,5.53,.5H44.94c2.77,0,5.03,2.26,5.03,5.03V44.94c0,2.76-2.27,5.02-5.04,5.02Z"/>
          <line class="st0" x1="26.23" y1=".5" x2="26.23" y2="49.96"/>
          <rect class="st0-fill" x="4.45" y="4.28" width="18.14" height="4.16" rx="2.08" ry="2.08"/>
          <rect class="st0-fill" x="4.45" y="11.38" width="13.33" height="4.16" rx="2.08" ry="2.08"/>
          <rect class="st0" x="4.45" y="42.11" width="13.33" height="4.16" rx="2.08" ry="2.08"/>
        </svg>
      </label>
      <label v-if="layouts.includes('bottom')" :class="{checked: value === 'bottom'}">
        <input type="radio" name="theme" value="bottom" :checked="value === 'bottom'" @change="$emit('input', $event.target.value)" class="sr-only">
        <svg viewBox="0 0 50.47 50.46">
          <rect class="st0" x="4.45" y="20.86" width="13.33" height="4.16" rx="2.08" ry="2.08"/>
          <path class="st0" d="M44.93,49.96H5.53c-2.77,0-5.03-2.26-5.03-5.03V5.53C.5,2.76,2.76,.5,5.53,.5H44.94c2.77,0,5.03,2.26,5.03,5.03V44.94c0,2.76-2.27,5.02-5.04,5.02Z"/>
          <line class="st0" x1="49.96" y1="28.89" x2=".5" y2="28.89"/>
          <rect class="st0-fill" x="4.45" y="4.28" width="31.02" height="4.16" rx="2.08" ry="2.08"/>
          <rect class="st0-fill" x="4.45" y="11.38" width="23.37" height="4.16" rx="2.08" ry="2.08"/>
        </svg>
      </label>
      <label v-if="layouts.includes('top')" :class="{checked: value === 'top'}">
        <input type="radio" name="theme" value="top" :checked="value === 'top'" @change="$emit('input', $event.target.value)" class="sr-only">
        <svg viewBox="0 0 50.47 50.46">
          <rect class="st0" x="4.45" y="41.81" width="13.33" height="4.16" rx="2.08" ry="2.08"/>
          <path class="st0" d="M44.93,49.96H5.53c-2.77,0-5.03-2.26-5.03-5.03V5.53C.5,2.76,2.76,.5,5.53,.5H44.94c2.77,0,5.03,2.26,5.03,5.03V44.94c0,2.76-2.27,5.02-5.04,5.02Z"/>
          <line class="st0" x1="49.96" y1="21.63" x2=".5" y2="21.63"/>
          <rect class="st0-fill" x="4.45" y="25.23" width="31.02" height="4.16" rx="2.08" ry="2.08"/>
          <rect class="st0-fill" x="4.45" y="32.34" width="23.37" height="4.16" rx="2.08" ry="2.08"/>
        </svg>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'right'
    },
    layouts: {
      type: Array,
      default: () => ['right', 'top', 'bottom']
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../sass/variables";

.c-field {
  background: $white !important;
}

.theme-selector {
  display: flex;
  width: 100%;
  background: $white;
  padding: $field-padding;
  padding-top: .5rem;
  justify-content: space-between;

  svg {
    display: block;
    transition: .2s;
    border-radius: 8px;
    overflow: hidden;
    height: 65px;
    width: 65px;
  }

  label {
    cursor: pointer;

    &:hover {
      svg {
        box-shadow: 0 0 10px -2px rgba($primary, 0.9);
        filter: drop-shadow(0 0 5px rgba($primary, 0.6));
      }

      .st0 {
        stroke: $primary;
      }

      .st0-fill {
        fill: $primary;
      }
    }
  }
}

.st0 {
  transition: .2s;
  fill: none;
  stroke: $gray-700;
  stroke-width: 1.25;
}

.st0-fill {
  transition: .2s;
  fill: $gray-700;
}

.st1 {
  clip-path:url(#SVGID_2_);
}

.st2 {
  clip-path:url(#SVGID_4_);
}

.checked {
  svg {
    box-shadow: 0 0 10px -2px rgba($primary, 0.6);
    filter: drop-shadow(0 0 5px rgba($primary, 0.4));
  }

  .st0 {
    stroke: $primary;
  }

  .st0-fill {
    fill: $primary;
  }
}

</style>
