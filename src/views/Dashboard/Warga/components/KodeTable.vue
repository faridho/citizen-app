<template>
  <div>
    <v-card>
      <v-card-title>
        <h4>Daftar Kode Warga</h4>
        <v-btn
          color="warning"
          @click="newData">Tambah Kode warga</v-btn>
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
            <td class="text-xs-left">{{ props.item.nama_warga }}</td>
            <td class="text-xs-left">{{ props.item.kode }}</td>
            <td class="text-xs-right">
              <v-icon color="warning" @click="print(props.item.id)">mdi-file-pdf</v-icon>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
      <v-dialog
        v-model="create"
        width="700">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title>
            TAMBAH KODE WARGA
          </v-card-title>
          <v-card-text class="text-lg-center">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="nama_warga"
                  label="Nama Warga">
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="kode_warga"
                  label="Kode Warga">
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn :loading="loading" block color="warning" @click="submit">Simpan</v-btn>
            <v-btn
              color="warning"
              flat
              @click="closeCreate">
              Tutup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialog"
        width="700">
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title>
            KODE WARGA
          </v-card-title>
          <v-card-text class="text-lg-center">
            <h3>{{ nama_warga }}</h3>
            <h1>{{ kode_warga }}</h1>
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
  import eventBus from '@/views/eventBus'
  import axios from 'axios'
  import URL from '@/api/url'

  export default {
    data() {
      return {
        search: '',
        create: false,
        dialog: false,
        loading: false,
        headers: [
          {
            text: 'Nama Kepala Keluarga',
            align: 'left',
            sortable: false,
            value: 'nama_warga'
          },
          {
            text: 'Kode Warga',
            align: 'left',
            sortable: false,
            value: 'kode_warga'
          },
          {
            text: 'Detail',
            align: 'left',
            sortable: false,
            value: 'print'
          },
        ],
        items: [],

        id: '',
        nama_warga: '',
        kode_warga: ''
      }
    },

    mounted() {
      this.getData();
      eventBus.$on('DATA_LOADED', this.getData);
    },

    methods: {
      async getData() {
        const result = await axios
          .get(URL + '/master/kodewarga')
          .then(response => response.data.data);

        this.items = result;
      },

      async print(id) {
        this.dialog = true;

        const detail = await axios
          .get(URL + '/master/kodewarga/' + id)
          .then(response => response.data.data);

        this.id = detail.id;
        this.nama_warga = detail.nama_warga;
        this.kode_warga = detail.kode;

      },

      async submit() {
        this.loading = true;
        const payload = {
          namaWarga: this.nama_warga,
          kodeWarga: this.kode_warga
        }

        const storing = await axios
          .post(URL + '/master/insertkode', payload, undefined)
          .then(response => response.data);

        if (storing.status === true) {
          this.dialog = false;
          this.loading = false;
          eventBus.$emit('DATA_LOADED');
          this.$snackbar(storing.message);
        } else {
          this.loading = false;
          this.$snackbar(storing.message);
        }
      },

      close() {
        this.dialog = false;
      },

      closeCreate() {
        this.create = false;
      },

      newData() {
        this.create = true;
      }

    }
  }
</script>
