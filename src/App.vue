<template>
  <v-app>
    <div>
      <v-card class="mx-auto overflow-hidden" height="auto">
        <v-app-bar color="#101357" dark>
          <!-- <v-app-bar color="deep-purple" dark> -->
          <!-- <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon> -->

          <v-toolbar-title><h2>Stock control & Inventory</h2></v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn> -->
          <v-btn v-if="isLogedIn" icon>
            <v-icon>mdi-bell</v-icon>
          </v-btn>
          <h3 v-if="isLogedIn"> Hi! {{email}}</h3>
          <v-btn v-if="isLogedIn" icon @click="logout()">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-app-bar>
        <router-view />
      </v-card>
    </div>
  </v-app>
</template>
<script>
import firebase from "firebase";
export default {
  data: () => ({
    // drawer: false,
    group: null,
    email:"",
    isLogedIn: "",
  }),
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        });
    },
    checkLogin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          this.email=user.email;
          this.isLogedIn=true;
          // console.log(user)
        } else {
          // No user is signed in.
          // this.$router.replace("/");
          this.isLogedIn=false;
        }
      });
    },
  },
  created(){
      this.checkLogin();
  }
};
</script>
<style lang="scss">
</style>
