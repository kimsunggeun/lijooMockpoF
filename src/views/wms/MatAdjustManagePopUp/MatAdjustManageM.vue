<template>
  <DxPopup
    :dragEnabled="true"
    :visible="MPopOpen"
    title="품목 선택"
    :show-close-button="true"
    :show-title="true"
    width="700"
    height="auto"
    @hidden="onHidden"
  >
    <DxDataGrid
      :data-source="matList"
      :height="300"
      :hover-state-enabled="true"
      :editing="{ allowUpdating: false }"
      :selection="{ mode: 'single', deferred: false }"
      :filter-row="{ visible: true }"
      :paging="{ pageSize: 5 }"
      :pager="{ allowedPageSizes: [5, 'all'], showInfo: false }"
      :column-hiding-enabled="false"
      key-expr="id"
      @selection-changed="(e) => onSelectionChanged(e)"
      :on-initialized="() => null"
      :on-content-ready="() => null"
      class="sec_grid"
    >
      <DxColumn data-field="mainClass" caption="품목 대분류" width="120px" alignment="left" />
      <DxColumn data-field="middleClass" caption="품목 중분류" width="200px" alignment="left" />
      <DxColumn data-field="matNm" caption="품목" alignment="left" />
    </DxDataGrid>
    <v-row>
      <v-spacer />
      <v-spacer />
      <v-col cols="2">
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
  name: 'MatAdjustManageM',
  mixins: [baseview, BaseDataGrid],
  components: {
    DxPopup,
    DxDataGrid,

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
    }
  },

  beforeUpdate() {},

  beforeMount() {
    Promise.all([getComboPartnerId(), getComboStdMatManage()])
      .then((res) => {
        this.partnerIdLookUp = res[0].listResponse.list.slice()
        this.matlistpopup = res[1].listResponse.list.slice()
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
    async doSearchPopup() {},

    onSelectionChanged(e) {
      this.$emit('AddSelectedRowsData', e.selectedRowsData)
    },
    changeInput(value) {
      this.idSearch = value
    },

    onHidden(e) {
      this.$emit('close')
    },
  },
}
</script>

