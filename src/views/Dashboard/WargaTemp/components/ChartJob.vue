<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Perbandingan Pekerjaan</h4>
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
          .get(URL + '/dashboard/jobcharttemp')
          .then(response => response.data.data);
       
        const pelajar = [];
        for (let i = 0; i < result.length; i++) {
          pelajar.push(result[i].pelajar);
        }

        const mahasiswa = [];
        for (let i = 0; i < result.length; i++) {
          mahasiswa.push(result[i].mahasiswa);
        }

        const irt = [];
        for (let i = 0; i < result.length; i++) {
          irt.push(result[i].irt);
        }

        const karyawanSwasta = [];
        for (let i = 0; i < result.length; i++) {
          karyawanSwasta.push(result[i].karyawan_swasta);
        }

        const pns = [];
        for (let i = 0; i < result.length; i++) {
          pns.push(result[i].pns);
        }

        const wiraswasta = [];
        for (let i = 0; i < result.length; i++) {
          wiraswasta.push(result[i].wiraswasta);
        }

        const items = pelajar.concat(mahasiswa).concat(irt).concat(karyawanSwasta).concat(pns).concat(wiraswasta);

        this.series = items;
        this.chartOptions = {
          labels: ['Pelajar', 'Mahasiswa', 'IRT', 'Karyawan Swasta', 'PNS', 'Wiraswasta'],
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
