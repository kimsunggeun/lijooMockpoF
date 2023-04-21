import request from '@/utils/request'

// 재고 조정 조회
export function getWmsMatAdjustManage(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsMatAdjustManage`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 재고 조정 Row (rack 행) LookUpEdit 조회
export function getComboMultiRowWmsMatAdjustManage() {
    return request({
        url: `/api/v1/kier/wms/getComboMultiRowWmsMatAdjustManage`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}

// 재고 조정 matCd LookUpEdit 조회
export function getComboMultiMatCdWmsMatAdjustManage() {
    return request({
        url: `/api/v1/kier/wms/getComboMultiMatCdWmsMatAdjustManage`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}

// 재고 조정 location LookUpEdit 조회
export function getLocationDescMatCdWmsMatAdjustManage() {
    return request({
        url: `/api/v1/kier/wms/getLocationDescMatCdWmsMatAdjustManage`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}

// 재고 조정 저장
export function saveWmsMatAdjustManage(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/saveWmsMatAdjustManage`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
}