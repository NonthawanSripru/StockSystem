<template>
  <v-container>
    <h2 class="text-left">My Stock</h2>
    <v-card class="ml-3 mr-3 mt-5 mb-10">
      <v-row class="white">
        <v-col>
          <v-card class="flex-sm-wrap" color="success" dark>
            <h3 class="mx-3 pt-2 text-left">Stock In</h3>
            <h1 class="mx-3 text-right">{{stockIn}}</h1>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="flex-sm-wrap" color="error" dark>
            <h3 class="mx-3 pt-2 text-left">Stock Out</h3>
            <h1 class="mx-3 text-right">{{stockOut}}</h1>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="flex-sm-wrap" color="warning" dark>
            <h3 class="mx-3 pt-2 text-left">Total Order</h3>
            <h1 class="mx-3 text-right">{{order}}</h1>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-data-table :headers="headers" :items="stock" class="elevation-1">
        <!-- <template v-slot:item.remain="{ item }">
          <v-chip :color="getColor(item.remain)" dark>
            {{ item.remain }}
          </v-chip>
        </template> -->
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
        { text: "Status", value: "status" },
        { text: "Amount", value: "amount" },
        { text: "Remaining", value: "remain" },
        // { text: "Employee", value: "emp_id" },
      ],
      stock: [],
      stockIn:0,
      stockOut:0,
      order:0
    };
  },
  methods:{
    getColor(val) {
      if (val == 0) return "red";
      else return "green";
    },
    getStatusColor(val) {
      if (val == "out") return "red";
      else return "green";
    },
    init(){
      var today = new Date();
      var date = today.toJSON().slice(0, 10).replace(/-/g, "/")
      console.log(date)

      db.collection("stock").where('date',"==", date).onSnapshot((snapshotChange) => {
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
          if(doc.data().status=="in"){
            this.stockIn= this.stockIn + 1
          }else{
            this.stockOut= this.stockOut + 1
          }
        });
      });

      db.collection("order").onSnapshot((snapshotChange) => {
        snapshotChange.forEach((doc) => {
          if(doc.data().date==today.toLocaleDateString()){
            this.order= this.order + 1
          }
        });
      });

    }
  },
  mounted(){
    this.init();
  }
};
</script>