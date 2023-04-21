import authMenuData from './mock/authMenu.json' // restful api를 사용하지 않을 경우
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// //권한메뉴
export function getAuthMenuById(param) {
  if (!isUseAPI()) {
    return new Promise(function(resolve, reject) {
      let res = authMenuData[param.usercd]
      if (res.usercd === 'admin') {
        resolve(res.menuList)
      } else {
        var error = { code: '401' }
        reject(error)
      }
    })
  }
  return request({
    url: `/com/getAuthMenuById`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { usercd: param.usercd, svcGubn: param.svcGubn }
  })
}

// //권한메뉴 라우트 정보
export function getAuthMenuRouteById(param) {
  if (!isUseAPI()) {
    return new Promise(function(resolve, reject) {
      resolve(authMenuData.menuList)
    })
  }
  return request({
    url: `/com/getAuthMenuRouteById`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { usercd: param.usercd, svcGubn: param.svcGubn }
  })
}
