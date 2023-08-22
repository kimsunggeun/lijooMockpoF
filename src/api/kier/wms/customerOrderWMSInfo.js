import request from '@/utils/request'
  
// 출하의뢰정보 Main 조회
export function getWmsCustomerOrderWMSInfoMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsCustomerOrderWMSInfoMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 출하의뢰정보 Detail 조회
export function getWmsCustomerOrderWMSInfoDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsCustomerOrderWMSInfoDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}



// 출하의뢰정보 Main 저장
export function saveWmsCustomerOrderWMSInfoMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/saveWmsCustomerOrderWMSInfoMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
    }



//협력사 combo
export function getComboPartnerId() {
    return request({
        url: `/api/v1/kier/scm/getComboPartnerId`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}

//출하의뢰정보 Main 콤보조건 조회
export function getComboPartnerIdWmsCustomerOrderWMSInfo() {
    return request({
        url: `/api/v1/kier/wms/getComboPartnerIdWmsCustomerOrderWMSInfo`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}

// 출하 의뢰서 출력
export function getWmsCustomerOrderWMSInfoRpt(params) {
    return request({
      url: '/api/v1/kier/wms/getWmsCustomerOrderWMSInfoRpt',
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data : params,
      responseType: 'blob'
    })
  }
  