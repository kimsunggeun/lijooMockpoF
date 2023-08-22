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
    <v-row>
      <span style="margin-top: 15px">{{ '납기 요청일:' }}</span>
      <v-col cols="12" md="2" class="pa-0">
        <DxDateBox
          :value="reqDtFrom"
          :max="reqDtTo"
          height="30px"
          display-format="yyyy-MM-dd"
          :show-clear-button="true"
          @value-changed="
            (e) => {
              reqDtFrom = e.value && getDateFormat(e.value)
            }
          "
        />
      </v-col>
      <p style="margin-top: 15px">~</p>
      <v-col cols="12" md="2" class="pa-0">
        <DxDateBox
          :value="reqDtTo"
          :min="reqDtFrom"
          height="30px"
          display-format="yyyy-MM-dd"
          :show-clear-button="true"
          @value-changed="
            (e) => {
              reqDtTo = e.value && getDateFormat(e.value)
            }
          "
        />
      </v-col>

      <v-col cols="6" md="2" sm="12" class="pa-0">
        <v-text-field
          :value="idSearch"
          label="발주번호"
          dense
          outlined
          hide-details="auto"
          :prepend-inner-icon="$t('$search')"
          @change="changeInput"
          clearable
        />
      </v-col>
      <v-spacer class="pa-0"></v-spacer>
      <v-col cols="12" md="1" class="pa-0">
        <v-btn outlined color="btn_bg" @click="doSearchPopup()">
          <v-icon style="margin-left: 4px">search</v-icon>
          <span style="margin-right: 8px">조회</span>
        </v-btn>
      </v-col>
    </v-row>

    <DxDataGrid
      :ref="PopDataGridRef"
      :data-source="matListDetail"
      width="1400px"
      :height="300"
      :hover-state-enabled="true"
      :editing="{ allowUpdating: false }"
      :selection="{ mode: 'single', deferred: false }"
      :filter-row="{ visible: true }"
      :paging="{ pageSize: 5 }"
      :pager="{ allowedPageSizes: [5, 'all'], showInfo: true }"
      @selection-changed="(e) => onSelectionChanged(e)"
      :column-hiding-enabled="false"
      key-expr="id"
      class="sec_grid"
    >
      <DxColumn data-field="poNo" caption="발주 번호" width="180px" alignment="left" />
      <DxColumn data-field="poSeq" caption="발주 순번" width="80px" alignment="center" />
      <DxColumn data-field="partnerId" caption="부품업체명" width="80px" alignment="center">
        <DxLookup :data-source="partnerIdLookUp" value-expr="code" display-expr="desc" />
      </DxColumn>
      <DxColumn data-field="mainClass" caption="품목 대분류" width="80px" alignment="left" />
      <DxColumn data-field="middleClass" caption="품목 중분류" width="200px" alignment="left" />
      <DxColumn
        data-field="matCd"
        caption="품목"
        width="300px"
        alignment="left"
        :calculate-display-value="
          (e) => {
            let item = e.matCd && matList.find((el) => el.matCd == e.matCd)
            return item && item.matNm
          }
        "
        :calculate-filter-expression="lookupColumnFilterExpression"
      />

      <DxColumn data-field="qty" caption="요청수량" format="#,##0" data-type="number" width="80px" alignment="right" />
      <DxColumn data-field="arrivalQty" caption="입고수량" format="#,##0" data-type="number" width="80px" alignment="right" />
      <DxColumn data-field="sumQty" caption="진행중 수량" format="#,##0" width="80px" data-type="number" alignment="right" />

      <DxColumn data-field="remainQty" caption="남은 수량" data-type="number" width="80px" alignment="right" />

      <DxColumn data-field="remark" caption="비고" alignment="left" />
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
  name: 'InvoiceManagePopUpM',
  mixins: [baseview, BaseDataGrid],
  components: {
    DxPopup,
    DxDataGrid,
    DxLookup,
    DxColumn,
    DxDateBox,
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
      ChoseData: [],
    }
  },

  beforeUpdate() {},

  watch: {
    MPopOpen: function () {
      this.gridInstancePop().clearSelection()
      this.gridInstancePop().option('focusedRowIndex', -1)
    },
  },

  beforeMount() {
    Promise.all([getComboPartnerId(), getComboStdMatManage()])
      .then((res) => {
        this.partnerIdLookUp = res[0].listResponse.list.slice()
        this.matlistpopup = res[1].listResponse.list.slice()
        this.matList = res[1].listResponse.list.slice()
      })
      .catch((error) => {})
  },

  computed: {},
  methods: {
    gridInstancePop() {
      return this.GetDataGrid(this.PopDataGridRef)
    },
    async doSearchPopup() {
      let cnt = 0
      let params = {
        invoiceId: this.focusedRowData.invoiceId,
        poNo: this.idSearch,
        partnerId: this.focusedRowData.partnerId,
        seq: '',
        reqDtFrom: this.reqDtFrom,
        reqDtTo: this.reqDtTo,
      }
      if (params.reqDtFrom == null || params.reqDtTo == null) {
        params.reqDtTo = getPreMonth(-2)
        params.reqDtFrom = getPreMonth(2)
      }
      if (params.poNo == null) {
        params.poNo = ''
      }
      if (params.partnerId == null || params.partnerId == undefined) {
        params.partnerId = this.focusedRowData.partnerId
      }
      let res = await getInvoiceDetailMatCd(params)
      res.listResponse.list.map((x) => (x.id = cnt++))
      this.matListDetail = res.listResponse.list
    },

    onSelectionChanged(e) {
      this.ChoseData = e.selectedRowsData
    },
    changeInput(value) {
      this.idSearch = value
    },

    onChose() {
      this.$emit('AddSelectedRowsData', this.ChoseData)
    },

    onHidden(e) {
      this.$emit('close')
    },
  },
}
</script>