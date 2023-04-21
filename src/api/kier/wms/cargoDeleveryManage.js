import request from '@/utils/request'

//협력사 combo
export function getComboPartnerId() {
    return request({
        url: `/api/v1/kier/wms/getComboPartnerIdWmsCargoDeleveryManage`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}
  
// 출하처리 Main 조회
export function getWmsCargoDeleveryManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsCargoDeleveryManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 출하처리 Detail 조회
export function getWmsCargoDeleveryManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsCargoDeleveryManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 출하처리 Main 저장
export function saveWmsCargoDeleveryManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/saveWmsCargoDeleveryManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
}

// 출하처리 Detail 저장
export function saveWmsCargoDeleveryManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/saveWmsCargoDeleveryManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
    }

// 출하처리 Main 삭제
export function deleteWmsCargoDeleveryManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/deleteWmsCargoDeleveryManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}

// 출하처리 Detail 삭제
export function deleteWmsCargoDeleveryManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/deleteWmsCargoDeleveryManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}

// 출하처리 Detail 팝업 조회
export function getWmsCargoDeleveryManageDetailPopup(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsCargoDeleveryManageDetailPopup`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 출하 처리 바코드 콤보조건 조회
export function getComboBarcodeNoWmsCargoDeleveryManage() {
    return request({
        url: `/api/v1/kier/wms/getComboBarcodeNoWmsCargoDeleveryManage`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}

// 출하의뢰 출력물 출력
export function getCargoDeleveryManageRpt(params) {
    return request({
      url: '/api/v1/kier/wms/getCargoDeleveryManageRpt',
      method: 'POST',
      meta: { apiVersion: '1.0.0' },
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      data : params,
      responseType: 'blob'
    })
  }