<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Perbandingan Tipe Tempat Sewa</h4>
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
          .get(URL + '/dashboard/typeplacecharttemp')
          .then(response => response.data.data);
        
        const kost = [];
        for (let i = 0; i < result.length; i++) {
          kost.push(result[i].kost);
        }

        const kontrakan = [];
        for (let i = 0; i < result.length; i++) {
          kontrakan.push(result[i].kontrakan);
        }

        const milikSaudara = [];
        for (let i = 0; i < result.length; i++) {
          milikSaudara.push(result[i].milik_saudara);
        }
        
        const items = kost.concat(kontrakan).concat(milikSaudara)
        this.series = items;
        this.chartOptions = {
          labels: ['Kost', 'Kontrakan', 'Milik Saudara'],
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
