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
          <v-icon>mdi-speaker mdi-48px </v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.judul_pengumuman }}</v-list-tile-title>
          <v-list-tile-sub-title><strong>Tanggal: </strong> {{ item.tgl_pengumuman }}</v-list-tile-sub-title>
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
          <h3>Detail Permintaan Dokumen</h3>
        </v-card-title>
        <v-card-text>
          <v-list two-line>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">mdi-file</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Judul Pengumuman</v-list-tile-sub-title>
                <v-list-tile-title>{{ judulPengumuman }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">mdi-locker-multiple</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Isi Pengumuman</v-list-tile-sub-title>
                <v-list-tile-title>{{ isiPengumuman }}</v-list-tile-title>
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

    judulPengumuman: '',
    isiPengumuman: '',

  }),

  mounted() {
    this.getData();
    eventBus.$on('DATA_LOADED', this.getData);
  },

  methods: {

    async getData() {
      const result = await axios
        .get(URL + '/anouncement/get')
        .then(response => response.data.data);

      this.items = result;
    },


    async detail(target) {
      this.dialog = true;

      const detail = await axios
        .get(URL + '/anouncement/get/' + target)
        .then(response => response.data.data);

      this.judulPengumuman = detail.judul_pengumuman;
      this.isiPengumuman = detail.isi_pengumuman;
    },

    close() {
      this.dialog = false;
    }
  }
}
</script>
