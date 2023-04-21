import request from '@/utils/request'

// 배차인원관리 조회
export function getWmsDispatcherManage(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsDispatcherManage`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 배차인원관리 저장
export function saveWmsDispatcherManage(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/saveWmsDispatcherManage`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
}
// 배차인원관리 삭제
export function deleteWmsDispatcherManage(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/deleteWmsDispatcherManage`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}
