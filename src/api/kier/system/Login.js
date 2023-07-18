import request from '@/utils/request'

// 공통코드 Main Combo 조회
export function getLogin(params) {
    return request({
        url: `/api/getLogin`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data:  params,
    })
}

