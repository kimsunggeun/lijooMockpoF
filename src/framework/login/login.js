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
  

  let getsessionStorage = sessionStorage.getItem('menuGrpCd')

  if (getsessionStorage == 'IN') {
    let toRouter = {
      path: '/orderManage',
      name: 'orderManage',
    }
    router.push(toRouter)

  }
 else if (getsessionStorage == 'OUT') {
    let toRouter = {
      path: '/CustomerOrderManage',
      name: 'CustomerOrderManage',
    }
    router.push(toRouter)

  }
  else {
    let toRouter = {
      path: '/dashboard',
      name: 'dashboard',
    }
    router.push(toRouter)

  }


 
}

// 로그아웃
export function fn_Logout() {

  sessionStorage.clear()
  router.push('/Login')
  
}
