<template>
  <!-- <v-app v-if="$route.name == 'about'">
    <router-view />
  </v-app> -->
  <v-app>
    <div>
      <v-card class="mx-auto overflow-hidden" height="auto">
        <v-app-bar color="#101357" dark v-if="email=='test@gmail.com'">
          <v-toolbar-title><h2>Stock control & Inventory</h2></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu v-if="isLogedIn" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-badge
                  :content="products.length"
                  :value="products.length"
                  color="error"
                  overlap
                >
                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <v-list class="mt-2">
              <v-subheader><h3>NOTIFICATIONS</h3></v-subheader>
              <v-divider></v-divider>
              <v-list-item v-for="(item, i) in products" :key="i" link>
                <v-list-item-content @click="MarkAsRead(item)">
                  <h4>{{ item.prod_name }}</h4> is almost out of stock
                </v-list-item-content>
                <v-subheader>Remain: {{ item.remain }}</v-subheader>
              </v-list-item>
            </v-list>
          </v-menu>
          <h3 v-if="isLogedIn">Hi! {{ email }}</h3>
          <v-btn v-if="isLogedIn" icon @click="logout()">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-app-bar>
        <v-app-bar color="#101357" dark v-else>
          <v-toolbar-title><h2>Simple Store</h2></v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-menu v-if="isLogedIn">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-badge
                  :content="products.length"
                  :value="products.length"
                  color="error"
                  overlap
                >
                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, i) in products" :key="i">
                <v-list-item-content @click="MarkAsRead(item)"
                  >{{ item.prod_name }} is almost out of
                  stock</v-list-item-content
                >
              </v-list-item>
            </v-list>
          </v-menu> -->
          <h3 v-if="isLogedIn">Hi! {{ email }}</h3>
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
import { db } from "./firebaseDb";
import firebase from "firebase";

export default {
  data: () => ({
    // drawer: false,
    products: [],
    group: null,
    email: "",
    isLogedIn: "",
    messages: 0,
  }),
  methods: {
    getRemain() {
      db.collection("product").onSnapshot((snapshotChange) => {
        this.products = [];
        snapshotChange.forEach((doc) => {
          if (doc.data().remain == doc.data().notify)
            this.products.push({
              // prod_id: doc.id,
              prod_name: doc.data().prod_name,
              // image: doc.data().image,
              remain: doc.data().remain,
              notify: doc.data().notify,
            });
        });
      });
    },
    getNotification() {
      this.messages = this.products.length;
    },
    MarkAsRead(val) {
      console.log(val);
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        });
    },
    showNoti() {
      alert("Show Notification");
    },
    checkLogin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          this.email = user.email;
          this.isLogedIn = true;
          // console.log(user)
        } else {
          // No user is signed in.
          // this.$router.replace("/");
          this.isLogedIn = false;
        }
      });
    },
  },
  created() {
    this.checkLogin();
    this.getNotification();
  },
  mounted() {
    this.getRemain();
  },
};
</script>
<style lang="scss">
</style>
