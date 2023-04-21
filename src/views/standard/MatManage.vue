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
                <v-col cols="12" md="3" class="py-2 py-md-0">
                  <v-text-field
                    label="품목명"
                    class="search-text-field"
                    dense
                    outlined
                    color="primary"
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @keydown.enter="btnSearch()"
                    clearable
                    v-model="txtMatNm"
                  />
                </v-col>
                <span style="width: 164px;" class="pa-2 py-md-0">
                  <v-switch
                    v-model="toggleDelYn"
                    @click="btnSearch()"
                    true-value="Y"
                    false-value="N"
                    :label="`삭제 데이터 조회`"
                  />
                </span>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="품목 관리">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="matManageMain"
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
                  >

                    <DxColumn
                      data-field="mainClass"
                      caption="대분류"
                      width="150px"
                      data-type="string"
                      alignment="left"
                      css-class="devest-grid-header-require"
                      :set-cell-value="(newData, value) => {
                        newData.mainClass = value
                        newData.middleClass = null
                      }"
                    >
                      <DxLookup :data-source="mainClassList" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn data-field="middleClass" caption="중분류" width="300px" data-type="string" alignment="left" css-class="devest-grid-header-require">
                      <DxLookup
                        :data-source="getFilteredMiddleClass"
                        value-expr="desc"
                        display-expr="desc"
                      />
                    </DxColumn>

                    <DxColumn data-field="matCd" caption="품목 코드" width="100px" data-type="string" alignment="center" :allow-editing="false"/>

                    <DxColumn data-field="matNm" caption="품목명" width="350px" data-type="string" alignment="left" css-class="devest-grid-header-require"/>

                    <DxColumn data-field="basicUnit" caption="단위" width="120px" data-type="string" alignment="center">
                      <DxLookup :data-source="basicUnitList" value-expr="code" display-expr="desc" />
                    </DxColumn>

                    <DxColumn data-field="price" caption="단가" width="130px" data-type="number" format="#,##0" alignment="right"/>

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />

                    <DxColumn data-field="useYn" caption="사용 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor"/>

                    <DxColumn data-field="delYn" caption="삭제 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor"/>

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>

                    
                   <DxPaging :enabled="true" :page-size="20"/>
                   <DxPager
                      :visible="true"
                      :allowed-page-sizes="pageSizes"
                      :show-page-size-selector="showPageSizeSelector"
                      :show-info="showInfo"
                      :show-navigation-buttons="showNavButtons"
                    />         

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
import { DxDataGrid, DxColumn, DxLookup,DxPager,DxPaging } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getStdMatManage,
  saveStdMatManage,
  deleteStdMatManage
} from '@/api/kier/standard/matManage'

import { getComboMatGroup, getComboMatGroupMiddle } from '@/api/kier/standard/matGroupManage'

import { getCommonCode } from '@/api/kier/standard/commonCodeManage'

export default {
  name: 'MatManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxCheckBox,
    DxLookup,
    DxPager,
    DxPaging
  },
  data() {
    return {
      pageSizes: [20, 'all'],
      showPageSizeSelector: true,
      showInfo: true,
      showNavButtons: true,


      dxDataGridMainRef: 'matManageMain',
      buttonUseList: [
        'btnSearch', //조회
        'btnAdd', //신규
        'btnSave', //저장
        'btnDelete' //삭제
      ],
      gridMain: [],
      txtMatNm: '',
      toggleDelYn: 'N',
      basicUnitList: [],
      mainClassList: [],
      middleClassList: [],
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    }
  },
  beforeMount() {
    Promise.all([
      getCommonCode('S0006'),
      getComboMatGroup(),
      getComboMatGroupMiddle()
    ])
      .then( res => {
        this.basicUnitList = res[0].listResponse.list.slice()
        this.mainClassList = res[1].listResponse.list.slice()
        this.middleClassList = res[2].listResponse.list.slice()
      })
      .catch(error => {})
  },
  methods: {
    onEditorPreparing(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'mainClass':
            e.editorOptions.readOnly = !e.row.data.isCreated
            break;
          case 'middleClass':
            e.editorOptions.readOnly = !e.row.data.isCreated
            e.editorOptions.disabled = !e.row.data.mainClass
            break;
          default:
            break;
        }
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          if (e.dataField == 'mainClass') this.gridMainInstance.refresh()
          defaultValueChangeHandler(args)
        }
      }
      if (e.parentType === 'filterRow' && e.dataType === 'boolean') {
        e.editorOptions.valueExpr = 'filterValue'
        e.editorOptions.displayExpr = 'filterText'
        e.editorOptions.dataSource = [
          { filterValue: null, filterText: '(All)' },
          { filterValue: 'Y', filterText: 'O' },
          { filterValue: 'N', filterText: 'X' }
        ]
      }
    },
    getFilteredMiddleClass(options) {
      return {
        store: this.middleClassList,
        filter: options.data && ['code', '=', options.data.mainClass]
      }
    },

    btnAdd() {
      let newRow = {
        id: this.gridMain.length + 1,
        useYn: 'Y',
        delYn: 'N',
        isCreated: true
      }
      this.gridMainInstance.newRow(newRow)
      this.gridMainInstance.refresh().then(() => {
        this.gridMainInstance.selectRows(newRow.id, true)
        this.gridMainInstance.option('focusedRowIndex', 0)
      })
    },

    btnSearch() {
      this.openLoading('searching')
      this.doSearchMain(true)
        .finally(() => {
          this.endLoading()
        })
    },

    doSearchMain(isProgress) {
      let params = {
        matNm: this.txtMatNm,
        delYn: this.toggleDelYn
      }

      this.gridInit()
      return getStdMatManage(params, isProgress)
        .then(res => {
          this.gridMain = res.listResponse.list
          if(this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
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
        if (!row.mainClass || !row.middleClass || !row.matNm) {
          this.vToastify('필수항목 입력하세요.[대분류, 중분류, 품목명]', 'warn')
          return
        }
      }
      
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveStdMatManage(selectedMainRows, true)
            .then(res => {
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
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          deleteStdMatManage(selectedMainRows.filter(row => !row.isCreated), true)
            .then(res => {
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
    }
  }
}
</script>