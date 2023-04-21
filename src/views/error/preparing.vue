<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-layout fluid fill-height pa-0>
      <v-layout align-start justify-center>
        <v-flex xs10 sm8 md6 lg6>
          <v-card height="200" class="elevation-0"> </v-card>
          <v-card height="460" class="elevation-0">
            <!-- 에러 이미지 -->
            <div class="d-flex flex-column justify-center">
              <svg-icon class="text-h1 mb-4" icon-class="preparing"></svg-icon>
              <v-card-title class="justify-center">
                <b>서비스 준비중입니다.</b>
              </v-card-title>
              <!-- 서브 에러 메시지 -->
              <v-card-subtitle class="sub_title--text text-center mb-4">
                <b
                  >보다 나은 서비스 제공을 위하여 페이지 준비중에 있습니다. <br />
                  빠른 시일내에 준비하여 찾아뵙겠습니다.</b
                >
              </v-card-subtitle>
            </div>
            <!-- <v-divider />
            버튼
            <v-card-actions class="px-0">
              <v-btn text color="primary" class="px-2 rounded-0 font-weight-bold" @click="goMain()">
                <v-icon class="pb-1">mdi-home</v-icon> {{ $t('back') }}</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn color="primary" icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-divider />
            상세내용 구역
            <v-expand-transition>
              <div v-show="show">
                <v-card-text class="sub_title--text px-2">
                  <v-row class="ma-0">
                    {{ $t('errorMsg1') }}
                  </v-row>
                  <v-row class="ma-0">
                    {{ $t('errorMsg2') }}
                  </v-row>
                  <v-row class="ma-0">
                    {{ $t('errorMsg3') }}
                  </v-row>
                </v-card-text>
              </div>
            </v-expand-transition> -->
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'preparing',
  data: () => ({
    show: false
  }),
  created() {
    // 다국어 store 등록
    this.setLocale()
  },
  methods: {
    back() {
      this.$router.go(-2).catch(() => {})
    },
    goMain() {
      let toRouter = {
        path: '/dashboard',
        name: 'dashboard',
        query: { menuid: '0001', lvl: 0 }
        //meta: { proc_cd: to.proc_cd, title: to.title, affix: to.affix }
      }
      this.$router.push(toRouter).catch(error => {
        if (error.name === 'NavigationDuplicated') {
          console.log('router NavigationDuplicated')
        } else console.log(error)
      })
    },

    // 다국어 세팅
    setLocale() {
      if (!this.$localStore.get('locale')) {
        this.$localStore.set('locale', this.$vuetify.lang.current)
      } else {
        if (this.$localStore.get('locale') == 'ko') {
          this.$vuetify.lang.current = 'ko'
          this.$i18n.locale = 'ko'
        } else {
          this.$vuetify.lang.current = 'en'
          this.$i18n.locale = 'en'
        }
      }
    }
  }
}
</script>

<style scoped>
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background: #fff;
}
</style>
