<template>
  <v-row :class="color" fill-height>
    <v-col cols="2" class="pa-0 card_title--text card_title_bg">
      <v-layout fill-height justify-center column align-center>
        <slot name="titleIcon" v-if="headerTitleIcon">
          {{ }}
        </slot>
        <p class="text-lg-h6 text-sm-h5 body-1 font-weight-black mb-0">
          {{ $t(headerTitle) }}
        </p>
      </v-layout>
    </v-col>
    <v-divider class="mx-2" v-if="divider"></v-divider>
    <v-col cols="10" class="pa-0">
      <slot name="body">
        {{  }}
      </slot>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'i-card-horizontal',
    props: {
      headerTitle: {
        type: String,
        default: '제목',
      },
      headerTitleIcon: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: 'card_bg',
      },
      divider: {
        type: Boolean,
        default: false,
      }
    }
  }
</script>

<style>

</style>