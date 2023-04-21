<template>
  <v-container fluid fill-height pa-0 login_container_bg loginStyle>
    <!-- light 테마일 경우 나오는 layout -->
    <v-layout fluid fill-height pa-10>
      <v-layout justify-center>
        <v-flex xs10 sm8 md8 lg6>
          <v-card class="elevation-0 pb-10">
            <v-card-text class="text-center px-lg-15 px-6 pb-0">
              <v-img :src="require(`@/assets/images/logo/khnp_logo.png`)" width="100%" contain max-height="130" class="mb-6" />
              <v-form class="pt-1">
                <v-text-field
                  v-model="userData.usercd"
                  class="py-3 my-3"
                  outlined
                  prepend-inner-icon="mdi-account"
                  name="login"
                  autocomplete="off"
                  label="Login"
                  color="primary"
                  type="text"
                  @keyup.enter="signIn()"
                ></v-text-field>
                <v-text-field
                  v-model="userData.userps"
                  class="py-3 my-3"
                  outlined
                  prepend-inner-icon="mdi-lock"
                  name="password"
                  id="password"
                  color="primary"
                  autocomplete="off"
                  label="Password"
                  :type="value ? 'password' : 'text'"
                  :append-icon="value ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
                  @click:append="() => (value = !value)"
                  @keyup.enter="signIn()"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="px-lg-15 px-6">
              <v-spacer></v-spacer>
              <v-btn block x-large color="primary" class="text-h6 font-weight-bold my-3" @click="signIn()">{{ $t('login') }}</v-btn>
            </v-card-actions>
            <!-- <v-checkbox class="px-lg-15 px-6" v-model="userData.isAutoLogin" :label="$t('autoLogin')" /> -->
          </v-card>
        </v-flex>
      </v-layout>     
    </v-layout>

    <v-snackbar v-model="snackbar" :timeout="timeout" color="error" top>
      {{ msg }}
    </v-snackbar>
  </v-container>
</template>
<script>
import { fn_AutoLogin, fn_Login, fn_LoginSuccess } from '@/framework/login/login'
import { AesEncrypt, AesDecrypt } from '@/utils/aes256' //cyrptojs 적용(aes256) by lyj 20220404

export default {
  data() {
    return {
      userData: {
        usercd: '',
        userps: '',
        isAutoLogin: false
      },
      snackbar: false,
      msg: '',
      timeout: 5000,
      value: String
    }
  },
  created() {
    // 자동로그인 체크여부
    //this.userData.isAutoLogin = fn_AutoLogin()
    // 도메인 리스트 호출
    // this.getDomainList(this.domainStatusCd, this.domaincd)
    // 테마 store 등록
    // 다국어 store 등록
    this.setLocale()
  },
  methods: {
    // 로그인
    signIn() {
      fn_Login(this.userData).then(res => {
        if (res.result) {
          fn_LoginSuccess()
        } else {
          this.snackbar = true
          this.msg = res.msg
        }
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
