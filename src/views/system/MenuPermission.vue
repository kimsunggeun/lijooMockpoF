<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <i-page-title title="메뉴권한 관리" />
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top class="d-sm-flex" :useBtnList="buttonUseList" @btnSearch="btnSearch()">
          <template v-slot:body>
            <v-layout align-center> </v-layout>
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
                    key-expr="code"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="grid.columnHidingEnabled"
                    @editor-preparing="onEditorPreparing"
                    @focused-row-changed="onFocusedRowChanged"
                  >
                    <DxSelection mode="none" />

                    <DxColumn
                      data-field="code"
                      caption="파트너 코드"
                      width="160px"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                      :allow-editing="false"
                    />
                    <DxColumn
                      data-field="desc"
                      caption="파트너 분류"
                      width="160px"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                      :allow-editing="false"
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
      <v-col cols="8" sm="8" lg="8" class="pa-2 pt-0">
        <i-card-vertical headerTitle="메뉴 관리" :useBtnList="buttonUseListDetail" @btnSave="btnSave()">
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
                  >
                    <!-- 드래그 -->
                    <!-- <DxRowDragging
                      :on-drag-change="onDragChange"
                      :on-reorder="onReorder"
                      :allow-drop-inside-item="true"
                      :allow-reordering="true"
                      :show-drag-icons="true"
                    /> -->

                    <DxColumn data-field="menuId" data-type="number" width="90px" caption="메뉴 ID" :allow-editing="false" />

                    <DxColumn data-field="menuNm" caption="메뉴명" css-class="devest-grid-header-require" :allow-editing="false" />

                    <DxColumn
                      data-field="useYn"
                      caption="사용 여부"
                      data-type="boolean"
                      width="90px"
                      alignment="center"
                      edit-cell-template="checkBoxEditor"
                    />
                    <DxColumn width="800px" />

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
import baseview from '@/components/base/baseview.vue'
import BaseDataGrid from '@/components/base/BaseDataGrid.vue'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import { getMenu, saveMenuPermission, getMenuPermission } from '@/api/kier/system/menuManage'

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
  },
  data() {
    return {
      dxDataGridMainRef: 'programDataGrid',
      gridMain: [],
      searchParam: '',
      dxTreeListRef: 'menuManageTreeList',
      buttonUseList: [
        'btnSearch', //조회
      ],
      buttonUseListDetail: ['btnSave'],
      programs: [],
      menus: [],
      allMode: 'allPages',
      focusedData: [],
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

  methods: {
    onFocusedRowChanged(e) {
      this.focusedData = e.row && e.row.data
      this.menus = []
      this.btnSearchMeun()
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
      this.menus = []
      this.doSearchMain(true).finally(() => {
        this.endLoading()
        notify('조회되었습니다.', 'success', 1500)
      })
    },

    doSearchMain() {
      this.gridInit()
      return getCommonCode('S0002').then((res) => {
        this.gridMain = res.listResponse.list
        if (this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
      })
    },

    //  Save
    async btnSave() {
      var selectedMainRows = await this.treeList.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      for (let i of selectedMainRows) {
        i.menuGrpCd = this.focusedData.code
        i.useYn = 'Y'
      }

      //유효성 체크

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        (current) => {
          this.openLoading()
          try {
            saveMenuPermission(selectedMainRows).then((res) => {
              this.doSearchMain(false)
              notify('저장되었습니다.', 'success', 1500)
            })
          } catch (error) {
            notify('저장에 실패했습니다.', 'fail', 1500)
          }
        },
        null,
        true
      )
    },

    // Del

    btnSearchMeun() {
      this.openLoading()
      this.treeInit()

      let Mparam = {
        menuGrpCd: 'system',
        menuId: '',
        menuNm: '',
        progCd: '',
      }

      let params = {
        menuGrpCd: this.focusedData?.code,
        menuId: '',
        menuNm: '',
        progCd: '',
      }

      let Newobj = []
      // 조회 api
      getMenu(false, Mparam)
        .then((Orgres) => {
          this.menus = Orgres.listResponse.list

          for (let i of this.menus) {
            i.useYn = 'N'
          }

          getMenuPermission(params, false).then((res) => {
            let filterRes = res.map.menuPerList
            //  중복  menuNm 값만  찾기
            for (let C of filterRes) {
              Newobj.push(C.menuNm)
            }

            //  찾은후 필터 => some 으로 같은 menuNm찾은후 사용중인건 y
            this.menus.filter((x) => {
              if (Newobj.some((i) => x.menuNm.includes(i))) {
                x.useYn = 'Y'
              }
            })
          })

          // DxtreeList 버그로 인하여 전체확장을 껏다가 킴
          this.treeList.option('autoExpandAll', false)
          this.treeList.option('autoExpandAll', true)
        })
        .finally(() => {
          this.endLoading()
        })
    },

    gridInit() {
      this.gridMainInstance.clearSelection()
      this.gridMainInstance.cancelEditData()
      this.gridMainInstance.option('focusedRowIndex', -1)
    },
    async treeInit() {
      this.treeList.option('focusedRowIndex', -1)
      this.isLoding = true
      await this.treeList.clearSelection()
      this.isLoding = false
      this.treeList.cancelEditData()
      this.focusedRow = null
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