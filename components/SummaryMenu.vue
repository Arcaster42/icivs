<template>
  <v-sheet>
    <v-list>
      <v-list-item v-for="key of Object.keys(buildings)" :key="key">
        <v-list-item-icon><v-icon color="primary">mdi-home-group</v-icon></v-list-item-icon>
          <v-row justify="space-between">
            <v-col>
              <v-list-item-title v-if="titleHash">{{ titleHash[key] }}</v-list-item-title>
            </v-col>
            <v-col class="text-center">
              <span>{{ buildings[key] }}</span>
            </v-col>
          </v-row>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
export default {
  async mounted () {
    try {
      const schematics = await this.$store.dispatch('SCHEMATICS')
      const titleHash = {}
      for (const schematic of schematics) {
        titleHash[schematic.tag] = schematic.title
      }
      this.titleHash = titleHash
    } catch (err) {
      console.log(err)
    }
  },
  data: () => ({
    titleHash: null
  }),
  computed: {
    buildings () {
      return this.$store.getters.GET_USER_BUILDINGS
    }
  }
}
</script>

<style>

</style>