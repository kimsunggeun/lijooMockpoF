<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <i-page-title title="메뉴권한 관리" />
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-sm-flex"
          :useBtnList="buttonUseList"
          @btnAdd="btnAdd()"
          @btnSearch="btnSearch()"
          @btnSave="btnSave()"
          @btnDelete="btnDelete()"
        >
          <template v-slot:body>
            <v-layout align-center>
              <v-col cols="12" md="4" sm="12" class="pa-2">
                <v-text-field
                  :value="searchParam"
                  label="프로그램명"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @keydown.enter="btnSearch()"
                  @change="changeInput"
                  clearable
                />
              </v-col>
            </v-layout>
          </template>
        </i-card-top>

        <i-system-bar />
      </v-col>
      <v-col cols="4" sm="4" lg="4" class="pa-2 pt-0">
        <i-card-vertical headerTitle="메뉴권한 관리">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="row pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="programDataGrid"
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
                    <DxSelection :select-all-mode="allMode" show-check-boxes-mode="always" mode="multiple" />

                    <DxColumn
                      data-field="progCd"
                      caption="프로그램코드"
                      width="160px"
                      data-type="string"
                      alignment="left"
                      css-class="devest-grid-header-require"
                    >
                    </DxColumn>

                    <DxColumn
                      data-field="progNm"
                      caption="프로그램명"
                      width="480px"
                      data-type="string"
                      alignment="left"
                      css-class="devest-grid-header-require"
                    >
                    </DxColumn>

                    <DxColumn
                      data-field="useYn"
                      data-type="boolean"
                      caption="사용 여부"
                      alignment="center"
                      width="90px"
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
      <v-col cols="8" sm="8" lg="8" class="pa-2 pt-0">
        <i-card-vertical headerTitle="메뉴 관리">
          <template v-slot:body>
            <v-layout column>
              <v-col cols="12" md="12" class="row pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxTreeList
                    id="menuManageTreeList"
                    class="layout-col-height00"
                    :ref="dxTreeListRef"
                    :data-source="menus"
                    :hover-state-enabled="true"
                    :show-row-lines="true"
                    :show-borders="true"
                    :column-auto-width="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :focused-row-enabled="true"
                    :root-value="0"
                    data-structure="plain"
                    key-expr="menuId"
                    parent-id-expr="parentId"
                    @editor-preparing="onEditorPreparing"
                    @selection-changed="onSelectionChanged"
                    @row-updated="onRowUpdated"
                    @row-updating="onRowUpdating"
                    @focused-row-changed="onFocusedRowChanged"
                    @cellClick="onCellClick"
                  >
                    <!-- 드래그 -->
                    <!-- <DxRowDragging
                      :on-drag-change="onDragChange"
                      :on-reorder="onReorder"
                      :allow-drop-inside-item="true"
                      :allow-reordering="true"
                      :show-drag-icons="true"
                    /> -->

                    <DxColumn data-field="menuId" data-type="number" caption="메뉴 ID" :allow-editing="false" />

                    <DxColumn data-field="menuNm" caption="메뉴명" css-class="devest-grid-header-require" />

                    <DxColumn
                      data-field="useYn"
                      caption="사용 여부"
                      data-type="boolean"
                      width="90px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                    />

                    <!-- checkbox -->
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :on-value-changed="(value) => onCheckValueChanged(value, cellInfo)" />
                    </template>

                    <!-- menuIcon -->
                    <template #menuIconCellTemplate="{ data: cellInfo }">
                      <div>
                        <v-icon>
                          {{ cellInfo.value }}
                        </v-icon>
                        {{ cellInfo.value }}
                      </div>
                    </template>
                    <!-- menuIcon -->
                    <template #menuIconEditor="{ data: cellInfo }">
                      <DxSelectBox
                        :data-source="iconListDataSource"
                        :value="cellInfo.value"
                        display-expr="code"
                        value-expr="code"
                        :show-clear-button="false"
                        @value-changed="(value) => onMenuIconChanged(value.value, cellInfo)"
                        item-template="item"
                      >
                        <template #item="{ data }">
                          <div v-if="data">
                            <v-icon>
                              {{ data.code }}
                            </v-icon>
                            {{ data.code }}
                          </div>
                        </template>
                      </DxSelectBox>
                    </template>
                  </DxTreeList>
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
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid'
import { DxTreeList, DxRowDragging, DxLookup } from 'devextreme-vue/tree-list'
import notify from 'devextreme/ui/notify' // message
import DxCheckBox from 'devextreme-vue/check-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import { getProgram, updateProgram, deleteProgram } from '@/api/kier/system/systemProg'
import baseview from '@/components/base/baseview.vue'
import BaseDataGrid from '@/components/base/BaseDataGrid.vue'

export default {
  mixins: [BaseDataGrid, baseview],
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxCheckBox,
    DxTreeList,
    DxRowDragging,
    DxLookup,
  },
  data() {
    return {
      dxDataGridMainRef: 'programDataGrid',
      gridMain: [],
      searchParam: '',
      dxTreeListRef: 'menuManageTreeList',
      buttonUseList: [
        'btnSearch', //조회
        'btnAdd', //추가
        'btnSave', //저장
        'btnDelete', //삭제
      ],
      programs: [],
      menus: [],
      allMode: 'allPages',
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    },
    treeList: function () {
      return this.$refs[this.dxTreeListRef].instance
    },
  },
  beforeMount() {
    Promise.all([
      /**
       * 나중에 api 추가
       *
       */
    ])
      .then((res) => {
        this.svcTypeDataSource = res[0].listResponse.list.slice()
        this.svcTypeDataSource.unshift({ code: '', desc: '' })
        this.programs = res[1].listResponse.list.slice()
        this.programs.unshift({ code: '', desc: '' })
      })
      .catch((error) => {})
  },
  methods: {
    onEditorPreparing(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'progCd':
            e.editorOptions.readOnly = !e.row.data.isCreated
            break

          default:
            break
        }
        e.editorOptions.onValueChanged = (args) => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          if (e.dataField == 'progCd') this.gridMainInstance.refresh()
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
        notify('조회되었습니다.', 'success', 1500)
      })
    },

    doSearchMain() {
      this.gridInit()
      return getProgram(this.searchParam).then((res) => {
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
        if (!row.progCd || !row.progNm) {
          this.vToastify('필수항목 입력하세요.[프로그램 코드, 프로그램 명]', 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          updateProgram(selectedMainRows, true)
            .then((res) => {
              this.doSearchMain(false)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
              notify('저장완료', 'success', 1500)
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
          deleteProgram(
            selectedMainRows.filter((row) => !row.isCreated),
            true
          )
            .then((res) => {
              this.doSearchMain(false)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
              notify('삭제완료', 'success', 1500)
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

    ///////////////////////////////////////
    /*        DataGrid Event Event       */
    ///////////////////////////////////////

    //v-text-field에 입력된 값을 api로 넘겨줄 검색어 searchsearchParam으로 설정
    changeInput(value) {
      this.searchParam = value
    },

    ///////////////////////////////////////
    /*             etc Event             */
    ///////////////////////////////////////
  },
}
</script>

<style lang="scss">
</style>