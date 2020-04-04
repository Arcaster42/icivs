<template>
  <v-navigation-drawer mini-variant absolute v-model="showNav" @input="emitNav">
    <v-list-item v-for="item of items" :key="item.title" @click="item.click">
      <v-list-item-icon>
        <!-- <v-badge color="error" :content="constructionCount" offset-x="8" offset-y="8" v-if="item.title==='Construction' && constructionCount"> -->
          <v-icon color="primary">{{ item.icon }}</v-icon>
        <!-- </v-badge> -->
      </v-list-item-icon>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  async mounted () {
    try {
      const constructions = await this.$store.dispatch('CONSTRUCTION')
      // this.constructionCount = constructions.length
    } catch (err) {
      console.log(err)
    }
  },
  props: ['show'],
  data: function () {
    return {
      showNav: this.show,
      items: [
        { icon: 'mdi-home-group', title: 'Summary', click: this.openSummary },
        { icon: 'mdi-hammer', title: 'Build', click: this.openBuild },
        { icon: 'mdi-domain', title: 'Construction', click: this.openConstruction },
        { icon: 'mdi-help', title: 'Help', click: this.openHelp },
        { icon: 'mdi-logout', title: 'Logout', click: this.logout }
      ],
      constructionCount: null
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
    openSummary () {
      this.showNav = false
      this.$emit('setView', 'SummaryMenu')
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
        this.$socket.send('LOGOUT')
        this.$socket.close()
        this.$router.push('/')
        const result = await this.$store.dispatch('LOGOUT')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>