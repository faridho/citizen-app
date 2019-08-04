<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Daftar Siskamling</h4>
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
            <td class="text-xs-left">{{ props.item.tgl_siskamling }}</td>
            <td class="text-xs-left">{{ props.item.jam_mulai }}</td>
            <td class="text-xs-left">{{ props.item.jam_berakhir }}</td>
            <td class="text-xs-left">
              <v-icon color="warning" @click="personel(props.item.id)">mdi-account-child-circle</v-icon>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
      <v-dialog
        v-model="dialog"
        width="700">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title>
            Daftar Personel
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headersWarga"
              :items="warga"
              class="elevation-1">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.nama_lengkap }}</td>
                <td class="text-xs-left">{{ props.item.status_warga }}</td>
                <td class="text-xs-left">{{ props.item.alasan_status_warga }}</td>
              </template>
            </v-data-table>
          </v-card-text>

          <v-card-title
            class="headline grey lighten-2"
            primary-title>
            Status Siskamling
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headersStatus"
              :items="status"
              class="elevation-1">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.isi_laporan }}</td>
                <td class="text-xs-left">{{ props.item.status_siskamling }}</td>
              </template>
            </v-data-table>
          </v-card-text>
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
            text: 'Tanggal Siskamling',
            align: 'left',
            sortable: false,
            value: 'tgl_siskamling'
          },
          {
            text: 'Jam Mulai',
            align: 'left',
            sortable: false,
            value: 'jam_mulai'
          },
          {
            text: 'Jam Berakhir',
            align: 'left',
            sortable: false,
            value: 'jam_berakhir'
          },
          {
            text: 'Personel',
            align: 'left',
            sortable: false,
            value: 'personel'
          },
        ],

        headersWarga: [
          { text: 'Nama Lengkap', value: 'nama_lengkap' },
          { text: 'Status', value: 'status_warga' },
          { text: 'Alasan', value: 'alasan_status_warga' },
        ],

        headersStatus: [
          { text: 'Isi Laporan', value: 'isi_laporan' },
          { text: 'Status', value: 'status_siskamling' },
        ],

        items: [],
        warga: [],
        status: []
      }
    },

    mounted() {
      this.getData();
    },

    methods: {
      async getData() {
        const result = await axios
          .get(URL + '/siskamling/get')
          .then(response => response.data.data);

        this.items = result;
      },

      async personel(id) {
        this.dialog = true;

        const result = await axios
          .get(URL + '/siskamling/get/' + id)
          .then(response => response.data.data);

        this.warga = result;

        const statusRes = await axios
          .get(URL + '/siskamling/getreport/' + id)
          .then(response => response.data.data);

        this.status = statusRes;
      },

      close() {
        this.dialog = false;
      }
    }
  }
</script>
