<template>
  <v-container>
    <!-- <h2 class="text-left mb-5">Products</h2> -->
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
        sort-by="category"
        class="elevation-1"
      >
        <template v-slot:item.prod_id="{ item }">
          <p class="mt-3" style="width: 100px">{{ item.prod_id }}</p>
        </template>

        <template v-slot:item.image="{ item }"
          ><v-img :src="item.image" style="width: 200px; height: 150px"
        /></template>

        <template v-slot:item.detail="{ item }">
          <p class="mt-3" style="width: 150px">{{ item.detail }}</p>
        </template>
        <template v-slot:item.qrcode="{ item }">
          <qr-code :text="item.prod_name" :size="100"></qr-code>
          <!-- <qr-code :text="JSON.stringify(item.prod_name)" :size="100"></qr-code> -->
        </template>

        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>My Products</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogCate" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="warning"
                  dark
                  class="mb-2 mr-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Manage Category
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Manage Product's Category</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="16" sm="6" md="3">
                        <h3 class="mt-5">Add New Category</h3>
                      </v-col>
                      <v-col cols="16" sm="6" md="4">
                        <v-text-field
                          v-model="category.cate_id"
                          label="Category ID"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="16" sm="6" md="4">
                        <v-text-field
                          v-model="category.cate_name"
                          label="Category Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="16" sm="6" md="1">
                        <v-icon
                          class="mt-5"
                          color="blue darken-1"
                          @click="addCate"
                        >
                          mdi-plus-circle
                        </v-icon>
                      </v-col>
                    </v-row>
                    <v-data-table
                      :headers="cheaders"
                      :items="categories"
                      class="elevation-1"
                    >
                      <template v-slot:item.actions="{ item }">
                        <v-icon small @click="deleteCate(item)">
                          mdi-delete
                        </v-icon>
                      </template>
                    </v-data-table>
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

            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Product
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="16" sm="6" md="7">
                        <v-text-field
                          outlined
                          dense
                          v-model="editedItem.prod_name"
                          label="Product name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="16" sm="6" md="5">
                        <v-autocomplete
                          v-model="editedItem.category"
                          :items="categoryName"
                          class="mx-4"
                          flat
                          dense
                          outlined
                          hide-no-data
                          hide-details
                          label="Choose category"
                          solo-inverted
                          @click="showCate"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="16" sm="6" md="12">
                        <v-text-field
                          outlined
                          dense
                          v-model="editedItem.detail"
                          label="Product Details"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="16" sm="6" md="4">
                        <v-text-field
                          outlined
                          dense
                          v-model="editedItem.price"
                          label="Unit Price (baht)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="16" sm="6" md="8">
                        <v-text-field
                          outlined
                          dense
                          v-model="editedItem.remain"
                          label="Qualtity"
                        ></v-text-field>
                      </v-col>
                      <v-row>
                        <v-col md="3">
                          <v-btn @click="click1">choose a photo</v-btn>
                          <input
                            type="file"
                            ref="input1"
                            style="display: none"
                            @change="previewImage"
                            accept="image/*"
                          />
                        </v-col>
                        <v-col md="6">
                          <img
                            class="preview"
                            height="250"
                            width="300"
                            :src="editedItem.image"
                          />
                        </v-col>
                      </v-row>
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
import { db } from "../firebaseDb";
import firebase from "firebase";

export default {
  // components:{
  //   QrcodeVue,
  // },
  data: () => ({
    // img1: null,
    dialog: false,
    dialogCate: false,
    dialogDelete: false,
    headers: [
      { text: "Product Image", value: "image", sortable: false },
      // { text: "Product ID", value: "prod_id", sortable: false },
      {
        text: "Product Name",
        align: "start",
        value: "prod_name",
      },
      { text: "Category", value: "category" },
      { text: "Detail", value: "detail" },
      { text: "Price", value: "price" },
      { text: "Remain", value: "remain" },
      { text: "Qr Code", value: "qrcode", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    cheaders: [
      { text: "Category ID", value: "cate_id", sortable: false },
      { text: "Category Name", value: "cate_name", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    categories: [],
    categoryName: [],
    Qrcode: [],
    category: {
      cate_id: null,
      cate_name: "",
    },
    editedIndex: -1,
    editedItem: {
      prod_name: "",
      category: "",
      detail: "",
      price: 0,
      remain: 0,
      image: "",
    },
    defaultItem: {
      prod_name: "",
      category: "",
      detail: "",
      price: 0,
      remain: 0,
      image: "",
    },
    loading: false,
    items: [],
    search: null,
    select: null,
    states: ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas"],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "New Product"
        : "Edit Product Information";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogCate(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogDeleteCate(val) {
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
    showCate() {
      console.log(this.categories);
    },
    initialize() {
      db.collection("product").onSnapshot((snapshotChange) => {
        this.desserts = [];
        snapshotChange.forEach((doc) => {
          this.desserts.push({
            prod_id: doc.id,
            prod_name: doc.data().prod_name,
            category: doc.data().category,
            detail: doc.data().detail,
            price: doc.data().price,
            qrcode: doc.data().qrcode,
            image: doc.data().image,
            remain: doc.data().remain,
          });
          this.Qrcode.push({
            prod_id: doc.id,
            prod_name: doc.data().prod_name,
          });
        });
      });
      db.collection("category").onSnapshot((snapshotChange) => {
        this.categories = [];
        snapshotChange.forEach((item) => {
          this.categories.push({
            id: item.id,
            cate_id: item.data().cate_id,
            cate_name: item.data().cate_name,
          });
        });
      });
      db.collection("category").onSnapshot((snapshotChange) => {
        this.categoryName = [];
        snapshotChange.forEach((item) => {
          this.categoryName.push(item.data().cate_name);
        });
      });
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
    // deleteCate(item) {
    //   this.categories = Object.assign({}, item);
    //   this.dialogDeleteCate = true;
    // },

    deleteItemConfirm() {
      // this.desserts.splice(this.editedIndex, 1);
      db.collection("product")
        .doc(this.editedItem.prod_id)
        .delete()
        .then(() => {
          alert("Product deleted!");
        })
        .catch((error) => {
          console.error(error);
        });
      this.closeDelete();
    },

    deleteCate(item) {
      db.collection("category")
        .doc(item.id)
        .delete()
        .then(() => {
          alert("Category deleted!");
        })
        .catch((error) => {
          console.error(error);
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.dialogCate = false;
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

    addCate() {
      db.collection("category")
        .add(this.category)
        .then(() => {
          this.category.id = "";
          this.category.cate_name = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        db.collection("product")
          .doc(this.editedItem.prod_id)
          .update(this.editedItem)
          .then(() => {
            alert("Product successfully updated!");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // this.editedItem
        db.collection("product")
          .add(this.editedItem)
          .then(() => {
            alert("Product successfully added!");
            this.editedItem.prod_name = "";
            this.editedItem.category = "";
            this.editedItem.detail = "";
            this.editedItem.price = "";
            this.editedItem.image = "";
            this.editedItem.qrcode = JSON.stringify(this.editedItem);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.close();
    },

    click1() {
      this.$refs.input1.click();
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.editedItem.image = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },

    onUpload() {
      this.editedItem.image = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.editedItem.image = url;
          });
        }
      );
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