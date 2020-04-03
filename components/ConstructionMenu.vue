<template>
  <v-content>
    <template v-if="!constructions || constructions.length === 0">
      <v-row justify="center" class="mt-10">
        <p><v-icon x-large color="error">mdi-close-circle</v-icon></p>
      </v-row>
      <v-row justify="center">
        <p>No buildings under construction.</p>
      </v-row>
    </template>
    <v-list v-if="constructions && constructions.length > 0">
      <v-list-item-group>
        <v-list-item three-line v-for="construction of constructions" :key="construction.tag">
          <v-list-item-avatar><v-icon x-large color="primary">mdi-home</v-icon></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ construction.title }}</v-list-item-title>
            <v-list-item-subtitle>
              <span>
                Time Remaining: {{ construction.civ_time }}
              </span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>{{ construction.info }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-content>
</template>

<script>
export default {
  async mounted () {
    await this.$store.dispatch('CONSTRUCTION')
  },
  data: () => ({
    textHash: {
      food: 'Food',
      wood: 'Wood',
      stone: 'Stone',
      iron: 'Iron',
      gold: 'Gold',
      money: 'Money',
      free_pop: 'Population',
      arms: 'Arms'
    }
  }),
  computed: {
    constructions () {
      return this.$store.getters.GET_USER_CONSTRUCTION
    }
  }
}
</script>

<style>

</style>