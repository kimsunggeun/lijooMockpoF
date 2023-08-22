<template>
  <DxPopup
    :dragEnabled="true"
    :visible="MPopOpen"
    title="품목 선택"
    :show-close-button="true"
    :show-title="true"
    width="auto"
    height="auto"
    @hidden="onHidden"
  >
    <DxDataGrid
      :data-source="focusedRowData"
      :height="300"
      :ref="PopDataGridRef"
      :hover-state-enabled="true"
      :editing="{ allowUpdating: true }"
      :selection="{ mode: 'single', deferred: false }"
      :filter-row="{ visible: true }"
      :paging="{ pageSize: 5 }"
      :pager="{ allowedPageSizes: [5, 'all'], showInfo: false }"
      key-expr="id"
      @selection-changed="(e) => onSelectionChanged(e)"
      :on-initialized="() => null"
      :on-content-ready="() => null"
      class="sec_grid"
    >
      <DxColumn data-field="invoiceId" caption="거래명세서 ID" width="150px" data-type="string" alignment="center" />

      <DxColumn data-field="seq" caption="순번" width="90px" data-type="number" alignment="right" />

      <DxColumn data-field="poNo" caption="발주 번호" width="150px" data-type="string" alignment="center" :allow-editing="false" :visible="false" />

      <DxColumn data-field="poSeq" caption="발주 순번" width="80px" data-type="number" alignment="center" :allow-editing="false" :visible="false" />

      <DxColumn data-field="mainClass" caption="품목 대분류" width="120px" data-type="string" alignment="left" :allow-editing="false" />

      <DxColumn data-field="middleClass" caption="품목 중분류" width="250px" data-type="string" alignment="left" :allow-editing="false" />

      <DxColumn data-field="matCd" caption="품목" width="350px" data-type="string" alignment="left" :allow-editing="false">
        <DxLookup :data-source="matList" value-expr="matCd" display-expr="matNm"
      /></DxColumn>

      <DxColumn data-field="reqQty" caption="요청 수량" width="70px" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />

      <DxColumn data-field="qty" caption="공급 수량" width="70px" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />

      <DxColumn data-field="price" caption="공급가액" width="90px" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />

      <DxColumn data-field="inQty" caption="입고 수량" width="90px" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />

      <DxColumn
        data-field="sumInQty"
        caption="진행 중 수량"
        width="70px"
        data-type="number"
        format="#,##0"
        alignment="right"
        :allow-editing="false"
      />

      <DxColumn data-field="remainQty" caption="남은 수량" width="70px" data-type="number" format="#,##0" alignment="right" :allow-editing="false" />
    </DxDataGrid>
    <v-row>
      <v-spacer />
      <v-spacer />
      <v-col cols="1">
        <v-btn outlined @click="onChose()" width="100%">
          <v-icon>done</v-icon>
          선택
        </v-btn>
      </v-col>

      <v-col cols="1">
        <v-btn outlined @click="onHidden()" width="100%">
          <v-icon>done</v-icon>
          완료
        </v-btn>
      </v-col>
    </v-row>
  </DxPopup>
</template>

<script>
import baseview from '@/components/base/baseview'
import { DxPopup } from 'devextreme-vue/popup'
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가
import { getInvoiceDetailMatCd, getComboPartnerId } from '@/api/kier/scm/invoiceManage'
import { getComboStdMatManage } from '@/api/kier/standard/matManage'
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import DxDateBox from 'devextreme-vue/date-box'
export default {
  name: 'PurchasingOrderManageM',
  mixins: [baseview, BaseDataGrid],
  components: {
    DxPopup,
    DxDataGrid,
    DxLookup,
    DxColumn,
  },
  props: {
    MPopOpen: Boolean,

    focusedRowData: [Object, Array],
  },
  data() {
    return {
      PopDataGridRef: 'PopDataGridRef',
      matListDetail: [],
      reqDtTo: getPreMonth(-2),
      reqDtFrom: getPreMonth(2),
      idSearch: '',
      partnerIdLookUp: [],
      matlistpopup: [],
      matList: [],
      ChoseData: [],
    }
  },

  beforeUpdate() {},

  beforeMount() {
    Promise.all([getComboPartnerId(), getComboStdMatManage()])
      .then((res) => {
        this.partnerIdLookUp = res[0].listResponse.list.slice()

        this.matList = res[1].listResponse.list.slice()
      })
      .catch((error) => {})
  },

  computed: {
    gridInstancePop() {
      return this.GetDataGrid(this.PopDataGridRef)
    },
  },
  methods: {
    onSelectionChanged(e) {
      this.ChoseData = e.selectedRowsData
    },
    changeInput(value) {
      this.idSearch = value
    },

    onChose() {
      this.gridInstancePop.saveEditData()

      this.$emit('AddSelectedRowsData', this.ChoseData)
    },

    onHidden(e) {
      this.$emit('close')
    },
  },
}
</script>

