<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <i-page-title title="progManage" />
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-sm-flex"
          :useBtnList="buttonUseList"
          @btnAdd="btnAdd()"
          @btnSearch="btnSearch()"
          @btnSave="btnSave()"
          @btnDelete="btnDelete()" > 
                 
        
          <template v-slot:body>

            <v-layout align-center >
              <v-col cols="12" md="2" sm="12" class="pa-2">
                <v-text-field
                  :value="mainClassTxt"
                  label="대분류"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @change="changeInput"
                  clearable
                />
                
              </v-col>
              <v-col cols="12" md="2" sm="12" class="pa-2">
                <v-text-field
                  :value="middleClassTxt"
                  label="중분류"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @change="changeInput_middle"
                  clearable
                />
              </v-col>
             
              <span style="width: 164px;" class="pa-2 py-md-0">
                <v-switch
                  v-model="toggleDelYn"
                  true-value="Y"
                  false-value="N"
                  :label="`삭제 데이터 조회`"
                  @click="btnSearch()"
                />
              </span>
            </v-layout>
          </template>
        </i-card-top>
           <i-system-bar/>

      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="품목그룹 리스트">

    
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="row pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="programDataGrid"
                    class="layout-col-height00"
                    :ref="dxDataGridRef"
                    :data-source="programs"
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
                    @row-updating="onRowUpdating"
                    @editing-start="onEditingStart"
                    @selection-changed="onSelectionChanged"
                    @editor-preparing="onEditorPreparing"
                  >
                    

                    <DxSelection :select-all-mode="allMode" show-check-boxes-mode="always" mode="multiple" />
                    
                    <DxColumn data-field="mainClass" data-type="string" caption="대분류"   width="300px">
                   
                    </DxColumn>

                    <DxColumn data-field="middleClass" data-type="string" caption="중분류" width="550px" alignment="left" >
                      
                    </DxColumn>

                    <DxColumn data-field="remark" data-type="string" caption="비고" alignment="left" />
                
                    <DxColumn
                      data-field="useYn" data-type="boolean" caption="사용 여부" alignment="center" width="90px" edit-cell-template="checkBoxEditor"/>

                    <DxColumn 
                      data-field="delYn" data-type="boolean" caption="삭제 여부" alignment="center"  width="90px" edit-cell-template="checkBoxEditor"/>
                    

                      <!-- <DxLookup :data-source="svcGubnDataSource" value-expr="minorCd" display-expr="minorNm" /> -->

                         
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
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


import DxSelectBox from 'devextreme-vue/select-box'

import notify from 'devextreme/ui/notify' // message


import { getMatGroup,saveMatGroup,deleteMatGroup, } from '@/api/kier/standard/matGroupManage'



import baseview from '@/components/base/baseview.vue'

import BaseDataGrid from '@/components/base/BaseDataGrid.vue'


import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import ISystemBar from '@/components/common/iSystemBar.vue'

export default {
  mixins: [BaseDataGrid , baseview],
  components: {
      ISystemBar
  },
  data() {
    return {
      
      toggleDelYn: 'N',
      dxDataGridRef: 'programDataGrid',
      mainClassTxt: '',
      middleClassTxt: '',
      programs: [],
      buttonUseList: [
        'btnSearch', //조회
        'btnAdd', //추가
        'btnSave', //저장
        'btnDelete' //삭제
      ],
      iconListDataSource: [],
      svcGubnDataSource: [],
      svsTypeDataSource: [],
      allMode: 'allPages',
      
      locationType:[]
    }
  },
  computed: {
    gridData: function() {
      return this.$refs[this.dxDataGridRef].instance
    },
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridRef)
    }
  },
  
// 

  mounted() {
    // 켜질때 조회
    this.btnSearch()
     
  },

// beforeMount() {
//     Promise.all([getCommonCode('S0007'),getCommonCode('S0008'),])
//       .then( res => {
      
    
//         this.locationType = res[0].listResponse.list.slice()
        

//         this.area = res[1].listResponse.list.slice()
//         this.area.unshift({ code: '', desc: '' })

      
//         this.RackselectType = res[2].listResponse.list.slice()
      

//       })
//       .catch(error => {})
//   },


  methods: {

  
    ///////////////////////////////////////
    /*       Toolbar Button Event        */
    ///////////////////////////////////////
    //------------------------------------------
    //  프로그램 조회
    //------------------------------------------
    btnSearch() {

      

       let params = {
        
        mainClass: this.mainClassTxt,
        middleClass: this.middleClassTxt,
        delYn: this.toggleDelYn
      }

      this.openLoading('조회중')

      getMatGroup(params)
        .then(res => { 
            
          this.gridInit(this.GetDataGrid(this.dxDataGridRef))
          this.programs = res.listResponse.list

          this.FocusFirstRow(this.GetDataGrid(this.dxDataGridRef))
          notify("조회되었습니다.", 'success', 1500)
          
         
        })
        .catch()
        .finally(() => {
           
          this.endLoading()
        })
    },
    //조회버튼 클릭시 프로그램 조회 


    //------------------------------------------
    //  프로그램 추가
    //------------------------------------------
    async btnAdd() {
     
      let newRow = {
        id: this.programs.length + 1,
        authCheck: 'Y',
        useYn: 'Y',
        delYn:'N',
        affix: 'N',
        svcGubn: 'W'
        //svsType: 'N'
      
      }
      
      Object.defineProperty(newRow, '__created__', { value: true, writable: true, enumerable: true, configurable: true })
      this.GetDataGrid(this.dxDataGridRef).newRow(newRow)

      
      this.gridMainInstance.paginatedList = 0;
      
      // var pageCount = this.GetDataGrid(this.dxDataGridRef).pageCount();
      // console.log('this.pageIndex : ' + pageCount)
      // pageCount = 1;

      // console.log('this.pageIndex after : ' + pageCount)

      // this.SetDataGrid(this.dxDataGridRef).pageCount = 0
    },
    //------------------------------------------
    //  프로그램 저장 
    //------------------------------------------
    async btnSave() {
      
      this.gridMainInstance.saveEditData()
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      
      this.GetDataGrid(this.dxDataGridRef)
        .getSelectedRowsData()
        .then(selectedRows => {
          if (selectedRows.length === 0) {
            this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
            return
          }
          
        //유효성 체크
        for (var row of selectedMainRows) {
          if (!row.mainClass || !row.middleClass) {
            this.vToastify('필수항목 입력하세요.[대분류, 중분류]', 'warn')
            return
          }
        }

          this.vToastifyPrompt(
            this.$t('doSaveData'),
            'info',
            current => {
              this.GetDataGrid(this.dxDataGridRef).beginUpdate()
              this.GetDataGrid(this.dxDataGridRef).saveEditData()

              this.openLoading('저장중')    
              
             saveMatGroup(selectedRows, true)
                .then(res => { 
                    // getMatGroup()
                    //   .then(res => {
                        
                        
                    //     this.gridInit(this.GetDataGrid(this.dxDataGridRef))
                    //     this.programs = res.listResponse.list
                    //     let index = this.programs.findIndex(e => e.mainClass === 'dashboard')
                    //     let top = this.programs.find(e => e.middleClass === 'dashboard')
                    //     this.programs.splice(index, 1)
                    //     this.programs.unshift(top)

                    //     }
                    //   )
                    //   .catch()
                    //   .finally(() => {
                    //     this.endLoading()
                    //   })
                  }) 
                .catch(error => {})
                .finally(() => {
                  this.GetDataGrid(this.dxDataGridRef).endUpdate()
                  this.endLoading()
                   notify("저장완료", 'success', 1500)
                  this.btnSearch()
                })
            },
            null,
            true
          )
          
        })
    },
    
    //------------------------------------------
    //  프로그램 삭제
    //------------------------------------------
    btnDelete() {
      this.GetDataGrid(this.dxDataGridRef)
        .getSelectedRowsData()
        .then(selectedRows => {
          if (selectedRows.length === 0) {
            this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
             this.GetDataGrid(this.dxDataGridRef).endUpdate()
            return
          }

        this.vToastifyPrompt(
          '품목그룹을 삭제하시겠습니까?',
          'info',
          current => {
            this.GetDataGrid(this.dxDataGridRef).beginUpdate()
            this.GetDataGrid(this.dxDataGridRef).saveEditData()

            this.openLoading('삭제중')

            deleteMatGroup(selectedRows)
              .then(res =>
              
               { 
                 this.deleteCallBack(selectedRows)
               

                notify("삭제.", 'success', 1500)
               })
               
              .catch()
              .finally(() => {
                this.GetDataGrid(this.dxDataGridRef).endUpdate()
                this.endLoading()
               
              })
          },
          null,
          true
        )
          
        })
    },
    ///////////////////////////////////////
    /*        DataGrid Event Event       */
    ///////////////////////////////////////
    onCheckValueChanged(value, cellInfo) {
      cellInfo.setValue(cellInfo.value === 'Y' ? 'N' : 'Y')
      this.gridData.selectRows(cellInfo.row.key, true)
      cellInfo.component.updateDimensions()


    },

    onEditorPreparing(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        if (e.dataField == 'minorCd') e.editorOptions.readOnly = !e.row.data.isCreated
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

    // // 메뉴 아이콘 안의 아이콘 변경시
    // onProgIconChanged(value, cellInfo) {
    //   cellInfo.setValue(value)
    //   this.gridData.selectRows(cellInfo.row.key, true)
    //   cellInfo.component.updateDimensions()
    //   this.gridData.saveEditData()
    // },

    //v-text-field에 입력된 값을 api로 넘겨줄 검색어 searchsearchParam으로 설정
    changeInput(value) {
      this.mainClassTxt = value
    },

    changeInput_middle(value) {
      this.middleClassTxt = value
    },

    ///////////////////////////////////////
    /*             etc Event             */
    ///////////////////////////////////////
    deleteCallBack(selectedRows) {
      var index = null
      selectedRows.forEach(key => {
        index = this.programs.findIndex(obj => obj == key)
        this.programs.splice(index, 1)
     
      })
    },

    onEditingStart(e) {
     
      if (e.column.dataField == 'mainClass' && !e.data.__created__  || e.column.dataField == 'middleClass' && !e.data.__created__  ) e.cancel = true
    
       
      else e.cancel = false
    },

    onSelectionChanged(e) {
    
    },



  }
}
</script>

<style lang="scss">

</style>