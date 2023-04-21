import request from '@/utils/request'

// 입하처리 거래명세서 리스트 조회
export function getCargoArrival(params, isProgress) {
  return request({
      url: `/api/v1/kier/wms/getCargoArrival`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}

// 입하처리 저장
export function saveCargoArrival(params, isProgress) {
  return request({
      url: `/api/v1/kier/wms/saveCargoArrival`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
  })
}

// 입하처리 삭제
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


// 입하처리 Detail 조회
export function getCargoArrivalDetail(params, isProgress) {
  return request({
      url: `/api/v1/kier/wms/getCargoArrivalDetail`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}

// 입하처리 디테일 1저장
export function saveCargoArrivalDetail(params, isProgress) {
  return request({
      url: `/api/v1/kier/wms/saveCargoArrivalDetail`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
  })
}
// 입하처리 디테일 2저장
export function saveCargoArrivalDetailPurchasingOrderInfo(params, isProgress) {
  return request({
      url: `/api/v1/kier/wms/saveCargoArrivalDetailPurchasingOrderInfo`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
  })
}


// 입하처리 디테일 삭제
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

//협력사 콤보
  export function getComboPartnerId() {
    return request({
        url: `/api/v1/kier/scm/getComboPartnerId`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}

//파트너 콤보
  export function getComboPartnerIdWmsCargoArrival(params,) {
    return request({
        url: `/api/v1/kier/wms/getComboPartnerIdWmsCargoArrival`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
      
    })
}

// 마지막 마감월
export function getMaxMatClosed(params) {
    return request({
        url: `/api/v1/kier/commonkier/getMaxMatClosed`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        
    })
}