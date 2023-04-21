<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" :top="top">
    {{ msg }}
  </v-snackbar>
</template>

<script>
  export default {
    name: 'i-dialog-info',
    props: {
      snackbar: {
        type: Boolean,
        default: false,
      },
      timeout: {
        type: Number,
        default: 2000,
      },
      color: {
        type: String,
        default: 'Primary',
      },
      top: {
        type: Boolean,
        default: false,
      },
      msg: {
        type: String,
        default: '',
      },
    }
  }
</script>

<style>

</style>