<template>
  <div class="party" :style="{ backgroundColor: party.party === 'custom' || !party.party ? party.color : party.party.color }">
    <div v-if="party.party === 'custom'" :class="['party-name', {'acronym' : party.name && party.name.length < 5}] "><p>{{ party.name }}</p></div>
    <img v-else-if="party.party && party.party.logo" :src="party.party.logo">
    <div class="party-votes" v-if="showVotes">{{ party.votes }}</div>
  </div>
</template>

<script>
export default {
  props: {
    party: {
      type: Object,
      default: null
    },

    showVotes: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";
.party {
  position: relative;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: $white;
  border-radius: 12px;
  background-color: $gray-200;

  &-name {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.1;
    font-weight: bold;
    width: 70px;
    height: 70px;

    p {
      margin: 0;
      hyphens: auto;
      word-break: break-word;
    }

    &.acronym {
      font-size: 20px;
    }
  }

  &-votes {
    z-index: 20;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 100%;
    background: $gray-900;
    font-size: 16px;
    bottom: 0;
    right: 0;
    transform: translate(35%, 35%);
  }

  img {
    border-radius: inherit;
  }
}
</style>
