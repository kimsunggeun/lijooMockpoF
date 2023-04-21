<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" >
        <i-card-top class="d-md-flex pa-2" :useBtnList="buttonUseList" @btnSearch="btnSearch()">
         <template v-slot:body>



  <v-row  no-gutters class="center pa-2 pb-0">

           
              <v-col cols="12" md="2" >
                <v-text-field
                  :value="idSearch"
                  label="출하의뢰 ID:"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @keydown.enter="btnSearch()"
                  @change="changeInput"
                  clearable
                />
                
              </v-col>
   

       
        <!-- 달력 -->
       
           
              <span class="px-1 pt-1 ml-2">{{'납기 요청일:'}}</span>
              <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="reqDtFrom"
                    :max="reqDtTo"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :show-clear-button="true"
                    @value-changed="e => {reqDtFrom = e.value && getDateFormat(e.value)}"
                  />
                </v-col>
                <p>~</p>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="reqDtTo"
                    :min="reqDtFrom"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :show-clear-button="true"
                    @value-changed="e => {reqDtTo = e.value && getDateFormat(e.value)}"
                  />
                </v-col>
         
              
    <!-- 라벨 -->
              <v-col cols="12" md="2" sm="12" class="ml-4">
                  <v-select 
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0 "
                    item-text="desc"
                    item-value="code"
                    :prepend-inner-icon="$t('$search')"
                    :items="partnerIdList"
                    label="유지보수업체"
                    dense
                   
                    outlined
                    v-model="partnerIdTypeSelectedDiv"
                  />
                
              </v-col>
              
  <!-- 스위치 -->
        <span style="width: 164px;" class="pa-2 py-md-0">
          <v-switch 
            v-model="toggleDelYn" 
            true-value="Y" 
            false-value="N" 
            :label="`삭제 데이터 조회`"
            @change="btnSearch()"
          />
        </span>
         
  
      </v-row>
          </template>
        </i-card-top>
         <i-system-bar/>
      </v-col>

      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="■ 출하의뢰 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="commonManageDataMain"
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
                    
                    :show-row-lines="true"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                    @focused-row-changed="onFocusedRowChanged"
                    @editor-preparing="onEditorPreparingMain"
                  >
                    <DxSelection :select-all-mode="allMode" show-check-boxes-mode="false"/>
                    <DxColumn data-field="orderId" caption="출하의뢰 ID" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                     <DxColumn data-field="orderDt" caption="작성일" width="150px" data-type="date" alignment="center" format="yyyy-MM-dd" css-class="devest-grid-header-require" :allow-editing="false"/>

                      <DxColumn
                      data-field="partnerId"
                      caption="유지보수업체"
                      width="130px"
                      data-type="string"
                      alignment="left"
                      :allow-editing="false"
                      css-class="devest-grid-header-require"
                      :set-cell-value="(newData, value) => {
                        newData.partnerId = value
                        newData.employeeId = null
                      }"
                    >
                      <DxLookup
                        :data-source="partnerIdLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                    </DxColumn>

                    <DxColumn data-field="employeeId" caption="담당자" width="220px" data-type="string" alignment="center" :allow-editing="false" css-class="devest-grid-header-require">
                      <DxLookup
                        :data-source="getFilteredPartnerEmployee"
                        value-expr="employeeId"
                        display-expr="korNm"
                      />
                    </DxColumn>

                    <DxColumn data-field="reqDt" caption="납기 요청일"  format="yyyy-MM-dd" data-type="date" width="120px" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="status" caption="출하의뢰 상태" width="120px" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup
                        :data-source="statusLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                    </DxColumn>
                     <DxColumn
                      data-field="completeYn" data-type="boolean" caption="완료 여부" alignment="center" width="90px" edit-cell-template="checkBoxEditor" :allow-editing="false"/>

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" :allow-editing="false"/>


                      <DxColumn
                      data-field="useYn" data-type="boolean" caption="사용 여부" alignment="center" width="90px" edit-cell-template="checkBoxEditor" :allow-editing="false"/>

                    <DxColumn data-field="delYn" data-type="boolean" caption="삭제 여부" alignment="center"  width="90px" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :read-only="true" />
                    </template>
                  </DxDataGrid>

                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>

      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-5 pt-lg-0">
        <i-card-vertical headerTitle="■ 출하납품 정보 리스트">
          <template v-slot:switch>
            <v-switch 
              class="ma-0" 
              v-model="toggleDelYnDetail" 
              true-value="Y" 
              false-value="N" 
              :label="` 출하납품 정보 리스트 삭제 데이터 조회`" 
              @change="onDelYnDetailChange"
            />
          </template>
         

          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="row pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="commonManageDataDetail"
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
                    :show-row-lines="true"
                    :focused-row-enabled="true"
                    key-expr="id"
                    parent-id-expr="orderId"
                    :column-hiding-enabled="false"
                    @editor-preparing="onEditorPreparingDetail"
                  >

                    <DxSelection  show-check-boxes-mode="false"/>

                    <DxColumn data-field="orderSeq" caption="순번" width="70px" data-type="number" alignment="center"/>
                    <DxColumn data-field="mainClass" caption="품목 대분류" data-type="string" alignment="left"  :allow-editing="false"/>
                    <DxColumn data-field="middleClass" caption="품목 중분류" data-type="string"  alignment="left"  width="260px"  :allow-editing="false"/>
                    
                     <DxColumn
                      data-field="matCd"
                      caption="품목명"
                      width="350px"
                      data-type="string"
                      alignment="left"
                      edit-cell-template="hrSelector"
                      :allow-editing="false"
                      :calculate-display-value="e => {
                        let item = e.matCd && matList.find(el => el.matCd == e.matCd)
                        return item && item.matNm
                      }"
                      :calculate-filter-expression="lookupColumnFilterExpression"
                      css-class="devest-grid-header-require"
                    />
                    <template #hrSelector="{ data: cellInfo }">
                      <DxDropDownBox
                        :ref="`dropDownBoxRef${cellInfo.key}`"
                        :value="cellInfo.value"
                        :drop-down-options="{ width: 700 }"
                        :defer-rendering="false"
                        :data-source="matList"
                        :read-only="!cellInfo.data.isCreated"
                        display-expr="matNm"
                        value-expr="matCd"
                      >
                        <DxDataGrid
                          :selected-row-keys="cellInfo.value ? [cellInfo.data.mainClass+cellInfo.data.middleClass+cellInfo.data.matCd] : []"
                          :data-source="matList"
                          :height="300"
                          :hover-state-enabled="true"
                          :editing="{ allowUpdating: false }"
                          :selection="{ mode:'single', deferred: false }"
                          :filter-row="{ visible: true }"
                          :paging="{ pageSize: 5 }"
                          :pager="{ allowedPageSizes: [5, 'all'], showInfo: false }"
                          :column-hiding-enabled="false"
                          key-expr="id"
                          @selection-changed="e => onSelectionChanged(e, cellInfo)"
                          :on-initialized="() => null"
                          :on-content-ready="() => null"
                          @initialized="onDropdownEditGridInitialized"
                          class="sec_grid"
                        >
                        <DxColumn data-field="mainClass" caption="품목 대분류" width="120px" alignment="left"/>
                        <DxColumn data-field="middleClass" caption="품목 중분류" width="200px" alignment="left"/>
                        <DxColumn data-field="matNm" caption="품목" alignment="left"/>
                        </DxDataGrid>
                      </DxDropDownBox>
                    </template>
                    <DxColumn  data-field="bqty"  caption="요청 수량" data-type="number" alignment="right" :allow-editing="false" format="#,##0"/>
                    <DxColumn
                      data-field="cqty"
                      caption="공급 수량"
                      data-type="number"
                      alignment="right"
                      :allow-editing="false"
                      format="#,##0"
                    />
                    <DxColumn data-field="price" caption="공급가액" data-type="number"  alignment="right" :allow-editing="false" format="#,##0" />
                    <DxColumn data-field="bstatus" caption="진행 상태" width="120px" data-type="string" alignment="center" :allow-editing="false">
                      <DxLookup
                        :data-source="prStatusLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                    </DxColumn>
                    
                    <DxColumn data-field="deliveryId" caption="배송 번호" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="deliverySeq" caption="배송 순번" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="korNm" caption="배송 담당자" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="transNo" caption="차량 번호" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="hpNo" caption="배송 담당자 전화번호" data-type="string" alignment="center" :allow-editing="false" />
                    <DxColumn data-field="remark" caption="기타" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="useYn" caption="사용 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    <DxColumn data-field="delYn" caption="삭제 여부" data-type="boolean" alignment="center"  width="70px" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :read-only="true"/>
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
import { DxDataGrid, DxColumn, DxSelection, DxLookup, DxRequiredRule } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import iCardTop from '@/components/common/iCardTop.vue'
import iCardVertical from '@/components/common/iCardVertical.vue'
import DxDateBox from 'devextreme-vue/date-box'
import ISystemBar from '@/components/common/iSystemBar.vue'
import { getStdPartnerEmployee } from '@/api/kier/standard/partnerEmployeeManage'

import {
  getScmCustomerOrderManageMain,
  getScmCustomerOrderInfoDetail,
  getComboPartnerId
} from '@/api/kier/scm/customerOrderInfo'


//
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import { getDateFormat,getPreMonth } from '@/utils/common.js'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'


export default {
  name: 'SysCommonCodeManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    'i-card-vertical': iCardVertical,
    'i-card-top': iCardTop,
    DxDataGrid,
    DxColumn,
    DxSelection,
    DxCheckBox,
    DxDateBox,
    DxLookup,
    ISystemBar
    
    
  },

  data() {
    return {
      matList:[],
      dates: [],
      statusLookUp: [],
      prStatusLookUp:[],
      toggleDelYn: 'N',
      toggleDelYnDetail: 'N',
      showPageSizeSelector: false,
      pagingSize: 17,
      dxDataGridMainRef: 'commonManageDataMain',
      dxDataGridDetailRef: 'commonManageDataDetail',
      buttonUseList: ['btnSearch'],
      reqDtFrom: getPreMonth(2),
      reqDtTo: getPreMonth(-2),
      allMode: 'allPages',
      gridMain: [],
      gridDetail: [],
      //text, select Data
      selectType: [],
      partnerIdList: [],
      employeeIdList:[],
      partnerIdLookUp: [],
      partnerEmployeeLookUp: [],
     selectedDiv: '',
      partnerIdTypeSelectedDiv: '',
      idSearch: '',
      deliveryId:''
    }
  },
  computed: {
    gridMainInstance() {
     
      return this.GetDataGrid(this.dxDataGridMainRef)
    },
    gridDetailInstance() {
      return this.GetDataGrid(this.dxDataGridDetailRef)
    },



  },

  beforeMount() {
    Promise.all([
      getComboPartnerId(),
      getStdPartnerEmployee({}, false),
      getCommonCode('S0010'),
      getCommonCode('S0011'),
      getComboStdMatManage()
    ])
      .then( res => {
        this.partnerIdList = res[0].listResponse.list.slice()
        this.partnerIdList.unshift({ code: '', desc: '전체' })
        this.partnerIdLookUp = res[0].listResponse.list.slice()
        this.partnerEmployeeLookUp = res[1].listResponse.list
        this.statusLookUp = res[2].listResponse.list
        this.prStatusLookUp =res[3].listResponse.list
        this.matList =res[4].listResponse.list.slice()
      })
      .catch(error => {})
  },
  // mounted() {

  // },



  methods: {
    getFilteredPartnerEmployee(options) {
      return {
        store: this.partnerEmployeeLookUp,
        filter: options.data && ['partnerId', '=', options.data.partnerId]
      }
    },
    
    getDateFormat(date) {
      return getDateFormat(date)
    },

    onEditorPreparingMain(e) {
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

    btnSearch() {
      this.openLoading('searching')
      this.doSearchMain(true)

        .finally(() => {
          this.endLoading()
        })
    },

    doSearchMain(isProgress) {
      let params = {
        orderId:this.idSearch,
        partnerId: this.partnerIdTypeSelectedDiv,
        delYn:this.toggleDelYn,
        reqDtFrom:this.reqDtFrom,
        reqDtTo:this.reqDtTo
      
      }
      

      this.gridInit()
      return getScmCustomerOrderManageMain(params, isProgress)
        .then(res => {

          this.gridMain = res.listResponse.list
          this.gridDetail = []
          if(this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
        })
    },



    onFocusedRowChanged(e) {
      this.focusedRowData = e.row && e.row.data
      if (e.rowIndex < 0 || !!e.row.data.isCreated) return
      this.openLoading('searching')
      this.doSearchDetail(e.row.data.orderId)
        .finally(() => { 
          this.endLoading()
        })
    },
    
    onDelYnDetailChange(val) {
      if(this.focusedRowData && !this.focusedRowData.isCreated) {
        this.openLoading('searching')
  
        this.doSearchDetail(this.focusedRowData.orderId)
          .finally(() => {
            this.endLoading()
          })
      }
    },

    

    doSearchDetail(orderId) {

      let params = {
        orderId:orderId,
        delYn: this.delYnMain == 'Y' ? 'Y' : this.toggleDelYnDetail,
        deliveryId:''
      }
     
      return getScmCustomerOrderInfoDetail(params, false)
        .then(res => {
  
          this.gridDetailInit()
          this.gridDetail = res.listResponse.list
          this.gridDetailInstance.option('focusedRowIndex', 0)
        })
 
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

<style lang="scss" scoped>
$appBarHeight: 64px;
$cardTitleHeight: 48px;
$paddingHeight: 8px;



.user-col-height {
  height: 100vh;
  max-height: calc(100vh - (#{$appBarHeight} + (#{$cardTitleHeight} * 2) + (#{$paddingHeight} * 7)));
}

.flex{
  display:flex;
  align-items: center;
}

</style>
