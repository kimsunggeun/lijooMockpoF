import request from '@/utils/request'
  
// 출하의뢰 Main 조회
export function getScmCustomerOrderManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/getScmCustomerOrderManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 출하의뢰 Detail 조회
export function getScmCustomerOrderManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/getScmCustomerOrderManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 출하의뢰 Main 저장
export function saveScmCustomerOrderManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/saveScmCustomerOrderManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
}

// 출하의뢰 Detail 저장
export function saveScmCustomerOrderManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/saveScmCustomerOrderManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
    }

// 출하의뢰 Main 삭제
export function deleteScmCustomerOrderManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/deleteScmCustomerOrderManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}

// 출하의뢰 Detail 삭제
export function deleteScmCustomerOrderManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/deleteScmCustomerOrderManageDetail`,
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
        url: `/api/v1/kier/scm/getComboPartnerId`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
    })
}