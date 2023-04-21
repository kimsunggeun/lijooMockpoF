import request from '@/utils/request'

// 품목 관리 조회
export function getStdMatManage(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/getStdMatManage`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 품목 관리 저장
export function saveStdMatManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/saveStdMatManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'saved' },
  })
}

// 품목 관리 삭제
export function deleteStdMatManage(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/deleteStdMatManage`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'deleted' },
    })
}

//품목 combo
export function getComboStdMatManage() {
  return request({
      url: `/api/v1/kier/standard/getComboStdMatManage`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {},
  })
}