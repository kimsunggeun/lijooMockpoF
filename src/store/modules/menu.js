import { getAuthMenuById } from '@/api/kier/system/common/menu'
import { getToken, getUserCd } from '@/utils/token'
import store from '@/store'
import { isUseAPI } from '@/utils/check'
import localStore from '@/utils/localStore'

// 아이콘 리스트
const icons = [
  { icon: 'folder', level: 0 },
  { icon: 'menulvl1', level: 1 },
  { icon: 'menulvl2', level: 2 },
  { icon: 'menulvl3', level: 3 }
]

//tree 구성
var SidemenuUtils = {
  // 기본 아이콘 사용 또는 사용자 정의 아이콘 사용
  findIcon(item) {
    if (!item.icon && !item.icon === '') {
      return icons.find(icon => icon.level === item.level).icon
    }
    if (item.icon === '') {
      return icons.find(icon => icon.level === item.level).icon
    }
    return item.icon
  }
}

function recursiveSetZeroLvlId(list, zeroLevelId) {
  list.forEach(m => {
    m.zeroLevelId = zeroLevelId
    if (m.items) {
      recursiveSetZeroLvlId(m.items, zeroLevelId)
    } else return
  })
}

export default {
  state: {
    menus: [],
    treeMenus: [],
    flag: {
      asideVisiable: true,
      asideUse: true,
      tagViewUse: true,
      headerUse: true,
      footerUse: true,
      myMenuVisible: false,
      fullscreen: false,
      isLayoutHideMode: false
    }
  },

  //data를 변경할때
  mutations: {
    // 전체 화면에서 레이아웃을 다 감추는 모드 사용 여부
    SET_LAYOUT_HIDE_MODE(state, flag) {
      state.flag.isLayoutHideMode = flag
    },
    SET_HEADER_USE: function(state, flag) {
      state.flag.headerUse = flag
    },
    SET_TAG_VIEW_USE: function(state, flag) {
      state.flag.tagViewUse = flag
    },
    SET_ASIDE_MENU_USE: (state, flag) => {
      state.flag.asideUse = flag
    },
    SET_FOOTER_USE: function(state, flag) {
      state.flag.footerUse = flag
    },
    SET_FULLSCREEN: function(state, flag) {
      state.flag.fullscreen = flag
    },
    // SET_MENU: (state, menus) => {
    //   state.menus = menus
    // }
    SET_TREE_MENU: (state, treeMenus) => {
      state.treeMenus = treeMenus
    }
  },

  //methods
  actions: {
    GetMenus({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // 초기화
        //commit('SET_MENU', [])
        commit('SET_TREE_MENU', [])
        //let menuList = []
        //let menuTreeList = []

        // 사용자권한메뉴조회
        getAuthMenuById({ usercd: userInfo.usercd, svcGubn: 'W' })
          .then(responseAuth => {
            //20220323 LYJ [메뉴 정렬 문제] 우선적으로는 이렇게 처리함, 백엔드에서 정렬안됨
            responseAuth.list.reverse()

            let list = responseAuth.list
            list.forEach(menu => {
              menu.zeroLevelId = menu.id
              recursiveSetZeroLvlId(menu.items, menu.id)
            })

            localStore.set('myAuthMenus', JSON.stringify(list))
            // commit('SET_MENU', menuList)
            commit('SET_TREE_MENU', list)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
          //권한 그룹별 메뉴 접근 권한 정보 조회 by lyj
          //console.log(store.state.user.menuAuthGroup)

        let params = {
          svcGubn: 'W', // web
          grpAuthCd: store.state.user.menuAuthGroup,
          auth: '' // vuetify의 라디오 value는 "" 을 넣으면 0으로 나와서 "" 으로 바꿔줌
        }
      })
    },

    SetHeaderUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_HEADER_USE', flag)
    },
    SetTagViewUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_TAG_VIEW_USE', flag)
    },
    SetASideMenuUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_ASIDE_MENU_USE', flag)
    },
    SetFooterUse({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_FOOTER_USE', flag)
    },
    SetLayoutHideMode({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_LAYOUT_HIDE_MODE', flag)
    },
    SetFullScreen({ commit }, flag) {
      if (typeof flag !== 'boolean') return
      commit('SET_FULLSCREEN', flag)
      localStore.set('fullscreen', this.isFullscreen) // 추후 사용이 필요 할 수도 있어서 넣어 둠
      if (store.state.menu.flag.isLayoutHideMode === true) {
        commit('SET_HEADER_USE', !flag)
        commit('SET_TAG_VIEW_USE', !flag)
        commit('SET_ASIDE_MENU_USE', !flag)
        commit('SET_FOOTER_USE', !flag)
      }
    }
  },

  getters: {
    //computed
  }
}
