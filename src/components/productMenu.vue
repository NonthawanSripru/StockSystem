<template>
  <v-container>
    <h2 class="text-left mb-5">Products</h2>
    <v-card class="mb-5">
      <v-toolbar dark color="teal">
        <v-toolbar-title>Search Product</v-toolbar-title>
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="Type product name ...."
          solo-inverted
        ></v-autocomplete>
      </v-toolbar>
    </v-card>
    <v-card class="mb-5">
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:item.image="{ item }"
          ><v-img :src="item.image" style="width: 200px; height: 150px"
        /></template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>My Products</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
                <v-btn color="warning" dark class="mb-2 mr-2">
                  Manage Category
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="16" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Dessert name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="16" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.calories"
                          label="Calories"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="16" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.fat"
                          label="Fat (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="16" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.carbs"
                          label="Carbs (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="16" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.qrcode"
                          label="qrcode (g)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Product Image", value: "image" },
      { text: "Product ID", value: "prod_id" },
      {
        text: "Product Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Category", value: "calories" },
      { text: "Detail", value: "fat" },
      { text: "Price", value: "carbs" },
      { text: "Qr Code", value: "qrcode" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      qrcode: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      qrcode: 0,
    },
    loading: false,
    items: [],
    search: null,
    select: null,
    states: [
      "Alabama",
      "Alaska",
      "American Samoa",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District of Columbia",
      "Frozen Yogurt",
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          image: "https://kemps.com/wp-content/uploads/2017/10/RS2157_FroYo-FF_NSA_Vanilla_010617-scr-800x553.jpg",
          prod_id: "P001",
          name: "Frozen Yogurt",
          calories: "Snack",
          fat: 6.0,
          carbs: 24,
          qrcode: "",
        },
        {
          image: "https://assets.epicurious.com/photos/60ad380c0e303494c8490c18/4:3/w_3884,h_2913,c_limit/IceCreamSandwich_HERO_RECIPE_052021_16458.jpg",
          prod_id: "P002",
          name: "Ice cream sandwich",
          calories: "Snack",
          fat: 9.0,
          carbs: 37,
          qrcode: "",
        },
        {
          image: "https://www.seriouseats.com/thmb/lc2yYRB99hofO3_AUt6VfLLsQnk=/1500x1125/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__12__20201210-choux-eclairs-vicky-wasik-16-acf615b81c2f4217857bbf80d60c28c1.jpg",
          prod_id: "P003",
          name: "Eclair",
          calories: "Snack",
          fat: 16.0,
          carbs: 23,
          qrcode: "",
        },
        {
          image: "https://hips.hearstapps.com/delish/assets/18/07/1518475314-vanilla-cupcake-horizontal-.jpg",
          prod_id: "P004",
          name: "Cupcake",
          calories: "Snack",
          fat: 3.7,
          carbs: 67,
          qrcode: "",
        },
        {
          image: "https://www.onceuponachef.com/images/2016/12/Gingerbread-Men-2-1200x871.jpg",
          prod_id: "P005",
          name: "Gingerbread",
          calories: "Snack",
          fat: 16.0,
          carbs: 49,
          qrcode: "",
        },
        {
          image: "https://cf.shopee.co.th/file/3d4fe01073bf715f19f0cf0e62617974",
          prod_id: "P006",
          name: "Jelly bean",
          calories: "Snack",
          fat: 0.0,
          carbs: 94,
          qrcode: "",
        },
        {
          image: "https://cdn.webshopapp.com/shops/263312/files/322169664/1500x4000x3/jolly-rancher-lollipop-1-piece-assorted.jpg",
          prod_id: "P007",
          name: "Lollipop",
          calories: "Snack",
          fat: 0.2,
          carbs: 98,
          qrcode: "",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
  },
};
</script>