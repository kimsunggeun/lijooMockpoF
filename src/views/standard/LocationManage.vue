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
                  <v-select
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="desc"
                    item-value="code"
                    :prepend-inner-icon="$t('$search')"
                    :items="locationType"
                    label="Location 타입"
                    dense
                    @change="changeInput"
                    outlined
                    v-model="locationSelectTypeSelectedDiv"
                  />
                
              </v-col>
                <v-col cols="12" md="2" sm="12" class="pa-2">
                  <v-select
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="row"
                    item-value="row"
                    :prepend-inner-icon="$t('$search')"
                    @change="changeInputRow"
                    :items="row"
                    label="Rack 행"
                    dense
                    outlined
                    v-model="rackSelectTypeSelectedDiv"
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
        <i-card-vertical headerTitle="Location 리스트">

    
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="row pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="locationManage"
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
                    :show-row-lines="true"
                    :focused-row-enabled="true"
                    key-expr="id"
                    @editor-preparing="onEditorPreparing"
                  >
                   
                    <DxSelection :select-all-mode="allMode" show-check-boxes-mode="always" mode="multiple" />
                    
                    <DxColumn data-field="locationId" data-type="string" caption="Location ID" width="160px" alignment="center" :allow-editing="false">
                      
                    </DxColumn>

                    <DxColumn data-field="locationType" caption="Location 타입" width="160px" alignment="center" 
                       css-class="devest-grid-header-require"
                       :set-cell-value="(newData, value) => {
                        newData.locationType = value
                        newData.row = null
                        newData.col = null
                        newData.lev = null
                        newData.area = null
                      }">
                      <DxLookup :data-source="locationType_list" display-expr="desc" value-expr="code"   />
                    </DxColumn>

                    <DxColumn  css-class="devest-grid-header-require"  data-field="row" data-type="string" caption="RACK 행"  alignment="center" />
                        
                     <DxColumn  css-class="devest-grid-header-require" data-field="col" data-type="string" caption="RACK 열" alignment="center" />

                     <DxColumn  css-class="devest-grid-header-require" data-field="lev" data-type="string" caption="RACK 단" alignment="center" />
                
                   <DxColumn css-class="devest-grid-header-require" data-field="area" caption="Area" width="160px" alignment="center">
                      <DxLookup :data-source="area_list" display-expr="desc" value-expr="code" />
                    </DxColumn>
                   <DxColumn data-field="locStatus" caption="상태" width="160px" alignment="center">
                     <DxLookup :data-source="locStatusList" display-expr="desc" value-expr="code" />
                    </DxColumn>
                    
                    <DxColumn
                      data-field="useYn" data-type="boolean" caption="사용 여부" alignment="center" width="90px" edit-cell-template="checkBoxEditor"/>
                    <DxColumn 
                      data-field="delYn" data-type="boolean" caption="삭제 여부" alignment="center"  width="90px" edit-cell-template="checkBoxEditor"/>
                    <DxColumn 
                       caption="" alignment="center"  width="600px" edit-cell-template="checkBoxEditor" :allow-editing="false"  >
                    </DxColumn>
                         
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>


                  <DxPaging :enabled="true" :page-size="19"/>
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


import DxSelectBox from 'devextreme-vue/select-box'

import notify from 'devextreme/ui/notify' // message

import { getLocation,saveLocation,deleteLocation} from '@/api/kier/standard/LocationManage'


import {  DxColumn,  DxLookup,DxPaging,DxPager } from 'devextreme-vue/tree-list'

import baseview from '@/components/base/baseview.vue'

import BaseDataGrid from '@/components/base/BaseDataGrid.vue'

import { getCommonCode } from '@/api/kier/standard/commonCodeManage'

import ISystemBar from '@/components/common/iSystemBar.vue'








export default {
  mixins: [BaseDataGrid , baseview],
   components: {
 
    DxColumn,
    // eslint-disable-next-line vue/no-unused-components
    ISystemBar,
   DxPaging,
   DxPager,
    DxLookup

  },
  data() {
    return {
      pageSizes: [19, 'all'],
      showPageSizeSelector: true,
      showInfo: true,
      showNavButtons: true,
      dxDataGridMainRef: 'locationManage',
      gridMain: [],
      toggleDelYn: 'N',

      mainClassTxt: '',
      middleClassTxt: '',

      locationType:[],
      locationType_list:[],

      buttonUseList: [
        'btnSearch', //조회
        'btnAdd', //추가
        'btnSave', //저장
        'btnDelete' //삭제
      ],
      iconListDataSource: [],
      svcGubnDataSource: [],
      svsTypeDataSource: [],
      area_list:[],
      locStatusList:[],


    row:[],
    
      locationSelectTypeSelectedDiv:'',
      rackSelectTypeSelectedDiv:'',


      allMode: 'allPages'
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    }
  },
 beforeMount() {

      
       let searchParam = {
        locationType: this.locationSelectTypeSelectedDiv,
        row:this.rackSelectTypeSelectedDiv,
        delYn: this.toggleDelYn
      }

    Promise.all([getCommonCode('S0007')
                ,getCommonCode('S0008')
                , getLocation(searchParam)
                ,getCommonCode('S0017'),])
      .then( res => {
      
      
        
      
      
        this.locationType = res[0].listResponse.list.slice()

        this.locationType.unshift({ code: '', desc: '' })


        this.locationType_list = res[0].listResponse.list.slice()



        
        this.area_list = res[1].listResponse.list.slice()


        
        this.row = res[2].listResponse.list.slice().filter(el=>el.row != null)
        this.row.unshift({ row: '',}) 

        this.locStatusList = res[3].listResponse.list.slice()
        

       
      
      
       
     

      })
      .catch(error => {})
  },

  // mounted() {
  //   // // 켜질때 조회
  //   // this.btnSearch()
     
  // },



  methods: {

  
    ///////////////////////////////////////
    /*       Toolbar Button Event        */
    ///////////////////////////////////////
    //------------------------------------------
    //  프로그램 조회
    //------------------------------------------
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

    btnSearch() {
      this.openLoading('searching')
      this.doSearchMain(true)
        .finally(() => {
          this.endLoading()
           notify("조회되었습니다.", 'success', 1500)
        })
    },

    doSearchMain() {
      let searchParam = {
        
        locationType: this.locationSelectTypeSelectedDiv,
        row:this.rackSelectTypeSelectedDiv,
        delYn: this.toggleDelYn

      }

      this.gridInit()
      return getLocation(searchParam)
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
          var index = selectedMainRows.findIndex(
                  element =>
                  element.locationType == null ||
                  element.locationType == ''

              )

            var Rack = selectedMainRows.findIndex(el=>el.locationType == 'RACK')

            var RackStop = selectedMainRows.findIndex(el=>
                el.row == null||
                el.col == null||
                el.lev == null||
                el.lev == ''||
                el.lev == ''||
                el.lev == ''
                )
        
            var Area = selectedMainRows.findIndex(el=>el.locationType == 'AREA')

            var AreaStop = selectedMainRows.findIndex(el=>el.area == '' || el.area == null )
          
            if(Rack >= 0){
                if(RackStop >= 0){
                 this.vToastify(this.$t('필수항목 입력하세요.[Rack,행,열,단]'), 'warn')
                this.gridMainInstance.endUpdate()
                return
                }
            }
            if(Area >=0){
              if(AreaStop >= 0){

                 this.vToastify(this.$t('필수항목 입력하세요.[AREA]'), 'warn')
                this.gridMainInstance.endUpdate()
                return
                }
            }
           if (index >= 0) {
              this.vToastify(this.$t('필수항목 입력하세요.[Location 타입]'), 'warn')

                this.gridMainInstance.endUpdate()
                return
              }


      
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveLocation(selectedMainRows, true)
            .then(res => {
              this.doSearchMain(false)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
              notify("저장완료", 'success', 1500)
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
          deleteLocation(selectedMainRows.filter(row => !row.isCreated), true)
            .then(res => {
             this.doSearchMain(false)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
              notify("삭제완료", 'success', 1500)
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
      this.locationSelectTypeSelectedDiv = value
      
    },
    changeInputRow(value) {
      this.rackSelectTypeSelectedDiv = value
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


      //표막기

    onEditorPreparing(e) {
    
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'row':
            e.editorOptions.readOnly = e.row.data.locationType == 'AREA' || !e.row.data.isCreated || e.row.data.locationType == null || e.row.data.locationType == 'AREA'
            break;


          case 'col':
            e.editorOptions.readOnly = e.row.data.locationType == 'AREA' || !e.row.data.isCreated|| e.row.data.locationType == null 
        
            break;
          case 'lev':
            e.editorOptions.readOnly = e.row.data.locationType == 'AREA' || !e.row.data.isCreated|| e.row.data.locationType == null 
            
            break;
          case 'area':
            e.editorOptions.readOnly = e.row.data.locationType == 'RACK' || e.row.data.locationType == null 
           
            break;

           case 'locationType':
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








  }
}
</script>

<style lang="scss">

</style>