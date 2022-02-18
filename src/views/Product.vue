<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="pt-3 mb-3">Products</h1>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <template v-slot:prev="{ on, attrs }">
            <v-btn color="success" v-bind="attrs" v-on="on"
              >Previous slide</v-btn
            >
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn color="info" v-bind="attrs" v-on="on">Next slide</v-btn>
          </template>
          <v-carousel-item v-for="(slide, i) in pic" :key="i">
            <v-img :src="slide"></v-img>
          </v-carousel-item>
        </v-carousel>
        <v-divider inset></v-divider>
        <v-combobox
          class="mt-5"
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
      pic: [
        'https://p-a-t.com/wp-content/uploads/2016/10/snack-and-bakery-banner.jpg',
        'https://promotions.fieldstonebakery.com/wp-content/uploads/2021/05/FSB-Smart-Snack-Web-Banner-210521-1B.jpg',
        'https://img.freepik.com/free-vector/flat-design-food-banner-template_23-2149076251.jpg?w=2000',
        'https://snacatac.in/wp-content/uploads/2021/10/Banner-Cornedo-1.jpg',
        'https://img.freepik.com/free-vector/cookies-banner-template_23-2148774300.jpg?t=st=1645192177~exp=1645192777~hmac=da088fb7befc0046fe3ff96305819f56d6528a6013f6b1d6fe8aefe7d3b35bac&w=1800'
        
      ],
      colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
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
        this.initialize();
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
