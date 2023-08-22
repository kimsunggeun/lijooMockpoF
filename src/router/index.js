import Vue from 'vue'
import VueRouter from 'vue-router'
import envs from '@/envs'
import EventBus from '@/utils/event-bus'
import store from '@/store/modules/user.js'

import Layout from '@/layout/layout.vue'
import Login from '@/layout/login/Login.vue'
import Logout from '@/layout/login/Logout'

// f

import pageNotFound from '@/views/error/404'
import dashboard from '@/views/monitoring/Dashboard'
import inspection from '@/views/error/inspection' //점검중
import preparing from '@/views/error/preparing' //준비중

//system
import SysCodeManage from '@/views/system/SysCodeManage'
import ProgManage from '@/views/system/ProgManage'
import MenuManage from '@/views/system/MenuManage'
import MenuPermission from '@/views/system/MenuPermission'
//standard
import StCommonCodeManage from '@/views/standard/CommonCodeManage'
import PartnerManage from '@/views/standard/PartnerManage'
import PartnerEmployeeManage from '@/views/standard/PartnerEmployeeManage'
import MatGroupManage from '@/views/standard/MatGroupManage'
import CommonMatManage from '@/views/standard/MatManage'
import RFIDTagManage from '@/views/standard/RFIDTagManage'
import PalletManage from '@/views/standard/PalletManage'
import LocationManage from '@/views/standard/LocationManage'
import OrgManage from '@/views/standard/OrgManage'
import HRManage from '@/views/standard/HRManage'

//scm
import CustomerOrderManage from '@/views/scm/CustomerOrderManage'
import CustomerOrderInfo from '@/views/scm/CustomerOrderInfo'
import OrderManage from '@/views/scm/OrderManage'
import InvoiceManage from '@/views/scm/InvoiceManage'
import PurchasingOrderInfo from '@/views/scm/PurchasingOrderInfo'

//wms
import PurchasingOrderManage from '@/views/wms/PurchasingOrderManage' //발주관리
import CustomerOrderWMSInfo from '@/views/wms/CustomerOrderWMSInfo' //출하의뢰정보
import DispatcherManage from '@/views/wms/DispatcherManage' //배차 인원 관리
import CargoArrivalManage from '@/views/wms/CargoArrivalManage' //입하처리
import PalletInManage from '@/views/wms/PalletInManage' //입고 관리
import PalletOutManage from '@/views/wms/PalletOutManage' //출고 관리
import CargoDeleveryManage from '@/views/wms/CargoDeleveryManage' //출하 처리
import WCSWorkInfo from '@/views/wms/WCSWorkInfo' //작업 지시서 조회
import MaterialInfo from '@/views/wms/MaterialInfo' //재고 조회
import InOutInfo from '@/views/wms/InOutInfo' //수불 정보
import MatAdjustManage from '@/views/wms/MatAdjustManage' //재고 조정
import MatClosedManage from '@/views/wms/MatClosedManage' //마감 관리


//equipmaint
import equipManage from '@/views/equipmaint/equipManage' //설비 관리
import EquipCheckManage from '@/views/equipmaint/equipCheckManage' //유지보수 관리
import EquipStatusInfo from '@/views/equipmaint/EquipStatusInfo' //설비 상태 조회
import MaintenanceManage from '@/views/equipmaint/MaintenanceManage' //보전 관리
import RepairManage from '@/views/equipmaint/RepairManage' //유지보수 관리

//pop  a
import PalletMatManage from '@/views/pop/PalletMatManage' //Pallet & 재고 매핑
import PalletInManual from '@/views/pop/PalletInManual' //입고 처리(수동 라인)
import PalletOutManual from '@/views/pop/PalletOutManual' //출고 처리(수동 라인)
import PalletInRemain from '@/views/pop/PalletInRemain' //잔량 입고
import LineInfo from '@/views/pop/LineInfo' //LINE 정보

import { getToken } from '@/utils/token'
import { Store } from 'vuex'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/Login',
      component: Layout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: dashboard
        },

        {
          path: '/pageNotFound',
          name: 'pageNotFound',
          component: pageNotFound
        },

      
        //서비스 점검중
        {
          path: '/inspection',
          name: 'inspection',
          component: inspection
        },
        //서비스 준비중
        {
          path: '/preparing',
          name: 'preparing',
          component: preparing
        },

        //system
          //공통코드 관리
          {
            path: '/SysCodeManage',
            name: 'SysCodeManage',
            component: SysCodeManage
          },
          //프로그램 관리
          {
            path: '/ProgManage',
            name: 'ProgManage',
            component: ProgManage
          },
          //메뉴 관리
          {
            path: '/MenuManage',
            name: 'MenuManage',
            component: MenuManage
          },
          {
            path: '/MenuPermission',
            name: 'MenuPermission',
            component: MenuPermission
          },

        //standard
           //공통코드 관리
          {
            path: '/CommonCodeManage',
            name: 'CommonCodeManage',
            component: StCommonCodeManage
          },
          //협력사 관리
          {
            path: '/PartnerManage',
            name: 'PartnerManage',
            component: PartnerManage
          },
          //협력사 인원 관리
          {
            path: '/PartnerEmployeeManage',
            name: 'PartnerEmployeeManage',
            component: PartnerEmployeeManage
          },
          //품목그룹 관리
          {
            path: '/MatGroupManage',
            name: 'MatGroupManage',
            component: MatGroupManage
          },
          //품목 관리
          {
            path: '/CommonMatManage',
            name: 'CommonMatManage',
            component: CommonMatManage
          },
          //RFID Tag 관리
          {
            path: '/RFIDTagManage',
            name: 'RFIDTagManage',
            component: RFIDTagManage
          },
          //Pallet 관리
          {
            path: '/PalletManage',
            name: 'PalletManage',
            component: PalletManage
          },
          //Location 관리
          {
            path: '/LocationManage',
            name: 'LocationManage',
            component: LocationManage
          },
          //조직 관리
          {
            path: '/OrgManage',
            name: 'OrgManage',
            component: OrgManage
          },
          //인원 관리
          {
            path: '/HRManage',
            name: 'HRManage',
            component: HRManage
          },

        //scm
           //출하의뢰
           {
            path: '/CustomerOrderManage',
            name: 'CustomerOrderManage',
            component: CustomerOrderManage
          },
          //출하납품정보
          {
            path: '/CustomerOrderInfo',
            name: 'CustomerOrderInfo',
            component: CustomerOrderInfo
          },
          //주문정보
          {
            path: '/orderManage',
            name: 'orderManage',
            component: OrderManage
          },
          //거래명세서 관리
          {
            path: '/InvoiceManage',
            name: 'InvoiceManage',
            component: InvoiceManage
          },
          //발주납품정보
          {
            path: '/PurchasingOrderInfo',
            name: 'PurchasingOrderInfo',
            component: PurchasingOrderInfo
          },

        //wms
          //발주관리
          {
            path: '/PurchasingOrderManage',
            name: 'PurchasingOrderManage',
            component: PurchasingOrderManage
          },
          //출하의뢰정보
          {
            path: '/CustomerOrderWMSInfo',
            name: 'CustomerOrderWMSInfo',
            component: CustomerOrderWMSInfo
          },
          //배차 인원 관리
          {
            path: '/DispatcherManage',
            name: 'DispatcherManage',
            component: DispatcherManage
          },
          //입하 처리
          {
            path: '/CargoArrivalManage',
            name: 'CargoArrivalManage',
            component: CargoArrivalManage
          },
          //입고 관리
          {
            path: '/PalletInManage',
            name: 'PalletInManage',
            component: PalletInManage
          },
          //출고 관리
          {
            path: '/PalletOutManage',
            name: 'PalletOutManage',
            component: PalletOutManage
          },
          //출하 처리
          {
            path: '/CargoDeleveryManage',
            name: 'CargoDeleveryManage',
            component: CargoDeleveryManage
          },
          //작업 지시서 조회
          {
            path: '/WCSWorkInfo',
            name: 'WCSWorkInfo',
            component: WCSWorkInfo
          },
          //재고 조회
          {
            path: '/MaterialInfo',
            name: 'MaterialInfo',
            component: MaterialInfo
          },
          //수불 정보
          {
            path: '/InOutInfo',
            name: 'InOutInfo',
            component: InOutInfo
          },
          //재고 조정
          {
            path: '/MatAdjustManage',
            name: 'MatAdjustManage',
            component: MatAdjustManage
          },
          //마감 관리
          {
            path: '/MatClosedManage',
            name: 'MatClosedManage',
            component: MatClosedManage
          },

          //equipmaint

          //설비관리
          {
            path: '/equipManage',
            name: 'equipManage',
            component: equipManage
          },

          //설비 법정검사
          {
            path: '/EquipCheckManage',
            name: 'EquipCheckManage',
            component: EquipCheckManage
          },
          //설비 상태 조회
          {
            path: '/EquipStatusInfo',
            name: 'EquipStatusInfo',
            component: EquipStatusInfo
          },


          //보전 관리
          {
            path: '/MaintenanceManage',
            name: 'MaintenanceManage',
            component: MaintenanceManage
          },

          //유지보수 관리
          {
            path: '/RepairManage',
            name: 'RepairManage',
            component: RepairManage
          },

          
          //pop

          //Pallet & 재고 매핑
          {
            path: '/PalletMatManage',
            name: 'PalletMatManage',
            component: PalletMatManage
          },
          //입고 처리(수동 라인)
          {
            path: '/PalletInManual',
            name: 'PalletInManual',
            component: PalletInManual
          },
          //출고 처리(수동 라인)
          {
            path: '/PalletOutManual',
            name: 'PalletOutManual',
            component: PalletOutManual
          },
          //잔량 입고
          {
            path: '/PalletInRemain',
            name: 'PalletInRemain',
            component: PalletInRemain
          },
          //LINE 정보
          {
            path: '/LineInfo',
            name: 'LineInfo',
            component: LineInfo
          },











          //404페이지 구성

   

      ]
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})

router.beforeEach(function (to, from, next) {


  if (!store.state.isLogin && to.name != 'login' && sessionStorage.length == 0) {
   next('/login')
    return 
  }
  else {
    next()
  }
 next()


  
 
})

//모듈을 찾을 수 없다면 404 페이지로 이동처리
router.onError(function(e) {
  console.log(e)
  if (e.code === 'MODULE_NOT_FOUND') router.push('/pageNotFound').catch(e => {})
})

//네비게이션 가드(전역 가드) : 사용자의 인증 정보가 없으면 특정 페이지에 접근하지 못하게 할 때 사용하는 기술입니다.
//router.beforeEach( function (to, from, next) {
//to : 이동할 url
//from : 현재 url
//next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수

//to: 이동할 url에 해당하는 라우팅 객체
//console.log("routing 1 : '" + to.path + "'" );
//console.log("routing 2 : '" + from.path + "'" );

//store.dispatch('SetHeaderUse', to.meta.headerView !== false)

// if (to.matched.some(function (routeInfo)
// {
//   console.log("routeInfo.meta.authRequired: " + routeInfo.meta.authRequired)
//     return routeInfo.meta.authRequired;
// })) {
//     next('/login')
//     return

// } else {
//     console.log("routing success : '" + to.path + "'" )
//     next();
//     return
// }

//})

export default router
