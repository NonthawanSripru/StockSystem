<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="pt-3 mb-3">Products</h1>
        <v-combobox
          class="mb-3"
          v-model="search"
          :items="select"
          label="Choose product category"
          outlined
          @change="getProduct"
        ></v-combobox>
      </div>
    </div>
    <div class="row">
      <div v-for="product in products" :key="product.prod_id" class="mx-8 mb-5">
        <ProductBox :product="product" :id="product.prod_id"> </ProductBox>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../firebaseDb";
import ProductBox from "../components/ProductBox";
export default {
  name: "Product",
  components: { ProductBox },
  //   props : [ "baseURL" , "products" ],
  data() {
    return {
      products: [],
      search: "",
      select: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      db.collection("product").onSnapshot((snapshotChange) => {
        this.products = [];
        snapshotChange.forEach((doc) => {
          this.products.push({
            prod_id: doc.id,
            prod_name: doc.data().prod_name,
            category: doc.data().category,
            detail: doc.data().detail,
            price: doc.data().price,
            // qrcode: doc.data().qrcode,
            notify: doc.data().notify,
            image: doc.data().image,
            remain: doc.data().remain,
          });
        });
      });

      db.collection("category").onSnapshot((snapshotChange) => {
        this.select = ["All Product"];
        snapshotChange.forEach((item) => {
          this.select.push(item.data().cate_name);
        });
      });
    },
    getProduct() {
      if (this.search != "All Product") {
        db.collection("product")
          .where("category", "==", this.search)
          .onSnapshot((snapshotChange) => {
            this.products = [];
            snapshotChange.forEach((doc) => {
              this.products.push({
                prod_id: doc.id,
                prod_name: doc.data().prod_name,
                category: doc.data().category,
                detail: doc.data().detail,
                price: doc.data().price,
                // qrcode: doc.data().qrcode,
                notify: doc.data().notify,
                image: doc.data().image,
                remain: doc.data().remain,
              });
            });
          });
      } else {
        this.initialize()
      }
    },
  },
  //   mounted(){
  //     if (this.$route.name=='AdminProduct' && !localStorage.getItem('token')) {
  //       this.$router.push({name : 'Signin'});
  //     }
  //   }
};
</script>

<style scoped>
h4 {
  font-family: "Roboto", sans-serif;
  color: #484848;
  font-weight: 700;
}

#add-product {
  float: right;
  font-weight: 500;
}
</style>
