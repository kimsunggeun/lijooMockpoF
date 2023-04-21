<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12">
        <i-card-top class="d-flex">
          <template v-slot:body>
            <v-row dense align="center">
              <v-col cols="5">
                <v-text-field
                  class="rounded-0"
                  v-model="palletId"
                  label="Pallet ID"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @keydown.enter="(e) => {
                    e.target.select()
                    btnSearchMain()
                  }"
                  clearable
                />
              </v-col>
              <v-col cols="3">
                <v-text-field
                  class="rounded-0"
                  v-model="barcodeNo"
                  label="바코드 번호"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @keydown.enter="(e) => {
                    e.target.select()
                    btnSearchMain()
                  }"
                  clearable
                />
              </v-col>
              <v-spacer/>
              <v-col cols="auto">
                <span>재고(X): </span>
                <DxButton/>
                <span> 재고(O): </span>
                <DxButton type="success"/>
                <span> 이중출고: </span>
                <DxButton type="mat-doubleEntry"/>
                <span> 공출고: </span>
                <DxButton type="danger"/>
              </v-col>
            </v-row>
            <v-row dense align="center" class="mt-0">
              <v-col cols="4">
                <v-select
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="rounded-0"
                  item-text="palletNm"
                  item-value="palletId"
                  :prepend-inner-icon="$t('$search')"
                  :items="palletIdList"
                  label="Pallet ID"
                  dense
                  outlined
                  multiple
                  clearable
                  v-model="palletIdSelect"
                >
                </v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="rounded-0"
                  item-text="matNm"
                  item-value="matCd"
                  :prepend-inner-icon="$t('$search')"
                  :items="matList"
                  label="품목"
                  dense
                  outlined
                  multiple
                  clearable
                  v-model="matSelect"
                >
                </v-select>
              </v-col>
      
              <v-spacer/>
              <v-col cols="auto">
                <v-btn
                  class="rounded-0 ml-1 pr-7 pl-1"
                  outlined
                  color="btn_bg"
                  height="30px"
                  fontWeight="bold"
                  @click="btnSearchMain()"
                >
                  <v-icon class="float-left" color="#000">${{'search'}}</v-icon>
                  <div
                    class="float-center mx-1"
                    :style="btnTextStyle"
                  >
                    조회
                  </div>
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  class="rounded-0 ml-1 pr-7 pl-1"
                  outlined
                  color="btn_bg"
                  height="30px"
                  fontWeight="bold"
                  @click="() => {countVisible = true}"
                >
                  <v-icon class="float-left" color="#000">${{'data_search'}}</v-icon>
                  <div
                    class="float-center mx-1"
                    :style="btnTextStyle"
                  >
                    집계 조회
                  </div>
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" class="pa-0 matgrid-height">
        <v-carousel v-model="carouselIdx" :show-arrows="false" height="100%">
          <v-carousel-item>
            <DxDataGrid
              id="materialInfoFirst"
              height="91.5%"
              :ref="dxDataGridFirstRef"
              :data-source="gridFirst"
              :remote-operations="false"
              :hover-state-enabled="true"
              :allow-column-resizing="false"
              :allow-column-reordering="false"
              :row-alternation-enabled="true"
              :column-auto-width="true"
              :show-borders="true"
              :width="grid.width"
              :show-row-lines="true"
              key-expr="id"
              :focused-row-enabled="false"
              :column-hiding-enabled="false"
              :paging="{ enabled: false }"
              :pager="{ visible: false }"
              :scrolling="{ rowRenderingMode: 'standard', useNative: false}"
              :selection="{ mode:'none' }"
              :editing="{ allowUpdating: false }"
              :on-initialized="() => null"
              :on-content-ready="() => null"
            >
            <DxColumn data-field="row" caption="행" data-type="string" alignment="center" :group-index="0"/>
            <DxColumn
              v-for="n in 10"
              :key="n"
              :data-field="`col${n}`"
              :caption="`${n}열`"
              width="9.5%"
              alignment="center"
              :allow-sorting="false"
              cell-template="btn-cell-template"
            />
            <template #btn-cell-template="{ data: cellInfo }">
              <v-badge
                style="width: 100%;"
                color="#FF852F"
                dot
                overlap
                :value="!!matInfoState[cellInfo.value].highlight">
                <DxButton
                  :ref="`gridButtonRef${cellInfo.value}`"
                  style="font-size: 12pt;"
                  :class="{
                    'mat-exist': matInfoState[cellInfo.value].matExist,
                    'mat-doubleEntry': matInfoState[cellInfo.value].matDoubleEntry,
                    'mat-GogRelease': matInfoState[cellInfo.value].matGogRelease,
                  }"
                  width="100%"
                  height="calc(11vh - 50px)"
                  :text="!!matInfoState[cellInfo.value].matExist ? matInfoState[cellInfo.value].palletId : ''"
                  @click="onCellClick(cellInfo)"
                >
                </DxButton>
              </v-badge>
            </template>
            <DxColumn data-field="lev" caption="단" data-type="string" alignment="center"/>
            
            </DxDataGrid>
          </v-carousel-item>
          <v-carousel-item>
            <DxDataGrid
              id="materialInfoSecond"
              height="58%"
              :ref="dxDataGridSecondRef"
              :data-source="gridSecond"
              :remote-operations="false"
              :hover-state-enabled="true"
              :allow-column-resizing="false"
              :allow-column-reordering="false"
              :row-alternation-enabled="true"
              :column-auto-width="true"
              :show-borders="true"
              :width="grid.width"
              :show-row-lines="true"
              key-expr="id"
              :focused-row-enabled="false"
              :column-hiding-enabled="false"
              :paging="{ enabled: false }"
              :pager="{ visible: false }"
              :scrolling="{ rowRenderingMode: 'standard', useNative: false}"
              :selection="{ mode:'none' }"
              :editing="{ allowUpdating: false }"
              :on-initialized="() => null"
              :on-content-ready="() => null"
            >
            <DxColumn data-field="row" caption="행" data-type="string" alignment="center" :group-index="0"/>
            <DxColumn
              v-for="n in 10"
              :key="n"
              :data-field="`col${n}`"
              :caption="`${n}열`"
              width="9.5%"
              alignment="center"
              :allow-sorting="false"
              cell-template="btn-cell-template"
            />
            <template #btn-cell-template="{ data: cellInfo }">
              <v-badge
                style="width: 100%;"
                color="#FF852F"
                dot
                overlap
                :value="!!matInfoState[cellInfo.value].highlight">
                <DxButton
                  :ref="`gridButtonRef${cellInfo.value}`"
                  style="font-size: 12pt;"
                  :class="{
                    'mat-exist': matInfoState[cellInfo.value].matExist,
                  }"
                  width="100%"
                  height="calc(11vh - 50px)"
                  :text="!!matInfoState[cellInfo.value].matExist ? matInfoState[cellInfo.value].palletId : ''"
                  @click="onCellClick(cellInfo)"
                >
                </DxButton>
              </v-badge>
            </template>
            <DxColumn data-field="lev" caption="단" data-type="string" alignment="center"/>
            
            </DxDataGrid>
            <v-row justify="center">
              <v-btn class="pa-7 ma-1" text @click="onAreaClick('IN_AREA')">
                <div :style="{'font-size': '24px', 'font-weight': 'bold'}">
                  입하장 재고: <span style="color:#6AB689">{{inAreaQty}}</span>
                </div>
              </v-btn>
              <v-btn class="pa-7 ma-1" text @click="onAreaClick('OUT_AREA')">
                <div :style="{'font-size': '24px', 'font-weight': 'bold'}">
                  출하장 재고: <span style="color:#1F4E79">{{outAreaQty}}</span>
                </div>
              </v-btn>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>


    <!-- 집계조회 -->
    
    <DxPopup
      :visible.sync="countVisible"
      :show-close-button="false"
      :show-title="false"
    >
      <v-row dense align="center">
        <v-col cols="4">
         <v-autocomplete
            :menu-props="{ offsetY: true }"
            color="primary"
            class="rounded-0"
            item-text="matNm"
            item-value="matCd"
            :prepend-inner-icon="$t('$search')"
            :items="matList"
            label="품목"
            dense
            outlined
            clearable
            v-model="matCdCount"
          >
         </v-autocomplete>

          
           
        </v-col>
        <v-col cols="2">
           <v-autocomplete
            :menu-props="{ offsetY: true }"
            color="primary"
            class="rounded-0"
            item-text="desc"
            item-value="code"
            :prepend-inner-icon="$t('$search')"
            :items="[{code: '', desc: '전체'}, {code: '01', desc: '1행'}, {code: '02', desc: '2행'}, {code: '03', desc: '3행'},]"
            label="행"
            dense
            outlined
            v-model="rackRow"
          >
           </v-autocomplete>
        </v-col>
        <v-spacer/>
        <v-col cols="auto">
          <v-btn
            tile
            outlined
            color="btn_bg"
            height="30px"
            width="65px"
            @click="btnCount()"
          >
            <v-icon left color="#000">${{'search'}}</v-icon>
            <span :style="btnTextStyle">조회</span>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            tile
            outlined
            color="btn_bg"
            height="30px"
            width="65px"
            @click="() => {countVisible = false}"
          >
            <v-icon left color="#000">${{'close'}}</v-icon>
            <span :style="btnTextStyle">닫기</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row dense align="center">
        <v-col cols="6">
          <i-search-panel :searchPanel="true"/>
        </v-col>
      </v-row>
      <DxDataGrid
        id="materialInfoCount"
        :ref="dxDataGridCountRef"
        :data-source="gridCount"
        :hover-state-enabled="true"
        :editing="{ allowUpdating: false }"
        :selection="{ mode:'single', deferred: false }"
       
        :column-hiding-enabled="false"
        :paging="{ enabled: false }"
        :pager="{ visible: false }"
        :scrolling="{ rowRenderingMode: 'standard'}"
        :on-initialized="() => null"
        :on-content-ready="() => null"
        height="85%"
        key-expr="id"
        class="sec_grid"
      >
        <DxColumn data-field="matCd" caption="품목명" width="350px" data-type="string" alignment="left" :group-index="0">
          <DxLookup
            :data-source="matList"
            value-expr="matCd"
            display-expr="matNm"
          />
        </DxColumn>
        <DxColumn data-field="palletId" caption="Pallet ID" data-type="string" width="140px" alignment="center"/>
        <DxColumn data-field="mainClass" caption="품목 대분류" width="auto" data-type="string" alignment="left"/>
        <DxColumn data-field="middleClass" caption="품목 중분류" width="auto" data-type="string" alignment="left"/>
        <DxColumn data-field="matCd2" caption="품목명" width="auto" data-type="string" alignment="left"
          :calculate-display-value="(rowData) => matMap.get(rowData.matCd)"
          :calculate-filter-expression="lookupColumnFilterExpression"
        />
        <DxColumn data-field="barcodeNo" caption="바코드 번호" data-type="string" width="180px" alignment="center"/>
        <DxColumn data-field="locationDesc" caption="위치" width="150px" data-type="string" alignment="center" :allow-editing="false"/>
        <!-- <DxColumn data-field="locationId" caption="위치" data-type="string" width="160px" alignment="center">
        <DxLookup
            :data-source="locationIdList"
            value-expr="code"
            display-expr="desc"
          />
        </DxColumn> -->
        <DxColumn data-field="qty" caption="재고 수량" data-type="number" width="90px" format="#,##0" alignment="right"/>
        <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left"/>
        <DxColumn data-field="useYn" caption="사용 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor"/>
        <template #checkBoxEditor="{ data: cellInfo }">
          <DxCheckBox 
            :value="cellInfo.value == 'Y' ? true : false" 
            :onValueChanged="value => onCheckValueChanged(value, cellInfo)"
            :read-only="true"
          />
        </template>
        <DxSummary>
          <DxGroupItem
            column='qty'
            summaryType='sum'
            valueFormat='#,##0'
            displayFormat ='합 : {0}'
            :alignByColumn = "true">
          </DxGroupItem>
          <DxTotalItem
            column="qty"
            summary-type="sum"
            valueFormat='#,##0'
            display-format="총 수량 : {0}"
          />
        </DxSummary>       
      </DxDataGrid>
    </DxPopup>

    <DxPopup
      :visible.sync="cellVisible"
      :show-close-button="false"
      :show-title="false"
      @shown="e => {$refs[dxDataGridCellRef].instance.repaint()}"
    >
      <v-row dense align="center">
        <v-col cols="auto">
          <span :style="btnTextStyle">{{cellPopUpTitle}}</span>
        </v-col>
        <v-spacer/>
        <v-col cols="auto">
          <v-btn
            tile
            outlined
            color="btn_bg"
            height="30px"
            width="65px"
            @click="() => {cellVisible = false}"
          >
            <v-icon left color="#000">${{'close'}}</v-icon>
            <span :style="btnTextStyle">닫기</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row dense align="center">
        <v-col cols="auto">
          <span :style="btnTextStyle">{{palletIdPopup}}</span>
        </v-col>
        <v-col cols="auto">
          <span :style="btnTextStyle">{{palletNmPopup}}</span>
        </v-col>
      </v-row>
      <v-row dense align="center">
        <v-col cols="6">
          <i-search-panel :searchPanel="true"/>
        </v-col>
      </v-row>
      <DxDataGrid
        id="materialInfoCell"
        :ref="dxDataGridCellRef"
        :data-source="gridCell"
        :hover-state-enabled="true"
        :editing="{ allowUpdating: false }"
        :selection="{ mode:'none', deferred: false }"
        :column-hiding-enabled="false"
        height="85%"
        width="100%"
        key-expr="id"
        class="sec_grid"
      >
        <DxColumn data-field="mainClass" caption="품목 대분류" width="auto" data-type="string" alignment="left"/>
        <DxColumn data-field="middleClass" caption="품목 중분류" width="auto" data-type="string" alignment="left"/>
        <DxColumn data-field="matCd" caption="품목명" width="auto" data-type="string" alignment="left"
          :calculate-display-value="(rowData) => matMap.get(rowData.matCd)"
          :calculate-filter-expression="lookupColumnFilterExpression"
        />
        <DxColumn data-field="palletId" caption="Pallet ID" data-type="string" width="90px" alignment="center" :visible="palletView"/>
        <DxColumn data-field="barcodeNo" caption="바코드 번호" data-type="string" width="180px" alignment="center"/>
        <DxColumn data-field="qty" caption="재고 수량" data-type="number" width="90px" format="#,##0" alignment="right"/>
        <DxColumn data-field="inWork" caption="입고 수량" data-type="number" width="90px" format="#,##0" alignment="right" /> 
        <DxColumn data-field="workQty" caption="작업 수량" data-type="number" width="90px" format="#,##0" alignment="right"/>
        <DxColumn data-field="outQty" caption="출고 수량" data-type="number" width="90px" format="#,##0" alignment="right"/>
        <DxColumn data-field="matDiv" caption="RACK 구분" data-type="string" width="90px"  alignment="center">
          <DxLookup
              :data-source="matDivList"
              value-expr="code"
              display-expr="desc"
            />
        </DxColumn>
        
        <DxColumn data-field="remark" caption="비고" data-type="string" width="auto" alignment="left"/>
      </DxDataGrid>

    </DxPopup>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxLookup,  DxSummary, DxTotalItem,DxGroupItem,} from 'devextreme-vue/data-grid'
import ICardTop from '@/components/common/iCardTop.vue'
import ISearchPanel from '@/components/common/iSearchPanel.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import DxButton from 'devextreme-vue/button'
import { DxPopup, DxToolbarItem } from 'devextreme-vue/popup';

import { getCommonCode } from '@/api/kier/standard/commonCodeManage'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getWmsMaterialInfo,
  getWmsMaterialInfoArea,
  getComboMultipalletIdWmsMaterialInfo,
  getWmsMaterialInfoPopup,
  getWmsMaterialInfoPopupArea,
} from '@/api/kier/wms/materialInfo'

import { getComboStdMatManage } from '@/api/kier/standard/matManage'

import { matInfoGridFirst, matInfoGridSecond, matInfoState } from './MaterialInfoGrid.js'

export default {
  name: 'MaterialInfo',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardTop,
    ISearchPanel,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxButton,
    DxPopup,
    DxSummary,
    DxGroupItem,
    DxTotalItem
  },
  data() {
    return {
      dxDataGridFirstRef: 'materialInfoFirst',
      dxDataGridSecondRef: 'materialInfoSecond',
      dxDataGridCountRef: 'materialInfoCount',
      dxDataGridCellRef: 'materialInfoCell',
      gridFirst: matInfoGridFirst,
      gridSecond: matInfoGridSecond,
      gridCount: [],
      gridCell: [],
      matDivList:[],
      carouselIdx: 0,
      palletId: '',
      barcodeNo: '',
      palletIdList: [],
      palletIdSelect: [],
      matList: [],
      matMap: new Map(),
      matSelect: [],
     
      inAreaQty: 0,
      outAreaQty: 0,
      btnTextStyle: { color: '#000', 'font-size': '15px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
      matInfoState: matInfoState,
      countVisible: false,
      matCdCount: '',
      rackRow:'',
      cellVisible: false,
      cellPopUpTitle: '',
      locationIdPopup: '',
      locationTypePopup: '',
      palletIdPopup: '',
      palletNmPopup: '',
      palletView: false,
      // inWorkView: false,
      locationIdList:[]
    }
  },
  computed: {
    gridFirstInstance() {
      return this.GetDataGrid(this.dxDataGridFirstRef)
    },
    gridSecondInstance() {
      return this.GetDataGrid(this.dxDataGridSecondRef)
    },
  },
  watch: {
    countVisible: function(val) {
      if(val) {
        this.beginUpdateAll()
      } else {
        this.gridCount = []
        this.endUpdateAll()
      }
    },
    cellVisible: function(val) {
      if(val) {
        this.beginUpdateAll()
      } else {
        this.gridCell = []
        this.locationIdPopup = ''
        this.locationTypePopup = ''
        this.palletIdPopup = ''
        this.palletNmPopup = ''
        this.endUpdateAll()
      }
    },
  },
  activated() {
    switch (this.$route.params.type) {
      case 'area':
        this.carouselIdx = 1
        break;
      case 'auto':
        this.carouselIdx = 0
        break;
      case 'manual':
        this.carouselIdx = 1
        break;
      default:
        break;
    }
    this.doSearchMain()
  },
  beforeMount() {
    Promise.all([
      getComboStdMatManage(),
      getComboMultipalletIdWmsMaterialInfo(),
      getCommonCode('S0016'),
      getCommonCode('S0008'),
      
    ])
      .then( res => {
        this.matList = res[0].listResponse.list.slice()
        this.matMap = this.matList.reduce((map, obj) => map.set(obj.matCd, obj.matNm), new Map)
        this.palletIdList = res[1].listResponse.list.slice()
        this.matDivList = res[2].listResponse.list.slice()
        this.locationIdList =res[3].listResponse.list.slice()

      })
      .catch(error => {})
  },
  methods: {
    onCellClick(cellInfo) {
      
      this.locationTypePopup = 'RACK'
      this.locationIdPopup = cellInfo.value
      this.palletIdPopup = `Pallet ID : '${this.matInfoState[cellInfo.value].palletId || ''}'`
      this.palletNmPopup = `Pallet 명 : '${this.matInfoState[cellInfo.value].palletNm || ''}'`
      this.palletView= false
      // this.inWorkView= true
      this.doSearchPopup()
    },
    onAreaClick(locationId) {
      this.locationTypePopup = 'AREA'
      this.locationIdPopup = locationId
      this.palletView= true
      // this.inWorkView= false
      this.doSearchPopup()
    },
    doSearchPopup() {
      let params = {
        
        palletId: '',
        palletNm: '',
        row: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(0,2) : null,
        col: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(2,4) : null,
        lev: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(4,6) : null,
        area: this.locationTypePopup == 'AREA' ? this.locationIdPopup : null,
      }
      this.openLoading('searching')
      getWmsMaterialInfoPopupArea(params, false)
        .then(res => {
          
          this.gridCell = res.listResponse.list
          this.cellPopUpTitle = this.locationTypePopup == 'RACK'
            ? `RACK 정보(행/열/단) : ${params.row} / ${params.col} / ${params.lev}`
            : `Area 정보 : ${params.area == 'IN_AREA' ? '입하장' : '출하장'}`
          this.cellVisible = true
        })
        .finally(() => {
          this.endLoading()
        })
    },

    btnSearchMain() {
      this.openLoading('searching')
      this.doSearchMain()
        .finally(() => {
          this.endLoading()
        })
    },

    doSearchMain() {
      let params = {
        palletId: this.palletId,
        barcodeNo: this.barcodeNo,
        matCdMulti: this.matSelect.toString(),
        palletIdMulti: this.palletIdSelect.toString(),
   
      }
      return Promise.all([
          getWmsMaterialInfo(params, false),
          getWmsMaterialInfoArea(),
        ])
        .then(res => {
          for (const property in this.matInfoState) {
            this.matInfoState[property].highlight = false
          }
          for(const rackInfo of res[0].listResponse.list) {
            this.matInfoState[rackInfo.locationId].palletId = rackInfo.palletId
            this.matInfoState[rackInfo.locationId].palletNm = rackInfo.palletNm
            this.matInfoState[rackInfo.locationId].matExist = rackInfo.matExistYn == 'Y' ? true : false
            this.matInfoState[rackInfo.locationId].highlight = rackInfo.matExistYn == 'Y' ? true : false
           
            this.matInfoState[rackInfo.locationId].matDoubleEntry = rackInfo.locStatus == "STS02"? true : false
            this.matInfoState[rackInfo.locationId].matGogRelease = rackInfo.locStatus == "STS03"? true : false

          }
          this.repaint()
          var inArea = res[1].listResponse.list.find(el => el.locationId == 'IN_AREA')
          this.inAreaQty = inArea && inArea.areaQty || 0
          var outArea = res[1].listResponse.list.find(el => el.locationId == 'OUT_AREA')
          this.outAreaQty = outArea && outArea.areaQty || 0
        })
    },

    btnCount() {
      let params = {
        matCd: this.matCdCount,
        row: this.rackRow,
      }

      this.openLoading('searching')
      getWmsMaterialInfoPopup(params, false)
        .then(res => {
          this.gridCount = res.listResponse.list
        })
        .finally(() => {
          this.endLoading()
        })
    },

    repaint() {
      if(this.$refs[this.dxDataGridFirstRef])
        this.gridFirstInstance.repaint()
      if(this.$refs[this.dxDataGridSecondRef])
        this.gridSecondInstance.repaint()
    },
    
    beginUpdateAll() {
      if(this.$refs[this.dxDataGridFirstRef])
        this.gridFirstInstance.beginUpdate()
      if(this.$refs[this.dxDataGridSecondRef])
        this.gridSecondInstance.beginUpdate()
    },
    endUpdateAll() {
      if(this.$refs[this.dxDataGridFirstRef])
        this.gridFirstInstance.endUpdate()
      if(this.$refs[this.dxDataGridSecondRef])
        this.gridSecondInstance.endUpdate()
    },
  }
}
</script>

<style scoped>
  .border-highlight {
    border-color: red;
  }
  .mat-exist {
    background-color: #5cb85c;
    color: #fff;
  }
  .dx-button.dx-button-mat-doubleEntry {
    background-color: #FF9800;
    color: #fff;
  }
  .mat-doubleEntry {
    background-color: #FF9800;
    color: #fff;
  }
  .mat-GogRelease {
    background-color: #F44336;
    color: #fff;
  }
  .matgrid-height {
    height: calc(100vh - 226px);
  }
</style>