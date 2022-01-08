<template>
  <v-app>
    <div>
      <v-card class="mx-auto overflow-hidden" height="auto">
        <v-app-bar color="deep-purple" dark>
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

          <v-toolbar-title>Stock control & Inventory</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-bell</v-icon>
          </v-btn>
          <h3>Hi! Admin</h3>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>
        <router-view />
      </v-card>
    </div>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    // drawer: false,
    group: null,
  }),
};
</script>
<style lang="scss">


</style>
