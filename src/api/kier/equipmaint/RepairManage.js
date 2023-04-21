import request from '@/utils/request'

// 유지 보수 조회
export function getRepairManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/equipmaint/getRepairManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'searched' },
  })
}

// 유지 보수 저장
export function saveRepairManage(params, isProgress) {
return request({
  url: `/api/v1/kier/equipmaint/saveRepairManage`,
  meta: { apiVersion: '1.0.0' },
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  data: params,
  Notify: { use: isProgress, apitype: 'saved' },
})
}

// 유지 보수 삭제
export function deleteRepairManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/equipmaint/deleteRepairManage`,
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

// 유지 보수 콤보
export function getComboRepairManage(params) {
  return request({
    url: `/api/v1/kier/equipmaint/getComboRepairManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
  
  })
}





