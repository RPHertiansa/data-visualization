<template>
  <q-page class="text-center q-pa-md">
    <div class="row items-center text-center justify-center">
      <div class="col-2">
        <q-select
          v-model="filteredStore"
          option-value="store_id"
          option-label="store_name"
          :options="storeOptions"
          label="Select Area"
          map-options
          dense
          outlined
        />
      </div>
      <div class="col-2">
        <q-btn push color="light" outline :label="dateLabel">
          <q-popup-proxy>
            <q-date v-model="filterDate" mask="YYYY-MM-DD" range />
          </q-popup-proxy>
        </q-btn>
      </div>
    </div>
    <div class="row items-center text-center">
      <div class="col-4"></div>
      <div class="row">
        <Bar
          :chart-options="chartOptions"
          :chart-data="chartData"
          :width="400"
          :height="400"
        />
      </div>

    </div>
    <div class="row items-center text-center justify-center">
      <div class="col-4">
        <q-table
          title="Treats"
          :rows="rawProduct"
          :columns="columns"
          dense
          row-key="product_id"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";
import data from "src/service/data";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "App",
  components: { Bar },
  data() {
    return {
      chartOptions: {
        responsive: true
      },
      dataStore: [],
      storeName: "",
      date: "",
      columns: [
        { name: "store_id", align: "center", label: "Store Id", field: "store_id", sortable: true },
        { name: "compliance", label: "Compliance", field: "compliance", sortable: true },
      ]
    };
  },
  computed: {
    chartData() {
      return {
        labels: this.dataStore,
        datasets: [{
          label: "Nilai", data: this.dataProduct
        }]
      };
    },
    rawStore() {
      return data.store;
    },
    rawProduct() {
      return data.product;
    },
    dataProduct() {
      console.log(this.processData(data.product));
      return this.processData(data.product);
    },
    storeOptions() {
      return [{ store_id: 0, store_name: "All" }, ...this.rawStore];
    },
    filteredStore: {
      get() {
        return this.storeName;
      },
      set(value) {
        this.storeName = value;
        this.getStore(this.rawStore, value.store_id);

      }
    },
    filterDate: {
      get() {
        return this.date;
      },
      set(value) {
        this.date = value;

      }
    },
    dateLabel() {
      if (this.date !== "") {
        return `${this.date.from} - ${this.date.to}`;
      } else {
        return "Select Date";
      }
    }
  },
  mounted() {
    this.filteredStore = { store_id: 0, store_name: "All Store" };
    this.getStore(this.rawStore, 0);
  },
  methods: {
    getStore(data, storeName) {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (storeName !== 0) {
          if (data[i].store_id === storeName) {
            arr.push(data[i].store_name);
          }
        } else {
          arr.push(data[i].store_name);
        }
      }
      this.dataStore = arr;
    },

    processData(data) {
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];
      let arr6 = [];
      let arr7 = [];
      let arr8 = [];
      let arr9 = [];
      let arr10 = [];

      for (let i = 0; i < data.length; i++) {
        switch (data[i].store_id) {
          case 1:
            arr1.push(data[i].compliance);
            break;
          case 2:
            arr2.push(data[i].compliance);
            break;
          case 3:
            arr3.push(data[i].compliance);
            break;
          case 4:
            arr4.push(data[i].compliance);
            break;
          case 5:
            arr5.push(data[i].compliance);
            break;
          case 6:
            arr6.push(data[i].compliance);
            break;
          case 7:
            arr7.push(data[i].compliance);
            break;
          case 8:
            arr8.push(data[i].compliance);
            break;
          case 9:
            arr9.push(data[i].compliance);
            break;
          case 10:
            arr10.push(data[i].compliance);
            break;
        }
      }
      let totalArr = [arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10];
      let newArr = [];
      for (let i = 0; i < totalArr.length; i++) {
        if (totalArr[i].length > 0) {
          let num = totalArr[i].reduce((accumulator, currentValue) => accumulator + currentValue);
          num = num / data.length * 100;
          newArr.push(num);
        } else {
          newArr.push(0);
        }
      }
      return newArr;
    }
  },
};
</script>
