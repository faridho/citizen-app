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
          <v-icon>mdi-file-restore mdi-48px </v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.tgl_keluar }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon color="warning">mdi-eye-check</v-icon>
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
          <h3>Detail Pengeluaran</h3>
        </v-card-title>
        <v-card-text>
          <v-list two-line>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">mdi-file</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Jumlah Pengeluaran</v-list-tile-sub-title>
                {{ jumlahPengeluaran }}
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">mdi-locker-multiple</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Keterangan</v-list-tile-sub-title>
                {{ keterangan }}
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">mdi-calendar</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Tgl Keluar</v-list-tile-sub-title>
                {{ tglKeluar }}
              </v-list-tile-content>
            </v-list-tile>

          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn block flat color="warning" outline @click="close">Tutup</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import months from '@/views/list'
import eventBus from '@/views/eventBus'
import URL from '@/api/url'
import axios from 'axios'

export default {
  data: () => ({
    dialog: false,
    items: [],

    jumlahPengeluaran: '',
    keterangan: '',
    tglKeluar: ''

  }),

  mounted() {
    this.getData();
    eventBus.$on('DATA_LOADED', this.getData);
  },

  methods: {

    async getData() {
      const result = await axios
        .get(URL + '/anggaran/getdanatetap')
        .then(response => response.data.data);

      this.items = result;
    },


    async detail(target) {
      this.dialog = true;

      const detail = await axios
        .get(URL + '/anggaran/getdanatetap/' + target)
        .then(response => response.data.data);

      this.jumlahPengeluaran = detail.jumlah_pengeluaran
      this.keterangan = detail.keterangan;
      this.tglKeluar = detail.tgl_keluar;
    },

    close() {
      this.dialog = false;
    }
  }
}
</script>
