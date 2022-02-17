<template>
  <v-container>
    <v-row class="mx-2">
      <h2 class="text-left mb-5">Product Stock</h2>
      <v-spacer />
      <v-btn class="mr-2" color="primary" to="/ScanQR-Product"
        >Scan QR for add-remove stock</v-btn
      >
    </v-row>
    <v-card class="mb-5 mt-3">
      <v-container>
        <v-menu
          v-model="datePick"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
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
          <v-date-picker v-model="date" @input="datePick = false"></v-date-picker>
        </v-menu>
      </v-container>
    </v-card>
    <v-card>
      <v-card-title>
        Stock List
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="stock"
        :search="search"
        class="mr-5 ml-5"
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import { db } from "../firebaseDb";

export default {
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      // menu: false,
      // modal: false,
      menu2: false,
      search: "",
      headers: [
        {
          text: "Stock ID",
          align: "start",
          sortable: false,
          value: "sid",
        },
        // { text: "Product ID", value: "prod_id" },
        { text: "Product Name", value: "prod_name" },
        { text: "Date", value: "date" },
        { text: "Amount", value: "amount" },
        { text: "Remaining", value: "remain" },
        { text: "Employee", value: "emp_id" },
        { text: "Status", value: "status" },
      ],
      stock: [],
    };
  },
  methods: {
    init() {
      db.collection("stock").onSnapshot((snapshotChange) => {
        this.stock = [];
        snapshotChange.forEach((doc) => {
          this.stock.push({
            sid: doc.id,
            prod_id: doc.data().prod_id,
            prod_name: doc.data().prod_name,
            status: doc.data().status,
            amount: doc.data().amount,
            remain: doc.data().remaining,
            date: doc.data().date,
            emp_id: doc.data().employee,
          });
        });
      });
    },
    getStatusColor(val) {
      if (val == "out") return "red";
      else return "green";
    },
  },
  created() {
    this.init();
  },
};
</script>