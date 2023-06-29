<template>
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="black"
    >
      <v-tab value="one">Item One</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item class="w-20" value="one">
          one
        </v-window-item>

        <v-window-item class="w-20" value="two">
          Two
        </v-window-item>

        <v-window-item class="w-20" value="three">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'mainHeader',
  components: {
  },  
  data () {
    return {
      tab: null,
    }
  },
}
</script>
