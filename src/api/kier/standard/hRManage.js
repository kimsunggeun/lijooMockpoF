import request from '@/utils/request'

//인원관리 조회
export function getHrManage(searchParam) {
    return request({
      url: `/api/v1/kier/standard/getHrManage`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data:searchParam
      
    })
}





//인원관리 저장
export function saveHrManage(param) {
  return request({
    url: `/api/v1/kier/standard/saveHrManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data:param
    
  })
}



//인원관리 삭제
export function deleteHrManage(param) {
  return request({
    url: `/api/v1/kier/standard/deleteHrManage`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data:param
    
  })
}


//인원관리 combo
export function getComboHrManage() {
  return request({
      url: `/api/v1/kier/standard/getComboHrManage`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {},
  })
}