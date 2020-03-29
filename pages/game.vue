<template>
  <v-content>
    <v-btn icon @click="toggleNav"><v-icon x-large class="ml-4 mt-4">mdi-menu</v-icon></v-btn>
    <Navigation :show="showNav" @setNav="setNav"/>
    <ResourceBar/>
    <BuildMenu/>
  </v-content>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
import ResourceBar from '~/components/ResourceBar.vue'
import BuildMenu from '~/components/BuildMenu.vue'

export default {
  components: {
    Navigation,
    ResourceBar,
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