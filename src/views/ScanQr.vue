<template>
  <div id="app">
    <table>
      <tr>
        <span class="table-title"><b>Scan product for stock</b></span>
        <br />
        <span class="table-desc"
          >User: <span class="vue-font">admin@mail.com</span>
        </span>
      </tr>
    </table>
    <hr />
    <div class="row mb-15">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Product stock lists</div>
          <div class="main-block mt-3">
            <h1>Stock Form</h1>
            <form>
              <div>
                <input
                  class="fname"
                  type="text"
                  name="prod_id"
                  placeholder="Product ID"
                  id="prod_id"
                  value=""
                />
                <input
                  class="fname"
                  type="text"
                  name="prod_name"
                  placeholder="Product Name"
                  id="prod_name"
                  value=""
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  id="amount"
                  value=""
                  class="mr-12"
                />
                <input
                  type="number"
                  name="remaining"
                  placeholder="Remaining"
                  id="remaining"
                  value=""
                />
              </div>
              <h4 class="mt-3">Status</h4>
              <div class="status">
                <div>
                  <input type="radio" value="in" id="radioOne" name="status" />
                  <label for="radioOne" class="radio">Stock-in</label>
                </div>
                <div>
                  <input type="radio" value="out" id="radioTwo" name="status" />
                  <label for="radioTwo" class="radio">Stock-out</label>
                </div>
              </div>
              <button class="button" @click.prevent="addStock()">Submit</button>
            </form>
          </div>
          <!-- <div class="card-body">
            <table class="table table-responsive-sm table-bordered">
              <thead>
                <tr>
                  <th scope="col">Stock ID</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Remaining</th>
                  <th scope="col">Created at</th>
                  <th scope="col">Employee</th>
                  <th scope="col">Del</th>
                </tr>
              </thead>
              <tbody v-for="user in stock" :key="user.id">
                <tr>
                  <td>{{ user.id }}</td>
                  <td>{{ user.prod_name }}</td>
                  <th scope="row">{{ user.status }}</th>
                  <td>{{ user.amount }}</td>
                  <td>{{ user.remaining }}</td>
                  <td>{{ user.date }}</td>
                  <td>{{ user.employee }}</td>
                  <td>
                    <a href="#" @click.prevent="deleteUser(index)">x</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> -->
        </div>
      </div>
      <div class="col-md-4 mt-15">
        <div class="card" style="width: 18rem">
          <qrcode-stream @decode="onDecode" @init="onInit" />
          <div class="card-body">
            <p class="card-text">
              Please scan the qrcode of product for registed product to stock
            </p>
            <hr />
            <div class="alert" :class="alert" role="alert">
              {{ status }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { db } from "../firebaseDb";

export default {
  name: "app",
  data() {
    return {
      dialog: false,
      stock: [],
      // stock_fields: {
      //   No: "id",
      //   "ID prod_nameister": "prod_name",
      //   "Created at": "date",
      // },
      error: "",
      alert: "",
      productId: "",
      productStock: "",
      status: "Camera ready!",
      remain: "",
      product: {
        prod_id: "",
        prod_name: "",
        category: "",
        detail: "",
        price: "",
        remain: "",
        image: "",
        notify:""
      },
    };
  },
  components: { QrcodeStream },
  created() {
    this.init();
  },
  methods: {
    init() {
      db.collection("stock").onSnapshot((snapshotChange) => {
        this.stock = [];
        snapshotChange.forEach((doc) => {
          this.stock.push({
            id: doc.id,
            prod_name: doc.data().prod_name,
            status: doc.data().status,
            amount: doc.data().amount,
            remaining: doc.data().remaining,
            date: doc.data().date,
            employee: doc.data().employee,
          });
        });
      });
    },
    deleteUser(index) {
      this.stock.splice(index, 1);
    },
    async onDecode(result) {
      /* eslint-disable */
      // var productId="";

      db.collection("product")
        .where("prod_name", "==", result)
        .onSnapshot((snapshotChange) => {
          this.product = {};
          snapshotChange.forEach((doc) => {
            this.productId = doc.id;
            this.productStock = doc.data().remain;
            document.getElementById("prod_id").value = this.productId;
            document.getElementById("remaining").value = this.productStock;
            this.product.prod_id = doc.id;
            this.product.prod_name = doc.data().prod_name;
            this.product.category = doc.data().category;
            this.product.detail = doc.data().detail;
            this.product.price = doc.data().price;
            this.product.image = doc.data().image;
            this.product.remain = doc.data().remain;
            this.product.notify = doc.data().notify;
          });
        });

      // this.stock.push({
      //   prod_name: result,
      //   date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
      // });

      document.getElementById("prod_name").value = result;

      this.status = "Success re-prod_nameistration!";
      setTimeout(() => {
        (this.status = "Camera ready!"), (this.alert = "alert-warning");
      }, 3000);
    },

    async addStock() {
      // var ex1 = document.getElementById("radioOne");
      // var ex2 = document.getElementById("radioTwo");

      if (
        document.querySelector('input[name="status"]:checked').value == "in"
      ) {
        this.addS();
      } else {
        this.removeS();
      }

      var obj = {};
      (obj["prod_id"] = document.getElementById("prod_id").value),
        (obj["prod_name"] = document.getElementById("prod_name").value),
        ((obj["status"] = document.querySelector(
          'input[name="status"]:checked'
        ).value),
        (obj["amount"] = document.getElementById("amount").value),
        (obj["remaining"] = this.remain),
        (obj["date"] = new Date().toJSON().slice(0, 10).replace(/-/g, "/")),
        (obj["employee"] = "admin"));
      // console.log(obj);

      this.product.remain = this.remain;

      db.collection("stock")
        .add(obj)
        .then(() => {
          alert("Stock successfully updated!");
          document.getElementById("prod_id").value = "";
          document.getElementById("prod_name").value = "";
          document.getElementByTagName("status").value = "";
          document.getElementById("amount").value = "";
          document.getElementById("remaining").value = "";
        })
        .catch((error) => {
          console.log(error);
        });

      db.collection("product")
        .doc(this.product.prod_id)
        .update(this.product)
        .then(() => {
          // alert("Product successfully updated!");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addS() {
      this.remain =
        parseInt(document.getElementById("amount").value) +
        parseInt(this.productStock);
    },
    removeS() {
      this.remain =
        parseInt(this.productStock) -
        parseInt(document.getElementById("amount").value);
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.alert = "alert-danger";
          this.status = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.alert = "alert-danger";
          this.status = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.alert = "alert-danger";
          this.status = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.alert = "alert-danger";
          this.status = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.alert = "alert-danger";
          this.status = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.alert = "alert-danger";
          this.status = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
  },
};
</script>

<style scoped>
#app {
  color: #404040;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 40px;
  margin-left: 60px;
  margin-right: 60px;
}

.table-title {
  font-size: 23px;
  color: #404040;
}

.table-desc {
  font-size: 17px;
}

.vue-font {
  color: green;
  font-weight: bold;
}

html,
body {
  height: 100%;
}
body,
input,
select {
  padding: 0;
  margin-left: 2;
  outline: none;
  font-family: Roboto, Arial, sans-serif;
  font-size: 16px;
  color: #095484;
}
h1,
h3 {
  font-weight: 400;
}
h1 {
  font-size: 32px;
}
h3 {
  color: #1c87c9;
}
.main-block,
.info {
  display: flex;
  flex-direction: column;
}
.main-block {
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background: url("/uploads/media/default/0001/01/e7a97bd9b2d25886cc7b9115de83b6b28b73b90b.jpeg")
    no-repeat center;
  background-size: cover;
}
form {
  width: 80%;
  padding: 25px;
  margin-bottom: 20px;
  background: wheat;
}
input,
select {
  padding: 5px;
  margin-bottom: 20px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #095484;
}
input::placeholder {
  color: #095484;
}
option {
  background: #eee;
  border: none;
}
.status {
  display: flex;
}
input[type="radio"] {
  display: none;
}
label.radio {
  position: relative;
  display: inline-grid;
  margin-right: 20px;
  text-indent: 25px;
  cursor: pointer;
}
label.radio:before {
  content: "";
  position: absolute;
  top: 4px;
  left: 0;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 2px solid #1c87c9;
}
label.radio:after {
  content: "";
  position: absolute;
  width: 8px;
  height: 4px;
  top: 5px;
  left: 5px;
  border-bottom: 3px solid #1c87c9;
  border-left: 3px solid #1c87c9;
  transform: rotate(-45deg);
  opacity: 0;
}
input[type="radio"]:checked + label:after {
  opacity: 1;
}
button {
  display: block;
  width: 200px;
  padding: 10px;
  margin: 20px auto 0;
  border: none;
  border-radius: 5px;
  background: #1c87c9;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}
button:hover {
  background: #095484;
}
@media (min-width: 568px) {
  .info {
    flex-flow: row wrap;
    justify-content: space-between;
  }
  input {
    width: 46%;
  }
  input.fname {
    width: 100%;
  }
  select {
    width: 48%;
  }
}
</style>
