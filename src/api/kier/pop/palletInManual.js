import request from '@/utils/request'

//Main 조회
export function getPalletInManualMain(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/getPalletInManualMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

//팝업 조회
export function getPalletInManualPopup(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/getPalletInManualPopup`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

//입고처리 저장
export function savePalletInManualMain(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/savePalletInManualMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
    })
}
//입고취소 삭제
export function deletePalletInManualMain(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/deletePalletInManualMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'deleted' },
    })
}