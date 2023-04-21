import request from '@/utils/request'

// 공통코드 Main Combo 조회
export function getComboCommonCodeMain(majorCd) {
    return request({
        url: `/api/v1/kier/system/getComboCommonCodeMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {code: majorCd},
    })
}

// 공통코드 Detail Combo 조회
export function getComboCommonCodeDetail(majorCd) {
    return request({
        url: `/api/v1/kier/system/getComboCommonCodeDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {code: majorCd},
    })
}

//공통코드 조회
export function getListMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/system/getlistMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

//상세코드 조회
export function getListDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/system/getlistDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
}

//공통코드 저장
export function saveListMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/system/savelistMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
}

//상세코드 저장
export function saveListDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/system/savelistDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
}

//공통, 상세코드 삭제
export function deletelistAll(params, isProgress) {
    return request({
        url: `/api/v1/kier/system/deletelistAll`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}

//공통코드 삭제
export function deletelistMain(params, isProgress) {
    return request({
        url: `/api/v1/kier/system/deletelistMain`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}

//상세코드 삭제
export function deletelistDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/system/deletelistDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
}