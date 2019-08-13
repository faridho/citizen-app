<template>
  <div>
    <v-list two-line subheader>
      <v-subheader inset></v-subheader>
      <v-list-tile
        v-for="item in mainlist" :key="item.id"
        rel="noopener nofollow"
        ripple
        @click="detail(item.id, $event.target)"
        avatar>
        <v-list-tile-avatar>
          <v-icon>mdi-account-circle mdi-48px </v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.nama_kepala_keluarga }}</v-list-tile-title>
          <v-list-tile-sub-title><strong>No Rumah: </strong> {{ item.no_rumah }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon color="warning">mdi-file-document-edit</v-icon>
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
          <h3>Detail Retribusi Kebersihan</h3>
        </v-card-title>
        <v-card-text>
          <h4>{{ nama }}</h4>
          <v-list>
            <v-list-group
              v-for="list in lists"
              :key="list.title"
              v-model="list.active"
              :prepend-icon="list.action"
              no-action>
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ list.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>

              <v-list-tile
                v-for="subItem in list.items"
                :key="subItem.id"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.bulan }}/{{ subItem.tahun }} - {{ subItem.nominal }} </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
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
      mainlist: [],
      lists: [],
      nama: ''
    }),

    mounted() {
      this.getData();
      eventBus.$on('DATA_LOADED', this.getData);
    },

    methods: {
      async getData() {
        const result = await axios
          .get(URL + '/master/datakepalakeluarga')
          .then(response => response.data.data);

        this.mainlist = result;
      },


      async detail(target) {
        this.dialog = true;

        const cash = await axios
          .get(URL + '/retribusi/kebersihanprofile/'  + target + '/cash')
          .then(response => response.data.data);

        const transfer = await axios
          .get(URL + '/retribusi/kebersihanprofile/'  + target + '/transfer')
          .then(response => response.data.data);

        const detail = await axios
          .get(URL + '/master/datakepalakeluarga/' + target)
          .then(response => response.data.data)
        
        this.nama = detail.nama_kepala_keluarga;
        this.lists = [
          {
            action: 'mdi-cash',
            title: 'Cash',
            active: true,
            items: cash
          },
          {
            action: 'mdi-cash-register',
            title: 'Transfer',
            items: transfer
          },
        ]
      },

      close() {
        this.dialog = false;
      }
    }
  }
</script>
