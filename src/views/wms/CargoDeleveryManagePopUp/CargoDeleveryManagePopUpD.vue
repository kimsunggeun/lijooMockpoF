<template>
  <DxPopup
    :dragEnabled="true"
    :visible="DPopOpen"
    title="배송담당자 선택"
    :show-close-button="true"
    :show-title="true"
    :width="600"
    :height="400"
    @hidden="onHidden"
  >
    <DxDataGrid
      :ref="dropDownDataGridRefdriver"
      :data-source="driver"
      :height="300"
      :hover-state-enabled="true"
      :editing="{ allowUpdating: false }"
      :selection="{ mode: 'single', deferred: false }"
      :filter-row="{ visible: true }"
      :paging="{ pageSize: 5 }"
      :pager="{ allowedPageSizes: [5, 'all'], showInfo: true }"
      :column-hiding-enabled="false"
      key-expr="id"
      @selection-changed="(e) => driveronSelectionChanged(e)"
      :on-initialized="() => null"
      :on-content-ready="() => null"
      class="sec_grid"
    >
      <DxColumn data-field="transNo" caption="차량 번호" alignment="center" />
      <DxColumn data-field="korNm" caption="배송 담당자" alignment="center" />
      <DxColumn data-field="hpNo" caption="배송 담당자 전화번호" alignment="center" />
    </DxDataGrid>
  </DxPopup>
</template>

<script>
import baseview from '@/components/base/baseview'
import { DxPopup } from 'devextreme-vue/popup'
import { DxDataGrid, DxColumn, DxLookup } from 'devextreme-vue/data-grid'
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

export default {
  name: 'CargoDeleveryManagePopUpD',
  mixins: [baseview, BaseDataGrid],
  components: {
    DxPopup,
    DxDataGrid,
    DxColumn,
  },
  props: {
    DPopOpen: Boolean,
    driverDetail: Array,
  },
  data() {
    return {
      dropDownDataGridRefdriver: 'dropDownBoxDatadriver',
      driver: [],
    }
  },

  beforeUpdate() {
    this.driver = this.driverDetail
  },

  computed: {
    gridInstance() {
      return this.GetDataGrid(this.dropDownDataGridRefdriver)
    },
  },
  methods: {
    open() {
      this.gridInstance.clearSelection()
    },
    driveronSelectionChanged(e) {
      this.$emit('insDataD', e.selectedRowsData)
      this.onHidden()
    },

    onHidden(e) {
      this.$emit('close')
    },
  },
}
</script>

