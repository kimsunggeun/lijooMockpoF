import request from '@/utils/request'

export function getPopLineInfoMainList(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/getPopLineInfoMainList`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}


export function getPopLineStatus(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/getPopLineStatus`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}


export function getPopLineInfoMainStorage(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/getPopLineInfoMainStorage`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

export function getPopLineDel(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/getPopLineDel`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}
