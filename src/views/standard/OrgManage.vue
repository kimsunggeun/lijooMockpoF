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
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
      </v-col>

      <v-col cols="12" sm="12" lg="2" class="pa-2 pt-0">
        <i-card-top headerTitle="조직">
          <template v-slot:body>
            <div class="example" data-v-f3f3eg9>

              <v-layout column overflow-auto>
                <v-col cols="12" md="12" class="pa-0">
                  <v-col cols="12" lg="12" class="pa-0">
                    <DxTreeView
                    id="orgManageTree"
                    class="layout-col-height01"
                    :ref="dxTreeViewRef"
                    :data-source="treeMain"
                    :show-borders="true"
                    data-structure="plain"
                    parent-id-expr="parentDept"
                    key-expr="id"
                    display-expr="deptNm"
                    no-data-text="데이터가 없습니다."
                    @item-click="onItemClick"
                    />
                  </v-col>
                </v-col>
              </v-layout>
            </div>
          </template>
        </i-card-top>


        
      </v-col>
      <v-col cols="12" sm="12" lg="10" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical headerTitle="조직 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="orgManageMain"
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
                    :column-hiding-enabled="false"
                    @editor-preparing="onEditorPreparing"
                  >
                    <DxColumn data-field="deptCd" caption="부서코드" width="110px" data-type="string" alignment="center" :allow-editing="false"/>

                    <DxColumn data-field="deptNm" caption="부서명" data-type="string" alignment="left" css-class="devest-grid-header-require"/>

                    <DxColumn data-field="deptNmShort" caption="약칭 부서명" width="130px" data-type="string" alignment="left"/>

                    <DxColumn data-field="edeptNmEn" caption="영문 부서명" width="220px" data-type="string" alignment="left"/>

                    <DxColumn data-field="parentDept" caption="상위 부서명" width="230px" data-type="string" alignment="left">
                      <DxLookup
                        :data-source="deptList"
                        value-expr="deptCd"
                        display-expr="deptNm"
                      />
                    </DxColumn>

                    <DxColumn data-field="deptDiv" caption="조직 구분" width="120px" data-type="string" alignment="center">
                      <DxLookup
                        :data-source="deptDivList"
                        value-expr="code"
                        display-expr="desc"
                      />
                    </DxColumn>

                    <DxColumn data-field="seqNo" caption="순서" width="70px" data-type="number" alignment="center"/>

                    <DxColumn data-field="useYn" caption="사용 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor"/>

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)"/>
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
import DxTreeView from 'devextreme-vue/tree-view'
import { DxDataGrid, DxColumn, DxLookup, } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getStdOrgManage,
  getTreeStdOrgManage,
  saveStdOrgManage,
  deleteStdOrgManage
} from '@/api/kier/standard/orgManage'

import { getCommonCode } from '@/api/kier/standard/commonCodeManage'

export default {
  name: 'OrgManage',
  mixins: [baseview, BaseDataGrid],
  components: {
    ICardVertical,
    ICardTop,
    DxTreeView,
    DxDataGrid,
    DxColumn,
    DxCheckBox,
    DxLookup,
  },
  data() {
    return {
      dxTreeViewRef: 'orgManageTree',
      dxDataGridMainRef: 'orgManageMain',
      buttonUseList: [
        'btnSearch', //조회
        'btnAdd', //신규
        'btnSave', //저장
        'btnDelete' //삭제
      ],
      treeMain: [],
      gridMain: [],
      deptList: [],
      deptDivList: [],
    }
  },
  computed: {
    treeMainInstance() {
      return this.GetDataGrid(this.dxTreeViewRef)
    },
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    }
  },
  beforeMount() {
    Promise.all([ getCommonCode('S0009') ])
      .then( res => {
        this.deptDivList = res[0].listResponse.list
      })
      .catch(error => {})
  },
  mounted() {
    this.btnSearch()
  },
  methods: {
    btnSearch() {
      this.openLoading('searching')
      this.doSearchMain(true)
        .finally(() => {
          this.endLoading()
        })
    },

    doSearchMain(isProgress) {
      return getStdOrgManage({}, isProgress)
        .then(res => {
          this.deptList = res.listResponse.list.map(el => {return {deptCd:el.deptCd, deptNm:el.deptNm}})
          this.deptList.unshift({deptCd:'', deptNm:'조직'})
          this.treeMain = res.listResponse.list
          this.treeMain.forEach((el, idx) => {
            if (!el.parentDept) this.treeMain[idx].parentDept = 'root'
          })
          this.treeMain.unshift({id:'root', deptCd:'', deptNm:'조직', expanded: true})
          this.doSearchDetail('', isProgress)
        })
    },
    
    doSearchDetail(deptCd, isProgress) {
      return getTreeStdOrgManage({deptCd: deptCd}, isProgress)
        .then(res => {
          this.gridInit()
          this.gridMain = res.listResponse.list
          this.gridMainInstance.option('focusedRowIndex', 0)
        })
    },

    onItemClick(e) {
      this.openLoading('searching')
      this.doSearchDetail(e.itemData.deptCd, true)
        .finally(() => {
          this.endLoading()
        })
    },

    btnAdd() {
      let newRow = {
        id: this.gridMain.length + 1,
        useYn: 'Y',
        isCreated: true
      }
      this.gridMainInstance.newRow(newRow)
      this.gridMainInstance.refresh().then(() => {
        this.gridMainInstance.selectRows(newRow.id, true)
        this.gridMainInstance.option('focusedRowIndex', 0)
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
        if (!row.deptNm) {
          this.vToastify('필수항목 입력하세요.[부서명]', 'warn')
          return
        }
      }
      
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveStdOrgManage(selectedMainRows, true)
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
        this.$t('doDeleteAllData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          deleteStdOrgManage(selectedMainRows.filter(row => !row.isCreated), true)
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

    onEditorPreparing(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'parentDept':
            e.editorOptions.readOnly = !e.row.data.isCreated
            break;
          default:
            break;
        }
        e.editorOptions.onValueChanged = args => {
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
          { filterValue: 'N', filterText: 'X' }
        ]
      }
    },
    gridInit() {
      this.gridMainInstance.clearSelection()
      this.gridMainInstance.cancelEditData()
      this.gridMainInstance.option('focusedRowIndex', -1)
    }
  }
}
</script>

<style scoped lang="scss">

</style>