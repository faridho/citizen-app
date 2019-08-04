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
          <v-toolbar-title class="white--text">Daftar Warga Temporary</v-toolbar-title>
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
              <h3>Tambah Warga Temporary Baru</h3>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-layout>
                  <v-flex xs12>
                    <v-text-field
                      v-model="nama"
                      :rules="nameRules"
                      label="Nama Lengkap"></v-text-field>

                    <v-select
                      v-model="jk"
                      :items="jkList"
                      :rules="nameRules"
                      label="Jenis Kelamin">
                    </v-select>

                    <v-text-field
                      v-model="tempatLahir"
                      label="Tempat Lahir"
                      :rules="nameRules">
                    </v-text-field>

                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="tanggalLahir"
                          label="Tanggal Lahir"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="tanggalLahir" @input="menu2 = false"></v-date-picker>
                    </v-menu>

                    <v-select
                      v-model="agama"
                      label="Agama"
                      :rules="nameRules"
                      :items="agamaList">
                    </v-select>

                    <v-text-field
                      v-model="noTelp"
                      :rules="nameRules"
                      type="number"
                      label="No Telp"></v-text-field>

                    <v-text-field
                      v-model="identitas"
                      :rules="nameRules"
                      label="No Identitas"></v-text-field>

                    <v-select
                      v-model="jenisIdentitas"
                      :items="jenisIdentitasList"
                      :rules="nameRules"
                      label="Jenis Identitas">
                    </v-select>

                    <v-autocomplete
                      v-model="kewarganegaraan"
                      :items="countries"
                      :rules="nameRules"
                      item-text="name"
                      item-value="name"
                      label="Kewarganegaraan">
                    </v-autocomplete>

                    <v-text-field
                      v-model="kotaAsal"
                      label="Kota Asal"
                      :rules="nameRules">
                    </v-text-field>

                    <v-textarea
                      v-model="alamat"
                      :rules="nameRules"
                      label="Alamat">
                    </v-textarea>

                    <v-autocomplete
                      v-model="pemilikTempat"
                      :items="KKList"
                      :rules="nameRules"
                      label="Pemilik Tempat Sewa">
                    </v-autocomplete>

                    <v-select
                      v-model="tipeSewa"
                      :items="types"
                      :rules="nameRules"
                      label="Tipe Tempat Sewa">
                    </v-select>

                    <v-text-field
                      v-model="hargaSewa"
                      :rules="nameRules"
                      label="Harga Sewa"
                      v-money="money"></v-text-field>

                    <v-select
                      v-model="pekerjaan"
                      :items="pekerjaanList"
                      :rules="nameRules"
                      label="Pekerjaan">
                    </v-select>

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
import countries from './config'
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
      dataWarga: [],
      nameRules: [v => !!v || "Kolom wajib diisi"],
      KKList: [],
      jkList: [
        {
          text: 'Laki-Laki',
          value: 1
        },
        {
          text: 'Perempuan',
          value: 2
        }
      ],
      pekerjaanList: ['Pelajar', 'Mahasiswa', 'IRT', 'Karyawan Swasta', 'PNS', 'Wiraswasta'],
      countries: countries,
      agamaList: ['Islam', 'Katholik', 'Protestan', 'Budha', 'Hindu'],
      jenisIdentitasList: ['KTP', 'KITAS', 'Passport'],
      types: ['Kost', 'Kontrakan', 'Milik Saudara'],

      money: {
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: '',
        precision: '',
        masked: false /* doesn't work with directive */
      },

      nama: '',
      jk: '',
      agama: '',
      noTelp: '',
      identitas: '',
      jenisIdentitas: '',
      kewarganegaraan: '',
      alamat: '',
      pemilikTempat: '',
      tipeSewa: '',
      hargaSewa: 0,
      pekerjaan: '',
      tempatLahir: '',
      tanggalLahir: '',
      menu2: false,
      kotaAsal: ''
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
      if (this.$refs.form.validate()) {
        this.loading = true;
        const payload = {
          namaLengkap: this.nama,
          jenisKelamin: parseInt(this.jk),
          tanggalLahir: this.tanggalLahir,
          tempatLahir: this.tempatLahir,
          agama: this.agama,
          noTelp: parseInt(this.noTelp),
          identitas: this.identitas,
          jenisIdentitas: this.jenisIdentitas,
          kewarganegaraan: this.kewarganegaraan,
          kotaAsal: this.kotaAsal,
          alamat: this.alamat,
          pemilikTempat: parseInt(this.pemilikTempat),
          tipeTempatSewa: this.tipeSewa,
          hargaSewa: parseFloat(this.hargaSewa.replace(/,/g, '')),
          pekerjaan: this.pekerjaan
        }


        const storing = await axios
          .post(URL + '/temporary/insert', payload, undefined)
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


