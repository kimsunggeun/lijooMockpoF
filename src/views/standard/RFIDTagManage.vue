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
          @btnDelete="btnDelete()" > 
          <template v-slot:body>
            <v-layout align-center >
              <v-col cols="12" md="4" sm="12" class="pa-2">
                <v-text-field
                  :value="mainClassTxt"
                  label="RFID Tag 명"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @keydown.enter="btnSearch()"
                  @change="changeInput"
                  clearable
                />
              </v-col>
              <span style="width: 164px;" class="pa-2 py-md-0">
                <v-switch
                  v-model="toggleDelYn"
                  true-value="Y"
                  @click="btnSearch()"
                  false-value="N"
                  :label="`삭제 데이터 조회`"
                />
              </span>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="RFID Tag 관리">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="row pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="RFIDTagManage"
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
                    :show-row-lines="true"
                    :focused-row-enabled="true"
                    key-expr="id"
                    @editor-preparing="onEditorPreparing"
                  >
                 

                    <DxSelection show-check-boxes-mode="always" mode="multiple" />
                    
                    <DxColumn data-field="rfidTag" data-type="string" caption="RFID Tag"   width="200px" css-class="devest-grid-header-require">
                      
                    </DxColumn>

                    <DxColumn data-field="rfidTagNm" data-type="string" caption="RFID Tag 명" width="200px" >
                      
                    </DxColumn>

                    <DxColumn data-field="buyDt" data-type="date" caption="구입일" width="150px" format="yyyy-MM-dd" alignment="center"
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
                        
                     <DxColumn data-field="remark" data-type="string" caption="비고" alignment="left" />
                
                    <DxColumn
                      data-field="useYn" data-type="boolean" caption="사용 여부" alignment="center" width="90px" edit-cell-template="checkBoxEditor"/>

                    <DxColumn 
                      data-field="delYn" data-type="boolean" caption="삭제 여부" alignment="center"  width="90px" edit-cell-template="checkBoxEditor"/>

                    <DxColumn 
                       caption="" alignment="center"  width="600px" edit-cell-template="checkBoxEditor" :allow-editing="false"  >
                    </DxColumn>


                         
                   <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>


                 <DxPaging :enabled="true" :page-size="20"/>
                   <DxPager
                      :visible="true"
                      :allowed-page-sizes="pageSizes"
                      :show-page-size-selector="showPageSizeSelector"
                      :show-info="showInfo"
                      :show-navigation-buttons="showNavButtons"
                    />         

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



import { DxDataGrid, DxColumn,DxPager,DxPaging } from 'devextreme-vue/data-grid'
import notify from 'devextreme/ui/notify' // messag
import DxDateBox from 'devextreme-vue/date-box'
import { getRfidTag,saveRfidTag,deleteRfidTag} from '@/api/kier/standard/RFIDTagManage'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import baseview from '@/components/base/baseview.vue'

import BaseDataGrid from '@/components/base/BaseDataGrid.vue'



export default {
  mixins: [BaseDataGrid , baseview],
  components: {
    DxPager,
    DxPaging,
    DxDataGrid,
    DxColumn,
    ICardVertical,
    ICardTop,
    DxDateBox,
    ISystemBar,
  },
  data() {
    return {


      pageSizes: [20, 'all'],
      showPageSizeSelector: true,
      showInfo: true,
      showNavButtons: true,


      dxDataGridMainRef : 'RFIDTagManage',
      gridMain: [],
      searchParam: '',

      toggleDelYn: 'N',
      mainClassTxt: '',
      middleClassTxt: '',

      buttonUseList: [
        'btnSearch', //조회
        'btnAdd', //추가
        'btnSave', //저장
        'btnDelete' //삭제
      ],
 

    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    }
  },
  beforeMount() {

   
  },
  // mounted() {
  //   // // 켜질때 조회
  //   // this.btnSearch()
     
  // },



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
        switch (e.dataField) {
          case 'rfidTag' :
            e.editorOptions.readOnly = !e.row.data.isCreated
            break;
       
          default:
            break;
        }
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          if (e.dataField == 'rfidTag') this.gridMainInstance.refresh()
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
  
    ///////////////////////////////////////
    /*       Toolbar Button Event        */
    ///////////////////////////////////////
    //------------------------------------------
    //  프로그램 조회
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
           notify("조회되었습니다.", 'success', 1500)
        })
    },

    doSearchMain() {
      let programs = {
        rfidTag : '',
        rfidTagNm : this.searchParam,
        delYn : this.toggleDelYn

      }



      this.gridInit()
      return getRfidTag(programs)
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
        if (!row.rfidTag) {
          this.vToastify('필수항목 입력하세요.[ RFID Tag ]', 'warn')
          return
        }
       
      }
      
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveRfidTag(selectedMainRows, true)
            .then(res => {
              this.doSearchMain(false)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
              notify("저장완료", 'success', 1500)
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
          deleteRfidTag(selectedMainRows.filter(row => !row.isCreated), true)
            .then(res => {
             this.doSearchMain(false)
            })
            .finally(() => {
              this.gridMainInstance.endUpdate()
              this.endLoading()
              notify("삭제완료", 'success', 1500)
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
    },

    ///////////////////////////////////////
    /*        DataGrid Event Event       */
    ///////////////////////////////////////


    
    //v-text-field에 입력된 값을 api로 넘겨줄 검색어 searchsearchParam으로 설정
    changeInput(value) {
      this.searchParam = value
    }

    ///////////////////////////////////////
    /*             etc Event             */
    ///////////////////////////////////////



  }
}
</script>

<style lang="scss">

</style>