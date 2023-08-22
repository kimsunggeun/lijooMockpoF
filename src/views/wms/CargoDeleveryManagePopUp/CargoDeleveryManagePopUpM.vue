<template>
  <DxPopup
    :dragEnabled="true"
    :visible="MPopOpen"
    title="품목 선택"
    :show-close-button="true"
    :show-title="true"
    width="1300"
    height="450"
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
          label="출하의뢰 ID"
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
        <v-btn outlined color="btn_bg" @click="btnDropSearch()">
          <v-icon style="margin-left: 4px">search</v-icon>
          <span style="margin-right: 8px">조회</span>
        </v-btn>
      </v-col>
    </v-row>

    <DxDataGrid
      :data-source="gridMatDropPop"
      :filter-row="{ visible: true }"
      :ref="PopDataGridRef"
      :hover-state-enabled="true"
      :focused-row-enabled="true"
      :editing="{ allowUpdating: false }"
      :selection="{ mode: 'single', deferred: false }"
      :paging="{ pageSize: 5 }"
      :pager="{ allowedPageSizes: [5, 'all'], showInfo: false }"
      height="250px"
      :column-hiding-enabled="false"
      key-expr="id"
      @selection-changed="(e) => onSelectionChanged(e)"
      :on-initialized="() => null"
      :on-content-ready="() => null"
      class="sec_grid"
    >
      <DxColumn data-field="partnerId" caption="파트너" data-type="string" alignment="left" :visible="false" />
      <DxColumn data-field="orderId" caption="출하의뢰 ID" width="150px" data-type="string" alignment="center" />
      <DxColumn data-field="seq" caption="순번" width="95px" data-type="number" alignment="right" />
      <DxColumn data-field="mainClass" caption="품목 대분류" width="120px" data-type="string" alignment="left" />
      <DxColumn data-field="middleClass" caption="품목 중분류" width="250px" data-type="string" alignment="left" />
      <DxColumn
        data-field="matCd"
        caption="품목명"
        width="350px"
        data-type="string"
        alignment="left"
        :calculate-display-value="
          (e) => {
            let item = e.matCd && matList.find((el) => el.matCd == e.matCd)
            return item && item.matNm
          }
        "
        :calculate-filter-expression="lookupColumnFilterExpression"
      />
      <DxColumn data-field="qty" caption="요청 수량" data-type="number" format="#,##0" alignment="right" />
      <DxColumn data-field="deliveryQty" caption="공급 수량" data-type="number" format="#,##0" alignment="right" />
      <DxColumn data-field="remaining" caption="남은 수량" data-type="number" format="#,##0" alignment="right" />
      <DxColumn data-field="remark" caption="비고" data-type="string" alignment="left" />
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

import { getComboStdMatManage } from '@/api/kier/standard/matManage'
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getComboPartnerId, getWmsCargoDeleveryManageDetailPopup } from '@/api/kier/wms/cargoDeleveryManage'

import DxDateBox from 'devextreme-vue/date-box'
export default {
  name: 'CargoDeleveryManagePopUpM',
  mixins: [baseview, BaseDataGrid],
  components: {
    DxPopup,
    DxDataGrid,

    DxColumn,
    DxDateBox,
  },
  props: {
    MPopOpen: Boolean,
    gridMatDrop: [Object, Array],
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
      gridMatDropPop: [],
      ChoseData: [],
    }
  },

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
    btnDropSearch() {
      if (this.idSearch == null || this.idSearch == '' || this.idSearch == undefined) {
        this.vToastify('출하의뢰 ID 를 입력해 주세요', 'warn')
        return
      }
      let params = {
        orderId: this.idSearch,
        reqDtFrom: this.reqDtFrom,
        reqDtTo: this.reqDtTo,
      }

      this.openLoading('searching')
      getWmsCargoDeleveryManageDetailPopup(params, false)
        .then((res) => {
          this.gridMatDropPop = res.listResponse.list
        })
        .finally(() => {
          this.endLoading()
        })
    },

    onPopSeach() {
      this.gridMatDropPop = this.gridMatDrop.filter((e) => e.partnerId == this.focusedRowData.partnerId)
    },

    onSelectionChanged(e) {
      if (e.selectedRowsData.length != 0) {
        this.ChoseData = e.selectedRowsData
      }
    },
    changeInput(value) {
      this.idSearch = value
    },

    onChose() {
      this.$emit('AddSelectedRowsData', this.ChoseData)
    },
    onHidden() {
      this.$emit('close')
    },
  },
}
</script>

