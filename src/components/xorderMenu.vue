<template>
  <v-container>
    <v-row class="mx-2">
      <h2 class="text-left">Order Lists</h2>
      <v-spacer />
      <v-btn class="mr-2" color="primary" @click="dialogOrder = true"
        >Add Order</v-btn
      >
    </v-row>
    <v-row>
      <v-col md="6">
        <v-card class="mb-5 mt-3">
          <v-container>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Select date for search information"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-container>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card class="mb-5 mt-3 pb-5">
          <v-container>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogOrder" max-width="800px">
      <v-card>
        <v-card-title>Add Order Informaion</v-card-title>
        <v-col>
          <v-row v-for="(item, index) in ordered" :key="index" class="mx-2">
            <v-col md="4">
              <v-select
                v-model="item.product"
                :items="product"
                label="Choose product"
                dense
                @change="getPrice(item.product,index)"
              ></v-select>
            </v-col>
            <v-col md="2">
              <v-text-field
                v-model="item.price"
                label="Price"
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col md="2">
              <v-text-field
                v-model="item.amount"
                label="Amount"
                dense
                @change="calPrice(item.amount,index)"
              ></v-text-field>
            </v-col>
            <v-col md="3">
              <v-text-field
                v-model="item.total"
                label="Total"
                dense
              ></v-text-field>
            </v-col>
            <v-col md="1">
              <v-btn icon @click="RemoveProduct(item)"
                ><v-icon>mdi-minus</v-icon></v-btn
              >
            </v-col>
          </v-row>
          <v-row class="mx-2">
            <v-btn @click="AddProduct" class="ml-3"
              ><v-icon>mdi-plus</v-icon>Add product</v-btn
            >
          </v-row>
          <v-row class="mt-10 mx-2 mb-5" justify="end">
            <v-btn class="mr-4" @click="submit" color="primary"> submit </v-btn>
            <v-btn @click="dialogOrder = false" color="grey" dark
              >cancle
            </v-btn>
          </v-row>
        </v-col>
      </v-card>
    </v-dialog>

    <v-card>
      <v-card-title>
        Orders List
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        class="mr-5 ml-5"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteOrder(item)"> mdi-delete </v-icon>
        </template></v-data-table
      >
    </v-card>
  </v-container>
</template>
<script>
import { db } from "../firebaseDb";
import firebase from "firebase";

export default {
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu2: false,
      dialogOrder: false,
      search: "",
      headers: [
        {
          text: "Order ID",
          align: "start",
          sortable: false,
          value: "order_id",
        },
        // { text: "Product ID", value: "prod_id" },
        { text: "Product Name", value: "prod_name" },
        { text: "Date", value: "date" },
        { text: "Total price (Baht)", value: "totalPrice" },
        // { text: "Amount", value: "amount" },
        { text: "Customer", value: "customer" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      orders: [],
      product: [],
      ordered: [
        {
          product: "",
          price:"",
          amount: "",
          total: "",
        },
      ],
      orderedList: {
        product: "",
        price:"",
        amount: "",
        total: "",
      },
      totalPrice: 0
    };
  },
  created() {
    this.checkLogin();
    this.initialize();
    this.getProduct();
  },
  methods: {
    initialize() {
      db.collection("order").onSnapshot((snapshotChange) => {
        this.orders = [];
        snapshotChange.forEach((doc) => {
          this.orders.push({
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
    getProduct() {
      db.collection("product").onSnapshot((snapshotChange) => {
        this.product = [];
        snapshotChange.forEach((doc) => {
          this.product.push(doc.data().prod_name);
        });
      });
    },
    getPrice(val,index){
      // console.log(val)
      db.collection("product").where("prod_name", "==", val).onSnapshot((snapshotChange) => {
        snapshotChange.forEach((doc) => {
          this.ordered[index].price=doc.data().price;
        });
      });
    },
    calPrice(val,index){
      this.ordered[index].total = this.ordered[index].price*val;
      this.totalPrice = this.totalPrice + this.ordered[index].total;
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
    submit() {
      // this.$v.$touch();
      var today = new Date();
      var obj = {};
      obj["date"] = today.toLocaleDateString();
      obj["employee"] = this.email;
      obj["order"] = this.ordered;
      obj["totalPrice"] = this.totalPrice;

      db.collection("order")
        .add(obj)
        .then(() => {
          alert("Add new order successfully!");
      });

      this.dialogOrder = false

      this.ordered = [
        {
          product: "",
          price:"",
          amount: "",
          total: "",
        },
      ]

      // console.log(obj)
    },
    AddProduct() {
      this.ordered.push(this.orderedList);
      this.orderedList = {
        product: "",
        price:"",
        amount: "",
        total: "",
      };
    },
    RemoveProduct(item) {
      this.ordered.splice(this.ordered.indexOf(item), 1);
    },
    deleteOrder(item) {
    db.collection("order")
        .doc(item.order_id)
        .delete()
        .then(() => {
          alert("Order deleted!");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
};
</script>