<template>
  <v-card width="320">
    <v-container>
      <!-- <div class="card h-100 w-100"> -->
      <div class="embed-responsive embed-responsive-16by9">
        <img
          width="300"
          height="200"
          :src="product.image"
          alt="Product Image"
        />
      </div>
      <div class="card-body">
        <!-- <router-link :to="{ name: 'ShowDetails', params: { id: product.id } }"> -->
        <h5 class="card-title ml-1">{{ product.prod_name }}</h5>
        <!-- </router-link> -->
        <v-row class="mt-1 mr-1 ml-1">
          <p class="card-text">Price : {{ product.price }} Baht</p>
          <v-spacer/>
          <p class="card-text">Stock : {{ product.remain }}</p>
        </v-row>
        <p class="card-text font-italic ml-1">
          {{ product.detail.substring(0, 65) }}...
        </p>
        <!-- </div> -->
      </div>
      <div>
        <v-row class="ml-1">
          <v-col>
            <v-btn v-if="qualtity <= 0" disabled> - </v-btn>
            <v-btn @click="qualtity-- && product.remain++" v-else> - </v-btn>
          </v-col>
          <v-col><p class="mt-2 ml-6">{{ qualtity }}</p></v-col>
          <v-col>
            <v-btn v-if="product.remain == 0" disabled> + </v-btn>
            <v-btn v-else @click="product.remain-- && qualtity++"> + </v-btn>
          </v-col >
        </v-row>
      </div>
      <div class="mt-3">
        <v-btn @click="addCart">Add Cart</v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { db } from "../firebaseDb";
import firebase from "firebase";

export default {
  name: "ProductBox",
  props: ["product", "id"],
  data() {
    return {
      carts: [],
      email: "",
      qualtity: 0,
      item: {
        product: "",
        price: "",
        amount: "",
        total: "",
        prod_id:"",
      },
      user: null,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    addCart() {
      // var today = new Date();
      this.item.product = this.product.prod_name;
      this.item.price = this.product.price;
      this.item.amount = this.qualtity;
      this.item.total = this.qualtity * this.product.price;
      this.item.prod_id = this.id;

      var obj = {};
      // obj["date"] = today.toLocaleDateString();
      // obj["employee"] = this.email;
      obj["order"] = this.item;
      // obj["totalPrice"] = this.totalPrice;
      console.log(obj);

      db.collection("user")
        .doc(this.user.uid)
        .collection("cart")
        .add(obj)
        .then(() => {
          alert("Add cart successfully!");
        });

      db.collection("product").doc(this.id).update({
        remain: this.product.remain,
      });

      this.qualtity = 0;
    },
    checkLogin() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          this.user = user;
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
};
</script>

<style scoped>
.embed-responsive .card-img-top {
  object-fit: cover;
}

a {
  text-decoration: none;
}

.card-title {
  color: #484848;
  font-size: 1.1rem;
  font-weight: 400;
}

.card-title:hover {
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
}

#edit-product {
  float: right;
}
</style>
