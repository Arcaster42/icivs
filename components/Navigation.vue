<template>
  <v-navigation-drawer mini-variant absolute v-model="showNav" @input="emitNav">
    <v-list-item v-for="item of items" :key="item.title" @click="item.click">
      <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ['show'],
  data: function () {
    return {
      showNav: this.show,
      items: [
        { icon: 'mdi-hammer', title: 'Build', click: this.openBuild },
        { icon: 'mdi-domain', title: 'Construction', click: this.openConstruction },
        { icon: 'mdi-help', title: 'Help', click: this.openHelp },
        { icon: 'mdi-logout', title: 'Logout', click: this.logout }
      ]
    }
  },
  watch: {
    show (newValue) {
      this.showNav = newValue
    }
  },
  methods: {
    emitNav (isOpen) {
      this.$emit('setNav', isOpen)
    },
    openBuild () {
      this.showNav = false
      this.$emit('setView', 'BuildMenu')
    },
    openConstruction () {
      this.showNav = false
      this.$emit('setView', 'ConstructionMenu')
    },
    openHelp () {

    },
    async logout () {
      try {
        this.showNav = false
        const result = await this.$store.dispatch('LOGOUT')
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>