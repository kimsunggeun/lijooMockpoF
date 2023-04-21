import request from '@/utils/request'
  
// 발주납품정보 Main 조회
export function getScmPurchasingOrdeInfoMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/getScmPurchasingOrdeInfoMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 발주납품정보 Detail 조회
export function getScmPurchasingOrdeInfoDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/getScmPurchasingOrdeInfoDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

//협력사 combo
export function getComboPartnerId() {
    return request({
        url: `/api/v1/kier/scm/getComboPartnerIdScmPurchasingOrdeInfo`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}