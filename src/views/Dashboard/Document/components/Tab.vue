<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Daftar Permintaan Dokumen {{ title }}</h4>
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
            <td class="text-xs-left">{{ props.item.nama_lengkap }}</td>
            <td class="text-xs-left">{{ props.item.jenis_dokumen }}</td>
            <td class="text-xs-left">{{ props.item.keperluan }}</td>
            <td class="text-xs-right">{{ props.item.biaya }}</td>
            <td class="text-xs-left">{{ props.item.tgl_permintaan }}</td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
  import eventBus from '@/views/eventBus'
  import URL from '@/api/url'
  import axios from 'axios'

  export default {
    props: {
      tab: Number,
      title: String
    },

    data: () => ({
      items: [],

      headers: [
        {
          text: 'Nama Lengkap',
          align: 'left',
          sortable: false,
          value: 'nama_lengkap'
        },
        {
          text: 'Jenis Dokumen',
          align: 'left',
          sortable: false,
          value: 'jenis_dokumen'
        },
        {
          text: 'Keperluan',
          align: 'left',
          sortable: false,
          value: 'keperluan'
        },
        {
          text: 'Biaya',
          align: 'right',
          sortable: false,
          value: 'biaya'
        },
        {
          text: 'Tgl Permintaan',
          align: 'left',
          sortable: false,
          value: 'tgl_permintaan'
        },
      ],
    }),

    mounted() {
      this.getData();
      eventBus.$on('DATA_LOADED', this.getData);
    },

    methods: {
      async getData() {
        const data = await axios
          .get(URL + '/document/getall/' + this.tab)
          .then(response => response.data.data);

        this.items = data;
      },


      close() {
        this.dialog = false;
      }
    }

  }
</script>
