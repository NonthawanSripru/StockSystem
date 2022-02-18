<template>
  <v-container>
    <v-card flat>
      <formSup />
    </v-card>
    <v-text-field
      class="mx-3"
      v-model="search"
      append-icon="mdi-magnify"
      label="Search with supplier name or date"
      single-line
      hide-details
      dense
    ></v-text-field>
    <v-data-table
      class="mt-7"
      dense
      :headers="headers"
      :items="suppliedList"
      :search="search"
    >
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
    </v-data-table>

    <!-- <v-simple-table height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Supplier Name</th>
            <th class="text-left">Product Name</th>
            <th class="text-left">Amount</th>
            <th class="text-left">Date</th>
            <th class="text-left">Employee</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in suppliedList" :key="item.sup_id">
            <td>{{ item.sup_name }}</td>
            <td>
              <tr v-for="(xitem, index) in item.prod_name" :key="index">
                <p>
                  {{ xitem.product }}
                </p>
              </tr>
            </td>
            <td>
              <tr v-for="(xitem, index) in item.prod_name" :key="index">
                <p>
                  {{ xitem.amount }}
                </p>
              </tr>
            </td>
            <td>{{ item.date }}</td>
            <td>{{ item.employee }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table> -->
  </v-container>
</template>
<script>
import formSup from "./formAddSup.vue";
import { db } from "../firebaseDb";

export default {
  components: {
    formSup,
  },
  data() {
    return {
      search: "",
      headers: [
        // {
        //   text: "Suplier ID",
        //   align: "start",
        //   value: "sup_id",
        // },
        { text: "Supplier Name", value: "sup_name" },
        { text: "Product Name", value: "prod_name" },
        { text: "Amount", value: "amount" },
        { text: "Date", value: "date" },
        { text: "Employee", value: "employee" },
      ],
      suppliedList: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      db.collection("suppliedList").onSnapshot((snapshotChange) => {
        this.suppliedList = [];
        snapshotChange.forEach((doc) => {
          this.suppliedList.push({
            sup_id: doc.id,
            sup_name: doc.data().sup_name,
            prod_name: doc.data().prod_name,
            price: doc.data().price,
            amount: doc.data().amount,
            date: doc.data().date,
            employee: doc.data().employee,
          });
        });
      });
      // console.log(this.suppliedList)
    },
  },
};
</script>