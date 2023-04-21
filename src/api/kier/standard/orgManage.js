import request from '@/utils/request'

// 조직 관리 조회
export function getStdOrgManage(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/getStdOrgManage`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 조직 관리 tree 조회
export function getTreeStdOrgManage(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/getTreeStdOrgManage`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 조직 관리 저장
export function saveStdOrgManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/standard/saveStdOrgManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'saved' },
  })
}

// 조직 관리 삭제
export function deleteStdOrgManage(params, isProgress) {
    return request({
      url: `/api/v1/kier/standard/deleteStdOrgManage`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'deleted' },
    })
}