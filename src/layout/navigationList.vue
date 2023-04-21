<template>
                <v-list color="menu_bg" style="top:75px">
                      <div class="pa-0 nav_wrap overflow-hidden">
                        <v-row align="center" class="divider_wrap">
                          <v-spacer />
                          <v-col cols="2" class="fill-height pa-0" style="border-left:1px solid #cccccc; left:0">
                            <v-card class="main_title fill-height d-flex flex-column justify-center pa-3 pl-5" color="menu_top_bg">
                              <div class="text-h5 font-weight-bold pb-3 ">
                                {{ title }}
                              </div>
                              <div class="line"></div>
                              <div class="text-subtitle-2 font-weight-bold py-3">
                                {{ engTitle == null ? '' : engTitle }}
                              </div>
                            </v-card>
                          </v-col>
                          <v-col cols="4" class="pa-0 align-center">
                            <v-row>
                              <v-col v-for="sub_item in item.items" :key="sub_item.id" cols="3" class="px-5 pa-2">
                                <v-btn width="200" text color="menu_title" class="font-weight-bold text-left text-subtitle-1" @click="TopMenuClick(sub_item)">
                                  {{ $t(sub_item.title) }}
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-spacer />
                        </v-row>
                      </div>
                </v-list>
</template>
<script>
// import { DxList } from 'devextreme-vue/list'

export default {
  name: 'navigationList',
  props: {
    subMenu: {
      type: Array,
      required: true,
      default: () => []
    },
    title: {
      type: String,
      required: true,
      default: () => ''
    },
    engTitle: {
      type: String,
      required: true,
      default: () => ''
    }
  },
  components: {
    // DxList
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
  },
  computed: {},
  methods: {
    moveTo(to) {
      let toRouter = {
        path: to.id,
        name: to.id,
        query: { topIndex: to.topIndex, tMenu: to.zeroLevelId, selMenuid: to.id, lvl: to.lvl },
        // meta: { proc_cd: to.proc_cd, title: to.title, affix: to.affix, svcType: to.svcType }
        meta: { proc_cd: to.proc_cd, title: to.title, affix: to.affix }
      }

      // if (to.svcType == 'I') {
      //   toRouter.path = '/inspection'
      //   //toRouter.name = 'inspection'
      //   //this.$router.push('/inspection')
      // } else if (to.svcType == 'P') {
      //   toRouter.path = '/preparing'
      //   //toRouter.name = 'preparing'
      //   //this.$router.push('/preparing')
      // } else if (to.name == '') {
      //   toRouter.path = '/pageNotFound'
      //   //toRouter.name = 'pageNotFound'
      //   //this.$router.push('/pageNotFound').catch(() => {})
      // }
      {
        // let toRouter = {
        //   path: to.name,
        //   name: to.name,
        //   query: { topIndex: to.topIndex, tMenu: to.zeroLevelId, selMenuid: to.id, lvl: to.lvl },
        //   // meta: { proc_cd: to.proc_cd, title: to.title, affix: to.affix, svcType: to.svcType }
        //   meta: { proc_cd: to.proc_cd, title: to.title, affix: to.affix }
        // }
        //window.sessionStorage.setItem('currentMenuInfo', JSON.stringify(toRouter))

        try {
          this.$router.push(toRouter)
        } catch (e) {
          console.log(e)
        }

        this.$emit('towDepthMenuClick', { topIndex: to.topIndex, currentId: to.id, zeroLevelId: to.zeroLevelId })
      }
    }
  },
  activated() {
  }
}
</script>

<style lang="scss" scoped>
.theme--light.v-divider {
  max-width: 200px;
}

.nav_wrap {
  // width: 1280px;
  margin: 0 auto;
  height: 200px;
}

.main_title {
  border-left: 1px solid #cccccc !important;
  border-right: 1px solid #cccccc !important;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.997-.704-.707 10l.707.707L10.704.004l-.707-.708Z' fill='%23E2E2E2'/%3E%3C/svg%3E");
  background-repeat: repeat;
}

.line {
  width: 40px;
  height: 2.5px;
  background-color: #214885;
  float: left;
}

.v-btn {
  border-bottom: 2px solid #f9f9f9;
}

.v-btn::before {
  background-color: transparent;
}

.v-btn::after {
  position: absolute;
  content: '';
  width: 100%;
  height: 2px;
  top: 100%;
  left: 0;
  background: #214885;
  transition: transform 0.5s;
  transform: scaleX(0);
  transform-origin: right;
}

.v-btn:hover {
  border-bottom: 2px solid #f9f9f9;
  border-radius: 0;
  opacity: 1;
}

.v-btn:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.divider_wrap {
  background-image: url("data:image/svg+xml,%3Csvg width='1068' height='199' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M.827.729v198M1067.49.729v198M534.157.729v198M267.492.729v198M800.822.729v198' stroke='%23ccc'/%3E%3C/svg%3E");
  background-size: contain;
  background-position: 99% 50%;
  width: 1280px;
  margin: 0 auto;
  height: 198px;
}
</style>
