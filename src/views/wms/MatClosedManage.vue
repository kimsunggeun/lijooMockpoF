<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', 
            'btnAdd',
            'btnSave',
            'btnDelete'
          ]"
        
          @btnSearch="btnSearchMain()"
          @btnAdd="btnAddMain()"
          @btnSave="btnSaveMain()"
          @btnDelete="btnDeleteMain()"
      
        >
          <template v-slot:body>
            <v-layout column>
         
              <v-row no-gutters class="center pa-2 pb-0">
                <span class="px-1 pt-1">{{'월마감:'}}</span>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
  
                    :value="monthDtFrom"
                    :max="monthDtTo"
                    height="30px"
                    display-format="yyyy-MM"
                    :acceptCustomValue="false"
                    @value-changed="e => {monthDtFrom = e.value && getDateFormat(e.value)}"
                  >
                  <DxCalendarOptions max-zoom-level="year" min-zoom-level="decade" zoom-level="year"/>
                  </DxDateBox>
                </v-col>
                <p>~</p>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                  
                    :value="monthDtTo"
                    :min="monthDtFrom"
                    height="30px"
                    display-format="yyyy-MM"
                    :acceptCustomValue="false"
                    @value-changed="e => {monthDtTo = e.value && getDateFormat(e.value)}"
                  >
                    <DxCalendarOptions max-zoom-level="year" min-zoom-level="decade" zoom-level="year"/>
                  </DxDateBox>
                </v-col>
                <v-col cols="1" class="pt-1" style="text-align: center;">
                  <span class="px-1 pt-1" >{{'마지막 마감 월:'}}</span>
                </v-col>
                <v-col cols="3">
                <p class="bolder">{{lastDate}}</p>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical headerTitle="월 마감 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="matClosedManage"
                    class="layout-col-height4"
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
                    @editor-preparing="onEditorPreparingMain"
                    @focused-row-changed="onFocusedRowChanged"
                  >
                    <DxColumn  data-field="monthDt" caption="월 마감" data-type="date"  format="yyyy-MM" edit-cell-template="date_max"  alignment="center" css-class="devest-grid-header-require"/>
                    <template #date_max="{ data: cellInfo }">

                   <DxDateBox
                    :value="cellInfo.value"
                    display-format="yyyy-MM"
                    :show-clear-button="true"
                    @value-changed="e => {
                      onValueChanged(e,cellInfo)
                      cellInfo.component.selectRows(cellInfo.row.key, true)
                    }"
                  >
                   <DxCalendarOptions max-zoom-level="year" min-zoom-level="decade" zoom-level="year"/>
                   </DxDateBox>
                    </template>

                    <DxColumn data-field="hrId" caption="작성자" width="150px" data-type="string" alignment="center" css-class="devest-grid-header-require">
                      <DxLookup
                        :data-source="hrIdLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                    </DxColumn>


                   

                    <DxColumn data-field="remark" caption="비고" width = '900px' data-type="string" alignment="left" />

                    <DxColumn data-field="createdAt" caption="생성일시"  data-type="string"  alignment="center" :allow-editing="false"  >
               
                    </DxColumn>

                    <DxColumn data-field="createdBy" caption="생성자" data-type="string" alignment="center" :allow-editing="false"  />

                    <DxColumn data-field="updatedAt" caption="수정일시" data-type="string"  alignment="center"  :allow-editing="false"  />

                     <DxColumn data-field="updatedBy" caption="수정자" data-type="string" alignment="center" :allow-editing="false"  />
          

                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical headerTitle="월 마감 품목 리스트"
                     :useBtnList="[
                      'btnSave',]"
                      @btnSave ="btnSaveDetail()"
        >
      
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="matClosedManageDetail"
                    class="layout-col-height4"
                    :ref="dxDataGridDetailRef"
                    :data-source="gridDetail"
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
                    @editor-preparing="onEditorPreparingDetail"
                  >


                  <DxColumn  data-field="monthDt" caption="월 마감" data-type="string" alignment="center" :allow-editing="false"/>
                  <DxColumn  data-field="mainClass" caption="품목 대분류" data-type="string" alignment="left" :allow-editing="false"/>
                  <DxColumn  data-field="middleClass" caption="품목 중분류" data-type="string" alignment="left" :allow-editing="false"/>

                  <DxColumn
                      data-field="matCd"
                      caption="품목"
                      width="300px"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"     
                       :calculate-display-value="e => {
                        let item = e.matCd && matCdLookUp.find(el => el.matCd == e.matCd)
                        return item && item.matNm
                      }"
                      :calculate-filter-expression="lookupColumnFilterExpression"     
                    >
                    </DxColumn>
                   

                    <DxColumn data-field="preQty" caption="전월 수량" width = '150px' data-type="number" alignment="right"  :allow-editing="false" />

                    <DxColumn data-field="currQty" caption="금월 수량"  width = '150px' data-type="number" alignment="right" :allow-editing="false"   >
               
                    </DxColumn>

                    <DxColumn data-field="qty" caption="마감수량" data-type="number" alignment="right" :allow-editing="false"  />

             
                   <DxColumn width="600px" data-field="remark" caption="비고" data-type="string" alignment="left" />
                 




                   <DxSummary
                      :calculate-custom-summary="options => {
                        
                        if(options.name == 'setSize') {
                          switch(options.summaryProcess) {
                            case 'start':
                              options.set = new Set()
                              break;
                            case 'calculate':
                              options.set.add(options.value)
                              break;
                            case 'finalize':
                              options.totalValue = options.set.size
                              break;
                          }
                        }
                      }"
                    >
                      <DxTotalItem
                        name="setSize"
                        column="matCd"
                        value-format="fixedPoint"
                        display-format="총 품목 갯수:{0}"
                        summary-type="custom"
                      />
                      <DxTotalItem
                        column="qty"
                        value-format="fixedPoint"
                        display-format="총수량:{0}"
                        summary-type="sum"
                      />
                      <DxTotalItem
                        column="preQty"
                        value-format="fixedPoint"
                        display-format="총 개수:{0}"
                        summary-type="sum"
                      />
                      <DxTotalItem
                        column="currQty"
                        value-format="fixedPoint"
                        display-format="총 개수:{0}"
                        summary-type="sum"
                      />
                  </DxSummary>

                 
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
import { DxDataGrid, DxColumn, DxLookup,DxTotalItem,DxSummary } from 'devextreme-vue/data-grid'

import {DxCalendarOptions,DxDateBox} from 'devextreme-vue/date-box'

import ICardTop from '@/components/common/iCardTop.vue'

import ICardVertical from '@/components/common/iCardVertical.vue'



import ISystemBar from '@/components/common/iSystemBar.vue'


import baseview from '@/components/base/baseview.vue' // base page 추가

import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
getWmsMatClosed,
getWmsMatClosedDetail,
getWmsMatClosedLastMonth,
saveWmsMatClosed,
deleteWmsMatClosed,
saveWmsMatClosedDetail,
saveWmsMatClosedDetail_case

} from '@/api/kier/wms/matClosedManage'

import { getStdComboPartnerEmployee } from '@/api/kier/standard/partnerEmployeeManage'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'
import { getComboHrManage } from '@/api/kier/standard/hRManage'
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'

export default {
  name: 'matClosedManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,

    DxLookup,
    DxDateBox,    

    DxCalendarOptions,
    DxSummary,
    DxTotalItem
  },
  data() {
    return {
      sampleDT: '',
      dxDataGridMainRef: 'matClosedManage',
      dxDataGridDetailRef: 'matClosedManageDetail',
      gridMain: [],
      gridDetail: [],
      monthDt:'',
      hrIdLookUp:[],
      matCdLookUp:[],
      monthDtFrom: getPreMonth(3),
      monthDtTo: getPreMonth(0),
      focusedRowData: null,
      lastDate:'',
      mountedlast:getPreMonth(1)
  
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.dxDataGridDetailRef)
    }
  },


  mounted(){
    this.btnSearchMain()
    
  },


  beforeMount() {

     let params = {
       
      }

    Promise.all([
      getComboHrManage(),
      getComboStdMatManage(),
      getWmsMatClosedLastMonth(params)

    ])
      .then( res => {

        this.hrIdLookUp = res[0].listResponse.list
        this.matCdLookUp = res[1].listResponse.list

         if(this.lastDate == null || this.lastDate == '' ||this.lastDate == undefined){
          this.lastDate = "마지막 마감월이 없습니다."
        }
      
      
     
       
 
      })
      .catch(error => {})

      
  },
  methods: {
onValueChanged(e,cellInfo){
 
  if(String(e.value).length == 42){
   cellInfo.setValue(e.value)
   }
   else{cellInfo.setValue(e.value = null)}
},
  
    slastDate(){
      let params = {
        
      }

     getWmsMatClosedLastMonth(params)
        .then(res => {
        if(res.listResponse.list[0] == null){
              this.lastDate = "마지막 마감월이 없습니다."
            }
        else{ this.lastDate = res.listResponse.list[0].lastMonth
           .replace(/^(\d{0,4})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g, "");
        }
        }
        )
    
    },

















    






    getDateFormat(date) {
      return getDateFormat(date)
    },

     onFocusedRowChanged(e) {
      this.focusedRowData = e.row && e.row.data
      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        this.gridDetail = []
        return
      }
      this.monthDt = e.row.data.monthDt




      this.openLoading('searching')
      this.doSearchDetail(e.row.data.monthDt)
        .finally(() => {
          this.endLoading()
        })
    },


   
    
    onEditorPreparingMain(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'hrId':
            e.editorOptions.readOnly = e.row.data.isCreated == null
             break;
          case 'monthDt':
            e.editorOptions.readOnly = e.row.data.isCreated == null
             break;
          
          default:
            break;
        }
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          if (e.dataField == 'partnerId') this.gridMainInstance.refresh()
          defaultValueChangeHandler(args)
        }
      }
      
    },

    onEditorPreparingDetail(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          
          default:
            break;
        }
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          defaultValueChangeHandler(args)
        }
      }
    },

  
    

  async  btnSearchMain() {
      this.openLoading('searching')
      this.doSearchMain(true)
        .finally(() => {
          this.endLoading()
        })
    },

    doSearchMain(isProgress) {
      let params = {

        monthDt:'',
        monthDtFrom: this.monthDtFrom.substring(0,7).replace(/-/g,''),
        monthDtTo: this.monthDtTo.substring(0,7).replace(/-/g,''),

      }

      this.gridInit()
      return getWmsMatClosed(params, isProgress)
        .then(res => {
       
        
          this.gridMain = res.listResponse.list
          if(this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
          
           for(var asd of this.gridMain){
               asd.monthDt = asd.monthDt.replace(/^(\d{0,4})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g, "");
               if(asd.updatedAt != null){ asd.updatedAt = asd.updatedAt.substring(0,16)}
               if(asd.createdAt != null){ asd.createdAt = asd.createdAt.substring(0,16)}
         
              }

         
          
          this.slastDate()


        })
        .finally(() => {
              this.slastDate()
            })
    },




    


  
    async btnSaveMain() {
      this.gridMainInstance.saveEditData()
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      if (selectedMainRows.length >= 2) {
        this.vToastify(this.$t('저장은 한 행만 가능합니다.'), 'warn')
        return
      }

        for (var save of selectedMainRows){
          if(save.hrId == null || ''){
          this.vToastify(this.$t('작성자를 입력해주세요'), 'warn')
          return
          }

        else if(save.monthDt == null || ''){
         
          this.vToastify(this.$t('월마감을 입력해주세요'), 'warn')
          return
          }


      if(this.lastDate != "마지막 마감월이 없습니다."){
        let now = new Date(this.lastDate)
        let twoMonthLater = new Date(now.setMonth(now.getMonth()+2))
     

        if(save.isCreated === true){
         if(Number(save.monthDt.replace(/-/g,'').substring(0,6)) < Number(this.lastDate.replace(/-/g,'')) == true){
          this.vToastify(this.$t(
          `
          ${save.monthDt.substring(0,7)}월을 생성할 수 없습니다.<BR>
          ${this.lastDate}월보다 전월이면 삭제할 수 없습니다.<bR>
          ${this.lastDate}월을 삭제해 주십시오.
          `), 'warn')
          return
          }

         if(new Date(save.monthDt) > twoMonthLater  == true){

          this.vToastify(this.$t(
          `
          ${save.monthDt.substring(0,7)}월을 생성할 수 없습니다.<BR>
          ${this.lastDate}월 익월이 생성이 되어있지 않습니다<bR> 
          `), 'warn')
          return
          }
        }
        }

       }
  

      
      this.vToastifyPrompt(
        this.$t('월 마감을 진행 하시겠습니까?'),
        'info',
        current => {
       

          selectedMainRows[0].monthDt = selectedMainRows[0].monthDt.substr(0,7).replace(/-/g,'')

       
      
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveWmsMatClosed(selectedMainRows, true)
            .then(res => {
            this.sampleDT = selectedMainRows[0].monthDt.substr(0,7).replace(/-/g,'')
             saveWmsMatClosedDetail_case(selectedMainRows,this.sampleDT,true)
          })

            .finally(() => {
                this.doSearchMain(false)
              this.slastDate()
              this.gridMainInstance.endUpdate()
              this.endLoading()
              this.slastDate()
            })
  
        },
        null,
        true
      )

    },

    btnAddMain() {
      let newRow = {
        id: this.gridMain.length + 1,
        monthDt:this.monthDtTo,
        isCreated: true
      }
      this.gridMainInstance.newRow(newRow)
      this.gridMainInstance.selectRows(newRow.id, true)
      this.gridMainInstance.option('focusedRowIndex', -1)
    },


    




    
    async btnDeleteMain() {
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

       if (selectedMainRows.length >= 2) {
        this.vToastify(this.$t('삭제는 한 행만 가능합니다.'), 'warn')
        return
      }

      for (var del of selectedMainRows){

          if(Number(del.monthDt.replace(/-/g,'')) < Number(this.lastDate.replace(/-/g,'')) == true){
          this.vToastify(this.$t(
          `
          ${del.monthDt.replace(/^(\d{0,4})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g, "")}월을 삭제할 수 없습니다.<BR>
          ${this.lastDate}월보다 전월이면 삭제할 수 없습니다.<bR>
          ${this.lastDate}월을 삭제해 주십시오.
          `), 'warn')
          return
          }

        }

   



      this.vToastifyPrompt(
        this.$t('해당 월을 삭제하시겠습니까?'),
        'info',
        current => {
           selectedMainRows[0].monthDt = selectedMainRows[0].monthDt.substr(0,7).replace(/-/g,'')
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          deleteWmsMatClosed(selectedMainRows.filter(row => !row.isCreated), true)
            .then(res => {
              
              this.doSearchMain(false)
                        this.slastDate()
               
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
                          this.slastDate()
              this.endLoading()
     
            })
        },
        null,
        true
      )
    },

    doSearchDetail(monthDt) {
      let params = {
        
          monthDt:monthDt.substring(0,7).replace(/-/g,''),
      } 

      return getWmsMatClosedDetail(params, false)
        .then(res => {
  
          this.gridDetailInit()
          this.gridDetail = res.listResponse.list
          this.gridDetailInstance.option('focusedRowIndex', 0)
          
           for(var monthDt of this.gridDetail){
               monthDt.monthDt = monthDt.monthDt.replace(/^(\d{0,4})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g, "");
              }
        })
    },

async btnSaveDetail() {
     
      this.gridDetailInstance.saveEditData()
      var selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      //유효성 체크

      for(var saveDetail of selectedDetailRows){
         saveDetail.monthDt = saveDetail.monthDt.replace(/-/g,'')

      }
 

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          saveWmsMatClosedDetail(selectedDetailRows, true)
            .then(res => {
              this.doSearchDetail(this.focusedRowData.orderId)
              
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
    



   
   
  }
}
</script>

<style>
.bolder{
  font-weight: bold;
  font-size: 24px;
  padding-top: 2px;
  
  color: #FF5252;
}
</style>