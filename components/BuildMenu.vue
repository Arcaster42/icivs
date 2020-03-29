<template>
  <v-content>
    <v-list>
      <v-list-item-group>
        <v-list-item three-line v-for="schematic of schematics" :key="schematic.tag">
          <v-list-item-avatar><v-icon x-large color="primary">mdi-home</v-icon></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ schematic.title }}</v-list-item-title>
            <v-list-item-subtitle>
              <span v-for="x of Object.keys(schematic.cost)" :key="x">
                {{ textHash[x] }}: {{ schematic.cost[x] }}
              </span>
              <span>
                Time: {{ schematic.time }}
              </span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>{{ schematic.info }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-content>
</template>

<script>
export default {
  async mounted () {
    const schematics = await this.$store.dispatch('SCHEMATICS')
    this.schematics = schematics
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
    },
    schematics: null
  })
}
</script>

<style>

</style>