import request from '@/utils/request'

//Location 관리 조회
export function getLocation(searchParam) {
    return request({
      url: `/api/v1/kier/standard/getLocation`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data:searchParam
      
    })
}





//Location 관리 저장
export function saveLocation(param) {
  return request({
    url: `/api/v1/kier/standard/saveLocation`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data:param
    
  })
}



//Location 관리 삭제
export function deleteLocation(param) {
  return request({
    url: `/api/v1/kier/standard/deleteLocation`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data:param
    
  })
}







