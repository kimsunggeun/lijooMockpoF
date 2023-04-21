import '@mdi/font/css/materialdesignicons.css' // material design icons
import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/lib/util/colors'

import '@/assets/theme/vuetify/scss/khnp.scss' // Custom
import '@/assets/theme/vuetify/scss/tagview.scss' // tagview
import theme from '@/assets/theme/vuetify/js/khnpColorTable' // color table

import ko from '@/i18n/vuetify/ko' // vuetify i18n
import en from '@/i18n/vuetify/en' // vuetify i18n

const opts = {
  theme: theme.theme,
  icons: theme.icons,
  lang: {
    locales: { ko, en },
    current: 'ko'
  }
}

Vue.use(Vuetify)

export default new Vuetify(opts)
