<template>
  <v-container>
    <div>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="text--center display-1">About</v-card-title>
            <v-card-subtitle class="display-1">Pocket Civilization</v-card-subtitle>
            <v-card-text class="font--large">
              Manage your own civilization right from your mobile device. Decide your policies,
              manage your resources, and conquer your foes as you interact with other players
              who may help or hinder your progress.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn outlined nuxt width="80%" class="mt-4 mb-4" to="/">Back</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>
.container {
  min-height: 95vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
}

.text--center {
  justify-content: center;
}

.font--large {
  font-size: 18px;
}
</style>