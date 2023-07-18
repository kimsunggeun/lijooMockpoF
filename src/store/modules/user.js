import { getUser, logout, reissueToekn } from '@/api/kier/system/common/login'
import { getToken, removeToken, setUserCd, setToken, setRefreshToken, setCookieToken, setDomainCd } from '@/utils/token'
import localStore from '@/utils/localStore'
import { isUseAPI } from '@/utils/check'

export default {
  state: {
    isLogin:false,
    token: '',
    usercd: '',
    userName: '',
    clntId: '',
    compId: '',
    plntId: '',
    empNo: '',
    deptCd: '',
    bpCd: '',
    jbl: '',
    jbrp: '',
    trad: '',
    dimDiv: '',
    foreignYn: '',
    roles: [],
    auths: [],
    menuAuthGroup: '',
    menuPermission: '',
    registName: '',
    registPhoneNumber: '',
    buttonPermission: '',
    myMenu: []
  },

  //데이터 변경시
  mutations: {
    Set_isLogin(state, isLogin) {
      state.isLogin = isLogin
    },



    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_ID: (state, usercd) => {
      state.usercd = usercd
    },
    SET_USER_NAME: (state, userName) => {
      state.userName = userName
    },
    // SET_DOMAIN_CD: (state, domainCd) => {
    //   state.domainCd = domainCd
    // },2022-03-15 domain 개념 삭제 by yjlim
    SET_DIM_DIV: (state, dimDiv) => {
      state.dimDiv = dimDiv
    },
    SET_FOREIGN: (state, foreignYn) => {
      state.foreignYn = foreignYn
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AUTHS: (state, auths) => {
      state.auths = auths
    },
    SET_MENU_AUTH_GROUP: (state, menuAuthGroup) => {
      state.menuAuthGroup = menuAuthGroup
    },
    SET_COOKIE_TOKEN: (state, token) => {
      state.token = token
    }
  },
  getters: {
    
  },


  //methods
  actions: {




    //윤주
    LoginByPassword({ commit }, params) {
      let isTest = true
      if (!isUseAPI() && isTest) {
        setToken(params.userInfo.usercd)
        setCookieToken(params.userInfo.usercd)
        let userToken = getToken()
        commit('SET_TOKEN', userToken)
        localStore.set('isAutoLogin', params.userInfo.isAutoLogin)
        if (params.userInfo.isAutoLogin === true) {
          localStore.set('token', userToken)
        }
      } else
      {
        setToken(params.login_res.map.accessToken)
        setRefreshToken(params.login_res.map.refreshToken)
        //console.log('loginByPassword - session --> ' + params.userInfo.usercd)
        //setDomainCd(params.userInfo.domainCd)
        setUserCd(params.userInfo.usercd)

        //자동로그인 체크
        localStore.set('isAutoLogin', params.userInfo.isAutoLogin)
        if (params.userInfo.isAutoLogin === true) {
          let userToken = getToken()
          localStore.set('token', userToken)
        }
      }
    },
    SetUserInfo({ commit }, userInfo) {
      return new Promise(function(resolve, reject) {
        getUser(userInfo.usercd)
          .then(response => {
            let userinfo = Array.isArray(response.list) ? response.list[0] : response.list
            if (userinfo) {
              //
              commit('SET_USER_ID', userinfo.usercd)
              commit('SET_USER_NAME', userinfo.userNm)
              commit('SET_MENU_AUTH_GROUP', userinfo.grpauthcd) // 20220406 LYJ 'super' 그룹에 대한 설정 콤보박스 처리관련(보안상의 문제로 세션에 저장하지 않습니다.)
              commit('SET_TOKEN', getToken())
              commit('SET_COOKIE_TOKEN', getToken())
              // commit('SET_DOMAIN_CD', response['domainCd']) 2022-03-15 domain 개념 삭제 by yjlim
              //세션에 필요한 정보 등록 20220325 LYJ
              // var loginInfo = []
              // loginInfo.push({ CLNTID: userinfo.clntid })
              // loginInfo.push({ COMPID: userinfo.compid })
              // loginInfo.push({ PLNTID: userinfo.plntid })
              // loginInfo.push({ USERCD: userinfo.usercd })
              //window.sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo))
              // window.sessionStorage.setItem('CLNTID', userinfo.clntid)
              // window.sessionStorage.setItem('COMPID', userinfo.compid)
              // window.sessionStorage.setItem('PLNTID', userinfo.plntid)
              // window.sessionStorage.setItem('USERCD', userinfo.usercd)
              let userinfoList = []
              var userinfoObj = new Object()
              // userinfoObj.id = 'clntid'
              // userinfoObj.content = userinfo.clntid
              // userinfoList.push(userinfoObj)

              // userinfoObj = new Object()
              userinfoObj.id = 'compid'
              userinfoObj.content = userinfo.compid
              userinfoList.push(userinfoObj)

              // userinfoObj = new Object()
              // userinfoObj.id = 'plntid'
              // userinfoObj.content = userinfo.plntid
              // userinfoList.push(userinfoObj)
              localStore.set('user_info', JSON.stringify(userinfoList))
            }
          })
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    //토큰 재발급 후 세션에 새로운 토큰 저장
    reissueToekn({ commit }, tokenInfo) {
      return new Promise(function(resolve, reject) {
        reissueToekn(tokenInfo)
          .then(response => {
            //console.log('토큰재발급완료! ', response.accessToken)
            setToken(response.accessToken)
            if (response.refreshToken) {
              //refresh toke은 만료기간이 7일이전에만 재발급함
              //console.log('refresh token 재발급완료! ', response.refreshToken)
              setRefreshToken(response.refreshToken)
            }
          })
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    Logout({ dispatch }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          window.sessionStorage.clear()
          //모든 tagviews clear
          dispatch('tagsView/delAllViews') //20220406 LYJ 로그아웃시 모든 tagView 삭제 처리
          dispatch('ClearSession')
          resolve()
        })
      })
    },
    ClearSession({ commit }) {
      commit('SET_USER_ID', '')
      commit('SET_USER_NAME', '')
      commit('SET_MENU_AUTH_GROUP', '')
      // commit('SET_DOMAIN_CD', '')2022-03-15 domain 개념 삭제 by yjlim
      commit('SET_TOKEN', '')
      localStore.set('myAuthMenus', '')
      localStore.set('myAuthGrps', '')
      localStore.set('user_info', '')
      localStore.set('UserCd', '')

      //
      localStore.set('token', '')

      removeToken()
    }
  },

  //computed
  getters: {}
}
