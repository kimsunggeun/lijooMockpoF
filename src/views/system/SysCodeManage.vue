<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top class="d-md-flex" :useBtnList="buttonUseList" @btnSearch="btnSearch()">
          <template v-slot:body>
            <v-layout>
              <v-row no-gutters class="center pa-2 pb-0">
                <v-col cols="12" md="3">
                  <v-select
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="desc"
                    item-value="code"
                    :prepend-inner-icon="$t('$search')"
                    :items="selectType"
                    label="구분"
                    dense
                    outlined
                    v-model="selectedDiv"
                  />
                </v-col>
                <v-col cols="12" md="3" class="py-2 py-md-0">
                  <v-text-field
                    label="공통코드"
                    class="mx-1 rounded-0"
                    dense
                    outlined
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @keydown.enter="btnSearch()"
                    clearable
                    v-model="txtCommonCd"
                  />
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="txtCommonNm"
                    label="공통코드명"
                    class="mx-1 rounded-0"
                    dense
                    outlined
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @keydown.enter="btnSearch()"
                    clearable
                  />
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar />
      </v-col>
      <v-col cols="12" sm="12" lg="6" class="pa-2 pt-0">
        <i-card-vertical
          headerTitle="공통코드 리스트"
          :useBtnList="buttonUseListMain"
          @btnAdd="btnAddMain()"
          @btnSave="btnSaveMain()"
          @btnDelete="btnDeleteMain()"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="commonManageDataMain"
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
                    @focused-row-changed="onFocusedRowChanged"
                    @editor-preparing="onEditorPreparingMain"
                  >
                    <DxSelection :select-all-mode="allMode" show-check-boxes-mode="always" mode="multiple" />

                    <DxColumn
                      data-field="majorCd"
                      caption="공통코드"
                      width="150px"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    />

                    <DxColumn
                      data-field="majorType"
                      caption="구분"
                      data-type="string"
                      width="100px"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    >
                      <DxLookup :data-source="majorTypeList" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn
                      data-field="majorNm"
                      caption="공통코드명"
                      width="150px"
                      data-type="string"
                      alignment="left"
                      css-class="devest-grid-header-require"
                    />

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="12" sm="12" lg="6" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical
          headerTitle="상세코드 리스트"
          :useBtnList="buttonUseListMain"
          @btnAdd="btnAddDetail()"
          @btnSave="btnSaveDetail()"
          @btnDelete="btnDeleteDetail()"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="row pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="commonManageDataDetail"
                    class="layout-col-height00"
                    :ref="dxDataGridDetailRef"
                    :data-source="gridDetail"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :column-auto-width="true"
                    :show-borders="true"
                    :show-row-lines="true"
                    :focused-row-enabled="true"
                    key-expr="id"
                    parent-id-expr="majorCd"
                    :column-hiding-enabled="grid.columnHidingEnabled"
                    @editor-preparing="onEditorPreparingDetail"
                  >
                    <DxSelection :select-all-mode="allMode" show-check-boxes-mode="always" mode="multiple" />

                    <DxColumn data-field="majorCd" data-type="string" :visible="false" />

                    <DxColumn
                      data-field="minorCd"
                      caption="상세코드"
                      width="100px"
                      counter
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    />

                    <DxColumn
                      data-field="minorNm"
                      caption="상세코드명"
                      width="120px"
                      data-type="string"
                      alignment="left"
                      css-class="devest-grid-header-require"
                    />

                    <DxColumn data-field="minorDesc" caption="설명" data-type="string" width="160px" alignment="left" />

                    <DxColumn
                      data-field="ordSeq"
                      caption="순번"
                      data-type="number"
                      width="70px"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    />

                    <DxColumn
                      data-field="useYn"
                      caption="사용 여부"
                      data-type="boolean"
                      width="70px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                    />

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />

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
    </v-row>
  </v-container>
</template>
<script>
import { DxDataGrid, DxColumn, DxSelection, DxLookup, DxRequiredRule } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'

import {
  getComboCommonCodeDetail,
  getListMain,
  getListDetail,
  saveListMain,
  saveListDetail,
  deletelistAll,
  deletelistDetail,
} from '@/api/kier/system/commonCodeManage'
//
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

export default {
  name: 'SysCommonCodeManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxSelection,
    DxCheckBox,
    DxLookup,
  },

  data() {
    return {
      showPageSizeSelector: false,
      pagingSize: 17,
      dxDataGridMainRef: 'commonManageDataMain',
      dxDataGridDetailRef: 'commonManageDataDetail',
      buttonUseList: ['btnSearch'],
      buttonUseListMain: [
        'btnAdd', //신규
        'btnSave', //저장
        'btnDelete', //삭제
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
      majorTypeList: [],
      selectedDiv: '',
      txtCommonCd: '',
      txtCommonNm: '',
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
    Promise.all([getComboCommonCodeDetail('S0004')])
      .then((res) => {
        this.selectType = res[0].listResponse.list.slice()
        this.selectType.unshift({ code: '', desc: '전체' })
        this.majorTypeList = res[0].listResponse.list.slice()
      })
      .catch((error) => {})
  },
  mounted() {},
  methods: {
    onEditorPreparingMain(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        if (e.dataField == 'majorCd') e.editorOptions.readOnly = !e.row.data.isCreated
        e.editorOptions.onValueChanged = (args) => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          defaultValueChangeHandler(args)
        }
      }
    },
    onEditorPreparingDetail(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        if (e.dataField == 'minorCd') e.editorOptions.readOnly = !e.row.data.isCreated
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
        majorType: this.selectedDiv,
        majorCd: this.txtCommonCd,
        majorNm: this.txtCommonNm,
      }
      this.gridInit()
      return getListMain(params, isProgress).then((res) => {
        this.gridMain = res.listResponse.list
        this.gridDetail = []
        if (this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
      })
    },

    btnAddMain() {
      let newRow = {
        id: this.gridMain.length + 1,
        isCreated: true,
      }
      this.gridMainInstance.newRow(newRow)
      this.gridMainInstance.selectRows(newRow.id, true)
      this.gridMainInstance.option('focusedRowIndex', -1)
    },

    btnAddDetail() {
      var focusedRowIndex = this.gridMainInstance.option('focusedRowIndex')
      var focusedRow = focusedRowIndex > -1 ? this.gridMain[focusedRowIndex] : null

      if (!focusedRow || focusedRow.isCreated) {
        this.vToastify(this.$t('저장된 공통코드만 추가 가능합니다.'), 'warn')
        return
      }

      let newRow = {
        id: this.gridDetail.length + 1,
        majorCd: focusedRow.majorCd,
        useYn: 'Y',
        isCreated: true,
      }
      this.gridDetailInstance.newRow(newRow)
      this.gridDetailInstance.selectRows(newRow.id, true)
    },

    async btnSaveMain() {
      this.gridMainInstance.saveEditData()
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      if (selectedMainRows.findIndex((row) => !row.majorCd || !row.majorType || !row.majorNm) > -1) {
        this.vToastify('필수항목 입력하세요.[공통코드, 구분, 공통코드명]', 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveListMain(selectedMainRows, true)
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
      this.gridDetailInstance.saveEditData()
      var selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      if (selectedDetailRows.findIndex((row) => !row.minorCd || !row.minorNm || !row.ordSeq || (!row.ordSeq && row.ord === 0)) > -1) {
        this.vToastify('필수항목 입력하세요.[상세코드, 상세코드명, 순번]', 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          saveListDetail(selectedDetailRows, true)
            .then((res) => {
              this.doSearchDetail(selectedDetailRows[0].majorCd)
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

    async btnDeleteMain() {
      let selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      this.vToastifyPrompt(
        this.$t('doDeleteAllData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          deletelistAll(
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
              if (this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
            })
        },
        null,
        true
      )
    },

    async btnDeleteDetail() {
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
          deletelistDetail(
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

    onFocusedRowChanged(e) {
      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        this.gridDetail = []
        return
      }

      this.openLoading('searching')
      this.doSearchDetail(e.row.data.majorCd).finally(() => {
        this.endLoading()
      })
    },

    doSearchDetail(majorCd) {
      return getListDetail({ majorCd: majorCd }, false).then((res) => {
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
