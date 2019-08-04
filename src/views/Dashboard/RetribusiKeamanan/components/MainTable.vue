<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Data Retribusi Keamanan</h4>
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
            <td class="text-xs-left">{{ props.item.nama_kepala_keluarga }}</td>
            <td class="text-xs-left">{{ props.item.bulan }}</td>
            <td class="text-xs-left">{{ props.item.tahun }}</td>
            <td class="text-xs-right">{{ props.item.nominal }}</td>
            <td class="text-xs-left">{{ props.item.tgl_transaksi }}</td>
          </template>
        </v-data-table>
      </v-card-text>
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
            text: 'Nama Kepala Keluarga',
            align: 'left',
            sortable: false,
            value: 'nama_kepala_keluarga'
          },
          {
            text: 'Bulan',
            align: 'left',
            sortable: false,
            value: 'bulan'
          },
          {
            text: 'Tahun',
            align: 'left',
            sortable: false,
            value: 'tahun'
          },
          {
            text: 'Nominal',
            align: 'right',
            sortable: false,
            value: 'nominal'
          },
          {
            text: 'Tgl Transaksi',
            align: 'left',
            sortable: false,
            value: 'tgl_transaksi'
          },
        ],

        items: [],
  
      }
    },

    mounted() {
      this.getData();
    },

    methods: {
      async getData() {
        const result = await axios
          .get(URL + '/retribusi/keamanan')
          .then(response => response.data.data);

        this.items = result;
      },
    }
  }
</script>
