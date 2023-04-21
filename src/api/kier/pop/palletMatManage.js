import request from '@/utils/request'

export function getPalletMatManageMain(params, isProgress) {
    return request({
      url: `/api/v1/kier/pop/getPalletMatManageMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
    })
}

export function savePalletMatManageMain(params, isProgress) {
  return request({
      url: `/api/v1/kier/pop/savePalletMatManageMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
  })
}


export function savePalletMatManageInJob(params, isProgress) {
  return request({
      url: `/api/v1/kier/pop/savePalletMatManageInJob`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
  })
}

export function deletePalletMatManageMain(params, isProgress) {
  return request({
      url: `/api/v1/kier/pop/deletePalletMatManageMain`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'deleted' },
  })
}
