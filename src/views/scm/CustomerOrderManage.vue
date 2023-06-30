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
                    label="유지보수업체명"
                    dense
                    outlined
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
                    label="출하의뢰 상태"
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
        <i-card-vertical headerTitle="출하의뢰 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="customerOrderManageMain"
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
                  >
                    <DxColumn data-field="orderId" caption="출하의뢰 ID" width="150px" data-type="string" alignment="center" :allow-editing="false" />

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
                      caption="유지보수업체명"
                      width="220px"
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
                      caption="담당자"
                      width="150px"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    >
                      <DxLookup
                        :data-source="
                          (options) => ({
                            store: partnerEmployeeLookUp,
                            filter: options.data && Array('partnerId', '=', options.data.partnerId),
                          })
                        "
                        value-expr="employeeId"
                        display-expr="korNm"
                      />
                    </DxColumn>

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
                        @value-changed="
                          (e) => {
                            onValueChanged(e, cellInfo)
                          }
                        "
                      />
                    </template>

                    <DxColumn data-field="status" caption="출하의뢰 상태" width="120px" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="statusLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn
                      data-field="completeYn"
                      caption="완료 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="checkBoxEditorCompleteYn"
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
                        :read-only="
                          (delYnMain == 'N' && cellInfo.column.dataField == 'delYn') || (delYnMain == 'N' && cellInfo.column.dataField == 'delYn')
                        "
                      />
                    </template>
                    <template #checkBoxEditorCompleteYn="{ data: cellInfo }">
                      <DxCheckBox
                        :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                        :read-only="cellInfo.data.status == 'STS04' ? false : true"
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
          headerTitle="출하의뢰 품목 리스트"
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
                    id="customerOrderManageDetail"
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
                    <DxColumn data-field="orderId" caption="출하의뢰 ID" width="150px" data-type="string" alignment="center" :visible="false" />

                    <DxColumn data-field="seq" caption="순번" width="90px" data-type="number" alignment="right" :visible="false" />

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
                      data-field="qty"
                      caption="수량"
                      width="100px"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      css-class="devest-grid-header-require"
                    />

                    <DxColumn
                      data-field="deliveryQty"
                      caption="출하 수량"
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
        <COManagePopUpM
          ref="grdM"
          :MPopOpen="MPopOpen"
          :focusedRowData="focusedRowData"
          @AddSelectedRowsData="AddSelectedRowsData"
          @close="MPopOpen = false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import COManagePopUpM from './CustomerOrderManagePopUp/COManagePopUpM.vue'
import DxCheckBox from 'devextreme-vue/check-box'
import DxDateBox from 'devextreme-vue/date-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import DxDropDownBox from 'devextreme-vue/drop-down-box'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getScmCustomerOrderManageMain,
  getScmCustomerOrderManageDetail,
  saveScmCustomerOrderManageMain,
  saveScmCustomerOrderManageDetail,
  deleteScmCustomerOrderManageMain,
  deleteScmCustomerOrderManageDetail,
  getComboPartnerId,
} from '@/api/kier/scm/customerOrderManage'

import { getStdComboPartnerEmployee } from '@/api/kier/standard/partnerEmployeeManage'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'

import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'

export default {
  name: 'CustomerOrderManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    COManagePopUpM,
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxCheckBox,
    DxLookup,
    DxDateBox,
  },
  data() {
    return {
      dxDataGridMainRef: 'customerOrderManageMain',
      dxDataGridDetailRef: 'customerOrderManageDetail',
      gridMain: [],
      gridDetail: [],
      partnerIdList: [],
      reqDtFrom: getPreMonth(2),
      reqDtTo: getPreMonth(-2),
      partnerId: '',
      delYnMain: 'N',
      delYnDetail: 'N',
      partnerIdLookUp: [],
      partnerEmployeeLookUp: [],
      statusLookUp: [],
      prStatusLookUp: [],
      matList: [],
      status: '',
      focusedRowData: null,
      MPopOpen: false,
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
    Promise.all([getComboPartnerId(), getStdComboPartnerEmployee(), getCommonCode('S0010'), getCommonCode('S0011'), getComboStdMatManage()])
      .then((res) => {
        this.partnerIdList = res[0].listResponse.list.slice()
        this.partnerIdList.unshift({ code: '', desc: '전체' })
        this.partnerIdLookUp = res[0].listResponse.list.slice()
        this.partnerEmployeeLookUp = res[1].listResponse.list
        this.statusLookUp = res[2].listResponse.list
        this.prStatusLookUp = res[3].listResponse.list
        this.matList = res[4].listResponse.list
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

    onEditorPreparingMain(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'partnerId':
            e.editorOptions.readOnly = !e.row.data.isCreated
            break
          case 'employeeId':
            e.editorOptions.readOnly = e.row.data.status != 'STS01' || e.row.data.onProgress == 'Y'
            break
          case 'reqDt':
            e.editorOptions.readOnly = e.row.data.status != 'STS01' || e.row.data.onProgress == 'Y'
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
        reqDtFrom: this.reqDtFrom,
        reqDtTo: this.reqDtTo,
        status: this.status,
        delYn: this.delYnMain,
      }

      this.gridInit()
      return getScmCustomerOrderManageMain(params, isProgress).then((res) => {
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

      let patten = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/

      //유효성 체크
      for (var row of selectedMainRows) {
        if (!row.partnerId || !row.employeeId || !row.reqDt) {
          this.vToastify('필수항목 입력하세요.[업체명, 직원, 납기 요청일]', 'warn')
          return
        }
        //  else if (row.status != 'STS01' || row.onProgress == 'Y') {
        //     this.vToastify('의뢰상태가 대기가 아니거나, 품목리스트에 진행상태가 미완료가 아닌 데이터가 있으면 수정할 수 없습니다.', 'warn')
        //     return
        //   }

        if (!patten.test(row.reqDt.substring(0, 10))) {
          this.vToastify('알맞은 납기요청일을 입력해주십시오<bR>예시: [2022-10-31]', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveScmCustomerOrderManageMain(selectedMainRows, true)
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
          this.vToastify('의뢰상태가 대기가 아니거나, 품목리스트에 진행상태가 미완료가 아닌 데이터가 있으면 삭제할 수 없습니다.', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doDeleteAllData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          deleteScmCustomerOrderManageMain(
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
      this.doSearchDetail(e.row.data.orderId).finally(() => {
        this.endLoading()
      })
    },

    onDelYnDetailChange(val) {
      if (this.focusedRowData && !this.focusedRowData.isCreated) {
        this.openLoading('searching')
        this.doSearchDetail(this.focusedRowData.orderId).finally(() => {
          this.endLoading()
        })
      }
    },

    doSearchDetail(orderId) {
      let params = {
        orderId: orderId,
        delYn: this.delYnMain == 'Y' ? 'Y' : this.delYnDetail,
      }

      return getScmCustomerOrderManageDetail(params, false).then((res) => {
        this.gridDetailInit()
        this.gridDetail = res.listResponse.list
        this.gridDetailInstance.option('focusedRowIndex', 0)
      })
    },

    btnAddDetail() {
      if (!this.focusedRowData || this.focusedRowData.isCreated) {
        this.vToastify(this.$t('출하의뢰가 없거나 저장 되지 않았습니다.'), 'warn')
        return
      }

      if (this.focusedRowData.status != 'STS01') {
        this.vToastify(this.$t('진행상태가 대기인 출하의뢰만 가능합니다.'), 'warn')
        return
      }
      this.MPopOpen = true
    },

    AddSelectedRowsData(e) {
      let newRow = {
        id: this.gridDetail.length + 1,
        orderId: this.focusedRowData.orderId,
        mainClass: e[0].mainClass,
        middleClass: e[0].middleClass,
        matCd: e[0].matCd,

        deliveryQty: 0,
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
    },

    async btnSaveDetail() {
      if (this.focusedRowData.status != 'STS01') {
        this.vToastify(this.$t('진행상태가 대기인 출하의뢰만 가능합니다.'), 'warn')
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
          saveScmCustomerOrderManageDetail(selectedDetailRows, true)
            .then((res) => {
              this.doSearchDetail(this.focusedRowData.orderId)
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
      if (this.delYnMain == 'Y' || this.delYnDetail == 'Y') {
        this.vToastify(this.$t('이미 삭제된 데이터입니다.'), 'warn')
        return
      }

      if (this.focusedRowData.status != 'STS01') {
        this.vToastify(this.$t('진행상태가 대기인 출하의뢰만 가능합니다.'), 'warn')
        return
      }

      let selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      for (let del of selectedDetailRows) {
        if (del.deliveryQty >= 1 === true) {
          this.vToastify(this.$t('출하 수량이 있음으로 삭제를 진행할수없습니다.'), 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          deleteScmCustomerOrderManageDetail(
            selectedDetailRows.filter((row) => !row.isCreated),
            true
          )
            .then((res) => {
              this.doSearchDetail(selectedDetailRows[0].orderId)
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