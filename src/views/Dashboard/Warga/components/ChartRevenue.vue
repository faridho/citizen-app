<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Perbandingan Penghasilan</h4>
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
          .get(URL + '/dashboard/agechart')
          .then(response => response.data.data);
       
        const bottom = result.filter(data => data.penghasilan > 0 && data.penghasilan <= 5000000);
        const bottomLength = bottom.length;

        const midle = result.filter(data => data.penghasilan > 5000000 && data.age <= 10000000);
        const midleLength = midle.length;

        const top = result.filter(data => data.penghasilan > 10000000);
        const topLength = top.length;
        
        this.series = [
          bottomLength, midleLength, topLength
        ];
        this.chartOptions = {
          labels: ['0 - 5 Jt', '5 - 10 Jt', '> 10 Jt'],
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
