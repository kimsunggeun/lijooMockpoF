<template>
  <v-container fluid fill-height align-start>
    <v-row>
      <v-col cols="12" sm="12" lg="12" class="pa-0 pb-0">
        <i-card-top 
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
            'btnSave', //저장
          ]"
          @btnSearch="btnSearchMain()"
          @btnSave="btnSaveMain()"
        >
          <template v-slot:body>
            <v-layout column>
               <v-row no-gutters class="center pa-2 pb-0">
              <v-col cols="12" md="3">
               <v-text-field
               ref="cursor"
                  :value="idSearch"
                  label="거래명세서 ID:"
                  dense
                  autofocus
                  @focus="$event.target.select()"
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @change="changeInput"
                  @keydown.enter="btnSearchMain()"
                  clearable
                />
              </v-col>
             
                <span class="px-1 pt-1 ml-2">{{'도착 예정일:'}}</span>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="etaFrom"
                    :max="etaTo"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {etaFrom = e.value && getDateFormat(e.value)}"
                  />
                </v-col>
                <p>~</p>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="etaTo"
                    :min="etaFrom"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {etaTo = e.value && getDateFormat(e.value)}"
                  />
                </v-col>
                <v-col cols="12" md="2">
                  <v-select
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="desc"
                    item-value="code"
                    :prepend-inner-icon="$t('$search')"
                    :items="partnerIdList"
                    label="파트너"
                    dense
                    outlined
                    v-model="partnerId"
                  />
                </v-col>
                <span style="width: 164px;" class="pa-2 py-md-0">
                  <v-switch
                    v-model="delYnMain"
                    true-value="Y"
                    false-value="N"
                    :label="`삭제 데이터 조회`"
                    @change="btnSearchMain()"
                  />
                </span>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical headerTitle="거래명세서 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="cargoArrivalManage"
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
                    <DxColumn  data-field="invoiceId" caption="거래명세서 ID" width="150px" data-type="string" alignment="center" :allow-editing="false"/>

                    <DxColumn data-field="writeDt" caption="작성일" width="120px" data-type="date" alignment="center" format="yyyy-MM-dd" :allow-editing="false"/>

                    <DxColumn
                      data-field="partnerId"
                      caption="파트너"
                      width="220px"
                      data-type="string"
                      alignment="left"
                      css-class="devest-grid-header-require"
                      :allow-editing="false"
                      :set-cell-value="(newData, value) => {
                        newData.partnerId = value
                        newData.employeeId = null
                      }"
                      
                    >
                      <DxLookup
                        :data-source="partnerIdLookUp"
                        value-expr="code"
                        display-expr="desc"
                        :allow-editing="false"
                      />
                    </DxColumn>

                    <DxColumn data-field="employeeId" caption="직원" width="150px" data-type="string" alignment="center" css-class="devest-grid-header-require" :allow-editing="false">
                      <DxLookup
                        :data-source="(options) => {
                          return {
                            store: partnerEmployeeLookUp,
                            filter: options.data && Array('partnerId', '=', options.data.partnerId)
                          }
                        }"
                        value-expr="employeeId"
                        display-expr="korNm"
                      />
                    </DxColumn>

                     <DxColumn data-field="eta" caption="도착 예정일" data-type="date" alignment="center" format="yyyy-MM-dd" edit-cell-template="date_min" :allow-editing="false"/>
                    

                    <DxColumn data-field="ata" caption="도착 실제일"  data-type="date" alignment="center" format="yyyy-MM-dd"
                    edit-cell-template="date"
                  />
                  <template #date="{ data :cellInfo}">
                    <DxDateBox 
                    :value="cellInfo.value"
                    display-format="yyyy-MM-dd"
                     @value-changed="e => {
                        onValueChanged(e,cellInfo)
                      
                     
                    }"
                      />
                  </template>
            
                    <DxColumn data-field="status" caption="진행 상태" width="120px" data-type="string" alignment="center" :allow-editing="false"  >
                      <DxLookup
                        :data-source="statusLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                    </DxColumn>

                    

                    <DxColumn data-field="completeYn" caption="완료 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor" />

                    <DxColumn data-field="hrId" caption="입하 담당자"  data-type="string" alignment="center"  edit-cell-template="hrId">
                    <DxLookup
                        :data-source="hrManageList"
                        value-expr="code"
                        display-expr="desc"
                      />
                    </DxColumn>
                  
                       <template #hrId="{ data: cellInfo }">
                       <DxSelectBox
                          :data-source="hrManageList"
                          value-expr="code"
                          display-expr="desc"
                          placeholder="입하 담당자를 선택해주세요"
                          @value-changed="e => {
                            cellInfo.setValue(e.value)
                            cellInfo.component.selectRows(cellInfo.row.key, true)
                          }"
                        />
                         </template>
               

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left"/>

                    <DxColumn data-field="useYn" caption="사용 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>

                    <DxColumn data-field="delYn" caption="삭제 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox 
                        :value="cellInfo.value == 'Y' ? true : false"
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)"
                        
                      />
                      
                    </template>

                    <DxColumn data-field="onProgress" :visible="false"/>
                    <DxPaging :enabled="false"/>
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical headerTitle="거래명세서 품목 리스트"
           :useBtnList="[
            'btnSave'
          ]"
         @btnSave="btnSaveDetail()"
        >
            <template v-slot:switch>
            <v-switch class="ma-1"  v-model="delYnDetail" true-value="Y" false-value="N" :label="` 삭제 데이터 조회`" 
             @change="onDelYnDetailChange"
            />
          </template>
          <template v-slot:body>
            
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="cargoArrivalManageDetail"
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
                          <DxColumn data-field="poNo" caption="발주 번호"  width="150px" alignment="left" :allow-editing="false"/>
                          <DxColumn data-field="poSeq" caption="발주 순번" width="70px" alignment="center" :allow-editing="false"/>
                          <DxColumn data-field="mainClass" caption="품목 대분류" width="180px" alignment="left" :allow-editing="false"/>
                          <DxColumn data-field="middleClass" caption="품목 중분류" width="250px" alignment="left" :allow-editing="false"/>
                          <DxColumn data-field="matCd" caption="품목명" width="350px" data-type="string" alignment="left" :allow-editing="false"
                            :calculate-display-value="e => {
                              let item = e.matCd && matList.find(el => el.matCd == e.matCd)
                              return item && item.matNm
                            }"
                            :calculate-filter-expression="lookupColumnFilterExpression"
                          />
                          <DxColumn  data-field="reqQty" caption="요청 수량"  format="#,##0" data-type="number" width="80px" alignment="right" :allow-editing="false"/>
                           <DxColumn data-field="qty" format="#,##0" caption="공급 수량" data-type="number" width="80px" alignment="right" :allow-editing="false" />
                    <DxColumn data-field="price" format="#,##0" caption="공급가액" data-type="number" width="110px" alignment="right" :allow-editing="false"/>
                    <DxColumn data-field="inQty" format="#,##0" caption="실입고 수량" data-type="number"  width="80px" alignment="right" />
                       <DxColumn data-field="status" caption="진행 상태" width="120px" data-type="string" alignment="center" :allow-editing="false" >
                      <DxLookup
                        :data-source="prStatusLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                    </DxColumn>
                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />
                    <DxColumn data-field="useYn" caption="사용 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    <DxColumn 
                      data-field="delYn" data-type="boolean" caption="삭제 여부" alignment="center"  width="70px" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox 
                        :value="cellInfo.value == 'Y' ? true : false" 
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)"
                        
                      />
                      <!-- :read-only="focusedRowData && focusedRowData.status != 'STS01' || cellInfo.data.status != 'PRG_STS01'" -->
                    </template>
                    <DxPaging :enabled="false"/>
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
import { DxDataGrid, DxColumn, DxLookup, } from 'devextreme-vue/data-grid'
import DxSelectBox from 'devextreme-vue/select-box';
import DxCheckBox from 'devextreme-vue/check-box'
import DxDateBox from 'devextreme-vue/date-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import DxDropDownBox from 'devextreme-vue/drop-down-box'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getCargoArrival,
  getCargoArrivalDetail,
  saveCargoArrival,
  saveCargoArrivalDetail,
  getComboHrManage,
  getComboPartnerId,
  getComboPartnerIdWmsCargoArrival,
  getMaxMatClosed,
  saveCargoArrivalDetailPurchasingOrderInfo
} from '@/api/kier/wms/cargoArrivalManage'

import { getStdComboPartnerEmployee } from '@/api/kier/standard/partnerEmployeeManage'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'

import { getDateFormat, getCurrentDate, getPreDay } from '@/utils/common.js'

export default {
  name: 'CustomerOrderManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxCheckBox,
    DxLookup,
    DxDateBox,    
    DxSelectBox
    
  },
  data() {
    return {
      dxDataGridMainRef: 'cargoArrivalManage',
      dxDataGridDetailRef: 'cargoArrivalManageDetail',
      gridMain: [],
      gridDetail: [],
      partnerIdList: [],
      etaFrom: getPreDay(7),
      etaTo: getPreDay(-7),
      partnerId: '',
      delYnMain: 'N',
      delYnDetail: 'N',
      partnerIdLookUp: [],
      partnerEmployeeLookUp: [],
      statusLookUp: [],
      prStatusLookUp: [],
      matList: [],
      focusedRowData: null,
      idSearch:'',
      hrManageList:[],
      Mainata:'',
      lastMonth:''
      

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






  beforeMount() {
    
   let params = {
        invoiceId:'',
      }
    Promise.all([
      
      getComboPartnerId(),
      getStdComboPartnerEmployee(),
      getCommonCode('S0010'),
      getCommonCode('S0011'),
      getComboStdMatManage(),
      getComboHrManage(),
      getComboPartnerIdWmsCargoArrival(params),
      getMaxMatClosed(params)
    ])
      .then( res => {
        this.partnerIdList = res[6].listResponse.list.slice()
        this.partnerIdList.unshift({ code: '', desc: '전체' })
        this.partnerIdLookUp = res[6].listResponse.list.slice()
        this.partnerEmployeeLookUp = res[1].listResponse.list
        this.statusLookUp = res[2].listResponse.list.slice()
        this.statusLookUp.find(el => el.code == 'STS03').disabled = true
        this.prStatusLookUp = res[3].listResponse.list
        this.hrManageList =res[5].listResponse.list.slice()
        this.matList =res[4].listResponse.list.slice()
        this.lastMonth = res[7].listResponse.list
      })
      .catch(error => {})
  },



  methods: {
    getDateFormat(date) {
      return getDateFormat(date)
    },

  onValueChanged(e,cellInfo){
 
  if(String(e.value).length == 42){
   cellInfo.setValue(e.value)
   }
   else{cellInfo.setValue(e.value = null)}
},

    stratCursor(){
      this.$refs.cursor.focus()
    },
   

   
    
    onEditorPreparingMain(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
    
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          if (e.dataField == 'partnerId') this.gridMainInstance.refresh()
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

    onEditorPreparingDetail(e) {
        
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
       
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
        invoiceId:this.idSearch,
        partnerId: this.partnerId,
        etaTo: this.etaTo,
        etaFrom: this.etaFrom,
        ata:'',
        delYn: this.delYnMain
      }

      this.gridInit()
      return getCargoArrival(params, isProgress)
        .then(res => {
          this.gridMain = res.listResponse.list
          this.gridDetail = []
          if(this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
        })
    },

    

    async btnSaveMain() {
      
      this.gridMainInstance.saveEditData()
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      let patten = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/

      //유효성 체크
      for (var row of selectedMainRows) {
        // if (row.ata == null || row.ata == '') {
        //   this.vToastify('도착 실제일을 지정하셔야 저장이 가능합니다.', 'warn')
        //   return
        // }
     if(row.ata != undefined )
        {   
         if(!patten.test(row.ata.substring(0,10))){  
          this.vToastify('알맞은 도착 실제일 입력해주십시오 <br>예시: [2022-10-31]', 'warn')
           return
       
          }
        
          }



        if(this.lastMonth[0] != null && row.orgAta != null){
          if(Number(row.orgAta.substring(0,7).replace(/-/g,'')) <= Number(this.lastMonth[0].monthDt)){
          this.vToastify(this.$t(`저장할 수 없습니다.<BR>
            도착 실제일이 마감월인 ${this.lastMonth[0].monthDt.replace(/^(\d{0,4})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g, "")} 월 이거나 전월입니다.
            `), 'warn')
            return
          } 
        }

        
      

      }
      
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveCargoArrival(selectedMainRows, true)
            .then(res => {
              this.doSearchMain(false)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
              this.stratCursor()
            })
        },
        null,
        true
      )

    },


    onFocusedRowChanged(e) {
      if(e.row != undefined){
        this.focusata = e.row.data.orgAta
      }

      
    
  

      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        this.gridDetail = []
        return
      }
      
      this.focusedRowData = e.row && e.row.data

      this.openLoading('searching')

      this.doSearchDetail(e.row.data.invoiceId)
        .finally(() => {
          this.endLoading()
        })
    },
    
    onDelYnDetailChange(val) {
      if(this.focusedRowData && !this.focusedRowData.isCreated) {
        this.openLoading('searching')
        this.doSearchDetail(this.focusedRowData.invoiceId)
          .finally(() => {
            this.endLoading()
          })
      }
    },

    doSearchDetail(invoiceId) {
      let params = {
        invoiceId: invoiceId,
        delYn: this.delYnMain == 'Y' ? 'Y' : this.delYnDetail
      } 
        
      return getCargoArrivalDetail(params, false)
        .then(res => {  
          
         
          this.gridDetailInit()
          this.gridDetail = res.listResponse.list
          this.gridDetailInstance.option('focusedRowIndex', 0)

          for(let i of this.gridDetail){

            if(i.status =='PRG_STS01'){
            i.inQty  = i.qty
            }
            
          }





        
        })
        
    },

   

    async btnSaveDetail() {
       
     this.stratCursor()
      this.gridDetailInstance.saveEditData()     
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      var selectedDetailRows = await this.gridDetailInstance.getSelectedRowsData()
    
     


      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      
      
      // 마감 유효성검사 test
      if(this.lastMonth[0] != null && this.focusata != null){
      if(Number(this.focusata.substring(0,7).replace(/-/g,'')) <= Number(this.lastMonth[0].monthDt)){
        this.vToastify(this.$t(`저장할 수 없습니다.<BR>
          도착 실제일이 마감월인 ${this.lastMonth[0].monthDt.replace(/^(\d{0,4})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g, "")} 월 이거나 전월입니다.
          `), 'warn')
        return
        }
      }

        if(this.focusedRowData.completeYn ==='Y'){
          this.vToastify('완료 여부가 체크되어있으면 저장하실수 없습니다.', 'warn')
          return
        }


      //유효성 체크
      for (var row of selectedDetailRows) {
       
      

        if (!row.inQty) {
          this.vToastify('필수항목 입력하세요.[품목명, 수량]', 'warn')
          return
        } else if (row.inQty < 1) {
          this.vToastify('실입고 수량이 1보다 작습니다.', 'warn')
          return
        }
        else if(Number(row.qty) < Number(row.inQty)){ 
         this.vToastify('실입고 수량이 공급 수량보다 많습니다.', 'warn')
        return
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridDetailInstance.beginUpdate()
          saveCargoArrivalDetail(selectedDetailRows, true)
            .then(res => {
              saveCargoArrivalDetailPurchasingOrderInfo(selectedDetailRows, true)
              this.doSearchMain()
              this.doSearchDetail(this.focusedRowData.invoiceId)
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
    
     changeInput(value) {
      this.idSearch = value
    },
  }

}
</script>

<style>

</style>