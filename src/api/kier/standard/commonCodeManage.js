import request from '@/utils/request'

//기준 공통코드 combo
export function getCommonCode(majorCd) {
  return request({
    url: `/api/v1/kier/standard/getStdComboCommonCodeDetail`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {code: majorCd},
  })
}

//공통코드 조회
export function getListMain(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/getlistMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

//상세코드 조회
export function getListDetail(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/getlistDetail`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

//공통코드 저장
export function saveListMain(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/savelistMain`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'saved' },
  })
}

//상세코드 저장
export function saveListDetail(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/savelistDetail`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'saved' },
  })
}

//공통, 상세코드 삭제
export function deletelistAll(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/deletelistAll`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'deleted' },
  })
}

//공통코드 삭제
export function deletelistMain(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/deletelistMain`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'deleted' },
  })
}

//상세코드 삭제
export function deletelistDetail(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/deletelistDetail`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'deleted' },
  })
}