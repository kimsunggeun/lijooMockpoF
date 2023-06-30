<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete', //삭제
            'btnPrint', //출력
          ]"
          @btnAdd="btnAddMain()"
          @btnSearch="btnSearchMain()"
          @btnSave="btnSaveMain()"
          @btnDelete="btnDeleteMain()"
          @btnPrint="btnPrint()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 pb-0">
                <span class="px-1 pt-1">{{ '출발 예정일:' }}</span>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="etdFrom"
                    :max="etdTo"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="
                      (e) => {
                        etdFrom = e.value && getDateFormat(e.value)
                      }
                    "
                  />
                </v-col>
                <p>~</p>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="etdTo"
                    :min="etdFrom"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="
                      (e) => {
                        etdTo = e.value && getDateFormat(e.value)
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
                    v-model="partnerId"
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
        <i-card-vertical headerTitle="배송 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="cargoDeleveryManageMain"
                    class="layout-col-height4"
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
                    @CellDblClick="DblPopOpenD"
                  >
                    <DxColumn data-field="deliveryId" caption="배송 ID" width="150px" data-type="string" alignment="center" :allow-editing="false" />

                    <DxColumn
                      data-field="writeDt"
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
                      caption="인원"
                      width="120px"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    >
                      <DxLookup :data-source="hrIdLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn
                      data-field="etd"
                      caption="출발 예정일"
                      width="120px"
                      data-type="date"
                      format="yyyy-MM-dd"
                      alignment="center"
                      css-class="devest-grid-header-require"
                      edit-cell-template="etd"
                    />
                    <template #etd="{ data: cellInfo }">
                      <DxDateBox
                        :value="cellInfo.value"
                        display-format="yyyy-MM-dd"
                        @value-changed="
                          (e) => {
                            onValueChanged(e, cellInfo)
                          }
                        "
                      />
                    </template>

                    <DxColumn
                      data-field="eta"
                      caption="도착 예정일"
                      width="120px"
                      data-type="date"
                      format="yyyy-MM-dd"
                      alignment="center"
                      css-class="devest-grid-header-require"
                      edit-cell-template="eta"
                    />
                    <template #eta="{ data: cellInfo }">
                      <DxDateBox
                        :value="cellInfo.value"
                        display-format="yyyy-MM-dd"
                        @value-changed="
                          (e) => {
                            onValueChanged(e, cellInfo)
                          }
                        "
                      />
                    </template>

                    <DxColumn
                      data-field="atd"
                      caption="출발 실제일"
                      width="120px"
                      data-type="date"
                      format="yyyy-MM-dd"
                      alignment="center"
                      edit-cell-template="atd"
                    />
                    <template #atd="{ data: cellInfo }">
                      <DxDateBox
                        :value="cellInfo.value"
                        display-format="yyyy-MM-dd"
                        @value-changed="
                          (e) => {
                            onValueChanged(e, cellInfo)
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
                      :calculate-display-value="
                        (e) => {
                          let item = e.cargoTransId && transNopop.find((el) => el.cargoTransId == e.cargoTransId)
                          return item && item.transNo
                        }
                      "
                      :allow-editing="false"
                    />

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
                      caption="완료 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="completeYnEditor"
                    />
                    <template #completeYnEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                    </template>

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
                        :read-only="
                          cellInfo.data.status != 'STS01' ||
                          cellInfo.data.orgCompleteYn == 'Y' ||
                          (delYnMain == 'N' && cellInfo.column.dataField == 'delYn')
                        "
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
          headerTitle="배송 품목 리스트"
          :useBtnList="[
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete', //삭제
            'btnPrint', //출력
          ]"
          @btnAdd="btnAddDetail()"
          @btnSave="btnSaveDetail()"
          @btnDelete="btnDeleteDetail()"
          @btnPrint="btnPrintDetail()"
        >
          <template v-slot:switch>
            <v-switch v-model="delYnDetail" true-value="Y" false-value="N" :label="`삭제 데이터 조회`" @change="onDelYnDetailChange" />
          </template>
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="cargoDeleveryManageDetail"
                    class="layout-col-height4"
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
                    <DxColumn data-field="deliveryId" caption="배송 ID" width="150px" data-type="string" alignment="center" :visible="false" />

                    <DxColumn data-field="seq" caption="순번" width="90px" data-type="number" alignment="center" :visible="false" />

                    <DxColumn data-field="orderId" caption="출하의뢰 ID" width="150px" data-type="string" alignment="center" :allow-editing="false" />

                    <DxColumn
                      data-field="orderSeq"
                      caption="출하의뢰 순번"
                      width="95px"
                      data-type="number"
                      alignment="center"
                      :allow-editing="false"
                    />

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
                      :allow-editing="false"
                      :calculate-filter-expression="lookupColumnFilterExpression"
                      css-class="devest-grid-header-require"
                    />

                    <DxColumn
                      data-field="reqQty"
                      caption="요청 수량"
                      width="100px"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />

                    <DxColumn
                      :set-cell-value="setCellValue"
                      data-field="qty"
                      caption="공급 수량"
                      width="100px"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                    />

                    <DxColumn
                      data-field="price"
                      caption="공급가액"
                      width="110px"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />

                    <DxColumn
                      data-field="barcodeNo"
                      caption="바코드 번호"
                      data-type="string"
                      width="180px"
                      alignment="center"
                      edit-cell-template="barcodeDrop"
                      css-class="devest-grid-header-require"
                    />
                    <template #barcodeDrop="{ data: cellInfo }">
                      <DxDropDownBox
                        :ref="`barDropDownBoxRef${cellInfo.key}`"
                        :value="cellInfo.value"
                        :drop-down-options="{ width: 350 }"
                        :defer-rendering="false"
                        :data-source="barcodeNoList"
                        :read-only="!cellInfo.data.isCreated"
                        @opened="onBarDropOpened()"
                        display-expr="barcodeNo"
                        value-expr="barcodeNo"
                      >
                        <DxDataGrid
                          :filter-row="{ visible: true }"
                          :focused-row-key="cellInfo.value"
                          :data-source="barcodeNoList.filter((e) => e.matCd == cellInfo.data.matCd)"
                          :hover-state-enabled="true"
                          :focused-row-enabled="true"
                          :editing="{ allowUpdating: false }"
                          :selection="{ mode: 'single', deferred: false }"
                          :paging="{ pageSize: 5 }"
                          :pager="{ allowedPageSizes: [5, 'all'], showInfo: false }"
                          height="250px"
                          :column-hiding-enabled="false"
                          key-expr="barcodeNo"
                          @selection-changed="(e) => onSelectionChangedBar(e, cellInfo)"
                          :on-initialized="() => null"
                          :on-content-ready="() => null"
                          @initialized="onDropdownEditGridInitialized"
                          class="sec_grid"
                        >
                          <DxColumn data-field="matCd" caption="품목" data-type="string" alignment="left" :visible="false" />
                          <DxColumn data-field="barcodeNo" caption="바코드 번호" data-type="string" width="180px" alignment="center" />
                          <DxColumn data-field="qty" caption="재고 수량" data-type="number" format="#,##0" alignment="right" />
                          <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />
                        </DxDataGrid>
                      </DxDropDownBox>
                    </template>

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />

                    <DxColumn data-field="orgqty" caption="바코드 번호 품목저장용" data-type="string" alignment="left" :visible="false" />

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
                        :read-only="(focusedRowData && focusedRowData.orgCompleteYn == 'Y') || cellInfo.data.status != 'PRG_STS01'"
                      />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <CargoDeleveryManagePopUpM
        ref="grdM"
        :MPopOpen="MPopOpen"
        :focusedRowData="focusedRowData"
        :gridMatDrop="gridMatDrop"
        @close="MPopOpen = false"
        @AddSelectedRowsData="AddSelectedRowsData"
      />
      <CargoDeleveryManagePopUpD
        ref="grdD"
        :DPopOpen="DPopOpen"
        :driverDetail="(driverDetailPopUp = driverDetail)"
        @close="DPopOpen = false"
        @insDataD="insDataD"
      />
    </v-row>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import CargoDeleveryManagePopUpD from './CargoDeleveryManagePopUp/CargoDeleveryManagePopUpD.vue'
import CargoDeleveryManagePopUpM from './CargoDeleveryManagePopUp/CargoDeleveryManagePopUpM.vue'
import DxDateBox from 'devextreme-vue/date-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import DxDropDownBox from 'devextreme-vue/drop-down-box'
import * as JSPM from 'jsprintmanager'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getComboPartnerId,
  getWmsCargoDeleveryManageMain,
  getWmsCargoDeleveryManageDetail,
  saveWmsCargoDeleveryManageMain,
  saveWmsCargoDeleveryManageDetail,
  deleteWmsCargoDeleveryManageMain,
  deleteWmsCargoDeleveryManageDetail,
  getWmsCargoDeleveryManageDetailPopup,
  getComboBarcodeNoWmsCargoDeleveryManage,
  getCargoDeleveryManageRpt,
} from '@/api/kier/wms/cargoDeleveryManage'

import { getWmsDispatcherManage } from '@/api/kier/wms/dispatcherManage'

import { getComboHrManage } from '@/api/kier/standard/hRManage'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'

import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'

export default {
  name: 'CargoDeleveryManage',
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
    DxDropDownBox,
    CargoDeleveryManagePopUpM,
    CargoDeleveryManagePopUpD,
  },
  data() {
    return {
      DPopOpen: false,
      MPopOpen: false,
      dxDataGridMainRef: 'cargoDeleveryManageMain',
      dxDataGridDetailRef: 'cargoDeleveryManageDetail',
      gridMain: [],
      gridDetail: [],
      partnerIdList: [],
      etdFrom: getPreMonth(2),
      etdTo: getPreMonth(-2),
      partnerId: '',
      delYnMain: 'N',
      delYnDetail: 'N',
      partnerIdLookUp: [],
      hrIdLookUp: [],
      statusLookUp: [],
      prStatusLookUp: [],
      matList: [],
      gridMatDrop: [],
      reqDtFrom: getPreMonth(2),
      reqDtTo: getPreMonth(-2),
      orderId: '',
      barcodeNoList: [],
      focusedRowData: null,
      transNopop: [],
      driverDetail: [],
      driverpopup: [],
      driverLookUp: [],
      barqty: '',
      DrowInDex: '',
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
  beforeMount() {
    let params = {
      korNm: '',
      delYn: 'N',
    }
    Promise.all([
      getComboPartnerId(),
      getComboHrManage(),
      getCommonCode('S0010'),
      getCommonCode('S0011'),
      getComboStdMatManage(),
      getComboBarcodeNoWmsCargoDeleveryManage(),
      getWmsDispatcherManage(params),
    ])
      .then((res) => {
        this.partnerIdList = res[0].listResponse.list.slice()
        this.partnerIdList.unshift({ code: '', desc: '전체' })
        this.partnerIdLookUp = res[0].listResponse.list.slice()
        this.hrIdLookUp = res[1].listResponse.list
        this.statusLookUp = res[2].listResponse.list
        this.prStatusLookUp = res[3].listResponse.list
        this.matList = res[4].listResponse.list
        this.barcodeNoList = res[5].listResponse.list
        this.driverDetail = res[6].listResponse.list.slice()
        this.transNopop = res[6].listResponse.list.slice()
        this.driverLookUp = res[6].listResponse.list.slice()
      })
      .catch((error) => {})
  },
  methods: {
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
      console.log(e)
      let newRow = {
        id: this.gridDetail.length + 1,
        deliveryId: this.focusedRowData.deliveryId,
        orderId: e[0].orderId,
        orderSeq: e[0].seq,
        mainClass: e[0].mainClass,
        middleClass: e[0].middleClass,
        matCd: e[0].matCd,
        reqQty: e[0].qty,
        status: 'PRG_STS01',
        qty: 0,
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

    setCellValue(newData, value, currentRowData) {
      var mat = this.matList.filter((e) => e.matCd == currentRowData.matCd)
      newData.qty = value
      newData.price = mat[0].price * value
    },

    onSelectionChangedBar(e, cellInfo) {
      this.$refs[`barDropDownBoxRef${cellInfo.key}`].instance.option('value', e.selectedRowsData[0].barcodeNo)
      this.gridDetailInstance.cellValue(cellInfo.rowIndex, 'barcodeNo', e.selectedRowsData[0].barcodeNo)
      this.gridDetailInstance.cellValue(cellInfo.rowIndex, 'qty', e.selectedRowsData[0].qty)
      this.gridDetailInstance.cellValue(cellInfo.rowIndex, 'orgqty', e.selectedRowsData[0].qty)

      cellInfo.component.selectRows(cellInfo.row.key, true)
      this.gridDetailInstance.closeEditCell()
    },

    insDataD(e) {
      this.gridMainInstance.cellValue(this.DrowInDex, 'cargoTransId', e[0]?.cargoTransId)
    },
    DblPopOpenD(e) {
      if (e.columnIndex == '9') {
        this.DPopOpen = true
        this.DrowInDex = e.row.rowIndex
        this.$refs.grdD.open()
      }
    },

    onEditorPreparingMain(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'partnerId':
            e.editorOptions.readOnly = !e.row.data.isCreated
            break
          case 'etd':
            e.editorOptions.max = e.row.data.eta
            break
          case 'eta':
            e.editorOptions.min = e.row.data.etd
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
            e.editorOptions.readOnly = e.row.data.status != 'PRG_STS01'
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
        etdFrom: this.etdFrom,
        etdTo: this.etdTo,
        delYn: this.delYnMain,
      }

      this.gridInit()
      return getWmsCargoDeleveryManageMain(params, isProgress).then((res) => {
        this.gridMain = res.listResponse.list
        if (this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
      })
    },

    async btnAddMain() {
      let newRow = {
        id: this.gridMain.length + 1,
        writeDt: getCurrentDate(),

        status: 'STS01',
        completeYn: 'N',
        useYn: 'Y',
        delYn: 'N',
        isCreated: true,
      }
      this.gridMainInstance.refresh()
      this.gridMainInstance.newRow(newRow)
      await this.gridMainInstance.selectRows(newRow.id, true)
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
        if (!row.partnerId || !row.hrId || !row.etd || !row.eta) {
          this.vToastify('필수항목 입력하세요.[파트너, 인원, 출발 예정일, 도착 예정일]', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveWmsCargoDeleveryManageMain(selectedMainRows, true)
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
      var focusedRowIndex = this.gridMainInstance.option('focusedRowIndex')
      var focusedRow = focusedRowIndex > -1 ? this.gridMain[focusedRowIndex] : null

      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      if (!focusedRow || focusedRow.isCreated) {
        this.gridDetail = []
        this.vToastify(this.$t('저장된 배송 정보만 저장 가능합니다.'), 'warn')
        return
      }

      //유효성 체크
      for (var row of selectedMainRows) {
        if (row.status != 'STS01') {
          this.vToastify('진행 상태가 대기가 아닌 데이터가 있으면 삭제할 수 없습니다.', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doDeleteAllData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          deleteWmsCargoDeleveryManageMain(
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

    onFocusedRowChanged(e) {
      this.focusedRowData = e.row && e.row.data
      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        this.gridDetail = []
        return
      }

      this.openLoading('searching')
      this.doSearchDetail(e.row.data.deliveryId).finally(() => {
        this.endLoading()
      })
      this.btnDropSearch()
    },

    onDelYnDetailChange(val) {
      if (this.focusedRowData && !this.focusedRowData.isCreated) {
        this.openLoading('searching')
        this.doSearchDetail(this.focusedRowData.deliveryId).finally(() => {
          this.endLoading()
        })
      }
    },

    doSearchDetail(deliveryId) {
      let params = {
        deliveryId: deliveryId,
        delYn: this.delYnMain == 'Y' ? 'Y' : this.delYnDetail,
      }

      return getWmsCargoDeleveryManageDetail(params, false).then((res) => {
        this.gridDetailInit()
        this.gridDetail = res.listResponse.list
        this.gridDetailInstance.option('focusedRowIndex', 0)
      })
    },

    btnAddDetail() {
      if (!this.focusedRowData || this.focusedRowData.isCreated) {
        this.gridDetail = []
        this.vToastify(this.$t('배송 정보가 없거나 저장되지 않았습니다.'), 'warn')
        return
      }

      if (this.focusedRowData.completeYn == 'Y') {
        this.vToastify(this.$t('완료 여부가 체크되어있으면 추가할 수 없습니다.'), 'warn')
        return
      }
      this.MPopOpen = true
      this.$refs.grdM.onPopSeach()
    },

    async btnSaveDetail() {
      var focusedRowIndex = this.gridMainInstance.option('focusedRowIndex')
      var focusedRow = focusedRowIndex > -1 ? this.gridMain[focusedRowIndex] : null

      if (!focusedRow || focusedRow.isCreated) {
        this.gridDetail = []
        this.vToastify(this.$t('저장된 배송 정보만 저장 가능합니다.'), 'warn')
        return
      }

      if (this.focusedRowData.completeYn == 'Y') {
        this.vToastify(this.$t('완료 여부가 체크되어있으면 저장할 수 없습니다.'), 'warn')
        return
      }

      if (this.delYnMain == 'Y') {
        this.vToastify(this.$t('삭제된 의뢰의 품목은 저장할 수 없습니다.'), 'warn')
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
        if (!row.matCd || !row.barcodeNo) {
          this.vToastify('필수 항목 입력하세요.[품목, 바코드 번호]', 'warn')
          return
        } else if (Number(row.qty) < 1) {
          this.vToastify('공급 수량이 1보다 작습니다.', 'warn')
          return
        } else if (Number(row.qty) > Number(row.reqQty)) {
          this.vToastify('공급 수량이 요청 수량보다 큽니다.', 'warn')
          return
        } else if (Number(row.qty) > Number(row.orgqty)) {
          this.vToastify('공급 수량이 재고 수량보다 많습니다.', 'warn')
          return
        }
      }

      //중복 배열 제거
      selectedDetailRows = selectedDetailRows.filter(
        (el, i) => selectedDetailRows.findIndex((e) => e.orderId + e.orderSeq + e.barcodeNo === el.orderId + el.orderSeq + el.barcodeNo) === i
      )

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          saveWmsCargoDeleveryManageDetail(selectedDetailRows, true)
            .then((res) => {
              this.doSearchDetail(this.focusedRowData.deliveryId)
            })
            .finally(() => {
              this.doSearchMain(true)
              this.gridDetailInstance.endUpdate()
              this.endLoading()
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
        this.vToastify(this.$t('저장된 배송 정보만 삭제 가능합니다.'), 'warn')
        return
      }

      if (this.delYnMain == 'Y' || this.delYnDetail == 'Y') {
        this.vToastify(this.$t('이미 삭제된 데이터입니다.'), 'warn')
        return
      }

      if (this.focusedRowData.completeYn == 'Y') {
        this.vToastify(this.$t('완료 여부가 체크되어있으면 삭제할 수 없습니다.'), 'warn')
        return
      }

      let selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
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
          deleteWmsCargoDeleveryManageDetail(
            selectedDetailRows.filter((row) => !row.isCreated),
            true
          )
            .then((res) => {
              this.doSearchDetail(this.focusedRowData.deliveryId)
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

    btnPrint() {
      var focusedRowIndex = this.gridMainInstance.option('focusedRowIndex')
      var focusedRow = focusedRowIndex > -1 ? this.gridMain[focusedRowIndex] : null

      if (!focusedRow || focusedRow.isCreated) {
        this.gridDetail = []
        this.vToastify(this.$t('저장된 배송 정보만 출력 가능합니다.'), 'warn')
        return
      }

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
        deliveryId: this.focusedRowData.deliveryId,
      }

      this.openLoading()
      getCargoDeleveryManageRpt(params)
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

    async btnPrintDetail() {
      var selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      this.print(selectedDetailRows)
    },

    print(selectedDetailRows) {
      // Step 1. 연결
      JSPM.JSPrintManager.auto_reconnect = true
      JSPM.JSPrintManager.start()

      // Zebra Print ZPL
      JSPM.JSPrintManager.WS.onStatusChanged = function () {
        if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open) {
          // 로컬에 설치 된 프린터 정보 확인
          JSPM.JSPrintManager.getPrinters().then(function (e) {})

          let cmdMultilineString = ''
          for (var row of selectedDetailRows) {
            let matNmPrint = row.matNm
            let maxLength = 40

            if (matNmPrint.length > maxLength) {
              matNmPrint = matNmPrint.substring(0, maxLength) + '...'
            }

            cmdMultilineString =
              cmdMultilineString +
              `
          ^XA

          ^FX 문자회전(기본값: N = Normal, R = 90도 , I = 180도, B= 270도)

          ^MMT
          ^PW799
          ^LL0240
          ^LS0

          ^FX Box
          ^FO12,21^GB775,214,4^FS

          ^FX Horizontal Line
          ^FO15,75^GB770,0,4^FS

          ^FX BarCode
          ^BY2,3,100^FT710,115^BCI,,Y,N
          ^FD` +
              row.barcodeNo +
              `^FS

          ^FX Item Name
          ^FT773,36^A0I,34,34^FB800,1,0,L^FH\
          ^FD` +
              matNmPrint +
              `^FS


          ^PQ1,0,1,Y

          ^XZ

          `
          }

          var cpj = new JSPM.ClientPrintJob()
          cpj.clientPrinter = new JSPM.UserSelectedPrinter()
          // cpj.clientPrinter = new JSPM.DefaultPrinter();
          // cpj.clientPrinter = new JSPM.InstalledPrinter("ZDesigner ZT411-203dpi ZPL");
          // cpj.clientPrinter = new JSPM.InstalledPrinter("복합기-마라탕2층_SINDOH D410 Series PCL");

          cpj.printerCommands = cmdMultilineString
          cpj.sendToClient()
        }
      }
    },

    onBarDropOpened() {
      this.openLoading('searching')
      getComboBarcodeNoWmsCargoDeleveryManage()
        .then((res) => {
          this.barcodeNoList = res.listResponse.list
        })
        .finally(() => {
          this.endLoading()
        })
    },

    btnDropSearch() {
      let params = {
        orderId: '',
        reqDtFrom: this.reqDtFrom,
        reqDtTo: this.reqDtTo,
      }

      this.openLoading('searching')
      getWmsCargoDeleveryManageDetailPopup(params, false)
        .then((res) => {
          this.gridMatDrop = res.listResponse.list
          console.log()
        })
        .finally(() => {
          this.endLoading()
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


<style>
</style>