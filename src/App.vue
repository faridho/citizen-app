<template>
  <v-app id="inspire">
    <router-view></router-view>
    <Snackbar />
  </v-app>
</template>

<script>
import Drawer from '@/components/Drawer';
import Snackbar from '@/components/Snackbar';

export default {
  components: {
    Drawer,
    Snackbar
  }
}
</script>
