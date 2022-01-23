<template>
  <v-container>
    <v-row class="mb-3">
      <v-col md="5">
        <v-card height="600px">
          <v-container>
              <h2 class="mb-5 text-left">Supplier name</h2>
            <supTable />
          </v-container>
        </v-card>
      </v-col>
      <v-col md="7">
        <v-card height="100%">
            <v-container>
                <h2>Supplied List</h2>
            </v-container>
          <supList />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import supTable from "./supplierTable.vue";
import supList from "./suppliedList.vue";

export default {
  components: {
    supTable,
    supList,
  },
  data: () => ({}),
};
</script>