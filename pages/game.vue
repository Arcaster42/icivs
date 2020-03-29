<template>
  <v-content>
    <v-btn icon @click="toggleNav"><v-icon>mdi-menu</v-icon></v-btn>
    <Navigation :show="showNav" @setNav="setNav"/>
    <BuildMenu/>
  </v-content>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
import BuildMenu from '~/components/BuildMenu.vue'

export default {
  components: {
    Navigation,
    BuildMenu
  },
  data: () => ({
    showNav: false
  }),
  methods: {
    toggleNav () {
      this.showNav = !this.showNav
    },
    setNav (value) {
      this.showNav = value
    }
  }
}
</script>

<style>

</style>