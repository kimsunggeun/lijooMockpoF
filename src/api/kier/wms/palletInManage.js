import request from '@/utils/request'

// 입고관리 Main 조회
export function getWmsPalletInManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsPalletInManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 입고관리 Detail 조회
export function getWmsPalletInManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsPalletInManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 입고관리 Main 저장
export function saveWmsPalletInManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/saveWmsPalletInManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
}

// 입고관리 Detail 저장
export function saveWmsPalletInManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/saveWmsPalletInManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
}

// 입고관리 Main 삭제
export function deleteWmsPalletInManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/deleteWmsPalletInManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}

// 입고관리 Detail 삭제
export function deleteWmsPalletInManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/deleteWmsPalletInManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}

// 마지막 마감월
export function getMaxMatClosed(params) {
    return request({
        url: `/api/v1/kier/commonkier/getMaxMatClosed`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        
    })
}