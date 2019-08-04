<template>
  <div>
    <v-tabs
      color="default"
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
        <TabData :tab="index" :title="tab"/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
  import TabData from './Tab'
  export default {
    data() {
      return {
        tabs: ['Warga Pribumi', 'Warga Temporary']
      }
    },

    components: {
      TabData 
    }
  
  }
</script>
