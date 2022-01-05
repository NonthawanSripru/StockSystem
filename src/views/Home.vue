<template>
  <v-card>
    <v-layout>
      <v-flex>
        <v-navigation-drawer
          v-model="drawer"
          :mini-variant.sync="mini"
          permanent
        >
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/men/85.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-title>John Leider</v-list-item-title>

            <v-btn icon @click.stop="mini = !mini">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
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
        <v-card flat align="center" class="mt-5">
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

export default {
  components: {
    homeMenu,
    productMenu,
    reportMenu,
    stockMenu,
    orderMenu
  },
  data() {
    return {
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
          title: "Reports",
          icon: "mdi-file-chart",
          route: { name: "home", params: { page: "reportMenu" } },
        },
      ],
      mini: true,
    };
  },
  computed: {
    xcomponents() {
      this.items.filter((e) => e.route.params.page == this.$route.params.page);
      return this.$route.params.page;
    },
  },
};
</script>
