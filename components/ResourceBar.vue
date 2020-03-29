<template>
  <v-sheet class="mt-2 ml-2 mr-2 text-right">
    <span>
      <v-icon color="green">mdi-cash</v-icon>{{ resources.money }}
      <v-icon color="brown lighten-3">mdi-account-group</v-icon>{{ resources.free_pop }}
    </span>
    <br>
    <span>
      <v-icon color="red darken-4">mdi-food-apple</v-icon>{{ resources.food }}
      <v-icon color="brown">mdi-pine-tree</v-icon> {{ resources.wood }}
      <v-icon color="grey">mdi-image-filter-hdr</v-icon> {{ resources.stone }}
      <v-icon color="orange darken-3">mdi-image-filter-hdr</v-icon> {{ resources.iron }}
      <v-icon color="yellow">mdi-image-filter-hdr</v-icon>{{ resources.gold }}
    </span>
  </v-sheet>
</template>

<script>
export default {
  computed: {
    resources () {
      return this.$store.getters.GET_USER_RESOURCES
    }
  }
}
</script>

<style>

</style>