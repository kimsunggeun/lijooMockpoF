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
        
          <!-- headerTitle="프로그램 관리" -->
          <template v-slot:body>





            <v-layout align-center >
              <v-col cols="12" md="4" sm="12" class="pa-2">
                <v-text-field
                  :value="searchParam"
                  label="성명"
                  dense
                  outlined
                  hide-details="auto"
                  :prepend-inner-icon="$t('$search')"
                  @change="changeInput"
                  clearable
                />
                
              </v-col>
             
          
            </v-layout>
          </template>
        </i-card-top>
         <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="인원 관리">

          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="row pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="programDataGrid"
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
                    <!-- <DxEditing  mode="batch" :allow-updating="true" :select-text-on-edit-start="true" /> -->

                    <DxSelection :select-all-mode="allMode" show-check-boxes-mode="always" mode="multiple" />

                    <DxColumn
                      data-field="hrId"
                      caption="인원 ID"
                      width="100px"
                      data-type="string"
                      alignment="center"
                    >
                    </DxColumn>

                    <DxColumn
                      data-field="deptCd"
                      caption="부서명"
                      width="170px"
                      data-type="string"
                      alignment="left"
                      css-class="devest-grid-header-require"
                    >
                      <DxLookup
                          :data-source="deptList"
                          value-expr="deptCd"
                          display-expr="deptNm"
                      />
                    </DxColumn>

                    <DxColumn
                      data-field="korNm"
                      caption="성명"
                      width="120px"
                      data-type="string"
                      alignment="center"
                      css-class="devest-grid-header-require"
                    >
                    </DxColumn>

                    <DxColumn
                      data-field="engNm"
                      caption="성명(영문)"
                      width="150px"
                      data-type="string"
                      alignment="left"
                 
                    >
                    </DxColumn>

                    <DxColumn
                      data-field="sexDiv"
                      caption="성별"
                      width="120px"
                      data-type="string"
                      alignment="center"
                    >
                    <DxLookup :data-source="sexDiv" display-expr="desc" value-expr="code" />
                    </DxColumn>

                    <DxColumn
                      data-field="title"
                      caption="직책"
                      width="120px"
                      data-type="string"
                      alignment="center"
                    >
                    <DxLookup :data-source="title" display-expr="desc" value-expr="code" />
                    </DxColumn>
                    <DxColumn
                      data-field="hpNo"
                      caption="전화번호"
                      width="150px"
                      data-type="string"
                      alignment="center"
                    >
                    </DxColumn>

                    <DxColumn
                      data-field="remark"
                      caption="비고"
                    
                      data-type="string"
                      alignment="left"
                    >
                    </DxColumn>

              
                    <DxColumn
                      data-field="useYn"
                      data-type="boolean"
                      caption="사용 여부"
                      alignment="center"
                      width="90px"
                      edit-cell-template="checkBoxEditor"
                    /> 

                 

                    <template #checkBoxEditor="{ data: cellInfo }">
                      <DxCheckBox :value="cellInfo.value == 'Y' ? true : false" :onValueChanged="value => onCheckValueChanged(value, cellInfo)" />
                    </template>

                 
                    <!-- menuIcon -->
                    <template #progIconEditor="{ data: cellInfo  }">
                      <DxSelectBox
                        :data-source="iconListDataSource"
                        :value="cellInfo.value"
                        :search-enabled="true"
                        display-expr="minorNm"
                        value-expr="minorCd"
                        @value-changed="value => onProgIconChanged(value.value, cellInfo)"
                        item-template="item"
                      >
                        <template #item="{ data }">
                          <div>
                            <v-icon v-if="data">
                              {{ data.minorCd }}
                            </v-icon>
                            {{ data.minorNm }}
                          </div>
                        </template>
                      </DxSelectBox>
                    </template>
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

import DxSelectBox from 'devextreme-vue/select-box'
import {  DxColumn,  DxLookup } from 'devextreme-vue/tree-list'
import notify from 'devextreme/ui/notify' // message

import { getHrManage,saveHrManage,deleteHrManage} from '@/api/kier/standard/hRManage'
import baseview from '@/components/base/baseview.vue'
import BaseDataGrid from '@/components/base/BaseDataGrid.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'

import {
  getStdOrgManage,
} from '@/api/kier/standard/orgManage'


export default {
  mixins: [BaseDataGrid , baseview],
  components: { 
    DxColumn,
    DxSelectBox,
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxLookup

  },
  data() {
    return {
      
      dxDataGridMainRef: 'programDataGrid',
      gridMain: [],
      searchParam: '',

      programs: [],
      buttonUseList: [
        'btnSearch', //조회
        'btnAdd', //추가
        'btnSave', //저장
        'btnDelete' //삭제
      ],
      iconListDataSource: [],
      svcGubnDataSource: [],
      svsTypeDataSource: [],
  

      deptList: [],
      title:[],
      sexDiv:[],
   
    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    }
  },

 beforeMount() {
    Promise.all([
      getCommonCode('S0004'),
      getCommonCode('S0005'),
      getStdOrgManage()
    ])
      .then( res => {
        this.title = res[0].listResponse.list.slice()
        this.sexDiv = res[1].listResponse.list.slice()
        this.deptList = res[2].listResponse.list.map(el => {return {deptCd:el.deptCd, deptNm:el.deptNm}})
        this.deptList.unshift({deptCd:'', deptNm:'조직'})
      })
      .catch(error => {})
  },

  // mounted() {
  //   // 켜질때 조회
  //   this.btnSearch()
  // },





  methods: {

    onEditorPreparing(e) {
      //hrId는 추가된 행이 아니면 수정 불가능하게 설정
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
        switch (e.dataField) {
          case 'hrId' :
            e.editorOptions.readOnly = !e.row.data.isCreated
            break;
          default:
            break;
        }
        e.editorOptions.onValueChanged = args => {
          if (e.index > -1) e.component.selectRows(e.row.key, true)
          if (e.dataField == 'hrId') this.gridMainInstance.refresh()
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
    //------------------------------------------
        // let searchParam = {
        //   hrId:'',
        //   korNm:this.searchParam,
        // }


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
           notify("조회되었습니다.", 'success', 1500)
        })
    },

    doSearchMain() {
      let programs = {
        hrId : '',
        korNm : this.searchParam
      }

      this.gridInit()
      return getHrManage(programs)
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
        if (!row.deptCd || !row.korNm) {
          this.vToastify('필수항목 입력하세요.[ 부서명, 성명 ]', 'warn')
          return
        }
       
      }
      
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveHrManage(selectedMainRows, true)
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
          deleteHrManage(selectedMainRows.filter(row => !row.isCreated), true)
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