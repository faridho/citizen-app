<template>
  <div>
    <v-tabs
      color="warning"
      dark
      slider-color="cyan"
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab"
        ripple
      >
        {{ tab }}
      </v-tab>
      <v-tab-item
        v-for="(tab, index) in tabs"
        :key="index"
      >
        <TabData :tab="index"/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import eventBus from '@/views/eventBus'
import TabData from './Tab'
import URL from '@/api/url'
import axios from 'axios'

export default {
  data: () => ({
    tabs: ['Warga Pribumi', 'Warga Temporary']
  }),

  components: {
    TabData
  }
}
</script>
