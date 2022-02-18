<template>
  <!-- <v-app v-if="$route.name == 'about'">
    <router-view />
  </v-app> -->
  <v-app>
    <div>
      <v-card class="mx-auto overflow-hidden" height="auto">
        <v-app-bar
          color="#101357"
          dark
          v-if="
            email === 'simplestore.owner@gmail.com' &&
            email === 'test@gmail.com'
          "
        >
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
                  <h4>{{ item.prod_name }}</h4>
                  is almost out of stock
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
          <v-menu v-if="isLogedIn" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-badge
                  :content="cart.length"
                  :value="cart.length"
                  color="error"
                  overlap
                >
                  <v-icon>mdi-cart</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <v-list width="300px">
              <v-subheader
                ><h3>My carts</h3><v-spacer/>
                <v-btn to="/order" color="primary" text> History</v-btn>
              </v-subheader>
              <v-divider></v-divider>
              <v-list-item v-for="(item, i) in cart" :key="i" class="ml-5">
                <v-list-item-content @click="MarkAsRead(item)">
                  {{ item.order.product }}
                  <v-spacer />
                  x{{ item.order.amount }} <v-spacer />
                  {{ item.order.total }} Baht
                </v-list-item-content>
                <v-btn @click="removeProduct(item)">remove</v-btn>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item-action>
                <v-btn class="mt-2" color="primary" @click="addOrder"
                  >Order</v-btn
                >
              </v-list-item-action>
            </v-list>
          </v-menu>
          <h3 v-if="isLogedIn">Hi! {{ email }}</h3>
          <v-btn v-if="isLogedIn" icon @click="logout()">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-app-bar>
        <v-dialog v-model="dialogOrder" width="500">
          <v-card>
            <v-card-title>Add your address informations</v-card-title>
            <div class="mx-10">
              <v-textarea
                v-model="address"
                placeholder="Fill your address ex : Plot/House number, Village Road Subdistrict, District Province Postal Code THAILAND"
                outlined
              ></v-textarea>
              <v-text-field
                v-model="phone"
                placeholder="Fill your phone"
                outlined
              ></v-text-field>
            </div>
            <v-card-actions>
              <v-row class="mx-5 mt-2 mb-5">
                <v-btn @click="dialogOrder = false">close</v-btn>
                <v-spacer />
                <v-btn @click="orderProduct">save</v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    dialogOrder: false,
    userRole: null,
    products: [],
    cart: [],
    group: null,
    email: "",
    isLogedIn: "",
    cuser: "",
    messages: 0,
    remain: 0,
    role: "",
    address: "",
    phone: "",
  }),
  methods: {
    getRemain() {
      db.collection("product").onSnapshot((snapshotChange) => {
        this.products = [];
        snapshotChange.forEach((doc) => {
          if (doc.data().remain <= doc.data().notify)
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
    getCart() {
      db.collection("user")
        .doc(this.cuser)
        .collection("cart")
        .onSnapshot((snapshotChange) => {
          this.cart = [];
          snapshotChange.forEach((doc) => {
            // if (doc.data().remain == doc.data().notify)
            this.cart.push({
              id: doc.id,
              order: doc.data().order,
            });
          });
        });
    },
    async removeProduct(val) {
      const productRef = db.collection("product");
      const snapshot = await productRef
        .where("prod_name", "==", val.order.product)
        .get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach((doc) => {
        this.remain = doc.data().remain;
      });

      var amount = val.order.amount;

      // console.log(this.remain);
      // console.log(amount)

      db.collection("user")
        .doc(this.cuser)
        .collection("cart")
        .doc(val.id)
        .delete()
        .then(() => {
          alert("Product deleted!");
        })
        .catch((error) => {
          console.error(error);
        });

      db.collection("product")
        .doc(val.order.prod_id)
        .update({
          remain: this.remain + amount,
        });
    },
    addOrder() {
      this.dialogOrder = true;
    },
    orderProduct() {
      var today = new Date();
      var order = [];
      var totalPrice = 0;

      for (var i = 0; i < this.cart.length; i++) {
        order.push(this.cart[i].order);
        totalPrice = totalPrice + this.cart[i].order.total;
      }

      var obj = {};
      obj["date"] = today.toLocaleDateString();
      obj["employee"] = this.email;
      obj["order"] = order;
      obj["totalPrice"] = totalPrice;
      obj["cus_address"] = this.address;
      obj["cus_phone"] = this.phone;
      console.log(obj);

      db.collection("order")
        .add(obj)
        .then(() => {
          alert("Add order successfully!");
        });

      let collref = db.collection("user").doc(this.cuser).collection("cart");

      collref.get().then(async (querySnap) => {
        await querySnap.forEach(async (doc) => {
          await collref.doc(doc.id).delete();
        });
      });

      this.dialogOrder = false;
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
    // getRole() {
    //   db.collection("user").onSnapshot((snapshotChange) => {
    //     this.userRole = "";
    //     snapshotChange.forEach((doc) => {
    //       return this.userRole=doc.data().status;
    //     });
    //   });
    //   console.log(this.userRole);
    // },
  },
  created() {
    this.checkLogin();
    this.getNotification();
  },
  mounted() {
    this.getRemain();
    // this.getRole();
  },
};
</script>
<style lang="scss">
</style>
