<template>
  <div v-if="text" :class="['text-holder', `text-${pillStyle}`, `text-align-${textAlign}`]" contenteditable>
    <span class="text-lines" :style="{ fontSize, textAlign, lineHeight, padding, '--bg-width': `${width}px` }">{{ text }}</span>
    <span v-if="shadow" class="text-lines shadow" :style="{ fontSize, textAlign, lineHeight, padding, '--bg-width': `${width}px` }">{{ text }}</span>
    <svg style="visibility: hidden; position: absolute;" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
          <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'text-in-pills',

  props: {
    text: String,
    textAlign: {
      type: String,
      default: 'left'
    },
    fontSize: {
      type: String,
      default: '45px'
    },
    pillStyle: {
      type: String,
      default: 'white'
    },
    width: {
      type: Number,
      default: 600
    },
    padding: {
      type: String,
      default: '0.05em 0.25em'
    },
    lineHeight: {
      type: Number,
      default: 1.2
    },
    shadow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../sass/variables";

  .text {
    &-holder {
      position: relative;
      width: 100%;
      -webkit-line-break: normal;

      &.text-align-right .text-lines {
        background-position: right;
      }

      &.text-align-center .text-lines {
        background-position: center;
      }

      &.text-white .text-lines {
        background: linear-gradient(to right, $white, $white); // workaround so it works with blend mode
        color: $gray-900;
        background-blend-mode: multiply;
      }

      &.text-black .text-lines {
        background: linear-gradient(to right, $gray-900, $gray-900); // workaround so it works with blend mode
        color: $white;
      }
    }

    &-lines {
      color: white;
      padding: .05em .25em;
      border-radius: 4px;
      background: linear-gradient(to right, $gradient-start 0, $gradient-end var(--bg-width, 600px));
      background-position: left;
      background-size: var(--bg-width, 600px);
      background-blend-mode: lighten;
      letter-spacing: -0.03em;
      line-height: 1.2;
      display: inline;
      white-space: pre-wrap;
      font-weight: bold;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      filter: url('#goo');
    }
  }

  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: $raised-shadow;
    filter: none;
  }

 @supports (-moz-appearance:none) {
    .text-lines {
      line-height: 1.33;
    }
  }
</style>
