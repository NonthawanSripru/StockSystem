<template>
  <v-card color="grey lighten-3">
    <v-layout>
      <v-flex>
        <v-navigation-drawer v-model="drawer" permanent>
          <v-list-item class="tile">
            <v-list-item-avatar>
              <v-icon large>mdi-account-circle-outline</v-icon>
            </v-list-item-avatar>

            <v-list-item-title>{{ email }}</v-list-item-title>

            <!-- <v-btn icon @click.stop="mini = !mini">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn> -->
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.route"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs12>
        <v-card flat align="center" class="mt-5" color="grey lighten-3">
          <component v-bind:is="xcomponents"></component>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import homeMenu from "@/components/homeMenu.vue";
import productMenu from "@/components/productMenu.vue";
import reportMenu from "@/components/reportMenu.vue";
import stockMenu from "@/components/stockMenu.vue";
import orderMenu from "@/components/orderMenu.vue";
import supplierMenu from "@/components/supplierMenu.vue";
import firebase from "firebase";

export default {
  components: {
    homeMenu,
    productMenu,
    reportMenu,
    stockMenu,
    orderMenu,
    supplierMenu,
  },
  data() {
    return {
      isLogedIn: "",
      email: "",
      drawer: true,
      items: [
        {
          title: "Home",
          icon: "mdi-home",
          route: { name: "home", params: { page: "homeMenu" } },
        },
        {
          title: "Products",
          icon: "mdi-clipboard-search-outline",
          route: { name: "home", params: { page: "productMenu" } },
        },
        {
          title: "Stock",
          icon: "mdi-archive-cog",
          route: { name: "home", params: { page: "stockMenu" } },
        },
        {
          title: "Orders",
          icon: "mdi-cart-variant",
          route: { name: "home", params: { page: "orderMenu" } },
        },
        {
          title: "Suppliers",
          icon: "mdi-archive-star",
          route: { name: "home", params: { page: "supplierMenu" } },
        },
      ],
      mini: true,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          this.email = user.email;
          this.isLogedIn = true;
          if (user.email == "simplestore.owner@gmail.com"){
            this.items.push({
              title: "Reports",
              icon: "mdi-file-chart",
              route: { name: "home", params: { page: "reportMenu" } }
            });
          }
        } else {
          // No user is signed in.
          // this.$router.replace("/");
          this.isLogedIn = false;
        }
      });
    },
  },
  computed: {
    xcomponents() {
      this.items.filter((e) => e.route.params.page == this.$route.params.page);
      return this.$route.params.page;
    },
  },
};
</script>
<style scoped>
.tile {
  margin: 5px;
  border-radius: 4px;
  background-color: rgb(250, 230, 174);
}
/* .tile:hover {
    background: green;
  }
  .tile:active {
    background: yellow;
  } */
</style>
