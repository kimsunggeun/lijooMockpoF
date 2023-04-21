
import request from '@/utils/request'

// 출하의뢰 Main 조회
export function getScmCustomerOrderManageMain(params, isProgress) {
  return request({
      url: `/api/v1/kier/scm/getScmCustomerOrderManageMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}


// 출하의뢰 정보리스트  조회
export function getScmCustomerOrderInfoDetail(params, isProgress) {
  return request({
      url: `/api/v1/kier/scm/getScmCustomerOrderInfoDetail`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}
 // 직원 콤보박스
export function getComboPartnerId() {
  return request({
      url: `/api/v1/kier/scm/getComboPartnerId`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {},
   
  })
}









