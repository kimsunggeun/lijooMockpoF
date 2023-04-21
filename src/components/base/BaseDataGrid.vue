<template>
  <div>
    <!--the appropriate input should go here-->
    <!-- 베이스 데이타 그리드  BY LYJ -->
  </div>
</template>
<script>
////common component
import iCardTop from '@/components/common/iCardTop.vue'
import iPageTitle from '@/components/common/iPageTitle.vue'
import iCardVertical from '@/components/common/iCardVertical.vue'
//디폴트 옵션 설정 파일 포함
import '@/components/options/dxDataGridEnvs.js'
import { DxDataGrid, DxSelection, DxPaging, DxFilterRow, DxScrolling, DxColumn, DxPager, DxEditing } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import ContextMenu from "devextreme/ui/context_menu"

export default {
  name: 'BaseDataGrid',
  components: {
    //
    'i-card-top': iCardTop,
    'i-page-title': iPageTitle,
    'i-card-vertical': iCardVertical,
    //
    DxDataGrid,
    DxSelection,
    DxPaging,
    DxFilterRow,
    DxScrolling,
    DxColumn,
    DxPager,
    DxEditing,
    //
    DxCheckBox
  },
  data() {
    return {
      enableEditColumn: [],
      datagridRfs: [],
      lookupColumnFilterExpression(value, operation, target) {
        if(target === 'filterRow') target = 'search'
        return this.defaultCalculateFilterExpression(value, operation, target)
      },
      lookupColumnFilterOperations: [ 'contains', 'notcontains', 'startswith', 'endswith', '=', '<>' ]
    }
  },
  computed: {
    DataGrids: function() {
      var instances = []
      this.datagridRefs.forEach(ref => {
        instances.push(this.$refs[ref].instance)
      })
      //return this.$refs[this.dxDataGridRef].instance
      return instances
    }
  },
  methods: {
    ///////////////////////////////////////
    /*        DataGrid Event Event       */
    ///////////////////////////////////////
    //ref에 해당하는 그리드 반환
    GetDataGrid(targetDataGridRef) {
      return this.$refs[targetDataGridRef].instance
    },
    //첫번째 포커스로 이동시킴
    FocusFirstRow(datagrid) {
      datagrid.option('focusedRowIndex', 0)
    },
    onRowUpdating(e) {
      // DataGrids.forEach(grid => {
        //   if (grid.NAME == e.component.NAME) grid.selectRows(e.key, true)
      // })

      // 편집모드가 batch가 아닌 cell 사용한다면 아래 주석 취소
      // e.components.selectRows(e.key, true)
    },
    onFocusedRowChanged() {},
    onEditingStart(e) {
      //if contains
      if (this.enableEditColumn.indexOf(e.column.dataField) > -1) {
        e.cancel = false
      } else e.cancel = true
    },
    onContentReady(e) {
    },
    gridInit(datagrid) {
      datagrid.cancelEditData()
      datagrid.clearSelection()
      // this.DataGrids.cancelEditData()
      // this.DataGrids.deselectAll()
    },
    btnCancelEditData(datagrid) {
      this.gridInit(datagrid)
      datagrid.cancelEditData()
    },
    onEditorPreparing(e) {
      if (e.parentType == 'dataRow') {
        var valueChanged = this.onCellValueChanged

        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) {
            valueChanged(args.value, e)
          }
        }
      }
    },
    onMatCdLookupPreparing(e) {
      if (e.parentType === 'filterRow' && e.dataField === 'matCd') {
        e.editorName = 'dxTextBox'
        e.editorOptions.valueChangeEvent = 'change keyup'
      }
    },
    onCheckValueChanged(value, cellInfo) {
      cellInfo.setValue(cellInfo.value === 'Y' ? 'N' : 'Y')
      cellInfo.component.selectRows(cellInfo.row.key, true)
      cellInfo.component.updateDimensions()
    },

    onCellValueChanged(value, cellInfo) {
      cellInfo.setValue(value)
      cellInfo.component.selectRows(cellInfo.row.key, true)
      // this.DataGrids.forEach(grid => {
      //   if (grid.NAME == cellInfo.component.NAME) grid.selectRows(cellInfo.row.key, true)
      // })
      //this.DataGrids.saveEditData()
    },

    clearFilter(datagrid) {
      // this.DataGrids.forEach(grid => {
      //   if (grid.NAME == e.component.NAME) grid.clearFilter()
      // })

      datagrid.clearFilter()
    },
    onDropdownEditGridInitialized(e) {
      this.$nextTick(function () {
        const contextMenu = ContextMenu.getInstance(e.element.querySelector('.dx-context-menu'))
        if(contextMenu) contextMenu.option('cssClass', 'dx-dropdowneditor-overlay')
      })
    },
  }
}
</script>
