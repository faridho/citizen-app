<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Daftar Kepala Keluarga</h4>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-file-find-outline"
          label="Pencarian"
          single-line
          hide-details></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.kode_warga }}</td>
            <td class="text-xs-left">{{ props.item.nama_kepala_keluarga }}</td>
            <td class="text-xs-left">{{ props.item.no_kk }}</td>
            <td class="text-xs-left">{{ props.item.telepon }}</td>
            <td class="text-xs-left">{{ props.item.no_rumah }}</td>
            <td class="text-xs-left">{{ props.item.status_rumah }}</td>
            <td class="text-xs-right">{{ props.item.penghasilan }}</td>
            <td class="text-xs-right">
              <v-icon color="warning" @click="detail(props.item.id)">mdi-file-eye</v-icon>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
      <v-dialog
        v-model="dialog"
        fullscreen
          hide-overlay
          transition="dialog-bottom-transition">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title>
            Daftar Keluarga
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headersWarga"
              :items="warga"
              class="elevation-1">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.nama_lengkap }}</td>
                <td class="text-xs-left">{{ props.item.no_ktp }}</td>
                <td class="text-xs-left" v-if="props.item.jenis_kelamin === 1">Laki-Laki</td>
                <td class="text-xs-left" v-else>Perempuan</td>
                <td class="text-xs-left">{{ props.item.agama }}</td>
                <td class="text-xs-left">{{ props.item.tempat_lahir }}</td>
                <td class="text-xs-left">{{ props.item.tanggal_lahir }}</td>
                <td class="text-xs-left">{{ props.item.status_warga }}</td>
                <td class="text-xs-left">{{ props.item.pekerjaan }}</td>
                <td class="text-xs-right">{{ props.item.penghasilan }}</td>
              </template>
            </v-data-table>
          </v-card-text>
          <iframe width="100%" height="450" frameborder="0" style="border:0" :src="'https://www.google.com/maps/embed/v1/place?q=' + lat + ',' + lng + '&amp;key=AIzaSyBBpZdO5eQYk1-4ny7IlQBJyAOYAKH4PxI'"></iframe>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="warning"
              block
              @click="close">
              Tutup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
  import axios from 'axios'
  import URL from '@/api/url'

  export default {
    data() {
      return {
        search: '',
        dialog: false,
        headers: [
          {
            text: 'Kode Kepala Keluarga',
            align: 'left',
            sortable: false,
            value: 'kode_warga'
          },
          {
            text: 'Nama Kepala Keluarga',
            align: 'left',
            sortable: false,
            value: 'nama_kepala_keluarga'
          },
          {
            text: 'No Kartu Keluarga',
            align: 'left',
            sortable: false,
            value: 'no_kk'
          },
          {
            text: 'No Telp.',
            align: 'left',
            sortable: false,
            value: 'telepon'
          },
          {
            text: 'No Rumah',
            align: 'left',
            sortable: false,
            value: 'no_rumah'
          },
          {
            text: 'Status Rumah',
            align: 'left',
            sortable: false,
            value: 'status_rumah'
          },
          {
            text: 'Penghasilan',
            align: 'right',
            sortable: false,
            value: 'penghasilan'
          },
          {
            text: 'Detail',
            align: 'left',
            sortable: false,
            value: 'detail'
          },
        ],

        headersWarga: [
          { text: 'Nama Lengkap', value: 'nama_lengkap' },
          { text: 'No KTP', value: 'no_ktp' },
          { text: 'Jenis Kelamin', value: 'jenis_kelamin' },
          { text: 'Agama', value: 'agama' },
          { text: 'Tempat Lahir', value: 'tempat_lahir' },
          { text: 'Tanggal Lahir', value: 'tanggal_lahir' },
          { text: 'Status Warga', value: 'status_warga' },
          { text: 'Pekerjaan', value: 'pekerjaan' },
          { text: 'Penghasilan', align: 'right', value: 'penghasilan' },
        ],

        items: [],
        warga: [],

        lat: '',
        lng: '',
        map: ''
      }
    },

    mounted() {
      this.getData();
    },

    methods: {
      async getData() {
        const result = await axios
          .get(URL + '/dashboard/kepalakeluarga')
          .then(response => response.data.data);

        this.items = result;
      },

      async detail(id) {
        this.dialog = true;

        const result = await axios
          .get(URL + '/dashboard/warga/' + id)
          .then(response => response.data.data);

        const warga = await axios
          .get(URL + '/master/datakepalakeluarga/' + id)
          .then(response => response.data.data);
        this.lat = warga.lat;
        this.lng = warga.lng;
        this.warga = result;

        this.map = 'https://www.google.com/maps/embed/v1/place?q="' + warga.lat + ',' + warga.lng + '&amp;key=AIzaSyBBpZdO5eQYk1-4ny7IlQBJyAOYAKH4PxI';
      },

      close() {
        this.dialog = false;
      }
    }
  }
</script>
