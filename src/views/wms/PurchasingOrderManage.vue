<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-0 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete', //삭제
          ]"
          @btnAdd="btnAddMain()"
          @btnSearch="btnSearchMain()"
          @btnSave="btnSaveMain()"
          @btnDelete="btnDeleteMain()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 pb-0">
                <span class="px-1 pt-1">{{ '납기 요청일:' }}</span>
                <v-col cols="auto" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="reqDtFrom"
                    :max="reqDtTo"
                    height="30px"
                    width="150px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="
                      (e) => {
                        reqDtFrom = e.value && getDateFormat(e.value)
                      }
                    "
                  />
                </v-col>
                <p>~</p>
                <v-col cols="auto" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="reqDtTo"
                    :min="reqDtFrom"
                    height="30px"
                    width="150px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="
                      (e) => {
                        reqDtTo = e.value && getDateFormat(e.value)
                      }
                    "
                  />
                </v-col>
                <v-col cols="12" md="2">
                  <v-select
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="desc"
                    item-value="code"
                    :prepend-inner-icon="$t('$search')"
                    :items="partnerIdList"
                    label="파트너"
                    dense
                    outlined
                    :disabled="LoginCd"
                    v-model="partnerId"
                  />
                </v-col>
                <v-col cols="12" md="2">
                  <v-select
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="desc"
                    item-value="code"
                    :prepend-inner-icon="$t('$search')"
                    :items="[{ code: '', desc: '전체' }, ...statusLookUp]"
                    label="발주 상태"
                    dense
                    outlined
                    v-model="status"
                  />
                </v-col>
                <span style="width: 164px" class="pa-2 py-md-0">
                  <v-switch v-model="delYnMain" true-value="Y" false-value="N" :label="`삭제 데이터 조회`" @change="btnSearchMain()" />
                </span>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar />
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical headerTitle="발주 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="purchasingOrderManageMain"
                    class="layout-col-height3"
                    :ref="dxDataGridMainRef"
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
                    :column-hiding-enabled="false"
                    @editor-preparing="onEditorPreparingMain"
                    @focused-row-changed="onFocusedRowChanged"
                  >
                    <DxColumn data-field="poNo" caption="발주 번호" width="150px" data-type="string" alignment="center" :allow-editing="false" />

                    <DxColumn
                      data-field="orderDt"
                      caption="작성일"
                      width="120px"
                      data-type="date"
                      alignment="center"
                      format="yyyy-MM-dd"
                      :allow-editing="false"
                    />

                    <DxColumn
                      data-field="partnerId"
                      caption="파트너"
                      width="220px"
                      data-type="string"
                      alignment="left"
                      css-class="devest-grid-header-require"
                    >
                      <DxLookup :data-source="partnerIdLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn
                      data-field="hrId"
                      caption="발주 담당자"
                      width="120px"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    >
                      <DxLookup :data-source="hrIdLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn data-field="hpNo" caption="전화번호" width="150px" data-type="string" alignment="center" :allow-editing="false" />

                    <DxColumn
                      data-field="reqDt"
                      caption="납기 요청일"
                      width="120px"
                      data-type="date"
                      format="yyyy-MM-dd"
                      alignment="center"
                      css-class="devest-grid-header-require"
                      edit-cell-template="date"
                    />
                    <template #date="{ data: cellInfo }">
                      <DxDateBox
                        :value="cellInfo.value"
                        display-format="yyyy-MM-dd"
                        :read-only="focusedRowData && focusedRowData.status != 'STS01'"
                        @value-changed="
                          (e) => {
                            onValueChanged(e, cellInfo)
                          }
                        "
                      />
                    </template>
                    <DxColumn data-field="status" caption="발주 상태" width="120px" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="statusLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn
                      data-field="completeYn"
                      caption="완료 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                      :allow-editing="false"
                    />

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />

                    <DxColumn
                      data-field="useYn"
                      caption="사용 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                    />

                    <DxColumn
                      data-field="delYn"
                      caption="삭제 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                    />

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox
                        :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                        :read-only="cellInfo.column.dataField == 'completeYn' || (delYnMain == 'N' && cellInfo.column.dataField == 'delYn')"
                      />
                    </template>

                    <DxColumn data-field="onProgress" :visible="false" />
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical
          headerTitle="발주 품목 리스트"
          :useBtnList="[
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete', //삭제
          ]"
          @btnAdd="btnAddDetail()"
          @btnSave="btnSaveDetail()"
          @btnDelete="btnDeleteDetail()"
        >
          <template v-slot:switch>
            <v-switch v-model="delYnDetail" true-value="Y" false-value="N" :label="`삭제 데이터 조회`" @change="onDelYnDetailChange" />
          </template>
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="purchasingOrderManageDetail"
                    class="layout-col-height1"
                    :ref="dxDataGridDetailRef"
                    :data-source="gridDetail"
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
                    :column-hiding-enabled="false"
                    @editor-preparing="onEditorPreparingDetail"
                  >
                    <DxColumn data-field="poNo" caption="발주 번호" width="150px" data-type="string" alignment="center" :visible="false" />

                    <DxColumn data-field="poSeq" caption="순번" width="70px" data-type="number" alignment="center" :allow-editing="false" />

                    <DxColumn data-field="mainClass" caption="품목 대분류" width="120px" data-type="string" alignment="left" :allow-editing="false" />

                    <DxColumn
                      data-field="middleClass"
                      caption="품목 중분류"
                      width="250px"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                    />

                    <DxColumn
                      data-field="matCd"
                      caption="품목명"
                      width="350px"
                      data-type="string"
                      alignment="left"
                      :calculate-display-value="
                        (e) => {
                          let item = e.matCd && matList.find((el) => el.matCd == e.matCd)
                          return item && item.matNm
                        }
                      "
                      :calculate-filter-expression="lookupColumnFilterExpression"
                      css-class="devest-grid-header-require"
                      :allow-editing="false"
                    />

                    <DxColumn
                      data-field="qty"
                      caption="수량"
                      width="100px"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      css-class="devest-grid-header-require"
                    />

                    <DxColumn
                      data-field="arrivalQty"
                      caption="입고 수량"
                      width="100px"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />

                    <DxColumn data-field="status" caption="진행 상태" width="120px" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="prStatusLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />

                    <DxColumn
                      data-field="useYn"
                      caption="사용 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                    />

                    <DxColumn
                      data-field="delYn"
                      caption="삭제 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                    />

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox
                        :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                        :read-only="(focusedRowData && focusedRowData.status != 'STS01') || cellInfo.data.status != 'PRG_STS01'"
                      />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <PurchasingOrderManageM
        ref="grdM"
        :MPopOpen="MPopOpen"
        :focusedRowData="focusedRowData"
        @AddSelectedRowsData="AddSelectedRowsData"
        @close="MPopOpen = false"
      />
    </v-row>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import DxDateBox from 'devextreme-vue/date-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import DxDropDownBox from 'devextreme-vue/drop-down-box'
import PurchasingOrderManageM from './PurchasingOrderManageUp/PurchasingOrderManageM.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getWmsPurchasingOrderManageMain,
  getWmsPurchasingOrderManageDetail,
  saveWmsPurchasingOrderManageMain,
  saveWmsPurchasingOrderManageDetail,
  deleteWmsPurchasingOrderManageMain,
  deleteWmsPurchasingOrderManageDetail,
  getComboPartnerId,
} from '@/api/kier/wms/purchasingOrderManage'

import { getComboHrManage } from '@/api/kier/standard/hRManage'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'

import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'

export default {
  name: 'PurchasingOrderManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxCheckBox,
    DxLookup,
    DxDateBox,
    PurchasingOrderManageM,
  },
  data() {
    return {
      MPopOpen: false,
      dxDataGridMainRef: 'purchasingOrderManageMain',
      dxDataGridDetailRef: 'purchasingOrderManageDetail',
      gridMain: [],
      gridDetail: [],
      partnerIdList: [],
      reqDtFrom: getPreMonth(2),
      reqDtTo: getPreMonth(-2),
      partnerId: '',
      delYnMain: 'N',
      delYnDetail: 'N',
      partnerIdLookUp: [],
      hrIdLookUp: [],
      statusLookUp: [],
      prStatusLookUp: [],
      matList: [],
      status: '',
      focusedRowData: null,
      loginCd: false,
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.dxDataGridDetailRef)
    },
  },
  activated() {
    if (this.$route.params.fromDashboard) {
      this.reqDtFrom = getPreMonth(3)
      this.reqDtTo = getCurrentDate()
      this.partnerId = ''
      this.delYnMain = 'N'
      this.delYnDetail = 'N'
      if (this.$route.params.hasWating) {
        this.status = 'STS01'
      }
      this.btnSearchMain()
    }
  },
  beforeMount() {
    Promise.all([getComboPartnerId(), getComboHrManage(), getCommonCode('S0010'), getCommonCode('S0011'), getComboStdMatManage()])
      .then((res) => {
        this.partnerIdList = res[0].listResponse.list.slice()
        this.partnerIdList.unshift({ code: '', desc: '전체' })
        this.partnerIdLookUp = res[0].listResponse.list.slice()
        this.hrIdLookUp = res[1].listResponse.list
        this.statusLookUp = res[2].listResponse.list
        this.prStatusLookUp = res[3].listResponse.list
        this.matList = res[4].listResponse.list
      })
      .catch((error) => {})
    this.inCd()
  },
  methods: {
    inCd() {
      let seMenuGrpCd = sessionStorage.getItem('menuGrpCd')
      let seCompId = sessionStorage.getItem('compId')

      if (seMenuGrpCd != 'system') {
        this.partnerId = seCompId
        this.LoginCd = true
      } else {
        this.partnerId = ''
        this.LoginCd = false
      }
    },
    getDateFormat(date) {
      return getDateFormat(date)
    },
    onValueChanged(e, cellInfo) {
      if (String(e.value).length == 42) {
        cellInfo.setValue(e.value)
      } else {
        cellInfo.setValue((e.value = null))
      }
    },

    AddSelectedRowsData(e) {
      if (e.length != 0) {
        let newRow = {
          id: this.gridDetail.length + 1,
          poNo: this.focusedRowData.poNo,
          matCd: e[0].matCd,
          mainClass: e[0].mainClass,
          middleClass: e[0].middleClass,
          arrivalQty: 0,
          status: 'PRG_STS01',
          useYn: 'Y',
          delYn: 'N',
          isCreated: true,
        }
        this.gridDetailInstance.newRow(newRow)
        this.gridDetailInstance.refresh().then(() => {
          this.gridDetailInstance.selectRows(newRow.id, true)
          this.gridDetailInstance.option('focusedRowIndex', 0)
        })
      } else {
        return (this.MPopOpen = false)
      }
    },

    onEditorPreparingMain(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'partnerId':
            e.editorOptions.readOnly = !e.row.data.isCreated
            break
          case 'hrId':
            e.editorOptions.readOnly = e.row.data.status != 'STS01'
            break
          case 'reqDt':
            e.editorOptions.readOnly = e.row.data.status != 'STS01'
            break
          default:
            break
        }
        e.editorOptions.onValueChanged = (args) => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          if (e.dataField == 'partnerId') this.gridMainInstance.refresh()
          defaultValueChangeHandler(args)
        }
      }
      if (e.parentType === 'filterRow' && e.dataType === 'boolean') {
        e.editorOptions.valueExpr = 'filterValue'
        e.editorOptions.displayExpr = 'filterText'
        e.editorOptions.dataSource = [
          { filterValue: null, filterText: '(All)' },
          { filterValue: 'Y', filterText: 'O' },
          { filterValue: 'N', filterText: 'X' },
        ]
      }
    },

    onEditorPreparingDetail(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'qty':
            e.editorOptions.readOnly = this.focusedRowData.status != 'STS01' || e.row.data.status != 'PRG_STS01'
            break
          default:
            break
        }
        e.editorOptions.onValueChanged = (args) => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          defaultValueChangeHandler(args)
        }
      }
      if (e.parentType === 'filterRow' && e.dataType === 'boolean') {
        e.editorOptions.valueExpr = 'filterValue'
        e.editorOptions.displayExpr = 'filterText'
        e.editorOptions.dataSource = [
          { filterValue: null, filterText: '(All)' },
          { filterValue: 'Y', filterText: 'O' },
          { filterValue: 'N', filterText: 'X' },
        ]
      }
    },

    btnSearchMain() {
      this.openLoading('searching')
      this.doSearchMain(true).finally(() => {
        this.endLoading()
      })
    },

    doSearchMain(isProgress) {
      let params = {
        partnerId: this.partnerId,
        reqDtFrom: this.reqDtFrom,
        reqDtTo: this.reqDtTo,
        status: this.status,
        delYn: this.delYnMain,
      }

      this.gridInit()
      return getWmsPurchasingOrderManageMain(params, isProgress).then((res) => {
        this.gridMain = res.listResponse.list
        if (this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
      })
    },

    btnAddMain() {
      let newRow = {
        id: this.gridMain.length + 1,
        orderDt: getCurrentDate(),
        status: 'STS01',
        completeYn: 'N',
        useYn: 'Y',
        delYn: 'N',
        isCreated: true,
      }
      this.gridMainInstance.newRow(newRow)
      this.gridMainInstance.selectRows(newRow.id, true)
      this.gridMainInstance.option('focusedRowIndex', -1)
    },

    async btnSaveMain() {
      this.gridMainInstance.saveEditData()
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      //유효성 체크
      for (var row of selectedMainRows) {
        if (!row.partnerId || !row.hrId || !row.reqDt) {
          this.vToastify('필수항목 입력하세요.[파트너, 발주 담당자, 납기 요청일]', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveWmsPurchasingOrderManageMain(selectedMainRows, true)
            .then((res) => {
              this.doSearchMain(false)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },

    async btnDeleteMain() {
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      //유효성 체크
      for (var row of selectedMainRows) {
        if (row.status != 'STS01' || row.onProgress == 'Y') {
          this.vToastify('발주 상태가 대기가 아니거나, 품목리스트에 진행상태가 미완료가 아닌 데이터가 있으면 삭제할 수 없습니다.', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doDeleteAllData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          deleteWmsPurchasingOrderManageMain(
            selectedMainRows.filter((row) => !row.isCreated),
            true
          )
            .then((res) => {
              this.doSearchMain(false)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },

    btnAddDetail() {
      if (!this.focusedRowData || this.focusedRowData.isCreated) {
        this.vToastify(this.$t('발주가 없거나 저장 되지 않았습니다.'), 'warn')
        return
      }

      if (this.focusedRowData.status != 'STS01') {
        this.vToastify(this.$t('발주상태가 대기인 발주만 가능합니다.'), 'warn')
        return
      }
      this.MPopOpen = true
    },

    onFocusedRowChanged(e) {
      this.focusedRowData = e.row && e.row.data
      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        this.gridDetail = []
        return
      }

      this.openLoading('searching')
      this.doSearchDetail(e.row.data.poNo).finally(() => {
        this.endLoading()
      })
    },

    onDelYnDetailChange(val) {
      if (this.focusedRowData && !this.focusedRowData.isCreated) {
        this.openLoading('searching')
        this.doSearchDetail(this.focusedRowData.poNo).finally(() => {
          this.endLoading()
        })
      }
    },

    doSearchDetail(poNo) {
      let params = {
        poNo: poNo,
        delYn: this.delYnMain == 'Y' ? 'Y' : this.delYnDetail,
      }

      return getWmsPurchasingOrderManageDetail(params, false).then((res) => {
        this.gridDetailInit()
        this.gridDetail = res.listResponse.list
        this.gridDetailInstance.option('focusedRowIndex', 0)
      })
    },

    async btnSaveDetail() {
      // if(this.focusedRowData.status != 'STS01') {
      //   this.vToastify(this.$t('발주상태가 대기인 발주만 가능합니다.'), 'warn')
      //   return
      // }

      if (this.delYnMain == 'Y') {
        this.vToastify(this.$t('삭제된 발주의 품목은 저장할 수 없습니다.'), 'warn')
        return
      }
      this.gridDetailInstance.saveEditData()
      var selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      //유효성 체크
      for (var row of selectedDetailRows) {
        if (!row.matCd || !row.qty) {
          this.vToastify('필수항목 입력하세요.[품목명, 수량]', 'warn')
          return
        } else if (row.qty < 1) {
          this.vToastify('수량이 1보다 작습니다.', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          saveWmsPurchasingOrderManageDetail(selectedDetailRows, true)
            .then((res) => {
              this.doSearchDetail(this.focusedRowData.poNo)
            })
            .finally(() => {
              this.gridDetailInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },

    async btnDeleteDetail() {
      // var selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      let selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()

      if (this.delYnMain == 'Y' || this.delYnDetail == 'Y') {
        this.vToastify(this.$t('이미 삭제된 데이터입니다.'), 'warn')
        return
      }

      if (this.focusedRowData.status != 'STS01') {
        this.vToastify(this.$t('발주상태가 대기인 발주만 가능합니다.'), 'warn')
        return
      }

      for (var row of selectedDetailRows) {
        if (row.status != 'PRG_STS01') {
          this.vToastify('발주 품목리스트에 진행상태가 미완료가 아닌 데이터가 있으면 삭제할 수 없습니다.', 'warn')
          return
        }
      }

      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          deleteWmsPurchasingOrderManageDetail(
            selectedDetailRows.filter((row) => !row.isCreated),
            true
          )
            .then((res) => {
              this.doSearchDetail(selectedDetailRows[0].poNo)
            })
            .finally(() => {
              this.gridDetailInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },

    gridMainInit() {
      this.gridMainInstance.clearSelection()
      this.gridMainInstance.cancelEditData()
      this.gridMainInstance.option('focusedRowIndex', -1)
    },

    gridDetailInit() {
      this.gridDetailInstance.clearSelection()
      this.gridDetailInstance.cancelEditData()
      this.gridDetailInstance.option('focusedRowIndex', -1)
    },

    gridInit() {
      this.gridMainInit()
      this.gridDetailInit()
    },
  },
}
</script>