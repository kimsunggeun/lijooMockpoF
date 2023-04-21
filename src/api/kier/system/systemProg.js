import request from '@/utils/request'

//프로그램
export function getProgram(progNm) {
    return request({
      url: `/api/v1/kier/systemProg/getProgram`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data:{progNm}
      
    })
}




// 프로그램 저장
export function updateProgram(param) {
  return request({
    url: `/api/v1/kier/systemProg/saveProgram` ,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json' },
    data: param,
  
  })
}

// 프로그램 삭제
export function deleteProgram(param) {
  return request({
    url: `/api/v1/kier/systemProg/deleteProgram`,
    method: 'POST',
    meta: { apiVersion: '1.0.0' },
    headers: { 'Content-Type': 'application/json' },
    data: param
    
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

