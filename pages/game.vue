<template>
  <v-content>
    <v-row class="mt-2 ml-2 mr-2" justify="space-between">
      <v-btn icon @click="toggleNav"><v-icon x-large>mdi-menu</v-icon></v-btn>
      <h1>{{ viewDict[view] }}</h1>
    </v-row>
    <Navigation :show="showNav" @setNav="setNav" @setView="setView"/>
    <ResourceBar/>
    <BuildMenu v-if="view==='BuildMenu'"/>
    <ConstructionMenu v-if="view==='ConstructionMenu'"/>
  </v-content>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
import ResourceBar from '~/components/ResourceBar.vue'
import BuildMenu from '~/components/BuildMenu.vue'
import ConstructionMenu from '~/components/ConstructionMenu.vue'

export default {
  components: {
    Navigation,
    ResourceBar,
    BuildMenu,
    ConstructionMenu
  },
  data: () => ({
    showNav: false,
    view: 'Summary',
    viewDict: {
      'Summary': 'Summary',
      'BuildMenu': 'New Construction',
      'ConstructionMenu': 'Current Construction'
    }
  }),
  methods: {
    toggleNav () {
      this.showNav = !this.showNav
    },
    setNav (value) {
      this.showNav = value
    },
    setView (view) {
      this.view = view
    }
  }
}
</script>

<style>

</style>