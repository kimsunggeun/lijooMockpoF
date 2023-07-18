<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-0 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearch()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 pb-0">
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="invoiceId"
                    label="거래명세서 ID"
                    class="mx-1 rounded-0"
                    dense
                    outlined
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @keydown.enter="btnSearch()"
                    clearable
                  />
                </v-col>
                <span class="px-1 pt-1">{{ '도착 예정일:' }}</span>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="etaFrom"
                    :max="etaTo"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="
                      (e) => {
                        etaFrom = e.value && getDateFormat(e.value)
                      }
                    "
                  />
                </v-col>
                <span class="px-1 pt-1">~</span>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="etaTo"
                    :min="etaFrom"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="
                      (e) => {
                        etaTo = e.value && getDateFormat(e.value)
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
                  <v-switch v-model="delYn" true-value="Y" false-value="N" :label="`삭제 데이터 조회`" @change="btnSearch()" />
                </span>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar />
      </v-col>

      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical headerTitle="거래명세서 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="palletInManageMain"
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
                    :selection="{ mode: 'none' }"
                    :editing="{ allowUpdating: false }"
                    @focused-row-changed="onFocusedRowChanged"
                    @editor-preparing="onEditorPreparingMain"
                  >
                    <DxColumn data-field="invoiceId" caption="거래명세서 ID" width="150px" data-type="string" alignment="center" />

                    <DxColumn data-field="writeDt" caption="작성일" width="120px" data-type="date" alignment="center" format="yyyy-MM-dd" />

                    <DxColumn data-field="partnerId" caption="파트너" width="220px" data-type="string" alignment="left">
                      <DxLookup :data-source="partnerIdLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn data-field="employeeId" caption="직원" width="150px" data-type="string" alignment="center">
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

                    <DxColumn data-field="eta" caption="도착 예정일" width="120px" data-type="date" format="yyyy-MM-dd" alignment="center" />

                    <DxColumn data-field="ata" caption="도착 실제일" width="120px" data-type="date" format="yyyy-MM-dd" alignment="center" />

                    <DxColumn data-field="status" caption="진행 상태" width="120px" data-type="string" alignment="center">
                      <DxLookup :data-source="statusLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn
                      data-field="completeYn"
                      caption="완료 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                    />

                    <DxColumn data-field="hrId" caption="입하 담당자" width="150px" data-type="string" alignment="center">
                      <DxLookup :data-source="hrIdLookUp" value-expr="code" display-expr="desc" />
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
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :read-only="true" />
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
          headerTitle="거래명세서 품목 리스트"
          :useBtnList="[
            'btnAdd',
            'btnPrint', //출력
            'btnSave', //저장
            'btnDelete', //삭제
          ]"
          @btnAdd="btnAdd()"
          @btnPrint="btnPrint()"
          @btnSave="btnSave()"
          @btnDelete="btnDelete()"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="palletInManageDetail"
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
                    <DxColumn data-field="invoiceId" caption="거래명세서 ID" width="150px" data-type="string" alignment="center" :visible="false" />

                    <DxColumn data-field="seq" caption="순번" width="90px" data-type="number" alignment="right" :visible="false" />

                    <DxColumn data-field="poNo" caption="발주 번호" width="150px" data-type="string" alignment="center" :allow-editing="false" />

                    <DxColumn data-field="poSeq" caption="순번" width="80px" data-type="number" alignment="center" :allow-editing="false" />

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
                      :allow-editing="false"
                      :calculate-display-value="
                        (e) => {
                          let item = e.matCd && matList.find((el) => el.matCd == e.matCd)
                          return item && item.matNm
                        }
                      "
                      :calculate-filter-expression="lookupColumnFilterExpression"
                    />

                    <DxColumn
                      data-field="reqQty"
                      caption="요청 수량"
                      width="70px"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />

                    <DxColumn
                      data-field="qty"
                      caption="공급 수량"
                      width="70px"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />

                    <DxColumn
                      data-field="price"
                      caption="공급가액"
                      width="90px"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />

                    <DxColumn
                      data-field="inQty"
                      caption="실입고 수량"
                      width="80px"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />

                    <DxColumn
                      data-field="stockQty"
                      caption="물류창고 입고 수량"
                      width="120px"
                      data-type="number"
                      format="#,##0"
                      alignment="right"
                      :allow-editing="false"
                    />

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />

                    <DxColumn data-field="matDiv" caption="입고 위치" width="80px" alignment="center" css-class="devest-grid-header-require">
                      <DxLookup :data-source="matDivLookUp" display-expr="desc" value-expr="code" />
                    </DxColumn>

                    <DxColumn
                      data-field="barcodeNo"
                      caption="바코드 번호"
                      data-type="string"
                      width="180px"
                      alignment="center"
                      :allow-editing="false"
                    />
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <PalletInManageM :MPopOpen="MPopOpen" :focusedRowData="PopUpData" @AddSelectedRowsData="AddSelectedRowsData" @close="MPopOpen = false" />
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

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getWmsPalletInManageMain,
  getWmsPalletInManageDetail,
  saveWmsPalletInManageDetail,
  deleteWmsPalletInManageDetail,
  getMaxMatClosed,
} from '@/api/kier/wms/palletInManage'

import { getComboPartner } from '@/api/kier/standard/partnerManage'
import { getStdComboPartnerEmployee } from '@/api/kier/standard/partnerEmployeeManage'
import { getComboHrManage } from '@/api/kier/standard/hRManage'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'
import PalletInManageM from './PalletInManageUp/PalletInManageM.vue'
import { getDateFormat, getPreDay } from '@/utils/common.js'

import { JSPrintManager, WSStatus, ClientScanJob, ScannerImageFormatOutput } from 'jsprintmanager'
import * as JSPM from 'jsprintmanager'

export default {
  name: 'PalletInManage',
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
    PalletInManageM,
  },
  data() {
    return {
      dxDataGridMainRef: 'palletInManageMain',
      dxDataGridDetailRef: 'palletInManageDetail',
      gridMain: [],
      gridDetail: [],
      partnerIdList: [],
      etaFrom: getPreDay(7),
      etaTo: getPreDay(-7),
      invoiceId: '',
      partnerId: '',
      delYn: 'N',
      useYn: 'Y',
      partnerIdLookUp: [],
      partnerEmployeeLookUp: [],
      hrIdLookUp: [],
      statusLookUp: [],
      prStatusLookUp: [],
      matList: [],
      matDivLookUp: [],
      focusedRowData: null,
      MPopOpen: false,
      PopUpData: [],
      lastMonth: '',

      focusata: '',
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
    let params = {}

    Promise.all([
      getComboPartner(),
      getStdComboPartnerEmployee(),
      getCommonCode('S0010'),
      getCommonCode('S0011'),
      getComboHrManage(),
      getComboStdMatManage(),
      getCommonCode('S0016'),
      getMaxMatClosed(params),
    ])
      .then((res) => {
        this.partnerIdList = res[0].listResponse.list.slice()
        this.partnerIdList.unshift({ code: '', desc: '전체' })
        this.partnerIdLookUp = res[0].listResponse.list.slice()
        this.partnerEmployeeLookUp = res[1].listResponse.list
        this.statusLookUp = res[2].listResponse.list
        this.prStatusLookUp = res[3].listResponse.list
        this.hrIdLookUp = res[4].listResponse.list
        this.matList = res[5].listResponse.list
        this.matDivLookUp = res[6].listResponse.list
        this.lastMonth = res[7].listResponse.list
      })
      .catch((error) => {})
  },
  methods: {
    btnAdd() {
      if (!this.focusedRowData) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      } else {
        this.MPopOpen = true
      }
    },
    AddSelectedRowsData(e) {
      for (let filterlow of this.gridDetail) {
        if (filterlow.id == e[0].id) {
          return this.vToastify(this.$t('이미 추가된 품목 입니다.'), 'warn')
        }
      }

      let newRow = {
        id: e[0].id,
        invoiceId: e[0].invoiceId,
        seq: e[0].seq,
        poNo: e[0].poNo,
        poSeq: e[0].poSeq,
        mainClass: e[0].mainClass,
        middleClass: e[0].middleClass,
        matCd: e[0].matCd,
        reqQty: e[0].reqQty,
        qty: e[0].qty,
        price: e[0].price,
        inQty: e[0].inQty,
        stockQty: e[0].stockQty,
        remark: e[0].remark,
        matDiv: e[0].matDiv,
        barcodeNo: e[0].barcodeNo,
      }
      this.gridDetailInstance.refresh()
      this.gridDetailInstance.newRow(newRow)
      this.gridDetailInstance.selectRows(newRow.id, true)
    },
    getDateFormat(date) {
      return getDateFormat(date)
    },

    onEditorPreparingMain(e) {
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
          case 'matDiv':
            e.editorOptions.readOnly = !!e.row.data.delYn
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

    btnSearch() {
      this.openLoading('searching')
      this.doSearchMain(true).finally(() => {
        this.endLoading()
      })
    },

    doSearchMain(isProgress) {
      let params = {
        invoiceId: this.invoiceId,
        partnerId: this.partnerId,
        etaFrom: this.etaFrom,
        etaTo: this.etaTo,
        delYn: this.delYn,
      }

      this.gridInit()
      return getWmsPalletInManageMain(params, isProgress).then((res) => {
        this.gridMain = res.listResponse.list
        if (this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
      })
    },

    onFocusedRowChanged(e) {
      this.MPopOpen = false
      this.focusedRowData = e.row && e.row.data

      this.focusata = e.row.data.ata
      this.gridDetail = []
      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        this.gridDetail = []
        return
      }

      this.openLoading('searching')
      this.doSearchDetail(e.row.data.invoiceId).finally(() => {
        this.endLoading()
      })
    },

    async btnSave() {
      this.gridDetailInstance.saveEditData()
      var selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()

      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      if (this.lastMonth[0] != null) {
        if (this.focusata != null && Number(this.focusata.substring(0, 7).replace(/-/g, '')) <= Number(this.lastMonth[0].monthDt)) {
          this.vToastify(
            this.$t(`저장할 수 없습니다.<BR>
          도착 실제일이 마지막 마감월인 ${this.lastMonth[0].monthDt
            .replace(/^(\d{0,4})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
            .replace(/-{1,2}$/g, '')} 월 이거나 전월입니다.
          `),
            'warn'
          )
          return
        }
      }

      //유효성 체크
      for (var row of selectedDetailRows) {
        if (row.delYn == 'Y') {
          this.vToastify('삭제된 데이터는 수정할 수 없습니다.', 'warn')
          return
        }

        if (row.stockQty) {
          this.vToastify('이미 저장된 데이터 입니다.', 'warn')
          return
        }

        if (!row.matDiv) {
          this.vToastify('필수항목 입력하세요.[입고 위치]', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          saveWmsPalletInManageDetail(selectedDetailRows, true)
            .then((res) => {
              this.doSearchDetail(this.focusedRowData.invoiceId)
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

    async btnDelete() {
      var selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      if (this.lastMonth[0] != null) {
        if (Number(this.focusata.substring(0, 7).replace(/-/g, '')) <= Number(this.lastMonth[0].monthDt)) {
          this.vToastify(
            this.$t(`삭제할 수 없습니다.<BR>
          도착 실제일이 마지막 마감월인 ${this.lastMonth[0].monthDt
            .replace(/^(\d{0,4})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
            .replace(/-{1,2}$/g, '')} 월 이거나 전월입니다.
         `),
            'warn'
          )
          return
        }
      }

      //유효성 체크
      for (var row of selectedDetailRows) {
        if (!row.stockQty) {
          this.vToastify('저장되지 않은 데이터 입니다.', 'warn')
          return
        }
        if (row.delYn == 'Y') {
          this.vToastify('이미 삭제된 데이터 입니다.', 'warn')
          return
        }
        if (row.hasNoItem == 'Y') {
          this.vToastify('해당 품목이 입하장에 없습니다.', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          deleteWmsPalletInManageDetail(
            selectedDetailRows.filter((row) => !row.isCreated),
            true
          )
            .then((res) => {
              this.doSearchDetail(this.focusedRowData.invoiceId)
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

    async btnPrint() {
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

            //RACK 구분
            let matDivPrint = row.matDiv.substring(0, 1)

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

          ^FX BarCode RACK
          ^FT70,145^A0I,40,40^FB800,1,0,L^FH\
          ^FD` +
              matDivPrint +
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

    doSearchDetail(invoiceId) {
      let params = {
        invoiceId: invoiceId,
        delYn: this.delYn,
        useYn: this.useYn,
      }

      return getWmsPalletInManageDetail(params, false).then((res) => {
        this.gridDetailInit()
        this.PopUpData = res.listResponse.list
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