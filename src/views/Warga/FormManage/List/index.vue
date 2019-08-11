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
          <v-list-tile-sub-title><strong>Kepala Keluarga: </strong> {{ item.nama_kepala_keluarga }}</v-list-tile-sub-title>
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
          <h3>Detail Warga</h3>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              v-model="idWarga"
              label="ID Warga"
              readonly>
            </v-text-field>
            <v-autocomplete
              v-model="kepalaKeluarga"
              :items="KKList"
              :rules="nameRules"
              label="Kepala Keluarga">
            </v-autocomplete>

            <v-text-field
              v-model="noKtp"
              label="No KTP"
              :rules="nameRules"
              type="number">
            </v-text-field>

            <v-select
              v-model="agama"
              label="Agama"
              :rules="nameRules"
              :items="agamaList">
            </v-select>

            <v-text-field
              v-model="namaLengkap"
              label="Nama Lengkap"
              :rules="nameRules">

            </v-text-field>

            <v-select
              v-model="status"
              label="Status Dalam Keluarga"
              :rules="nameRules"
              :items="statusList">
            </v-select>

            <v-radio-group
              v-model="jk"
              label="Jenis Kelamin"
              :mandatory="false">

              <v-radio label="Laki-Laki" value="1"></v-radio>
              <v-radio label="Perempuan" value="2"></v-radio>
            </v-radio-group>

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
              v-model="pekerjaan"
              label="Pekerjaan"
              :rules="nameRules"
              :items="pekerjaanList">
            </v-select>

            <v-text-field
              v-model="penghasilan"
              label="Penghasilan"
              :rules="nameRules">
            </v-text-field>
          </v-form>
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
      statusList: ['Ayah', 'Ibu', 'Anak'],
      agamaList: ['Islam', 'Katholik', 'Protestan', 'Budha', 'Hindu'],
      pekerjaanList: ['Pelajar', 'Mahasiswa', 'IRT', 'Karyawan Swasta', 'PNS', 'Wiraswasta'],

      idWarga: '',
      kepalaKeluarga: '',
      noKtp: '',
      agama: '',
      namaLengkap: '',
      status: '',
      jk: '',
      pekerjaan: '',
      penghasilan: '',
      tanggalLahir: '',
      tempatLahir: '',
      menu2: false,

    }),

    mounted() {
      this.getData();
      this.getKK();
      eventBus.$on('DATA_LOADED', this.getData);
    },

    methods: {
      async getData() {
        const result = await axios
          .get(URL + '/master/datawarga')
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
          .get(URL + '/master/datawarga/' + target)
          .then(response => response.data.data);

        this.idWarga = detail.id,
        this.kepalaKeluarga = detail.kepala_keluarga;
        this.noKtp = detail.no_ktp;
        this.agama = detail.agama,
          this.namaLengkap = detail.nama_lengkap;
        this.status = detail.status_warga;
        this.jk = detail.jenis_kelamin;
        this.pekerjaan = detail.pekerjaan;
        this.penghasilan = detail.penghasilan;
        this.tempatLahir = detail.tempat_lahir;
        this.tanggalLahir = detail.tanggal_lahir;
      },

      async update() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          const payload = {
            'id': this.idWarga,
            'agama': this.agama,
            'noKtp': this.noKtp,
            'namaLengkap': this.namaLengkap,
            'jk': this.jk,
            'tempatLahir': this.pekerjaan,
            'tanggalLahir': this.tanggalLahir,
            'status': this.status,
            'pekerjaan': this.pekerjaan,
            'penghasilan': this.penghasilan
          }


          const storing = await axios
            .post(URL + '/master/updatewarga', payload, undefined)
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

      close() {
        this.dialog = false;
      }
    }
  }
</script>
