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
          <v-toolbar-title class="white--text">Daftar Warga</v-toolbar-title>
          <v-btn
            fab
            color="grey lighten-5"
            bottom
            left
            absolute
            @click="dialog = !dialog">
            <v-icon>mdi-account-plus</v-icon>
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
              <h3>Tambah Warga Baru</h3>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-spacer></v-spacer>
                <v-btn
                  color="warning"
                  flat
                  outline
                  class="text-lg-right"
                  @click="newdata">
                  <v-icon>mdi-file-plus</v-icon>
                  Tambah Warga
                </v-btn>
                <v-divider></v-divider>
                <v-layout wrap row v-for="(warga, index) in dataWarga" :key="index">
                  <v-flex xs12>
                    <v-autocomplete
                      v-model="warga.kepalaKeluarga"
                      :items="KKList"
                      :rules="nameRules"
                      label="Kepala Keluarga">
                    </v-autocomplete>

                    <v-text-field
                      v-model="warga.noKtp"
                      label="No KTP"
                      :rules="nameRules"
                      type="number">
                    </v-text-field>

                    <v-select
                      v-model="warga.agama"
                      label="Agama"
                      :rules="nameRules"
                      :items="agamaList">
                    </v-select>

                    <v-text-field
                      v-model="warga.namaLengkap"
                      label="Nama Lengkap"
                      :rules="nameRules">

                    </v-text-field>

                    <v-select
                      v-model="warga.status"
                      label="Status Dalam Keluarga"
                      :rules="nameRules"
                      :items="statusList">
                    </v-select>

                    <v-radio-group
                      v-model="warga.jk"
                      label="Jenis Kelamin"
                      :mandatory="false">

                      <v-radio label="Laki-Laki" value="1"></v-radio>
                      <v-radio label="Perempuan" value="2"></v-radio>
                    </v-radio-group>

                    <v-text-field
                      v-model="warga.tempatLahir"
                      label="Tempat Lahir"
                      :rules="nameRules">
                    </v-text-field>

                    <v-menu
                      v-model="warga.menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="warga.tanggalLahir"
                          label="Tanggal Lahir"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="warga.tanggalLahir" @input="warga.menu2 = false"></v-date-picker>
                    </v-menu>

                    <v-select
                      v-model="warga.pekerjaan"
                      label="Pekerjaan"
                      :rules="nameRules"
                      :items="pekerjaanList">
                    </v-select>

                    <v-text-field
                      v-model="warga.penghasilan"
                      label="Penghasilan"
                      :rules="nameRules"
                      v-money="money">
                    </v-text-field>

                    <v-spacer></v-spacer>
                    <v-btn
                      color="error"
                      flat
                      outline
                      class="text-lg-right"
                      @click="removedata(index)">
                      <v-icon>mdi-close-box</v-icon>
                      Hapus Kolom
                    </v-btn>

                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>
                </v-layout>
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
import menus from '@/api/menu'
import axios from 'axios'
import Vue from 'vue'
import money from 'v-money'
import MasterList from './List'

Vue.use(money, { precision: 4 })
export default {
  data: vm => ({
    valid: true,
    drawer: null,
    dialog: false,
    loading: false,

    menus: menus,
    dataWarga: [],
    nameRules: [v => !!v || "Kolom wajib diisi"],
    KKList: [],
    statusList: ['Ayah', 'Ibu', 'Anak'],
    agamaList: ['Islam', 'Katholik', 'Protestan', 'Budha', 'Hindu'],
    radio: 1,
    pekerjaanList: ['Pelajar', 'Mahasiswa', 'IRT', 'Karyawan Swasta', 'PNS', 'Wiraswasta'],
    money: {
      decimal: '.',
      thousands: ',',
      prefix: '',
      suffix: '',
      precision: '',
      masked: false /* doesn't work with directive */
    },

  }),

  mounted() {
    this.getKK();
  },

  methods: {
    async getKK() {
      const data = await axios
        .get(URL + '/master/datakepalakeluarga')
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

    newdata() {
      this.dataWarga.push({
        kepalaKeluarga: '',
        noKtp: '',
        agama: '',
        namaLengkap: '',
        status: '',
        jk: '',
        tempatLahir: '',
        tanggalLahir: '',
        pekerjaan: '',
        penghasilan: ''
      });
    },

    removedata(index) {
      this.dataWarga.splice(index, 1);
    },

    close() {
      this.dialog = false;
    },

    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const payload = {
          dataWarga: this.dataWarga
        }


        const storing = await axios
          .post(URL + '/master/insertwarga', payload, undefined)
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


