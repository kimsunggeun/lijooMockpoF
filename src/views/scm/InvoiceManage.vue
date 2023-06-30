<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="buttonUseListMain"
          @btnSearch="btnSearchMain()"
          @btnAdd="btnAddMain()"
          @btnSave="btnSaveMain()"
          @btnDelete="btnDeleteMain()"
          @btnPrint="btnPrint()"
        >
          <template v-slot:body>
            <!-- 달력 -->

            <v-row no-gutters class="center pa-2 pb-0">
              <span class="px-1 pt-1">{{ '작성일 :' }}</span>
              <v-col cols="12" md="2" class="pa-2 py-md-0">
                <DxDateBox
                  :value="writeDtFrom"
                  :max="writeDtTo"
                  height="30px"
                  display-format="yyyy-MM-dd"
                  :show-clear-button="true"
                  @value-changed="
                    (e) => {
                      writeDtFrom = e.value && getDateFormat(e.value)
                    }
                  "
                />
              </v-col>
              <p>~</p>
              <v-col cols="12" md="2" class="pa-2 py-md-0">
                <DxDateBox
                  :value="writeDtTo"
                  :min="writeDtFrom"
                  height="30px"
                  display-format="yyyy-MM-dd"
                  :show-clear-button="true"
                  @value-changed="
                    (e) => {
                      writeDtTo = e.value && getDateFormat(e.value)
                    }
                  "
                />
              </v-col>

              <!-- 라벨 -->

              <v-col cols="12" md="2" sm="12" class="ml-4">
                <v-select
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="required mx-1 rounded-0"
                  item-text="desc"
                  item-value="code"
                  :prepend-inner-icon="$t('$search')"
                  :items="partnerIdList"
                  label="부품업체명"
                  dense
                  outlined
                  v-model="partnerIdTypeSelectedDiv"
                />
              </v-col>

              <!-- 스위치 -->
              <span style="width: 164px" class="pa-2 py-md-0">
                <v-switch v-model="delYnMain" true-value="Y" false-value="N" :label="` 삭제 데이터 조회`" @click="btnSearchMain()" />
              </span>
            </v-row>
          </template>
        </i-card-top>

        <i-system-bar />
      </v-col>

      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="■ 거래명세서 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="invoiceManage"
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
                    @focused-row-changed="onFocusedRowChanged"
                    @editor-preparing="onEditorPreparingMain"
                    @CellDblClick="DblPopOpenD"
                  >
                    <DxSelection :select-all-mode="allMode" show-check-boxes-mode="always" mode="multiple" />

                    <DxColumn
                      data-field="invoiceId"
                      caption="거래명세서 ID"
                      width="150px"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="writeDt"
                      caption="작성일"
                      :allow-editing="false"
                      format="yyyy-MM-dd"
                      width="150px"
                      data-type="date"
                      alignment="center"
                    />

                    <DxColumn
                      data-field="partnerId"
                      caption="부품업체명"
                      width="130px"
                      data-type="string"
                      alignment="left"
                      css-class="devest-grid-header-require"
                      :set-cell-value="
                        (newData, value) => {
                          newData.partnerId = value
                          newData.employeeId = null
                        }
                      "
                    >
                      <DxLookup :data-source="partnerIdLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn
                      data-field="employeeId"
                      caption="납품 담당자"
                      width="120px"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    >
                      <DxLookup :data-source="getFilteredPartnerEmployee" value-expr="employeeId" display-expr="korNm" />
                    </DxColumn>

                    <DxColumn
                      data-field="etd"
                      caption="출발 예정일"
                      data-type="date"
                      width="120px"
                      alignment="center"
                      format="yyyy-MM-dd"
                      css-class="devest-grid-header-require"
                      edit-cell-template="date_min"
                    />
                    <template #date_min="{ data: cellInfo }">
                      <DxDateBox
                        :value="cellInfo.value"
                        :max="cellInfo.row.data.eta"
                        display-format="yyyy-MM-dd"
                        :show-clear-button="true"
                        @value-changed="
                          (e) => {
                            onValueChanged(e, cellInfo)
                            cellInfo.component.selectRows(cellInfo.row.key, true)
                          }
                        "
                      />
                    </template>

                    <DxColumn
                      data-field="eta"
                      caption="도착 예정일"
                      data-type="date"
                      width="120px"
                      alignment="center"
                      css-class="devest-grid-header-require"
                      format="yyyy-MM-dd"
                      edit-cell-template="date_max"
                    />

                    <template #date_max="{ data: cellInfo }">
                      <DxDateBox
                        :value="cellInfo.value"
                        :min="cellInfo.row.data.etd"
                        display-format="yyyy-MM-dd"
                        :show-clear-button="true"
                        @value-changed="
                          (e) => {
                            onValueChanged(e, cellInfo)
                            cellInfo.component.selectRows(cellInfo.row.key, true)
                          }
                        "
                      />
                    </template>

                    <DxColumn data-field="status" caption="진행 상태" width="120px" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="statusLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn
                      data-field="cargoTransId"
                      caption="차량 번호"
                      width="140px"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="driverLookUp" value-expr="cargoTransId" display-expr="transNo" />
                    </DxColumn>

                    <DxColumn
                      data-field="cargoTransId"
                      name="korNm"
                      caption="배송 담당자"
                      width="120px"
                      data-type="string"
                      :allow-editing="false"
                      alignment="center"
                    >
                      <DxLookup :data-source="driverLookUp" value-expr="cargoTransId" display-expr="korNm" />
                    </DxColumn>

                    <DxColumn
                      data-field="cargoTransId"
                      name="hpNo"
                      caption="배송 담당자 전화번호"
                      width="120px"
                      data-type="number"
                      alignment="center"
                      :allow-editing="false"
                    >
                      <DxLookup :data-source="driverLookUp" value-expr="cargoTransId" display-expr="hpNo" />
                    </DxColumn>

                    <DxColumn
                      data-field="completeYn"
                      data-type="boolean"
                      caption="완료 여부"
                      alignment="center"
                      width="90px"
                      edit-cell-template="checkBoxEditor"
                      :allow-editing="false"
                    />

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />

                    <DxColumn
                      data-field="useYn"
                      data-type="boolean"
                      caption="사용 여부"
                      alignment="center"
                      width="90px"
                      edit-cell-template="checkBoxEditor"
                    />

                    <DxColumn
                      data-field="delYn"
                      data-type="boolean"
                      caption="삭제 여부"
                      alignment="center"
                      width="90px"
                      edit-cell-template="checkBoxEditor"
                    />

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>

      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical
          headerTitle="■ 거래명세서 품목 리스트"
          :useBtnList="buttonUseListDetail"
          @btnAdd="btnAddDetail()"
          @btnSave="btnSaveDetail()"
          @btnDelete="btnDeleteDetail()"
        >
          <template v-slot:switch>
            <v-switch class="ma-5" v-model="delYnDetail" true-value="Y" false-value="N" :label="` 삭제 데이터 조회`" @change="onDelYnDetailChange" />
          </template>

          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="row pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="invoiceManageDetail"
                    class="layout-col-height4"
                    :ref="dxDataGridDetailRef"
                    :data-source="gridDetail"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :column-auto-width="true"
                    :columnHidingEnabled="false"
                    :show-borders="true"
                    :show-row-lines="true"
                    :focused-row-enabled="true"
                    key-expr="id"
                    parent-id-expr="invoiceId"
                    :column-hiding-enabled="false"
                    @editor-preparing="onEditorPreparingDetail"
                  >
                    <DxSelection :select-all-mode="allMode" show-check-boxes-mode="always" mode="multiple" />

                    <DxColumn data-field="seq" caption="순번" width="80px" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="poNo" caption="발주 번호" data-type="string" alignment="center" width="180px" :allow-editing="false" />
                    <DxColumn data-field="poSeq" caption="발주 순번" data-type="string" width="80px" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="mainClass" caption="품목 대분류" width="180px" data-type="string" alignment="left" :allow-editing="false" />

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
                      width="300px"
                      data-type="string"
                      alignment="left"
                      :calculate-display-value="
                        (e) => {
                          let item = e.matCd && matList.find((el) => el.matCd == e.matCd)
                          return item && item.matNm
                        }
                      "
                      :calculate-filter-expression="lookupColumnFilterExpression"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                    />

                    <DxColumn
                      data-field="reqQty"
                      format="#,##0"
                      caption="요청 수량"
                      data-type="number"
                      width="70px"
                      alignment="right"
                      :allow-editing="false"
                    />
                    <DxColumn data-field="qty" format="#,##0" caption="공급 수량" data-type="number" width="70px" alignment="right" />
                    <DxColumn data-field="price" format="#,##0" caption="공급가액" data-type="number" width="130px" alignment="right" />
                    <DxColumn
                      data-field="barcodeNo"
                      width="200px"
                      caption="바코드 번호"
                      data-type="string"
                      alignment="center"
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
                      data-type="boolean"
                      caption="삭제 여부"
                      alignment="center"
                      width="70px"
                      edit-cell-template="checkBoxEditor"
                    />

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>

      <InvoiceManagePopUpD
        ref="grdD"
        :DPopOpen="DPopOpen"
        :driverDetail="(driverDetailPopUp = driverDetail)"
        @close="DPopOpen = false"
        @insDataD="insDataD"
      />
      <InvoiceManagePopUpM
        ref="grdM"
        :MPopOpen="MPopOpen"
        :focusedRowData="focusedRowData"
        @close="MPopOpen = false"
        @AddSelectedRowsData="AddSelectedRowsData"
      />
    </v-row>
  </v-container>
</template>
<script>
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import iCardTop from '@/components/common/iCardTop.vue'
import iCardVertical from '@/components/common/iCardVertical.vue'
import DxDropDownBox from 'devextreme-vue/drop-down-box'
import InvoiceManagePopUpD from './InvoiceManagePopUp/InvoiceManagePopUpD.vue'
import InvoiceManagePopUpM from './InvoiceManagePopUp/InvoiceManagePopUpM.vue'

import {
  getInvoice,
  getInvoiceDetail,
  deleteInvoice,
  saveInvoice,
  getComboPartnerId,
  saveInvoiceDetail,
  deleteInvoiceDetail,
  getInvoiceRpt,
} from '@/api/kier/scm/invoiceManage'

//
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import { getWmsDispatcherManage } from '@/api/kier/wms/dispatcherManage'

import ISystemBar from '@/components/common/iSystemBar.vue'

import { getCommonCode } from '@/api/kier/standard/commonCodeManage'

import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'
import DxDateBox from 'devextreme-vue/date-box'

import { getStdPartnerEmployee } from '@/api/kier/standard/partnerEmployeeManage'

export default {
  name: 'SysCommonCodeManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    'i-card-vertical': iCardVertical,
    'i-card-top': iCardTop,
    DxDataGrid,

    DxColumn,
    InvoiceManagePopUpD,
    InvoiceManagePopUpM,
    DxCheckBox,
    DxLookup,
    DxDateBox,

    ISystemBar,
  },

  data() {
    return {
      dates: [],
      transNo: '',
      DPopOpen: false,
      MPopOpen: false,
      mainClassList: [],
      middleClassList: [],
      statusLookUp: [],

      delYnMain: 'N',
      delYnDetail: 'N',
      showPageSizeSelector: false,
      pagingSize: 17,
      dxDataGridMainRef: 'invoiceManage',
      dxDataGridDetailRef: 'invoiceManageDetail',

      dropDownBoxRef: 'invoiceManageDataPopup',

      dropDownDataGridRefdriver: 'dropDownBoxDatadriver',
      dropDownBoxRefdriver: 'driverManageDataPopup',
      buttonUseList: ['btnSearch'],

      buttonUseListMain: [
        'btnSearch',
        'btnAdd', //신규
        'btnSave', //저장
        'btnDelete', //삭제
        'btnPrint',
      ],

      buttonUseListDetail: [
        'btnAdd', //신규
        'btnSave', //저장
        'btnDelete', //삭제
      ],

      allMode: 'allPages',
      gridMain: [],
      gridDetail: [],
      //text, select Data
      selectType: [],

      partnerIdList: [],
      partnerIdLookUp: [],

      partnerEmployeeLookUp: [],
      matlistpopup: [],
      matListDetail: [],
      transNopop: [],
      driverDetail: [],
      driverpopup: [],
      driverLookUp: [],
      driverDetailPopUp: [],
      focusedRowData: [],
      selectedDiv: '',
      txtCommonCd: '',
      txtCommonNm: '',
      writeDtFrom: getPreMonth(2),
      writeDtTo: getPreMonth(-2),
      partnerIdTypeSelectedDiv: '',
      etd: null,
      eta: null,
      reqDtTo: getPreMonth(-2),
      reqDtFrom: getPreMonth(2),
      DrowInDex: '',
      MrowInDex: '',
      idSearch: '',
      asd: '',
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.dxDataGridDetailRef)
    },
    // asdInstance() {
    //   return this.GetDataGrid(this.dropDownDataGridRef)
    // },
  },

  beforeMount() {
    let params = {
      korNm: '',
      delYn: 'N',
    }
    Promise.all([
      getComboPartnerId(),
      getStdPartnerEmployee({}, false),
      getCommonCode('S0010'),
      getComboStdMatManage(),
      getWmsDispatcherManage(params),
    ])

      .then((res) => {
        this.partnerIdList = res[0].listResponse.list.slice()
        this.partnerIdList.unshift({ code: '', desc: '전체' })
        this.partnerIdLookUp = res[0].listResponse.list.slice()
        this.partnerEmployeeLookUp = res[1].listResponse.list
        this.statusLookUp = res[2].listResponse.list.slice()
        this.matList = res[3].listResponse.list.slice()
        this.matlistpopup = res[3].listResponse.list.slice()
        this.driverDetail = res[4].listResponse.list.slice()
        this.transNopop = res[4].listResponse.list.slice()
        this.driverLookUp = res[4].listResponse.list.slice()
      })
      .catch((error) => {})
  },
  mounted() {},

  methods: {
    onFocusedRowChanged(e) {
      this.focusedRowData = e.row && e.row.data

      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        this.gridDetail = []
        return
      }

      this.doSearchDetail(e.row.data.invoiceId)
    },

    onValueChanged(e, cellInfo) {
      if (String(e.value).length == 42) {
        cellInfo.setValue(e.value)
      } else {
        cellInfo.setValue((e.value = null))
      }
    },

    btnPrint() {
      if (!this.focusedRowData) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      if (this.focusedRowData.isCreated) {
        this.vToastify(this.$t('저장되지 않은 데이터입니다.'), 'warn')
        return
      }

      if (this.focusedRowData.delYn == 'Y') {
        this.vToastify(this.$t('삭제된 데이터입니다.'), 'warn')
        return
      }

      var params = {
        invoiceId: this.focusedRowData.invoiceId,
      }

      this.openLoading()
      getInvoiceRpt(params)
        .then((res) => {
          this.printReport(res)
        })
        .finally(() => {
          this.endLoading()
        })
    },

    printReport(res) {
      const blob = new Blob([res], { type: 'application/pdf' })
      const blobURL = URL.createObjectURL(blob)
      const iframe = document.createElement('iframe')
      document.body.appendChild(iframe)

      iframe.style.display = 'none'
      iframe.src = blobURL
      iframe.onload = function () {
        setTimeout(function () {
          iframe.focus()
          iframe.contentWindow.print()
        }, 1)
      }
    },

    getFilteredPartnerEmployee(options) {
      return {
        store: this.partnerEmployeeLookUp,
        filter: options.data && ['partnerId', '=', options.data.partnerId],
      }
    },

    getFilteredMiddleClass(options) {
      return {
        store: this.middleClassList,
        filter: options.data && ['code', '=', options.data.mainClass],
      }
    },

    getDateFormat(date) {
      return getDateFormat(date)
    },

    insDataD(e) {
      this.gridMainInstance.cellValue(this.DrowInDex, 'cargoTransId', e[0]?.cargoTransId)
    },
    DblPopOpenD(e) {
      if (e.columnIndex == '8') {
        this.DPopOpen = true
        this.DrowInDex = e.row.rowIndex
        this.$refs.grdD.open()
      }
    },

    onEditorPreparingMain(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'writeDt':
            e.editorOptions.readOnly = !e.row.data.isCreated
            break
          case 'partnerId':
            e.editorOptions.readOnly = !e.row.data.isCreated
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

    onEditorPreparingDetail(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
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
        partnerId: this.partnerIdTypeSelectedDiv,
        delYn: this.delYnMain,
        writeDtFrom: this.writeDtFrom,
        writeDtTo: this.writeDtTo,
      }

      this.gridInit()

      return getInvoice(params, isProgress).then((res) => {
        this.gridMain = res.listResponse.list
        this.gridDetail = []
        if (this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
      })
    },

    async btnAddMain() {
      let newRow = {
        writeDt: getCurrentDate(),
        id: this.gridMain.length + 1,
        isCreated: true,
        completeYn: 'N',
        useYn: 'Y',
        delYn: 'N',
        status: 'STS01',
      }

      this.gridMainInstance.refresh()
      this.gridMainInstance.newRow(newRow)
      await this.gridMainInstance.selectRows(newRow.id, true)
      this.gridMainInstance.option('focusedRowIndex', -1)
    },

    btnAddDetail() {
      var focusedRowIndex = this.gridMainInstance.option('focusedRowIndex')
      var focusedRow = focusedRowIndex > -1 ? this.gridMain[focusedRowIndex] : null
      if (!focusedRow || focusedRow.isCreated) {
        this.gridDetail = []
        this.vToastify(this.$t('저장된 거래명세서만 추가 가능합니다.'), 'warn')
        return
      }

      this.$refs.grdM.doSearchPopup()
      this.MPopOpen = true
    },

    AddSelectedRowsData(e) {
      for (let filterlow of this.gridDetail) {
        if (filterlow.poNo + filterlow.poSeq == e[0].poNo + e[0].poSeq) {
          return this.vToastify(this.$t('이미 추가된 품목 입니다.'), 'warn')
        }
      }

      var focusedRowIndex = this.gridMainInstance.option('focusedRowIndex')
      var focusedRow = focusedRowIndex > -1 ? this.gridMain[focusedRowIndex] : null
      let newRow = {
        id: this.gridDetail.length + 1,
        invoiceId: focusedRow.invoiceId,
        matCd: e[0].matCd,
        mainClass: e[0].mainClass,
        middleClass: e[0].middleClass,
        poNo: e[0].poNo,
        poSeq: e[0].poSeq,
        reqQty: e[0].remainQty,
        qty: e[0].remainQty == undefined || e[0].remainQty == null || e[0].remainQty == '' || isNaN(e[0].remainQty) == true ? 0 : e[0].remainQty,
        useYn: 'Y',
        delYn: 'N',
        isCreated: true,
      }
      this.gridDetailInstance.newRow(newRow)
      this.gridDetailInstance.refresh().then(() => {
        this.gridDetailInstance.selectRows(newRow.id, true)
        this.gridDetailInstance.option('focusedRowIndex', 0)
      })
    },

    async btnSaveMain() {
      this.gridMainInstance.saveEditData()
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      let patten = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/

      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      if (selectedMainRows.findIndex((row) => !row.partnerId || !row.employeeId || !row.etd || !row.eta) > -1) {
        this.vToastify('필수항목 입력하세요.[부품업체명, 납품담당자 ,출발예정일 , 도착 예정일]', 'warn')
        return
      }

      for (let i of selectedMainRows) {
        if (!patten.test(i.etd.substring(0, 10))) {
          this.vToastify('알맞은 출발 예정일을 입력해주십시오 <br>예시: [2022-10-31]', 'warn')
          return
        }

        if (i.eta != undefined) {
          if (!patten.test(i.eta.substring(0, 10))) {
            this.vToastify('알맞은 도착 예정일을 입력해주십시오 <br>예시: [2022-10-31]', 'warn')
            return
          }
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()

          saveInvoice(selectedMainRows, true)
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

    async btnSaveDetail() {
      var focusedRowIndex = this.gridMainInstance.option('focusedRowIndex')
      var focusedRow = focusedRowIndex > -1 ? this.gridMain[focusedRowIndex] : null

      if (!focusedRow || focusedRow.isCreated) {
        this.gridDetail = []
        this.vToastify(this.$t('저장된 거래명세서만 저장 가능합니다.'), 'warn')
        return
      }

      this.gridDetailInstance.saveEditData()
      var selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      for (var row of selectedDetailRows) {
        if (row.reqQty < 1) {
          this.vToastify('요청 수량이 1보다 작습니다.', 'warn')
          return
        } else if (row.qty < 1) {
          this.vToastify('공급 수량이 1보다 작습니다.', 'warn')
          return
        } else if (row.price < 1 || row.price == null) {
          this.vToastify('공급가액 이 1보다 작습니다.', 'warn')
          return
        } else if (Number(row.reqQty) < Number(row.qty)) {
          this.vToastify('공급 수량 이 요청 수량보다 많습니다.', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()

          saveInvoiceDetail(selectedDetailRows, true)
            .then((res) => {
              this.doSearchDetail(selectedDetailRows[0].invoiceId)
            })
            .finally(() => {
              this.gridDetailInstance.endUpdate()
              this.doSearchMain(true)
              this.endLoading()
            })
        },
        null,
        true
      )
    },

    async btnDeleteMain() {
      let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      for (let del of selectedMainRows) {
        if (del.status !== 'STS01') {
          this.vToastify(this.$t('대기 상태가 아니면 삭제할 수 없습니다.'), 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doDeleteAllData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          deleteInvoice(
            selectedMainRows.filter((row) => !row.isCreated),
            true
          )
            .then((res) => {
              var selectedRowKeys = selectedMainRows.map((row) => row.id)
              this.gridMain = this.gridMain.filter((row) => !selectedRowKeys.includes(row.id))
              this.gridDetail = []
              this.gridInit()
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
              this.gridMainInstance.option('focusedRowIndex', 0)
            })
        },
        null,
        true
      )
    },

    async btnDeleteDetail() {
      var focusedRowIndex = this.gridMainInstance.option('focusedRowIndex')
      var focusedRow = focusedRowIndex > -1 ? this.gridMain[focusedRowIndex] : null

      if (!focusedRow || focusedRow.isCreated) {
        this.gridDetail = []
        this.vToastify(this.$t('저장된 거래명세서만 삭제 가능합니다.'), 'warn')
        return
      }

      let selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      for (var del of selectedDetailRows) {
        if (Number(del.qty) >= 1) {
          this.vToastify('공급 수량이 1개 이상이면 삭제할 수 없습니다.', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          deleteInvoiceDetail(
            selectedDetailRows.filter((row) => !row.isCreated),
            true
          )
            .then((res) => {
              var selectedRowKeys = selectedDetailRows.map((row) => row.id)
              this.gridDetail = this.gridDetail.filter((row) => !selectedRowKeys.includes(row.id))
              this.gridDetailInit()
              this.gridDetailInstance.option('focusedRowIndex', 0)
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

    onDelYnDetailChange(val) {
      if (this.focusedRowData && !this.focusedRowData.isCreated) {
        this.openLoading('searching')

        this.doSearchDetail(this.focusedRowData.invoiceId).finally(() => {
          this.endLoading()
        })
      }
    },

    doSearchDetail(invoiceId) {
      let params = {
        invoiceId: invoiceId,
        delYn: this.delYnMain == 'Y' ? 'Y' : this.delYnDetail,
      }
      return getInvoiceDetail(params, false).then((res) => {
        this.gridDetailInit()
        this.gridDetail = res.listResponse.list
        this.gridDetailInstance.option('focusedRowIndex', 0)
      })
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

<style lang="scss" scoped>
$appBarHeight: 64px;
$cardTitleHeight: 48px;
$paddingHeight: 8px;

.user-col-height {
  height: 100vh;
  max-height: calc(100vh - (#{$appBarHeight} + (#{$cardTitleHeight} * 2) + (#{$paddingHeight} * 7)));
}
</style>
