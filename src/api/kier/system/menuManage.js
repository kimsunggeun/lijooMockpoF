import request from '@/utils/request'

//메뉴 조회
export function getMenu(isProgress) {
    return request({
      url: `/api/v1/kier/system/getMenu`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {},
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

//메뉴 저장
export function saveMenu(params, isProgress) {
  return request({
    url: `/api/v1/kier/system/saveMenu`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'saved' },
  })
}

//메뉴 삭제
export function deleteMenu(params, isProgress) {
  return request({
    url: `/api/v1/kier/system/deleteMenu`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'deleted' },
  })
}