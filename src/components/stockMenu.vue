<template>
  <v-container>
    <v-row class="mx-2">
      <h2 class="text-left mb-5">Product Stock</h2>
      <v-spacer />
      <v-btn class="mr-2" to="/ScanQR-Product"
        >Scan QR for add-remove stock</v-btn>
    </v-row>
    <v-container>
      <v-row>
        <v-col md="7">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="search"
                label="Search order by date"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="date = parseDate(search)"
                v-on="on"
                solo
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col md="5" class="mt-2">
          <v-row>
          <v-col><v-btn @click="init" color="primary" >All List</v-btn></v-col>
          <v-col><v-btn @click="getStockIn" color="teal lighten-1" dark>Stock-in List</v-btn></v-col>
          <v-col><v-btn @click="getStockOut" color="deep-orange lighten-1" dark>Stock-out List</v-btn></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-card>
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
  data: (vm) => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    search: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    // menu: false,
    // modal: false,
    menu1: false,
    // search: "",
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
      { text: "Status", value: "status" },
      { text: "Remaining", value: "remain" },
      { text: "Employee", value: "emp_id" },
    ],
    stock: [],
  }),
  watch: {
    date() {
      this.search = this.formatDate(this.date);
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
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
    getStockIn() {
      db.collection("stock").where('status',"==",'in').onSnapshot((snapshotChange) => {
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
    getStockOut() {
      db.collection("stock").where('status',"==",'out').onSnapshot((snapshotChange) => {
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
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${year}/${month}/${day}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
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