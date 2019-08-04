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
          <v-toolbar-title class="white--text">Home</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <h2>Selamat Datang, {{ nama }} </h2>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import eventBus from '@/views/eventBus'
  import URL from '@/api/url'
  import menus from '@/api/menu'
  import VueCookies from 'vue-cookies'

  export default {
    data() {
      const user = VueCookies.get('session');
      return {
        nama: user.nama_kepala_keluarga,
        valid: true,
        drawer: null,
        dialog: false,
        menus: menus,
      }
    }
  }
</script>
<style>
  .margin-right {
    margin-right: 0px;
  }
</style>


