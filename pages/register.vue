<template>
  <v-container fluid>
    <RegisterForm/>
  </v-container>
</template>

<script>
import RegisterForm from '~/components/RegisterForm.vue'

export default {
  components: {
    RegisterForm
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