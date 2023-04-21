import request from '@/utils/request'



// 월 마감  리스트 조회
export function getWmsMatClosed(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsMatClosed`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
  }

// 월 마감  디테일 리스트 조회
export function getWmsMatClosedDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsMatClosedDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
  }

// 월 마감  디테일 리스트 저장
export function saveWmsMatClosed(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/saveWmsMatClosed`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
  }
// 월 마감  디테일 리스트 삭제
export function deleteWmsMatClosed(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/deleteWmsMatClosed`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
  }


// 월 마감  디테일 저장
export function saveWmsMatClosedDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/saveWmsMatClosedDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
  }
export function saveWmsMatClosedDetail_case(params,dto, isProgress) {

    return request({
        url: `/api/v1/kier/wms/saveWmsMatClosedDetail_case?`+`monthDt=` + dto,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
  }















// 월 마감  날자
export function getWmsMatClosedLastMonth(params ) {
    return request({
        url: `/api/v1/kier/wms/getWmsMatClosedLastMonth`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
     
    })
  }

