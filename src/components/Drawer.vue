<template>
  <div>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app>
      <v-list 
        dense
      >
        <v-list-tile 
          v-for="menu in menus" :key="menu.title"
          :to="menu.href"
          rel="noopener nofollow"
          ripple
        >
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
  </div>
</template>
<script>
import menus from '@/api/menu';
export default {
  data: () => ({
    drawer: null,
    menus: menus
  }),
}
</script>
