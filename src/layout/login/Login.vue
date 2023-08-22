<template>
  <v-container fluid fill-height pa-0 login_container_bg loginStyle>
    <v-layout fluid fill-height pa-10>
      <v-row class="ma-0 container_bg">
        <v-col :cols="windowWidth < 960 ? '12' : '8'" class="pa-0 signIn">
          <v-layout justify-center>
            <v-flex xs10 sm8 md8 lg6>
              <v-card class="elevation-0 pa-0">
                <v-card-text class="text-center px-lg-5 px-6 pb-0 signInCard">
                  <v-img :src="require(`@/assets/images/logo/KIER_logo_login.jpg`)" width="100%" contain max-height="130" class="my-6" />
                  <v-row class="my-15 socialLogin"> </v-row>
                  <v-col class="pa-0">
                    <h4>{{ signText.signInInfo }}</h4>
                  </v-col>
                  <v-row class="signInForm">
                    <v-col cols="9" sm="12" class="pa-0">
                      <v-form class="pt-1">
                        <v-text-field
                          v-model="userData.userId"
                          class="py-3 my-5"
                          solo
                          filled
                          prepend-inner-icon="mdi-account"
                          name="login"
                          autocomplete="off"
                          label="Login"
                          color="login_bg"
                          background-color="#f7f7f7"
                          type="text"
                          @keyup.enter="signIn()"
                        />
                        <v-text-field
                          v-model="userData.userPw"
                          class="py-3 my-5"
                          solo
                          filled
                          prepend-inner-icon="mdi-lock"
                          name="password"
                          id="password"
                          autocomplete="off"
                          label="Password"
                          color="login_bg"
                          background-color="#f7f7f7"
                          :type="value ? 'password' : 'text'"
                          :append-icon="value ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
                          @click:append="() => (value = !value)"
                          @keyup.enter="signIn"
                        />
                      </v-form>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-col class="pa-0 py-10 mt-10 login_bg--text textButton">
                  <h4 @click="forgetPassword">{{ signText.forgetPassword }}</h4>
                  <v-col v-if="windowWidth < 960" class="pa-0 pt-5">
                    <h4 @click="signUp">{{ signText.NotYetMember }}</h4>
                  </v-col>
                </v-col>
                <v-row class="ma-0 pb-10 signInButton">
                  <v-col class="pa-0 mx-2">
                    <v-btn block x-large color="login_bg" dark class="text-h6 font-weight-bold my-3" @click="signIn">{{ $t('login') }}</v-btn>
                  </v-col>
                  <!-- <v-col class="pa-0 mx-2">
                    <v-btn block x-large outlined color="white" class="text-h6 font-weight-bold my-3 login_bg--text" @click="goMain">{{
                      $t('goToMain')
                    }}</v-btn> 
                  </v-col> -->
                </v-row>
              </v-card>
            </v-flex>
          </v-layout>
        </v-col>
        <v-col v-if="windowWidth > 960" cols="4" class="pa-0 login_bg signUp">
          <v-col class="pa-0">
            <v-col class="pa-0">
              <h2>{{ signText.hello }}</h2>
            </v-col>
            <v-col class="pa-0 my-10">
              <h3>{{ signText.NotYetMember }}</h3>
            </v-col>
            <v-col>
              <!-- <v-btn block x-large color="white" class="text-h6 font-weight-bold login_bg--text" @click="signUp()">{{ $t('signUp') }}</v-btn> -->
            </v-col>
          </v-col>
        </v-col>
      </v-row>
    </v-layout>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="error" top>
      {{ msg }}
    </v-snackbar>
  </v-container>
</template>
<script>
import { fn_AutoLogin, fn_Login, fn_LoginSuccess } from '@/framework/login/login'
import { AesEncrypt, AesDecrypt } from '@/utils/aes256' //cyrptojs 적용(aes256) by lyj 20220404
import { getLogin } from '@/api/kier/system/Login'

export default {
  data() {
    return {
      userData: {
        userId: '',
        userPw: '',
      },
      signText: {
        signInInfo: '',
        forgetPassword: '',
        hello: 'Warehouse Management System',
        NotYetMember: '',
      },
      windowWidth: '',
      snackbar: false,
      msg: '',
      timeout: 5000,
      value: String,
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
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    // 로그인

    signIn() {
      getLogin(this.userData).then((res) => {
        if (res.success) {
          sessionStorage.setItem('userNm', res.listResponse.map.userNm)
          sessionStorage.setItem('userCd', res.listResponse.map.userCd)
          sessionStorage.setItem('compId', res.listResponse.map.compId)
          sessionStorage.setItem('menuGrpCd', res.listResponse.map.menuGrpCd)
          this.$store.commit('Set_isLogin', true)

          fn_LoginSuccess()
        } else {
          if (this.userData.userPw == '') {
            this.snackbar = true
            this.msg = '비밀번호를 입력해주십시오'
          }
          if (this.userData.userId == '') {
            this.snackbar = true
            this.msg = '아이디를 입력해주십시오'
          } else {
            this.snackbar = true
            this.msg = '아이디 혹은 비밀번호가 일치하지않습니다'
          }
        }
      })
    },
    signUp() {
      alert('회원가입')
    },
    forgetPassword() {
      alert('비밀번호 찾기')
    },
    goMain() {
      alert('메인으로')
    },
    // 윈도우의 가로 크기를 담을 변수
    handleResize(e) {
      this.windowWidth = window.innerWidth
    },
    // 다국어 세팅 & 윈도우 창 넒이 세팅
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
      // 시작 창 넒이를 확인하기 위한 세팅
      this.windowWidth = window.innerWidth
    },
    changeTheme(theme) {
      if (theme) {
        this.$localStore.set('theme', 'dark')
      } else {
        this.$localStore.set('theme', 'light')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.socialLogin {
  place-content: center;
  > div {
    padding-top: 7px !important;
    max-width: 45px;
    height: 45px;
    border: 2px solid #e1e1e1;
    border-radius: 30px;
    cursor: pointer;
  }
}
</style>