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
          <v-toolbar-title class="white--text">Daftar Pengumuman</v-toolbar-title>
          <v-btn
            fab
            color="grey lighten-5"
            bottom
            left
            absolute
            @click="dialog = !dialog">
            <v-icon>mdi-file-plus</v-icon>
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
              <h3>Buat Pengumuman Baru</h3>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                
                <v-text-field
                  v-model="judulPengumuman"
                  :rules="nameRules"
                  label="Judul Pengumuman"
                >
                </v-text-field>

                <v-text-field
                  v-model="isiPengumuman"
                  :rules="nameRules"
                  label="Isi Pengumuman"
                >
                </v-text-field>

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
import MasterList from './List'

export default {
  data: () => ({
    valid: true,
    drawer: null,
    dialog: false,
    loading: false,

    menus: menus,
    nameRules: [v => !!v || "Kolom wajib diisi"],
    
    judulPengumuman: '',
    isiPengumuman: ''
  }),

  methods: {

    close() {
      this.dialog = false;
    },

    async submit() {
      this.loading = true;
      const payload = {
        judulPengumuman: this.judulPengumuman,
        isiPengumuman: this.isiPengumuman
      }


      const storing = await axios
        .post(URL + '/anouncement/insert', payload, undefined)
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


