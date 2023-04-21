<template>
  <v-card>
    <v-card-title class="font-weight-bold app_bar_title--text app_bar_bg">
      {{ $t(dialogTitle) }}
      <v-spacer></v-spacer>
      <v-btn icon color="card_title" height="auto" @click="$emit('hide')">
        <v-icon>$close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="pa-0">
      <slot name="dialogBody">
        {{  }}
      </slot>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'i-dialog-info',
    props: {
      dialogTitle: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style>

</style>