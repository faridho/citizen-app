<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Perbandingan Jenis Kelamin</h4>
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
          .get(URL + '/dashboard/genderchart')
          .then(response => response.data.data);
       
        const laki_laki = [];
        for (let i = 0; i < result.length; i++) {
          laki_laki.push(result[i].laki_laki);
        }

        const perempuan = [];
        for (let i = 0; i < result.length; i++) {
          perempuan.push(result[i].perempuan);
        }

        const items = laki_laki.concat(perempuan);

        this.series = items;
        this.chartOptions = {
          labels: ['Laki-Laki', 'Perempuan'],
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
