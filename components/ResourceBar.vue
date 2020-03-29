<template>
  <v-sheet color="light-blue" class="mt-2">
    <span>Food: {{ resources.food }} -- Wood: {{ resources.wood }} -- Stone: {{ resources.stone }} -- Iron: {{ resources.iron }} -- Gold: {{ resources.gold }}</span><br>
    <span>Money: {{ resources.money }} -- Population: {{ resources.free_pop }}</span>
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