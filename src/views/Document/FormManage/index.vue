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
        <v-toolbar color="warning" light extended style="margin-bottom: 33px;">
          <v-toolbar-side-icon class="white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title class="white--text">Daftar Permintaan Dokumen</v-toolbar-title>
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
              <h3>Tambah Permintaan Dokumen</h3>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-select
                  v-model="jenisWarga"
                  label="Jenis Warga"
                  :items="jenisWargaList"
                  :rules="nameRules"
                  @change="getWarga">
                </v-select>

                <v-autocomplete
                  v-model="warga"
                  label="Pilih Warga"
                  :items="wargaList"
                  :rules="nameRules">
                </v-autocomplete>

                <v-autocomplete
                  v-model="documentType"
                  label="Pilih Jenis Dokumen"
                  :items="documentTypes"
                  :rules="nameRules">
                </v-autocomplete>

                <v-textarea
                  v-model="keperluan"
                  label="Keperluan"
                  :rules="nameRules"
                >
                </v-textarea>

                <v-text-field
                  v-model="biaya"
                  label="Biaya (Optional)"
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
import eventBus from '@/views/eventBus'
import documentTypes from '../config'
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
      nameRules: [v => !!v || "Kolom wajib diisi"],
      wargaList: [],
      jenisWargaList: [
        {
          text: 'Warga Pribumi',
          value: 1
        },
        {
          text: 'Warga Temporary',
          value: 2
        }
      ],
      documentTypes: documentTypes,

      id: user.id,
      jenisWarga: '',
      warga: '',
      documentType: '',
      keperluan: '',
      biaya: 0,

      money: {
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: '',
        precision: '',
        masked: false 
      },
    }
  },


  methods: {
    close() {
      this.dialog = false;
    },

    async getWarga(id) {
      if (id === 1) {
        var endPoint = '/master/alldatawarga/' + this.id;
      } else {
        var endPoint = '/temporary/getall/' + this.id;
      }

      const data = await axios
          .get(URL + endPoint)
          .then(response => response.data.data);

      const newList = [];

      for (const item of data) {
        let element = {
          value: item.id,
          text: item.nama_lengkap
        }

        newList.push(element);
      }

      this.wargaList = newList;
    },

    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const payload = {
          jenisWarga: parseInt(this.jenisWarga),
          warga: this.warga,
          jenisDokumen: this.documentType,
          keperluan: this.keperluan,
          biaya: this.biaya
        }

        const storing = await axios
          .post(URL + '/document/insert', payload, undefined)
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


