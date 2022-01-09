<template>
  <v-container>
    <h2 class="text-left">My Stock</h2>
    <v-card class="ml-3 mr-3 mt-5 mb-10">
      <v-row class="white">
        <v-col>
          <v-card class="flex-sm-wrap" color="success" dark>
            <h3 class="mx-3 pt-2 text-left">Stock In</h3>
            <h1 class="mx-3 text-right">54</h1>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="flex-sm-wrap" color="error" dark>
            <h3 class="mx-3 pt-2 text-left">Stock Out</h3>
            <h1 class="mx-3 text-right">173</h1>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="flex-sm-wrap" color="warning" dark>
            <h3 class="mx-3 pt-2 text-left">Total Order</h3>
            <h1 class="mx-3 text-right">67</h1>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
        <template v-slot:item.calories="{ item }">
          <v-chip :color="getColor(item.calories)" dark>
            {{ item.calories }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        { text: "SID", value: "iron" },
        { text: "Product ID", value: "fat" },
        {
          text: "Product Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Stock", value: "carbs" },
        { text: "Amount", value: "amount" },
        { text: "Employee Name", value: "protein" },
        { text: "Status", value: "calories" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: "ready for sale",
          fat: "P001",
          carbs: "In",
          amount: 100,
          protein: "John Leider",
          iron: "1",
        },
        {
          name: "Ice cream sandwich",
          calories: "ready for sale",
          fat: "P002",
          carbs: "Out",
          amount: 80,
          protein: "John Leider",
          iron: "2",
        },
        {
          name: "Eclair",
          calories: "ready for sale",
          fat: "P003",
          carbs: "In",
          amount: 100,
          protein: "Somsak S.",
          iron: "3",
        },
        {
          name: "Cupcake",
          calories: "out of stock",
          fat: "P004",
          carbs: "In",
          amount: 100,
          protein: "Saengdao S.",
          iron: "4",
        },
        {
          name: "Gingerbread",
          calories: "out of stock",
          fat: "P005",
          carbs: "Out",
          amount: 70,
          protein: "Somsak S.",
          iron: "5",
        },
        {
          name: "Jelly bean",
          calories: "ready for sale",
          fat: "P007",
          carbs: "Out",
          amount: 32,
          protein: "John Leider",
          iron: "6",
        },
        {
          name: "Lollipop",
          calories: "ready for sale",
          fat: "P008",
          carbs: "In",
          amount: 50,
          protein: "Somsak S.",
          iron: "7",
        },
        {
          name: "Honeycomb",
          calories: "out of stock",
          fat: "P006",
          carbs:"Out",
          amount: 12,
          protein: "Emma W.",
          iron: "8",
        },
        {
          name: "Donut",
          calories: "ready for sale",
          fat: "P009",
          carbs: "In",
          amount: 100,
          protein: "John Leider",
          iron: "9",
        },
        {
          name: "KitKat",
          calories: "out of stock",
          fat: "P010",
          carbs: "Out",
          amount: 43,
          protein: "John W.",
          iron: "10",
        },
      ],
    };
  },
  methods: {
    getColor(calories) {
      if (calories === "out of stock") return "red";
      else if (calories > 200) return "orange";
      else return "green";
    },
  },
};
</script>