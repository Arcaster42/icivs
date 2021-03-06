<template>
  <v-sheet>
    <v-list>
      <v-list-item-group>
        <v-list-item three-line v-for="schematic of schematics" :key="schematic.tag">
          <v-list-item-avatar><v-icon x-large color="primary">mdi-home</v-icon></v-list-item-avatar>
          <v-list-item-content @click="select(schematic)">
            <v-list-item-title>{{ schematic.title }}</v-list-item-title>
            <v-list-item-subtitle>
              <span v-for="x of Object.keys(schematic.cost)" :key="x">
                <v-icon :color="resourceHash[x].color">{{ resourceHash[x].icon }}</v-icon>{{ schematic.cost[x] }}
              </span>
              <span>
                <v-icon color="blue">mdi-clock</v-icon> {{ schematic.time }}
              </span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>{{ schematic.info }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-dialog persistent v-model="showModal">
      <v-card class="text-center">
        <v-card-title>Construction</v-card-title>
        <v-card-text>
          <p class="subtitle-1" v-if="selected">
            Are you sure you want to build {{ selected.title }}?
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" width="35%" :disabled="!canAfford" :loading="loading" @click="build">Confirm</v-btn>
          <v-spacer/>
          <v-btn color="error" width="35%" :disabled="loading" @click="showModal=false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar :color="alertColor" v-model="alertShow">
      {{ alert }}
    </v-snackbar>
  </v-sheet>
</template>

<script>
export default {
  async mounted () {
    const schematics = await this.$store.dispatch('SCHEMATICS')
    this.schematics = schematics
  },
  data: () => ({
    resourceHash: {
      food: { icon: 'mdi-food-apply', color: 'red darken-4' },
      wood: { icon: 'mdi-pine-tree', color: 'brown' },
      stone: { icon: 'mdi-image-filter-hdr', color: 'grey' },
      iron: { icon: 'mdi-image-filter-hdr', color: 'orange darken-3' },
      gold: { icon: 'mdi-image-filter-hdr', color: 'yellow' },
      money: { icon: 'mdi-cash', color: 'green' },
      free_pop: { icon: 'mdi-account-group', color: 'brown lighten-3' },
      arms: { icon: 'mdi-sword', color: 'silver' },
      time: { icon: 'mdi-clock', color: 'blue' }
    },
    loading: false,
    schematics: null,
    selected: null,
    canAfford: null,
    showModal: false,
    alert: null,
    alertColor: null,
    alertShow: false
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
    },
    async build () {
      this.loading = true
      const buildObj = { email: this.email, tag: this.selected.tag }
      try {
        const result = await this.$store.dispatch('BUILD', buildObj)
        if (result.success) {
          this.alert = result.success
          this.alertColor = 'success'
          this.alertShow = true
        }
        if (result.err) {
          this.alert = result.err
          this.alertColor = 'error'
          this.alertShow = true
        }
        await this.$store.dispatch('USER')
        this.showModal = false
      } catch (err) {
        this.alert = err
        this.alertColor = 'error'
        this.alertShow = true
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    email () {
      return this.$store.getters.GET_USER_EMAIL
    },
    resources () {
      return this.$store.getters.GET_USER_RESOURCES
    }
  }
}
</script>

<style>

</style>