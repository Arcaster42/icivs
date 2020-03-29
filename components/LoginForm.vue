<template>
  <div class="max-width">
    <v-text-field outlined label="E-Mail" v-model="email"/>
    <v-text-field outlined type="password" label="Password" v-model="password" @keypress.enter="login"/>
    <v-btn outlined :loading="loading" min-width="80%" class="margin" @click="login">Login</v-btn>
    <v-btn outlined :disabled="loading" nuxt min-width="80%" to="/" class="margin">Back</v-btn>
    <v-snackbar color="error" v-model="showError">
      {{ error }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null,
    loading: false,
    error: null,
    showError: false
  }),
  methods: {
    async login () {
      this.loading = true
      try {
        const result = await this.$store.dispatch('LOGIN', { email: this.email, password: this.password })
        if (result.err) {
          this.error = result.err
        }
        if (result.success) {
          this.$router.push('/game')
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            this.error = err.response.data.err
            this.showError = true
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