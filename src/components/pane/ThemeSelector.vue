<template>
  <div class="c-field">
    <div class="c-field-info"><label>Estil</label></div>
    <div :class="['theme-selector', `has-${themes.length}-themes`]">
        <label v-if="themes.includes('glowy')" :class="{checked: value === 'glowy'}">
          <input type="radio" name="theme" value="glowy" :checked="value === 'glowy'" @change="$emit('input', $event.target.value)" class="sr-only">
          <svg version="1.1" x="0px" y="0px" width="51.46px"
            height="51.46px" viewBox="0 0 51.46 51.46" style="enable-background:new 0 0 51.46 51.46;">
            <path class="st0" d="M45.43,50.46H6.03C3.26,50.46,1,48.2,1,45.43V6.03C1,3.26,3.26,1,6.03,1h39.41c2.77,0,5.03,2.26,5.03,5.03
              v39.41C50.46,48.2,48.2,50.46,45.43,50.46z"/>
            <path class="st0" d="M41.31,44.92H10.15c-1.91,0-3.47-1.56-3.47-3.47V22.56c0-1.91,1.56-3.47,3.47-3.47h31.15
              c1.91,0,3.47,1.56,3.47,3.47v18.89C44.77,43.36,43.21,44.92,41.31,44.92z"/>
          </svg>
        </label>
        <label v-if="themes.includes('blobs')" :class="{checked: value === 'blobs'}">
          <input type="radio" name="theme" value="blobs" :checked="value === 'blobs'" @change="$emit('input', $event.target.value)" class="sr-only">
          <svg version="1.1" x="0px" y="0px" width="51.46px"
            height="51.46px" viewBox="0 0 51.46 51.46" style="enable-background:new 0 0 51.46 51.46;">
            <path class="st0" d="M45.43,50.46H6.03C3.26,50.46,1,48.2,1,45.43V6.03C1,3.26,3.26,1,6.03,1h39.41c2.77,0,5.03,2.26,5.03,5.03
              v39.41C50.46,48.2,48.2,50.46,45.43,50.46z"/>
            <g>
              <defs>
                <path id="SVGID_1_" d="M45.43,50.46H6.03C3.26,50.46,1,48.2,1,45.43V6.03C1,3.26,3.26,1,6.03,1h39.41c2.77,0,5.03,2.26,5.03,5.03
                  v39.41C50.46,48.2,48.2,50.46,45.43,50.46z"/>
              </defs>
              <clipPath id="SVGID_2_">
                <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
              </clipPath>
            </g>
            <path class="st0" d="M45.43,50.46H6.03C3.26,50.46,1,48.2,1,45.43V6.03C1,3.26,3.26,1,6.03,1h39.41c2.77,0,5.03,2.26,5.03,5.03
              v39.41C50.46,48.2,48.2,50.46,45.43,50.46z"/>
            <path class="st0" d="M50.46,45.43v-9.97l-16.32,2.02c-2.68,0.33-4.6,2.79-4.27,5.47l0.93,7.51h14.63
              C48.2,50.46,50.46,48.2,50.46,45.43z"/>
            <path class="st0" d="M20.79,8.82L19.82,1H6.03C3.26,1,1,3.26,1,6.03v10.19l15.52-1.92C19.2,13.96,21.12,11.5,20.79,8.82z"/>
          </svg>
        </label>
        <label v-if="themes.includes('blobless')" :class="{checked: value === 'blobless'}">
          <input type="radio" name="theme" value="blobless" :checked="value === 'blobless'" @change="$emit('input', $event.target.value)" class="sr-only">
          <svg version="1.1" x="0px" y="0px" width="51.46px"
            height="51.46px" viewBox="0 0 51.46 51.46" style="enable-background:new 0 0 51.46 51.46;">
            <path class="st0" d="M45.43,50.46H6.03C3.26,50.46,1,48.2,1,45.43V6.03C1,3.26,3.26,1,6.03,1h39.41c2.77,0,5.03,2.26,5.03,5.03
              v39.41C50.46,48.2,48.2,50.46,45.43,50.46z"/>
          </svg>
        </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeSelector',

  props: {
    value: {
      type: String,
      default: 'glowy'
    },
    themes: {
      type: Array,
      default: () => ['glowy', 'blobs', 'blobless']
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

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

  &.has-2-themes {
    justify-content: flex-start;

    label {
      margin-right: $field-padding;
    }
  }

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
    }
  }
}

.st0 {
  transition: .2s;
  fill: none;
  stroke: $gray-700;
  stroke-width: 1.25;
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
}

</style>
