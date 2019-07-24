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
          <v-toolbar-title class="white--text">Daftar Siskamling Warga</v-toolbar-title>
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
              <h3>Tambah Jadwal Siskamling</h3>
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-menu
                  v-model="menuDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Tanggal Siskamling"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menuDate = false"></v-date-picker>
                </v-menu>

                <v-menu
                  ref="menu"
                  v-model="menuMulai"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="jamMulai"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="jamMulai"
                      label="Jam Mulai"
                      prepend-icon="mdi-clock"
                      readonly
                      v-on="on"></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menuMulai"
                    v-model="jamMulai"
                    full-width
                    @click:minute="$refs.menu.save(jamMulai)"></v-time-picker>
                </v-menu>

                <v-menu
                  ref="menuAkhir"
                  v-model="menuBerakhir"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="jamAkhir"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="jamAkhir"
                      label="Jam Berakhir"
                      prepend-icon="mdi-clock"
                      readonly
                      v-on="on"></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menuBerakhir"
                    v-model="jamAkhir"
                    full-width
                    @click:minute="$refs.menuAkhir.save(jamAkhir)"></v-time-picker>
                </v-menu>
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
  data: vm => ({
    valid: true,
    drawer: null,
    dialog: false,
    loading: false,

    menus: menus,
    nameRules: [v => !!v || "Kolom wajib diisi"],

    date: new Date().toISOString().substr(0, 10),
    menuDate: false,

    jamMulai: null,
    menuMulai: false,

    jamAkhir: null,
    menuBerakhir: false,

  }),

  methods: {
    close() {
      this.dialog = false;
    },

    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const payload = {
          tglSiskamling: this.date,
          jamMulai: this.jamMulai,
          jamBerakhir: this.jamAkhir
        }

        const storing = await axios
          .post(URL + '/siskamling/insert', payload, undefined)
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


