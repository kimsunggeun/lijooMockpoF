import request from '@/utils/request'


// 입하처리  리스트 조회
export function getPalletOut(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getPalletOut`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
  }




  
// 입하처리  pallet mapping 조회
export function getPalletOutMapping(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getPalletOutMapping`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
  }

  //입하처리 디테일 조회
export function getPalletOutDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/getPalletOutDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'searched' },
    })
  }

  //입하처리 저장
export function savePalletOut(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/savePalletOut`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
  }


      //입하처리 저장
export function savePalletOutDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/savePalletOutDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'saved' },
    })
  }
      //입하처리삭제
export function deletePalletOutDetail(params, isProgress) {
    return request({
        url: `/api/v1/kier/wms/deletePalletOutDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
        Notify: { use: isProgress, apitype: 'deleted' },
    })
  }




//입하처리 수동라인  메인 조회




export function getPalletOutFork(params, isProgress) {
  return request({
      url: `/api/v1/kier/wms/getPalletOutFork`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}


//입하처리 저장 




export function savePalletOutFork(params, isProgress) {
  return request({
      url: `/api/v1/kier/wms/savePalletOutFork`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
  })
}

//입하처리 디테일 조회  조회




export function getPalletOutForkDetail(params, isProgress) {
  return request({
      url: `/api/v1/kier/wms/getPalletOutForkDetail`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'searched' },
  })
}
//입하처리 디테일 저장 




export function savePalletOutForkDetail(params, isProgress) {
  return request({
      url: `/api/v1/kier/wms/savePalletOutForkDetail`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'saved' },
  })
}

//입하처리 디테일 삭제
export function deletePalletOutForkDetail(params, isProgress) {
  return request({
      url: `/api/v1/kier/wms/deletePalletOutForkDetail`,
      meta: { apiVersion: '1.0.0' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: params,
      Notify: { use: isProgress, apitype: 'deleted' },
  })
}











  // 팔레트 자동화 품목

export function getComboMatCdPalletOut(params) {
    return request({
        url: `/api/v1/kier/wms/getComboMatCdPalletOut`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
    })
  }

  // 팔레트 자동화 팔레트

export function getCombopalletIdPalletOut(params) {
    return request({
        url: `/api/v1/kier/wms/getCombopalletIdPalletOut`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
    })
  }

  

  // 팔레트 지개차 품목

export function getComboMatCdPalletOutFork(params) {
    return request({
        url: `/api/v1/kier/wms/getComboMatCdPalletOutFork`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
    })
  }

  // 팔레트 지개차 팔레트

export function getCombopalletIdPalletOutFork(params) {
    return request({
        url: `/api/v1/kier/wms/getCombopalletIdPalletOutFork`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
    })
  }



  //팔레트 전부 포함 Nm


  export function getCombopalletIdPalletOutDetail(params) {
    return request({
        url: `/api/v1/kier/wms/getCombopalletIdPalletOutDetail`,
        meta: { apiVersion: '1.0.0' },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params,
    })
  }


  