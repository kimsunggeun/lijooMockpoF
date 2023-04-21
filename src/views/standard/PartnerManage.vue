<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <i-page-title title="progManage" />
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-sm-flex"
          :useBtnList="buttonUseList"
          @btnAdd="btnAdd()"
          @btnSearch="btnSearch()"
          @btnSave="btnSave()"
          @btnDelete="btnDelete()"
        >
        
        
          <template v-slot:body>





            <v-layout align-center >
              <v-col cols="12" md="4" sm="12" class="pa-2">
                <v-text-field
                  
                  label="파트너사 코드(명)"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @keydown.enter="btnSearch()"
                  clearable
                  v-model="partnerNm"
                />
                
              </v-col>
             
          
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="파트너사 리스트">

          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="row pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="PartnerManage"
                    class="layout-col-height00"
                    :ref="dxDataGridMainRef"
                    :data-source="gridMain"
                    :remote-operations="false"
                    :hover-state-enabled="true"
                    :allow-column-resizing="true"
                    :allow-column-reordering="true"
                    :row-alternation-enabled="true"
                    :column-auto-width="true"
                    :columnHidingEnabled="false" 
                    :show-borders="true"
                    :show-row-lines="true"
                    :focused-row-enabled="true"
                    key-expr="id"
                    :column-hiding-enabled="grid.columnHidingEnabled"
                    @editor-preparing="onEditorPreparing"
                  >
                    <!-- <DxEditing  mode="batch" :allow-updating="true" :select-text-on-edit-start="true" /> -->

                    <DxSelection :select-all-mode="allMode" show-check-boxes-mode="always" mode="multiple" />
                    
                    <DxColumn data-field="partnerId" caption="파트너 ID" data-type="string" alignment="center" css-class="devest-grid-header-require" :allow-editing="false"/>
                    <DxColumn data-field="partnerNm"  width="300px" caption="파트너명" data-type="string" alignment="left" css-class="devest-grid-header-require"/>
                    <DxColumn data-field="telNo" width="120px" data-type="string" caption="전화번호"  alignment="center" />
                    <DxColumn data-field="rpstNm" width="100px" data-type="string" caption="대표자"  alignment="center" />
                    <DxColumn data-field="addrs1" width="300px" data-type="string" caption="주소"  alignment="left" />
                    <DxColumn data-field="addrs2" width="300px" data-type="string" caption="상세주소"  alignment="left" />
                    <DxColumn data-field="zipCd" width="140px" data-type="string" caption="우편번호"  alignment="center" />
                    <DxColumn data-field="faxNo" width="120px" data-type="string" caption="FAX번호"  alignment="center" />
                    <DxColumn
                      data-field="useYn" data-type="boolean" caption="사용 여부" alignment="center"  edit-cell-template="checkBoxEditor"/>

                    <DxColumn data-field="email" width="140px" data-type="string" caption="E-mail"  alignment="center" />
                    
                    <DxColumn data-field="bankCd" data-type="string" caption="은행코드"  alignment="center" />
                    <DxColumn data-field="bankNo" width="140px" data-type="string" caption="계좌번호"  alignment="center" />

                    <DxColumn data-field="partnerType" width="160px" data-type="string" caption="파트너사 분류" alignment="center">
                      <DxLookup :data-source="partnerIdList" value-expr="code" display-expr="desc" />
                    </DxColumn>


                    <DxColumn data-field="partnerNmEn" width="320px" data-type="string" caption="파트너명(영문)"  alignment="left" />
                    <DxColumn data-field="rpstNmEn" data-type="string" caption="대표자(영문)"  alignment="left" />
                    <DxColumn data-field="addrsEn1" width="300px" data-type="string" caption="주소(영문)"  alignment="left" />
                    <DxColumn data-field="addrsEn2" width="300px" data-type="string" caption="상세주소(영문)"  alignment="left" />
                    
                    <DxColumn data-field="natnCd" data-type="string" caption="국가코드"  alignment="center" />
        
                    <DxColumn data-field="rgstNo" width="140px" data-type="string" caption="사업자 등록번호"  alignment="center" />
                    <DxColumn data-field="corpNo" width="140px" data-type="string" caption="법인 등록번호"  alignment="center" />
                    
                    <DxColumn data-field="bizCd"  data-type="string" caption="업종코드"  alignment="center" />
                    <DxColumn data-field="bizNm" width="180px" data-type="string" caption="업종명"  alignment="left" />
                    <DxColumn data-field="compDesc" width="500px" data-type="string" caption="회사 설명"  alignment="left" />

                      <!-- <DxLookup :data-source="svcGubnDataSource" value-expr="minorCd" display-expr="minorNm" /> -->

                         
                    
                 
                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>

                 
              
                    
                    <DxScrolling column-rendering-mode="virtual"/>
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


import { DxDataGrid, DxColumn, DxLookup,DxScrolling } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import { getPartner , savePartner , deletePartner} from '@/api/kier/standard/partnerManage'


import { getCommonCode } from '@/api/kier/standard/commonCodeManage'



export default {
  name: 'PartnerManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxCheckBox,
    DxLookup,
    DxScrolling
  },
  data() {
    return {
      
      dxDataGridMainRef: 'PartnerManage',
      programs: [],
      buttonUseList: [
        'btnSearch', //조회
        'btnAdd', //추가
        'btnSave', //저장
        'btnDelete' //삭제
      ],
      allMode: 'allPages',
      partnerIdList: [],
      partnerId:'',
      partnerNm:'',
      gridMain: [],
      
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    }
  },
  beforeMount() {
     Promise.all([getCommonCode('S0002')])
      .then( res => {

         this.partnerIdList = res[0].listResponse.list.slice()


      })
      .catch(error => {})
  },
  mounted() {
    // 켜질때 조회
    this.btnSearch()
  },




    
    
  methods: {
    onEditorPreparing(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        if (e.dataField == 'partnerId' || e.dataField == 'partnerNm')
          e.editorOptions.readOnlbtnSearchy = !e.row.data.isCreated
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

    btnAdd() {
      let newRow = {
        id: this.gridMain.length + 1,
        useYn: 'Y',
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
        partnerNm: this.partnerNm,

      }

      this.gridInit()
      return getPartner(params, isProgress)
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
        if (!row.partnerNm ) {
          this.vToastify('필수항목 입력하세요.[파트너명]', 'warn')
          return
        }
       
      }

      
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          savePartner(selectedMainRows, true)
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
          deletePartner(selectedMainRows.filter(row => !row.isCreated), true)
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

<style lang="scss">

</style>