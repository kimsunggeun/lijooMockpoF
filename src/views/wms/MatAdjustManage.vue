<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12">
        <i-card-top class="d-flex">
          <template v-slot:body>
            <v-row dense align="center" class="py-1">
              <v-col cols="3">
                <v-text-field
                  class="rounded-0"
                  v-model="palletId"
                  label="Pallet ID"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @keydown.enter="btnSearch()"
                  clearable
                />
              </v-col>
              <v-col cols="3">
                <v-select
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="rounded-0"
                  item-text="rowNm"
                  item-value="rackRow"
                  :prepend-inner-icon="$t('$search')"
                  :items="[
                    { rackRow: '', rowNm: '전체' },
                    { rackRow: '01', rowNm: '1행' },
                    { rackRow: '02', rowNm: '2행' },
                    { rackRow: '03', rowNm: '3행' },
                  ]"
                  label="Rack 행"
                  dense
                  outlined
                  v-model="rackRow"
                >
                </v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="rounded-0"
                  item-text="matNm"
                  item-value="matCd"
                  :prepend-inner-icon="$t('$search')"
                  :items="matList"
                  label="품목"
                  dense
                  outlined
                  v-model="matCd"
                >
                </v-select>
              </v-col>
              <v-spacer />
              <v-col cols="auto">
                <v-btn class="rounded-0 ml-1 pr-7 pl-1" outlined color="btn_bg" height="30px" fontWeight="bold" @click="btnSearch()">
                  <v-icon class="float-left" color="#000">${{ 'search' }}</v-icon>
                  <div class="float-center mx-1" :style="btnTextStyle">조회</div>
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn class="rounded-0 ml-1 pr-7 pl-1" outlined color="btn_bg" height="30px" fontWeight="bold" @click="btnAdd()">
                  <v-icon class="float-left" color="#000">${{ 'plus' }}</v-icon>
                  <div class="float-center mx-1" :style="btnTextStyle">추가</div>
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn class="rounded-0 ml-1 pr-7 pl-1" outlined color="btn_bg" height="30px" fontWeight="bold" @click="btnSave()">
                  <v-icon class="float-left" color="#000">${{ 'save' }}</v-icon>
                  <div class="float-center mx-1" :style="btnTextStyle">저장</div>
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
        <i-system-bar />
      </v-col>
      <v-col cols="12" class="pa-2">
        <i-card-vertical headerTitle="재고 조정 정보 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" lg="12" class="pa-0">
                <DxDataGrid
                  id="matAdjustManageMain"
                  class="layout-col-height0-body"
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
                  @focused-row-changed="
                    (e) => {
                      focusedRowData = e.row && e.row.data
                      focusedRowType = e.row && e.row.rowType
                    }
                  "
                  @editor-preparing="onEditorPreparing"
                >
                  <DxColumn
                    data-field="palletId"
                    caption="Pallet ID"
                    width="140px"
                    data-type="string"
                    alignment="center"
                    :group-index="0"
                    :show-when-grouped="true"
                  />

                  <DxColumn data-field="palletIdOri" caption="palletIdOri" data-type="string" alignment="left" :visible="false" />

                  <DxColumn data-field="mainClass" caption="품목 대분류" width="120px" data-type="string" alignment="left" :allow-editing="false" />

                  <DxColumn data-field="middleClass" caption="품목 중분류" width="250px" data-type="string" alignment="left" :allow-editing="false" />

                  <DxColumn
                    data-field="matCd"
                    caption="품목명"
                    width="350px"
                    data-type="string"
                    alignment="left"
                    edit-cell-template="hrSelector"
                    :calculate-filter-expression="lookupColumnFilterExpression"
                    :calculate-display-value="
                      (e) => {
                        let item = e.matCd && matCdLookup.find((el) => el.matCd == e.matCd)
                        return item && item.matNm
                      }
                    "
                    css-class="devest-grid-header-require"
                  />
                  <template #hrSelector="{ data: cellInfo }">
                    <DxDropDownBox
                      :ref="`dropDownBoxRef${cellInfo.key}`"
                      :value="cellInfo.value"
                      :drop-down-options="{ width: 700 }"
                      :defer-rendering="false"
                      :data-source="matCdLookup"
                      :read-only="!cellInfo.data.isCreated"
                      display-expr="matNm"
                      value-expr="matCd"
                    >
                      <DxDataGrid
                        :selected-row-keys="cellInfo.value ? [cellInfo.data.mainClass + cellInfo.data.middleClass + cellInfo.data.matCd] : []"
                        :data-source="matCdLookup"
                        :height="300"
                        :hover-state-enabled="true"
                        :editing="{ allowUpdating: false }"
                        :selection="{ mode: 'single', deferred: false }"
                        :filter-row="{ visible: true }"
                        :column-hiding-enabled="false"
                        key-expr="id"
                        @selection-changed="(e) => onSelectionChanged(e, cellInfo)"
                        :on-initialized="() => null"
                        :on-content-ready="() => null"
                        @initialized="onDropdownEditGridInitialized"
                        class="sec_grid"
                      >
                        <DxColumn data-field="mainClass" caption="품목 대분류" width="120px" alignment="left" />
                        <DxColumn data-field="middleClass" caption="품목 중분류" width="200px" alignment="left" />
                        <DxColumn data-field="matNm" caption="품목" alignment="left" />
                      </DxDataGrid>
                    </DxDropDownBox>
                  </template>

                  <DxColumn
                    data-field="barcodeNo"
                    caption="바코드 번호"
                    data-type="string"
                    width="180px"
                    alignment="center"
                    css-class="devest-grid-header-require"
                  />

                  <DxColumn data-field="locationId" caption="위치" data-type="string" width="120px" alignment="center">
                    <DxLookup :data-source="locationIdLookUp" display-expr="locationDesc" value-expr="locationId" />
                  </DxColumn>

                  <DxColumn
                    data-field="qty"
                    caption="재고 수량"
                    width="70px"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    css-class="devest-grid-header-require"
                  />

                  <DxColumn
                    data-field="inWork"
                    caption="입고 수량"
                    width="70px"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
                  />

                  <DxColumn
                    data-field="outQty"
                    caption="출고 수량"
                    width="70px"
                    data-type="number"
                    format="#,##0"
                    alignment="right"
                    :allow-editing="false"
                  />

                  <DxColumn data-field="matDiv" caption="재고 구분" width="100px" alignment="center" :allow-editing="false">
                    <DxLookup :data-source="matDivLookUp" display-expr="desc" value-expr="code" />
                  </DxColumn>

                  <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <MatAdjustManageM
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
import { DxDataGrid, DxColumn, DxLookup, DxPaging, DxPager } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import DxDropDownBox from 'devextreme-vue/drop-down-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import MatAdjustManageM from './MatAdjustManagePopUp/MatAdjustManageM.vue'
import { getWmsMatAdjustManage, saveWmsMatAdjustManage, getLocationDescMatCdWmsMatAdjustManage } from '@/api/kier/wms/matAdjustManage'

import { getComboStdMatManage } from '@/api/kier/standard/matManage'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'

export default {
  name: 'MaterialInfo',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    MatAdjustManageM,
    DxLookup,
    DxDropDownBox,
  },
  data() {
    return {
      dxDataGridMainRef: 'matAdjustManageMain',
      gridMain: [],
      MPopOpen: false,
      palletId: '',
      rackRow: '',
      matList: [],
      matCd: '',
      matCdLookup: [],
      btnTextStyle: { color: '#000', 'font-size': '15px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
      locationIdLookUp: [],
      matDivLookUp: [],
      focusedRowData: null,
      focusedRowType: null,
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    },
  },
  beforeMount() {
    Promise.all([getComboStdMatManage(), getLocationDescMatCdWmsMatAdjustManage(), getCommonCode('S0016')])
      .then((res) => {
        this.matList = res[0].listResponse.list.slice()
        this.matList.unshift({ matCd: '', matNm: '전체' })
        this.matCdLookup = res[0].listResponse.list.slice()
        this.locationIdLookUp = res[1].listResponse.list
        this.matDivLookUp = res[2].listResponse.list
      })
      .catch((error) => {})
  },
  methods: {
    onEditorPreparing(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'palletId':
            e.editorOptions.readOnly = (!e.row.data.isCreated && e.row.data.palletIdOri.trim() != '') || e.row.data.isCopied
            break
          case 'barcodeNo':
            e.editorOptions.readOnly = !e.row.data.isCreated
            break
          default:
            break
        }
        if (e.dataField == 'locationId') {
          e.editorOptions.onValueChanged = (args) => {
            var loc = this.locationIdLookUp.find((loc) => loc.locationId == args.value)
            e.component.cellValue(
              e.row.rowIndex,
              'matDiv',
              (loc && loc.locationType) == 'RACK' ? (loc.locationId.slice(0, 2) == '03' ? 'MANUAL_LINE' : 'AUTO_LINE') : ''
            )
            if (e.index > -1) e.component.selectRows(e.row.key, true)
            defaultValueChangeHandler(args)
          }
        } else {
          e.editorOptions.onValueChanged = (args) => {
            if (e.index > -1) e.component.selectRows(e.row.key, true)
            defaultValueChangeHandler(args)
          }
        }
      }
    },

    AddSelectedRowsData(e) {
      var newRow = {
        id: this.gridMain.length + 1,
        palletId: (this.focusedRowData && this.focusedRowData.palletId) || null,
        locationId: (this.focusedRowData && this.focusedRowData.locationId) || null,
        matCd: e[0].matCd,
        mainClass: e[0].mainClass,
        middleClass: e[0].middleClass,
        qty: 0,
        inWork: 0,
        outQty: 0,
        matDiv: (this.focusedRowData && this.focusedRowData.matDiv) || null,
        isCreated: true,
      }
      newRow.isCopied = newRow.palletId != null

      this.gridMain.unshift(newRow)
      this.gridMainInstance.selectRows(newRow.id, true)
    },

    // onSelectionChanged(e, cellInfo) {
    //   if (!e.selectedRowsData.length) return
    //   this.vToastifyPrompt(
    //     '데이터를 삽입하시겠습니까?',
    //     'info',
    //     (current) => {
    //       this.$refs[`dropDownBoxRef${cellInfo.key}`].instance.option('value', e.selectedRowsData[0].matCd)
    //       this.gridMainInstance.cellValue(cellInfo.rowIndex, 'matCd', e.selectedRowsData[0].matCd)
    //       this.gridMainInstance.cellValue(cellInfo.rowIndex, 'mainClass', e.selectedRowsData[0].mainClass)
    //       this.gridMainInstance.cellValue(cellInfo.rowIndex, 'middleClass', e.selectedRowsData[0].middleClass)
    //       cellInfo.component.selectRows(cellInfo.row.key, true)
    //       this.gridMainInstance.closeEditCell()
    //     },
    //     null,
    //     true
    //   )
    // },

    btnSearch() {
      this.openLoading('searching')
      this.doSearchMain(true).finally(() => {
        this.endLoading()
      })
    },

    doSearchMain(isProgress) {
      let params = {
        palletId: this.palletId,
        matCdMulti: this.matCd,
        rowMulti: this.rackRow,
      }

      this.gridInit()
      return getWmsMatAdjustManage(params, isProgress).then((res) => {
        this.gridMain = res.listResponse.list

        if (this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
      })
    },

    btnAdd() {
      if (this.focusedRowData) {
        if (this.focusedRowData.isCreated) {
          this.vToastify(this.$t('저장되지 않은 데이터입니다.'), 'warn')
          return
        }
        if (!this.focusedRowData.palletId) {
          this.vToastify(this.$t('그룹행은 추가할 수 없습니다.'), 'warn')
          return
        }
        this.MPopOpen = true
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
        if (!row.matCd || !row.barcodeNo || !row.locationId || Number(row.qty) < 1) {
          this.vToastify('필수항목 입력하세요.[품목명, 바코드 번호, 위치, 재고 수량]', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveWmsMatAdjustManage(selectedMainRows, true)
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