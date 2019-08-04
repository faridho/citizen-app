<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Perbandingan Usia</h4>
      </v-card-title>
      <v-card-text text-lg-center>
        <ApexCharts type=pie width=380 :options="chartOptions" :series="series" />
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
  import axios from 'axios'
  import URL from '@/api/url'
  import ApexCharts from 'vue-apexcharts';

  export default {
    data() {
      return {
        series: [],
        chartOptions: {}
      }
    },

    mounted() {
      this.getData();
    },

    methods: {
      async getData() {
        const result = await axios
          .get(URL + '/dashboard/agecharttemp')
          .then(response => response.data.data);
       
        const teenage = result.filter(data => data.age > 0 && data.age <= 17);
        const teenageLength = teenage.length;

        const mature = result.filter(data => data.age > 17 && data.age <= 40);
        const matureLength = mature.length;

        const old = result.filter(data => data.age > 40);
        const oldLength = old.length;
        
        this.series = [
          teenageLength, matureLength, oldLength
        ];
        this.chartOptions = {
          labels: ['0 - 17', '18 - 40', '> 41'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      },
    },

    components: {
      ApexCharts
    }
  }
</script>
