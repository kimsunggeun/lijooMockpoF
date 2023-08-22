<template>
  <DxPopup
    :dragEnabled="true"
    :visible="MPopOpen"
    title="비밀번호 설정"
    :show-close-button="true"
    :show-title="true"
    width="400"
    height="auto"
    @hidden="onHidden"
  >
    <v-row style="padding-bottom: 16px">
      <v-col cols="12"><v-text-field label="변경할 직원 ID" v-model="id" disabled /></v-col>

      <v-col cols="12"><v-text-field label="변경후 비밀번호" v-model="changePassWord" /></v-col>
    </v-row>
    <v-divider />
    <v-row style="padding-top: 16px">
      <v-spacer />
      <v-spacer />
      <v-col cols="2.5">
        <v-btn outlined @click="onChose(changePassWord)" width="100%">
          <v-icon>done</v-icon>
          변경
        </v-btn>
      </v-col>

      <v-col cols="2.5">
        <v-btn outlined @click="onHidden()" width="100%">
          <v-icon>close</v-icon>
          취소
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
import { changePwStdPartnerEmployee } from '@/api/kier/standard/partnerEmployeeManage'

import { getComboStdMatManage } from '@/api/kier/standard/matManage'
import { getDateFormat, getCurrentDate, getPreMonth } from '@/utils/common.js'
import { getComboPartnerId, getWmsCargoDeleveryManageDetailPopup } from '@/api/kier/wms/cargoDeleveryManage'

import DxDateBox from 'devextreme-vue/date-box'
export default {
  name: 'CargoDeleveryManagePopUpM',
  mixins: [baseview, BaseDataGrid],
  components: {
    DxPopup,
  },
  props: {
    MPopOpen: Boolean,
    rowData: [Object, Array],
  },
  data() {
    return {
      id: '',

      changePassWord: '',
      matListDetail: [],
      reqDtTo: getPreMonth(-2),
      reqDtFrom: getPreMonth(2),
      idSearch: '',
      partnerIdLookUp: [],
      matlistpopup: [],
      gridMatDropPop: [],
    }
  },

  beforeUpdate() {
    this.id = this.rowData.employeeId != null ? this.rowData.employeeId : '설정오류'
  },

  beforeMount() {},

  computed: {},
  methods: {
    onChose(e) {
      let params = {
        employeeId: this.rowData.employeeId,
        userPs: e,
      }
      changePwStdPartnerEmployee(params).then((res) => {
        this.changePassWord = ''
        this.$emit('change', e)
      })
    },
    onHidden(e) {
      this.$emit('close')
    },
  },
}
</script>

