import request from '@/utils/request'

export function getPalletInRemainMain(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/getPalletInRemainMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

export function savePalletInRemainMain(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/savePalletInRemainMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
    })
}

export function savePalletInRemainMainCase(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/savePalletInRemainMainCase`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
    })  
  }