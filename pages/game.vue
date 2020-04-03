<template>
  <v-content>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="toggleNav"/>
      <v-toolbar-title>{{ viewDict[view] }}</v-toolbar-title>
      <v-spacer/>
    </v-app-bar>
    <Navigation :show="showNav" @setNav="setNav" @setView="setView"/>
    <ResourceBar/>
    <SummaryMenu v-if="view==='SummaryMenu'"/>
    <BuildMenu v-if="view==='BuildMenu'"/>
    <ConstructionMenu v-if="view==='ConstructionMenu'"/>
  </v-content>
</template>

<script>
import * as io from 'socket.io-client'
import Navigation from '~/components/Navigation.vue'
import ResourceBar from '~/components/ResourceBar.vue'
import SummaryMenu from '~/components/SummaryMenu.vue'
import BuildMenu from '~/components/BuildMenu.vue'
import ConstructionMenu from '~/components/ConstructionMenu.vue'

export default {
  components: {
    Navigation,
    ResourceBar,
    SummaryMenu,
    BuildMenu,
    ConstructionMenu
  },
  mounted () {
    const socket = io('http://localhost:3006')
    socket.on('message', (msg) => {
      if (msg === 'USER' && this.view === 'ConstructionMenu') this.$store.dispatch('CONSTRUCTION')
      if (msg === 'USER') this.$store.dispatch('USER')
    })
    // TODO - Put socket in Vue.use()
    // this.$store.commit('SET_SOCKET', socket)
  },
  data: () => ({
    showNav: false,
    view: 'SummaryMenu',
    viewDict: {
      'SummaryMenu': 'Summary',
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
  },
  computed: {
    
  }
}
</script>

<style>

</style>