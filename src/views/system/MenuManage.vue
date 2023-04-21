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
                    label="통합 검색"
                    class="search-text-field"
                    dense
                    outlined
                    color="primary"
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @change="changeInput"
                    clearable
                  />
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
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
                    
                    <DxColumn data-field="menuId" data-type="number" width="100px" caption="메뉴 ID" :allow-editing="false"/>

                    <DxColumn data-field="menuNm" width="220px" caption="메뉴명" css-class="devest-grid-header-require" />

                    <DxColumn
                      data-field="menuIcon"
                      caption="메뉴 아이콘"
                      cell-template="menuIconCellTemplate"
                      edit-cell-template="menuIconEditor"
                      width="150px"
                    >
                    </DxColumn>

                    <DxColumn data-field="progCd" caption="프로그램코드" width="260px">
                      <DxLookup :data-source="programs" display-expr="desc" value-expr="code" />
                    </DxColumn>

                    <DxColumn data-field="sort" data-type="number" caption="순서" width="70px"  alignment="right" sortOrder="asc"/>

                    <DxColumn data-field="useYn" caption="사용 여부" data-type="boolean" width="90px" alignment="center" edit-cell-template="checkBoxEditor"/>

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />

                    <!-- checkbox -->
                    <template #checkBoxEditor="{ data: cellInfo  }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :on-value-changed="value => onCheckValueChanged(value, cellInfo)" />
                    </template>

                    <!-- menuIcon -->
                    <template #menuIconCellTemplate="{ data: cellInfo  }">
                      <div>
                        <v-icon>
                          {{ cellInfo.value }}
                        </v-icon>
                        {{ cellInfo.value }}
                      </div>
                    </template>
                    <!-- menuIcon -->
                    <template #menuIconEditor="{ data: cellInfo  }">
                      <DxSelectBox
                        :data-source="iconListDataSource"
                        :value="cellInfo.value"
                        display-expr="code"
                        value-expr="code"
                        :show-clear-button="false"
                        @value-changed="value => onMenuIconChanged(value.value, cellInfo)"
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
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import { DxTreeList, DxColumn, DxRowDragging, DxLookup } from 'devextreme-vue/tree-list'
import DxSelectBox from 'devextreme-vue/select-box'
import DxCheckBox from 'devextreme-vue/check-box'
import {
  getMenu,
  saveMenu,
  deleteMenu
} from '@/api/kier/system/menuManage'
import { getComboCommonCodeDetail } from '@/api/kier/system/commonCodeManage'
import { getComboProgram } from '@/api/kier/system/progManage'

import Baseview from '@/components/base/baseview.vue' //20220414 LYJ base page 추가

export default {
  extends: Baseview, //20220414 LYJ base page 추가
  name: 'MenuManage',
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxTreeList,
    DxColumn,
    // eslint-disable-next-line vue/no-unused-components
    DxRowDragging,
    DxCheckBox,
    DxSelectBox,
    DxLookup
  },
  data() {
    return {
      dxTreeListRef: 'menuManageTreeList',
      menus: [],
      buttonUseList: [
        'btnSearch', //조회
        'btnAdd', //추가
        'btnSave', //저장
        'btnDelete' //삭제
      ],
      iconListDataSource: [],
      svcTypeDataSource: [],
      programs: [],

      focusedRow: null,
      isLoding: false
    }
  },
  beforeMount() {
    Promise.all([getComboCommonCodeDetail('S0005'), getComboProgram()])
      .then( res => {
        this.svcTypeDataSource = res[0].listResponse.list.slice()
        this.svcTypeDataSource.unshift({ code: '', desc: '' })
        this.programs = res[1].listResponse.list.slice()
        this.programs.unshift({ code: '', desc: '' })
      })
      .catch(error => {})
  },
  mounted() {
    // 켜질때 조회
    this.btnSearch()
  },
  computed: {
    treeList: function() {
      return this.$refs[this.dxTreeListRef].instance
    }
  },
  methods: {
    ///////////////////////////////////////
    /*       Toolbar Button Event        */
    ///////////////////////////////////////
    changeInput(value) {
      this.treeList.searchByText(value)
    },

    async btnAdd() {
      // 부모 메뉴 ID
      let parent = null
      let parentId = null
      let level = 1
      let selectedRows = await this.treeList.getSelectedRowsData()
      // 포커싱된 데이터가 있으면
      if (this.focusedRow !== null) {
        // 부모아이디 세팅
        parentId = this.focusedRow.menuId
        // level 세팅(선택 하위로 들어가니 + 1)
        // batch 로 변경되며 사용이 안됨
        // level = this.treeList.getNodeByKey(this.focusedRow.menuId).lvl + 1
        level = Number(this.menus.find(element => element.menuId === this.focusedRow.menuId).lvl) + 1

        // 생성될 부모 노드 확장
        this.treeList.expandRow(this.focusedRow.menuId)
      }
      // 첫번째로 선택된 열의 메뉴 아이디로 부모아이디 생성 및 레벨 세팅
      else if (selectedRows.length !== 0) {
        // 부모아이디 세팅
        parentId = selectedRows[0].menuId
        // level 세팅(선택 하위로 들어가니 + 1)
        // level = this.treeList.getNodeByKey(parentId).level + 1
        level = Number(this.menus.find(element => element.menuId === parentId).lvl) + 1

        // 생성될 부모 노드 확장
        this.treeList.expandRow(selectedRows[0].menuId)
      }

      // 메뉴ID는 Mapper에서 지정되므로 중복되지않는 임의의 값을 넣어준다.

      let newRow = {
        menuId: this.menus.reduce((acc, cur) => acc < Number(cur.menuId) ? Number(cur.menuId) : acc, 0)+ 1,
        parentId,
        sort: 0,
        lvl: level,
        useYn: 'Y',
        isCreated: true
      }


      // if(newRow.id == null) newRow.id = this.dataSource.length + 1;
      this.menus.unshift(newRow)
      // 바로 getRowIndexByKey 을 들고 오지 못하여 setTimeout로 약간 지연시켜 들고오게 하였음
      setTimeout(() => {
        this.treeList.selectRows(newRow.menuId, true)
        this.treeList.option('focusedRowKey', newRow.menuId)
      }, 10)
    },

    btnSearch() {
      this.openLoading()
      this.treeInit()

      // 조회 api
      getMenu(true)
        .then(res => {
          this.menus = res.listResponse.list
          // DxtreeList 버그로 인하여 전체확장을 껏다가 킴
          this.treeList.option('autoExpandAll', false)
          this.treeList.option('autoExpandAll', true)
        })
        .finally(() => {
          this.endLoading()
        })
    },
    async btnSave() {
      await this.treeList.saveEditData()
      let selectedRows = await this.treeList.getSelectedRowsData()

      if (!selectedRows.length) {
        this.vToastify(this.$t('selectionData'), 'warn')
        // this.$vToastify.warning({ body: this.$t('selectionData') })
        return
      }
      
      let valCheckData = selectedRows.findIndex(element => !element.menuNm || element.menuNm.replace(/\s/g, '') == '')

      //필수값 체크
      if (valCheckData > -1) {
        this.vToastify(this.$t('필수항목 입력하세요.[메뉴명]'), 'warn')
        return
      }

      let checkSelect = false
      for (let i = 0; i < selectedRows.length; i++) {
        // batch mode 로 바꾸면서 제대로 동작하지않음
        // let sourceNode = this.treeList.getNodeByKey(selectedRows[i].menuId)
        let sourceNode = this.menus.find(element => element.menuId === selectedRows[i].menuId)

        // 신규 열이 선택되면 자신의 부모중에 신규가 있는지 파악하고 그 부모신규도 체크가 되어야함
        checkSelect = await this.isSelectAllparent(sourceNode)

        if (checkSelect) break
      }

      if (checkSelect) {
        this.vToastify(this.$t('저장할 메뉴의 상위메뉴 중 체크가 안된 신규 상위메뉴가 있습니다.'), 'warn')
        // this.$vToastify.warning({ body: this.$t('저장할 메뉴의 상위메뉴 중 체크가 안된 신규 상위메뉴가 있습니다.') })
        return
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.menuSave(selectedRows).then(res => {
            return true
          })
        },
        null,
        true
      )
    },
    async menuSave(selectedRows) {
      // let selectedRows = this.treeList.getSelectedRowsData()

      // 선택한 열들에 level 값을 넣어주는것
      // this.setSelectedRowLevel(selectedRows)
      this.openLoading()
      // 트리구조로 변경
      let treeData = this.convertTreeStructure(selectedRows)
      // 저장 api
      saveMenu(treeData, true)
        .then(res => {
          getMenu(false)
            .then(res => {
              this.treeInit()
              this.menus = res.listResponse.list
              // DxtreeList 버그로 인하여 전체확장을 껏다가 킴
              this.treeList.option('autoExpandAll', false)
              this.treeList.option('autoExpandAll', true)
            })
            .finally(res => {
              this.endLoading()
            })
        })
        .finally(res => {
          this.endLoading()
        })
    },
    async btnDelete() {
      let selectedRows = await this.treeList.getSelectedRowsData()
      if (selectedRows.length === 0) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        current => {
          current.treeList.saveEditData()
          // 삭제 시 자식이 있는지 파악
          let checkChildren = false
          for (let i = 0; i < selectedRows.length; i++) {
            // getNodeByKey 가 적용이 안되어 방법 수정
            // let sourceNode = current.treeList.getNodeByKey([selectedRows[i].menuId])
            // 삭제 시 자식이 있는지 파악
            // checkChildren = sourceNode.hasChildren

            // 삭제 시 자식이 있는지 파악
            let findIndex = this.menus.findIndex(element => element.parentId === selectedRows[i].menuId)
            checkChildren = findIndex > -1 ? true : false
            if (checkChildren) break
          }
          // 자식이 있으면 한번 더 물어봄
          if (checkChildren) {
            this.vToastifyPrompt(
              current.$t('doDeleteAllData'),
              'info',
              current => {
                this.openLoading()
                // 삭제
                deleteMenu(selectedRows, true)
                  .then(res => {
                    // this.menus 에서도 삭제
                    current.deleteCallBack(selectedRows)
                    return true
                  })
                  .finally(res => {
                    this.endLoading()
                  })
              },
              null,
              true
            )
          } else {
            this.openLoading()
            // 자식이 없으면 삭제
            deleteMenu(selectedRows, true)
              .then(res => {
                // this.menus 에서도 삭제
                current.deleteCallBack(selectedRows)
                return true
              })
              .finally(res => {
                this.endLoading()
              })
          }
        },
        null,
        true
      )
    },
    ///////////////////////////////////////
    /*        TreeList Event Event       */
    ///////////////////////////////////////
    setSelectedRowLevel(selectedRows) {
      for (let i = 0; i < selectedRows.length; i++) {
        // 레벨 세팅
        let key = selectedRows[i].menuId

        // batch 로 변경되며 제대로 동작이 안됨
        // let level = this.treeList.getNodeByKey(key).level
        let level = this.menus.find(element => element.menuId === key).level

        selectedRows[i].lvl = level
      }
    },
    onEditorPreparing(e) {
      // onCellValueChanged 를 사용하기 위함
      if (e.parentType == 'dataRow') {
        var valueChanged = this.onCellValueChanged
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) valueChanged(args.value, e)
        }
      }
    },
    onCellValueChanged(value, cellInfo) {
      cellInfo.setValue(value)

      // treelist는 clearSelection() 시 onCellValueChanged를 더 타므로 loading 변수로 제어한다.
      if (!this.isLoding) this.treeList.selectRows(cellInfo.row.key, true)

      // 프로그램이 바뀌면 기본 프로그램 아이콘값이 메뉴 아이콘으로 자동 세팅
      // if (cellInfo.dataField === 'progCd') {
      //   let progData = this.menuProgDataSource.find(element => element.progIcon != null && element.progIcon === value)

      //   cellInfo.component.cellValue(cellInfo.row.rowIndex, 'menuIcon', progData != null && progData.progIcon != null ? progData.progIcon : '')
      // }
    },
   
    async onSelectionChanged(e) {
      // 최근에 선택된 열의 node 정보
      let sourceNode
      if (e.currentSelectedRowKeys.length !== 0) {
        sourceNode = this.treeList.getNodeByKey(e.currentSelectedRowKeys)
      } else {
        sourceNode = this.treeList.getNodeByKey(e.currentDeselectedRowKeys)
      }

      // 열 삭제시에도 해당 메소드를 타기때문에 return
      if (sourceNode == null) return

      // 최근 선택된 열의 menuId
      // let currentSelectedMenuId = sourceNode.data.menuId

      // // 하위 노드에 대한 선택들
      // let isRowSelected = this.treeList.isRowSelected(currentSelectedMenuId)
      // if(sourceNode.children.length !== 0) {
      //   this.menus.forEach(element =>{
      //     if(element.parentId === currentSelectedMenuId) {
      //       // 순서가 바뀌어서 변하였으니 저장하기 위해 선택 check
      //       if(isRowSelected) {
      //         this.treeList.selectRows([`${element.menuId}`], true)
      //       } else {
      //         this.treeList.deselectRows([`${element.menuId}`])
      //       }
      //     }
      //   })
      // }
    },
    onRowUpdated(e) {
      // 열 수정시 선택되게함
      e.data.__modified__ = true
      this.treeList.selectRows(e.key, true)
    },
    onRowUpdating(e) {
      this.treeList.selectRows(e.key, true)
    },
    onDragChange(e) {
      // visibleRows : 현재 보이는 열, sourceNode : 옮기고 있는 열의 node 정보, targetNode : sourceNode와 대응하는 열의 node 정보
      let visibleRows = this.treeList.getVisibleRows(),
        sourceNode = this.treeList.getNodeByKey(e.itemData.menuId),
        targetNode = visibleRows[e.toIndex].node
      //부모 노드가 하위 노드로 들어가는것을 방지
      while (targetNode && targetNode.data) {
        if (targetNode.data.menuId === sourceNode.data.menuId) {
          e.cancel = true
          break
        }
        targetNode = targetNode.parent
      }
    },
    onReorder(e) {
      // visibleRows : 현재 보이는 열, sourceData : 옮기고 있는 열, targetData : targetData와 대응하는 열
      let visibleRows = e.component.getVisibleRows(),
        sourceData = e.itemData,
        targetData = visibleRows[e.toIndex].data

      // 드래그된 Row가 Select된 상태로 되는것
      let getSelectedRowIds = []
      this.treeList.getSelectedRowsData().forEach(element => {
        getSelectedRowIds.push(element.menuId)
      })
      getSelectedRowIds.push(sourceData.menuId)
      this.treeList.selectRows(getSelectedRowIds)

      // 안에 넣는다면
      if (e.dropInsideItem) {
        e.itemData.parentId = targetData.menuId
        // 넣어진 열이 맨 마지막 순서로 들어감
        e.itemData.sort = visibleRows[e.toIndex].node.children.length + 1
      } else {
        let sourceIndex = this.menus.indexOf(sourceData),
          targetIndex = this.menus.indexOf(targetData)

        // 부모가 다르면
        if (sourceData.parentId !== targetData.parentId) {
          sourceData.parentId = targetData.parentId
          if (e.toIndex > e.fromIndex) {
            targetIndex++
          }
        }

        this.menus.splice(sourceIndex, 1)
        this.menus.splice(targetIndex, 0, sourceData)
      }

      // 레벨 세팅
      let level = this.treeList.getNodeByKey(sourceData.menuId).level
      sourceData.lvl = level

      let sourceNode = e.component.getNodeByKey(e.itemData.menuId)

      // 옮겨졌던 열의 같은 레벨의 아이들의 순서를 자동으로 넣어주는것
      let i = 1
      this.menus.forEach(element => {
        // 제일 최상위 레벨 || 그 외 레벨
        if (
          (typeof sourceNode.parent.data === 'undefined' && element.parentId === 0) ||
          (typeof sourceNode.parent.data !== 'undefined' && element.parentId === sourceNode.parent.data.menuId)
        ) {
          element.sort = i
          i++
          // 순서가 바뀌어서 변하였으니 저장하기 위해 선택 check
          this.treeList.selectRows([`${element.menuId}`], true)
        }
      })

      this.treeList.refresh()
    },
    // 체크박스 값 변경될 시 타는 이벤트
    onCheckValueChanged(value, cellInfo) {
      cellInfo.setValue(cellInfo.value === 'Y' ? 'N' : 'Y')

      // 재귀적으로 트리아래 모든 데이터 변경을 위한 함수
      this.recursiveDataChange(cellInfo)
      this.treeList.selectRows(cellInfo.row.key, true)

      cellInfo.component.updateDimensions()
    },
    // 메뉴 아이콘 안의 아이콘 변경시
    onMenuIconChanged(value, cellInfo) {
      cellInfo.setValue(value)
      cellInfo.component.updateDimensions()
    },
    onFocusedRowChanged(e) {
      // const rowData = e.row && e.row.data;
      // let cellValue;
      // let assigned;

      if (e.row != null) {
        this.focusedRow = e.row.data
      }

      // if (rowData) {
      //   cellValue = e.component.cellValue(e.row.rowIndex, 'menuId');
      // }
    },
    onCellClick(e) {
      if (e.rowType === 'header' && e.column.dataField === 'useYn') {
        // 헤더 체크박스 누를 시 sort 안되게하는것 추후 개발
        // e.event.stopImmediatePropagation()
        // e.event.stopPropagation()
        // window.event.cancelBubble = true
      }
    },
    // 헤더의 값 변경될 시 타는 이벤트
    onCheckHeaderValueChanged(value, headerField) {
      this.menus.forEach(element => {
        element[headerField] = value ? 'Y' : 'N'
      })
      this.treeList.selectAll()
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
    /*             etc Event             */
    ///////////////////////////////////////
    deleteCallBack(selectedRows) {
      var index1 = null
      selectedRows.forEach(key => {
        index1 = this.menus.findIndex(obj => obj == key)
        this.menus.splice(index1, 1)
      })
      this.treeInit()
    },
    convertTreeStructure(list) {
      // lvl 별로 정렬
      this.sortByLevel(list)
      let map = {},
        node = {},
        roots = []

      for (let i = 0; i < list.length; i += 1) {
        // 초기세팅
        map[list[i].menuId] = i
        list[i].children = []
      }

      for (let i = 0; i < list.length; i += 1) {
        node = list[i]
        if (node.parentId !== 0) {
          // 부모가 없는 가지는 맨 위로 보낸다.
          if (typeof list[map[node.parentId]] === 'undefined') {
            roots.push(node)
          } else {
            list[map[node.parentId]].children.push(node)
          }
        } else {
          roots.push(node)
        }
      }
      return roots
    },
    // lvl 별로 정렬
    sortByLevel(array) {
      array = array.sort(function(a, b) {
        return a.lvl - b.lvl
      })
    },
    // 저장시 열이 선택되면 자신의 부모중에 신규가 있는지 파악하고 그 부모신규도 체크가 되어야함
   isSelectAllparent(selectedNode) {
      let parentId = selectedNode.parentId
      let check = false
     
 
      while (parentId) {
        // 부모노드 가져옴
        // batch 로 바꾸면서 제대로 동작하지않음
        let parentNode = this.treeList.getNodeByKey(parentId)
        parentNode = this.menus.find(element => element.menuId === parentId)
        
        // 부모가 신규면
        if (parentNode?.isCreated) {
          // 부모가 신규이면서 자식은 체크되었지만 부모가 체크가 안된경우
          if (!this.treeList.isRowSelected(parentNode.menuId)) {
            check = true
            break
          }
        }
        parentId = parentNode?.parentId
      }
      return check
    },

    // 재귀적으로 트리아래 모든 데이터 변경을 위한 함수
    recursiveDataChange(cellInfo) {
      this.menus.forEach(element => {
        if (element.parentId === cellInfo.data.menuId) {
          // 순서가 바뀌어서 변하였으니 저장하기 위해 선택 check
          element[`${cellInfo.column.dataField}`] = cellInfo.value
          // 재귀적으로 함수를 타기위해 cellInfo 만들어줌
          let tempCellInfo = {
            data: {
              menuId: element.menuId
            },
            column: {
              dataField: cellInfo.column.dataField
            },
            value: cellInfo.value
          }
          this.treeList.selectRows([`${element.menuId}`], true)
          this.recursiveDataChange(tempCellInfo)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.search-text-field {
  max-width: 240px;
}
</style>
