<template>
  <v-container fluid fill-height align-start ma-0 pa-2 pt-0 pb-0>
  <v-tabs color="#000">
    <v-tab class="mr-2">스태커 크레인</v-tab>
    <v-tab>컨베어</v-tab>
  <v-tab-item>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
         
          @btnSearch="btnSearchAuto()"
     
        >
          <template v-slot:body>
            <v-layout column class="pl-1 pr-1">
              <v-row no-gutters class="center pa-2 pb-0">
                <span class="px-1 pt-1">{{'설비 상태일:'}}</span>
                <v-col cols="auto" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="statusAtFromAuto"
                    :max="statusAtToAuto"
                    height="30px"
                    width="150px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {statusAtFromAuto = e.value && getDateFormat(e.value)}"
                  />
                </v-col>
                <p>~</p>
                <v-col cols="auto" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="statusAtToAuto"
                    :min="statusAtFromAuto"
                    height="30px"
                    width="150px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {statusAtToAuto = e.value && getDateFormat(e.value)}"
                  />
                </v-col> 
                  <v-col cols="12" md="3" class="py-2 py-md-0">
                  <v-text-field
                    label="작업 지시서 번호"
                    class="search-text-field"
                    dense
                    outlined
                    color="primary"
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @keydown.enter="btnSearchAuto()"
                    clearable
                    v-model="jobNo"
                  />
                </v-col>               
              
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="설비 상태 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="EquipStatusInfoAutoMain"
                  class="layout-col-height01"
                  :ref="dxDataGridAutoMainRef"
                  :data-source="gridMainAuto"
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
                  :selection="{ mode:'none' }"
                  :editing="{ allowUpdating: false }"                  
                  @editor-preparing="onEditorPreparing"
                >
                <DxColumn data-field="statusAt" caption="설비 상태일시" format="yyyy-MM-dd hh:mm:ss"  data-type="date" alignment="center" :allow-editing="false"/>

                  <DxColumn data-field="sigStatus" caption="통신 상태" data-type="string" alignment="center" :allow-editing="false">
                       <DxLookup
                        :data-source="sigStatusLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                  </DxColumn>
                      
           

                  <DxColumn data-field="scMode" caption="MODE"  data-type="string" alignment="center" :allow-editing="false">
                   <DxLookup
                        :data-source="scModeLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                  </DxColumn>

                  <DxColumn data-field="status" caption="작업 상태"  data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup
                        :data-source="ScStatusLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                  </DxColumn>

                  <DxColumn data-field="jobNo" caption="작업 지시서 번호" data-type="string" alignment="center" :allow-editing="false"/>

                  <DxColumn data-field="position" caption="위치" data-type="string" alignment="center" :allow-editing="false" >
                
                  </DxColumn>
                  <DxColumn data-field="errorAt" caption="에러 시간"  format="yyyy-MM-dd hh:mm:ss" data-type="date" alignment="center" :allow-editing="false"/>

                  <DxColumn data-field="errorCd" caption="에러 코드"   data-type="string" alignment="center" :allow-editing="false">
                   <DxLookup
                        :data-source="SCerrorCdLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                  </DxColumn>

                     <DxColumn data-field="errorCd" caption="에러 설명" name="errorDesc"  width="400px" data-type="string" alignment="left" :allow-editing="false">
                   <DxLookup
                        :data-source="errorSCDescLookUp"
                        value-expr="minorCd"
                        display-expr="minorDesc"
                      />
                  </DxColumn>
                   <DxColumn data-field="dummy" width="600px" caption="" data-type="string" alignment="left"  :allow-editing="false"/>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
    </v-row>
  </v-tab-item>

<!-- -------------- 지게차 라인 ----------------- -->

  <v-tab-item>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
 
          @btnSearch="btnSearchMaual()"
         
        >
          <template v-slot:body>
             <v-layout column class="pl-1 pr-1">
              <v-row no-gutters class="center pa-2 pb-0">
                <span class="px-1 pt-1">{{'설비 상태일:'}}</span>
                <v-col cols="auto" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="statusAtFromMaual"
                    :max="statusAtToMaual"
                    height="30px"
                    width="150px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {statusAtFromMaual = e.value && getDateFormat(e.value)}"
                  />
                </v-col>
                <p>~</p>
                <v-col cols="auto" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="statusAtToMaual"
                    :min="statusAtFromMaual"
                    height="30px"
                    width="150px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {statusAtToMaual = e.value && getDateFormat(e.value)}"
                  />
                </v-col>                
              
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="설비 상태 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="EquipStatusInfoMaualMain"
                  class="layout-col-height01"
                  :ref="dxDataMaualGridMainRef"
                  :data-source="gridMainMaual"
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
                  :selection="{ mode:'none' }"
                  :editing="{ allowUpdating: false }"                  
                  @editor-preparing="onEditorPreparing"
                >
                  <DxColumn data-field="statusAt" caption="설비 상태일시" data-type="date" format="yyyy-MM-dd hh:mm:ss" alignment="center" :allow-editing="false"/>

                  <DxColumn data-field="sigStatus" caption="통신 상태" width="120px" data-type="string" alignment="center"  :allow-editing="false">
                    <DxLookup
                        :data-source="sigStatusLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                  </DxColumn>

                  <DxColumn data-field="cvMode" caption="MODE" width="120px"  data-type="string" alignment="center" :allow-editing="false">
                   <DxLookup
                        :data-source="cvModeLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                  </DxColumn>

                  <DxColumn data-field="status" caption="작업 상태" width="120px"  data-type="string" alignment="center" :allow-editing="false">
                    <DxLookup
                        :data-source="CvStatusLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                  </DxColumn>

                  <DxColumn data-field="errorAt" caption="에러 시간" format="yyyy-MM-dd hh:mm:ss"  data-type="date" alignment="center" :allow-editing="false"/>

                  <DxColumn data-field="errorCd" caption="에러 코드"  width="200px" data-type="string" alignment="center" :allow-editing="false">
                   <DxLookup
                        :data-source="errorCVCdLookUp"
                        value-expr="code"
                        display-expr="desc"
                      />
                  </DxColumn>
                  <DxColumn data-field="errorCd" caption="에러 설명" name="errorDesc"  width="400px" data-type="string" alignment="left" :allow-editing="false">
                   <DxLookup
                        :data-source="errorDescLookUp"
                        value-expr="minorCd"
                        display-expr="minorDesc"
                      />
                  </DxColumn>

               
                  <DxColumn data-field="dummy" width="600px" caption="" data-type="string" alignment="left"  :allow-editing="false"/>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
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

import{getLocationDescMatCdWmsMatAdjustManage,} from '@/api/kier/wms/matAdjustManage'
import {
  getComboEquipStatusInfo,
  getEquipStatusInfoMain,
  getEquipStatusInfoDetail
} from '@/api/kier/equipmaint/EquipStatusInfo'

import { getDateFormat,getPreDay} from '@/utils/common.js'

import { getCommonCode } from '@/api/kier/standard/commonCodeManage'


export default {
  name: 'EquipStatusInfo',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxDateBox,
    DxLookup,
  },
  data() {
    return {
      dxDataGridAutoMainRef: 'EquipStatusInfoAutoMain',
      dxDataMaualGridMainRef: 'EquipStatusInfoMaualMain',
      gridMainAuto: [],
      gridMainMaual: [],
      sigStatusLookUp:[],
      scModeLookUp:[],
      ScStatusLookUp:[],
      errorCdLookUp:[],
      SCerrorCdLookUp:[],
      errorCVCdLookUp:[],
      errorDescLookUp:[],
      errorSCDescLookUp:[],
      // locationIdLookUp:[], 위치
      statusLookUp:[],



      cvModeLookUp:[],
      CvStatusLookUp:[],

      
      jobNo: '',
      delYn: 'N',
      hrIdLookUp: [],
      statusAtToAuto:getPreDay(-1),
      statusAtFromAuto:getPreDay(0),
      statusAtToMaual:getPreDay(-1),
      statusAtFromMaual:getPreDay(0),





    }
  },
  computed: {
    gridMainAutoInstance() {
      return this.GetDataGrid(this.dxDataGridAutoMainRef)
    },
    gridMainMaualInstance() {
      return this.GetDataGrid(this.dxDataMaualGridMainRef)
    }
  },

  beforeMount() {
    let params={

    }
    Promise.all([
      getCommonCode('S0014'), //통신상태 0
      getCommonCode('U0001'), //SC이상 1
      getCommonCode('U0002'), //CV이상 2 
      getCommonCode('U0003'), //SC모드 3
      getCommonCode('U0004'), //CV모드 4
      getCommonCode('U0005'), //S/C상태 5
      getCommonCode('U0006'), //C/V상태 6 
      getComboEquipStatusInfo(params), // 에러코드 
      // getLocationDescMatCdWmsMatAdjustManage(), //위치 7
    ])
      .then( res => {
          //SC
          this.SCerrorCdLookUp = res[1].listResponse.list.slice()
          this.scModeLookUp = res[3].listResponse.list.slice()
          this.ScStatusLookUp = res[5].listResponse.list.slice()
          this.errorSCDescLookUp = res[7].listResponse.list.slice()

        //Cv
            this.sigStatusLookUp = res[0].listResponse.list.slice()
            this.cvModeLookUp =res[4].listResponse.list.slice()
            this.CvStatusLookUp =res[6].listResponse.list.slice()
            this.errorDescLookUp = res[7].listResponse.list.slice()
            this.errorCVCdLookUp = res[2].listResponse.list.slice()
      })
      .catch(error => {})
  },


  methods: {
    getDateFormat(date) {
      return getDateFormat(date)
    },

    onEditorPreparing(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          defaultValueChangeHandler(args)
        }
      }
    },


    btnSearchAuto() {
      this.openLoading('searching')
      this.doSearchMainAuto(true)
        .finally(() => {
          this.endLoading()
        })
    },

    doSearchMainAuto(isProgress) {
      let params = {
        statusAtFrom: this.statusAtFromAuto,
        statusAtTo: this.statusAtToAuto,
        jobNo:this.jobNo
      }

      this.gridInit()
      return getEquipStatusInfoMain(params, isProgress)
        .then(res => {
          this.gridMainAuto = res.listResponse.list
          if(this.gridMainAuto.length) this.gridMainAutoInstance.option('focusedRowIndex', 0)
        })
    },


    btnSearchMaual() {
      this.openLoading('searching')
      this.doSearchMainMaual(true)
        .finally(() => {
          this.endLoading()
        })
    },

    doSearchMainMaual(isProgress) {
      let params = {
        statusAtFrom: this.statusAtFromMaual,
        statusAtTo: this.statusAtToMaual,
      }

      this.gridInitMaual()
      return getEquipStatusInfoDetail(params, isProgress)
        .then(res => {
    
          this.gridMainMaual = res.listResponse.list
          if(this.gridMainMaual.length) this.gridMainMaualInstance.option('focusedRowIndex', 0)
        })
    },


    gridInit() {
      this.gridMainAutoInstance.clearSelection()
      this.gridMainAutoInstance.cancelEditData()
      this.gridMainAutoInstance.option('focusedRowIndex', -1)
    },
    gridInitMaual() {
      this.gridMainMaualInstance.clearSelection()
      this.gridMainMaualInstance.cancelEditData()
      this.gridMainMaualInstance.option('focusedRowIndex', -1)
    }
  }
}
</script>