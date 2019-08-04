<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-navigation-drawer
          fixed
          v-model="drawer"
          app>
          <v-list
            dense>
            <v-list-tile
              v-for="menu in menus" :key="menu.title"
              :to="menu.href"
              rel="noopener nofollow"
              ripple>
              <v-list-tile-action>
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar color="warning" light extended>
          <v-toolbar-side-icon class="white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title class="white--text">Daftar Retribusi Kebersihan</v-toolbar-title>
          <v-btn
            fab
            color="grey lighten-5"
            bottom
            left
            absolute
            @click="dialog = !dialog">
            <v-icon>mdi-file-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <MasterList />
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition">
          <v-card>
            <v-card-title>
              <h3>Collect Retribusi Kebersihan</h3>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-autocomplete
                  v-model="kepalaKeluarga"
                  :items="KKList"
                  :rules="nameRules"
                  label="Kepala Keluarga">
                </v-autocomplete>

                <v-select
                  v-model="bulan"
                  :items="monthList"
                  :rules="nameRules"
                  label="Bulan"
                >
                </v-select>

                <v-select
                  v-model="tahun"
                  :items="yearList"
                  :rules="nameRules"
                  label="Tahun"
                >
                </v-select>

                <v-text-field
                  v-model="nominal"
                  :rules="nameRules"
                  label="Nominal"
                  v-money="money"
                >
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn block flat color="warning" outline @click="close">Batal</v-btn>
              <v-btn :loading="loading" block color="warning" @click="submit">Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import months from '@/views/list'
import eventBus from '@/views/eventBus'
import URL from '@/api/url'
import menus from '@/api/menu'
import axios from 'axios'
import Vue from 'vue'
import money from 'v-money'
import MasterList from './List'
import VueCookies from 'vue-cookies'

Vue.use(money, { precision: 4 })
export default {
  data() {
    const user = VueCookies.get('session');
    return {
      valid: true,
      drawer: null,
      dialog: false,
      loading: false,

      menus: menus,

      id: user.id,
      nameRules: [v => !!v || "Kolom wajib diisi"],
      KKList: [],
      kepalaKeluarga: '',
      monthList: months,
      bulan: '',
      yearList: [2019, 2020, 2021, 2022, 2023, 2013],
      tahun: '',
      nominal: 0,

      money: {
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: '',
        precision: '',
        masked: false /* doesn't work with directive */
      }
    }
  },

  mounted() {
    this.getKK();
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

    close() {
      this.dialog = false;
    },

    async submit() {
      this.loading = true;
      const payload = {
        kepalaKeluarga: this.kepalaKeluarga,
        bulan: parseInt(this.bulan),
        tahun: parseInt(this.tahun),
        nominal: parseFloat(this.nominal.replace(/,/g, ''))
      }


      const storing = await axios
        .post(URL + '/retribusi/kebersihan', payload, undefined)
        .then(response => response.data);

      if (storing.status === true) {
        this.dialog = false;
        this.loading = false;
        eventBus.$emit('DATA_LOADED');
        this.$snackbar(storing.message);
      } else {
        this.loading = false;
        this.$snackbar(storing.message);
      }
    }
  },

  components: {
    MasterList
  }
}
</script>
<style>
.margin-right {
  margin-right: 0px;
}
</style>


