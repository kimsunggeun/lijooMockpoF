import request from '@/utils/request'


// 설비 상태 조회(스테커 크레인)
export function getEquipStatusInfoMain(params, isProgress) {
  return request({
    url: `/api/v1/kier/equipmaint/getEquipStatusInfoMain`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'searched' },
  })
}

// 설비 상태 조회(스테커 크레인)
export function getEquipStatusInfoDetail(params, isProgress) {
  return request({
    url: `/api/v1/kier/equipmaint/getEquipStatusInfoDetail`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'searched' },
  })
}
// 설비 상태 조회(스테커 크레인)
export function getComboEquipStatusInfo(params, isProgress) {
  return request({
    url: `/api/v1/kier/equipmaint/getComboEquipStatusInfo`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: params,
    Notify: { use: isProgress, apitype: 'searched' },
  })
}

