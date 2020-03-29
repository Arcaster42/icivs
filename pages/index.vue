<template>
  <v-container>
    <div>
      <app-logo/>
      <h1 class="title">
        iCivs
      </h1>
      <h2 class="subtitle">
        Pocket Civilization
      </h2>
      <v-row>
        <v-col>
          <v-btn outlined nuxt width="80%" to="login">Login</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn outlined nuxt width="80%" to="register">Register</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn outlined nuxt width="80%" to="about">About</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 95vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center !important;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>

