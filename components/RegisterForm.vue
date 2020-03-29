<template>
  <div class="max-width">
    <v-form ref="form" v-model="valid">
      <v-text-field outlined label="E-Mail" :rules="emailRules" v-model="email"/>
      <v-text-field outlined type="password" label="Password" :rules="passwordRules" v-model="password"/>
      <v-text-field outlined type="password" label="Password" :rules="password2Rules" v-model="password2" @keypress.enter="register"/>
      <v-btn outlined :loading="loading" min-width="80%" class="margin" @click="register">Register</v-btn>
      <v-btn outlined :disabled="loading" nuxt min-width="80%" to="/" class="margin">Back</v-btn>
    </v-form>
    <v-snackbar :color="alertColor" v-model="showAlert">
      {{ alert }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: null,
    emailRules: [
      v => !!v || 'E-Mail Required',
      v => /.+@.+\..+/.test(v) || 'Invalid E-Mail'
    ],
    password: null,
    passwordRules: [
      v => !!v || 'Password Required'
    ],
    password2: null,
    loading: false,
    alert: null,
    alertColor: null,
    showAlert: false,
    valid: false
  }),
  computed: {
    password2Rules () {
      const rules = [v => !!v || 'Password Required']
      rules.push(v => v === this.password || 'Passwords Must Match')
      return rules
    }
  },
  methods: {
    async register () {
      if (!this.$refs.form.validate()) return
      this.loading = true
      try {
        const result = await this.$store.dispatch('REGISTER', { email: this.email, password: this.password })
        if (result.err) {
          this.alert = result.err
          this.alertColor = 'error'
          this.showAlert = true
        }
        if (result.success) {
          this.alert = 'Account Created'
          this.alertColor = 'success'
          this.showAlert = true
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            this.alert = err.response.data.err
            this.alertColor = 'error'
            this.showAlert = true
          }
        } else {
          console.log(err)
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
.max-width {
  width: 100%;
}

.margin {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>