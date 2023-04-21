import request from '@/utils/request'

// 발주관리 Main 조회
export function getWmsPurchasingOrderManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsPurchasingOrderManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 발주관리 Detail 조회
export function getWmsPurchasingOrderManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsPurchasingOrderManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 발주관리 Main 저장
export function saveWmsPurchasingOrderManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/saveWmsPurchasingOrderManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
}

// 발주관리 Detail 저장
export function saveWmsPurchasingOrderManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/saveWmsPurchasingOrderManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
    }

// 발주관리 Main 삭제
export function deleteWmsPurchasingOrderManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/deleteWmsPurchasingOrderManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}

// 발주관리 Detail 삭제
export function deleteWmsPurchasingOrderManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/deleteWmsPurchasingOrderManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}

//협력사 combo
export function getComboPartnerId() {
    return request({
        url: `/api/v1/kier/wms/getComboPartnerId`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}