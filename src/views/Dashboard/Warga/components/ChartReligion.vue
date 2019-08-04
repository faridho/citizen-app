<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Perbandingan Agama</h4>
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
          .get(URL + '/dashboard/religionchart')
          .then(response => response.data.data);
        
        const islam = [];
        for (let i = 0; i < result.length; i++) {
          islam.push(result[i].islam);
        }

        const katholik = [];
        for (let i = 0; i < result.length; i++) {
          katholik.push(result[i].katholik);
        }

        const protestan = [];
        for (let i = 0; i < result.length; i++) {
          protestan.push(result[i].protestan);
        }

        const hindu = [];
        for (let i = 0; i < result.length; i++) {
          hindu.push(result[i].hindu);
        }

        const budha = [];
        for (let i = 0; i < result.length; i++) {
          budha.push(result[i].budha);
        }

        const items = islam.concat(katholik).concat(protestan).concat(hindu).concat(budha);

        this.series = items;
        this.chartOptions = {
          labels: ['Islam', 'Katholik', 'Protestan', 'Hindu', 'Budha'],
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
