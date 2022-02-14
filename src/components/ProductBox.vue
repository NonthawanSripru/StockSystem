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
        <h5 class="card-title">{{ product.prod_name }}</h5>
        <!-- </router-link> -->
        <p class="card-text">Price : {{ product.price }} Baht</p>
        <p class="card-text font-italic">
          {{ product.detail.substring(0, 65) }}...
        </p>
        <!-- </div> -->
      </div>
      <div>
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
  props: ["product"],
  data() {
    return {
      carts: [],
      email: "",
      item: {
        product: "",
        price: "",
        amount: "",
        total: "",
      },
    };
  },
  created(){
    this.checkLogin();
  },
  methods: {
    addCart() {
      var today = new Date();
      this.item.product = this.product.prod_name;
      this.item.price = this.product.price;
      this.item.amount = 1;

      var obj = {};
      obj["date"] = today.toLocaleDateString();
      obj["employee"] = this.email;
      obj["order"] = this.item;
      // obj["totalPrice"] = this.totalPrice;

      db.collection("cart")
        .add(obj)
        .then(() => {
          alert("Add cart successfully!");
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
