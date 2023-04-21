import request from '@/utils/request'

//프로그램
export function getProgram(params, isProgress) {
  return request({
      url: `/api/v1/kier/systemProg/getProgram`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}



// 프로그램 저장

export function updateProgram(params, isProgress) {
  return request({
      url: `/api/v1/kier/systemProg/saveProgram`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
  })
}
// 프로그램 삭제
export function deleteProgram(params, isProgress) {
  return request({
      url: `/api/v1/kier/systemProg/deleteProgram`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'deleted' },
  })
}








//프로그램 콤보
export function getComboProgram() {
  return request({
    url: `/api/v1/kier/systemProg/getComboProgram`,
    meta: { apiVersion: '1.0.0' },
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {}
  })
}