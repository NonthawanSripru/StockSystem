<template>
  <form>
    <v-container class="mb-7">
      <v-col>
        <v-row>
          <v-col md="12">
            <v-select
              v-model="select"
              :items="suppliers"
              label="Choose supplier"
              dense
              @change="getProduct"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-btn @click="AddProduct" class="ml-3"
            ><v-icon>mdi-plus</v-icon>Add product</v-btn
          >
        </v-row>
        <v-row v-for="(item, index) in supplied" :key="index">
          <v-col md="7">
            <v-select
              v-model="item.product"
              :items="product"
              label="Choose product"
              dense
            ></v-select>
          </v-col>
          <!-- <v-col md=4>
            <v-text-field v-model="name" label="Price" dense></v-text-field>
          </v-col> -->
          <v-col md="4">
            <v-text-field
              v-model="item.amount"
              label="Amount"
              dense
            ></v-text-field>
          </v-col>
          <v-col md="1">
            <v-btn icon @click="RemoveProduct(item)"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-btn class="mr-4" @click="submit" color="primary"> submit </v-btn>
      <v-btn @click="clear" color="grey" dark> clear </v-btn>
    </v-container>
  </form>
</template>
<script>
import { db } from "../firebaseDb";
import firebase from "firebase";

export default {
  data: () => ({
    name: "",
    isLogedIn: "",
    email: "",
    select: null,
    product: [],
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    suppliers: [],
    supplied: [
      {
        product: "",
        amount: "",
      },
    ],
    suppliedList: {
      product: "",
      amount: "",
    },
  }),

  created() {
    this.init();
    this.checkLogin();
  },

  computed: {},

  methods: {
    init() {
      db.collection("supplier").onSnapshot((snapshotChange) => {
        this.suppliers = [];
        snapshotChange.forEach((doc) => {
          this.suppliers.push(doc.data().sup_name);
        });
      });
    },
    getProduct() {
      console.log(this.select);
      db.collection("supplier")
        .where("sup_name", "==", this.select)
        .onSnapshot((snapshotChange) => {
          this.product = [];
          snapshotChange.forEach((doc) => {
            this.product = doc.data().product;
          });
        });
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
      obj["sup_name"] = this.select;
      obj["prod_name"] = this.supplied;

      db.collection("suppliedList")
        .add(obj)
        .then(() => {
          alert("Supply successful!");
        });
      // console.log("date : "+ today.toLocaleDateString())
      // console.log("user : "+ this.email)
      // console.log(this.select)
      // console.log(this.supplied)
    },
    AddProduct() {
      this.supplied.push(this.suppliedList);
      this.suppliedList = {
        product: "",
        amount: "",
      };
    },
    RemoveProduct(item) {
      this.supplied.splice(this.supplied.indexOf(item), 1);
    },
    clear() {
      // this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.supplied = [{ product: "", amount: "" }];
    },
  },
};
</script>