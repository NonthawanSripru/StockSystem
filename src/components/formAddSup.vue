<template>
  <form>
    <v-container>
      <v-col>
        <v-row>
          <v-col md=12>
            <v-select
              v-model="select"
              :items="suppliers"
              label="Choose supplier"
              dense
            ></v-select>
          </v-col>
        </v-row>
        <v-row v-for="(item,index) in supplied" :key="index">
          <v-col md=7>
            <v-select
              v-model="item.product"
              :items="items"
              label="Choose product"
              dense
            ></v-select>
          </v-col>
          <!-- <v-col md=4>
            <v-text-field v-model="name" label="Price" dense></v-text-field>
          </v-col> -->
          <v-col md=4>
            <v-text-field v-model="item.amount" label="Amount" dense></v-text-field>
          </v-col>
          <v-col md=1 v-if="index===0">
            <v-btn icon @click="AddProduct"><v-icon>mdi-plus</v-icon></v-btn>
          </v-col>
          <v-col md=1 v-if="index!==0">
            <v-btn icon @click="RemoveProduct(item)"><v-icon>mdi-minus</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-btn class="mr-4" @click="submit" color="primary"> submit </v-btn>
      <v-btn @click="clear" color="grey" dark> clear </v-btn>
    </v-container>
  </form>
</template>
<script>
import { db } from "../firebaseDb";
export default {
  data: () => ({
    name: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    suppliers:[],
    supplied: [
        {
            product:"",
            amount:""
        }
    ],
    suppliedList:{
        product:"",
        amount:""
    }
  }),

  created(){
      this.init();
  },

  computed: {},

  methods: {
    init(){
        db.collection("supplier").onSnapshot((snapshotChange) => {
        this.suppliers = [];
        snapshotChange.forEach((doc) => {
          this.suppliers.push(doc.data().sup_name);
        });
      });
    },
    submit() {
      this.$v.$touch();
    },
    AddProduct(){
      this.supplied.push(this.suppliedList)
    },
    RemoveProduct(item){
      this.supplied.splice(this.supplied.indexOf(item),1)
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
    },
  },
};
</script>