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
          <v-icon>mdi-calendar mdi-48px </v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.tgl_siskamling }}</v-list-tile-title>
          <v-list-tile-sub-title><strong>Jam: </strong> {{ item.jam_mulai }} - {{ item.jam_berakhir }}</v-list-tile-sub-title>
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
          <h3>Detail JadwaL Siskamling</h3>
        </v-card-title>
        <v-card-text>
          <v-list two-line subheader>
            <v-subheader inset></v-subheader>
            <v-list-tile
              v-for="detail in detailSiskamling" :key="detail.id"
              rel="noopener nofollow"
              ripple
              @click="edit(detail.id, $event.target)"
              avatar>
              <v-list-tile-avatar>
                <v-icon>mdi-account mdi-48px </v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ detail.nama_lengkap }}</v-list-tile-title>
                <v-list-tile-sub-title><strong>Status: </strong> {{ detail.status_warga }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon v-if="detail.id == user" color="warning">mdi-more</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn block flat color="warning" outline @click="close">Kembali</v-btn>
          <v-btn block color="warning" @click="report">Laporan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogReport"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <h3>Laporan Siskamling</h3>
        </v-card-title>
        <v-card-text>
          <v-form>
    
            <v-select
              :items="reportStatus"
              label="Status"
            >
            </v-select>
            <v-textarea
              label="Isi Laporan">
            </v-textarea>
            
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block flat color="warning" outline @click="closeReport">Kembali</v-btn>
          <v-btn :loading="loading" block color="warning" @click="simpan">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import eventBus from '@/views/eventBus'
import URL from '@/api/url'
import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  data() {
    const user = VueCookies.get('session');
    return {
        user: user.id,
        valid: true,
        dialog: false,
        dialogReport: false,
        loading: false,

        items: [],
        nameRules: [v => !!v || "Kolom wajib diisi"],
        dataWarga: [],
        Personelist: [],
        detailSiskamling: [],

        id: '',

        reportStatus: ['Aman', 'Tidak Aman']
    } 
  },

  mounted() {
    this.getData();
    this.getPersonel();
    eventBus.$on('DATA_LOADED', this.getData);
  },

  methods: {
    async getPersonel() {
      const data = await axios
        .get(URL + '/master/datawarga')
        .then(response => response.data.data);

      const newList = [];
      for (const item of data) {
        let element = {
          value: item.id,
          text: item.nama_lengkap
        }

        newList.push(element);
      }

      this.Personelist = newList;
    },

    async getData() {
      const data = await axios
        .get(URL + '/siskamling/get')
        .then(response => response.data.data);

      this.items = data;
    },

    newdata() {
      this.dataWarga.push({
        warga: '',
        statusWarga: 'Siap',
        alasan: ''
      });
    },

    removedata(index) {
      this.dataWarga.splice(index, 1);
    },

    async detail(target) {
      this.dialog = true;

      const data = await axios
        .get(URL + '/siskamling/get/' + target)
        .then(response => response.data.data);
      
      const { id } = await axios
        .get(URL + '/siskamling/getsiskamling/' + target)
        .then(response => response.data.data);

      this.detailSiskamling = data;
      this.id = id;
    },

    async edit(target) {
      if(target == this.user) {
        this.$snackbar("Update Ketersediaan Ronda 'SIAP'");
      }else {
        this.$snackbar("Bukan Profil Anda");
      }
      
    },

    async report() {
      this.dialogReport = true;
    },

    closeReport() {
      this.dialogReport = false;
    },

    close() {
      this.dialog = false;
    }
  }
}
</script>
