import request from '@/utils/request'

//협력사
export function getPartner(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/getPartner`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
      
    })
}



// 협력사 저장
export function savePartner(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/savePartner` ,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'searched' },
  
  })
}

// 협력사 삭제
export function deletePartner(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/deletePartner` ,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'deleted' },
  
  })
}

//협력사 combo
export function getComboPartner() {
  return request({
      url: `/api/v1/kier/standard/getComboPartner`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {},
  })
}

// 협력사 인원 관리 콤보조회
export function getComboAllPartner() {
  return request({
    url: `/api/v1/kier/standard/getComboAllPartner`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {},
  })
}