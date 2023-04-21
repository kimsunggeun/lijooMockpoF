import request from '@/utils/request'

// 보전 관리 조회
export function getMaintenanceManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/equipmaint/getMaintenanceManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'searched' },
  })
}

// 보전 관리 저장
export function saveMaintenanceManage(params, isProgress) {
return request({
  url: `/api/v1/kier/equipmaint/saveMaintenanceManage`,
  meta: { apiVersion: '1.0.0' },
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  data: params,
  Notify: { use: isProgress, apitype: 'saved' },
})
}

// 보전 관리 삭제
export function deleteMaintenanceManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/equipmaint/deleteMaintenanceManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'deleted' },
  })
}





// 설비 관리 조회 콤보
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
export function multiUploadMain(params) {
  return request({
    url: `/api/v1/kier/file/multiUploadMain`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params,
  })
}

// 설비 다운로드
export function downloadFileMain(params) {
  return request({
    url: `/api/v1/kier/file/downloadFileMain`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    responseType: 'blob',
    data: params,
  })
}


