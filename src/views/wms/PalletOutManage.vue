<template>

  <v-container class="pa-2 pt-0 pb-0">
 <v-tabs color="#000">
    <v-tab class="mr-2">자동화 라인</v-tab>
    <v-tab>지게차 라인</v-tab>
  <v-tab-item>
    <v-row>
       <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearchAuto()" 
        >
          <template v-slot:body>
            <v-layout column>
         
              <v-row no-gutters class="center pa-2 pb-0">
                
                <v-col cols="12" md="4">
                   <v-autocomplete
                 :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="matNm"
                    item-value="matCd"
                    :prepend-inner-icon="$t('$search')"
                    :items="matListSeach"
                    label="품목 코드"
                     @keydown.enter="btnSearchAuto()"
                    @change="changeInputmat"
                    dense
                    multiple
                    outlined
                    clearable
                    v-model="matCd"
                   ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="4">
                <v-autocomplete
                 :menu-props="{ offsetY: true }"
                    @change="changeInputPallet"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="palletNm"
                    item-value="palletId"
                    :prepend-inner-icon="$t('$search')"
                    :items="palletIdList"
                     @keydown.enter="btnSearchAuto()"
                    label="Pallet ID"
                    dense
                    multiple
                    outlined
                    clearable
                    v-model="palletId"
                   ></v-autocomplete>
                 
                </v-col>
             
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>


      <!-- 재고리스트(자동화라인) -->
      <v-col cols="7" class="pa-0">
        <i-card-vertical headerTitle="재고 리스트(자동화라인)">
          <template v-slot:body>
         
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="AutopalletOutManage"
                    style="height:650px"
                    :ref="dxDataGridAutoMainRef"
                    :data-source="gridAuto"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                    @editor-preparing="onEditorPreparingAutoMain"
                    @focused-row-changed="onFocusedRowChanged"
                  >


                   
                    <DxColumn  data-field="mainClass" caption="품목 대분류" width="120px" data-type="string" alignment="center" :allow-editing="false"/>

                    <DxColumn data-field="middleClass" caption="품목 중분류" width="220px" data-type="string" alignment="center" format="yyyy-MM-dd" :allow-editing="false"/>

                    <DxColumn data-field="matCd" caption="품목명" width="300px" data-type="string" alignment="left" :allow-editing="false"
                      :calculate-display-value="e => {
                        let item = e.matCd && matList.find(el => el.matCd == e.matCd)
                        return item && item.matNm
                      }"
                      :calculate-filter-expression="lookupColumnFilterExpression"
                    />

                    <DxColumn data-field="palletId" caption="Pallet ID" width="100px" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup
                        :data-source="palletIdListLook"
                        value-expr="palletId"
                        display-expr="palletNm"
                        :allow-editing="false"
                      />
                    </DxColumn>

                     <DxColumn data-field="barcodeNo" caption="바코드 번호" width="180px" data-type="string" alignment="center" :allow-editing="false"   />
                      <DxColumn data-field="locationInfo" width="100px" caption="RACK 행/열/단"  data-type="string" alignment="center"  :allow-editing="false" />
                    <DxColumn data-field="calcQty" caption="재고 수량" width="60px" format="#,##0" data-type="number" alignment="right" :allow-editing="false"  />
                  

                  </DxDataGrid>
                  
                </v-col>
                
              </v-col>
            </v-layout>
          </template>
         
        </i-card-vertical>
        
      </v-col>

      <!-- pallet, 출고 리스트 -->
      <v-col cols="5" name="test"  class="pb-0">
        <!-- 추가 취소 버튼, pallet -->
        <v-row>
            <!-- 추가 취소 버튼 -->
          <v-col cols="1" style=" padding: 5px; margin-top: 100px; padding-left: 1px;">
            <v-btn
            class="mb-6"
              fab
              dark
              @click="btnAdd()"
              color="primary">
                <v-icon >
                  arrow_forward
                </v-icon>
              </v-btn>
              
          
                <v-btn
                  fab
                  dark
                  @click="btnDel()"
                  color="pink">
                  <v-icon >
                    arrow_back
                  </v-icon>
                </v-btn>
          </v-col>   
            <!-- pallet -->
          <v-col cols="11" >
            <i-card-vertical headerTitle="Pallet Mapping 리스트"
           :useBtnList="[
            'btnSave',
            'btnRefresh'
          ]"
         @btnSave="btnSaveAutoPallet()"
         @btnRefresh="btRefreshAutoPallet()"
        >
  
          <template v-slot:body>
            <v-layout column overflow-auto>
             <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="palletOutManageAutoPallet"
                    style="height:250px"
                    :ref="dxDataGridAutoPalletRef"
                    :data-source="gridAutoPallet"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                 
                  >
                  <DxSelection  show-check-boxes-mode="false"/>
                    <DxColumn data-field="palletId" caption="Pallet ID" width="90px" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup
                        :data-source="palletIdListLook"
                        value-expr="palletId"
                        display-expr="palletNm"
                        :allow-editing="false"
                      />
                    </DxColumn>
                    <DxColumn data-field="matCd" caption="품목명" width="230px" data-type="string" alignment="left" :allow-editing="false"
                      :calculate-display-value="e => {
                        let item = e.matCd && matList.find(el => el.matCd == e.matCd)
                        return item && item.matNm
                      }"
                      :calculate-filter-expression="lookupColumnFilterExpression"
                    />
                    <DxColumn data-field="barcodeNo" caption="바코드 번호" width="200px" alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="workQty" caption="출고 수량" format="#,##0" data-type="number"  width="70px" alignment="right" />
                    <DxColumn data-field="outEnable" caption="출고 상태" width="100px" alignment="center" :allow-editing="false"/>
                          
                 
                   <DxPaging :enabled="false"/>
                  </DxDataGrid>
                </v-col>
              </v-col>
              
            </v-layout>
          </template>
        </i-card-vertical>
          </v-col> 




        </v-row>  

        <!-- 출고 리스트 -->
        <v-row no-gutters>
           <i-card-vertical headerTitle="출고 리스트"
           :useBtnList="[
            'btnSave',
            'btnDelete'
          ]"
         @btnSave="btnSavedAutoOut()"
         @btnDelete="btnDeleteAutoOut()"
         class="mt-2"
        >
          <template v-slot:body>
            
              <v-layout column>
             <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="palletOutAutoOut"
                   style="height:320px"
                    :ref="dxDataGridAutoOutRef"
                    :data-source="gridAutoOut"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                     @editor-preparing="onEditorPreparingAutoDetail"
                  >
                    <DxColumn data-field="jobNo" width="160px" caption="출고 지시서 번호"  alignment="center" :allow-editing="false"/>
                    <DxColumn data-field="palletId" caption="Pallet ID" width="140px" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup
                        :data-source="palletIdListLook"
                        value-expr="palletId"
                        display-expr="palletNm"
                        :allow-editing="false"
                      />
                    </DxColumn>
                          <DxColumn data-field="rfidTag" width="90px" caption="RFID Tag"  alignment="center" :allow-editing="false"/>
                          <DxColumn data-field="locationInfo" width="100px" caption="RACK 행/열/단" alignment="center" :allow-editing="false"/>
                          <DxColumn data-field="scCheck" width="80px"  caption="S/C 확인" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                          <DxColumn  data-field="priority" width="80px"   caption="우선 순위"  data-type="number"  alignment="center" />
                          <DxColumn data-field="compelteYn" width="80px"  caption="완료 여부" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    
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
      </v-col>
    </v-row>
    </v-tab-item>



 <v-tab-item>
    <v-row>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearchFork()" 
        >
          <template v-slot:body>
            <v-layout column>
         
              <v-row no-gutters class="center pa-2 pb-0">
                
                <v-col cols="12" md="4">
                 <v-autocomplete
                  :menu-props="{ offsetY: true }"
                    color="primary"
                    class="required mx-1 rounded-0"
                    item-text="matNm"
                    item-value="matCd"
                    :prepend-inner-icon="$t('$search')"
                    :items="matCdForkList"
                    label="품목 코드"
                    @keydown.enter="btnSearchFork()"
                    @change="changeInputmatFork"
                    dense
                    multiple
                    outlined
                    clearable
                    v-model="matCdFork"
                   ></v-autocomplete>
                  
                </v-col>

                <v-col cols="12" md="4">
                    <v-autocomplete
                  :menu-props="{ offsetY: true }"
                    color="primary"
                      @keydown.enter="btnSearchFork()"
                    class="required mx-1 rounded-0"
                    item-text="palletNm"
                    item-value="palletId"
                    :prepend-inner-icon="$t('$search')"
                    :items="palletIdForkList"
                    label="Pallet ID"
                    dense
                    multiple
                    outlined
                    clearable
                    v-model="palletIdFork"
                   ></v-autocomplete>
                 
                </v-col>
             
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>

       <!-- 재고리스트(지게차라인) -->

      <v-col cols="7" class="pa-0">
        <i-card-vertical headerTitle="재고 리스트(지게차라인)">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                     <DxDataGrid
                    id="ForkpalletOutManage"
                    style="height:650px"
                    :ref="dxDataGridForkMainRef"
                    :data-source="gridFork"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                    @focused-row-changed="onFocusedForkRowChanged"
                  >
                 <DxColumn  data-field="mainClass" caption="품목 대분류" width="120px" data-type="string" alignment="center" :allow-editing="false"/>

                    <DxColumn data-field="middleClass" caption="품목 중분류" width="220px" data-type="string" alignment="center" format="yyyy-MM-dd" :allow-editing="false"/>

                    <DxColumn data-field="matCd" caption="품목명" width="300px" data-type="string" alignment="left" :allow-editing="false"
                      :calculate-display-value="e => {
                        let item = e.matCd && matList.find(el => el.matCd == e.matCd)
                        return item && item.matNm
                      }"
                      :calculate-filter-expression="lookupColumnFilterExpression"
                    />

                    <DxColumn data-field="palletId" caption="Pallet ID" width="100px" data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup
                        :data-source="palletIdListLook"
                        value-expr="palletId"
                        display-expr="palletNm"
                        :allow-editing="false"
                      />
                    </DxColumn>
                     <DxColumn data-field="barcodeNo" caption="바코드 번호" width="180px" data-type="string" alignment="center" :allow-editing="false"   />
                      <DxColumn data-field="locationInfo" width="100px" caption="RACK 행/열/단"  data-type="string" alignment="center"  :allow-editing="false" >
                      </DxColumn>
                    <DxColumn data-field="calcQty" caption="재고 수량" width="60px" format="#,##0" data-type="number" alignment="right" :allow-editing="false"  />

                  

                  </DxDataGrid>
                </v-col>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>


         
  <!-- pallet, 출고 리스트 -->
      <v-col cols="5"  class="pb-0">
        <v-row>
        <!-- 버튼 -->
         <v-col cols="1" style=" padding: 5px; margin-top: 100px; padding-left: 1px;">
            <v-btn
                fab
                class="mb-6"
                dark
              @click="btnForkAdd()"
                color="primary"
                
              >
                <v-icon >
                  arrow_forward
                </v-icon>
              </v-btn>
                <v-btn
                  fab
                  dark
                  @click="btnForkDel()"
                  color="pink"
                >
                  <v-icon >
                    arrow_back
                  </v-icon>
                </v-btn>
         </v-col>
<!-- pallet -->
      <v-col cols="11" >
        <i-card-vertical headerTitle="Pallet Mapping 리스트"
           :useBtnList="[
            'btnSave','btnRefresh'
          ]"
         @btnSave="btnSaveForkPallet()"
         @btnRefresh ="btRefreshFrokPallet()"
        >
          <template v-slot:body>
            <v-layout column overflow-auto>
             <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="palletOutManageForkPallet"
                    style="height:250px"
                    :ref="dxDataGridForkPalletRef"
                    :data-source="gridForkPallet"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
    
                  >
                         <DxSelection  show-check-boxes-mode="false"/>
                          <DxColumn data-field="palletId" caption="Pallet ID" width="90px" data-type="string" alignment="center" :allow-editing="false">
                          <DxLookup
                              :data-source="palletIdListLook"
                              value-expr="palletId"
                              display-expr="palletNm"
                              :allow-editing="false"
                            />
                          </DxColumn>
                          <DxColumn data-field="matCd" caption="품목명" width="230px" data-type="string" alignment="left" :allow-editing="false"
                            :calculate-display-value="e => {
                              let item = e.matCd && matList.find(el => el.matCd == e.matCd)
                              return item && item.matNm
                            }"
                            :calculate-filter-expression="lookupColumnFilterExpression"
                          />
                                                    
                          <DxColumn data-field="barcodeNo" caption="바코드 번호" width="180px" alignment="left" :allow-editing="false"/>
                          <DxColumn data-field="workQty" caption="출고 수량" format="#,##0" data-type="number"  width="80px" alignment="right" />
                          <DxColumn data-field="outEnable" caption="출고 상태" width="100px" alignment="center" :allow-editing="false"/>
                          
                    <DxPaging :enabled="false"/>
                  </DxDataGrid>
                </v-col>
              </v-col>
              
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      </v-row>
      <!-- 출고 리스트 -->
      <v-row no-gutters>
        <i-card-vertical headerTitle="출고 리스트"
           :useBtnList="[
            'btnSave',
            'btnDelete'
          ]"
         @btnSave="btnSaveForkOut()"
         @btnDelete="btnDeleteForkOut()"
         class="mt-2"
        >
          <template v-slot:body>
            
              <v-layout column>
             <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="palletOutForkOut"
                    style="height:320px"
                    :ref="dxDataGridForkOutRef"
                    :data-source="gridForkOut"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :show-borders="true"
                    :width="grid.width"
                    :show-row-lines="true"
                    key-expr="id"
                    :focused-row-enabled="true"
                    :column-hiding-enabled="false"
                    @editor-preparing="onEditorPreparingForkDetail"
                  >
                           <DxColumn data-field="jobNo" width="180px" caption="출고 지시서 번호"  alignment="center" :allow-editing="false"/>
                            <DxColumn data-field="palletId" caption="Pallet ID" width="140px" data-type="string" alignment="center" :allow-editing="false">
                            <DxLookup
                                :data-source="palletIdListLook"
                                value-expr="palletId"
                                display-expr="palletNm"
                                :allow-editing="false"
                              />
                            </DxColumn>
                          <DxColumn data-field="rfidTag" width="120px" caption="RFID Tag"  alignment="center" :allow-editing="false"/>
                          <DxColumn data-field="locationInfo" width="100px" caption="RACK 행/열/단" alignment="center" :allow-editing="false"/>
                          <DxColumn  data-field="priority" width="80px"   caption="우선 순위"  data-type="number"  alignment="center" />
                          <DxColumn data-field="compelteYn" width="80px"  caption="완료 여부" data-type="boolean" alignment="center" edit-cell-template="checkBoxEditor" :allow-editing="false"/>
                    
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

      </v-col>
    </v-row>
    </v-tab-item>





















     </v-tabs>
  </v-container>
  
</template>

<script>
import { DxDataGrid, DxColumn, DxLookup, } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'

import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getPalletOut,
  getPalletOutDetail,
  savePalletOut,
  savePalletOutDetail,
  deletePalletOutDetail,
  getCombopalletIdPalletOut,
  getPalletOutForkDetail,
  getPalletOutFork,
  savePalletOutFork,
  deletePalletOutForkDetail,
  savePalletOutForkDetail,
  getComboMatCdPalletOut,
  getCombopalletIdPalletOutFork,
  getComboMatCdPalletOutFork,
  


} from '@/api/kier/wms/palletOutManage'


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
    
  },
  data() {
    return {
      
      dxDataGridAutoMainRef: 'AutopalletOutManage',
      dxDataGridAutoPalletRef:'palletOutManageAutoPallet',
      dxDataGridAutoOutRef: 'palletOutAutoOut',
      
      dxDataGridForkMainRef: 'ForkpalletOutManage',
      dxDataGridForkPalletRef: 'palletOutManageForkPallet',
      dxDataGridForkOutRef: 'palletOutForkOut',


    


      matCd:[],
      gridAuto: [],
      gridAutoOut: [],
      gridAutoPallet:[],

      gridFork: [],
      gridForkPallet: [],
      gridForkOut:[],



       
      matList: [],
      matListSeach:[],

      palletId:[],
      palletIdList:[],
      palletIdListLook:[],



    matCdFork:[],
    palletIdFork:[],
    palletIdForkList:[],
    matCdForkList:[],


      focusedRowData: null,

      scCheck:'N',
      compelteYn:'N',

    }
  },
  computed: {
    gridAutoInstance() {
      return this.GetDataGrid(this.dxDataGridAutoMainRef)
    },
    gridAutoOutInstance() {
      return this.GetDataGrid(this.dxDataGridAutoOutRef)
    },
    gridAutoPalletInstance(){
      return this.GetDataGrid(this.dxDataGridAutoPalletRef)
    },



    gridForkInstance() {
      return this.GetDataGrid(this.dxDataGridForkMainRef)
    },
    gridForkOutInstance() {
      return this.GetDataGrid(this.dxDataGridForkOutRef)
    },
    gridForkPalletInstance(){
      return this.GetDataGrid(this.dxDataGridForkPalletRef)
    }
  },





  beforeMount() {


    let paramsAP = {
        matCd:this.matCd.toString(),
        palletId:this.palletId.toString(),
        barcodeNo:'',
        useYn: 'Y',
        delYn: 'N'
    }
    
     let paramsAM = {
        matCd:this.matCd.toString(),
        palletId:this.palletId.toString(),
        barcodeNo:'',
        useYn: 'Y',
        delYn: 'N'
    }
   
    let paramsFP = {
        matCd:this.matCdFork.toString(),
        palletId:this.palletIdFork.toString(),
        barcodeNo:'',
        useYn: 'Y',
        delYn: 'N'
    }
    
     let paramsFM = {
        matCd:this.matCdFork.toString(),
        palletId:this.palletIdFork.toString(),
        barcodeNo:'',
        useYn: 'Y',
        delYn: 'N'
    }
   
    Promise.all([
      getComboMatCdPalletOut(paramsAM), //0
      getCombopalletIdPalletOut(paramsAP), //1
      getComboStdMatManage(),//2
      getComboMatCdPalletOutFork(paramsFP),//3
      getCombopalletIdPalletOutFork(paramsFM),//4
    ])
    
      .then(res => {

            
       
        this.palletIdList = res[1].listResponse.list.slice()
        this.palletIdList.unshift({ palletId: '', palletNm: '전체' })

        this.palletIdListLook = res[1].listResponse.list.slice()
        
         this.matListSeach =res[0] .listResponse.list.slice()
         this.matListSeach.unshift({ matCd: '', matNm: '전체' })

         this.matCdForkList =res[3] .listResponse.list.slice()
         this.matCdForkList.unshift({ matCd: '', matNm: '전체' })

        this.palletIdForkList = res[4].listResponse.list.slice()
        this.palletIdForkList.unshift({ palletId: '', palletNm: '전체' })
  



         this.matList=res[2].listResponse.list.slice()
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
    
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          if (e.dataField == 'partnerId') this.gridAutoInstance.refresh()
          defaultValueChangeHandler(args)
        }
      }
    },



    onEditorPreparingAutoDetail(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'priority':
            e.editorOptions.readOnly = e.row.data.scCheck == 'Y' ||   e.row.data.compelteYn == 'Y'
            break;
          default:
            break;
        }
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          defaultValueChangeHandler(args)
        }
      }
    },
    



    btnSearchAuto() {
      this.openLoading('searching')
   
      this.doSearchAuto(true)
        .finally(() => {
          this.endLoading()
        })
        this.doSearchAutoOut()
        .finally(() => {
          this.endLoading()
        })
        

    },

    doSearchAuto(isProgress) {

      let params = {
        matCd:this.matCd.toString(),
        palletId:this.palletId.toString(),
        barcodeNo:'',
        useYn: 'Y',
        delYn: 'N',
      } 
    
      this.gridInitAuto()
    
      return getPalletOut(params, isProgress)
        .then(res => {
          this.gridAuto = res.listResponse.list
          for(let gridAutoPallet of this.gridAutoPallet ){
            this.gridAuto = this.gridAuto.filter(el=>!gridAutoPallet.barcodeNo.includes(el.barcodeNo))
          }
        
          if(this.gridAuto.length) this.gridAutoInstance.option('focusedRowIndex', 0)
           
        })
    },
   
   
      
         
  



    
    onFocusedRowChanged(e) {
     
      this.focusedRowData = e.row && e.row.data

     


      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        this.gridAutoOut = []
        return
      }

           
      this.openLoading('searching')
      
      this.doSearchAutoOut(e.row.data.palletId,e.row.data.barcodeNo)
        .finally(() => {
          this.endLoading()
        })
      
    
    
    
    },




    async  btnAdd(){

      
      
      let selectedMainRows = await this.gridAutoInstance.getSelectedRowsData()
      let selectedDetailRows =  this.gridAutoPalletInstance.getSelectedRowsData()
      let selectedRowKeys = await this.gridAutoInstance.getSelectedRowKeys()
      
     

          if(selectedMainRows.length <= 0){
               this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
            return
           }

      for(var gridAutoPallet of this.gridAutoOut){
        for (var pallet of selectedMainRows){
            if(pallet.palletId == gridAutoPallet.palletId){
              this.vToastify(this.$t('동일한 PalletId는 추가하실수 없습니다.'), 'warn')
              return
            }
        }
      }
      

      
    /////////////////////////////////////////////////////////////////
      for (var palletRow of selectedMainRows)
      { 
          let newRow = {
          id: this.gridAutoPallet.length + 1,
          palletId: palletRow.palletId,
          barcodeNo: palletRow.barcodeNo,
          calcQty: palletRow.calcQty,
          outEnable:palletRow.outEnable,
          mainClass:palletRow.mainClass,
          middleClass:palletRow.middleClass,
          matCd:palletRow.matCd,
          locationInfo:palletRow.locationInfo,
          workQty:palletRow.calcQty,
          row:palletRow.row,
          col:palletRow.col,
          lev:palletRow.lev,
        }
        
      this.gridAutoPalletInstance.newRow(newRow)
      this.gridAutoPalletInstance.selectRows(newRow.id, true)
      this.gridAutoPalletInstance.option('focusedRowIndex', 0)
      
      this.gridAuto = this.gridAuto.filter(el =>!selectedRowKeys.includes(el.id))
      }
      
      /////////////////////////////////////////////////////////////////
    },




    async  btnDel(){
      let selectedMainRows = await this.gridAutoInstance.getSelectedRowsData()
      let selectedDetailRows = await this.gridAutoPalletInstance.getSelectedRowsData()
      let selectedRowKeys = await this.gridAutoInstance.getSelectedRowKeys()
      let selectedRowKeysDetail = await this.gridAutoPalletInstance.getSelectedRowKeys()

      
    ////////////////////////////////////////////////////////////////
    
     if(selectedDetailRows.length <= 0){
               this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
            return
           }
    
  
      for (var autoRow of selectedDetailRows)
      {
          let newRow = {
          id: this.gridAuto.length + 1,
          mainClass:autoRow.mainClass,
          middleClass:autoRow.middleClass,
          matCd:autoRow.matCd,
          palletId:autoRow.palletId,
          barcodeNo:autoRow.barcodeNo,
          locationInfo:autoRow.locationInfo,
          calcQty:autoRow.calcQty,
          row:autoRow.row,
          col:autoRow.col,
          lev:autoRow.lev,          
        }
      this.gridAutoInstance.newRow(newRow)
      this.gridAutoInstance.selectRows(newRow.id, true)
      this.gridAutoInstance.option('focusedRowIndex', 0)
      this.gridAutoPallet = this.gridAutoPallet.filter(el => !selectedRowKeysDetail.includes(el.id)) 
      }
      /////////////////////////////////////////////////////////////////
            
       

        },

    



    doSearchAutoOut() {
     
      let params = {
        matCd:this.matCd.toString(),
        palletId:this.palletId.toString(),
        jobNo:''
      } 
        
      return getPalletOutDetail(params, false)
        .then(res => {  
         
          
          this.gridAutoOutInit()
          this.gridAutoOut = res.listResponse.list
          this.gridAutoOutInstance.option('focusedRowIndex', 0)
          
        })
        
    },

   






    async btnSavedAutoOut() {
  
      this.gridAutoOutInstance.saveEditData()
      var selectedDetailRows = await this.gridAutoOutInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      //유효성 체크


      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridAutoOutInstance.beginUpdate()
          
          savePalletOutDetail(selectedDetailRows, true)
            .then(res => {
          
              this.doSearchAutoOut()



            })
            .finally(() => {
              this.gridAutoOutInstance.endUpdate()
              this.endLoading()
              this.btnSearchAuto()
            })
        },
        null,
        true
      )
    },

   
   async btnSaveAutoPallet() {
  
      this.gridAutoPalletInstance.saveEditData()
       let selectedMainRows = await this.gridAutoInstance.getSelectedRowsData()
      var selectedDetailRows = await this.gridAutoPalletInstance.getSelectedRowsData()
       if (!selectedDetailRows.length) {
         this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
         return
       }
     
      for(var SaveautoPallet of selectedDetailRows){
         
          
        if(SaveautoPallet.workQty < 1){
          this.vToastify(this.$t('출고 수량이 0보다 커야합니다.'), 'warn')
          return
        }
        
        else if(Number(SaveautoPallet.calcQty) < Number(SaveautoPallet.workQty))
        {
          this.vToastify(this.$t('출고 수량이 재고 수량보다 작아야 합니다.'), 'warn')
          return}
     
    
      }


    

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridAutoPalletInstance.beginUpdate()
          savePalletOut(this.gridAutoPallet, true)
            .then(res => {
       



            this.doSearchAuto()
            this.doSearchAutoOut()

            this.gridAutoPallet = []

            })
            .finally(() => {
              
              this.gridAutoPalletInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },


 async btnDeleteAutoOut() {


      let selectedDetailRows = await this.gridAutoOutInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

  
    

      for (var row of selectedDetailRows) { 

        if(row.scCheck=='Y' || row.compelteYn == "Y"){
        this.vToastify(this.$t('S/C체크나 완료 여부가 체크되어있으면 삭제하실 수 없습니다.'), 'warn')
        return
        }
      }
      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        current => {
          this.openLoading()
          this.gridAutoOutInstance.beginUpdate()
          deletePalletOutDetail(selectedDetailRows.filter(row => !row.isCreated), true)
            .then(res => {
              
              this.btnSearchAuto(this.focusedRowData.palletId)
            })
            .finally(() => {
               
              this.gridAutoOutInstance.endUpdate()
              this.endLoading()
              
            })
        },
        null,
        true
      )
    },
    btRefreshAutoPallet(){
      this.gridAutoPallet = []

      let params = {
        matCd:this.matCd.toString(),
        palletId:this.palletId.toString(),
        barcodeNo:'',
        useYn: 'Y',
        delYn: 'N',
      }
    
      this.gridInitAuto()
    
      return getPalletOut(params,)
        .then(res => {
          this.gridAuto = res.listResponse.list
  
        if(this.gridAuto.length) this.gridAutoInstance.option('focusedRowIndex', 0)
           
        })
   
    },








   

    gridAutoInit() {
      this.gridAutoInstance.clearSelection()
      this.gridAutoInstance.cancelEditData()
      this.gridAutoInstance.option('focusedRowIndex', -1)
    },

    gridAutoOutInit() {
      this.gridAutoOutInstance.clearSelection()
      this.gridAutoOutInstance.cancelEditData()
      this.gridAutoOutInstance.option('focusedRowIndex', -1)
    },

    gridAutoPalletInit() {
      this.gridAutoPalletInstance.clearSelection()
      this.gridAutoPalletInstance.cancelEditData()
      this.gridAutoPalletInstance.option('focusedRowIndex', -1)
    },

    gridInitAuto() {
      this.gridAutoInit()
      this.gridAutoOutInit()
      this.gridAutoPalletInit()
    },






  /// 지게차라인 ///////////////



    onEditorPreparingForkMain(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
    
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          if (e.dataField == 'partnerId') this.gridForkInstance.refresh()
          defaultValueChangeHandler(args)
        }
      }
    },



    onEditorPreparingForkDetail(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'priority':
            e.editorOptions.readOnly = e.row.data.scCheck == 'Y' ||   e.row.data.compelteYn == 'Y'
            break;
          default:
            break;
        }
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          defaultValueChangeHandler(args)
        }
      }
    },
    

 

    btnSearchFork() {
      this.openLoading('searching')
   
      this.doSearchFork(true)
        .finally(() => {
          this.endLoading()
        })

      this.doSearchForkOut()
        .finally(() => {
          this.endLoading()
        })

    },

    doSearchFork(isProgress) {

      let params = {
        matCd:this.matCdFork.toString(),
        palletId:this.palletIdFork.toString(),
        barcodeNo:'',
        useYn: 'Y',
        delYn: 'N',
        
      }
      this.gridInitFork()

      return getPalletOutFork(params, isProgress)
        .then(res => {

          this.gridFork = res.listResponse.list

          for(let gridForkPallet of this.gridForkPallet ){
            this.gridFork = this.gridFork.filter(el=>!gridForkPallet.barcodeNo.includes(el.barcodeNo))
          }
   
         
          if(this.gridFork.length) this.gridForkInstance.option('focusedRowIndex', 0)
           
        })
    },
   
   

    





    async btnSaveForkOut() {

      this.gridForkOutInstance.saveEditData()
      var selectedMainRows = await this.gridForkOutInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

    
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridForkInstance.beginUpdate()
            savePalletOutForkDetail(selectedMainRows, true)
            .then(res => {
              this.doSearchFork()
              this.doSearchForkOut()
            })
            .finally(() => {
              this.gridForkInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )

    },


    onFocusedForkRowChanged(e) {
     
      this.focusedRowData = e.row && e.row.data

     


      if (e.rowIndex < 0 || !!e.row.data.isCreated) {
        this.gridForkOut = []
        return
      }


      this.openLoading('searching')
      
      this.doSearchForkOut(e.row.data.palletId,e.row.data.barcodeNo)
        .finally(() => {
          this.endLoading()
        })
   
    
    },




    async  btnForkAdd(){

      
      
      let selectedMainRows = await this.gridForkInstance.getSelectedRowsData()
      let selectedDetailRows = await this.gridForkPalletInstance.getSelectedRowsData()
      let selectedRowKeys = await this.gridForkInstance.getSelectedRowKeys()
      
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      // for(let i = 0; i<selectedMainRows.length; i++){
      //       var caul = (selectedMainRows[i].palletId == selectedMainRows[0].palletId )
            
      //      if (caul == false){
      //       this.vToastify(this.$t('Pallet ID는 한종류만 추가가능합니다.'), 'warn')
      //       return
      //      }
           
      //      }

      //  for(var Palletdosen of this.gridAutoPallet){
      //   for (var palletPalletdosen of selectedMainRows){
      //       if(Palletdosen.palletId != palletPalletdosen.palletId){
      //         this.vToastify(this.$t('Pallet ID는 한종류만 추가가능합니다.'), 'warn')
      //         return
      //       }
      //   }
      // }





      for(var gridForkPallet of this.gridForkOut){
        for (var pallet of selectedMainRows){
            if(pallet.palletId == gridForkPallet.palletId){
              this.vToastify(this.$t('동일한 PalletId는 추가하실수 없습니다.'), 'warn')
              return
            }
        }
      }
      

      
    /////////////////////////////////////////////////////////////////
      for (var palletRow of selectedMainRows)
      { 
         let newRow = {
          id: this.gridForkPallet.length + 1,
          palletId: palletRow.palletId,
          barcodeNo: palletRow.barcodeNo,
          calcQty: palletRow.calcQty,
          outEnable:palletRow.outEnable,
          mainClass:palletRow.mainClass,
          middleClass:palletRow.middleClass,
          matCd:palletRow.matCd,
          locationInfo:palletRow.locationInfo,
          workQty:palletRow.calcQty,
          row:palletRow.row,
          col:palletRow.col,
          lev:palletRow.lev,
        }
        
      this.gridForkPalletInstance.newRow(newRow)
      this.gridForkPalletInstance.selectRows(newRow.id, true)
      this.gridForkPalletInstance.option('focusedRowIndex', 0)
      this.gridFork = this.gridFork.filter(el => !selectedRowKeys.includes(el.id))
      }
      
      /////////////////////////////////////////////////////////////////
    },




    async  btnForkDel(){
      let selectedMainRows = await this.gridForkInstance.getSelectedRowsData()
      let selectedDetailRows = await this.gridForkPalletInstance.getSelectedRowsData()
      let selectedRowKeys = await this.gridForkInstance.getSelectedRowKeys()
      let selectedRowKeysDetail = await this.gridForkPalletInstance.getSelectedRowKeys()





         if(selectedDetailRows.length <= 0){
               this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
            return
           }
    
    /////////////////////////////////////////////////////////////////
      for (var forkRow of selectedDetailRows)
      {
          let newRow = {
          id: this.gridFork.length + 1,
          mainClass:forkRow.mainClass,
          middleClass:forkRow.middleClass,
          matCd:forkRow.matCd,
          palletId:forkRow.palletId,
          barcodeNo:forkRow.barcodeNo,
          locationInfo:forkRow.locationInfo,
          calcQty:forkRow.calcQty,
        }
      this.gridForkInstance.newRow(newRow)
      this.gridForkInstance.selectRows(newRow.id, true)
      this.gridForkInstance.option('focusedRowIndex', 0)
      this.gridForkPallet = this.gridForkPallet.filter(el => !selectedRowKeysDetail.includes(el.id)) 
      }
      /////////////////////////////////////////////////////////////////
            
       

        },

    



    doSearchForkOut() {
     
      let params = {
        matCd:this.matCdFork.toString(),
        palletId:this.palletIdFork.toString(),
        jobNo:''
      } 
        
      return getPalletOutForkDetail(params, false)
        .then(res => {  
         

          this.gridForkOutInit()
          this.gridForkOut = res.listResponse.list
          this.gridForkOutInstance.option('focusedRowIndex', 0)
        })
        
    },

   






    async btnSavedForkOut() {
  
      this.gridForkOutInstance.saveEditData()
      var selectedDetailRows = await this.gridForkOutInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      //유효성 체크


      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridForkOutInstance.beginUpdate()

          savePalletOutDetail(selectedDetailRows, true)
            .then(res => {
              
              this.doSearchForkOut()
              this.doSearchFork()
            })
            .finally(() => {
              this.gridForkOutInstance.endUpdate()
              this.endLoading()
              this.btnSearchFork()
            })
        },
        null,
        true
      )
    },

   
   async btnSaveForkPallet() {
  
      this.gridForkPalletInstance.saveEditData()
      var selectedDetailRows = await this.gridForkPalletInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
     
      for(var SaveforkPallet of selectedDetailRows){

        if(SaveforkPallet.calcQty < 1){
          this.vToastify(this.$t('출고 수량이 0보다 커야합니다.'), 'warn')
          return
        }
        else if(Number(SaveforkPallet.calcQty) < Number(SaveforkPallet.workQty))
        {
          this.vToastify(this.$t('출고 수량이 재고 수량보다 작아야 합니다.'), 'warn')
          return}
      
      }


    

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridForkPalletInstance.beginUpdate()
          savePalletOutFork(this.gridForkPallet, true)
            .then(res => {
       
            this.doSearchForkOut()
              this.doSearchFork()
            
            this.gridForkPallet = []

            })
            .finally(() => {-
                this.doSearchForkOut()
              this.doSearchFork()
              this.gridForkPalletInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },


 async btnDeleteForkOut() {


      let selectedDetailRows = await this.gridForkOutInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

  
    

      for (var row of selectedDetailRows) { 
    
        if(row.scCheck=='Y' || row.compelteYn == "Y"){
        this.vToastify(this.$t('S/C체크나 완료 여부가 체크되어있으면 삭제하실 수 없습니다.'), 'warn')
        return
        }
      }
      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        current => {
          this.openLoading()
          this.gridForkOutInstance.beginUpdate()
          deletePalletOutForkDetail(selectedDetailRows.filter(row => !row.isCreated), true)
            .then(res => {
              
              this.btnSearchFork(this.focusedRowData.palletId)
            })
            .finally(() => {
                this.doSearchForkOut()
              this.doSearchFork()
              this.gridForkOutInstance.endUpdate()
              this.endLoading()
              
            })
        },
        null,
        true
      )
    },

      btRefreshFrokPallet(){
      this.gridForkPallet = []

        let params = {
            matCd:this.matCdFork.toString(),
            palletId:this.palletIdFork.toString(),
            barcodeNo:'',
            useYn: 'Y',
            delYn: 'N',
            
          }

      this.gridInitFork()

      return getPalletOutFork(params)
        .then(res => {

          this.gridFork = res.listResponse.list

          if(this.gridFork.length) this.gridForkInstance.option('focusedRowIndex', 0)
           
        })
   
    },

    gridForkInit() {
      this.gridForkInstance.clearSelection()
      this.gridForkInstance.cancelEditData()
      this.gridForkInstance.option('focusedRowIndex', -1)
    },

    gridForkOutInit() {
      this.gridForkOutInstance.clearSelection()
      this.gridForkOutInstance.cancelEditData()
      this.gridForkOutInstance.option('focusedRowIndex', -1)
    },

    gridForkPalletInit() {
      this.gridForkPalletInstance.clearSelection()
      this.gridForkPalletInstance.cancelEditData()
      this.gridForkPalletInstance.option('focusedRowIndex', -1)
    },

    gridInitFork() {
      this.gridForkInit()
      this.gridForkOutInit()
      this.gridForkPalletInit()
    },
   
    changeInputmat(value) {
      this.matCd = value
    },

    changeInputPallet(value) {
      this.palletId = value
    },
    changeInputmatFork(value) {
      this.matCdFork = value
    },


  }
}
</script>

