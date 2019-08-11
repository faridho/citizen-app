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
          <v-list-tile-title>{{ item.nama_lengkap }}</v-list-tile-title>
          <v-list-tile-sub-title><strong>Tempat Sewa: </strong> {{ item.nama_kepala_keluarga }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon color="warning">mdi-file-document-edit</v-icon>
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
          <h3>Detail Warga Temporary</h3>
        </v-card-title>
        <v-card-text>
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
                label="Harga Sewa"></v-text-field>

              <v-select
                v-model="pekerjaan"
                :items="pekerjaanList"
                :rules="nameRules"
                label="Pekerjaan">
              </v-select>

            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn block flat color="warning" outline @click="close">Batal</v-btn>
          <v-btn :loading="loading" block color="warning" @click="update">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import countries from '../config'
import eventBus from '@/views/eventBus'
import URL from '@/api/url'
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    dialog: false,
    loading: false,

    items: [],
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

  }),

  mounted() {
    this.getData();
    this.getKK();
    eventBus.$on('DATA_LOADED', this.getData);
  },

  methods: {
    async getData() {
      const result = await axios
        .get(URL + '/temporary/get')
        .then(response => response.data.data);

      this.items = result;
    },

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

    async detail(target) {
      this.dialog = true;

      const detail = await axios
        .get(URL + '/temporary/get/' + target)
        .then(response => response.data.data);

      this.nama = detail.nama_lengkap;
      this.jk = detail.jenis_kelamin
      this.agama = detail.agama;
      this.noTelp = detail.no_telp;
      this.identitas = detail.identitas;
      this.jenisIdentitas = detail.jenis_identitas;
      this.kewarganegaraan = detail.kewarganegaraan;
      this.alamat = detail.alamat;
      this.pemilikTempat = detail.pemilik_tempat;
      this.tipeSewa = detail.tipe_tempat_sewa;
      this.hargaSewa = detail.harga_sewa;
      this.pekerjaan = detail.pekerjaan;
      this.tempatLahir = detail.tempat_lahir,
      this.tanggalLahir = detail.tanggal_lahir,
      this.kotaAsal = detail.kota_asal;

    },

    async update() {

    },

    close() {
      this.dialog = false;
    }
  }
}
</script>
