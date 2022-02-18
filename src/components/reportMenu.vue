<template>
  <div>
    <v-container>
      <h1 class="mb-3">Report</h1>
      <v-row>
        <v-col md="2"><h3 class="mt-3 ml-5">Choose report : </h3></v-col>
        <v-col md="7">
        <v-select
          v-model="select"
          :items="reports"
          label="Choose report name"
          outlined
          solo
          @change="getReport"
        ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <report1 v-if="select=='Report 1 - order-analyse'"/>
    <report2 v-if="select=='Report 2 - stock-analysis'"/>
    <report3 v-if="select=='Report 3 - supplied-analysis'"/>
  </div>
</template>
<script>
import report1 from "./reportMenu1.vue"
import report2 from "./reportMenu2.vue"
import report3 from "./reportMenu3.vue"
export default {
  components:{report1,report2,report3},
  data() {
    return {
      select: "Report 1 - order-analyse",
      reports: [
        "Report 1 - order-analyse",
        "Report 2 - stock-analysis",
        "Report 3 - supplied-analysis",
      ],
    };
  },
  methods:{
    getReport(){
      console.log(this.select)
    }
  }
};
</script>