<template>
  <v-snackbar
    v-model="snackbar"
    top>
    {{ title }}
    <v-btn
      color="warning"
      flat
      @click="closeSnackbar">
      Tutup
    </v-btn>
  </v-snackbar>
</template>
<script>
import Vue from 'vue';

export default {
  data: vm => ({
    snackbar: false,
    title: ''
  }),

  created() {
    Vue.prototype.$snackbar = text => {
      this.title = text;
      this.snackbar = true;
    }
  },

  methods: {
    closeSnackbar() {
      this.snackbar = false;
    }
  }
}
</script>
