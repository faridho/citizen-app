<template>
  <v-list two-line subheader>
    <v-subheader inset></v-subheader>
    <v-list-tile
      v-for="item in items" :key="item.id"
      rel="noopener nofollow"
      ripple
      @click="detail(item.id, $event.target)"
      avatar>
      <v-list-tile-avatar>
        <v-icon>mdi-file-account mdi-48px </v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title>{{ item.nama_lengkap }}</v-list-tile-title>
        <v-list-tile-sub-title><strong>{{ item.jenis_dokumen }}</strong></v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon color="warning">mdi-eye</v-icon>
      </v-list-tile-action>
    </v-list-tile>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <h3>Detail Permintaan Dokumen</h3>
        </v-card-title>
        <v-card-text>
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">mdi-face-profile</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Peminta Dokumen</v-list-tile-sub-title>
                <v-list-tile-title>{{ namaLengkap }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">mdi-file</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Jenis Dokumen</v-list-tile-sub-title>
                <v-list-tile-title>{{ jenisDokumen }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">mdi-calendar</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Tanggal Permintaan</v-list-tile-sub-title>
                <v-list-tile-title>{{ tanggalPermintaan }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">mdi-checkbox-multiple-marked-outline</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Keperluan</v-list-tile-sub-title>
                <v-list-tile-title>{{ keperluan }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">mdi-record</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Biaya</v-list-tile-sub-title>
                <v-list-tile-title>{{ biaya }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn block flat color="warning" outline @click="close">Tutup</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list>
</template>
<script>
import eventBus from '@/views/eventBus'
import URL from '@/api/url'
import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  props: {
    tab: Number
  },

  data() {
    const user = VueCookies.get('session');
    return {
      dialog: false,
      items: [],

      id: user.id,
      namaLengkap: '',
      jenisDokumen: '',
      tanggalPermintaan: '',
      keperluan: '',
      biaya: '',
    }
  },

  mounted() {
    this.getData();
    eventBus.$on('DATA_LOADED', this.getData);
  },

  methods: {
    async getData() {
      const data = await axios
        .get(URL + '/document/getllmaster/' + this.tab + '/' + this.id)
        .then(response => response.data.data);

      this.items = data;
    },

    async detail(target) {
      this.dialog = true;

      const detail = await axios
        .get(URL + '/document/getrow/' + this.tab + '/' + target)
        .then(response => response.data.data);

      this.namaLengkap = detail.nama_lengkap;
      this.jenisDokumen = detail.jenis_dokumen;
      this.tanggalPermintaan = detail.tgl_permintaan;
      this.keperluan = detail.keperluan;
      this.biaya = detail.biaya;
    },

    close() {
      this.dialog = false;
    }
  }

}
</script>
