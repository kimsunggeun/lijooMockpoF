<template>
  <div class="d-flex">
    <v-btn v-if="refresh" text icon x-large color="blue darken-2" @click="clickRefresh()">
      <v-icon> mdi-cached </v-icon>
    </v-btn>

    <i-button
      v-for="btn in buttonList"
      :key="`btn_${btn.id}`"
      color="btn_bg"
      :iconPre="true"
      :icon="btn.icon"
      :text="btn.text"
      :role="`${btn.id}`"
      class="ml-1 font-weight-bold pr-7 pl-1 pr-md-6"
      @click="clickButton(btn)"
    >
    </i-button>

    <v-menu v-if="usePrint" content-class="report-menu" offset-y :close-on-click="true">
      <template v-slot:activator="{ on }">
        <!-- i-button 같은 템플릿으로 한번 감쌀경우 적용이 안되어 v-btn 사용 -->
        <v-btn
          class="rounded-0 ml-1 font-weight-bold pr-7 pl-1 pr-md-6"
          outlined
          v-on="on"
          color="btn_bg"
          :style="`height: 30px;`"
          fontWeight="13px"
          height="30px"
          max-height="30px"
          min-height="30px"
          :role="`${printButton.id}`"
        >
          <v-icon class="float-left" :color="fontColor"> ${{ printButton.icon }} </v-icon>

          <div class="float-center mx-1" :style="computedFontStyle">
            {{ printButton.text }}
          </div>
        </v-btn>
      </template>
      <div v-for="(reportbtn, index) in reportItems" :key="`btn_${reportbtn.role}`">
        <v-divider v-if="index !== 0" style="" />
        <v-btn width="100%" depressed text class="px-3" @click="clickButton(reportbtn)">
          {{ reportbtn.title }}
        </v-btn>
      </div>
    </v-menu>
  </div>
</template>

<script>
import localStore from '@/utils/localStore'
import iButton from './iButton.vue'
import store from '@/store'

export default {
  components: { iButton },
  name: 'i-button-list',
  props: {
    useBtnList: {
      type: Array,
      default: () => [''],
    },
    refresh: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedFontStyle() {
      let fontColor = this.fontColor
      if (this.disabled) {
        fontColor = 'content'
      }
      return {
        color: '#000',
        'font-size': this.fontSize + 'px',
        'letter-spacing': '0.5px',
        'font-weight': this.fontWeight,
        'line-height': 1.8,
      }
    },
  },
  data() {
    return {
      // icon은 assets/theme/vuetify/ 적용되고 있는 esg0x.js 참조
      buttonList: [
        { id: 'btnSearch', text: '조회', icon: 'search' },
        { id: 'btnAdd', text: '추가', icon: 'plus' },
        { id: 'btnSave', text: '저장', icon: 'save' },
        { id: 'btnDelete', text: '삭제', icon: 'delete' },
        { id: 'btnPrint', text: '출력', icon: 'print' },
        { id: 'btnClose', text: '닫기', icon: 'close' },
        { id: 'btnConfirm', text: '확인', icon: 'confirm' },
        { id: 'btnCancel', text: '취소', icon: 'cancel' },
        { id: 'btnEditCancel', text: '편집취소', icon: 'reload' },
        { id: 'btnCapture', text: '캡처', icon: 'camera' },
        { id: 'btnApply', text: '적용', icon: 'apply' },
        { id: 'btnCopy', text: '복사', icon: 'copy' },
        { id: 'btnDataSearch', text: '집계 조회', icon: 'data_search' },
        { id: 'btnRefresh', text: '초기화', icon: 'reload' },
      ],
      progCd: this.$route.meta.proc_cd,
      menuId: this.$route.query == undefined ? '' : this.$route.query.selMenuid,
      savAh: '', //저장
      schAh: '', //조회
      delAh: '', //삭제
      exlAh: '', //엑셀출력(프린트)
      fn1Ah: '', //기능1
      fn2Ah: '', //기능2
      fn3Ah: '', //기능3
      usePrint: false,
      printButton: null,
      reportItems: [
        { role: 'pptx', title: 'PPT' },
        { role: 'pdf', title: 'PDF' },
        { role: 'docx', title: 'DOCX' },
        // { role: 'html', title: 'WEB'},
        { role: 'xls', title: 'EXCEL' },
      ],
      fontColor: '#000',
    }
  },
  created() {
    // useBtnList에서 받은 id로 필터링
    this.buttonList = this.buttonList.filter((btn) => {
      return this.useBtnList.includes(btn.id)
    })
  },
  mounted() {
    // this.getAuthority()
    // this.printSetting()
  },
  methods: {
    clickButton(targetButton) {
      this.$emit('btnClick', targetButton)
    },
    clickRefresh() {
      this.$emit('btnRefreshClick')
    },
    //각 메뉴별 조회, 추가, 저장, 삭제 정보 조회
    getAuthority() {
      // 조회 api
      // 사용자권한메뉴조회
      let authGrps = JSON.parse(localStore.get('myAuthGrps')).find((x) => x.progCd == this.progCd && x.menuId == this.menuId)
      if (authGrps != null) {
        this.schAh = authGrps.schAh
        this.savAh = authGrps.savAh
        this.delAh = authGrps.delAh
        this.exlAh = authGrps.exlAh
      }

      //버튼권한별 View
      let authButtonList = this.buttonList.filter((btn) => {
        if (
          (btn.id == 'btnSearch' && this.schAh == 'Y') ||
          (btn.id == 'btnAdd' && this.savAh == 'Y') ||
          (btn.id == 'btnSave' && this.savAh == 'Y') ||
          (btn.id == 'btnDelete' && this.delAh == 'Y') ||
          (btn.id == 'btnPrint' && this.savAh == 'Y') ||
          (btn.id == 'btnConfirm' && this.savAh == 'Y') ||
          (btn.id == 'btnApply' && this.savAh == 'Y') ||
          btn.id == 'btnCapture' ||
          btn.id == 'btnEditCancel' ||
          btn.id == 'btnCopy' ||
          btn.id == 'btnDataSearch' ||
          btn.id == 'btnRefresh'
        ) {
          return this.useBtnList.includes(btn.id)
        }
      })
      this.buttonList = authButtonList
    },

    // 레포트용 출력 설정
    printSetting() {
      let findIndex = this.buttonList.findIndex((element) => element.id === 'btnPrint')
      this.buttonList
      if (findIndex > -1) {
        this.usePrint = true
        this.printButton = this.buttonList.find((element) => element.id === 'btnPrint')
        this.reportItems.forEach((element) => {
          Object.assign(element, this.printButton)
        })
        this.buttonList = this.buttonList.filter((element) => element.id !== 'btnPrint')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.v-btn {
  background: #ffffff;
}

.v-btn.v-size--default {
  font-size: 13px;
}

.report-menu {
  z-index: 10 !important;
}

.v-icon.v-icon {
  font-size: 20px;
  padding-right: 4px;
  padding-top: 3px;
}
</style>
