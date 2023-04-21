import envs from '@/envs'

export default {

  namespaced: true,

   //data
  state:{
    showSettings: true,
    tagsView: true,
    fixedHeader: false,
    sidebarLogo: false
  },

  //데이터 변경시
  mutations : {
    CHANGE_SETTING: (state, { key, value }) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    }
  },

   //methods
  actions : {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  },

}  