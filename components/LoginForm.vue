<template>
  <div class="max-width">
    <v-text-field outlined label="E-Mail" v-model="email"/>
    <v-text-field outlined type="password" label="Password" v-model="password"/>
    <v-btn outlined :loading="loading" min-width="80%" class="margin" @click="login">Login</v-btn>
    <v-btn outlined :disabled="loading" nuxt min-width="80%" to="/" class="margin">Back</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null,
    loading: false
  }),
  methods: {
    async login () {
      this.loading = true
      try {
        const loginResponse = await this.$axios.post(`${process.env.api}/user/login`, { email: this.email, password: this.password })
        console.log(loginResponse)
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) console.log('Invalid Credentials')
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