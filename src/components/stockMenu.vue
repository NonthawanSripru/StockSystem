<template>
  <v-container>
    <v-row class="mx-2">
    <h2 class="text-left mb-5">Product Stock</h2>
    <v-spacer/>
    <v-btn class="mr-2" color="primary">Add Stock</v-btn>
    <v-btn color="error">Remove Stock</v-btn>
    </v-row>
    <v-card class="mb-5 mt-3">
      <v-container>
        <v-menu
          v-model="menu2"
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
          <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
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
        :items="desserts"
        :search="search"
        class="mr-5 ml-5"
      ></v-data-table>
    </v-card>
  </v-container>
</template>
<script>
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
        { text: "Product ID", value: "prod_id" },
        { text: "Product Name", value: "prod_name" },
        { text: "Date", value: "date" },
        { text: "Status", value: "status" },
        { text: "Amount", value: "amount" },
        { text: "Remaining", value: "remain" },
        { text: "Employee ID", value: "emp_id" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          prod_id: 159,
          prod_name: 6.0,
          status: 24,
          amount: 4.0,
          remain: "1%",
        },
        {
          name: "Ice cream sandwich",
          prod_id: 237,
          prod_name: 9.0,
          status: 37,
          amount: 4.3,
          remain: "1%",
        },
        {
          name: "Eclair",
          prod_id: 262,
          prod_name: 16.0,
          status: 23,
          amount: 6.0,
          remain: "7%",
        },
        {
          name: "Cupcake",
          prod_id: 305,
          prod_name: 3.7,
          status: 67,
          amount: 4.3,
          remain: "8%",
        },
        {
          name: "Gingerbread",
          prod_id: 356,
          prod_name: 16.0,
          status: 49,
          amount: 3.9,
          remain: "16%",
        },
        {
          name: "Jelly bean",
          prod_id: 375,
          prod_name: 0.0,
          status: 94,
          amount: 0.0,
          remain: "0%",
        },
        {
          name: "Lollipop",
          prod_id: 392,
          prod_name: 0.2,
          status: 98,
          amount: 0,
          remain: "2%",
        },
        {
          name: "Honeycomb",
          prod_id: 408,
          prod_name: 3.2,
          status: 87,
          amount: 6.5,
          remain: "45%",
        },
        {
          name: "Donut",
          prod_id: 452,
          prod_name: 25.0,
          status: 51,
          amount: 4.9,
          remain: "22%",
        },
        {
          name: "KitKat",
          prod_id: 518,
          prod_name: 26.0,
          status: 65,
          amount: 7,
          remain: "6%",
        },
      ],
    };
  },
};
</script>