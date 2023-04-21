import request from '@/utils/request'

//RFIDTag조회
export function getRfidTag(rfidTag,rfidTagNm) {
    return request({
      url: `/api/v1/kier/standard/getRfidTag`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data:rfidTag,rfidTagNm
      
    })
}

//RFIDTag 저장
export function saveRfidTag(param) {
  return request({
    url: `/api/v1/kier/standard/saveRfidTag`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data:param
    
  })
}

//RFIDTag 삭제
export function deleteRfidTag(param) {
  return request({
    url: `/api/v1/kier/standard/deleteRfidTag`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data:param
    
  })
}

//RFIDTag 콤보 조회
export function getComboRfidTag() {
  return request({
    url: `/api/v1/kier/standard/getComboRfidTag`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {}
  })
}