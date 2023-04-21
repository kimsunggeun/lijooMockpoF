<template>

  <v-container class="pa-0">
 <v-tabs color="#000">
  <v-tab class="mr-2">자동화 라인</v-tab>

  <v-tab>지게차 라인</v-tab>
   
 
  <v-tab-item>
    <v-row>
    <v-col cols="12" sm="12" lg="12" class="pa-0 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
            
          ]"
          @btnSearch="btnSearchAutoMain()" 
        >
          <template v-slot:body>
            <v-layout column>
         
              <v-row no-gutters class="center pa-2 pb-0">
                
                <v-col cols="12" md="2">
                  <v-select
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="desc"
                    item-value="code"
                    :prepend-inner-icon="$t('$search')"
                    :items="jobDivSeach"
                    label="작업지시 구분"
                    dense
                    outlined
                    @change="changeInputjobDiv"
                    v-model="jobDiv"
                  />
                </v-col>

                <v-col cols="12" md="2">
                  <v-select
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="palletNm"
                    item-value="palletId"
                    :prepend-inner-icon="$t('$search')"
                    :items="palletIdSeach"
                    label="Pallet ID"
                    dense
                    outlined
                    @change="changeInputPallet"
                    v-model="palletId"
                  />
                </v-col>
             
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>

      <!--자동화라인 상단 -->
      <v-col cols="12" class="pt-0 pb-0">
        <v-row>
             <i-card-vertical headerTitle="작업 지시서 리스트(자동화 라인)">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="wcsWorkAuto"
                    class="layout-col-height3"
                    :ref="dxDataGridwcsWorkAutoRef"
                    :data-source="gridwcsWorkAutoMain"
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
                    @editor-preparing="onEditorPreparingAutoMain"
                    @focused-row-changed="onFocusedRowAutoChanged"
                  >

                    <DxSelection show-check-boxes-mode="false" />
                    <DxColumn data-field="jobDiv" caption="작업지시 구분" width="100px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="jobNo" caption="작업지시서 번호" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="palletId" caption="Palllet ID" width="150px" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup
                        :data-source="palletIdListLook"
                        value-expr="palletId"
                        display-expr="palletNm"
                        :allow-editing="false"
                      />
                    </DxColumn>
                    <DxColumn data-field="rfidTag" caption="RFID Tag" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="priority" caption="우선순위" width="100px" data-type="Number" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="locationInfo" caption="RACK 행/열/단" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="scCheck" width="80px"  caption="S/C확인" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    <DxColumn data-field="jobStAt" caption="작업 시작 시간" width="150px" data-type="date" format="yyyy-MM-dd HH:mm" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="jobEdAt" caption="작업 완료 시간" width="150px" data-type="date" format="yyyy-MM-dd HH:mm" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="compelteYn" width="80px"  caption="완료 여부" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    
          
                    <DxColumn data-field="remark" caption="기타" width="150px" data-type="string" alignment="center" :allow-editing="false"/>

                 
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox 
                        :value="cellInfo.value == 'Y' ? true : false" 
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)"
                      />
                    </template>

                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
        </v-row>

        <v-row>

        </v-row>
      </v-col>

      <!--자동화라인 하단 -->
      <v-col cols="12" class="pt-0 pb-0">
        <v-row>
             <i-card-vertical headerTitle="작업 지시서 이력 리스트"
             :useBtnList="[
            'btnSearch', //조회
            
          ]"
          @btnSearch="btnSearchAutoDtail()" 
             >

<!-- 달력 -->
          <template v-slot:switch>
              <span class="px-1">{{'작업일:'}}</span>
                <v-col cols="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="jobDtFrom"
                    :max="jobDtTo"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {jobDtFrom = e.value && getDateFormat(e.value)}"
                  />
                </v-col>
                <p>~</p>
                <v-col cols="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="jobDtTo"
                    :min="jobDtFrom"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {jobDtTo = e.value && getDateFormat(e.value)}"
                  />
                </v-col>
          </template>
          
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="wcsWorkAutoDtail"
                     class="layout-col-height3"
                    :ref="dxDatawcsWorkAutoDtailRef"
                    :data-source="gridwcsworkAutoDtail"
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
                    @editor-preparing="onEditorPreparingAutoDetail"
                  >
                    <DxSelection show-check-boxes-mode="false" />
                    <DxColumn data-field="jobDiv" caption="작업지시 구분" width="100px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="jobNo" caption="작업지시서 번호" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="palletId" caption="Palllet ID" width="150px" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup
                        :data-source="palletIdListLook"
                        value-expr="palletId"
                        display-expr="palletNm"
                        :allow-editing="false"
                      />
                   </DxColumn>
                    <DxColumn data-field="rfidTag" caption="RFID Tag" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="priority" caption="우선순위" width="100px" data-type="Number" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="locationInfo" caption="RACK 행/열/단" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="scCheck" width="80px"  caption="S/C확인" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    <DxColumn data-field="jobStAt" caption="작업 시작 시간" width="150px" data-type="date" format="yyyy-MM-dd HH:mm" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="jobEdAt" caption="작업 완료 시간" width="150px" data-type="date" format="yyyy-MM-dd HH:mm" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="compelteYn" width="80px"  caption="완료 여부" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    <DxColumn data-field="status" caption="작업상태" width="150px" data-type="string" alignment="center" :allow-editing="false">
                    <!-- <DxLookup
                        :data-source="statusListLook"
                        value-expr="code"
                        display-expr="desc"
                        :allow-editing="false"
                      /> -->
                    </DxColumn>
                    <DxColumn data-field="statusDesc" caption="작업상태정보" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="remark" caption="기타" width="150px" data-type="string" alignment="left" :allow-editing="false"/>
              
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox 
                        :value="cellInfo.value == 'Y' ? true : false" 
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)"
                      />
                    </template>
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
        </v-row>

        <v-row>

        </v-row>
      </v-col>

   

    </v-row>
    </v-tab-item>


  <!-- 지게차 라인 -->
 <v-tab-item>
    <v-row>
     <v-col cols="12" sm="12" lg="12" class="pa-0 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearchForkMain()" 
        >
          <template v-slot:body>
            <v-layout column>
         
              <v-row no-gutters class="center pa-2 pb-0">
                
                <v-col cols="12" md="2">
                  <v-select
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="desc"
                    item-value="code"
                    :prepend-inner-icon="$t('$search')"
                    :items="jobDivSeachFork"
                    label="작업지시"
                    dense
                    outlined
                    v-model="jobDivFork"
                  />
                </v-col>

                <v-col cols="12" md="2">
                  <v-select
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="palletNm"
                    item-value="palletId"
                    :prepend-inner-icon="$t('$search')"
                    :items="palletIdSeachFork"
                    label="Pallet ID"
                    dense
                    outlined
                    v-model="palletIdFork"
                  />
                </v-col>
             
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>

       <!-- 지게차 라인 상단 -->
    
    <v-col cols="12" class="pt-0 pb-0">
      <v-row>
        <i-card-vertical headerTitle="작업 지시서 리스트(지게차 라인)">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="wcsWorkFork"
                   class="layout-col-height3"
                    :ref="dxDataGridwcsWorkForkRef"
                    :data-source="gridwcsWorkForkMain"
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
                    @editor-preparing="onEditorPreparingForkMain"
                    @focused-row-changed="onFocusedRowForkChanged"
                  >

                    <DxSelection show-check-boxes-mode="false" />
                    <DxColumn data-field="jobDiv" caption="작업지시 구분" width="100px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="jobNo" caption="작업지시서 번호" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="palletId" caption="Palllet ID" width="150px" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup
                        :data-source="palletIdListForkLook"
                        value-expr="palletId"
                        display-expr="palletNm"
                        :allow-editing="false"
                      />
                    </DxColumn>
                    <DxColumn data-field="rfidTag" caption="RFID Tag" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="priority" caption="우선순위" width="100px" data-type="Number" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="locationInfo" caption="RACK 행/열/단" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="jobEdAt" caption="작업 완료 시간" width="150px" data-type="date" format="yyyy-MM-dd HH:mm" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="compelteYn" width="80px"  caption="완료 여부" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                   <DxColumn data-field="remark" caption="기타" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                      <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox 
                        :value="cellInfo.value == 'Y' ? true : false" 
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)"
                      />
                    </template>
                 
                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
        </v-row>

        <v-row>

        </v-row>
      </v-col>
      <!-- 지게차 라인 하단 -->
       <v-col cols="12" class="pt-0 pb-0">
        <v-row>
             <i-card-vertical headerTitle="작업 지시서 이력 리스트"
             :useBtnList="[
            'btnSearch', //조회
            
          ]"
          @btnSearch="btnSearchForkDtail()" 
             >

        <!-- 달력 -->
          <template v-slot:switch>
              <span class="px-1">{{'작업일:'}}</span>
                <v-col cols="2" class="pa-2 py-md-0">
                  <DxDateBox
                   
                    :value="jobDtFromFork"
                    :max="jobDtToFork"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {jobDtFromFork = e.value && getDateFormat(e.value)}"
                  />
                </v-col>
                <p>~</p>
                <v-col cols="2" class="pa-2 py-md-0">
                  <DxDateBox
                     :value="jobDtToFork"
                    :min="jobDtFromFork"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {jobDtToFork = e.value && getDateFormat(e.value)}"
                  />
                </v-col>
          </template>
          
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="wcsWorkForkDtail"
                    class="layout-col-height3"
                    :ref="dxDatawcsWorkForkDtailRef"
                    :data-source="gridwcsworkForkDtail"
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
                    @editor-preparing="onEditorPreparingForkDetail"
                  >
                    <DxSelection show-check-boxes-mode="false" />
                   <DxColumn data-field="jobDiv" caption="작업지시 구분" width="100px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="jobNo" caption="작업지시서 번호" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="palletId" caption="Palllet ID" width="150px" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup
                        :data-source="palletIdListLook"
                        value-expr="palletId"
                        display-expr="palletNm"
                        :allow-editing="false"
                      />
                   </DxColumn>
                    <DxColumn data-field="rfidTag" caption="RFID Tag" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="priority" caption="우선순위" width="100px" data-type="Number" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="locationInfo" caption="RACK 행/열/단" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="jobEdAt" caption="작업 완료 시간" width="150px" data-type="date" format="yyyy-MM-dd HH:mm" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="compelteYn" width="80px"  caption="완료 여부" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    <DxColumn data-field="status" caption="작업상태" width="150px" data-type="string" alignment="center" :allow-editing="false">
                    <!-- <DxLookup
                        :data-source="statusListLook"
                        value-expr="code"
                        display-expr="desc"
                        :allow-editing="false"
                      /> -->
                    </DxColumn>
                    <DxColumn data-field="statusDesc" caption="작업상태정보" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="remark" caption="기타" width="150px" data-type="string" alignment="left" :allow-editing="false"/>

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox 
                        :value="cellInfo.value == 'Y' ? true : false" 
                        :onValueChanged="value => onCheckValueChanged(value, cellInfo)"
                      />
                    </template>

                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
        </v-row>

      <v-row>

    </v-row>
    </v-col>
      
      
      
      

    </v-row>
    </v-tab-item>

     </v-tabs>
  </v-container>
  
</template>

<script>

import { DxDataGrid, DxColumn, DxLookup, } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import DxDateBox from 'devextreme-vue/date-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'


import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getWCSWorkInfo,
  getCombopalletIdWCSWorkInfo,
  getWCSWorkInfoDetail,
  getWCSWorkInfoManual,
  getWCSWorkInfoManualDetail,
  getCombopalletIdWCSWorkInfoManual,
  getCombopalletIdPalletOutDetail
} from '@/api/kier/wms/WCSWorkInfo'

import { getStdComboPartnerEmployee } from '@/api/kier/standard/partnerEmployeeManage'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'

import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'

export default {
  name: 'WCSWorkInfo',
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
  },
  data() {
    return {
      dxDataGridwcsWorkAutoRef: 'wcsWorkAuto',
      dxDatawcsWorkAutoDtailRef: 'wcsWorkAutoDtail',
      gridwcsWorkAutoMain: [],
      gridwcsworkAutoDtail:[],



      dxDataGridwcsWorkForkRef: 'wcsWorkFork',
      dxDatawcsWorkForkDtailRef: 'wcsWorkForkDtail',
      gridwcsWorkForkMain: [],
      gridwcsworkForkDtail:[],





      palletIdSeach:[],
      palletIdListLook:[],
      palletIdListForkLook:[],
      palletIdSeachFork:[],

      jobDivSeach:[],
      jobDivSeachFork:[],

      statusListLook:[],


      jobDiv:'',
      palletId:'',
      jobDivFork:'',
      palletIdFork:'',
      jobDtFrom: getPreMonth(2),
      jobDtTo: getPreMonth(-2),
       
      jobDtFromFork: getPreMonth(2),
      jobDtToFork:getPreMonth(-2),
     
      
    }
  },
  computed: {
    gridwcsWorkAutoMainInstance() {
      return this.GetDataGrid(this.dxDataGridwcsWorkAutoRef)
    },
    gridwcsworkAutoDtailInstance() {
      return this.GetDataGrid(this.dxDatawcsWorkAutoDtailRef)
    },
  
    gridwcsWorkForkMainInstance() {
      return this.GetDataGrid(this.dxDataGridwcsWorkForkRef)
    },
    gridwcsworkForkDtailInstance() {
      return this.GetDataGrid(this.dxDatawcsWorkForkDtailRef)
    }

  },



  beforeMount() {
    let params = {
      jobDiv: this.jobDiv,
      palletId: this.palletId
    }
    
    let params2 = {
      jobDiv: this.jobDivFork,
      palletId: this.palletIdFork
    }

    Promise.all([
      getCombopalletIdWCSWorkInfo(), 
      getCombopalletIdWCSWorkInfoManual(),

      getWCSWorkInfo(params),         
      getWCSWorkInfoManual(params2), 
      
      getCommonCode('S0017'),
      getCommonCode('S0013'),
    ])
      .then( res => {


        this.palletIdListLook = res[0].listResponse.list.slice()
       
        this.palletIdSeach = res[0].listResponse.list.slice()
        this.palletIdSeach.unshift({palletNm:'전체',palletId:''})


        this.palletIdListForkLook = res[1].listResponse.list.slice() 
        this.palletIdSeachFork = res[1].listResponse.list.slice()
        this.palletIdSeachFork.unshift({palletNm:'전체',palletId:''})
       
        this.jobDivSeach = res[5].listResponse.list.slice()
        this.jobDivSeach.unshift({ code: '', desc: '전체' })
        
        this.jobDivSeachFork = res[5].listResponse.list.slice()
        this.jobDivSeachFork.unshift({ code: '', desc: '전체' })
        
        // this.statusListLook = res[4].listResponse.list.slice()


      })
      .catch(error => {})
  },
  methods: {
    getDateFormat(date) {
      return getDateFormat(date)
    },

    onEditorPreparingAutoMain(e) {
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

    onEditorPreparingAutoDetail(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case '':
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

    onEditorPreparingForkMain(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case '':
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

    onEditorPreparingForkDetail(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case '':
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

    btnSearchAutoMain() {
      
      this.openLoading('searching')
      this.doSearchMain(true)
        .finally(() => {
          this.endLoading()
        })
    },

    doSearchMain(isProgress) {
      let params = {
        jobDiv: this.jobDiv,
        palletId: this.palletId,
       
      }


      this.gridInit()
      return getWCSWorkInfo(params, isProgress)
        .then(res => {
     
          this.gridwcsWorkAutoMain = res.listResponse.list
          
          if(this.gridwcsWorkAutoMain.length) this.gridwcsWorkAutoMainInstance.option('focusedRowIndex', 0)
        })
    },

  


    onFocusedRowAutoChanged(e) {
      this.focusedRowData = e.row && e.row.data
      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        this.gridDetail = []
        return
      }


  
    },
    
   

    btnSearchAutoDtail(jobNo,palletId) {
      let params = {
        jobDtFrom:this.jobDtFrom,
        jobDtTo:this.jobDtTo,
        jobNo:jobNo,
        palletId:palletId,
        
      } 
   
   
        this.openLoading('searching')

      return getWCSWorkInfoDetail(params, false)
      
        .then(res => {
          this.gridwcsworkAutoDtailInit()
          this.gridwcsworkAutoDtail = res.listResponse.list
          this.gridwcsworkAutoDtailInstance.option('focusedRowIndex', 0)
    
        }) 
        .finally(() => {
          this.endLoading()
        })
    },


      ///지게차

  

    btnSearchForkMain() {
      this.openLoading('searching')
      this.doSearchForkMain(true)
        .finally(() => {
          this.endLoading()
        })
    },

    doSearchForkMain(isProgress) {
      let params = {
        jobDiv: this.jobDivFork,
        palletId: this.palletIdFork
      }

      this.gridInitFork()
      return getWCSWorkInfoManual(params, isProgress)
        .then(res => {

          this.gridwcsWorkForkMain = res.listResponse.list
          if(this.gridwcsWorkForkMain.length) this.gridwcsWorkForkMainInstance.option('focusedRowIndex', 0)
        })
    },

  


    onFocusedRowForkChanged(e) {
      this.focusedRowData = e.row && e.row.data
      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        this.gridDetail = []
        return
      }
      

        
      
    },
    
   

    btnSearchForkDtail(jobNo,palletId) {
      let params = {
        jobDtFromFork:this.jobDtFromFork,
        jobDtToFork:this.jobDtToFork,
        jobNo:jobNo,
        palletId:palletId,
        
      } 

    this.openLoading('searching')

      return getWCSWorkInfoManualDetail(params, false)
        .then(res => {
          this.gridwcsworkForkDtailInit()
          this.gridwcsworkForkDtail = res.listResponse.list
          this.gridwcsworkForkDtailInstance.option('focusedRowIndex', 0)
        })
         .finally(() => {
          this.endLoading()
        })
    },



    gridwcsWorkAutoMainInit() {
      this.gridwcsWorkAutoMainInstance.clearSelection()
      this.gridwcsWorkAutoMainInstance.cancelEditData()
      this.gridwcsWorkAutoMainInstance.option('focusedRowIndex', -1)
    },

    gridwcsworkAutoDtailInit() {
      this.gridwcsworkAutoDtailInstance.clearSelection()
      this.gridwcsworkAutoDtailInstance.cancelEditData()
      this.gridwcsworkAutoDtailInstance.option('focusedRowIndex', -1)
    },

    gridwcsWorkForkMainInit() {
      this.gridwcsWorkForkMainInstance.clearSelection()
      this.gridwcsWorkForkMainInstance.cancelEditData()
      this.gridwcsWorkForkMainInstance.option('focusedRowIndex', -1)
    },

    gridwcsworkForkDtailInit() {
      this.gridwcsworkForkDtailInstance.clearSelection()
      this.gridwcsworkForkDtailInstance.cancelEditData()
      this.gridwcsworkForkDtailInstance.option('focusedRowIndex', -1)
    },

    gridInit() {
      this.gridwcsWorkAutoMainInit()
      this.gridwcsworkAutoDtailInit()
   
    },
    gridInitFork() {
      this.gridwcsWorkForkMainInit()
      this.gridwcsworkForkDtailInit()
   
    },

   changeInputjobDiv(value) {
      this.jobDiv = value
    },

    changeInputPallet(value) {
      this.palletId = value
    },

   changeInputjobDivFork(value) {
      this.jobDivFork = value
    },

    changeInputPalletFork(value) {
      this.palletIdFork = value
    },
  }
}








</script>