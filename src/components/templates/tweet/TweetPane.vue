<template>
  <div :class="['pane', 'tweet-pane', { 'pane-dimmed': paneDimmed }, `logo-${properties.logo}`]">
    <!-- Style -->
    <c-tab-group>
      <c-tab v-model="properties.style" value="transparent" name="style">Transparent</c-tab>
      <c-tab v-model="properties.style" value="card" name="style">Targeta</c-tab>
    </c-tab-group>

    <!-- Color -->
    <color-selector label="Color de fons" is-rounded v-model="properties.backgroundColor" :colors="availableColors" />

    <!-- Dark mode -->
    <transition name="slide">
      <color-selector
        v-if="properties.style === 'card'"
        v-model="properties.mode"
        :colors="['white', 'black']"
        label="Color de la targeta"
        is-rounded />
    </transition>

    <!-- Text -->
    <c-input-text
      type="textarea"
      label="Text"
      name="text"
      placeholder="Text del post"
      v-model="properties.text"
      :maxlength="250"
      :message="setFieldMessage('text')"
      class="source-input-name" />

    <!-- Text size -->
    <c-field label="Tamany del text" compact class="range-field">
      <range-slider
        name="points"
        :min="75"
        :max="125"
        v-model="properties.textSize"
        @touchstart="dimPane(true)"
        @touchend="dimPane(false)" />
    </c-field>

    <!-- Post picture -->
    <advanced-picture-upload
      label="Foto del post"
      field-name="postPicture"
      :picture="properties.postPicture"
      :picture-aspect="properties.postPictureAspect"
      :crop="properties.postPictureCrop"
      :preview="properties.postPicturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="2"
      @upload="(image, ratio) => customUpdateImage('post', image, ratio)"
      @crop="(crop) => updateCrop(crop, 'post')"
      @delete="removeImage('post')">
    </advanced-picture-upload>

    <!-- Background Picture -->
    <advanced-picture-upload
      label="Foto de fons"
      field-name="backgroundPicture"
      :picture="properties.backgroundPicture"
      :picture-aspect="properties.backgroundPictureAspect"
      :crop="properties.backgroundPictureCrop"
      :preview="properties.backgroundPicturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="1"
      @upload="(image, ratio) => customUpdateImage('background', image, ratio)"
      @crop="(crop) => updateCrop(crop, 'background')"
      @delete="removeImage('background')">
      <transition name="slide">
        <b-switch v-model="properties.fullGradient" class="mt-1">
          Degradat sobre tota la imatge
        </b-switch>
      </transition>
    </advanced-picture-upload>

    <!-- User name -->
    <c-input-text
      label="Nom"
      name="name"
      placeholder="Joan Baldoví"
      v-model="properties.name"
      :maxlength="70" />

    <c-input-text
      label="Nom d'usuari"
      name="username"
      placeholder="joanbaldovi"
      v-model="properties.username"
      :maxlength="70" />

    <!-- Profile picture -->
    <advanced-picture-upload
      label="Foto de perfil"
      field-name="profilePicture"
      :picture="properties.profilePicture"
      :picture-aspect="properties.profilePictureAspect"
      :crop="properties.profilePictureCrop"
      :preview="properties.profilePicturePreview"
      :display-errors="displayErrors"
      :errors="errors"
      :ratio="1"
      @upload="(image, ratio) => customUpdateImage('profile', image, ratio)"
      @crop="(crop) => updateCrop(crop, 'profile')"
      @delete="removeImage('profile')">
    </advanced-picture-upload>

    <c-field>
      <b-switch v-model="properties.showCounts">
          Mostrar Reposts i Likes
      </b-switch>
    </c-field>

    <transition name="slide">
      <div v-if="properties.showCounts">
        <c-input-text
          type="number"
          label="Reposts"
          name="reposts"
          placeholder="89"
          v-model="properties.reposts"
          :maxlength="6" />

        <c-input-text
          type="number"
          label="Likes"
          name="likes"
          placeholder="334"
          v-model="properties.likes"
          :maxlength="6" />
        </div>
    </transition>

    <c-field>
      <b-switch v-model="properties.verified">
          Compte verificat
      </b-switch>
    </c-field>

    <c-field>
      <b-switch v-model="properties.showCta">
          Afegir cridada a l'acció
      </b-switch>
    </c-field>

    <transition name="slide">
        <c-input-text
          v-if="properties.showCta"
          label="Cridada a l'acció"
          name="cta"
          placeholder="Passa-ho!"
          v-model="properties.cta"
          :maxlength="24" />
    </transition>

    <!-- Logo -->
    <logo-selector v-model="properties.logo" />

    <!-- Local label -->
    <transition name="slide">
      <c-input-text
        v-if="aspect === '11'"
        label="Text logo"
        name="localLabel"
        placeholder="Alacant"
        v-model="properties.localLabel"
        :maxlength="48" />
    </transition>
  </div>
</template>

<script>
import PaneMixin from '@/mixins/pane-mixin.js'
import CTabGroup from '@/components/pane/CTabGroup'
import CTab from '@/components/pane/CTab'

export default {
  name: 'tweet-pane',

  mixins: [PaneMixin],

  components: {
    CTabGroup,
    CTab
  },

  data () {
    return {
      properties: {
        textSize: 100,
        showCounts: true,
        showCta: false,
        backgroundColor: 'black',
        style: 'transparent',
        cta: 'Passa-ho!',
        likes: '',
        reposts: '',
        name: '',
        username: '',
        text: '',
        postPictureCrop: { scale: 100, x: 50, y: 50 },
        backgroundPictureCrop: { scale: 100, x: 50, y: 50 },
        profilePictureCrop: { scale: 100, x: 50, y: 50 }
      },
      ratios: { inline: 2.09, background: 1 }
    }
  },

  computed: {
    availableColors () {
      return ['black', 'white', 'orange', 'lgbt', 'feminism', 'green']
    }
  },

  methods: {
    validate () {
      this.fieldRequired({
        text: "Has d'escirure un text",
        name: "Has d'escirure un nom",
        username: "Has d'escirure un nom d'usuari"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .local-label {
    margin-top: .75rem;
  }
</style>
