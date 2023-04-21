import request from '@/utils/request'




// 수불 리스트 조회
export function getInOutInfo(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getInOutInfo`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
  }
// 수불 리스트 조회
export function getComboInOutInfo(params) {
    return request({
        url: `/api/v1/kier/wms/getComboInOutInfo`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
       
    })
  }




