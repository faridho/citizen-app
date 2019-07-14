<template>
  <div>
    <MasterForm />
  </div>
</template>
<script>
import MasterForm from './FormManage'
export default {
  data: () => ({
    dialog: false,
  }),

  components: {
    MasterForm
  }
}
</script>

