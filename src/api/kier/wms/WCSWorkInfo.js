import request from '@/utils/request'


// 작업지시서 리스트 조회
export function getWCSWorkInfo(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWCSWorkInfo`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
  }
// 작업지시서 리스트 조회
export function getWCSWorkInfoDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWCSWorkInfoDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
  }


  // 작업지시서 지게차라인 리스트 조회
export function getWCSWorkInfoManual(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWCSWorkInfoManual`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
  }

  // 작업 지시서 지게차라인 디테일 리스트 조회
export function getWCSWorkInfoManualDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWCSWorkInfoManualDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
  }






//팔레트 콤보
export function getCombopalletIdWCSWorkInfo() {
    return request({
        url: `/api/v1/kier/wms/getCombopalletIdWCSWorkInfo`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
  }

//팔레트 콤보  지게차라인
export function getCombopalletIdWCSWorkInfoManual() {
    return request({
        url: `/api/v1/kier/wms/getCombopalletIdWCSWorkInfoManual`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
  }

  
  //팔레트 전부 포함 Nm


  export function getCombopalletIdPalletOutDetail(params) {
    return request({
        url: `/api/v1/kier/wms/getCombopalletIdPalletOutDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
    })
  }
