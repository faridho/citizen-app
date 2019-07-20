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
          <v-list-tile-sub-title><strong>No Rumah: </strong> {{ item.no_rumah }}</v-list-tile-sub-title>
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
          <h3>Detail Keluarga</h3>
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
              :rules="nameRules"
              v-model="noKK">
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
              v-model="penghasilan">
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

    namaKepalaKeluarga: '',
    noKK: '',
    telepon: '',
    noRumah: '',
    statusRumah: '',
    statusRumahList: ['Milik Sendiri', 'Kontrak', 'Numpang', 'Kost'],
    pekerjaan: '',
    penghasilan: 0,

    nameRules: [v => !!v || "Kolom wajib diisi"],
  }),

  mounted() {
    this.getData();
    eventBus.$on('DATA_LOADED', this.getData);
  },

  methods: {
    async getData() {
      const result = await axios
        .get(URL + '/master/datakepalakeluarga')
        .then(response => response.data.data);

      this.items = result;
    },

    async detail(target) {
      this.dialog = true;

      const detail = await axios
        .get(URL + '/master/datakepalakeluarga/' + target)
        .then(response => response.data.data)

      this.namaKepalaKeluarga = detail.nama_kepala_keluarga;
      this.telepon = detail.telepon;
      this.noKK = detail.no_kk,
      this.noRumah = detail.no_rumah;
      this.statusRumah = detail.status_rumah;
      this.pekerjaan = detail.pekerjaan;
      this.penghasilan = detail.penghasilan;
    },

    async update() {

    },

    close() {
      this.dialog = false;
    }
  }
}
</script>
