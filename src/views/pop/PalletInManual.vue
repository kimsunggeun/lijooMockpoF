<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
        <v-col cols="12" sm="12" md="12" lg="12">
          <i-card-top class="d-flex">
            <template v-slot:body>
              <v-row dense align="center">
                <v-col cols="3">
                  <v-text-field
                    class="rounded-0"
                    v-model="rfidTag"
                    label="RFID Tag"
                    dense
                    outlined
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @keydown.enter="btnSearchMain()"
                    clearable
                  />
                </v-col>
                <v-spacer/>
                <v-col cols="3">
                  <v-text-field
                    class="rounded-0"
                    v-model="barcodeNo"
                    label="바코드 번호"
                    dense
                    outlined
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @keydown.enter="btnSearchMain()"
                    clearable
                    ref="barcodeNoRef"
                  />
                </v-col>
                <v-spacer/>
                <v-col cols="6" align="right">
                  <span>재고(X): </span>
                  <DxButton/>
                  <span> 재고(O): </span>
                  <DxButton type="success"/>
                </v-col>
              </v-row>
              <v-row dense align="center" class="mt-0">
                <v-col cols="4">
                  <v-autocomplete
                    :menu-props="{ offsetY: true }"
                    color="primary"
                    class="rounded-0"
                    item-text="palletNm"
                    item-value="palletIdSelect"
                    :prepend-inner-icon="$t('$search')"
                    :items="palletIdList"
                    label="Pallet ID"
                    dense
                    outlined
                    multiple
                    clearable
                    v-model="palletIdSelect"
                    ref="palletIdRef"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="8" align="right">
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
              </v-row>
            </template>
          </i-card-top>
          <i-system-bar/>
        </v-col>
        <v-col class="matgrid-height">
          <v-row no-gutters class="pa-2 pt-0">
            <v-col cols="12" sm="12" md="12" lg="12" class="pa-2">
              <i-card-vertical headerTitle="■ 입하장 Pallet 리스트">
                <template v-slot:body>
                  <v-layout column overflow-auto class="pa-0 pt-0">
                    <v-col cols="12" class="pa-0">
                      <div class="listStyle">
                        <DxList
                          :data-source="PalletInManualList"
                          class="listHeight"
                          @itemClick="listClick"
                          @selectionChanged="listClick"
                          :show-selection-controls="true"
                          :selection-mode="selectionMode"
                        >
                          <template #item="{ data: item }">
                            <div>
                              <span style="font-size: 18pt; float: left; font-weight: bold; letter-spacing: 4px;" class="pl-4"> {{item.PalletID}} ( Pallet 명 : {{item.palletNm}} , RFID Tag : {{item.rfidTag}} )</span>
                            </div>
                          </template>
                        </DxList>
                      </div>
                    </v-col>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-col>
          </v-row>
          <v-row dense class="pa-2 pt-0 pt-2">
            <v-col cols="12" sm="12" md="12" lg="12" class="pa-2 pt-0 pt-lg-0">
              <i-card-vertical headerTitle="■ 수동 라인 RACK 현황">
                <template v-slot:body>
                  <v-layout column overflow-auto>
                    <v-col cols="12" sm="12" md="12" lg="12" class="pa-0">
                      <v-col cols="12" sm="12" md="12" lg="12" class="pa-0">
                        <DxDataGrid
                          id="PalletInManualBox"
                          height="100%"
                          :ref="dxDataBoxRef"
                          :data-source="gridBox"
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
                              <div 
                              @dragstart="dragContents(cellInfo)"
                              @drop.prevent="dragContainer(cellInfo)"
                              @dragenter.prevent
                              @dragover.prevent
                              Draggable=true>
                              <v-badge
                                style="width: 100%;"
                                color="#FF852F"
                                dot
                                overlap
                                :value="!!matInfoState[cellInfo.value].highlight">
                             
                                <DxButton
                                  Draggable=true
                                  :ref="`gridButtonRef${cellInfo.value}`"
                                  :class="{
                                    'mat-exist': matInfoState[cellInfo.value].matExist,
                                    'matcell-height': true
                                  }"
                                  width="100%"
                                  @click="onCellClick(cellInfo)"
                                >
                                  {{matInfoState[cellInfo.value].matExist === true ? matInfoState[cellInfo.value].palletId : ''}}
                                </DxButton>
                              </v-badge>
                              </div>
                            </template>
                          <DxColumn data-field="lev" caption="단" data-type="string" alignment="center"/>

                        </DxDataGrid>
                      </v-col>
                    </v-col>
                  </v-layout>
                </template>
              </i-card-vertical>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    <DxPopup
      :visible.sync="cellVisible"
      :show-close-button="false"
      :show-title="false"
      height="95%"
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
          <span :style="btnTextStyle">{{rfidTagPopup}}</span>
        </v-col>
      </v-row>
      <DxDataGrid
        id="PalletInManualPop"
        :ref="dxDataGridPopRef"
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
        <DxColumn data-field="mainClass" caption="품목 대분류" width="12%" data-type="string" alignment="left"/>
        <DxColumn data-field="middleClass" caption="품목 중분류" width="15%" data-type="string" alignment="left"/>
        <DxColumn data-field="matNm" caption="품목코드" width="10%" data-type="string" alignment="left" />
        <DxColumn data-field="barcodeNo" caption="바코드 번호" data-type="string" width="20%" alignment="center"/>
        <DxColumn data-field="qty" caption="재고수량" data-type="number" width="10%" format="#,##0" alignment="right"/>
        <DxColumn data-field="inWork" caption="입고수량" data-type="number" width="10%" format="#,##0" alignment="right"/>
        <DxColumn data-field="workQty" caption="작업수량" data-type="number" width="10%" format="#,##0" alignment="right"/>
        <DxColumn data-field="outQty" caption="출고수량" data-type="number" width="10%" format="#,##0" alignment="right"/>
        <DxColumn data-field="remark" caption="비고" data-type="string" width="10%" alignment="left"/>
      </DxDataGrid>
      <v-btn
        tile
        outlined
        color="btn_bg"
        width="120px"
        class="releaseBtn"
        :useBtnList="[
          'btnDelete' //삭제
        ]"
        @click="btnDelete()"
        ref="btnDelete"
        :style="{btnTextStyle2, 'display': this.cancelBtn ? 'block' : 'none'}"
        :disabled="this.cancelBtn ? false : true"
      >
      입고 취소
      </v-btn>
      <v-btn
        tile
        outlined
        color="btn_bg"
        width="120px"
        class="releaseBtn"
        :useBtnList="[
          'btnSave', //저장
        ]"
        @click="btnSave()"
        ref="btnSave"
        :style="{btnTextStyle2, 'display': this.saveBtn ? 'block' : 'none'}"
        :disabled="this.saveBtn ? false : true"
      >
      입고 처리
      </v-btn>

    </DxPopup>
  </v-container>
</template>

<script>
  import { DxDataGrid, DxColumn, DxLookup,DxRowDragging } from 'devextreme-vue/data-grid'
  import ICardTop from '@/components/common/iCardTop.vue'
  import ICardVertical from '@/components/common/iCardVertical.vue'
  import ISystemBar from '@/components/common/iSystemBar.vue'
  import DxButton from 'devextreme-vue/button'
  import { DxPopup, DxToolbarItem } from 'devextreme-vue/popup';
  import { DxList } from 'devextreme-vue/list'

  import baseview from '@/components/base/baseview.vue' // base page 추가
  import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

  import { PalletInManualBox, matInfoState } from './PalletInManualGrid.js'

  import {
    getPalletInManualMain,
    getPalletInManualPopup,
    savePalletInManualMain,
    deletePalletInManualMain
  } from '@/api/kier/pop/palletInManual'

  import {
    getComboMultipalletIdWmsMaterialInfo,
  } from '@/api/kier/wms/materialInfo'


 export default {
    name: 'PalletInManual',
    mixins: [baseview, BaseDataGrid],
    components: {
      ICardVertical,
      ICardTop,
      ISystemBar,
      DxDataGrid,
      DxColumn,
    

      DxButton,
      DxPopup,
      DxList,
    },
    data() {
      return {
        dxDataGridRef: 'PalletInManualGrid',
        dxDataBoxRef: 'PalletInManualBox',
        dxDataGridPopRef: 'PalletInManualPop',

        palletId: '',
        barcodeNo: '',
        rfidTag: '',
        palletIdList: [],
        palletIdSelect: [],
        btnTextStyle: { color: '#000', 'font-size': '15px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
        btnTextStyle2: { color: '#000', 'font-size': '24px', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
        gridMain: [],
        gridBox: PalletInManualBox,
        matInfoState: matInfoState,

        cellVisible: false,
        cellPopUpTitle: '',
        locationIdPopup: '',
        locationTypePopup: '',
        palletIdPopup: '',
        rfidTagPopup: '',
        gridCell: [],
        matList: [],
        PalletInManualList: [],
        rfidTagClick: '',
        palletIdClick: '',
        selectionMode: 'single',

        popupGubun: '',
        cancelBtn: true,
        saveBtn: true,
        locationId: [],
        dragContentsList:'',
        dragContainerList:'',
  
      }
    },
    computed: {
      gridFirstInstance() {
        return this.GetDataGrid(this.dxDataBoxRef)
      },
      gridPopInstance() {
        return this.GetDataGrid(this.dxDataGridPopRef)
      },
    },
    beforeMount() {
      Promise.all([
        getComboMultipalletIdWmsMaterialInfo()
      ])
        .then( res => {
          this.palletIdList = res[0].listResponse.list.slice()
        })
        .catch(error => {})
    },
    mounted() {
      this.doSearchMain()
    },
    methods: {


 dragContents(e){
      this.dragContentsList = e.cellElement.innerText

      if(e.cellElement.innerText !== ''){
        this.cellPopUpTitle = ''
        this.locationTypePopup = 'RACK'
        this.locationIdPopup = e.value
        this.locationId = [
          {row: this.locationIdPopup.slice(0,2) , col: this.locationIdPopup.slice(2,4), lev: this.locationIdPopup.slice(4,6)}
        ]
        let params = {
            row: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(0,2) : null,
            col: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(2,4) : null,
            lev: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(4,6) : null,
          }
            
     this.doSearchdarg(params)
      }

      else{
        this.vToastify(this.$t('비어있는 RACK은 이동이 불가합니다.'), 'warn')
        return
      }
      
      
      },
      
  dragContainer(e)
  {
      this.dragContainerList = e.cellElement.innerText

        if(this.dragContainerList != ""){
           this.vToastify(this.$t('비어있는 RACK에만 이동이 가능합니다.'), 'warn')
          return
        }

    
      if(this.dragContainerList == ""){
        this.vToastifyPrompt(
          this.$t(('RACK 이동을 하시겠습니까? <br> 주의) 해당 RACK은 비워집니다.'),'warn'),
  
          'info',
          current => {
            this.palletIdClick =  this.dragContentsList.trim()
            this.cellPopUpTitle = ''
            this.locationTypePopup = 'RACK'
            this.locationIdPopup = e.value
            this.cancelBtn = ''
            this.saveBtn = ''
            this.locationId = [
              {row: this.locationIdPopup.slice(0,2) , col: this.locationIdPopup.slice(2,4), lev: this.locationIdPopup.slice(4,6)}
            ]
           let params = {
              palletId: this.palletIdClick,
              rfidTag: this.rfidTagClick,
            }

            deletePalletInManualMain(this.gridCell.filter(row => !row.isCreated), true)
            .then(res=>{
              if(res.status === -500){
               this.vToastify(this.$t('오류가 발생했습니다 다시 시도해주십시오'), 'warn')
               this.doSearchMain(true)
               return
              }
              this.doSearchdargs(params)
            })
            

         

           
          },
          null,
          true
        )
        }    
  },
                


      btnSearchMain() {
        this.rfidTagClick = ''
        this.palletIdClick = ''
        this.openLoading('searching')
        this.doSearchMain()
        .finally(() => {
          this.endLoading()
        })
      
      },
      onCellClick(cellInfo) {
        
        
        this.cellPopUpTitle = ''
        this.locationTypePopup = 'RACK'
        this.locationIdPopup = cellInfo.value
        this.cancelBtn = ''
        this.saveBtn = ''
        this.locationId = [
          {row: this.locationIdPopup.slice(0,2) , col: this.locationIdPopup.slice(2,4), lev: this.locationIdPopup.slice(4,6)}
        ]

        this.palletIdPopup = `Pallet ID : '${this.palletIdClick || ''}'`
        this.rfidTagPopup = `RFID Tag : '${this.rfidTagClick || ''}'`

        if(this.matInfoState[cellInfo.value].matExist == false){
        
          if(this.palletIdClick === '' || this.palletIdClick === undefined ){
            this.vToastify(this.$t('선택된 입하장 Pallet 리스트가 없습니다.'), 'warn')
          }
          
          else {

            this.cellPopUpTitle = 'RACK 정보(행/열/단) : ' + this.locationIdPopup.slice(0,2) + ' / '  + this.locationIdPopup.slice(2,4) +  ' / ' + this.locationIdPopup.slice(4,6)
            let params = {
              palletId: this.palletIdClick,
              rfidTag: this.rfidTagClick,
            }
            this.cancelBtn = false
            this.saveBtn = true
            this.popupGubun = true
            this.doSearchPopup(params)
          }
        } else if(this.matInfoState[cellInfo.value].matExist == true){
          
          this.cellPopUpTitle = 'RACK 정보(행/열/단) : ' + this.locationIdPopup.slice(0,2) + ' / '  + this.locationIdPopup.slice(2,4) +  ' / ' + this.locationIdPopup.slice(4,6)
          let params = {
            palletId: '',
            rfidTag: '',
            row: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(0,2) : null,
            col: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(2,4) : null,
            lev: this.locationTypePopup == 'RACK' ? this.locationIdPopup.slice(4,6) : null,
          }
          this.cancelBtn = true
          this.saveBtn = false
          this.popupGubun = false
          this.doSearchPopup(params)
        }

      },
      doSearchMain(isProgress){
        this.PalletInManualList = []
        let params = {
          palletId: this.palletId,
          palletIdMulti: this.palletIdSelect.toString(),
          rfidTag: this.rfidTag,
          barcodeNo: this.barcodeNo
        }
        return getPalletInManualMain(params, isProgress)
          .then(res => {
       
            for(let i = 0; i < res.listResponse.map.list.length; i++){
              this.PalletInManualList.push(
                {PalletID: res.listResponse.map.list[i].palletId , rfidTag: res.listResponse.map.list[i].rfidTag , palletNm: ''}
              )
              for(let j = 0; j < this.palletIdList.length; j++){
                if(this.palletIdList[j].palletId == this.PalletInManualList[i].PalletID){
                   this.PalletInManualList[i].palletNm = this.palletIdList[j].palletNm
                }
              }
            }
            for (const property in this.matInfoState) {
              this.matInfoState[property].highlight = false
            }

            for(var rackInfo of res.listResponse.map.stock) {
              this.matInfoState[rackInfo.locationId].matExist = rackInfo.matExistYn == 'Y' ? true : false
              this.matInfoState[rackInfo.locationId].palletId = rackInfo.palletId
              this.matInfoState[rackInfo.locationId].rfidTag = rackInfo.rfidTag
              this.matInfoState[rackInfo.locationId].highlight = rackInfo.matExistYn == 'Y' ? true : false
            }
            this.repaint()

          })
      },
      repaint() {
        if(this.$refs[this.dxDataBoxRef])
          this.gridFirstInstance.repaint()
          this.gridCell=[]
      },

      doSearchPopup(params) {
        
        this.openLoading('searching')
        getPalletInManualPopup(params, false)
          .then(res => {
              
            if(this.popupGubun == false) {
              this.palletIdPopup = `Pallet ID : '${res.listResponse.list[0]?.palletId || ''}'`
              this.rfidTagPopup = `RFID Tag : '${res.listResponse.list[0]?.rfidTag || ''}'`
            }
         
            let cnt = 1
            res.listResponse.list.forEach(e => {

              e.id = cnt++
              e.locationId = this.locationId[0].row + this.locationId[0].col + this.locationId[0].lev
              e.row = this.locationId[0].row
              e.col = this.locationId[0].col
              e.lev = this.locationId[0].lev
            });
            this.gridCell = res.listResponse.list
            this.cellVisible = true
            
          })
          .finally(() => {
            this.endLoading()

          
          })
      },



 doSearchdarg(params) {
         
        this.openLoading('searching')
        getPalletInManualPopup(params, false)
          .then(res => {

              
            if(this.popupGubun == false) {
              this.palletIdPopup = `Pallet ID : '${res.listResponse.list[0]?.palletId || ''}'`
              this.rfidTagPopup = `RFID Tag : '${res.listResponse.list[0]?.rfidTag || ''}'`
            }
            let cnt = 1
              res.listResponse.list.forEach(e => {
              e.id = cnt++
              e.locationId = this.locationId[0].row + this.locationId[0].col + this.locationId[0].lev
              e.row = this.locationId[0].row
              e.col = this.locationId[0].col
              e.lev = this.locationId[0].lev
            });
            this.cellPopUpTitle = 'RACK 정보(행/열/단) : ' + this.locationIdPopup.slice(0,2) + ' / '  + this.locationIdPopup.slice(2,4) +  ' / ' + this.locationIdPopup.slice(4,6)
            this.gridCell = res.listResponse.list
         
  
            
          })
          .finally(() => {
            this.endLoading()
        
          })
      },
 doSearchdargs(params) {
        
        this.openLoading('searching')
        getPalletInManualPopup(params, false)
          .then(res => {
              
            if(this.popupGubun == false) {
              this.palletIdPopup = `Pallet ID : '${res.listResponse.list[0]?.palletId || ''}'`
              this.rfidTagPopup = `RFID Tag : '${res.listResponse.list[0]?.rfidTag || ''}'`
            }
            let cnt = 1
            res.listResponse.list.forEach(e => {
  
              e.id = cnt++
              e.locationId = this.locationId[0].row + this.locationId[0].col + this.locationId[0].lev
              e.row = this.locationId[0].row
              e.col = this.locationId[0].col
              e.lev = this.locationId[0].lev
            });
           
           this.cellPopUpTitle = 'RACK 정보(행/열/단) : ' + this.locationIdPopup.slice(0,2) + ' / '  + this.locationIdPopup.slice(2,4) +  ' / ' + this.locationIdPopup.slice(4,6)
            this.gridCell = res.listResponse.list
            this.cellVisible = true
            this.saveBtn = true
          
          
          })
          .finally(() => {
            this.endLoading()
        
          })
      },


      listClick(e){
   
        if(e.itemData){
          this.rfidTagClick = e.itemData.rfidTag
          this.palletIdClick= e.itemData.PalletID
        }
        else if(e.addedItems){
          this.rfidTagClick = e.addedItems[0]?.rfidTag
          this.palletIdClick= e.addedItems[0]?.PalletID
        }
      },
      
       btnSave() {

        this.gridPopInstance.saveEditData()

        if (!this.gridCell.length) {
          this.vToastify(this.$t('품목 리스트가 없습니다.'), 'warn')
          return
        }
        this.vToastifyPrompt(
          this.$t('doSaveData'),
          'info',
          current => {
            this.openLoading()
            this.gridPopInstance.beginUpdate()
            savePalletInManualMain(this.gridCell, true)
                
              .then(res => {
              })
              .finally(() => {
                this.gridPopInstance.endUpdate()
                this.rfidTagClick = ''
                this.palletIdClick= ''
                this.$refs.barcodeNoRef.reset()
                this.$refs.palletIdRef.reset()
                this.endLoading()
                this.doSearchMain()
                this.cellVisible = false
              })
          },
          null,
          true
        )
      },
       btnDelete() {
        if (!this.gridCell.length) {
          this.vToastify(this.$t('품목 리스트가 없습니다.'), 'warn')
          return
        }

        this.vToastifyPrompt(
          this.$t('doDeleteData'),
          'info',
          current => {
            this.openLoading()
            this.gridPopInstance.beginUpdate()
            deletePalletInManualMain(this.gridCell.filter(row => !row.isCreated), true)
              .then(res => {
        
              })
              
              .finally(() => {
                this.gridPopInstance.endUpdate()
                this.rfidTagClick = ''
                this.palletIdClick= ''
                this.$refs.barcodeNoRef.reset()
                this.$refs.palletIdRef.reset()
                this.endLoading()
                this.doSearchMain()
              
                this.cellVisible = false
              })
          },
          null,
          true
        )
      },



    
},
}
</script>
<style scoped lang="scss">

  .matcell-height {
    height: calc(14vh - 85px);
  }
  
  .listHeight {
    height: 23vh;
  }
  .matgrid-height {
    height: calc(100vh - 226px);
  }
  .releaseBtn {
    background-color: rgb(0,176,240);
    float: right;
    height: 45px !important;
    font-size: 15pt !important;
  }
  .listStyle {
    border-top: 2px solid rgb(41,74,130);
    border-bottom: 2px solid rgb(41,74,130);
    border-left: thin solid rgba(0, 0, 0, 0.12);
    border-right: thin solid rgba(0, 0, 0, 0.12);
   }
  .mat-exist {
    background-color: #5cb85c;
    color: #fff;
  }
  ::v-deep .dx-button.matcell-height .dx-button-content {
    // padding: 1px !important;
    font-size: 12pt;
  }
</style>