import axios from 'axios'

import store from '../store'

import envs from '@/envs'
import dayjs from 'dayjs'
import { getToken, setToken, setJWT, getUserCd, getDomainCd } from '@/utils/token'
import notify from 'devextreme/ui/notify'

let baseUrl = envs.buildUrl
let loadingQueue = [] // global loading에서 사용하기 위한 다중 호출 제어 Queue
let loadingInstance // 로딩 제어를 위한 인스턴스 포인터
let loadingTerm = 500 // API 비동기로 인해 시점이 안맞아서 깜빡거리는 현상을 제어하기 위한 텀 기간 부여 용

if (process.env.NODE_ENV === 'development') {
  // 개발 환경일 경우 API위치를 셋팅한 곳으로 정의한다.
  baseUrl = envs.devUrl
}

function _getDefaultMeta() {
  return {
    useTokenUpdate: false, // 받아온 response에서 token 값을 가져와 재 셋팅을 할 경우 true로 셋팅한다.
    useAuth: true, // 인증 모듈을 사용한다. false가 되었을 경우 401 상태에서도 Login 화면으로 가지 않는다. (i18n과 같은 특별한 경우에서만 사용)
    apiVersion: envs.apiVersion, // API 버전을 호출 API 별로 정의 한다. 기본 값은 envs에 정의한 값으로 셋팅된다.
    useErrorMessage: true, // response 시, 에러가 날 경우 에러 메시지를 출력하는 여부를 셋팅한다. 기본은 true
    useResponseAll: false, // request 실행 이후, API로 돌아오는 Obj를 Axios response 전문으로 변경되어 전달한다. 기본은 false
    useProgress: true, // API 사용 간 Global Lock Progressive Bar 를 사용하는 것을 의미.
    useErrorConfirm: true // API 사용 간 에러가 발생할 경우, Error 전문 Confirm box가 출력되는 여부
  }
}

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 20000 //timeout은 20초로 설정
})

// axios의 reqeust 인터셉터 진행 부
instance.interceptors.request.use(
  config => {
    let systemId = envs.systemId
    let logKey = dayjs().format('YYYYMMDDHHmmssSSS') + systemId
    let channel = 'WEB_' + 'agentType'
    let vname = 'UI'
    let lang = 'ko'
    let mid = 'name'

    // meta 값 기본 정의
    if (!config.meta) config.meta = {}
    config.meta = Object.assign(_getDefaultMeta(), config.meta)
    config.meta.logkey = logKey
    // 해더 구성
    // config.headers['X-Auth-Token'] = getToken()
    config.headers['X-APIVERSION'] = config.meta.apiVersion
    config.headers['X-LOGKEY'] = logKey
    config.headers['X-CHANNEL'] = channel
    config.headers['X-VNAME'] = vname
    config.headers['X-LANG'] = lang
    config.headers['X-MID'] = mid
    config.headers['X-CALLTYPE'] = '0'
    config.headers['X-APP'] = envs.systemId

    // API 고유 값과, 완료 상태 값 셋팅
    loadingQueue.push({
      key: logKey,
      done: false,
      time: dayjs().format('YYYYMMDDHHmmssSSS')
    })

    return config
  },
  error => {
    // 에러가 날경우 진행 부분
    //console.log('REQUEST error', error) // for debug
    Promise.reject(error)
    // 로딩 화면 닫기
    initLoadingProgress()

    let meta = error.request.config.meta
    var msg = error.message

    if (meta.useErrorMessage) {
      // 에러 경우 공통 에러 Confirm 창을 출력시킨다.
      store.dispatch('SetErrorMsg', { msg, status: error.request.status })
      store.dispatch('ShowErrorConfirm')
    }

    displaySystemErrorBar(false, error.request.status, msg)
  }
)

// loading progressivebar cloas 처리 및 API 실행 시간을 response 하는 로직
function checkLoadingProgress(meta) {
  let now = +new Date()
  let target = '' // _.find(loadingQueue, { key: meta.logkey })
  if (!target) {
    // 없는 경우, 방어 로직
    target = {
      time: now
    }
  }
  let loadingTime = now - target.time
  // API 비동기 딜레이 부여 (깜빡거림 방지)
  setTimeout(() => {
    target.done = true
    // 모든 비동기 API들이 다 수행됬는지 확인하는 로직
    if (loadingQueue.every(q => q.done)) {
      loadingQueue = []
      if (loadingInstance) loadingInstance.close()
    }
  }, loadingTerm)

  return loadingTime
}

// timeout 과 같은 에러 발생 시, 로딩 부분을 초기화
function initLoadingProgress() {
  loadingQueue = []
  if (loadingInstance) loadingInstance.close()
}

function displaySystemErrorBar(success, code, msg) {
  //document.getElementById('someElementId').className = 'cssClass';

  let fail = document.getElementById('systemBar')
  if (fail != null) {
    //msg =
    //  'SQL문법오류입니다. ERROR: column "ord_seq" is of type integer but expression is of type character varying Hint: You will need to rewrite or cast the expression. Position: 444'
    if (success != true) {
      
      msg = msg != undefined ? msg.replace('<br>', '') : ''
      var outerText = '오류ID' + ': ' + code + ' 메세지' + ': ' + msg.substring(0, 110) + '...'
      var tooltipText = '오류ID' + ': ' + code + ' 메세지' + ': ' + msg
      var backColor = code == -2000 ? 'gray' : 'red'
      fail.outerHTML =
        '<div class="v-system-bar  v-system-bar--lights-out theme--dark tooltip ' +
        backColor +
        ' lighten-1" id="systemBar" style="height: 24px;">' +
        '<i aria-hidden="true" class="v-icon notranslate mdi mdi-play theme--dark"></i><span title=\'' +
        tooltipText +
        "'>" +
        outerText +
        '</span>' +
        '<div class="spacer"></div><button type="button" class="pa-0 v-btn v-btn--icon v-btn--round theme--dark v-size--x-small" ' +
        "onclick=\"document.getElementById('systemBar').style.height ='0px'\">" +
        '<span class="v-btn__content">' +
        '<i aria-hidden="true" class="v-icon notranslate mdi mdi-close theme--dark"></i></span></button></div>'

    } else {
      fail.outerHTML =
        '<div style="height:0px !important;" class="v-system-bar v-system-bar--lights-out theme--dark red lighten-1" id="systemBar" style="height: 24px;"></div>'
    }
  }
}

// axios의 response 인터셉터
instance.interceptors.response.use(
  response => {
    let res = {}
    let meta = response.config.meta

    // header를 사용하기위해 report는 다르게 return 시킴
    if (response.headers.report === 'success') {
      // 한글 통신이 제대로 동작하지 않아 base64 인/디코딩을 통하여 파일명 통신
      response.headers.filename = Buffer.from(response.headers.filename, 'base64').toString('utf8')
      return response
    }

    // axios를 통해 response 내역 중 data에 서버에서 response된 값이 들어온다.
    // 각각 중복 랩핑 된 내역을 처리한다.
    if (response.data && response.data.datas) {
      res = response.data.datas
    } else if (response.data && response.data.data) {
      res = response.data.data
    } else if (response.data && response.data.dataList) {
      res = response.data.dataList
    } else {
      res = response.data
    }

    //
    if (!Array.isArray(res) && typeof res !== 'object') {
      // res 규격이 Object가 아닐 경우 Object로 셋팅
      res = {
        body: res
      }
    }

    // loading 및 시간 처리
    let execTime = checkLoadingProgress(meta)
    if (response.data && response.data.result) {
      if (typeof response.data.result === 'object') {
        res.result = response.data.result
      } else res.result = {}
    } else {
      res.result = {}
    }

    // API 수행 시간 적용
    res.result.execTime = execTime
    res.result.resMsg = ''
    if (res.result.total) {
      let tmpl = _.template('${total}건 중, ${success}건 성공, ${fail}건 실패. ${execTime}ms')
      let t = res.result.total
      res.result.resMsg = tmpl({
        total: t.count,
        success: t.success,
        fail: t.fail,
        execTime: execTime
      })
    }

    // useTokenUpdate 값이 true면 response headers 의 값을 받아와 token 값 업데이트
    if (meta.useTokenUpdate) {
      //setJWT(response.headers['jwt']) //20220324 LYJ [사용하지 않는거 같아 막음]
      setToken(response.headers['x-auth-token'])
    }

    // Axios 전문을 원할 경우 아래의 meta 값을 셋팅해서 사용한다.
    if (meta.useResponseAll) return response

    //공통 NOTIFY 처리 20220503 LYJ -- 차후에 언어로 제처리 예정
    if (
      response.config.Notify &&
      response.config.Notify.use &&
      response.config.Notify.use == true &&
      response.config.Notify.apitype &&
      response.config.Notify.apitype != undefined
    ) {
      if (response.config.Notify.apitype == 'searched') notify('조회되었습니다.', 'success', 300)
      if (response.config.Notify.apitype == 'saved') notify('저장되었습니다.', 'success', 300)
      if (response.config.Notify.apitype == 'deleted') notify('삭제되었습니다.', 'success', 300)
    }

    //백엔드 excetion 처리된 에러 표시 20220503 by lyj
    if (response.data.code != 200)
      if (response.config.responseType == 'blob') {
        if (response.status == 200 && response.statusText == 'OK') {
          response.data.success = true
        } else {
          response.data.success = false
          response.data.code = response.status
          response.data.msg = response.statusText + '>> 파일을 다운로드하는데 실패하였습니다.'
        }
        if (response.headers.customheader != 'OK') {
          res.result.success = response.data.success = false
          response.data.code = 9999
          response.data.msg = response.headers.customheader
        } else {
          res.result.success = response.data.success = true
        }
      }

    //test
   
    // console.log(response)
    res.success = !response.data.error
    if(!res.success)
      displaySystemErrorBar(false, response.data.status, response.data.error.message)
    return res
  },
  error => {
    var displayErrorCode = error.response.status
    var displayErrorMessage = error.message

    // response 부분 객체 내 meta 사용을 위한 기본 값 셋팅
    let meta = {}
    // request 기본 에러 값은 499로 설정한다.
    let status = '499'
    var msg = error.message

    if (error.response && error.response.config) {
      // request에서 meta 값이 있을 경우
      meta = error.response.config.meta
      checkLoadingProgress(meta)
    } else {
      meta = _getDefaultMeta()
      initLoadingProgress()
    }

    if (error.response) {
      // 토큰만료 /refreshtoken으로 재발급
      // 헤더에 refreshtoken으로 재발급여부 코드가 있어야 진행,, 없을경우 기존처럼 token만료 -> 로그인화면
      if (error.response.data.code == -1002 && error.response.status === 401 && error.response.config.meta.refreshToken) {
        store
          .dispatch('reissueToekn', {
            usercd: getUserCd()
            //domainCd: getDomainCd()
          })
          .then(response => {
            //토큰 발급 후 추가로직 작성
          })

        return Promise.reject(error)
      }

      // result에 메시지가 있을 경우 메시징 추가 처리
      if (error.response.data && error.response.data.result && error.response.data.result.desc) {
        msg = error.response.data.result.desc
      }

      status = error.response.status
    }

    //에러 NOTIFY 공통처리 20220503 LYJ
    if (error.response.data.code == null) {
      msg = '메세지' + ': ' + '서버와의 연결이 불안정합니다.'
    } else {
      msg = '오류ID' + ': ' + error.response.data.code + ', 메세지' + ': ' + error.response.data.msg
    }

    // 에러 출력이 가용할 경우
    if (meta.useErrorMessage) {
      // 에러 경우 공통 에러 Confirm 창을 출력시킨다.
      store.dispatch('SetErrorMsg', { msg, status })
      store.dispatch('ShowErrorConfirm')
    }

    //백엔드 excetion 처리된 에러 표시 20220503 by lyj
    displaySystemErrorBar(false, status, msg)

    return Promise.reject(error)
  }
)

export default instance
