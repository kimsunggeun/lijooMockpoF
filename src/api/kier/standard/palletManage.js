import request from '@/utils/request'

// Pallet 관리 조회
export function getStdPalletManage(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/getStdPalletManage`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

// Pallet 관리 저장
export function saveStdPalletManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/saveStdPalletManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'saved' },
  })
}

// Pallet 관리 삭제
export function deleteStdPalletManage(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/deleteStdPalletManage`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'deleted' },
    })
}

// Pallet 관리 출력
export function printStdPalletManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/printStdPalletManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'searched' },
  })
}