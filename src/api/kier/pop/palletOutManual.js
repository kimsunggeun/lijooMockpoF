import request from '@/utils/request'

//Main 조회
export function getPalletOutManualMain(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/getPalletOutManualMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

//팝업 조회
export function getPalletOutManualPopup(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/getPalletOutManualPopup`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

//메인 저장
export function savePalletOutManualMain(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/savePalletOutManualMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
    })
}