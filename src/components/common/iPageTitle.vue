<template>
  <v-col></v-col>
  <!-- <v-col cols="12" class="pa-2">
    <span class="font-weight-black primary--text headline">
      {{ $t(title) }}
    </span>
  </v-col> -->
</template>

<script>
export default {
  name: 'i-page-title',
  props: {
    title: {
      type: String,
      default: '제목없음'
    }
  }
}
</script>
