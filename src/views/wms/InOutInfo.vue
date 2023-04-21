<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-2  pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
                     ]"
        
          @btnSearch="btnSearchMain()"
          
      
        >
          <template v-slot:body>
            <v-layout column>
               <v-row no-gutters class="center pa-2 pb-0">
              <v-col cols="12" md="3">
                
                
               <v-text-field
                  ref="cursor"
                  :value="idSearch"
                  label="바코드번호 :"
                  dense
                  outlined
                  autofocus
                  @focus="$event.target.select()"
                  @keydown.enter="btnSearchMain()"
                  :prepend-inner-icon="$t('$search')"
                  @change="changeInput"
                  clearable
                />
              </v-col>
             
                <span class="px-1 pt-1">{{'수불 일자:'}}</span>
                <v-col cols="1" class="pa-2 py-md-0">
                  
                  <DxDateBox
                    :value="matTransDtFrom"
                    :max="matTransDtTo"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {matTransDtFrom = e.value}"
                  />
                </v-col>
                <p>~</p>
                <v-col cols="1" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="matTransDtTo"
                    :min="matTransDtFrom"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {matTransDtTo = e.value}"
                  />
                </v-col>
                <v-col  cols="3">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    @change="changeInputMatCd"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="matNm"
                    item-value="matCd"
                    :prepend-inner-icon="$t('$search')"
                    :items="matList"
                    @keydown.enter="btnSearchMain()"
                    label="품목"
                    dense
                    clearable
                    outlined
                    v-model="matCd"
                   ></v-autocomplete>
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" >
        <i-card-vertical headerTitle="수불정보 리스트">
          
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="InOutInfo"
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
                  >
                    
                    <DxColumn  data-field="matTransNo" caption="수불 번호" width="180px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn  data-field="matTransDt" caption="수불 일자" width="100px" data-type="date"  alignment="center" format="yyyy-MM-dd" :allow-editing="false"/>
                    <DxColumn  data-field="matTransDiv" caption="수불 유형" width="100px" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup
                        :data-source="matTransDivListLook"
                        value-expr="code"
                        display-expr="desc"
                        :allow-editing="false"
                      />
                    </DxColumn>

                    <DxColumn  data-field="mainClass" caption="품목 대분류" width="120px" data-type="string" alignment="left" :allow-editing="false"/>
                    <DxColumn  data-field="middleClass" caption="품목 중분류" width="300px" data-type="string" alignment="left" :allow-editing="false"/>
                    <DxColumn data-field="matCd" caption="품목명" width="300px" data-type="string" alignment="left" :allow-editing="false"
                      :calculate-display-value="e => {
                        let item = e.matCd && matListLook.find(el => el.matCd == e.matCd)
                        return item && item.matNm
                      }"
                      :calculate-filter-expression="lookupColumnFilterExpression"
                    />


                    <DxColumn  data-field="barcodeNo" caption="바코드 번호" width="180px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn  data-field="qty" caption="수량" width="100px" data-type="number" alignment="right"  format="#,##0"  />
                    <DxColumn  data-field="price" caption="입고 금액" width="150px" data-type="number" alignment="right" format="#,##0" :allow-editing="false"/>
                    <DxColumn  data-field="price2" caption="출고 금액" width="150px" data-type="number" alignment="right" format="#,##0" :allow-editing="false"/>
                    <DxColumn  data-field="invoiceId" caption="거래명세서 ID" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn  data-field="invoiceSeq" caption="거래명세서 순번" width="120px" data-type="number" alignment="center" :allow-editing="false"/>
                    <DxColumn  data-field="orderId" caption="출하의뢰 ID" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn  data-field="orderSeq" caption="출하의뢰 순번" width="150px" data-type="number" alignment="center" :allow-editing="false"/>
                    <DxColumn  data-field="remark" caption="비고" width="200px" data-type="string" alignment="center" :allow-editing="false"/>
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
                        column="matTransNo"
                        value-format="fixedPoint"
                        display-format="행 수:{0}"
                        summary-type="count"
                      />
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
                        display-format="총 수량:{0}"
                        summary-type="sum"
                      />
                      <DxTotalItem
                        column="price"
                        value-format="fixedPoint"
                        display-format="총 금액:{0}"
                        summary-type="sum"
                      />
                      <DxTotalItem
                        column="price2"
                        value-format="fixedPoint"
                        display-format="총 금액:{0}"
                        summary-type="sum"
                      />
                    </DxSummary>
                  <DxPaging :enabled="true" :page-size="18"/>
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
import { DxDataGrid, DxColumn, DxLookup,DxSummary,DxTotalItem, DxPager,DxPaging, } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import DxDateBox from 'devextreme-vue/date-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import DxDropDownBox from 'devextreme-vue/drop-down-box'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getInOutInfo,
  getComboInOutInfo

} from '@/api/kier/wms/inOutInfo'

import { getCommonCode } from '@/api/kier/standard/commonCodeManage'


import { getDateFormat, getCurrentDate, getPreMonth,getPreDay} from '@/utils/common.js'

export default {
  name: 'InOutInfo',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    DxSummary,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxLookup,
    DxDateBox,
  
  
    DxTotalItem
  },
  data() {
    return {

      pageSizes: [18, 'all'],
      showPageSizeSelector: true,
      showInfo: true,
      showNavButtons: true,
   

      dxDataGridMainRef: 'InOutInfo',

      gridMain: [],
    
    
      matTransDtFrom: getPreMonth(1),

      matTransDtTo: getPreMonth(-1),

      matList: [],

      matListLook:[],

      matTransDivListLook:[],

      matCd:'',

      focusedRowData: null,

      idSearch:'',

      datae:[],
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    },
  
  },
  activated() {
    if(this.$route.params.fromDashboard) {
      
      this.matTransDtFrom = getPreMonth(1)
      this.matTransDtTo = getCurrentDate()
      this.matCd = ''
      this.btnSearchMain()
    }
  },
  beforeMount() {

      let params = {
        matTransNo:''
      }
    Promise.all([

    getComboInOutInfo(params),
    //  getInOutInfo(params),
     getComboStdMatManage(),
     getCommonCode('S0012')
    ])
      .then( res => {

        
       this.matListLook = res[1].listResponse.list.slice()

       this.matList = res[0].listResponse.list.slice()


       this.matList.unshift({matNm:'전체',matCd:''})



       this.matTransDivListLook = res[2].listResponse.list.slice()
      
      })
      .catch(error => {})
  },
  methods: {
    getDateFormat(date) {
      return getDateFormat(date)
    },
    stratCursor(){
      this.$refs.cursor.focus()
    },

     
    btnSearchMain() {
      this.stratCursor()
  


    
     

      this.openLoading('searching')
      this.doSearchMain(true)
        .finally(() => {
          this.endLoading()
      

        })

    },


    doSearchMain(isProgress) {
    
      let params = {
        barcodeNo:this.idSearch,
        matCd: this.matCd,
        matTransDtFrom:this.matTransDtFrom.replace(/-/g,'') ,
        matTransDtTo:this.matTransDtTo.replace(/-/g,''),

      }
      

      
        

      this.gridInit()
      return getInOutInfo(params, isProgress)
        .then(res => {

            if(params.barcodeNo != '' || params.barcodeNo != null){
            params.matCd = ''
            params.matTransDtFrom = ''
            params.matTransDtTo = ''
            }
          
          
          this.gridMain = res.listResponse.list

          
          
          if(this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
            
            for(var asd of this.gridMain){
    
            if(asd.matTransDiv == "IN_CANCLE"||asd.matTransDiv == "OUT"){ 
              asd.qty = asd.qty * -1
              asd.price2 = asd.price
              asd.price= null
              }

              }

            


      
                  
         })
         

   
    },

    

   







   
 
   


    gridMainInit() {
      this.gridMainInstance.clearSelection()
      this.gridMainInstance.cancelEditData()
      this.gridMainInstance.option('focusedRowIndex', -1)
    },

   

    gridInit() {
      this.gridMainInit()
    },
    
     changeInput(value) {
      this.idSearch = value
    },
     changeInputMatCd(value) {
      this.matCd = value
    },

    
  }
}
</script>



