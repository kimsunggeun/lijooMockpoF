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

  sessionStorage.clear()
  router.push('/Login')
  
}
