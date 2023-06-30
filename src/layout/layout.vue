<template>
  <v-app class="responsive" id="layout">
    <v-container pa-0 ma-0 v-scroll:#layout="handleScroll" :class="windowWidth >= 1420 ? '' : 'reactionContainer'">
      <!-- topbar -->
      <v-app-bar app height="75" elevation="2" clipped-left flat :class="appBarStyle" v-if="!$store.state.app.isScreenFull" id="layoutAppBar">
        <v-row class="transparentSheet">
          <!-- *반응형 이슈* 윈도우 창 크기가 1160 이하가 되면 column 변경 처리 -->
          <v-col :cols="windowWidth <= 1160 ? '6' : '2'" class="pa-1">
            <!-- <v-img v-if="$route.name == 'dashboard' && scrollY <= 70" :src="require(`@/assets/images/ci/kier_logo.png`)" max-width="300" contain to="#" @click="goHome()"
            class="mr-5" style="cursor: pointer" />
          <v-img v-else :src="require(`@/assets/images/ci/kier_logo.png`)" max-width="300" contain to="#" @click="goHome()"
            class="mr-5" style="cursor: pointer" /> -->
            <v-img
              :src="require(`@/assets/images/ci/kier_logo.png`)"
              max-width="300"
              contain
              to="#"
              @click="goHome()"
              class="mr-5"
              style="cursor: pointer"
            />
            <v-spacer />
          </v-col>
          <!-- *반응형 이슈* 윈도우 창 크기가 1160 이하가 되면 숨김 처리 -->
          <v-col v-if="windowWidth >= 1160" cols="7" class="pa-0">
            <!-- {{ active_tab }} -->
            <v-col class="pa-0">
              <v-row class="vAppBar">
                <!-- <v-sheet class="hidden-sm-and-down"> -->
                <v-toolbar-items class="layoutButton">
                  <template v-for="(item, index) in menuList">
                    <div v-if="true" :key="index">
                      <v-menu offset-y open-on-hover transition="slide-y-transition">
                        <template v-slot:activator="{ attrs, on }">
                          <v-btn
                            class="elevation-0 px-4 font-weight-bold"
                            height="100%"
                            v-bind="attrs"
                            v-on="on"
                            :color="'transparent ' + transColorChange"
                            active-class="primary lighten-1"
                          >
                            {{ $t(item.menuNm) }}
                            <!-- i18n -->
                          </v-btn>
                        </template>

                        <v-list class="pa-0 menuRow" color="menu_active_bg">
                          <v-col class="pa-0">
                            <v-row>
                              <v-spacer />
                              <v-col cols="2" class="fill-height pa-0" style="border-left: 1px solid #f5f5f5; left: 0">
                                <v-card class="main_title fill-height d-flex flex-column justify-center pa-3 pl-5" color="menu_top_bg">
                                  <div class="text-h5 font-weight-bold pb-3">
                                    {{ item.menuNm }}
                                  </div>
                                  <div class="line"></div>
                                </v-card>
                              </v-col>
                              <v-col cols="6" class="pa-0 align-center layoutButton">
                                <v-row>
                                  <v-col v-for="(subMenu, index) in item.subMenu" :key="index" cols="3" class="px-3 pa-2">
                                    <v-btn text color="menu_title" class="font-weight-bold text-left text-subtitle-1" @click="TopMenuClick(subMenu)">
                                      {{ $t(subMenu.menuNm) }}
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-spacer />
                            </v-row>
                          </v-col>
                        </v-list>
                      </v-menu>
                    </div>
                    <!-- <div v-else :key="item.id">
                  <v-btn tile :key="item.id" :to="item.to" class="elevation-0 px-5 font-weight-bold" height="100%"
                    color="transparent app_bar_title--text" active-class="primary lighten-1">
                    {{ $t(item.title) }}
                  </v-btn>
                </div> -->
                  </template>
                </v-toolbar-items>
                <!-- </v-sheet> -->
              </v-row>
            </v-col>
          </v-col>
          <!-- *반응형 이슈* 윈도우 창 크기가 1160 이하가 되면 column 변경 처리 -->
          <v-col :cols="windowWidth <= 1160 ? '6' : '3'" class="pa-0">
            <v-row>
              <v-col cols="6" class="px-0">
                <v-row class="ma-0 userAppBar">
                  <!-- <v-col class="pa-0 user">
                  <h5 class="user">{{ user.fullName }}</h5>
                </v-col> -->
                  <v-col class="pa-0" :class="'transparent ' + transColorChange" style="textalign: right">
                    <h5>
                      <span class="user">{{ user.fullName }}</span
                      >님 환영합니다.
                    </h5>
                    <h5>{{ nowTime }}</h5>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="5">
                <!-- i18n -->

                <!-- <v-menu min-width="160">

          <template v-slot:activator="{ on }">

            <v-btn v-on="on"  text color="menu_title"  class="pa-2" >
              <img :src="activeLang.image" width="20"/>            
            </v-btn>

          </template>
          

          <v-list dense flat color="menu_bg" min-width="160">
            
            <v-list-item v-for="(lang, index) in langs" :key="index" @click="langClick(lang)" color="menu_title">
              
              <v-list-item-title>

                <img :src="lang.image" width="20" />
                {{ lang.name }}

              </v-list-item-title>

            </v-list-item>

          </v-list>

        </v-menu> -->
                <!--  -->

                <v-icon :color="colorChange" @click="changeFullscreen">mdi-fullscreen</v-icon>
                <v-icon :color="colorChange" @click="logout">mdi-export</v-icon>
                <!-- 반응형 토탈 메뉴 구성 start-->
                <v-app-bar-nav-icon :color="colorChange" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-navigation-drawer v-model="drawer" absolute right height="100vh">
                  <v-list-item-title align="center" class="d-flex pl-5 pr-3 py-3" style="height: 75px">
                    <div class="font-weight-bold text-subtitle-1 d-inline-block text-center" style="alignself: center">전체메뉴</div>
                    <v-spacer />
                    <v-icon color="primary" class="pa-1" @click="drawer = false">$close</v-icon>
                  </v-list-item-title>
                  <v-divider />
                  <totalMenu :menuList="menuList" @towDepthMenuClick="towDepthMenuClick" ref="totalMenu"></totalMenu>
                </v-navigation-drawer>
              </v-col>
            </v-row>
          </v-col>
          <!-- 반응형 토탈 메뉴 구성 end-->
        </v-row>
      </v-app-bar>
      <div style="width: 100%">
        <div id="mainContent" class="dx-theme-background-color" :class="{ mainContent: !$store.state.app.isScreenFull }">
          <!-- mainview -->
          <div class="container_bg">
            <!-- sub route 영역 -->
            <v-col v-if="$route.name != 'dashboard'" cols="12" class="pa-0 subRouter">
              <v-col cols="12" class="pa-0">
                <v-row justify="start">
                  <v-col class="pa-0">
                    <v-img width="15" :src="require('@/assets/images/etc/home_icon.png')" />
                  </v-col>
                  <h5 class="px-2 pr-10">홈{{ ' > ' + menuNmLv1 }}{{ ' > ' + menuNmLv2 }}</h5>
                </v-row>
              </v-col>
              <v-divider class="mx-2" />
            </v-col>
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="12" align="left">
                <VueToastify :notifyAction="notifyAction"></VueToastify>
                <transition name="fade-transform" mode="out-in">
                  <keep-alive :key="key">
                    <router-view ref="componentRef" />
                  </keep-alive>
                </transition>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <!-- 레이아웃 풋터 -->
      <!-- <DefaultFooter v-if="$route.name == 'dashboard'"/> -->
    </v-container>
  </v-app>
</template>

<script>
import ResizeMixin from '@/layout/mixin/ResizeHandler'
import { mapState } from 'vuex'
import { fn_Logout } from '@/framework/login/login'
import DefaultFooter from '@/layout/footer' // 푸터

import { getMenu } from '@/api/kier/system/menuManage'

import VueToastify from '@/components/toastify/VueToastify.vue'

import totalMenu from '@/layout/totalMenu.vue'

export default {
  name: 'DefaultLayout',
  components: {
    totalMenu,
    DefaultFooter,
    //
    VueToastify,
  },
  mixins: [ResizeMixin],
  data: () => ({
    // i18n
    languageMenu: true,
    activeLang: '',
    langs: [
      {
        id: 'ko',
        name: '한국어',
        image: require('@/assets/images/flags/ko.png'),
      },
      {
        id: 'en',
        name: 'English',
        image: require('@/assets/images/flags/en.png'),
      },
    ],

    depth: {
      main: '',
      sub: '',
    },
    nowTime: '',
    scrollY: '',
    windowWidth: '',
    appBarStyle: '',
    colorChange: '',
    transColorChange: '',

    drawer: false,
    group: null,
    watch: {
      group() {
        this.drawer = false
      },
    },
    ////
    // menu: false,
    fab: false, //floating up flag
    navigation: [
      { id: 1, text: 'Products' },
      { id: 2, text: 'Sales' },
      { id: 3, text: 'Customers' },
      { id: 4, text: 'Employees' },
      { id: 5, text: 'Reports' },
    ],
    text: '',
    showModes: ['push', 'shrink', 'overlap'],
    positionModes: ['top', 'bottom'],
    showSubmenuModes: ['slide', 'expand'],
    selectedOpenMode: 'overlap',
    selectedPosition: 'top',
    selectedRevealMode: 'expand',
    openState: false,
    toolbarContent: [
      {
        widget: 'dxButton',
        location: 'before',
        options: {
          icon: 'menu',
          onClick: () => {
            this.openState = !this.openState
          },
        },
      },
    ],

    // main
    // drawer: false,
    drawerTheme: false,
    menuData: [],
    // app-bar
    dialog: false,
    user: {
      initials: 'khnp',
      fullName: '방문자',
      email: 'hansuwon@khnp.co.kr',
    },
    mailCount: 2,
    menuList: [],
    subList: [],
    menuNmLv1: '',
    menuNmLv2: '',
    //
    pageInnerTopMenu: '1000',
    mainMenuTitle: '',
    engMainMenuTitle: '',
    innerMenuTitle: '',
    engInnerMenuTitle: '',
    selectedTopMenu: 0,
    resetDropboxValue: false,
    gridDataSource: [],
    isGridBoxOpened: false,
    gridBoxValue: [2],
    gridColumns: ['compId', 'compNm'],
    selectedCustomerInGrid: '관리 사업장 선택',
    lastSelectedCustomerInGrid: '',
    isRequiredSuperConfig: false,
    active_tab: false,
    // gridBoxDisplayExpr: 'testtest'
  }),
  created() {
    this.setLocale()
    this.$EventBus.$on('refreshMenu', (param) => {
      this.openState = false
      this.menuRefresh = true
      this.selectedTopMenu = param.topMenuId
      this.pageInnerTopMenu = param.topMenuId
      // this.active_tab = param.topIndex == undefined ? 999 : param.topIndex
    })
    getMenu(false).then((res) => {
      let resList = res.listResponse.list
      let mainList = resList.filter((item) => item.lvl == '1' && item.useYn != 'N')
      let subList = resList.filter((item) => item.parentId && item.useYn != 'N')
      mainList.forEach((el) => {
        el.subMenu = subList.filter((item) => el.menuId == item.parentId)
      })
      this.menuList = mainList
      this.subList = subList
      let submenu = this.subList.find((el) => el.progCd == this.$route.name)
      if (submenu) {
        this.menuNmLv2 = submenu.menuNm
        this.menuNmLv1 = this.menuList.find((el) => el.menuId == submenu.parentId).menuNm
      }
    })
  },
  mounted() {
    this.user.fullName = sessionStorage.getItem('UserCd')
    window.addEventListener('resize', this.handleResize)
    this.pageInnerTopMenu = this.selectedTopMenu = this.$route.query == undefined ? '' : this.$route.query.tMenu
    // this.active_tab = this.$route.query == undefined ? '' : this.$route.query.topIndex == undefined ? 999 : this.$route.query.topIndex
    this.getDataFromDB()
    this.getCurrentPage()
    this.setDashboardStyle()
  },

  activated() {},
  deactivated() {},
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
    this.$EventBus.$off('refreshMenu')
  },
  updated() {
    this.setDashboardStyle()
    this.nowTime = this.time()
  },
  watch: {
    // 라우터가 변경될시
    $route(val) {
      // 쿼리문을 이용하여 메뉴 이동 경로를 변경
      this.setCurrentPage(this.$route.query)
      let submenu = this.subList.find((el) => el.progCd == val.name)
      if (submenu) {
        this.menuNmLv2 = submenu.menuNm
        this.menuNmLv1 = this.menuList.find((el) => el.menuId == submenu.parentId).menuNm
      }
    },
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => false, //state.settings.fixedHeader
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      },

      gridBoxDisplayExpr(item) {
        return this.selectedCustomerInGrid
      },
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      }
    },
  },
  methods: {
    // 홈 이동 함수 (대시보드 / dashboard)
    goHome() {
      this.pageInnerTopMenu = '1000'
      this.$router.push('/dashboard').catch(() => {})
    },
    // 메인 메뉴 (상단, 헤더, 탑)
    TopMenuClick(item) {
      // console.log(item)
      this.$router.push(item.progCd).catch(() => {})
    },
    // 서브 메뉴 (햄버거바, 사이드바, 네비)
    towDepthMenuClick(to) {
      this.menu = false //전체메뉴 닫기
      this.openState = false //유저 정보 닫기
      //  if (this.getMainSubMenuTree()) this.drawer = true
      // if(to.topIndex != null) {
      //   this.active_tab = to.topIndex
      // }
      this.pageInnerTopMenu = to.zeroLevelId
      //각 페이지에 공통 라우트 리프레쉬 함수
      this.$EventBus.$emit(`${to.currentId}_RouteRefresh`, {
        currentId: to.currentId,
        compId: this.$store.state.user.compId,
        compNm: this.$store.state.user.compNm,
      })
      this.drawer = false
      this.setCurrentPage(to)
    },
    // 웹 이동 경로 탭 세팅 ( 홈 > 메인 > 서브 )
    setCurrentPage(value) {
      let menu = this.$store.state.menu.treeMenus
      menu.forEach((e) => {
        if ((value.zeroLevelId || value.tMenu) == e.zeroLevelId) {
          this.depth.main = e.title
          this.depth.sub = e.items
        }
      })
      // (기존은 상단 라우터를 비교하지만 우측 배너 정보는 라우터(menu)정보에 없으므로 다른 조건으로 처리)
      if (value.background && value.subTitle) {
        this.depth.main = value.title
        this.depth.sub = value.subTitle
      } else {
        // 만역 문자열이 아니라면 실행
        if (typeof this.depth.sub != 'string') {
          this.depth.sub.forEach((e) => {
            if ((value.id || value.currentId || value.selMenuid) == e.id) {
              this.depth.sub = e.title
            }
          })
        }
      }
      // 모든 조건이 완료된 상태(depth에 main, sub 가 모두 정상적으로 등록) 일때 로컬 저장
      this.$localStore.set('currentPage', JSON.stringify(this.depth))
      this.getCurrentPage()
    },
    // 웹 이동 경로 불러오기 ( 로컬스토리지 )
    getCurrentPage() {
      if (this.$localStore.get('currentPage') != null) {
        this.depth = JSON.parse(this.$localStore.get('currentPage'))
      }
    },
    // 시작할때 불러올 함수 (적용 : i18n 다국어, 윈도우 창 가로 크기 정의)
    /*
    setLocale() {
      if (this.$localStore.get('locale') == 'ko') {
        this.activeLang = this.$envs.framework.supportLocales.ko
        this.$vuetify.lang.current = 'ko'
        this.$i18n.locale = 'ko'
      } else {
        this.activeLang = this.$envs.framework.supportLocales.en
        this.$vuetify.lang.current = 'en'
        this.$i18n.locale = 'en'
      }
      this.windowWidth = window.innerWidth
    },
    */
    setLocale() {
      this.activeLang = this.$envs.framework.supportLocales.ko
      this.$vuetify.lang.current = 'ko'
      this.$i18n.locale = 'ko'
      this.windowWidth = window.innerWidth
    },

    langClick(lang) {
      this.activeLang = lang
      if (lang.id == 'ko') {
        this.$localStore.set('locale', 'ko')
        this.$vuetify.lang.current = 'ko'
        this.$i18n.locale = 'ko'
      } else {
        this.$localStore.set('locale', 'en')
        this.$vuetify.lang.current = 'en'
        this.$i18n.locale = 'en'
      }
    },

    // 테마 변경 (라이트, 다크 / 한수원에선 사용할지 미정)
    changeTheme(theme) {
      if (theme) {
        this.$localStore.set('theme', 'dark')
      } else {
        this.$localStore.set('theme', 'light')
      }
    },
    // 시간 정의 (현재는 함수로 모두 정의 / 추후 DB에서 불러올 방식으로 변경할 예정)
    time() {
      let date = new Date()
      date.setHours(date.getHours() + 9) //우리나라 기준으로 맞추기 위함 +9시간
      var formatted_date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
      var formatted_time = date.toISOString().substr(11, 8)
      return formatted_date + ' ' + formatted_time
    },
    // appbor, 헤더의 스타일 변경 함수
    setDashboardStyle() {
      let background
      let width
      // 스크롤이 상단에 있으면 배경색 투명, 아니라면 app_bar_bg 색상
      // if(this.$route.name == 'dashboard' && this.scrollY < 70) {
      //   background = 'transparent'
      // } else {
      //   background = 'app_bar_bg'
      // }
      background = 'app_bar_bg'
      // 선택적 반응형 / 윈도우 창의 넓이가 1420 이하면 반응형 제거
      // *반응형 이슈* 윈도의 창 넓이가 1160이하가 되면 다시 반응형으로 변경되도록 처리
      if (this.windowWidth <= 1420 && this.windowWidth >= 1160) {
        width = 'layoutToolbar'
      } else {
        width = ''
      }
      // this.appBarStyle : 헤더, v-app-bar에 적용될 스타일을 담을 변수
      this.appBarStyle = background + ' ' + width
      // 스타일 변경
      // if(this.$route.name == 'dashboard' && this.scrollY <= 70) {
      //   this.colorChange = 'app_bar_title_w'
      //   this.transColorChange = 'app_bar_title_w--text'
      // } else {
      //   this.colorChange = 'app_bar_title'
      //   this.transColorChange = 'app_bar_title--text'
      // }
      this.colorChange = 'app_bar_title'
      this.transColorChange = 'app_bar_title--text'
    },
    // 윈도우 스크롤 , window.scrollY로는 적용 불가 (윈도우 스크롤이 아닌 내부 스크롤임),
    // 탑 메뉴가 position : fixed 되어있기때문에 전체 스크롤과 적용이 되지않음.
    handleScroll(e) {
      this.scrollY = e.target.scrollTop
      // 전체 스크롤을 움직일시 탑 메뉴의 스크롤도 같이 이동되도록 설정
      // *반응형 이슈* 탑 메뉴 넓이의 문제로 완벽하게 적용이 되지않음 / 일정크기 이하 일시 반응형으로 처리 추가함
      document.getElementById('layout').addEventListener('scroll', () => {
        document.getElementById('layoutAppBar').scrollLeft = e.target.scrollLeft
      })
    },
    // 윈도우의 가로 크기를 담을 변수
    handleResize(e) {
      this.windowWidth = window.innerWidth
      //풀스크린 여부
      this.$store.dispatch('app/setIsScreenFull', window.innerHeight == screen.height)
    },
    // DB의 데이터를 불러오는 변수
    getDataFromDB() {},

    // 기존 ESG 소스 ('로딩중..' 표시 기능)
    notifyAction(notifyInfo, action) {
      this.$EventBus.$emit(`${this.$route.query.selMenuid}_notifyAction`, { notifyInfo: notifyInfo, action: action })
    },

    // 로그아웃
    logout() {
      fn_Logout()
    },

    changeFullscreen() {
      document.documentElement.requestFullscreen()
    },
  },
}
</script>

<style lang="scss" scoped>
// totalMenu
.v-menu__content {
  // margin-left: 12px;
  top: 75px !important;
  left: 0 !important;
  min-width: 100% !important;
  height: 165px;
}

.v-tab {
  padding: 0 24px;
}

.floatingTop {
  bottom: 150px !important;
}

.theme--light.v-app-bar.v-toolbar.v-sheet {
  background: transparent;
}

.dx-toolbar {
  background-color: rgba(191, 191, 191, 0.15);
  padding: 5px 10px;
}

.v-toolbar__items {
  display: contents;
}

.v-menu-tab {
  color: white;
  font-size: 18px;
  letter-spacing: 0;
  font-weight: 700;
  // text-shadow: 2px 2px 2px #c3c3c3;
}

.dx-list-item-icon-container,
.dx-toolbar-before {
  width: 36px;
  padding-right: 0 !important;
  text-align: center;
}

.dx-drawer {
  height: 0% !important;
  // height: 200px !important;
}

.dx-list-item-mainContent {
  padding-left: 10px !important;
}
.dx-overlay-content > .dx-template-wrapper {
  height: 100% !important;
}

.dx-drawer-opened::v-deep .dx-drawer-wrapper .dx-drawer-panel-content .dx-overlay-wrapper .dx-overlay-content {
  height: 200px !important;
  transition: all 800ms ease 0s !important; //duration 조정 20220411 LYJ
  .div {
    transition: none;
  }
}

.panel-list {
  height: 200px !important;
  width: 100%;
  padding: 0px;
  background-color: #fafafa;
  color: black;
  border-bottom: 2px solid #214885;
  box-shadow: 0px 5px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.dx-drawer-shrink #mainContent {
  overflow: hidden;
  transition: all 0.4s ease-out;
  column-width: 900px;
}

.dx-drawer-shrink.dx-drawer-opened #mainContent {
  column-width: 300px;
  margin-right: -10px;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

label {
  font-weight: bold;
}
.mainContent {
  padding-top: 80px;
}
#mainContent h2 {
  font-size: 26px;
}

.v-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .v-main {
  padding-top: 50px;
}
.hasTagsView {
  .v-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .v-main {
    padding-top: 84px;
  }
}
.hasNavAndTags {
  height: calc(100vh - 84px);

  &.isFullView {
    height: calc(100vh);
  }
}
.vAppBar {
  max-width: 1600px;
  min-height: 75px;
  justify-content: center;
}
.userAppBar {
  align-content: center;
  justify-content: center;
}
.user {
  text-align: right;
  color: rgb(92, 168, 240);
}

.nav_wrap {
  // width: 1280px;
  margin: 0 auto;
  height: 200px;
}

.line {
  width: 40px;
  height: 2.5px;
  background-color: #214885;
  float: left;
}

.v-btn::before {
  background-color: transparent;
}
.subRouter {
  height: 30px;
  text-align: -webkit-right;
  > div > div {
    height: 30px;
    align-content: center;
  }
  > div > div > div {
    align-self: center;
  }
}

.shadownone {
  box-shadow: none !important;
}
</style>
