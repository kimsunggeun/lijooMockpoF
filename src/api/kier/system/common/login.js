import loginMockupData from './mock/login.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import Cookies from 'js-cookie'
import { isUseAPI } from '@/utils/check'
import { setToken, setID, getRefreshToken } from '@/utils/token'

export function loginByPassword(userInfo) {
  if (!isUseAPI()) {
    return new Promise(function(resolve, reject) {
      let res = loginMockupData
      let pw = loginMockupData.userInfo.userps
      if (res.success && pw === userInfo.userps) {
        resolve(res.userInfo)
        setToken(userInfo.usercd)
        setID(userInfo.usercd)
        Cookies.set('usercd', userInfo.usercd)
      } else {
        var error = { code: '401' }
        reject(error)
      }
    })
  }
  return request({
    url: '/com/loginByPassword',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: userInfo,
    meta: {
      useErrorMessage: false,
      useTokenUpdate: true,
      apiVersion: '1.0.0'
    }
  })
}

export function getUser(usercd) {
  if (!isUseAPI()) {
    // restful api를 사용하지 않을 경우 login.json에 등록된 계정만 가져온다.
    return new Promise(function(resolve, reject) {
      // local에서는 token 값에 usercd 넣는다.
      let res = loginMockupData[usercd]
      if (res) {
        resolve(res) // 기존 토큰 값 있는 여부 확인
      } else {
        var error = { code: '401' }
        reject(error)
      }
    })
  }

  return request({
    url: '/com/getUser',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: {
      usercd: usercd
      // domainCd: domainCd //도메인 처리 우선 막음 LYJ
    },
    meta: { apiVersion: '1.0.0' }
  })
}

export function logout() {
  return new Promise(function(resolve, reject) {
    resolve()
  })
}

export function reissueToekn(tokenInfo) {
  let userRefreshToken = getRefreshToken()
  return request({
    url: '/com/reissueToekn',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data: {
      usercd: tokenInfo.usercd,
      refreshToken: userRefreshToken
      //domainCd: tokenInfo.domainCd
    },
    meta: {
      useErrorMessage: true,
      useTokenUpdate: true,
      apiVersion: '1.0.0'
    }
  })
}
