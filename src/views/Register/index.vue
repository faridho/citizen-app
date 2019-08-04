<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <h2>Register Warga</h2>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              label="Kode Warga"
              v-model="kodeWarga"
              :rules="nameRules">
            </v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              :rules="nameRules">
            </v-text-field>
            <v-text-field
              label="Nama Kepala Keluarga"
              v-model="namaKepalaKeluarga"
              :rules="nameRules">
            </v-text-field>
            <v-text-field
              label="No Kartu Keluarga"
              type="number"
              v-model="noKK"
              :rules="nameRules">
            </v-text-field>
            <v-text-field
              label="Telepon"
              type="number"
              v-model="telepon">
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
          <v-btn block flat color="warning" to="/">Login</v-btn>
          <v-btn :loading="loading" block color="warning" @click="submit">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import URL from '@/api/url'
  import Vue from 'vue'
  import axios from 'axios'
  import money from 'v-money'
  Vue.use(money, { precision: 4 })
  export default {
    data: () => ({
      valid: true,
      loading: false,
      nameRules: [v => !!v || "Kolom wajib diisi"],
      kodeWarga: '',
      namaKepalaKeluarga: '',
      telepon: '',
      noKK: '',
      noRumah: '',
      statusRumah: '',
      statusRumahList: ['Milik Sendiri', 'Kontrak', 'Numpang', 'Kost'],
      pekerjaan: '',
      penghasilan: 0,
      password: '',

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
            kodeWarga: this.kodeWarga,
            password: this.password,
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

          if (storing.status === true) {
            this.dialog = false;
            this.loading = false;
          } else {
            this.loading = false;
          }
          this.$snackbar("Pendaftaran Berhasil Silah Login");
        }
      },

    }
  }
</script>
