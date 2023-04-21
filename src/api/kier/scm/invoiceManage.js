import request from '@/utils/request'

// 거래명세서 Main 조회
export function getInvoice(params, isProgress) {
  return request({
      url: `/api/v1/kier/scm/getInvoice`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}

// 거래명세서 저장
export function saveInvoice(params, isProgress) {
  return request({
      url: `/api/v1/kier/scm/saveInvoice`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
  })
}

// 거래명세서 삭제
export function deleteInvoice(params, isProgress) {
  return request({
      url: `/api/v1/kier/scm/deleteInvoice`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'deleted' },
  })
}


// 거래명세서 Detail 조회
export function getInvoiceDetail(params, isProgress) {
  return request({
      url: `/api/v1/kier/scm/getInvoiceDetail`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}

// 거래명세서 디테일 저장
export function saveInvoiceDetail(params, isProgress) {
  return request({
      url: `/api/v1/kier/scm/saveInvoiceDetail`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
  })
}

// 거래명세서 디테일 삭제
export function deleteInvoiceDetail(params, isProgress) {
  return request({
      url: `/api/v1/kier/scm/deleteInvoiceDetail`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'deleted' },
  })
}







//거래내역 팝업 조회
export function getInvoiceDetailMatCd(params, isProgress) {
  return request({
      url: `/api/v1/kier/scm/getInvoiceDetailMatCd`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}

//파트너
export function getComboPartnerId() {
  return request({
      url: `/api/v1/kier/scm/getComboPartnerIdInvoice`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {},
  })
}

// 거래명세서 출력
export function getInvoiceRpt(params) {
  return request({
    url: '/api/v1/kier/scm/getInvoiceRpt',
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    data : params,
    responseType: 'blob'
  })
}