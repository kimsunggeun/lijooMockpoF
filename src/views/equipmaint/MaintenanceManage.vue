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
              
                  <span class="px-1 pt-1 ml-2">{{'계획일:'}}</span>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="maintPlanDtFrom"
                    :max="maintPlanDtTo"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {maintPlanDtFrom = e.value && getDateFormat(e.value)}"
                  >
                  
                  </DxDateBox>
                </v-col>
                <p>~</p>
                <v-col cols="12" md="2" class="pa-2 py-md-0">
                  <DxDateBox
                    :value="maintPlanDtTo"
                    :min="maintPlanDtFrom"
                    height="30px"
                    display-format="yyyy-MM-dd"
                    :acceptCustomValue="false"
                    @value-changed="e => {maintPlanDtTo = e.value && getDateFormat(e.value)}"
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
        <i-card-vertical headerTitle="설비 보전 리스트">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" class="pa-0">
                <DxDataGrid
                  id="MaintenanceManage"
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
                  @focused-row-changed="onFocusedRowChanged"
                >






                 <DxColumn  data-field="maintId" caption="보전 ID" width="200px"  data-type="string" alignment="center" css-class="devest-grid-header-require" :allow-editing="false" />
                   
                  <DxColumn data-field="equipId"  caption="설비명"  width="120px" data-type="string" alignment="center" css-class="devest-grid-header-require">
                    <DxLookup
                        :data-source="equipIdlist"
                        value-expr="code"
                        display-expr="desc"
                      />
                    </DxColumn>

                  <DxColumn data-field="actCd" caption="작업"  width="120px"  data-type="string" alignment="center" css-class="devest-grid-header-require">
                     <DxLookup
                        :data-source="actCdlist"
                        value-expr="code"
                        display-expr="desc"
                      />
                    </DxColumn>
                  <DxColumn data-field="maintPlanDt" caption="보전 계획 일자" width="150px"  data-type="date" alignment="center" format="yyyy-MM-dd" css-class="devest-grid-header-require"
                            edit-cell-template="maintPlanDt"
                  />
                  <template #maintPlanDt="{ data :cellInfo}">
                    <DxDateBox 
                    :value="cellInfo.value"
                    display-format="yyyy-MM-dd"
                     @value-changed="e => {
                        onValueChanged(e,cellInfo)
                      
                     
                    }"
                      />
                  </template>
                  <DxColumn data-field="maintResultDt" caption="보전 실적 일자" width="150px"   data-type="date" alignment="center" format="yyyy-MM-dd"
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

                  <DxColumn data-field="maintContent" caption="보전 내용"  data-type="string" alignment="left"/>
                  <DxColumn data-field="remark" caption="비고"  data-type="string" alignment="left"/>

                 
                 
                 
                 
                 
                 
                 
                 
                 <!-- ///업로드/// -->
                 
            <DxColumn data-field="realFileNm" caption="파일 첨부" alignment="left"
                           width="400px"
                           edit-cell-template="editCellTemplate" />

                 <DxColumn data-field="filePath" caption="파일패치" alignment="center" :visible="false"  />   
                      
                 <DxColumn data-field="saveFileNm" caption="세이브파일이름" alignment="center"  :visible="false"  />     
                          
                     


                 <DxColumn data-field="downfile" caption="파일 다운로드" alignment="center" width="125px" :allow-editing="false"
                          
                          cell-template="editdownCellTemplate" />

               

                        
          

                  <template #editCellTemplate="{ data }">

                  <div style="text-align: center">
                  <DxFileUploader 
                  :ref="dxFileloaderRef"
                  :multiple="false"
                  :value="files"
                  :accept="accept"
                  :max-file-size="40000000"
                   @value-changed="onFileValueChanged"
                  :upload-mode="uploadMode"
                 :visible="false"
                  @uploaded="(e) => onUploaded(e, data)"
                  @upload-error="onUploadError"/>
              
                   <v-btn  
                   color="blue-grey"
                   class="pa-1 pr-2 mr-2 white--text " 
                   role="upload" @click="uploadClick(data)">
                              <v-icon
                              class="mr-1"
                               right
                               dark>
                               mdi-cloud-upload
                              </v-icon>
                              업로드
                    </v-btn>


                    </div>

                </template>
  
                
                <template #editdownCellTemplate>
                   <v-btn  
                   color="green"
       
                   class="pa-1 pr-2  white--text " 

                   @click="onItemDownloading">
                              <v-icon
                              class="mr-1"
                               right
                               dark>
                               mdi-cloud-download
                              </v-icon>
                              다운로드
                    </v-btn>
                  
                </template>

               
                  

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
import notify from 'devextreme/ui/notify';
import DxCheckBox from 'devextreme-vue/check-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'
import {DxCalendarOptions,DxDateBox} from 'devextreme-vue/date-box'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { DxFileUploader } from 'devextreme-vue/file-uploader'
import DxButton from 'devextreme-vue/button'
import {
  getMaintenanceManage,
  saveMaintenanceManage,
  deleteMaintenanceManage,
  getComboEquEquipManage,
  multiUploadMain,
  downloadFileMain
} from '@/api/kier/equipmaint/MaintenanceManage'

import { getDateFormat, getCurrentDate, getPreMonth,getExtension,} from '@/utils/common.js'
import { getCommonCode } from '@/api/kier/standard/commonCodeManage'




export default {
  name: 'MaintenanceManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    DxDateBox,
    ISystemBar,
    DxDataGrid,
    DxColumn,

    DxFileUploader,
  
    DxLookup

    

  },
  data() {
    return {
      dxDataGridMainRef: 'MaintenanceManage',
      gridMain: [],
     dxFileloaderRef:'FileUploaderRef',
      maintPlanDtFrom:getPreMonth(12),
      maintPlanDtTo:getPreMonth(0),
      
      matList:[],
      equipId:'',
      hrIdLookUp: [],
      multiple: false,
      retryButtonVisible: false,
      accept: '*',
      uploadMode: 'useButton',
      files:[],
      file:[],


      actCdlist:[],
      equipIdlist:[],
      equipIdListseach:[],
      uploadedres:[],
      focusedRowData:null,
      error:[]



    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    },

  },

  beforeMount() {
 let params = {
    delYn:'',
    equipNm:''
 }
    Promise.all([
         getCommonCode('S0018'),
         getCommonCode('U0007'),
         getComboEquEquipManage(params)
    ])
      .then( res => {
        this.actCdlist = res[1].listResponse.list.slice()
        this.equipIdlist = res[2].listResponse.list.slice()
        this.equipIdListseach = res[2].listResponse.list.slice()
      
        
       
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
          case 'actCd':
            e.editorOptions.readOnly = !e.row.data.isCreated
            break;
          case 'equipId':
            e.editorOptions.readOnly = !e.row.data.isCreated
            break;
          case 'realFileNm':
            e.editorOptions.readOnly = e.row.data.isCreated
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
        isCreated: true,
        realFileNm:'추가된 파일이없습니다'
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
        maintPlanDtFrom:this.maintPlanDtFrom,
        maintPlanDtTo:this.maintPlanDtTo,
        
      }

      this.gridInit()
      return getMaintenanceManage(params, isProgress)
        .then(res => {


        this.gridMain = res.listResponse.list
 
          if(this.gridMain.length) this.gridMainInstance.option('focusedRowIndex', -1)
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

        if(a.maintPlanDt != undefined || a.maintPlanDt != null){
            a.maintPlanDt = a.maintPlanDt.substring(0,10).replace(/-/g,'') 
        }
      
        
  

       if(a.maintResultDt != undefined || a.maintResultDt != null){
          a.maintResultDt = a.maintResultDt.substring(0,10).replace(/-/g,'') 
        }
        
        if(!a.actCd){
            this.vToastify(this.$t('작업을 입력해주세요.'), 'warn')
            return
        }
       else if(!a.equipId){
            this.vToastify(this.$t('설비를 입력해주세요.'), 'warn')
            return
        }
        
       else if(!a.maintPlanDt){
            this.vToastify(this.$t('보전 계획 일자를 입력해주세요.'), 'warn')
            return
        }
 
}
    

      //유효성 체크
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
    
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveMaintenanceManage(selectedMainRows, true)
            .then(res => {
            if(this.file.length != 0){
              this.saveFile(this.file)  
           }

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
          deleteMaintenanceManage(selectedMainRows.filter(row => !row.isCreated), true)
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
    },

    onFocusedRowChanged(e) {
      this.focusedRowData = e.row && e.row.data

    
    },



////////////////////////////////////////업로드/////////////////////////////////////////
 

 async onFileValueChanged(e) {

      let file = e.value[0]
       this.file = e.value[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)




      reader.onload = () => 
      {

       if(file.size >=  40000000){
        
        this.focusedRowData.realFileNm = "업로드 실패"

        this.vToastify(this.$t('허용된 용량을 초과했습니다 <Br> (최대40MB)'), 'warn')
        return
        }
      

      if(this.error === 404){
      this.vToastify(this.$t('서버를 찾을수 없습니다.(err 404)'), 'warn')
      return
      }

      if(this.error === 400){ this.vToastify(this.$t('업로드실패(err 400)'), 'warn') 
      return
      }

  

    
     this.focusedRowData.realFileNm = this.file.name 
      this.saveFile(file)

 

      }
    },

 
 uploadClick(e){
      // 클릭했을 때 해당 열의 데이터를 들고 옴

      if(e.row.data.isCreated == true){
        this.vToastify(this.$t('새로 추가된행은 업로드하실수 없습니다.'), 'warn')
        return
      }
      this.currentCellInfo = e
      let fileInstance = this.$refs[this.dxFileloaderRef].instance
      let fileElement = fileInstance.element()
      let uploadButton = fileElement.querySelector(`.dx-button-content`)
      
      uploadButton.click()
 },


async saveFile(e) {
            // form 데이터로 전송
            let formData = new FormData()
            formData.append('files[]', e)
          
            formData.append('maintId',this.focusedRowData.maintId)
          

        await    multiUploadMain(formData, false)
             .catch(()=>{
                this.vToastify (this.$t('업로드 실패하셨습니다'), 'warn')
                this.focusedRowData.realFileNm = '업로드에 실패하셨습니다.'
                this.focusedRowData.saveFileNm = null
                this.focusedRowData.filePath = null
              })
              .then(res => { 
                this.focusedRowData.saveFileNm = res[0].saveFileNm
                this.focusedRowData.filePath = res[0].filePath
                this.focusedRowData.realFileNm = res[0].realFileNm
                notify(this.$t("업로드 성공"), "success", 300)
              })
             
              .finally(() => {
             
              })
           },
      
   
    onUploadError(e) {
     this.error = e.request.status
      let xhttp = e.request;
      if(xhttp.status === 400){
      this.vToastify(this.$t('업로드에 실패했습니다 다시시도해주세요.'), 'warn')
      return
      }
      if(xhttp.readyState === 4 && xhttp.status === 0) {
        this.vToastify(this.$t('업로드에 실패했습니다 다시시도해주세요.'), 'warn')
      }  return

    },

     onItemDownloading(e) {
        if(this.focusedRowData.saveFileNm == null){
        
        this.vToastify(this.$t('파일이 없습니다.'), 'warn')
        return
        }
        this.dodownload(true)
    },




    dodownload(isProgress){
    
      let params = {
        
        maintId  :this.focusedRowData.maintId
    
      }

    return  downloadFileMain(params,isProgress)
    .then(res=>{
        
        let link = document.createElement('a')
        let objectUrl = window.URL.createObjectURL(res)
        link.href = objectUrl
        link.download = this.focusedRowData.realFileNm
        link.click()
      })
  },
    
    // douploader(isProgress){
    //    let params = {
    //     equipId :this.focusedRowData.equipId,
    //     maintPlanDt  :this.focusedRowData.maintPlanDt.replace(/-/g,''),
    //     actCd  :this.focusedRowData.actCd
    //   }
    // return multiUpload(params, isProgress)
    //     .then(res => {
    //         console.log(res)
    //         let file = new File()
    //         var formData = new FormData()
    //         formData.append('files[]', file)
    //         formData.append('params', new Blob([JSON.stringify(params)], { type: 'application/json' }))
    //     })
    //     .finally(() => {
        
    //     })
    // },


  }
}
</script>