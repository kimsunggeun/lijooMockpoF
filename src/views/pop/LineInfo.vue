<template>
  <v-container fill-height align-start ma-0 pa-2>
    <v-row no-gutters class="matgrid-height">
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0" :key="refreshKey">
        <v-carousel height="100%" :show-arrows="false" v-model="carouselIdx">
          <v-carousel-item>
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
                align="center"
                style="border: thin solid rgba(0, 0, 0, 0.12); background-color: rgb(217, 222, 238)"
              >
                <span class="headGubun">자동화 라인</span>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" align="right" class="pa-0 refreshBtn">
                <img :src="require(`@/assets/images/refreshBtn.png`)" style="width: 20px; cursor: pointer" @click="refresh" />
                <span style="font-size: 30px; margin-left: 5px; cursor: pointer" @click="refresh">REFRESH </span>
                <span style="font-size: 20px"> 업데이트 : {{ this.upTime }}</span>
              </v-col>
              <v-col cols="12" class="pa-1 pt-0 pb-0">
                <i-card-vertical headerTitle="■ S/C 작업 현황">
                  <template v-slot:body>
                    <v-layout style="border: 1px solid; border-radius: 10px; height: 30%">
                      <v-col cols="12" sm="2" md="2" lg="2" align="center">
                        <v-img height="180" :src="require(`@/assets/images/lineInfoImage.jpg`)" />
                      </v-col>
                      <v-col cols="12" sm="10" md="10" lg="10" class="pa-2 pt-4">
                        <v-row no-gutters>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <span class="px-1 pt-1 scData">● 작업지시서 번호 : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="ma-0">
                            <v-text-field :value="jobNo" dense outlined solo readonly />
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <span class="px-1 pt-1 scData">● 작업 상태 : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2">
                            <v-text-field :value="status" dense outlined solo readonly />
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <span class="px-1 pt-1 scData">● 완료 여부 : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2">
                            <v-text-field :value="compelteYn" dense outlined solo readonly />
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-1 pt-2">
                            <span class="scData">● 작업지시 구분 : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <v-text-field :value="jobDiv" dense outlined solo readonly />
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-1 pt-2">
                            <span class="scData">● Pallet ID : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <v-text-field :value="palletId" dense outlined solo readonly />
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-1 pt-2">
                            <span class="scData">● RFID Tag : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <v-text-field :value="rfidTag" dense outlined solo readonly />
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-1 pt-2">
                            <span class="scData">● 우선 순위 : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <v-text-field :value="priority" dense outlined solo readonly />
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-1 pt-2">
                            <span class="scData">● RACK 행/열/단 : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <v-text-field :value="scColRowLev" dense outlined solo readonly />
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-1 pt-2">
                            <span class="scData">● 위치 : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <v-text-field :value="position" dense outlined solo readonly />
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-1 pt-2">
                            <span class="scData">● 작업 시작 시간 : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <v-text-field :value="jobStAt" dense outlined solo readonly />
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-1 pt-2">
                            <span class="scData">● 작업 완료 시간 : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <v-text-field :value="jobEdAt" dense outlined solo readonly />
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-1 pt-2">
                            <span class="scData">● 작업 상태 정보 : </span>
                          </v-col>
                          <v-col cols="12" sm="2" md="2" lg="2" class="px-0 pt-1">
                            <v-text-field :value="statusDesc" dense outlined solo readonly />
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-layout>
                  </template>
                </i-card-vertical>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="7" class="pa-1 pt-0" style="border: 1px solid; border-radius: 10px">
                <v-row class="pt-2">
                  <v-col cols="12" class="pa-0">
                    <span class="pa-2" style="font-size: 18px; font-weight: bold">■ 알람 현황</span>
                  </v-col>
                  <v-col cols="12" class="pt-0 pb-0">
                    <span v-for="(e, idx) in listl.slice(1)" :key="{ idx } + 1" class="pa-2" style="font-size: 18px">
                      {{ idx + 1 }}.에러코드:{{ e.errorCd }}//{{ e.errorDesc }}
                    </span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="pa-2 pt-0 pb-0">
                    <span class="pt-2 pl-0" style="font-size: 18px; font-weight: bold">■ S/C 작업 리스트</span>
                    <v-btn class="ml-5 mt-1 pa-2 mb-2" outlined height="30" v-if="disabledbtn" @click="reMove"> <v-icon>delete</v-icon>삭제</v-btn>
                    <DxDataGrid
                      id="LineInfoDataMainFirst"
                      class="layout-col-height3"
                      :ref="dxDataGridFirstRef"
                      :data-source="gridMain"
                      :remote-operations="false"
                      :hover-state-enabled="true"
                      :allow-column-resizing="true"
                      :allow-column-reordering="true"
                      :row-alternation-enabled="true"
                      :column-auto-width="true"
                      :show-borders="true"
                      :width="grid.width"
                      :show-row-lines="true"
                      key-expr="jobNo"
                      :focused-row-enabled="true"
                      :disablePagination="false"
                      :column-hiding-enabled="false"
                      @focused-row-changed="onFocusedRowChanged"
                    >
                      <DxSelection mode="single" />
                      <DxColumn
                        data-field="jobNo"
                        caption="작업 지시서 번호"
                        width="15%"
                        data-type="string"
                        alignment="center"
                        format=""
                        css-class="devest-grid-header-require"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="gubun"
                        caption="작업 지시 구분"
                        width="15%"
                        data-type="string"
                        alignment="center"
                        format=""
                        css-class="devest-grid-header-require"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="palletId"
                        caption="Pallet ID"
                        width="15%"
                        data-type="string"
                        alignment="center"
                        format=""
                        css-class="devest-grid-header-require"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="rfidTag"
                        caption="RFID Tag"
                        width="10%"
                        data-type="string"
                        alignment="center"
                        format=""
                        css-class="devest-grid-header-require"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="rowColLev"
                        caption="RACK 행/열/단"
                        width="10%"
                        data-type="string"
                        alignment="center"
                        format=""
                        css-class="devest-grid-header-require"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="scCheck"
                        caption="S/C 확인"
                        width="10%"
                        data-type="string"
                        alignment="center"
                        format=""
                        css-class="devest-grid-header-require"
                        :allow-editing="false"
                      />
                      <DxColumn
                        data-field="remark"
                        caption="비고"
                        width="10%"
                        data-type="string"
                        alignment="center"
                        format=""
                        css-class="devest-grid-header-require"
                        :allow-editing="false"
                      />
                    </DxDataGrid>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="5" align="center" class="pa-2 pt-0 pb-0">
                <div style="border: 1px solid; border-radius: 10px; height: 100%" class="pa-3">
                  <v-row class="storage">
                    <v-col cols="12" class="head pa-2">자동 창고</v-col>
                    <v-col cols="6" class="contents pa-2">적재 : {{ this.aJjt }}</v-col>
                    <v-col cols="6" class="contents pa-2">공백 : {{ this.aGbt }}</v-col>
                    <v-col cols="12" class="contents pa-2">{{ this.aRate }}%</v-col>
                  </v-row>
                  <v-row class="storage">
                    <v-col cols="6" class="head pa-2">1 행</v-col>
                    <v-col cols="6" class="head pa-2">2 행</v-col>
                    <v-col cols="6" class="contents pa-2">적재 : {{ this.aH1Jjt }}</v-col>
                    <v-col cols="6" class="contents pa-2">적재 : {{ this.aH2Jjt }}</v-col>
                    <v-col cols="6" class="contents pa-2">공백 : {{ this.aH1gbt }}</v-col>
                    <v-col cols="6" class="contents pa-2">공백 : {{ this.aH2gbt }}</v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-carousel-item>
          <v-carousel-item>
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
                align="center"
                style="border: thin solid rgba(0, 0, 0, 0.12); background-color: rgb(217, 222, 238)"
              >
                <span class="headGubun">지게차 라인</span>
              </v-col>
              <v-row no-gutters>
                <v-col cols="12" sm="12" md="12" lg="12" align="right">
                  <img :src="require(`@/assets/images/refreshBtn.png`)" style="width: 20px; cursor: pointer" @click="refresh" />
                  <span style="font-size: 30px; margin-left: 5px; cursor: pointer" @click="refresh">REFRESH </span>
                  <span style="font-size: 20px"> 업데이트 : {{ this.upTime }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" style="border: 1px solid; border-radius: 10px">
                  <i-card-vertical headerTitle="■ 지게차 작업 리스트">
                    <template v-slot:body>
                      <v-layout column overflow-auto class="pa-2 pt-2">
                        <DxDataGrid
                          id="LineInfoDataMainSecond"
                          class="layout-col-height1"
                          :ref="dxDataGridSecondRef"
                          :data-source="gridMain2"
                          :remote-operations="false"
                          :hover-state-enabled="true"
                          :allow-column-resizing="true"
                          :allow-column-reordering="true"
                          :row-alternation-enabled="true"
                          :column-auto-width="true"
                          :show-borders="true"
                          :width="grid.width"
                          :show-row-lines="true"
                          key-expr="id"
                          :focused-row-enabled="true"
                          :disablePagination="false"
                          :column-hiding-enabled="false"
                        >
                          <DxSelection show-check-boxes-mode="false" />
                          <DxColumn
                            data-field="jobNo"
                            caption="작업 지시서 번호"
                            width="12%"
                            data-type="string"
                            alignment="center"
                            css-class="devest-grid-header-require"
                          />
                          <DxColumn data-field="gubun" caption="작업 지시 구분" width="8%" data-type="string" alignment="center" />
                          <DxColumn data-field="palletId" caption="Pallet ID" width="8%" data-type="string" alignment="center" />
                          <DxColumn data-field="rfidTag" caption="RFID Tag" width="9%" data-type="string" alignment="center" />
                          <DxColumn data-field="rowColLev" caption="RACK 행/열/단" width="10%" data-type="string" alignment="center" />
                          <DxColumn data-field="priority" caption="우선 순위" width="7%" data-type="string" alignment="center" />
                          <DxColumn data-field="compelteYn" caption="완료 여부" width="7%" data-type="string" alignment="center" />
                          <DxColumn data-field="jobEdAt" caption="작업 완료 시간" width="12%" data-type="string" alignment="center" />
                          <DxColumn data-field="remark" caption="비고" width="10%" data-type="string" alignment="center" />
                        </DxDataGrid>
                      </v-layout>
                    </template>
                  </i-card-vertical>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="7" class="pa-0 pr-1">
                  <div style="border: 1px solid; border-radius: 10px; height: 100%" class="pa-3">
                    <p class="v-detail">■ 알람 현황</p>
                    <p class="v-detail">- 알람 내용</p>
                  </div>
                </v-col>
                <v-col cols="5" class="pa-0 pl-1" align="center">
                  <div style="border: 1px solid; border-radius: 10px; height: 100%" class="pa-3">
                    <v-row class="storage2">
                      <v-col cols="12" class="head2 pa-2">수동 창고</v-col>
                      <v-col cols="6" class="contents2 pa-2">적재 : {{ this.mJjt }}</v-col>
                      <v-col cols="6" class="contents2 pa-2">공백 : {{ this.mGbt }}</v-col>
                      <v-col cols="12" class="contents2 pa-2">{{ this.mRate }}%</v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxSelection } from 'devextreme-vue/data-grid'
import ICardVertical from '@/components/common/iCardVertical.vue'
import EventBus from '@/utils/event-bus'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import { getPopLineInfoMainList, getPopLineInfoMainStorage, getPopLineStatus, getPopLineDel } from '@/api/kier/pop/lineInfo'

export default {
  name: 'LineInfo',
  mixins: [baseview, BaseDataGrid],
  components: {
    ICardVertical,
    DxDataGrid,
    DxColumn,
    DxSelection,
  },
  data() {
    return {
      disabledbtn: sessionStorage.getItem('userCd') == 'admin' ? true : false,
      dxDataGridFirstRef: 'LineInfoDataMainFirst',
      dxDataGridSecondRef: 'LineInfoDataMainSecond',
      alert: '',
      listl: [],
      gridMain: [],
      gridMain2: [],
      carouselIdx: 0,
      refreshKey: 0,
      rowColLev: [],
      //자동창고
      aJjt: '',
      aGbt: '',
      aRate: '',
      aH1Jjt: '',
      aH1gbt: '',
      aH2Jjt: '',
      aH2gbt: '',
      //수동창고
      mJjt: '',
      mGbt: '',
      mRate: '',
      //S/C작업현황
      jobNo: '',
      jobDiv: '',
      palletId: '',
      rfidTag: '',
      priority: '',
      position: '',
      jobStAt: '',
      jobEdAt: '',
      compelteYn: '',
      status: '',
      statusDesc: '',
      scColRowLev: '',
      //업데이트 시간
      upTime: '00:00:00',
      listTimer: null,
      stockTimer: null,
      reMoveData: [],
    }
  },
  created() {
    EventBus.$on('timeStop', (info) => {
      clearInterval(this.listTimer)
      clearInterval(this.stockTimer)
    })
    EventBus.$on('timeStart', (info) => {
      this.reBinding()
    })
  },
  computed: {},

  beforeMount() {
    let params = {}

    Promise.all([getPopLineStatus(params)])
      .then((res) => {
        this.listl = res[0].listResponse.list
      })
      .catch((error) => {})
  },

  mounted() {
    this.reBinding()
    this.doSearchMainList()
    this.doSearchMainStorage()
  },
  methods: {
    onFocusedRowChanged(e) {
      this.reMoveData = e.row.data
    },
    reMove() {
      if (this.reMoveData.length == 0) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      } else {
        return this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          (current) => {
            this.openLoading()
            getPopLineDel(this.reMoveData, true)
              .then((res) => {})
              .finally(() => {
                this.refresh()
              })
          },
          null,
          true
        )
      }
    },

    navigationHandler() {},
    forceRerender() {
      this.refreshKey += 1
    },
    refresh() {
      // this.forceRerender()
      this.doSearchMainList()
      this.doSearchMainStorage()
      let a = new Date()
      let hour = ('0' + a.getHours()).slice(-2)
      let min = ('0' + a.getMinutes()).slice(-2)
      let sec = ('0' + a.getSeconds()).slice(-2)
      let time = hour + ':' + min + ':' + sec
      this.upTime = time
    },
    reBinding() {
      this.listTimer = setInterval(() => {
        // this.forceRerender()
        this.doSearchMainList()
        this.doSearchMainStorage()
        let a = new Date()
        let hour = ('0' + a.getHours()).slice(-2)
        let min = ('0' + a.getMinutes()).slice(-2)
        let sec = ('0' + a.getSeconds()).slice(-2)
        let time = hour + ':' + min + ':' + sec
        this.upTime = time
      }, 30000)
      this.stockTimer = setInterval(() => {
        this.doSearchMainStorage()
        this.doSearchMainStorage()
        let a = new Date()
        let hour = ('0' + a.getHours()).slice(-2)
        let min = ('0' + a.getMinutes()).slice(-2)
        let sec = ('0' + a.getSeconds()).slice(-2)
        let time = hour + ':' + min + ':' + sec
        this.upTime = time
      }, 600000)
    },
    doSearchMainList(isProgress) {
      return getPopLineInfoMainList({}, isProgress).then((res) => {
        let cnt = 1,
          cnt2 = 1
        res.listResponse.map.listA.forEach((e) => {
          e.id += cnt
          if (e.row == '' || e.col == '' || e.lev == '') {
            e.rowColLev = ''
          } else if (e.row !== null || e.col !== null || e.lev !== null) {
            e.rowColLev = e.row + '/' + e.col + '/' + e.lev
          }
        })
        res.listResponse.map.listM.forEach((e) => {
          e.id += cnt2
          if (e.row == '' || e.col == '' || e.lev == '') {
            e.rowColLev = ''
          } else if (e.row !== null || e.col !== null || e.lev !== null) {
            e.rowColLev = e.row + '/' + e.col + '/' + e.lev
          }
        })
        // console.log("RES1 :  " , res.listResponse.map)
        this.gridMain = res.listResponse.map.listA
        this.gridMain2 = res.listResponse.map.listM

        //S/C 작업 현황
        this.jobNo = res.listResponse.map.statusA[0].jobNo
        this.jobDiv = res.listResponse.map.statusA[0].jobDiv
        this.palletId = res.listResponse.map.statusA[0].palletId
        this.rfidTag = res.listResponse.map.statusA[0].rfidTag
        this.priority = res.listResponse.map.statusA[0].priority
        this.position = res.listResponse.map.statusA[0].position
        this.jobStAt = res.listResponse.map.statusA[0].jobStAt
        this.jobEdAt = res.listResponse.map.statusA[0].jobEdAt
        this.compelteYn = res.listResponse.map.statusA[0].compelteYn
        this.status = res.listResponse.map.statusA[0].status
        this.statusDesc = res.listResponse.map.statusA[0].statusDesc
        this.scColRowLev = res.listResponse.map.statusA[0].row + '/' + res.listResponse.map.statusA[0].col + '/' + res.listResponse.map.statusA[0].lev
      })
    },
    doSearchMainStorage(isProgress) {
      return getPopLineInfoMainStorage({}, isProgress).then((res) => {
        // console.log("RES2 :  " , res)

        //자동창고
        this.aJjt = res.listResponse.map.storageA[0].jjt
        this.aGbt = res.listResponse.map.storageA[0].gbt
        this.aRate = Math.round(res.listResponse.map.storageA[0].rate)
        this.aH1Jjt = res.listResponse.map.storageA[0].h1jjt
        this.aH1gbt = res.listResponse.map.storageA[0].h1gbt
        this.aH2Jjt = res.listResponse.map.storageA[0].h2jjt
        this.aH2gbt = res.listResponse.map.storageA[0].h2gbt
        //수동창고
        this.mJjt = res.listResponse.map.storageM[0].jjt
        this.mGbt = res.listResponse.map.storageM[0].gbt
        this.mRate = Math.round(res.listResponse.map.storageM[0].rate)
      })
    },
  },
}
</script>
<style lang="less" scoped>
.headGubun {
  font-weight: bold !important;
  font-size: 32px;
}
.head {
  border: 1px solid;
  background-color: rgb(217, 222, 238);
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.contents {
  border: 1px solid;
  font-weight: bold;
  background-color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.head2 {
  border: 1px solid;
  background-color: rgb(217, 222, 238);
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}
.contents2 {
  border: 1px solid;
  font-weight: bold;
  background-color: white;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}
.v-detail {
  font-size: 20px;
  width: 100%;
  font-weight: bold;
  background-color: #fff;
}
.theme--dark.v-btn.v-btn--icon {
  color: rgb(0, 176, 240) !important;
}
.matgrid-height {
  height: calc(100vh - 126px);
}
.scData {
  font-weight: bold;
  font-size: 18px;
}
.storage {
  height: 48%;
  vertical-align: middle;
}
.storage2 {
  height: 50%;
}
.v-input {
  font-size: 18px;
}
</style>