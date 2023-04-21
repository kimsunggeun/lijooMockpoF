import request from '@/utils/request'

// 재고 조회
export function getWmsMaterialInfo(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsMaterialInfo`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 재고 조회 입하장/출하장 집계 조회
export function getWmsMaterialInfoArea() {
    return request({
        url: `/api/v1/kier/wms/getWmsMaterialInfoArea`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}

// 재고 조회, 집계 조회 팝업
export function getWmsMaterialInfoPopup(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsMaterialInfoPopup`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 재고 조회, 사용자가 선택한 RACK/AREA의 재고 정보 팝업
export function getWmsMaterialInfoPopupArea(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getWmsMaterialInfoPopupArea`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 재고 조회 palletId 콤보조건 조회
export function getComboMultipalletIdWmsMaterialInfo() {
    return request({
        url: `/api/v1/kier/wms/getComboMultipalletIdWmsMaterialInfo`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}