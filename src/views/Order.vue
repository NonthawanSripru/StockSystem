<template>
  <v-app>
    <v-card>
      <v-container>
        <div justify="center">
        <h2>My Order</h2></div>
        <v-data-table :headers="headers" :items="order" class="elevation-1">
          <template v-slot:item.prod_name="{ item }">
            <td>
              <tr v-for="(xitem, index) in item.prod_name" :key="index">
                <p>{{ xitem.product }}</p>
              </tr>
            </td>
          </template>
          <template v-slot:item.amount="{ item }">
            <td>
              <tr v-for="(xitem, index) in item.prod_name" :key="index">
                <p>{{ xitem.amount }}</p>
              </tr>
            </td>
          </template>
          <template v-slot:item.total="{ item }">
            <td>
              <tr v-for="(xitem, index) in item.prod_name" :key="index">
                <p>{{ xitem.total }}</p>
              </tr>
            </td>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </v-app>
</template>
<script>
import { db } from "../firebaseDb";
import firebase from "firebase";

export default {
  data() {
    return {
      headers: [
        {
          text: "Order ID",
          align: "start",
          sortable: false,
          value: "order_id",
        },
        // { text: "Product ID", value: "prod_id" },
        { text: "Product Name", value: "prod_name" },
        { text: "Amount", value: "amount" },
        { text: "Total", value: "total" },
        { text: "Date", value: "date" },
        { text: "Total price (Baht)", value: "totalPrice" },
        { text: "Customer", value: "customer" },
      ],
      address: "",
      phone: "",
      email: "",
      order: [],
    };
  },
  methods: {
    getCart() {
      db.collection("order")
        .where("employee", "==", this.email)
        .onSnapshot((snapshotChange) => {
          this.order = [];
          snapshotChange.forEach((doc) => {
            this.order.push({
            order_id: doc.id,
            // prod_id: doc.data().prod_id,
            prod_name: doc.data().order,
            // price: doc.data().price,
            totalPrice: doc.data().totalPrice,
            date: doc.data().date,
            customer: doc.data().employee,
          });
          });
        });
    },
    checkLogin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.cuser = user.uid;
          this.email = user.email;
          this.isLogedIn = true;

          this.userRole = new Promise((resolve) => {
            db.collection("user").onSnapshot((snapshotChange) => {
              snapshotChange.forEach((doc) => {
                if (doc.id == this.cuser) resolve(doc.data().status);
              });
            });
          });

          this.role = this.userRole.then((values) => {
            return values;
          });

          console.log(this.role);
          // User is signed in.
          // this.getRole();
          this.getCart();
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
    this.getCart();
  },
};
</script>