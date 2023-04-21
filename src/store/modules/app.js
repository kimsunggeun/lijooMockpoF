import Cookies from 'js-cookie'

export default {
  namespaced: true,

  //data
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: Cookies.get('size') || 'medium',
    compId: '', //20220405 LYJ 설정 슈퍼유저일 경우 선택된 사업장코드
    compNm: '', //20220405 LYJ 설정 슈퍼유저일 경우 선택된 사업장명
    userCd: '', //20220405 LYJ 설정 슈퍼유저일 경우 선택된 사용자코드
    isScreenFull: window.innerHeight == screen.height
  },

  //데이터 변경시
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },

    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },

    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },

    //20220405 LYJ 설정 슈퍼유저일 경우 선택된 클라이언트 아이디
    SET_SELECTED_CONFIG: (state, config) => {
      state.compId = config.compId
      state.compNm = config.compNm
    },

    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    SET_IS_SCREEN_FULL: (state, value) => {
      state.isScreenFull = value
    }
  },

  //methods
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    //20220405 LYJ 설정 슈퍼유저일 경우 선택된 클라이언트 아이디
    setInfoForConfig({ commit }, config) {
      commit('SET_SELECTED_CONFIG', config)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    },
    setIsScreenFull({ commit }, value) {
      commit('SET_IS_SCREEN_FULL', value)
    },
  },

  //computed
  getters: {}
}
