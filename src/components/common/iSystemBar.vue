<template>
  <div>
    <v-system-bar id="systemBar" v-show="IsShow" dark lights-out color="red lighten-1 tooltip">
      <v-icon>mdi-play</v-icon>
      <span>{{ errorMessage }}</span>
      <v-spacer></v-spacer>
      <v-btn class="pa-0" icon x-small @click="close">
        <v-icon dark>
          mdi-close
        </v-icon>
      </v-btn>
      <div class="v-system-bar v-system-bar--lights-out theme--dark red lighten-1" id="systemBar" style="height: 24px;">
        <!-- <i aria-hidden="true" class="v-icon notranslate mdi mdi-play theme--dark"></i>
        <span>오류ID: -2000메세지: 조회결과가 없습니다.</span> -->
        <div class="spacer"></div>
      </div>
    </v-system-bar>
  </div>
</template>
<script>
export default {
  name: 'i-system-bar',
  data: () => ({ bShow: true, error: { code: '200', message: '' } }),
  computed: {
    IsShow() {
      return this.bShow
    },
    errorMessage() {
      if (this.error.code == '200') {
        this.bShow = false
        return ''
      } else {
        this.bShow = true
        return 'code : ' + this.error.code + ', message : ' + this.error.message
      }
    }
  },
  mounted() {
    this.bShow = true
  },
  methods: {
    close() {
      this.bShow = false
    }
  }
}
</script>
<style scoped>
#systemBar {
  height: 0 !important;
}
</style>
