import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import envs from '@/envs'
import _ from 'lodash'
import Cookies from 'js-cookie'
import localStore from '@/utils/localStore'
import Layout from '@/layout/layout.vue'

import { getAuthMenuRouteById } from '@/api/kier/system/common/menu'
//

//toastify
import VueToastify from 'vue-toastify'
// vuescroll 추가
// import vuescroll from 'vue-scroll'
import './assets/icons' // icon

// Splitpanes
// import 'splitpanes/dist/splitpanes.css'

// 전체 화면 사용시 레이아웃 감추는 여부 설정
//store.dispatch('SetLayoutHideMode', target.layoutHideMode ? target.layoutHideMode : false)
//vueToastify
Vue.use(VueToastify, {
  position: 'center-center',
  canTimeout: false,
  theme: 'light',
  iconEnabled: true,
  withBackdrop: true
})
// vueDaumPostcode
import VueDaumPostcode from 'vue-daum-postcode'
Vue.use(VueDaumPostcode, { scriptUrl: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' })

// draggable
import { Draggable } from 'draggable-vue-directive'

//Devextreme
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import 'devexpress-diagram/dist/dx-diagram.css'

//Devextreme Grid default setting
import '@/components/options/dxEnvs.js'

// Devextreme 언어 설정
import { locale } from 'devextreme/localization'

Vue.use({
  install(Vue, options) {
    Vue.directive('draggable', Draggable)
  }
})
Vue.use(VueDaumPostcode)

// vue smart widget
import VueSmartWidget from "vue-smart-widget"
Vue.use(VueSmartWidget)

// vuetify theme loading
import vuetify from '@/plugins/vuetify'

// echart 라이브러리 및 테마 로딩
import '@/assets/theme/echart/index.js'

Vue.config.productionTip = false

// 전역 설정
Vue.prototype.$envs = envs
Vue.prototype.$Cookies = Cookies
Vue.prototype.$_ = _
Vue.prototype.$localStore = localStore

//v-mask
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective)

Vue.prototype.$EventBus = new Vue()
// i18n
import VueI18n from 'vue-i18n'
import messages from '@/i18n/custom'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ko', // set locale
  fallbackLocale: 'en',
  messages, // set locale messages
  silentTranslationWarn: true // 언어등록을 안함으로써 뜨는 경고를 제거하기위해 경고를 없앰
})
let DynamicRouteInfo = [] //20220323 BY LYJ [동적 라우팅 처리]
let vm = new Vue({
  router,
  store,
  vuetify,
  i18n,
  //20220323 [동적 라우팅 처리] START [[]]
  data() {
    return {}
  },
  methods: {
    getDynamicRoutes() {
      // getProgramData('')
      //모든 메뉴를 라우팅 구성
      getAuthMenuRouteById({ usercd: 'super', svcGubn: 'W' })
        .then(response => {
          response.list.forEach(route => {
            this.createAndAppendRoute(route)
          })

          //init route
          let newRoute = {
            path: '/',
            redirect: '/dashboard',
            component: Layout,
            children: DynamicRouteInfo
          }
          this.$router.addRoutes([newRoute])
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {})
    },
    createAndAppendRoute: route => {
      //if (route.name == 'dashboard') {

      if (route.svcType == 'P') {
        route.path = '/error'
        route.component = `preparing`
      } else if (route.svcType == 'I') {
        route.path = '/error'
        route.component = `inspection`
      } else if (route.component == '') {
        route.path = '/error'
        route.component = `404`
      }

      let newRoute = {
        path: `/${route.menuId}`,
        //component: () => import('@/views/dashboard/Dashboard.vue'),
        // component: () => import('../../frontend/src/views/dashboard/Dashboard.vue'),
        //component: () => import(`@/views${route.path}/${route.component}.vue`),
        component: () => import(`@/views${route.path}/${route.component}.vue`),
        name: `${route.menuId}`, //`${route.name}_index`,
        // meta: { proc_cd: `${route.progCd}`, title: `${route.progNm}`, affix: `${route.affix}` == 'Y' ? true : false, svcType: route.svcType },
        meta: { proc_cd: `${route.progCd}`, title: `${route.progNm}`, affix: `${route.affix}` == 'Y' ? true : false },
        params: { proc_cd: `${route.progCd}`, title: `${route.progNm}`, affix: `${route.affix}` == 'Y' ? true : false }
        // query: route.name == 'dashboard' ? { tMenu: '1000', lvl: 0 } : undefined
      }

      DynamicRouteInfo.push(newRoute)

      //this.$router.addRoutes([newRoute])
      // }
    }
  },

  created() {
    this.getDynamicRoutes()
    // Devextreme 언어 설정(for 캘린더)
    locale(this.$i18n.locale)
  },
  //20220323 BY LYJ [동적 라우팅 처리] END ]]
  render: h => h(App)
}).$mount('#app')
