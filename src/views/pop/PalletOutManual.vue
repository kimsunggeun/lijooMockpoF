<template>
  <v-container fluid align-start ma-0 pa-2 class="full-heigth">
    <v-row no-gutters>
      <v-col cols="12">
        <i-card-top class="d-flex">
          <template v-slot:body>
            <v-row dense align="center">
              <v-col cols="5">
                <v-text-field
                  class="rounded-0 mt-2"
                  v-model="rfidTag"
                  label="RFID Tag"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @keydown.enter="btnSearchMain()"
                  clearable
                />
              </v-col>
              <v-spacer />
              <v-col cols="auto" align="right">
                <span>재고(X): </span>
                <DxButton />
                <span> 재고(O): </span>
                <DxButton type="success" />
              </v-col>
            </v-row>
            <v-row dense class="mt-0" lign="center">
              <v-col cols="5">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="rounded-0"
                  item-text="palletNm"
                  item-value="palletId"
                  :prepend-inner-icon="$t('$search')"
                  :items="palletIdList"
                  label="Pallet ID"
                  dense
                  outlined
                  clearable
                  multiple
                  v-model="palletIdSelect"
                />
              </v-col>
              <v-col cols="7" align="right">
                <v-btn class="rounded-0 ml-1 pr-7 pl-1" outlined color="btn_bg" height="30px" fontWeight="bold" @click="btnSearchMain()">
                  <v-icon class="float-left" color="#000">${{ 'search' }}</v-icon>
                  <div class="float-center mx-1" :style="btnTextStyle">
                    조회
                  </div>
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
        <i-system-bar />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="pa-2">
        <i-card-vertical headerTitle="■ 출고 Pallet 리스트">
          <template v-slot:body>
            <v-layout column class="grid pa-0 pt-0">
              <DxDataGrid
                id="PalletOutManualGrid"
                class="grid-height"
                :ref="dxDataGridRef"
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
                key-expr="id"
                :focused-row-enabled="true"
                :disablePagination="false"
                :column-hiding-enabled="false"
              >
                <DxPaging :enabled="false" />
                <DxSelection show-check-boxes-mode="false" />
                <DxColumn
                  data-field="jobNo"
                  caption="작업 지시서 번호"
                  width="20%"
                  data-type="string"
                  alignment="center"
                  css-class="devest-grid-header-require"
                />
                <DxColumn data-field="palletId" caption="Pallet ID" width="15%" data-type="string" alignment="center" />
                <DxColumn data-field="rfidTag" caption="RFID Tag" width="15%" data-type="string" alignment="center" />
                <DxColumn data-field="rowColLev" caption="RACK 행/열/단" width="15%" data-type="string" alignment="center" />
                <DxColumn data-field="priority" caption="우선 순위" width="10%" data-type="string" alignment="center" />
                <DxColumn data-field="remark" caption="비고" width="/" data-type="string" alignment="center" />
              </DxDataGrid>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="pa-2 pt-0 pt-lg-0">
        <i-card-vertical headerTitle="■ 수동 라인 RACK 현황">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-row no-gutter>
                <v-col cols="12" class="pa-0">
                  <DxDataGrid
                    id="PalletOutManualBox"
                    :ref="dxDataBoxRef"
                    :data-source="gridBox"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="false"
                    :allow-column-reordering="false"
                    :row-alternation-enabled="true"
                    :column-auto-width="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="id"
                    :focused-row-enabled="false"
                    :column-hiding-enabled="false"
                    :paging="{ enabled: false }"
                    :pager="{ visible: false }"
                    :scrolling="{ rowRenderingMode: 'standard', useNative: false }"
                    :selection="{ mode: 'none' }"
                    :editing="{ allowUpdating: false }"
                    :on-initialized="() => null"
                    :on-content-ready="() => null"
                  >
                    <DxColumn data-field="row" caption="행" data-type="string" alignment="center" :group-index="0" />
                    <DxColumn
                      v-for="n in col.slice().reverse()"
                      :key="n"
                      :data-field="`col${n}`"
                      :caption="`${n}열`"
                      width="9.5%"
                      alignment="center"
                      :allow-sorting="false"
                      cell-template="btn-cell-template"
                    />
                    <template #btn-cell-template="{ data: cellInfo }">
                      <v-badge style="width: 100%;" color="#FF852F" dot overlap :value="!!matInfoState[cellInfo.value].highlight">
                        <DxButton
                          :ref="`gridButtonRef${cellInfo.value}`"
                          :class="{
                            'mat-exist': matInfoState[cellInfo.value].matExist,
                            'matcell-height': true
                          }"
                          width="100%"
                          @click="onCellClick(cellInfo)"
                        >
                          {{ matInfoState[cellInfo.value].matExist === true ? matInfoState[cellInfo.value].palletId : '' }}
                        </DxButton>
                      </v-badge>
                    </template>
                    <DxColumn data-field="lev" caption="단" data-type="string" alignment="center" />
                  </DxDataGrid>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
    <DxPopup :visible.sync="cellVisible" :show-close-button="false" :show-title="false" height="95%">
      <v-row dense align="center">
        <v-col cols="auto">
          <span :style="btnTextStyle">{{ cellPopUpTitle }}</span>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn
            tile
            outlined
            color="btn_bg"
            height="30px"
            width="65px"
            @click="
              () => {
                cellVisible = false
              }
            "
          >
            <v-icon left color="#000">${{ 'close' }}</v-icon>
            <span :style="btnTextStyle">닫기</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row dense align="center">
        <v-col cols="auto">
          <span :style="btnTextStyle">{{ palletIdPopup }}</span>
        </v-col>
        <v-col cols="auto">
          <span :style="btnTextStyle">{{ rfidTagPopup }}</span>
        </v-col>
      </v-row>
      <DxDataGrid
        id="PalletOutManualPop"
        :ref="dxDataGridPopRef"
        :data-source="gridCell"
        :hover-state-enabled="true"
        :editing="{ allowUpdating: false }"
        :column-hiding-enabled="false"
        height="85%"
        width="100%"
        key-expr="id"
        class="sec_grid"
        :focused-row-enabled="true"
        :allow-column-resizing="true"
        :allow-column-reordering="true"
        :row-alternation-enabled="true"
        :column-auto-width="true"
        :show-borders="true"
        :show-row-lines="true"
      >
        <DxSelection show-check-boxes-mode="false" />
        <DxColumn data-field="mainClass" caption="품목 대분류" width="auto" data-type="string" alignment="left" />
        <DxColumn data-field="middleClass" caption="품목 중분류" width="auto" data-type="string" alignment="left" />
        <DxColumn data-field="matNm" caption="품목" width="auto" data-type="string" alignment="left" />
        <DxColumn data-field="palletId" data-type="string" :visible="false" />
        <DxColumn data-field="palletNm" data-type="string" :visible="false" />
        <DxColumn data-field="barcodeNo" caption="바코드 번호" data-type="string" width="180px" alignment="center" />
        <DxColumn data-field="qty" caption="재고수량" data-type="number" width="90px" format="#,##0" alignment="right" />
        <DxColumn data-field="inWork" caption="입고수량" data-type="number" width="90px" format="#,##0" alignment="right" />
        <DxColumn data-field="workQty" caption="작업수량" data-type="number" width="90px" format="#,##0" alignment="right" />
        <DxColumn data-field="outQty" caption="출고수량" data-type="number" width="90px" format="#,##0" alignment="right" />
        <DxColumn data-field="remark" caption="비고" data-type="string" width="auto" alignment="left" />
      </DxDataGrid>
      <v-btn
        tile
        outlined
        color="btn_bg"
        width="120px"
        :useBtnList="[
          'btnSave' //저장
        ]"
        @click="btnSave()"
        class="releaseBtn"
        ref="btnSave"
        :style="{ btnTextStyle2, display: this.saveBtn ? 'block' : 'none' }"
        :disabled="this.saveBtn ? false : true"
      >
        출고 처리
      </v-btn>
    </DxPopup>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import DxButton from 'devextreme-vue/button'
import { DxPopup } from 'devextreme-vue/popup'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import { PalletOutManualBox, matInfoState } from './PalletOutManualGrid.js'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'
import { getComboMultipalletIdWmsMaterialInfo } from '@/api/kier/wms/materialInfo'

import { getPalletOutManualMain, getPalletOutManualPopup, savePalletOutManualMain } from '@/api/kier/pop/palletOutManual'

export default {
  name: 'PalletOutManual',
  mixins: [baseview, BaseDataGrid],
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxButton,
    DxPopup
  },
  data() {
    return {
      dxDataGridRef: 'PalletOutManualGrid',
      dxDataBoxRef: 'PalletOutManualBox',
      dxDataGridPopRef: 'PalletOutManualPop',

      palletId: '%',
      rfidTag: '',
      palletIdList: [],
      palletIdSelect: [],
      palletIdItem: [],
      btnTextStyle: { color: '#000', 'font-size': '15px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
      btnTextStyle2: { color: '#000', 'font-size': '24px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
      gridMain: [],
      gridBox: PalletOutManualBox,
      matInfoState: matInfoState,

      cellVisible: false,
      cellPopUpTitle: '',
      locationIdPopup: '',
      locationTypePopup: '',
      palletIdPopup: '',
      rfidTagPopup: '',
      gridCell: [],
      matList: [],
      rowColLev: [],
      locationId: [],
      priority: [],
      col: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      saveBtn: true
    }
  },
  computed: {
    gridFirstInstance() {
      return this.GetDataGrid(this.dxDataBoxRef)
    },
    gridPopInstance() {
      return this.GetDataGrid(this.dxDataGridPopRef)
    }
  },
  watch: {
    countVisible: function(val) {
      if (val) {
        this.beginUpdateAll()
      } else {
        this.gridCount = []
        this.endUpdateAll()
      }
    },
    cellVisible: function(val) {
      if (val) {
        this.beginUpdateAll()
      } else {
        this.gridCell = []
        this.locationIdPopup = ''
        this.locationTypePopup = ''
        this.palletIdPopup = ''
        this.rfidTagPopup = ''
        this.endUpdateAll()
      }
    }
  },
  beforeMount() {
    Promise.all([getComboStdMatManage(), getComboMultipalletIdWmsMaterialInfo()])
      .then(res => {
        this.palletIdList = res[1].listResponse.list.slice()
      })
      .catch(error => {})
  },
  mounted() {
    this.btnSearchMain()
  },
  methods: {
    btnSearchMain() {
      this.openLoading('searching')
      this.doSearchMainList().finally(() => {
        this.endLoading()
      })
    },
    onCellClick(cellInfo) {
      this.locationTypePopup = 'RACK'
      this.locationIdPopup = cellInfo.value
      this.palletIdPopup = `Pallet ID : '${this.matInfoState[cellInfo.value].palletId || ''}'`
      this.rfidTagPopup = `RFID Tag : '${this.matInfoState[cellInfo.value].rfidTag || ''}'`

      if (this.matInfoState[cellInfo.value].matExist) this.doSearchPopup()
      else this.vToastify(this.$t('재고가 없는 RACK 입니다.'), 'warn')
    },
    async doSearchMainList(isProgress) {
      let params = {
        palletId: this.palletId,
        palletIdMulti: this.palletIdSelect.toString(),
        rfidTag: this.rfidTag
      }
      return await getPalletOutManualMain(params, isProgress).then(res => {
        let cnt = 1
        res.listResponse.map.list.forEach(e => {
          this.priority = e.priority
          e.id += cnt
          if (e.row == '' || e.col == '' || e.lev == '') {
            e.rowColLev = ''
          } else if (e.row !== null || e.col !== null || e.lev !== null) {
            e.rowColLev = e.row + '/' + e.col + '/' + e.lev
          }
        })
        this.gridMain = res.listResponse.map.list

        for (const property in this.matInfoState) {
          this.matInfoState[property].highlight = false
        }

        for (var rackInfo of res.listResponse.map.stock) {
          this.matInfoState[rackInfo.locationId].matExist = rackInfo.matExistYn == 'Y' ? true : false
          this.matInfoState[rackInfo.locationId].palletId = rackInfo.palletId
          this.matInfoState[rackInfo.locationId].rfidTag = rackInfo.rfidTag
          for (var rackHilight of this.gridMain) {
            if (rackHilight.palletId === rackInfo.palletId) {
              this.matInfoState[rackInfo.locationId].highlight = true
              break
            }
          }
        }

        this.repaint()
      })
    },
    async doSearchPopup() {
      if (this.gridMain.length <= 0) this.saveBtn = false

      for (var palletOut of this.gridMain) {
        if (palletOut.palletId === this.matInfoState[this.locationIdPopup].palletId) {
          this.saveBtn = true
          break
        } else {
          this.saveBtn = false
        }
      }

      let params = {
        palletId: this.matInfoState[this.locationIdPopup].palletId,
        rfidTag: this.matInfoState[this.locationIdPopup].rfidTag,
        row: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(0, 2) : null,
        col: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(2, 4) : null,
        lev: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(4, 6) : null
      }

      this.openLoading('searching')
      await getPalletOutManualPopup(params, false)
        .then(res => {
          let cnt = 1
          res.listResponse.list.forEach(e => {
            e.id = cnt++
            e.locationId = e.row + e.col + e.lev
          })
          this.gridCell = res.listResponse.list
          this.cellPopUpTitle = `RACK 정보(행/열/단) : ${params.row} / ${params.col} / ${params.lev}`
          this.cellVisible = true
        })
        .finally(() => {
          this.endLoading()
        })
    },
    async btnSave() {
      this.gridPopInstance.saveEditData()
      // var selectedMainRows = await this.gridPopInstance.getSelectedRowsData()
      // if (!selectedMainRows.length) {
      //   this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
      //   return
      // }

      // if(this.gridMain.length <= 0) {
      //   this.vToastify(this.$t('출고 Pallet 리스트에 없는 Pallet 입니다.'), 'warn')
      //   return
      // }

      // for(var palletOut of this.gridMain) {
      //   // console.log('palletOut : ',palletOut.palletId)
      //   if(palletOut.palletId === this.gridCell[0].palletId) {
      //     break
      //   } else {
      //     this.vToastify(this.$t('출고 Pallet 리스트에 없는 Pallet 입니다.'), 'warn')
      //     return
      //   }
      // }
      this.vToastifyPrompt(
        this.$t('doPalletOutData'),
        'info',
        current => {
          this.openLoading()
          this.gridFirstInstance.beginUpdate()
          savePalletOutManualMain(this.gridCell, true)
            .then(res => {
              this.doSearchMainList()
            })
            .catch(error => {
              this.vToastify(this.$t('에러.'), 'warn')
            })
            .finally(() => {
              this.gridFirstInstance.endUpdate()
              this.endLoading()
              this.cellVisible = false
            })
        },
        null,
        true
      )
    },

    repaint() {
      if (this.$refs[this.dxDataBoxRef]) this.gridFirstInstance.repaint()
    },
    beginUpdateAll() {
      if (this.$refs[this.dxDataGridPopRef]) this.gridFirstInstance.beginUpdate()
    },
    endUpdateAll() {
      if (this.$refs[this.dxDataGridPopRef]) this.gridFirstInstance.endUpdate()
    }
  }
}
</script>
<style scoped lang="scss">
.matcell-height {
  height: calc(100vh / 27);
}
.full-heigth {
  height: calc(100vh - 110px);
}
.grid-height {
  height: calc(100vh / 6) * 1.9;
}
.releaseBtn {
  background-color: rgb(0, 176, 240);
  float: right;
  height: 45px !important;
  font-size: 15pt !important;
}
.mat-exist {
  background-color: #5cb85c;
  color: #fff;
}
::v-deep .grid .dx-datagrid {
  font-size: 20px;
}
::v-deep .dx-button.matcell-height .dx-button-content {
  // padding: 1px !important;
  font-size: 12pt;
}
</style>
