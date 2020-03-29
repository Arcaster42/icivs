<template>
  <v-navigation-drawer mini-variant absolute v-model="showNav" @input="emitNav">
    <v-list-item v-for="item of items" :key="item.title">
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
        { icon: 'mdi-hammer', title: 'Build' },
        { icon: 'mdi-help', title: 'Help' },
        { icon: 'mdi-logout', title: 'Logout' }
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
    }
  }
}
</script>

<style>

</style>