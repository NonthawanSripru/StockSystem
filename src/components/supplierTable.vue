<template>
  <v-simple-table>
    <template v-slot:default>
      <!-- <thead>
        <tr>
          <th class="text-left">Supplier Name</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Email</th>
        </tr>
      </thead> -->
      <tbody>
        <tr v-for="item in suppliers" :key="item.sup_name">
          <td>{{ item.sup_name }}</td>
          <!-- <td>{{ item.phone }}</td> -->
          <td>{{ item.email }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import { db } from "../firebaseDb";
// import firebase from "firebase";

export default {
  data() {
    return {
      suppliers: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      db.collection("supplier").onSnapshot((snapshotChange) => {
        this.suppliers = [];
        snapshotChange.forEach((doc) => {
          this.suppliers.push({
            sup_id: doc.id,
            sup_name: doc.data().sup_name,
            phone: doc.data().phone,
            email: doc.data().email,
          });
        });
      });
    },
  },
};
</script>