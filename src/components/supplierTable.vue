<template>
  <v-container>
    <v-btn class="mb-5" color="primary" @click="dialogNewSup = true"
      >Add new supplier</v-btn
    >
    <v-dialog v-model="dialogNewSup" width="900">
      <v-card >
        <v-card-title>Add New Supplier</v-card-title>
        <v-col>
          <v-row class="mx-2">
            <v-col md="12">
              <v-text-field
                v-model="newSupplier.sup_name"
                label="Fill supplier name"
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-2">
            <v-col md="4">
              <v-text-field
                v-model="newSupplier.phone"
                label="phone"
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="newSupplier.email"
                label="email"
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-2">
            <v-col md="7">
              <!-- <v-select
                v-model="newSupplier.product"
                label="Choose product"
                dense
              ></v-select> -->
              <v-autocomplete
                v-model="newSupplier.product"
                :items="products"
                outlined
                dense
                chips
                small-chips
                label="Choose product"
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row class="mx-2 mb-2" justify="end">
            <v-btn class="mx-2" @click="dialogNewSup = false">Cancel</v-btn>
            <v-btn @click="addNewSup">Save</v-btn>
          </v-row>
        </v-col>
      </v-card>
    </v-dialog>
    <v-simple-table>
      <template v-slot:default>
        <!-- <thead>
        <tr>
          <th class="text-left">Supplier Name</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Email</th>
        </tr>
      </thead> -->
        <tbody>
          <tr v-for="item in suppliers" :key="item.sup_name">
            <td>{{ item.sup_name }}</td>
            <!-- <td>{{ item.phone }}</td> -->
            <td>{{ item.email }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
import { db } from "../firebaseDb";

export default {
  data() {
    return {
      suppliers: [],
      dialogNewSup: false,
      newSupplier: {
        sup_name: "",
        email: "",
        phone: "",
        products: [],
      },
      products: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      db.collection("supplier").onSnapshot((snapshotChange) => {
        this.suppliers = [];
        snapshotChange.forEach((doc) => {
          this.suppliers.push({
            sup_id: doc.id,
            sup_name: doc.data().sup_name,
            phone: doc.data().phone,
            email: doc.data().email,
          });
        });
      });
      db.collection("product").onSnapshot((snapshotChange) => {
        this.products = [];
        snapshotChange.forEach((doc) => {
          this.products.push(doc.data().prod_name);
        });
      });
    },
    addNewSup(){
      db.collection("supplier")
          .add(this.newSupplier)
          .then(() => {
            alert("Product successfully added!");
            this.newSupplier.sup_name = "";
            this.newSupplier.email = "";
            this.newSupplier.phone = "";
            this.newSupplier.products = [];
            this.dialogNewSup=false;
          })
          .catch((error) => {
            console.log(error);
          });
    }
  },
};
</script>