<template>
  <v-container fluid>
    <LoginForm/>
  </v-container>
</template>

<script>
import LoginForm from '~/components/LoginForm.vue'

export default {
  components: {
    LoginForm
  }
}
</script>

<style>
.container {
  min-height: 95vh;
  max-height: 100vh;
  justify-items: center;
  align-items: center;
  display: grid;
}
</style>