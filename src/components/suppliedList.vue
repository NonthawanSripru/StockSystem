<template>
  <v-container>
    <v-card>
      <formSup />
    </v-card>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      dense
    ></v-text-field>
    <v-data-table
      class="mt-5"
      dense
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-container>
</template>
<script>
import formSup from "./formAddSup.vue"
export default {
  components:{
    formSup
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
        { text: "Price", value: "price" },
        { text: "Date", value: "date" },
        // { text: "Employee", value: "employee" },
      ],
      desserts: [
        {
          sup_name: "Mead Johnson Thailand",
          prod_name: "Frozen Yogurt",
          price: 720,
          amount: 24,
          date: "20/01/2022",
          employee: "1%",
        },
        {
          sup_name: "Pacific Intertrade",
          prod_name: "Ice cream sandwich",
          price: 740,
          amount: 37,
          date: "20/01/2022",
          employee: "1%",
        },
        {
          sup_name: "Pacific Intertrade",
          prod_name: "Eclair",
          price: 368,
          amount: 23,
          date: "20/01/2022",
          employee: "7%",
        },
        {
          sup_name: "Pacific Intertrade",
          prod_name: "Cupcake",
          price: 1675,
          amount: 67,
          date: "20/01/2022",
          employee: "8%",
        },
        {
          sup_name: "Pacific Intertrade",
          prod_name: "Gingerbread",
          price: 784,
          amount: 49,
          date: "21/01/2022",
          employee: "16%",
        },
        {
          sup_name: "Mead Johnson Thailand",
          prod_name: "Jelly bean",
          price: 940,
          amount: 94,
          date: "21/01/2022",
          employee: "0%",
        },
        {
          sup_name: "Mead Johnson Thailand",
          prod_name: "Lollipop",
          price: 196,
          amount: 98,
          date: "21/01/2022",
          employee: "2%",
        },
        {
          sup_name: "Pacific Intertrade",
          prod_name: "Honeycomb",
          price: 870,
          amount: 87,
          date: "21/01/2022",
          employee: "45%",
        },
        {
          sup_name: "Mead Johnson Thailand",
          prod_name: "Donut",
          price: 765,
          amount: 51,
          date: "21/01/2022",
          employee: "22%",
        },
        {
          sup_name: "Mead Johnson Thailand",
          prod_name: "KitKat",
          price: 1300,
          amount: 65,
          date: "21/01/2022",
          employee: "6%",
        },
      ],
    };
  },
};
</script>