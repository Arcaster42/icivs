<template>
  <v-content>
    <v-list>
      <v-list-item-group>
        <v-list-item three-line v-for="schematic of schematics" :key="schematic.tag">
          <v-list-item-avatar><v-icon x-large color="primary">mdi-home</v-icon></v-list-item-avatar>
          <v-list-item-content @click="select(schematic)">
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
    <v-dialog v-model="showModal">
      <v-card class="text-center">
        <v-card-title>Construction</v-card-title>
        <v-card-text>
          <p class="subtitle-1" v-if="selected">
            Are you sure you want to build {{ selected.title }}?
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :disabled="!canAfford">Confirm</v-btn>
          <v-spacer/>
          <v-btn color="error" @click="showModal=false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    schematics: null,
    selected: null,
    canAfford: null,
    showModal: false
  }),
  methods: {
    select (schematic) {
      this.selected = schematic
      let canAfford = true
      for (const x of Object.keys(this.selected.cost)) {
        if (this.resources[x] < this.selected.cost[x]) {
          canAfford = false
          break
        }
      }
      this.canAfford = canAfford
      this.showModal = true
    }
  },
  computed: {
    resources () {
      return this.$store.getters.GET_USER_RESOURCES
    }
  }
}
</script>

<style>

</style>