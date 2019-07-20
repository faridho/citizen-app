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
          <v-toolbar-title class="white--text">Daftar Kepala Keluarga</v-toolbar-title>
          <v-btn
            fab
            color="grey lighten-5"
            bottom
            left
            absolute
            @click="dialog = !dialog">
            <v-icon>mdi-account-multiple-plus</v-icon>
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
              <h3>Tambah Kepala Keluarga Baru</h3>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  label="Nama Kepala Keluarga"
                  v-model="namaKepalaKeluarga"
                  :rules="nameRules">
                </v-text-field>
                <v-text-field
                  label="No Kartu Keluarga"
                  type="number"
                  v-model="noKK"
                  :rules="nameRules"
                >
                </v-text-field>
                <v-text-field
                  label="Telepon"
                  type="number"
                  v-model="telepon"
                >
                </v-text-field>
                <v-text-field
                  label="No Rumah"
                  v-model="noRumah"
                  type="number"
                  :rules="nameRules">
                </v-text-field>
                <v-select
                  label="Status Rumah"
                  v-model="statusRumah"
                  :items="statusRumahList"
                  :rules="nameRules">
                </v-select>
                <v-text-field
                  label="Pekerjaan"
                  v-model="pekerjaan"
                  :rules="nameRules">
                </v-text-field>
                <v-text-field
                  label="Penghasilan"
                  v-model="penghasilan"
                  v-money="money">
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
import URL from '@/api/url'
import MasterList from './List'
import menus from '@/api/menu'
import axios from 'axios'
import Vue from 'vue'
import money from 'v-money'

Vue.use(money, { precision: 4 })
export default {
  data: () => ({
    valid: true,
    dialog: false,
    loading: false,
    drawer: null,
    menus: menus,
    nameRules: [v => !!v || "Kolom wajib diisi"],

    namaKepalaKeluarga: '',
    telepon: '',
    noKK: '',
    noRumah: '',
    statusRumah: '',
    statusRumahList: ['Milik Sendiri', 'Kontrak', 'Numpang', 'Kost'],
    pekerjaan: '',
    penghasilan: 0,

    money: {
      decimal: '.',
      thousands: ',',
      prefix: '',
      suffix: '',
      precision: '',
      masked: false /* doesn't work with directive */
    }
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const payload = {
          namaKepalaKeluarga: this.namaKepalaKeluarga,
          noKK: this.noKK,
          telepon: this.telepon,
          noRumah: parseInt(this.noRumah),
          statusRumah: this.statusRumah,
          pekerjaan: this.pekerjaan,
          penghasilan: parseFloat(this.penghasilan.replace(/,/g, ''))
        }

        const storing = await axios
        .post(URL + '/master/insertkepalakeluarga', payload, undefined)
        .then(response => response.data);

        if(storing.status === true) {
          this.dialog = false;
          this.loading = false;
          eventBus.$emit('DATA_LOADED', )
        }else{
          this.loading = false;
        }
        this.$snackbar(storing.message);
      }
    },

    close() {
      this.dialog = false;
      this.$refs.form.reset();
    }
  },

  components: {
    MasterList
  }
}
</script>

