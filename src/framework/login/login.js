import store from '@/store'
import router from '@/router'
import localStore from '@/utils/localStore'
import { loginByPassword } from '@/api/kier/system/common/login'
import { AesEncrypt, AesDecrypt } from '@/utils/aes256' //cyrptojs 적용(aes256) by lyj 20220404
import { isUseAPI } from '@/utils/check'

/*
 * 로그인을 위한 함수 정의
 */

// 자동 로그인 체크
export function fn_AutoLogin() {
  return Boolean(localStorage.getItem('isAutoLogin'))
}

// 로그인
// [Object] userData (usercd, userps, isAutoLogin)
export function fn_Login(userData) {
  return new Promise(function(resolve, reject) {
    let RESULT = {
      result: false,
      msg: '사용자 정보를 입력해주세요.'
    }
    // 로딩 시작 함수 만들기
    if (!userData.usercd || userData.usercd === '') {
      RESULT.result = false
      RESULT.msg = '사용자 아이디를 입력해주세요.'
      resolve(RESULT)
      return
    }
    if (!userData.userps || userData.userps === '') {
      RESULT.result = false
      RESULT.msg = '비밀번호를 입력해주세요.'
      resolve(RESULT)
      return
    }

    let pw
    if (!isUseAPI()) {
    
      pw = userData.userps
    } else {
 
      pw =  AesEncrypt(userData.userps)
    }

    let userInfo = {
      usercd: userData.usercd,
      userps: pw,
      isAutoLogin: userData.isAutoLogin
    }

    let map = ''

    loginByPassword(userInfo).then(login_res => {
      

      userInfo.usercd == login_res.usercd ? login_res.success = true : login_res.success = false

       login_res.success == true ? '' : login_res.msg = '계정오류'

      if (login_res.success) {
        
        store
          .dispatch('LoginByPassword', {
            userInfo,
            login_res
          })
          .then(response => {
          
            store
              .dispatch('SetUserInfo', {
                usercd: userData.usercd
              })
              .then(response => {
                store
                  .dispatch('GetMenus', {
                    usercd: userData.usercd
                  })
                  .then(response => {
                    RESULT.result = login_res.success
                    RESULT.msg = login_res.msg
                    resolve(RESULT)
                    return
                  })
              })
          })
          .catch(reject => {
            RESULT.result = false
            RESULT.msg = '사용자 정보 조회에 실패하였습니다. 관리자에 문의해주세요'
            resolve(RESULT)
            return
          })
      } else {
       
        RESULT.result = login_res.success
        RESULT.msg = login_res.msg
        resolve(RESULT)
        return
      }
    })
  })
}

// 성공 페이지 이동
export function fn_LoginSuccess() {
  let startPage = localStore.get('start-page')
  if (startPage) {
    router.push(localStore.get('start-page'))
  } else {
    let toRouter = {
      path: '/dashboard',
      name: 'dashboard',
      // query: { tMenu: '1000', lvl: 0 }
      //meta: { proc_cd: to.proc_cd, title: to.title, affix: to.affix }
    }
    router.push(toRouter)
  }
}

// 로그아웃
export function fn_Logout() {

  
  router.push('/Login')
}
