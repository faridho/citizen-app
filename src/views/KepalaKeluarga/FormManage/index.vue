<template>
  <div>
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
            <v-toolbar-title class="white--text">Data Kepala Keluarga</v-toolbar-title>
          </v-toolbar>
          <MasterList />
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import eventBus from '@/views/eventBus'
import URL from '@/api/url'
import MasterList from './List'
import menus from '@/api/menu'
import axios from 'axios'
import Vue from 'vue'
import money from 'v-money'

Vue.use(money, { precision: 4 })
export default {
  data: () => ({
    drawer: null,
    menus: menus,
  }),

  components: {
    MasterList
  }
}
</script>

