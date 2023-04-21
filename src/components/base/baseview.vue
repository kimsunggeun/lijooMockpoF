<template>
  <div>
    <!-- <VueToastify></VueToastify>
    <slot></slot> -->
    <!--the appropriate input should go here-->
    <!-- 각 페이지에 공통으로 처리할 부모 페이지 구성입니다 BY LYJ -->
    <!-- 1. 페이지 권한 공통처리 BY LYJ -->
  </div>
</template>
<script>
import { getUserCd } from '@/utils/token'
import localStore from '@/utils/localStore'

export default {
  name: 'baseview',
  components: {},
  data: function() {
    return {
      childComponent: null,
      topIndex: this.$route.query == undefined ? '' : this.$route.query.topIndex,
      topMenuId: this.$route.query == undefined ? '' : this.$route.query.tMenu,
      menuid: this.$route.query == undefined ? '' : this.$route.query.selMenuid,
      grid: {
        width: '100%',
        columnHidingEnabled: true
      },
      pager: {
        visible: true,
        showNavButtons: true,
        showPageSizeSelector: true,
        pageCount: 15,
        showInfo: true,
        navigationMode: 'PagerNavigationMode.Auto',
        displayMode: 'full', //full, compact
        visibleNumericButtonCount: '4',
        pageSizes: [5, 10, 'all']
      },
      // comp: {
      //   id: this.$store.state.app.compId == '' ? JSON.parse(localStore.get('user_info'))[0].content : this.$store.state.app.compId
      // },
    }
  },
  created() {
    //remove event
    this.$EventBus.$off(`${this.menuid}_callByChangingConfig`)
    this.$EventBus.$off(`${this.menuid}_RouteRefresh`)
    this.$EventBus.$off(`${this.menuid}_notifyAction`)

    //20220406 LYJ 컴포넌트간의 통신을 위한 이벤트 등록(각 담당자들은 요런방식으로 받아서 사용하세요)
    this.$EventBus.$on(`${this.menuid}_callByChangingConfig`, info => {
      //this.refreshRouter(`${msg}`)
      this.setCompInfo(info)
    })

    this.$EventBus.$on(`${this.menuid}_RouteRefresh`, info => {
      this.menuid = this.$route.query == undefined ? '' : this.$route.query.selMenuid
      this.RouteRefresh()
    })

    //20220520 LYJ
    //recieved common popupNotify event handling
    //type:yes, no, confirm
    this.$EventBus.$off(`${this.menuid}_notifyAction`)
    this.$EventBus.$on(`${this.menuid}_notifyAction`, notify => {
      if (notify.action != undefined) {
        if (notify.notifyInfo.useLoding != undefined && notify.notifyInfo.useLoding == true) this.openLoading()
        notify.action(this.$root.$children[0].$children[0].$children[0].$refs['componentRef'])
        if (notify.notifyInfo.useLoding != undefined && notify.notifyInfo.useLoding == true) this.endLoading()
      }
    })

  },
  computed: {
    PagerAttr() {
      return this.pager
    }
  },
  mounted() {},
  activated() {
    this.$EventBus.$emit('refreshMenu', { topIndex: this.topIndex, topMenuId: this.topMenuId })
  },
  deactivated() {
  },
  methods: {
    BaseInitialize() {
    },
    RouteRefresh() {
      //자식에서 재정의하면 오버라이드됩니다.
      //자식에서 재정의해서 필요코드 구현하세요.\
    },
    //20220406 LYJ 컴포넌트간의 통신을 위한 이벤트 등록(각 담당자들은 요런방식으로 받아서 사용하세요)
    setCompInfo(info) {
      this.comp = { id: info.compId }
    },
    showLoadPanel() {
      this.loadingVisible = true
    },
    //
    openLoading(msg) {
      this.$EventBus.$emit('openLoading')
    },
    //
    endLoading() {
      this.$EventBus.$emit('endLoading')
    },

    //MessageType: info, warn, error, question
    vToastify(body, messageType) {
      this.$EventBus.$emit('popupNotify', { body: body, popupType: 'confirm', messageType: messageType, useLoding: false })
    },
    vToastifyConfirm(body, messageType, confirmAction) {
      this.$EventBus.$emit('popupNotify', {
        body: body,
        popupType: 'confirm',
        messageType: messageType,
        confirmAction: confirmAction,
        useLoding: false
       })
    },
    vToastifyPrompt(body, messageType, yesAction, noAction, useLoding) {
      this.$EventBus.$emit('popupNotify', {
        body: body,
        popupType: 'yesno',
        messageType: messageType,
        yesAction: yesAction,
        noAction: noAction,
        useLoding: useLoding
      })
    },

    getUserCd() {
      return getUserCd()
    },
    ///////////////////////////////////////
    /*           Dev grid Event          */
    ///////////////////////////////////////
    baseFilterIconClick() {
      // 그리드 찾기
      let childrenCompoent = this.$parent.$children
      let gridComponent = childrenCompoent.find(element => {
        return element.instance ? element.instance.NAME === 'dxDataGrid' : false
      })

      // 필터 초기화
      gridComponent.instance.clearFilter()
      // 현재의 필터 상태
      let filterState = gridComponent.instance.option('filterRow.visible')
      gridComponent.instance.option('filterRow.visible', !filterState)
    },
    baseFindIconClick(value) {
      // 그리드 찾기
      let childrenCompoent = this.$parent.$children
      let gridComponent = childrenCompoent.find(element => {
        return element.instance ? element.instance.NAME === 'dxDataGrid' : false
      })

      // 검색
      gridComponent.instance.searchByText(value)
    }
  },
  beforeDestroy() {
    this.$EventBus.$off(`${this.menuid}_callByChangingConfig`)
    this.$EventBus.$off(`${this.menuid}_RouteRefresh`)
    this.$EventBus.$off(`${this.menuid}_notifyAction`)
  }
}
</script>
<style lang="scss" scoped></style>
