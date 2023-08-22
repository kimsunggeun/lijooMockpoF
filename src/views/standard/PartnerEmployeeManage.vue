<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="buttonUseList"
          @btnAdd="btnAdd()"
          @btnSearch="btnSearch()"
          @btnSave="btnSave()"
          @btnDelete="btnDelete()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 pb-0">
                <v-col cols="12" md="4" class="py-2 py-md-0">
                  <v-text-field
                    label="성명"
                    class="search-text-field"
                    dense
                    outlined
                    color="primary"
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @keydown.enter="btnSearch()"
                    clearable
                    v-model="txtKorNm"
                  />
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar />
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="파트너사 인원 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="partnerEmployeeManageMain"
                    class="layout-col-height00"
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
                    :column-hiding-enabled="grid.columnHidingEnabled"
                    @editor-preparing="onEditorPreparing"
                    @focused-row-changed="onFocusedRowChanged"
                  >
                    <DxColumn
                      data-field="partnerId"
                      caption="파트너사"
                      width="170px"
                      data-type="string"
                      alignment="left"
                      css-class="devest-grid-header-require"
                    >
                      <DxLookup :data-source="partnerList" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn data-field="employeeId" caption="직원 ID" width="130px" data-type="string" alignment="left" :allow-editing="false" />

                    <DxColumn
                      data-field="korNm"
                      caption="성명"
                      width="120px"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    />
                    <DxColumn
                      data-field="hpNo"
                      caption="전화번호"
                      width="150px"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    />

                    <DxColumn
                      data-field="sexDiv"
                      caption="성별"
                      width="100px"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    >
                      <DxLookup :data-source="sexDivList" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn data-field="engNm" caption="성명(영문)" width="130px" data-type="string" alignment="left" />

                    <DxColumn data-field="title" caption="직책" width="120px" data-type="string" alignment="center">
                      <DxLookup :data-source="titleList" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn data-field="userPs" caption="비밀번호 설정" width="200px" data-type="string" alignment="center" />

                    <DxColumn
                      data-field="useYn"
                      caption="사용 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                    />

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="(value) => onCheckValueChanged(value, cellInfo)" />
                    </template>

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <PartnerEmployeeManageM :rowData="rowData" :MPopOpen="MPopOpen" @close="MPopOpen = false" @change="change" />
    </v-row>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import PartnerEmployeeManageM from './PartnerEmployeeManagePopUp/PartnerEmployeeManageM.vue'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getStdPartnerEmployee,
  saveStdPartnerEmployee,
  deleteStdPartnerEmployee,
  changePwStdPartnerEmployee,
} from '@/api/kier/standard/partnerEmployeeManage'

import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import { getComboAllPartner } from '@/api/kier/standard/partnerManage'

export default {
  name: 'PartnerEmployeeManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxCheckBox,
    PartnerEmployeeManageM,
    DxLookup,
  },
  data() {
    return {
      createPs: '',
      rowData: [],
      rowIndex: '',
      dxDataGridMainRef: 'partnerEmployeeManageMain',
      buttonUseList: [
        'btnSearch', //조회
        'btnAdd', //신규
        'btnSave', //저장
        'btnDelete', //삭제
      ],
      gridMain: [],
      txtKorNm: '',
      titleList: [],
      sexDivList: [],
      partnerList: [],
      phonePattern: /^\d{3}-(\d{4}||\d{3})-\d{4}$/i,
      MPopOpen: false,
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    },
  },

  beforeMount() {
    Promise.all([getCommonCode('S0004'), getCommonCode('S0005'), getComboAllPartner()])
      .then((res) => {
        this.titleList = res[0].listResponse.list.slice()
        this.sexDivList = res[1].listResponse.list.slice()
        this.partnerList = res[2].listResponse.list.slice()
      })
      .catch((error) => {})
  },

  methods: {
    onFocusedRowChanged() {
      this.ApigetComboAllPartner()
    },

    ApigetComboAllPartner() {
      getComboAllPartner().then((res) => {
        this.partnerList = res.listResponse.list.slice()
      })
    },
    change(e) {
      this.gridMainInstance.cellValue(this.rowIndex, 'userPs', e)
      this.MPopOpen = false
    },
    onEditorPreparing(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        if (e.dataField == 'partnerId' || e.dataField == 'employeeId') {
          e.editorOptions.readOnly = !e.row.data.isCreated
        }
        if (e.dataField == 'userPs') {
          e.editorOptions.readOnly = e.row.data.isCreated
          if (e.row.data.isCreated != true) {
            this.rowData = e.row.data
            this.rowIndex = e.row.rowIndex
            this.MPopOpen = true
          }
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

    btnAdd() {
      let newRow = {
        id: this.gridMain.length + 1,
        useYn: 'Y',
        isCreated: true,
        userPs: '생성 후 비밀번호를 입력해주세요',
      }
      this.gridMainInstance.newRow(newRow)
      this.gridMainInstance.refresh().then(() => {
        this.gridMainInstance.selectRows(newRow.id, true)
        this.gridMainInstance.option('focusedRowIndex', 0)
      })
    },

    btnSearch() {
      this.openLoading('searching')
      this.doSearchMain(true).finally(() => {
        this.endLoading()
      })
    },

    doSearchMain(isProgress) {
      let params = {
        korNm: this.txtKorNm,
      }

      this.gridInit()
      return getStdPartnerEmployee(params, isProgress).then((res) => {
        this.gridMain = res.listResponse.list
        if (this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
      })
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
        if (!row.partnerId || !row.korNm || !row.sexDiv || !row.hpNo) {
          this.vToastify('필수항목 입력하세요.[파트너사, 성명, 성별 ,휴대폰 번호]', 'warn')
          return
        }
        if (row.hpNo && row.hpNo.match(this.phonePattern) == null) {
          this.vToastify('올바르지 않은 전화번호 형식입니다. 예) 000-000-0000 or 000-0000-0000', 'warn')
          return
        }
      }

      //중복값 체크
      var keySet = new Set(this.gridMain.map((row) => row.partnerId + ',' + row.employeeId))
      if (keySet.size < this.gridMain.length) {
        this.vToastify('중복되는 직원 코드가 있습니다.', 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveStdPartnerEmployee(selectedMainRows, true)
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

    async btnDelete() {
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          deleteStdPartnerEmployee(
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

    gridInit() {
      this.gridMainInstance.clearSelection()
      this.gridMainInstance.cancelEditData()
      this.gridMainInstance.option('focusedRowIndex', -1)
    },
  },
}
</script>