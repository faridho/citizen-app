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
            Daftar Warga Temporary
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headersWarga"
              :items="warga"
              class="elevation-1">
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.nama_lengkap }}</td>
                <td class="text-xs-left">{{ props.item.identitas }}</td>
                <td class="text-xs-left" v-if="props.item.jenis_kelamin === 1">Laki-Laki</td>
                <td class="text-xs-left" v-else>Perempuan</td>
                <td class="text-xs-left">{{ props.item.agama }}</td>
                <td class="text-xs-left">{{ props.item.tempat_lahir }}</td>
                <td class="text-xs-left">{{ props.item.tanggal_lahir }}</td>
                <td class="text-xs-left">{{ props.item.kota_asal }}</td>
                <td class="text-xs-left">{{ props.item.pekerjaan }}</td>
                <td class="text-xs-right">{{ props.item.harga_sewa }}</td>
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
            text: 'Detail',
            align: 'left',
            sortable: false,
            value: 'detail'
          },
        ],

        headersWarga: [
          { text: 'Nama Lengkap', value: 'nama_lengkap' },
          { text: 'identitas', value: 'identitas' },
          { text: 'Jenis Kelamin', value: 'jenis_kelamin' },
          { text: 'Agama', value: 'agama' },
          { text: 'Tempat Lahir', value: 'tempat_lahir' },
          { text: 'Tanggal Lahir', value: 'tanggal_lahir' },
          { text: 'Kota Asal', value: 'kota_asal' },
          { text: 'Pekerjaan', value: 'pekerjaan' },
          { text: 'Harga Sewa', align: 'right', value: 'harga_sewa' },
        ],

        items: [],
        warga: [],
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
          .get(URL + '/dashboard/wargatemp/' + id)
          .then(response => response.data.data);

        this.warga = result;
      },

      close() {
        this.dialog = false;
      }
    }
  }
</script>
