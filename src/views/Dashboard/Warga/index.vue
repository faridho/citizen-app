<template>
  <div>
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
    <v-toolbar color="warning" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Kelurahan Kemanggisan</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap>
          <v-flex xs12>
            <MainTable />
          </v-flex>
          <v-flex xs6 style="margin-top: 10px;">
            <ChartGender />
          </v-flex>
          <v-flex xs6 style="margin-top: 10px;">
            <ChartAge />
          </v-flex>
          <v-flex xs6 style="margin-top: 10px;">
            <ChartRevenue />
          </v-flex>
          <v-flex xs6 style="margin-top: 10px;">
            <ChartJob />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>
<script>
  import eventBus from '@/views/eventBus'
  import URL from '@/api/url'
  import menus from '@/api/menu'
  import VueCookies from 'vue-cookies'
  import MainTable from './components/MainTable'
  import ChartGender from './components/ChartGender'
  import ChartAge from './components/ChartAge'
  import ChartRevenue from './components/ChartRevenue'
  import ChartJob from './components/ChartJob'

  export default {
    data() {
      const user = VueCookies.get('session');
      return {
        username: user.username,
        valid: true,
        drawer: null,
        dialog: false,
        menus: menus,
      }
    },

    components: {
      MainTable,
      ChartGender,
      ChartAge,
      ChartRevenue,
      ChartJob
    }
  }
</script>
<style>
  .margin-right {
    margin-right: 0px;
  }
</style>


