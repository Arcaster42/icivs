<template>
  <div class="max-width">
    <v-text-field outlined label="E-Mail" v-model="email"/>
    <v-text-field outlined type="password" label="Password" v-model="password"/>
    <v-btn outlined min-width="80%" class="margin" @click="login">Login</v-btn>
    <v-btn outlined nuxt min-width="80%" to="/" class="margin">Back</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null
  }),
  methods: {
    async login () {
      try {
        const loginResponse = await this.$axios.post('http://localhost:3005/user/login', { email: this.email, password: this.password })
        if (loginResponse.status === 200) {

        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) console.log('Invalid Credentials')
        } else {
          console.log(err)
        }
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