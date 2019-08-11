<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>LPJ Dana</h4>
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
            <td class="text-xs-right">{{ props.item.jumlah_pengeluaran }}</td>
            <td class="text-xs-left">{{ props.item.keterangan }}</td>
            <td class="text-xs-left">{{ props.item.tgl_keluar }}</td>
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
            text: 'Jumlah Pengeluaran',
            align: 'right',
            sortable: false,
            value: 'jumlah_pengeluaran'
          },
          {
            text: 'Keterangan',
            align: 'left',
            sortable: false,
            value: 'keterangan'
          },
          {
            text: 'Tgl Keluar',
            align: 'left',
            sortable: false,
            value: 'tgl_keluar'
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
          .get(URL + '/anggaran/getdanatetap')
          .then(response => response.data.data);

        this.items = result;
      },
    }
  }
</script>
