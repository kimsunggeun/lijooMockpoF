<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pb-0">
        <i-card-top
          class="d-md-flex"
          :useBtnList="buttonUseList"
          @btnAdd="btnAdd()"
          @btnSearch="btnSearch()"
          @btnSave="btnSave()"
          @btnDelete="btnDelete()"
          @btnPrint="btnPrint()"
        >
          <template v-slot:body>
            <v-layout column>
              <v-row no-gutters class="center pa-2 pb-0">
                <v-col cols="12" md="3" class="py-2 py-md-0">
                  <v-text-field
                    label="Pallet 명"
                    class="search-text-field"
                    dense
                    outlined
                    color="primary"
                    hide-details="auto"
                    :prepend-inner-icon="$t('$search')"
                    @keydown.enter="btnSearch()"
                    clearable
                    v-model="txtPalletNm"
                  />
                </v-col>
                <span style="width: 164px;" class="pa-2 py-md-0">
                  <v-switch
                    v-model="toggleDelYn"
                    true-value="Y"
                    false-value="N"
                    :label="`삭제 데이터 조회`"
                    @click="btnSearch()"
                  />
                </span>
              </v-row>
            </v-layout>
          </template>
        </i-card-top>
        <i-system-bar/>
      </v-col>
      <v-col cols="12" sm="12" lg="12" class="pa-2 pt-0">
        <i-card-vertical headerTitle="Pallet 관리">
          <template v-slot:body>
            <v-layout column overflow-auto>
              <v-col cols="12" md="12" class="pa-0">
                <v-col cols="12" lg="12" class="pa-0">
                  <DxDataGrid
                    id="palletManageMain"
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
                    :column-hiding-enabled="grid.columnHidingEnabled"
                    @editor-preparing="onEditorPreparing"
                  >
                    <DxColumn data-field="palletId" caption="Pallet ID" width="150px" data-type="string" alignment="center" :allow-editing="false"/>

                    <DxColumn data-field="palletNm" caption="Pallet 명" width="220px" data-type="string" alignment="left" css-class="devest-grid-header-require"/>

                    <DxColumn data-field="rfidTag" caption="RFID Tag" width="200px" data-type="string" alignment="left" css-class="devest-grid-header-require">
                      <DxLookup
                        :data-source="rfidTagList"
                        value-expr="desc"
                        display-expr="desc"
                      />
                    </DxColumn>

                    <!-- <DxColumn data-field="locationId" caption="LocationID" width="150px" data-type="string" alignment="center" :allow-editing="false"/> -->
                    <DxColumn data-field="locationDesc" caption="위치" width="150px" data-type="string" alignment="center" :allow-editing="false"/>

                    <DxColumn data-field="size" caption="크기" width="120px" data-type="string" alignment="left" />

                    <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />

                    <DxColumn data-field="useYn" caption="사용 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor"/>

                    <DxColumn data-field="delYn" caption="삭제 여부" data-type="boolean" width="70px" alignment="center" edit-cell-template="checkBoxEditor"/>

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
import { DxDataGrid, DxColumn, DxLookup,DxPaging,DxPager } from 'devextreme-vue/data-grid'
import DxCheckBox from 'devextreme-vue/check-box'
import ICardTop from '@/components/common/iCardTop.vue'
import ICardVertical from '@/components/common/iCardVertical.vue'
import ISystemBar from '@/components/common/iSystemBar.vue'

import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

import {
  getStdPalletManage,
  saveStdPalletManage,
  deleteStdPalletManage,
  printStdPalletManage
} from '@/api/kier/standard/palletManage'

import { getComboRfidTag } from '@/api/kier/standard/RFIDTagManage'

import { JSPrintManager, WSStatus, ClientScanJob, ScannerImageFormatOutput } from 'jsprintmanager';
import * as JSPM from 'jsprintmanager'

export default {
  name: 'PalletManage',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    ICardVertical,
    ICardTop,
    ISystemBar,
    DxDataGrid,
    DxColumn,
    DxCheckBox,
    DxLookup,
    DxPager,
    DxPaging
  },
  data() {
    return {

      pageSizes: [20, 'all'],
      showPageSizeSelector: true,
      showInfo: true,
      showNavButtons: true,
      dxDataGridMainRef: 'palletManageMain',
      buttonUseList: [
        'btnSearch', //조회
        'btnAdd', //신규
        'btnSave', //저장
        'btnDelete', //삭제
        'btnPrint' //출력
      ],
      gridMain: [],
      txtPalletNm: '',
      toggleDelYn: 'N',
      rfidTagList: [],

    }
  },
  computed: {
    gridMainInstance() {
      return this.GetDataGrid(this.dxDataGridMainRef)
    }
  },
  beforeMount() {
    Promise.all([
      getComboRfidTag()
    ])
      .then( res => {

           res[0].listResponse.list.sort(function(a, b) {
              var codea = a.code.toUpperCase(); 
              var codeb = b.code.toUpperCase(); 
              if (codea < codeb) {
                return -1;
              }
              if (codea > codeb) {
                return 1;
              }
                return 0;
              });

            this.rfidTagList = res[0].listResponse.list
      
 
      
        
      })
      .catch(error => {})
  },
  methods: {
    onEditorPreparing(e) {
      if (e.parentType == 'dataRow' && e.type != 'selection') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged
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
        palletNm: this.txtPalletNm,
        delYn: this.toggleDelYn
      }

      this.gridInit()
      return getStdPalletManage(params, isProgress)
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
        if (!row.palletNm || !row.rfidTag) {
          this.vToastify('필수항목 입력하세요.[Pallet 명, RFID Tag]', 'warn')
          return
        }
      }
      
      this.vToastifyPrompt(
        this.$t('doSaveData'),
        'info',
        current => {
          this.openLoading()
          this.gridMainInstance.beginUpdate()
          saveStdPalletManage(selectedMainRows, true)
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
          deleteStdPalletManage(selectedMainRows.filter(row => !row.isCreated), true)
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

    getCmdMultilineString(selectedMainRows){
      let cmdMultilineString = "";
      for (var row of selectedMainRows) {
        // console.log("row 확인 : " + row.palletId);

        cmdMultilineString = cmdMultilineString +
        `
        ^XA

        ^FX 문자회전(기본값: N = Normal, R = 90도 , I = 180도, B= 270도)

        ^MMT
        ^PW799
        ^LL0240
        ^LS0

        ^FX Pallet
        0^CF0,60^FO624,143^A0I^FDPallet^FS

        ^FX Pallet :
        0^CF0,60^FO580,143^A0I^FD:^FS

        ^FX Pallet ID
        0^CF0,60^FO255,143^A0I^FD` + row.palletId + `^FS



        ^FX Name
        0^CF0,60^FO624,40^A0I^FDName^FS

        ^FX Name :
        0^CF0,60^FO580,40^A0I^FD:^FS

        ^FX Pallet Name
        0^CF0,60^FO270,40^A0I^FD` + row.palletNm + `^FS



        ^FX Box
        ^FO16,25^GB770,210,4^FS

        ^FX Vertical Line
        ^FO221,25^GB0,210,4^FS

        ^FX Horizontal Line
        ^FO222,128^GB560,0,4^FS

        ^FX QR Code 개행 되는지 확인
        ^FT36,236^BQN,2,8
        ^FH\^FDMA,` + row.palletId + `^FS

        ^PQ1,0,1,Y

        ^PQ1,0,1,Y

        ^XZ

        `;
      }

      return cmdMultilineString;
    },

    async btnPrint() {
      var selectedMainRows = await this.gridMainInstance.getSelectedRowsData()
      if (!selectedMainRows.length) {
        this.vToastify(this.$t('선택된 데이터가 없습니다.'), 'warn')
        return
      }
      
      // let text = this.getCmdMultilineString(selectedMainRows);
      // console.log("테스트:" + text);
      
      this.print(selectedMainRows);
    },

    print(selectedMainRows) {
      // Step 1. 연결
      JSPM.JSPrintManager.auto_reconnect = true;
      JSPM.JSPrintManager.start();

      // Zebra Print ZPL
      JSPM.JSPrintManager.WS.onStatusChanged = function () {
      if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open) {
        // 로컬에 설치 된 프린터 정보 확인
        JSPM.JSPrintManager.getPrinters().then(function (e) {

        });
        
        let cmdMultilineString = "";
        for (var row of selectedMainRows) {
 

          cmdMultilineString = cmdMultilineString +
          `
          ^XA

          ^FX 문자회전(기본값: N = Normal, R = 90도 , I = 180도, B= 270도)

          ^MMT
          ^PW799
          ^LL0240
          ^LS0

          ^FX Pallet
          0^CF0,60^FO624,143^A0I^FDPallet^FS

          ^FX Pallet :
          0^CF0,60^FO580,143^A0I^FD:^FS

          ^FX Pallet ID
          0^CF0,60^FO255,143^A0I^FD` + row.palletId + `^FS



          ^FX Name
          0^CF0,60^FO624,40^A0I^FDName^FS

          ^FX Name :
          0^CF0,60^FO580,40^A0I^FD:^FS

          ^FX Pallet Name
          0^CF0,60^FO270,40^A0I^FD` + row.palletNm + `^FS



          ^FX Box
          ^FO16,25^GB770,210,4^FS

          ^FX Vertical Line
          ^FO221,25^GB0,210,4^FS

          ^FX Horizontal Line
          ^FO222,128^GB560,0,4^FS

          ^FX QR Code 개행 되는지 확인
          ^FT36,236^BQN,2,8
          ^FH\^FDMA,` + row.palletId + `^FS

          ^PQ1,0,1,Y

          ^PQ1,0,1,Y

          ^XZ

          `;
        }
        


        var cpj = new JSPM.ClientPrintJob();
        cpj.clientPrinter = new JSPM.UserSelectedPrinter();
        // cpj.clientPrinter = new JSPM.DefaultPrinter();
        // cpj.clientPrinter = new JSPM.InstalledPrinter("ZDesigner ZT411-203dpi ZPL");
        // cpj.clientPrinter = new JSPM.InstalledPrinter("복합기-마라탕2층_SINDOH D410 Series PCL");

        cpj.printerCommands = cmdMultilineString;
        cpj.sendToClient();
      }};
    },
    
    gridInit() {
      this.gridMainInstance.clearSelection()
      this.gridMainInstance.cancelEditData()
      this.gridMainInstance.option('focusedRowIndex', -1)
    }
  }
}
</script>