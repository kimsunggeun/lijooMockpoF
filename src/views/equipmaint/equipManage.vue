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
                <v-col cols="12" md="4" class="py-2 py-md-0">
                  <v-text-field
                    label="설비명"
                    class="search-text-field"
                    dense
                    outlined
                    color="primary"
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @keydown.enter="btnSearch()"
                    clearable
                    v-model="equipNm"
                  />
                </v-col>
                <v-col cols="auto" class="pa-2 py-md-0">
                  <v-switch
                    v-model="delYn"
                    @click="btnSearch()"
                    true-value="Y"
                    false-value="N"
                    :label="`삭제 데이터 조회`"
                  />
                </v-col>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="설비 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="equipManageMain"
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
                  <DxColumn data-field="equipId" caption="설비 ID" width="150px" data-type="string" alignment="center" :allow-editing="false"/>

                  <DxColumn data-field="equipNm" caption="설비명" width="180px" data-type="string" alignment="left" css-class="devest-grid-header-require"/>

                  <DxColumn data-field="equipSerial" caption="설비 시리얼 번호" width="130px" data-type="string" alignment="left"/>

                  <DxColumn data-field="buildDt" caption="설치일" width="120px" data-type="date" alignment="center"
                  format="yyyy-MM-dd"
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

                  <DxColumn data-field="buildArea" caption="설치 장소" width="130px" data-type="string" alignment="left"/>

                  <DxColumn data-field="hrId" caption="담당자" width="120px" data-type="string" alignment="center">
                    <DxLookup
                      :data-source="hrIdLookUp"
                      value-expr="code"
                      display-expr="desc"
                  
                    />
                  </DxColumn>

                  <DxColumn data-field="equipAsComp" caption="설비 AS 회사" width="130px" data-type="string" alignment="left"/>

                  <DxColumn data-field="equipAsWorker" caption="설비 AS 직원명" width="130px" data-type="string" alignment="center"/>

                  <DxColumn data-field="equipAsHp" caption="설비 AS 연락처" width="130px" data-type="string" alignment="left"/>

                  <DxColumn data-field="useYn" caption="사용 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor"/>

                  <DxColumn data-field="delYn" caption="삭제 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor"/>

                  <template #checkBoxEditor="{ data: cellInfo }">
                    <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                  </template>

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
import DxCheckBox from 'devextreme-vue/check-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import DxDateBox from 'devextreme-vue/date-box'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getEquEquipManage,
  saveEquEquipManage,
  deleteEquEquipManage
} from '@/api/kier/equipmaint/equipManage'

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
    DxCheckBox,
    DxLookup,
    DxDateBox
  },
  data() {
    return {
      dxDataGridMainRef: 'equipManageMain',
      gridMain: [],
      equipNm: '',
      delYn: 'N',
      hrIdLookUp: [],
      a:'',
  
    
    }
  },
  computed: {

    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    }
  },

  beforeMount() {
    Promise.all([
      getComboHrManage(),
    ])
      .then( res => {
        this.hrIdLookUp = res[0].listResponse.list
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

    onEditorPreparing(e) {

   
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          defaultValueChangeHandler(args)
        }
      }
    },

    btnAdd() {
      let newRow = {
        id: this.gridMain.length + 1,
        useYn: 'Y',
        delYn: 'N',
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
        equipNm: this.equipNm,
        delYn: this.delYn
      }

      this.gridInit()
      return getEquEquipManage(params, isProgress)
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

      //유효성 체크
      for (var row of selectedMainRows) {
        if (!row.equipNm) {
          this.vToastify('필수항목 입력하세요.[설비명]', 'warn')
          return
        }
      }
      
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveEquEquipManage(selectedMainRows, true)
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
          deleteEquEquipManage(selectedMainRows.filter(row => !row.isCreated), true)
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