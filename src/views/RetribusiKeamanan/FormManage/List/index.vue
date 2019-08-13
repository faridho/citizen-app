<template>
  <div>
    <v-list two-line subheader>
      <v-subheader inset></v-subheader>
      <v-list-tile
        v-for="item in items" :key="item.id"
        rel="noopener nofollow"
        ripple
        @click="detail(item.id, $event.target)"
        avatar>
        <v-list-tile-avatar>
          <v-icon>mdi-account-circle mdi-48px </v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.nama_kepala_keluarga }}</v-list-tile-title>
          <v-list-tile-sub-title><strong>Bulan: </strong> {{ item.bulan }} <strong>Tahun:</strong> {{ item.tahun }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon color="warning">mdi-eye-check</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <h3>Detail Retribusi Keamanan</h3>
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="kepalaKeluarga"
            :items="KKList"
            readonly
            label="Kepala Keluarga">
          </v-autocomplete>

          <v-select
            v-model="bulan"
            :items="monthList"
            readonly
            label="Bulan">
          </v-select>

          <v-select
            v-model="tahun"
            :items="yearList"
            readonly
            label="Tahun">
          </v-select>

          <v-text-field
            v-model="nominal"
            label="Nominal"
            readonly>
          </v-text-field>

          <v-select
            v-model="jenisPembayaran"
            :items="metode"
            readonly
            :rules="nameRules"
            label="Jenis Pembayaran">
          </v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn block flat color="warning" outline @click="close">Tutup</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import months from '@/views/list'
  import eventBus from '@/views/eventBus'
  import URL from '@/api/url'
  import axios from 'axios'
  import VueCookies from 'vue-cookies'

  export default {
    data() {
      const user = VueCookies.get('session');
      return {
        dialog: false,
        items: [],

        KKList: [],

        id: user.id,
        kepalaKeluarga: '',
        monthList: months,
        bulan: '',
        yearList: [2019, 2020, 2021, 2022, 2023, 2013],
        tahun: '',
        nominal: 0,
        metode: [
          {
            text: 'Cash',
            value: 'Cash'
          },
          {
            text: 'Transfer',
            value: 'Transfer'
          }
        ],
        jenisPembayaran: ''
      }
    },

    mounted() {
      this.getData();
      this.getKK();
      eventBus.$on('DATA_LOADED', this.getData);
    },

    methods: {
      async getKK() {
        const data = await axios
          .get(URL + '/master/alldatakepalakeluarga/' + this.id)
          .then(response => response.data.data);

        const newList = [];
        for (const item of data) {
          let element = {
            value: item.id,
            text: item.nama_kepala_keluarga
          }

          newList.push(element);
        }

        this.KKList = newList;
      },

      async getData() {
        const result = await axios
          .get(URL + '/retribusi/allkeamanan/' + this.id)
          .then(response => response.data.data);

        this.items = result;
      },


      async detail(target) {
        this.dialog = true;

        const detail = await axios
          .get(URL + '/retribusi/keamanan/' + target)
          .then(response => response.data.data);

        this.kepalaKeluarga = detail.kepala_keluarga;
        this.bulan = detail.bulan;
        this.tahun = detail.tahun;
        this.nominal = detail.nominal;
        this.jenisPembayaran = detail.jenis_pembayaran;

      },

      close() {
        this.dialog = false;
      }
    }
  }
</script>
