<template>
  <v-container fluid fill-height pa-0 container_bg>
    <v-app-bar dark absolute color="app_bar_bg">
      <v-spacer></v-spacer>
      <v-switch v-model="$vuetify.theme.dark" class="mt-2" @change="changeTheme($vuetify.theme.dark)"></v-switch>
    </v-app-bar>

    <!-- dark 테마일 경우 나오는 layout -->
    <v-layout fluid fill-height pa-0 v-if="$vuetify.theme.dark">
      <v-layout align-center justify-center>
        <v-flex xs10 sm6 md4 d-md-flex d-lg-flex d-sm-block>
          <div class="align-self-center flex-grow-0 flex-shrink-0">
            <v-img :src="require(`@/assets/images/ci/iwelding_symbol_w.png`)" width="100%" max-height="110px" contain />
          </div>
          <div class="flex-grow-1 flex-shrink-0  px-1 px-md-6 px-lg-8">
            <v-card-text class="text-centerpt-16 pa-0">
              <v-card-text class="mt-5 text-lg-left text-h6 text-lg-h5 font-weight-bold text-center" color="text_base">
                Welcome to Iwelding!</v-card-text>
              <v-form class="pt-5">
                <v-text-field v-model="userData.userId" class="mt-5" dark outlined prepend-inner-icon="$person" name="login" autocomplete="off"
                  label="Login" type="text" @keyup.enter="signIn()"></v-text-field>
                <v-text-field v-model="userData.userPassword" class="mt-5" dark outlined prepend-inner-icon="$lock" name="password" id="password" autocomplete="off"
                  label="Password" type="password" @keyup.enter="signIn()"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pa-0">
              <v-spacer></v-spacer>
              <v-btn block x-large color="secondary" class="text-h6 font-weight-bold mt-5" @click="signIn()">{{ $t('login') }}</v-btn>
            </v-card-actions>
            <v-checkbox class="mt-5" dark :label="$t('autoLogin')" />
          </div>
        </v-flex>
      </v-layout>
    </v-layout>
    <!-- </v-container> -->

    <!-- light 테마일 경우 나오는 layout -->
    <v-layout fluid fill-height pa-0 v-else>
      <img :src="require(`@/assets/images/bg/login_bg.jpg`)" class="login-bg-light" />
      <v-layout align-center justify-center>
        <v-flex xs10 sm6 md3>
          <v-card class="elevation-12 pb-10">
            <v-img :src="require(`@/assets/images/bg/login_bg_light.png`)" class="align-self-start" cover>
              <v-card-text class="text-center px-lg-15 px-6 pt-16 pb-0">
                <v-img :src="require(`@/assets/images/ci/iwelding_logo.png`)" width="100%" class="mb-15" />
                <v-form class="pt-1">
                  <v-text-field v-model="userData.userId" class="py-3" solo prepend-inner-icon="mdi-account" name="login" autocomplete="off"
                    label="Login" type="text" @keyup.enter="signIn()"></v-text-field>
                  <v-text-field v-model="userData.userPassword" class="py-3" solo prepend-inner-icon="mdi-lock" name="password" id="password" autocomplete="off"
                    label="Password" type="password" @keyup.enter="signIn()"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="px-lg-15 px-6">
                <v-spacer></v-spacer>
                <v-btn block x-large color="secondary" class="text-h5" @click="signIn()">{{ $t('login') }}</v-btn>
              </v-card-actions>
              <v-checkbox class="px-lg-15 px-6" v-model="checkbox2" :label="$t('autoLogin')" />
            </v-img>
          </v-card>
        </v-flex>
        <p class="copy font-weight-light white--text mb-0 text-caption">
          Copyright©IWELDING All Rights reserved
        </p>
      </v-layout>
    </v-layout>    
    <v-snackbar v-model="snackbar" :timeout="timeout" color="error" top>
      {{ msg }}
    </v-snackbar>
  </v-container>
</template>
<script>
  import {
    fn_AutoLogin,
    fn_DomainList,
    fn_Login,
    fn_LoginSuccess
  } from '@/framework/login/login'

  export default {
    data() {
      return {
        domaincd: '',
        domainStatusCd: '0000',
        domainData: {
          id: 'domainData',
          ref: 'domainData',
          value: 'iwelding',
          itemList: []
        },
        userData: {
          userId: '',
          userPassword: '',
          isAutoLogin: false
        },
        checkbox2: false,
        isAutoLogin: false,

        snackbar: false,
        msg: '',
        timeout: 2000,
      }
    },
    created() {
      // 자동로그인 체크여부
      this.isAutoLogin = fn_AutoLogin()
      // 도메인 리스트 호출
      this.getDomainList(this.domainStatusCd, this.domaincd)
      // 테마 store 등록
      this.setTheme()
      // 다국어 store 등록
      this.setLocale()
    },
    methods: {
      // 로그인
      signIn() {
        fn_Login(this.domainData, this.userData)
        .then(res => {
            if(res.result){
              fn_LoginSuccess()
            }else{
              this.snackbar = true
              this.msg = res.msg
            }
        })
      },
      // 도메인 중복 체크를 위한 데이터 셋
      getDomainList(domainStatusCd, domaincd) {
        fn_DomainList(domainStatusCd, domaincd)
      },
      // 테마 세팅
      setTheme() {
        if (!this.$localStore.get('theme')) {
          this.$localStore.set('theme', this.$envs.framework.template.theme)
        } else {
          if (this.$localStore.get('theme') == 'dark') {
            this.$vuetify.theme.dark = true
          } else {
            this.$vuetify.theme.dark = false
          }
        }
      },
      // 다국어 세팅
      setLocale(){
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
      },
      changeTheme(theme) {
        if (theme) {
          this.$localStore.set('theme', 'dark')
        } else {
          this.$localStore.set('theme', 'light')
        }
      }
    }
  }
</script>

<style scoped>
  .login-bg-dark {
    position: fixed;
    background: #464543;
  }

  .login-bg-light {
    position: fixed;
    background-size: cover !important;
  }

  .copy {
    position: absolute;
    bottom: 5%;
  }
</style>