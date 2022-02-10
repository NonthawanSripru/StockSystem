<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-badge :content="products.length" :value="products.length" color="error" overlap>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, i) in products" :key="i">
          <v-list-item-content @click="MarkAsRead(item)">{{
            item.prod_name
          }} is almost out of stock</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <p>{{products}}</p>
     <p>{{products.length}}</p>
  </div>
</template>
<script>
import { db } from "../firebaseDb";

export default {
  data: () => ({
    messages: 0,
    products: [],
    items: [],
  }),
  created() {
    this.getNotification();
  },
  mounted() {
    this.getRemain();
  },
  methods: {
    getRemain() {
      db.collection("product").onSnapshot((snapshotChange) => {
        this.products = [];
        snapshotChange.forEach((doc) => {
          if(doc.data().remain==doc.data().notify)
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
  },
};
</script>