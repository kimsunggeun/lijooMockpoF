import request from '@/utils/request'

//대시보드 조회
export function getMonDashBoard(params) {
  return request({
      url: `/api/v1/kier/monitoring/getMonDashBoard`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
  })
}

//대시보드 조회
export function getMonDashBoardTenMin(params) {
  return request({
      url: `/api/v1/kier/monitoring/getMonDashBoardTenMin`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
  })
}