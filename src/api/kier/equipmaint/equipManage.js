import request from '@/utils/request'

// 설비 관리 조회
export function getEquEquipManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/equipmaint/getEquEquipManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'searched' },
  })
}

// 설비 관리 저장
export function saveEquEquipManage(params, isProgress) {
return request({
  url: `/api/v1/kier/equipmaint/saveEquEquipManage`,
  meta: { apiVersion: '1.0.0' },
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  data: params,
  Notify: { use: isProgress, apitype: 'saved' },
})
}

// 설비 관리 삭제
export function deleteEquEquipManage(params, isProgress) {
  return request({
    url: `/api/v1/kier/equipmaint/deleteEquEquipManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'deleted' },
  })
}
