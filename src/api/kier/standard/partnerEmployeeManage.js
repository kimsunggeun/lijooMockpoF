import request from '@/utils/request'

// 협력사 인원 관리 조회
export function getStdPartnerEmployee(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/getStdPartnerEmployee`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 협력사 인원 관리 저장
export function saveStdPartnerEmployee(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/saveStdPartnerEmployee`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'saved' },
  })
}

// 협력사 인원 관리 삭제
export function deleteStdPartnerEmployee(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/deleteStdPartnerEmployee`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'deleted' },
    })
}

// 협력사 인원 관리 콤보조회
export function getStdComboPartnerEmployee() {
  return request({
    url: `/api/v1/kier/standard/getStdComboPartnerEmployee`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {},
  })
  
}

// 협력사 인원 관리 콤보조회
export function changePwStdPartnerEmployee(params) {
  return request({
    url: `/api/v1/kier/standard/changePwStdPartnerEmployee`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
  })
  
}



