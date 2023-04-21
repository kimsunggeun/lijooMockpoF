import request from '@/utils/request'

// 설비 관리 조회
export function getEquipCheckManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/equipmaint/getEquipCheckManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'searched' },
  })
}

// 설비 관리 저장
export function saveEquipCheckManage(params, isProgress) {
return request({
  url: `/api/v1/kier/equipmaint/saveEquipCheckManage`,
  meta: { apiVersion: '1.0.0' },
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  data: params,
  Notify: { use: isProgress, apitype: 'saved' },
})
}

// 설비 관리 삭제
export function delEquipCheckManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/equipmaint/delEquipCheckManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'deleted' },
  })
}





// 설비 관리 조회
export function getComboEquEquipManage(params) {
  return request({
    url: `/api/v1/kier/equipmaint/getComboEquEquipManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
  
  })
}

// 설비 업로드
export function multiUpload(params) {
  return request({
    url: `api/v1/kier/file/multiUpload`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}

// 설비 다운로드
export function download(params) {
  return request({
    url: `/api/v1/kier/file/downloadFile`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    responseType: 'blob',
    data: params,
  })
}


