<template>
  <div>
    <h2>Més dubtes?</h2>
    <form
      v-if="!formSubmitted"
      name="ask-question"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      @submit.prevent="submit">
      <input type="hidden" name="form-name" value="ask-question" />
      <b-field label="E-mail">
        <b-input type="email" placeholder="joan@compromis.net" v-model="form.email" required></b-input>
      </b-field>
      <b-field label="Dubte o suggeriment">
        <b-input type="textarea" placeholder="No em funciona el condensador de flux..." v-model="form.text" required></b-input>
      </b-field>
      <b-button native-type="submit" type="is-primary" :loading="formSubmitting">Envia</b-button>
    </form>
    <div v-if="formSubmitted">
       <b-message type="is-success" has-icon aria-close-label="Close message">
          Gràcies pel teu missatge. Et donarem una resposta com més aviat possible.
        </b-message>
    </div>
    <div v-if="formSubmitted === false">
       <b-message type="is-danger" has-icon aria-close-label="Close message">
          Hi ha hagut un problema enviant el teu missatge. Torna a intentar-ho més tard o escriu-nos directament a <a href="mailto:disseny@compromis.net"><strong>disseny@compromis.net</strong></a>.
        </b-message>
    </div>
  </div>
</template>

<script>
import API from '@/api'

export default {
  name: 'help-form',

  data () {
    return {
      form: {
        email: '',
        text: ''
      },
      formSubmitting: false,
      formSubmitted: null
    }
  },

  methods: {
    submit () {
      API.submitForm(this.form)
        .then(() => { this.formSubmitted = true })
        .catch(() => { this.formSubmitted = false })
    }
  }
}
</script>

<style lang="scss">
  .message {
    margin-top: 1rem;

    .media {
      align-items: center;
    }
  }
</style>
