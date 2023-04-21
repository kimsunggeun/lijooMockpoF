import request from '@/utils/request'
  
// 출하의뢰 Main 조회
export function getScmOrderManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/getScmOrderManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 출하의뢰 Detail 조회
export function getScmOrderManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/getScmOrderManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

// 출하의뢰 Main 저장
export function saveScmOrderManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/saveScmOrderManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
}

// 출하의뢰 Detail 저장
export function saveScmOrderManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/saveScmOrderManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
    }

// 출하의뢰 Main 삭제
export function deleteScmOrderManageMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/deleteScmOrderManageMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}

// 출하의뢰 Detail 삭제
export function deleteScmOrderManageDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/scm/deleteScmOrderManageDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}