<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="warning">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field 
                    v-model="username" 
                    prepend-icon="mdi-account" 
                    label="Username"
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field 
                    v-model="password"
                    prepend-icon="mdi-account-key" 
                    label="Password" 
                    :rules="nameRules"
                  type="password"
                ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="warning" :loading="loading" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Vue from "vue"
  import URL from '@/api/url'
  import axios from "axios"
  import VueRouter from 'vue-router'
  import VueCookies from "vue-cookies"
  Vue.use(VueCookies, VueRouter)
  export default {
    data: () => ({
      valid: true,
      loading: false,

      username: '',
      password: '',
      nameRules: [v => !!v || "Kolom wajib diisi"],
    }),

    mounted() {
      if (VueCookies.get("session")) {
        if (VueCookies.get("session").token) {
          this.$router.push('/home');
          window.location.reload
        }
      }
    },

    methods: {
      async login() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          const payload = {
            username: this.username,
            password: this.password,
          }

          const storing = await axios
            .post(URL + '/dashboard/login', payload, undefined)
            .then(response => response.data);

          if (storing.status === true) {
            var session = {
              id: storing.data.id,
              username: storing.data.username
            };

            this.$cookies.set("session", session, "1w");

            this.loading = false;

            this.$router.push({name: 'home'}) 
          } else {
            this.loading = false;
          }
          this.$snackbar(storing.message);
        }
      }
    },  

    
  }
</script>