<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="[
            'btnSearch', //조회
            'btnAdd', //신규
            'btnSave', //저장
            'btnDelete' //삭제
          ]"
          @btnAdd="btnAdd()"
          @btnSearch="btnSearch()"
          @btnSave="btnSave()"
          @btnDelete="btnDelete()"
        >
          <template v-slot:body>
            <v-layout column>
                <v-row no-gutters class="center pa-2 pb-0">
              
               <span class="px-1 pt-1 ml-2">{{'신고일:'}}</span>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="maintDtFrom"
                    :max="maintDtTo"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {maintDtFrom = e.value && getDateFormat(e.value)}"
                  >
                  </DxDateBox>
                </v-col>
                <p>~</p>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="maintDtTo"
                    :min="maintDtFrom"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {maintDtTo = e.value && getDateFormat(e.value)}"
                  >
                   
                  </DxDateBox>
                </v-col>
                 
        
                <v-col  cols="2">
               <v-select
                  :menu-props="{ offsetY: true }"
                  color="primary"
                  class="rounded-0"
                  item-text="desc"
                  item-value="code"
                  :prepend-inner-icon="$t('$search')"
                  :items="equipIdListseach"
                  label="설비"
                  dense
                  outlined
                  clearable
                  v-model="equipId"
                />
              </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="고장/조치 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="RepairManage"
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
                  @editor-preparing="onEditorPreparing"
                >
                  <DxColumn data-field="repairId" caption="유지보수 ID" width="150px" data-type="string" alignment="center" :allow-editing="false"/>

                  <DxColumn data-field="equipId"  caption="설비명" width="180px" data-type="string" alignment="center" css-class="devest-grid-header-require">
                    <DxLookup
                        :data-source="equipIdlist"
                        value-expr="code"
                        display-expr="desc"
                      />
                    </DxColumn>

                      
                  <DxColumn data-field="maintHrId" caption="신고자" width="130px" data-type="string" css-class="devest-grid-header-require" alignment="center">
                   <DxLookup
                      :data-source="maintHrIdLookUp"
                      value-expr="code"
                      display-expr="desc"
                    />
                    </DxColumn>
                  <DxColumn data-field="maintDt" caption="고장 신고 일자" width="120px" data-type="date" css-class="devest-grid-header-require" alignment="center" format="yyyy-MM-dd"
                  edit-cell-template="maintDt"
                  />
                  <template #maintDt="{ data :cellInfo}">
                    <DxDateBox 
                    :value="cellInfo.value"
                    display-format="yyyy-MM-dd"
                     @value-changed="e => {
                        onValueChanged(e,cellInfo)
                    }"
                      />
                  </template>

                  <DxColumn data-field="maintContent" caption="고장 내용" data-type="string" css-class="devest-grid-header-require" alignment="left"/>

                  <DxColumn data-field="maintResultHrId" caption="조치자" width="120px" data-type="string" alignment="center">
                    <DxLookup
                      :data-source="maintResultHrIdLookUp"
                      value-expr="code"
                      display-expr="desc"
                    />
                  </DxColumn>

                  <DxColumn data-field="maintResultDt" caption="고장 조치 일자" width="120px" format="yyyy-MM-dd" data-type="date" alignment="center"
                  edit-cell-template="maintResultDt"
                  />
                  <template #maintResultDt="{ data :cellInfo}">
                    <DxDateBox 
                    :value="cellInfo.value"
                    display-format="yyyy-MM-dd"
                     @value-changed="e => {
                        onValueChanged(e,cellInfo)
                      
                     
                    }"
                      />
                  </template>
                 


                 <DxColumn data-field="maintResultContent" caption="조치 내용" data-type="string" alignment="left" />

                
                  <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />

                </DxDataGrid>
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

import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import {DxCalendarOptions,DxDateBox} from 'devextreme-vue/date-box'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getRepairManage,
  saveRepairManage,
  deleteRepairManage,
  getComboEquEquipManage,
} from '@/api/kier/equipmaint/RepairManage'
import { getDateFormat, getCurrentDate, getPreMonth,getExtension,} from '@/utils/common.js'

import { getCommonCode } from '@/api/kier/standard/commonCodeManage'

import { getComboHrManage } from '@/api/kier/standard/hRManage'

export default {
  name: 'EquipManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxDateBox,

  },
  data() {
    return {
      dxDataGridMainRef: 'RepairManage',
      gridMain: [],
      equipNm: '',
      delYn: 'N',
    
      equipIdlist:[],
      equipIdListseach:[],
      maintResultHrIdLookUp:[],
      maintHrIdLookUp:[],
      equipId:'',
      maintDtTo:getPreMonth(0),
      maintDtFrom:getPreMonth(1)

    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    }
  },

  beforeMount() {
     let params = {
    delYn:'',
    equipNm:''
 }
    Promise.all([
      getComboHrManage(),
      getComboEquEquipManage(params),
    ])
      .then( res => {
        this.maintResultHrIdLookUp = res[0].listResponse.list
        this.maintHrIdLookUp = res[0].listResponse.list
        this.equipIdlist = res[1].listResponse.list.slice()
        this.equipIdListseach = res[1].listResponse.list.slice()
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

    getDateFormat(date) {
      return getDateFormat(date)
    }, 


    onEditorPreparing(e) {
     if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'equipId':
            e.editorOptions.readOnly = !e.row.data.isCreated
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

    btnAdd() {
      let newRow = {
        id: this.gridMain.length + 1,
        isCreated: true
      }
      this.gridMainInstance.newRow(newRow)
      this.gridMainInstance.refresh().then(() => {
        this.gridMainInstance.selectRows(newRow.id, true)
        this.gridMainInstance.option('focusedRowIndex', 0)
      })
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
        equipId: this.equipId, 
        maintDtFrom: this.maintDtFrom, 
        maintDtTo: this.maintDtTo
      }

      this.gridInit()
      return getRepairManage(params, isProgress)
        .then(res => {
          this.gridMain = res.listResponse.list
          if(this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', 0)
        })
    },

    async btnSave() {
      this.gridMainInstance.saveEditData()
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

     for (var a of selectedMainRows){

        if(a.maintDt != undefined || a.maintDt != null){
            a.maintDt = a.maintDt.substring(0,10).replace(/-/g,'') 
        }
      
       if(a.maintResultDt != undefined || a.maintResultDt != null){
          a.maintResultDt = a.maintResultDt.substring(0,10).replace(/-/g,'') 
        }

        else if(!a.equipId){
           this.vToastify(this.$t('설비를 입력해주세요.'), 'warn')
          return
        }
     
       else if(!a.maintHrId){
          this.vToastify(this.$t('신고자를 입력해주세요.'), 'warn')
          return
        }
          else if(!a.maintDt){
           this.vToastify(this.$t('고장 신고 일자를 입력해주세요.'), 'warn')
          return
        }
      
       else if(!a.maintContent){
           this.vToastify(this.$t('고장 내용을 입력해주세요.'), 'warn')
          return
        }

        }
      
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveRepairManage(selectedMainRows, true)
            .then(res => {

              this.doSearchMain(false)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )

    },
    
    async btnDelete() {
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }

      this.vToastifyPrompt(
        this.$t('doDeleteData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          deleteRepairManage(selectedMainRows.filter(row => !row.isCreated), true)
            .then(res => {
              this.doSearchMain(false)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
            })
        },
        null,
        true
      )
    },

    gridInit() {
      this.gridMainInstance.clearSelection()
      this.gridMainInstance.cancelEditData()
      this.gridMainInstance.option('focusedRowIndex', -1)
    }
  }
}
</script>