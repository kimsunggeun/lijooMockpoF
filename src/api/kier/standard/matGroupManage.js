import request from '@/utils/request'

//품목그룹관리
export function getMatGroup(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/getMatGroup`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}




//품목그룹 저장
export function saveMatGroup(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/saveMatGroup`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}



//품목그룹 삭제

export function deleteMatGroup(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/deleteMatGroup`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}
// //삭제데이터
// export function getdeleteMatGroup(mainClass,middleClass) {
//   return request({
//     url: `/api/v1/kier/standard/getdeleteMatGroup`,
//     meta: { apiVersion: '1.0.0' },
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     data:mainClass,middleClass
    
//   })
// }

//품목그룹 대분류 콤보
export function getComboMatGroup() {
  return request({
    url: `/api/v1/kier/standard/getComboMatGroup`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {}
  })
}

//품목그룹 중분류 콤보
export function getComboMatGroupMiddle() {
  return request({
    url: `/api/v1/kier/standard/getComboMatGroupMiddle`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {}
  })
}