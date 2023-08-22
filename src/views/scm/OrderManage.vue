<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
            'btnSave', //저장
          ]"
          @btnSearch="btnSearch()"
          @btnSave="btnSave()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 pb-0">
                <v-col cols="12" md="2">
                  <v-text-field
                    v-model="poNo"
                    label="발주 번호"
                    class="mx-1 rounded-0"
                    dense
                    outlined
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @keydown.enter="btnSearch()"
                    clearable
                  />
                </v-col>
                <span class="px-1 pt-1">{{ '납기 요청일:' }}</span>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="reqDtFrom"
                    :max="reqDtTo"
                    height="30px"
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
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="reqDtTo"
                    :min="reqDtFrom"
                    height="30px"
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
                    label="부품업체명"
                    dense
                    :disabled="LoginCd"
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
        <i-card-vertical headerTitle="발주 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="orderManageMain"
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

                    <DxColumn data-field="partnerId" caption="부품업체명" width="220px" data-type="string" alignment="left" :allow-editing="false">
                      <DxLookup :data-source="partnerIdLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn data-field="hrId" caption="창고 담당자" width="150px" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup :data-source="hrIdLookUp" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn
                      data-field="hpNo"
                      caption="창고 담당자 전화번호"
                      width="150px"
                      data-type="string"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <DxColumn
                      data-field="reqDt"
                      caption="납기 요청일"
                      width="120px"
                      data-type="date"
                      format="yyyy-MM-dd"
                      alignment="center"
                      :allow-editing="false"
                    />

                    <DxColumn data-field="status" caption="진행 상태" width="120px" data-type="string" alignment="center">
                      <DxLookup :data-source="odStatusLookUp" value-expr="code" display-expr="desc" />
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

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" :allow-editing="false" />

                    <DxColumn
                      data-field="useYn"
                      caption="사용 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                      :allow-editing="false"
                    />

                    <DxColumn
                      data-field="delYn"
                      caption="삭제 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                      :allow-editing="false"
                    />

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox
                        :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)"
                        :read-only="
                          cellInfo.data.status != 'STS01' ||
                          cellInfo.data.orgCompleteYn == 'Y' ||
                          (delYn == 'N' && cellInfo.column.dataField == 'delYn')
                        "
                      />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical headerTitle="발주 품목 리스트">
          <template v-slot:switch>
            <v-switch v-model="delYnDetail" true-value="Y" false-value="N" :label="`삭제 데이터 조회`" @change="onDelYnDetailChange" />
          </template>
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="orderManageDetail"
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
                    :selection="{ mode: 'none' }"
                    :editing="{ allowUpdating: false }"
                    @editor-preparing="onEditorPreparingDetail"
                  >
                    <DxColumn data-field="poNo" caption="발주 번호" width="150px" data-type="string" alignment="center" :visible="false" />

                    <DxColumn data-field="poSeq" caption="순번" width="70px" data-type="number" alignment="center" :allow-editing="false" />

                    <DxColumn data-field="mainClass" caption="품목 대분류" width="120px" data-type="string" alignment="left" />

                    <DxColumn data-field="middleClass" caption="품목 중분류" width="250px" data-type="string" alignment="left" />

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
                    />

                    <DxColumn data-field="qty" caption="수량" width="100px" data-type="number" format="#,##0" alignment="right" />

                    <DxColumn data-field="arrivalQty" caption="입고 수량" width="100px" data-type="number" format="#,##0" alignment="right" />

                    <DxColumn data-field="status" caption="진행 상태" width="120px" data-type="string" alignment="center">
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
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :read-only="true" />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
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
  getScmOrderManageMain,
  saveScmOrderManageMain,
  deleteScmOrderManageMain,
  getScmOrderManageDetail,
  saveScmOrderManageDetail,
  deleteScmOrderManageDetail,
} from '@/api/kier/scm/orderManage'

import { getComboPartnerId } from '@/api/kier/scm/purchasingOrderInfo'
import { getComboHrManage } from '@/api/kier/standard/hRManage'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'

import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'

export default {
  name: 'OrderManage',
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
  },
  data() {
    return {
      dxDataGridMainRef: 'orderManageMain',
      dxDataGridDetailRef: 'orderManageDetail',
      gridMain: [],
      gridDetail: [],
      partnerIdList: [],
      poNo: '',
      reqDtFrom: getPreMonth(2),
      reqDtTo: getPreMonth(-2),
      partnerId: '',
      delYn: 'N',
      delYnDetail: 'N',
      partnerIdLookUp: [],
      hrIdLookUp: [],
      odStatusLookUp: [],
      prStatusLookUp: [],
      matList: [],
      focusedRowData: null,
      LoginCd: false,
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
    Promise.all([getComboPartnerId(), getComboHrManage(), getCommonCode('S0010'), getCommonCode('S0011'), getComboStdMatManage()])
      .then((res) => {
        this.partnerIdList = res[0].listResponse.list.slice()
        this.partnerIdList.unshift({ code: '', desc: '전체' })
        this.partnerIdLookUp = res[0].listResponse.list.slice()
        this.hrIdLookUp = res[1].listResponse.list
        this.odStatusLookUp = res[2].listResponse.list

        this.prStatusLookUp = res[3].listResponse.list
        this.matList = res[4].listResponse.list
      })
      .catch((error) => {})

    this.loginCd()
  },
  methods: {
    loginCd() {
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

    onEditorPreparingMain(e) {
      const defaultValueChangeHandler = e.editorOptions.onValueChanged
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        switch (e.dataField) {
          case 'status':
            e.editorOptions.readOnly = e.row.data.completeYn == 'Y' || e.row.data.status == 'STS03' /*진행*/
            break
          default:
            break
        }
        e.editorOptions.onValueChanged = (args) => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          defaultValueChangeHandler(args)
        }
      }

      if (e.parentType === 'dataRow' && e.dataField === 'status') {
        this.odStatusLookUp.find((el) => el.code == 'STS03').disabled = true //진행
        this.odStatusLookUp.find((el) => el.code == 'STS04').disabled = true //완료
      }

      if (e.parentType === 'filterRow' && e.dataField === 'status') {
        this.odStatusLookUp.find((el) => el.code == 'STS03').disabled = false //진행
        this.odStatusLookUp.find((el) => el.code == 'STS04').disabled = false //완료
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
          // case '':
          //   e.editorOptions.readOnly = e.row.data.status != ''
          //   break;
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
        poNo: this.poNo,
        reqDtFrom: this.reqDtFrom,
        reqDtTo: this.reqDtTo,
        partnerId: this.partnerId,
        delYn: this.delYn,
      }

      this.gridInit()
      return getScmOrderManageMain(params, isProgress).then((res) => {
        this.gridMain = res.listResponse.list
        if (this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
      })
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

    doSearchDetail(poNo) {
      let params = {
        poNo: poNo,
        delYn: this.delYnDetail,
      }

      return getScmOrderManageDetail(params, false).then((res) => {
        this.gridDetailInit()
        this.gridDetail = res.listResponse.list
        this.gridDetailInstance.option('focusedRowIndex', 0)
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

    async btnSave() {
      this.gridMainInstance.saveEditData()
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      //유효성 체크
      for (var row of selectedMainRows) {
        if (!row.status) {
          this.vToastify('필수항목 입력하세요.[진행 상태]', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveScmOrderManageMain(selectedMainRows, true)
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
