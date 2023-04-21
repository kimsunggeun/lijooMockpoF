<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12">
        <i-card-top class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
          ]"
          @btnSearch="btnSearchMain()"
        >
          <template v-slot:body>
            <v-row dense align="center" >
              <v-col cols="5">
                <v-text-field
                  class="rounded-0 mt-2"
                  v-model="barcodeNo2"
                  label="바코드 번호"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  clearable
                  @change="btnSearchMain()"
                />
              </v-col>
              <v-spacer/>
            </v-row>
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
                  label="품목 코드"
                  dense
                  outlined
                  multiple
                  clearable
                  v-model="matSelect"
                />
              </v-col>
              <v-col cols="4">
                <v-autocomplete
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="rounded-0"
                  item-text="desc"
                  item-value="code"
                  :prepend-inner-icon="$t('$search')"
                  :items="partnerList"
                  label="파트너"
                  dense
                  outlined
                  multiple
                  clearable
                  v-model="partnerSelect"
                />
              </v-col>
            </v-row>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <!-- 입하장 재고 리스트 -->
      <v-col cols="6" class="pa-0 stockListBox">
        <i-card-vertical headerTitle="■ 입하장 재고 리스트 " style="height: 100%;">
          <template v-slot:body>
            <v-layout column overflow-auto style="height: 100%;">
              <v-col cols="12" md="12" class="pa-0" style="height: 100%;">
                <DxDataGrid
                  id="InAreaStock"
                  height="100%"
                  :ref="dxDataGridInAreaStockRef"
                  :data-source="gridInAreaStock"
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
                  @editor-preparing="onEditorPreparingInAreaStock"
                  @focused-row-changed="onFocusedRowChanged"
                >
                  <DxScrolling column-rendering-mode="virtual"/>
                  <DxColumn data-field="barcodeNo" caption="바코드 번호" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="matDiv" width="auto" caption="입고 위치"  data-type="string" alignment="center"  :allow-editing="false" >
                    <DxLookup
                      :data-source="matDivList"
                      value-expr="code"
                      display-expr="desc"
                      :allow-editing="false"
                      />
                  </DxColumn>
              
                  

                  <DxColumn
                    data-field="matCd"
                    caption="품목명"
                    width="auto"
                    data-type="string"
                    alignment="left"
                    css-class="devest-grid-header-require"
                    :allow-editing="false"
                    :calculate-display-value="(rowData) => matMap.get(rowData.matCd)"
                    :calculate-filter-expression="lookupColumnFilterExpression"
                  />
                  <DxColumn data-field="qty" caption="재고 수량" width="auto" format="#,##0" data-type="number" alignment="right" :allow-editing="false" />
                  <DxColumn data-field="mainClass" caption="품목 대분류" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxColumn data-field="middleClass" caption="품목 중분류" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                  <DxPaging :enabled="false"/>
                </DxDataGrid>
              </v-col>
            </v-layout>
          </template>
        </i-card-vertical>
      </v-col>
      <v-col cols="6" name="test"  class="pb-0 stockListBox2">
        <v-row no-gutters>
          <v-col cols="12" class="pa-1">
            <h3>■ Pallet 선택</h3>
            <v-text-field
              class="ml-4 mt-3 mb-1 rounded-0"
              v-model="palletId"
              label="Pallet ID"
              ref="palletId"
              dense
              outlined
              hide-details="auto"
              :prepend-inner-icon="$t('$search')"
              clearable
              autofocus
              @change="doScannerMain()"
            />
          </v-col>
          <v-col cols="12" class="pa-1 mb-1">
            <span class="ml-4 pa-0 mTitle">{{this.palletNm}}</span>
            <span class="ml-4 pa-0 mTitle">{{this.rfidTag}}</span>
          </v-col>
          <v-col cols="12" class="pa-1">
            <h3>■ 품목 선택</h3>
            <v-text-field
              class="barcodeNo ml-4 mt-3 mb-1 rounded-0"
              v-model="barcodeNo"
              label="바코드 번호"
              ref="barcodeNo"
              dense
              outlined
              hide-details="auto"
              :prepend-inner-icon="$t('$search')"
              clearable
              @keydown.enter="(e) => {
                e.target.select()
                doInStorkMat(e)
              }"
            />

             <v-row  style="justify-content: flex-end;">
                  <v-col cols="3" class="pa-0 pr-1 pt-1">
                  <v-btn
                  @click="btnSaved()"
                  class="rounded-0"
                  outlined width="100%">
                  <v-icon>save</v-icon>저장
                  </v-btn>
                  </v-col>

                  <v-col cols="3" class="pa-0 pl-1 pt-1">
                  <v-btn
                  @click="btnDelete()" 
                  class="rounded-0"
                  outlined width="100%">
                  <v-icon>delete</v-icon>삭제
                  </v-btn>
                  </v-col>
                 </v-row>
          </v-col>
        </v-row>
        <!-- Pallet & 재고 매핑 리스트 -->
        <v-row no-gutters class="pa-0" style="height: 82%;">
          <!-- 추가 취소 버튼 -->
          <v-col cols="1" class="pa-0" style="align-self: center;" align="center">
            <v-btn
              fab
              dark
              @click="btnAdd()"
              color="primary">
                <v-icon >
                  arrow_forward
                </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="11" class="pa-0 pl-1 pt-0" style="height: 100%;">
            <i-card-vertical headerTitle="" style="height: 92%;">
             
           
              <template v-slot:body>
                


                <v-layout column overflow-auto style="height: 100%;">
                  <v-col cols="12" md="12" class="pa-0" style="height: 100%;">
                    <DxDataGrid
                      id="InAreaStockMat"
                      height="100%;"
                      :ref="dxDataGridInAreaStockMatRef"
                      :data-source="gridInAreaStockMat"
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
                      <DxScrolling column-rendering-mode="virtual"/>
                      <DxColumn data-field="barcodeNo" caption="바코드 번호" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="matDiv" width="auto" caption="입고 위치"  data-type="string" alignment="center"  :allow-editing="false" >
                    <DxLookup
                      :data-source="matDivList"
                      value-expr="code"
                      display-expr="desc"
                      :allow-editing="false"
                      />
                  </DxColumn>
                  
                      <DxColumn
                        data-field="matCd"
                        caption="품목명"
                        width="auto"
                        data-type="string"
                        alignment="left"
                        css-class="devest-grid-header-require"
                        :allow-editing="false"
                        :calculate-display-value="(rowData) => matMap.get(rowData.matCd)"
                        :calculate-filter-expression="lookupColumnFilterExpression"
                      />
                      <DxColumn data-field="qty" caption="재고 수량" width="auto" format="#,##0" data-type="number" alignment="right" :allow-editing="false" />
                      <DxColumn data-field="mainClass" caption="품목 대분류" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxColumn data-field="middleClass" caption="품목 중분류" width="auto" data-type="string" alignment="center" :allow-editing="false" />
                      <DxPaging :enabled="false"/>
                    </DxDataGrid>
                  </v-col>
                </v-layout>
              </template>
            </i-card-vertical>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DxDataGrid, DxColumn, DxLookup, DxScrolling} from 'devextreme-vue/data-grid'

import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import notify from 'devextreme/ui/notify' // message

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'

import {
  getPalletMatManageMain,
  savePalletMatManageMain,
  savePalletMatManageInJob,
  deletePalletMatManageMain
} from '@/api/kier/pop/palletMatManage'

import { getComboStdMatManage } from '@/api/kier/standard/matManage'

import { getComboPartner } from '@/api/kier/standard/partnerManage'

export default {
  name: 'PalletMatManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxScrolling
  },
  data() {
    return {
      dxDataGridInAreaStockRef: 'InAreaStock',
      dxDataGridInAreaStockMatRef: 'InAreaStockMat',
      palletId:'',
      palletNm:'Pallet 명',
      rfidTag:'RFID Tag',
      barcodeNo: '',
      barcodeNo2: '',
      palletCheck: {
        palletId: '',
        rfidTag: '',
        checkYn: 'N'
      },
      matList: [],
      matMap: new Map(),
      matSelect: [],
      partnerList: [],
      partnerSelect: [],
      gridInAreaStock: [],
      gridInAreaStockMat: [],
      matDivList:[],

    }
  },
  computed: {
    gridInAreaStockInstance() {
      return this.GetDataGrid(this.dxDataGridInAreaStockRef)
    },
    gridInAreaStockMatInstance() {
      return this.GetDataGrid(this.dxDataGridInAreaStockMatRef)
    }

  },
  beforeMount() {
    Promise.all([
      getComboStdMatManage(),
      getComboPartner(),
      getCommonCode('S0016')
    ])
    .then( res => {
    
      this.matList = res[0].listResponse.list.slice()
      this.matMap = this.matList.reduce((map, obj) => map.set(obj.matCd, obj.matNm), new Map)
      this.partnerList = res[1].listResponse.list.slice()
      this.matDivList = res[2].listResponse.list.slice()
    })
    .catch(error => {})
  },
  mounted() {
  },
  methods: {

    
   btnSearchMain() {

      this.openLoading('searching')
      this.doSearchMain()
        .finally(() => {
          this.endLoading()
        })
        
    },
    async doSearchMain() {
      this.gridInAreaStockInit()

      let params = {
        barcodeNo: this.barcodeNo2,
        matCdMulti: this.matSelect.toString(),
        partnerIdMulti: this.partnerSelect.toString(),
        searchYn: 'Y'
      }

      return await getPalletMatManageMain(params, false)
        .then(res => {

          
          this.gridInAreaStock = res.listResponse.map.list
           
          if(this.gridInAreaStock.length) this.gridInAreaStockInstance.option('focusedRowIndex', 0)
        })
    },
    async doScannerMain() {
      await this.$nextTick(() => {
        if(this.palletId == null || this.palletId == '') {
          notify("Pallet 를 입력하세요.", 'success', 1500)
          this.palletNm = 'Pallet 명'
          this.rfidTag = 'RFID Tag'
          this.gridInAreaStockMat = []
          
          this.$refs.palletId.focus()
          return
        }
      
       

        this.gridInAreaStockMatInit()

        let params = {
          palletId : this.palletId,
          searchYn: 'N'
        }
        return getPalletMatManageMain(params, false)
          .then(res => {

            this.palletCheck = res.listResponse.map.check

            if(this.palletCheck.checkYn === 'N') {
              this.vToastifyConfirm(
                this.$t('등록된 Pallet 가 아닙니다.'),
                'warn',
                current => {
                  
                  this.$refs.palletId.reset()
                  this.$refs.palletId.focus()
                }
              )
             return
            }

            this.palletNm = this.palletCheck.palletId
            this.rfidTag = this.palletCheck.rfidTag
            this.gridInAreaStockMat = res.listResponse.map.list
            this.$refs.barcodeNo.focus()

            if(this.gridInAreaStockMat.length) this.gridInAreaStockMatInstance.option('focusedRowIndex', 0)
          })
      })
    },
    onEditorPreparingInAreaStock(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged

        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          if (e.dataField == 'barcodeNo') this.gridInAreaStockInstance.refresh()
          defaultValueChangeHandler(args)
        }
      }
    },
    onFocusedRowChanged(e) {
     this.focusedRowData = e.row && e.row.data
     if (e.rowIndex < 0 || !!e.row.data.isCreated) {
      
       return
     }
    },
    async btnAdd() {
      if(this.palletCheck.checkYn === 'N' || this.palletId == null || this.palletId == '') {
        notify("Pallet 를 입력하세요.", 'success', 1500)
        this.$refs.palletId.focus()
        return
      }
      let selectedMainRows = await this.gridInAreaStockInstance.getSelectedRowsData()
      let selectedRowKeys = await this.gridInAreaStockInstance.getSelectedRowKeys()

      if(selectedMainRows.length <= 0){
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      let stockTemp = selectedMainRows[0].matDiv
      for (let gridInAreaStock of selectedMainRows){
          if(stockTemp != gridInAreaStock.matDiv) {
            this.vToastify(this.$t('선택된 데이터가 서로 입고 위치가 달라 추가하실수 없습니다.'), 'warn')
            return
          }
      }

      for(var stockMat of this.gridInAreaStockMat){
        for (var gridInAreaStock of selectedMainRows){
          if(stockMat.barcodeNo == gridInAreaStock.barcodeNo){
            this.vToastify(this.$t('동일한 Barcode No 는 추가하실수 없습니다.'), 'warn')
            return
          } else if(stockMat.matDiv !== gridInAreaStock.matDiv) {
            this.vToastify(this.$t('입고 위치가 달라 추가하실수 없습니다.'), 'warn')
            return
          }
        }
      }
      for (var stockRow of selectedMainRows) {
        let newRow = {
            id: stockRow.palletId + stockRow.barcodeNo,
            barcodeNo: stockRow.barcodeNo,
            mainClass: stockRow.mainClass,
            middleClass: stockRow.middleClass,
            matCd: stockRow.matCd,
            qty: stockRow.qty,
            locationId: stockRow.locationId,
            palletId: this.palletId,
            rfidTag: this.rfidTag,
            matDiv: stockRow.matDiv,
            partnerId: '',
            partnerNm: ''
        }
        this.gridInAreaStockMatInstance.newRow(newRow)
        this.gridInAreaStockMatInstance.selectRows(newRow.id, true)
        this.gridInAreaStockMatInstance.option('focusedRowIndex', 0)
        this.gridInAreaStock = this.gridInAreaStock.filter(el => !selectedRowKeys.includes(el.id))
      }
    },
    async btnSaved() {
      this.gridInAreaStockMatInstance.saveEditData()
      var selectedDetailRows = await this.gridInAreaStockMatInstance.getSelectedRowsData()

      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      let saveCheck = true
      for(var stockMat of this.gridInAreaStockMat) {
        // console.log('stockMat : ',stockMat)
        saveCheck = stockMat.locationId === 'IN_AREA' ? true : false
        if(!saveCheck) {
          let location = stockMat.locationId.slice(0,2) + '/'
                         + stockMat.locationId.slice(2,4) + '/'
                         + stockMat.locationId.slice(4,6)
          this.vToastify(this.$t(location + ' RACK에 있는 Pallet에 품목을 저장을 할수 없습니다.'), 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridInAreaStockInstance.beginUpdate()

          savePalletMatManageMain(selectedDetailRows, true)
            .then(res => {
            savePalletMatManageInJob(selectedDetailRows, true)
            .then(res => {
              console.log(res,selectedDetailRows)
              this.doSearchMain()
            })
            })
            .finally(() => {
              this.gridInAreaStockInstance.endUpdate()
              this.doScannerMain()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    async btnDelete() {
      let selectedDetailRows = await this.gridInAreaStockMatInstance.getSelectedRowsData()
      if (!selectedDetailRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      let delCheck = true
      for(var stockMat of selectedDetailRows) {
        delCheck = stockMat.locationId === 'IN_AREA' ? true : false
        if(!delCheck) {
          this.vToastify(this.$t('입하장의 재고품목이 아닌 품목이 있어 삭제를 할수 없습니다.'), 'warn')
          return
        }
      }

      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        current => {
          this.openLoading()
          this.gridInAreaStockInstance.beginUpdate()
          deletePalletMatManageMain(selectedDetailRows, true)
            .then(res => {
              this.doSearchMain()
            })
            .finally(() => {
              this.gridInAreaStockInstance.endUpdate()
              this.doScannerMain()
              this.endLoading()
            })
        },
        null,
        true
      )
    },
    doInStorkMat(e) {

      if(this.palletCheck.checkYn == 'N' || this.palletId == null || this.palletId == '') {
        notify("Pallet 를 입력하세요.", 'success', 1500)
        this.$refs.palletId.focus()
        return
      }


      if(this.barcodeNo == null || this.barcodeNo == '') {
        notify("barcodeNo 를 입력하세요.", 'success', 1500)
        this.$refs.barcodeNo.focus()
        return
      }

      for (var stockMat of this.gridInAreaStockMat){
        if(stockMat.barcodeNo == this.barcodeNo){
          this.vToastifyConfirm(
            this.$t('동일한 Barcode No 는 추가하실수 없습니다.'),
            'warn',
            current => {
              this.$refs.barcodeNo.reset()
              this.$refs.barcodeNo.focus()
            }
          )
          return
        }
      }

      let params = {
        barcodeNo: this.barcodeNo,
        searchYn: 'Y'
      }
      return Promise.all([
          getPalletMatManageMain(params, false)
        ])
        .then(res => {
          if(res[0].listResponse.map.list.length === 0) {
            this.vToastifyConfirm(
              this.$t('입하장 재고 품목이 없거나 등록된 Barcode No 입니다.'),
              'warn',
              current => {
                this.$refs.barcodeNo.reset()
                this.$refs.barcodeNo.focus()
              }
            )
          } else {
            let list = res[0].listResponse.map.list[0]

            for (var stockMat of this.gridInAreaStockMat){
              if(stockMat.matDiv !== list.matDiv) {
                this.vToastify(this.$t('입고 위치가 달라 추가하실수 없습니다.'), 'warn')
                return
              }
            }

            let newRow = {
                id: list.palletId + list.barcodeNo,
                barcodeNo: list.barcodeNo,
                mainClass: list.mainClass,
                middleClass: list.middleClass,
                matCd: list.matCd,
                qty: list.qty,
                locationId: list.locationId,
                palletId: this.palletId,
                rfidTag: this.rfidTag,
                matDiv: list.matDiv,
                partnerId: '',
                partnerNm: ''
            }

            this.gridInAreaStockMatInstance.newRow(newRow)
            this.gridInAreaStockMatInstance.selectRows(newRow.id, true)
            this.gridInAreaStockMatInstance.option('focusedRowIndex', 0)
          }
        })
        .finally(() => {
          this.$refs.barcodeNo.reset()
          this.$refs.barcodeNo.focus()
        })

    },
    gridInAreaStockInit() {
      this.gridInAreaStockInstance.clearSelection()
      this.gridInAreaStockInstance.cancelEditData()
      this.gridInAreaStockInstance.option('focusedRowIndex', -1)
    },
    gridInAreaStockMatInit() {
      this.gridInAreaStockMatInstance.clearSelection()
      this.gridInAreaStockMatInstance.cancelEditData()
      this.gridInAreaStockMatInstance.option('focusedRowIndex', -1)
    }
  }
}
</script>
<style lang="less" scoped>
  .mTitle {
    border: 1px solid;
    border-radius: 10px;
    font-size: 25pt;
    width: 45%;
    float: left;
    font-weight: bold;
    text-align: center;
  }
  .noCol {
    flex-grow: 0 !important;
    flex: 0 !important;
  }
  .barcodeNo.v-text-field {
    ::v-deep .v-input__control .v-input__slot {
      min-height: 40px !important;
      padding: 0 8px !important;
      margin-bottom: 2px !important;
      display: flex !important;
      align-items: center !important;
    }
    ::v-deep .v-input__control .v-input__slot .v-input__prepend-inner {
      margin-top: 12px !important;
    }
    ::v-deep .v-input__control .v-input__slot .v-input__append-inner {
      margin-top: 12px !important;
    }
    ::v-deep .v-input__control .v-input__slot label {
      margin: 0 0 0 5px !important;
    }
    ::v-deep .v-input__control .v-input__slot label.v-label--active {
      margin: 0 0 0 5px !important;
      font-size: 1.2em !important;
    }

    ::v-deep input {
      font-size: 1.8em;
      font-weight: 100;
      text-transform: capitalize;
    }
    ::v-deep label {
        font-size: 1.8em;
    }
    ::v-deep button {
        font-size: 1.8em;
    }
  }
  .barcodeNo.v-text-field__details {
    margin: 2px !important;
  }
  .stockListBox {
    height: calc(100vh - 270px);
  }
  .stockListBox2 {
    height: calc(100vh - 430px);
  }
  ::v-deep .v-card__text {
    height: 99%;
  }
  #InAreaStockMat {
    height: 100%;
  }
</style>