<template>
  <table>
    <tbody>
      <tr>
        <td :colspan="datasource.children && datasource.children.length ? datasource.children.length * 2 : null">
          <!-- <div class="node" :id="datasource.id" @click.stop="handleClick(datasource)"> -->
          <div class="node" :id="datasource.id">
            <slot :node-data="datasource">
              <div>
                <v-menu top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon small dark v-bind="attrs" v-on="on">
                      <v-icon color="menu_bg">$menu</v-icon>
                    </v-btn>
                  </template>
                  <v-list flat>
                    <v-btn depressed rounded text class="px-3" color="menu_bg" @click="createNode(datasource)">
                      <v-icon small class="pl-2 pr-2" color="menu_bg">$pencil</v-icon>생성
                    </v-btn>
                    <v-divider class="my-1"></v-divider>

                    <v-btn depressed rounded text class="px-3" color="menu_bg" @click="deleteNode(datasource)">
                      <v-icon small class="pl-2 " color="menu_bg">$delete</v-icon> 삭제
                    </v-btn>
                  </v-list>
                </v-menu>
              </div>
              <div class="title">
                <i class="fa fa-users symbol"></i>
                <!-- {{ dispNodeInfo.riskAssRoleNm }} -->
                {{ dispRiskAssRoleNm }}
                {{ datasource.riskAssRoleNm }}
              </div>
              <div class="row">
                <div class="column_title position_title">직위</div>
                <div class="column position">
                  <!-- {{ dispNodeInfo.jbrpNm }} -->
                  {{ dispjbrpNm }}
                  {{ datasource.jbrpNm }}
                  <!-- {{ datasource.korNm }} -->
                  <!-- <v-overflow-btn :items="positions" editable label="직위선택" hide-details dense class="pa-0" overflow></v-overflow-btn> -->
                </div>
                <div class="column_title content_title">이름</div>
                <div class="column content">
                  <v-overflow-btn
                    :items="getDatasource.items"
                    item-text="korNm"
                    item-value="esgHrNo"
                    @change="changeSelectionData(true)"
                    v-model="selectedId"
                    label="이름지정"
                    editable
                    hide-details
                    dense
                    class="pa-0"
                    overflow
                  >
                  </v-overflow-btn>
                </div>
              </div>
            </slot>
          </div>
        </td>
      </tr>
      <template v-if="datasource.children && datasource.children.length">
        <tr class="lines">
          <td :colspan="datasource.children.length * 2">
            <div class="downLine"></div>
          </td>
        </tr>
        <tr class="lines">
          <td class="rightLine"></td>
          <template v-for="n in datasource.children.length - 1">
            <td class="leftLine topLine"></td>
            <td class="rightLine topLine"></td>
          </template>
          <td class="leftLine"></td>
        </tr>
        <tr class="nodes">
          <td colspan="2" v-for="child in datasource.children" :key="child.id">
            <!-- <node :datasource="child" :handle-click="handleClick"> -->
            <node :datasource="child">
              <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
                <slot :name="slot" v-bind="scope" />
              </template>
            </node>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'node',
  props: {
    datasource: Object

    // handleClick: Function
  },
  mounted() {
  },
  data() {
    return {
      selectedId: this.datasource.esgHrNo,
      txtRiskAssRoleNm: '',
      txtjbrpNm: ''
    }
  },
  computed: {
    dispNodeInfo() {
      if (this.selectedId == -1 || this.selectedId == undefined) return

      if (this.datasource.items) {
        this.datasource.items.forEach(x => {
          if (x.esgHrNo == this.selectedId) {
            return x
          }
        })
      }
      return { riskAssRoleNm: '역할 : unknown', jbrpNm: 'unknown' }
    },
    dispRiskAssRoleNm() {
      return this.datasource.riskAssRoleNm
    },
    dispjbrpNm() {
      return this.datasource.jbrpNm
    },
    getDatasource() {
      this.updateData()
      return this.datasource
    }
  },

  methods: {
    changeSelectionData(bChangeParentId) {
      this.updateData()
      this.$EventBus.$emit('selectionChange', { children: this.datasource.children, selHrNo: this.selectedId, bChangeParentId: bChangeParentId })
    },
    updateData() {
      if (this.datasource.items != undefined) {
        let selectedEmp = this.datasource.items.filter(x => x.esgHrNo == this.selectedId).map(x => x)
        if (selectedEmp != undefined && selectedEmp.length > 0) {
          this.datasource.compId = selectedEmp[0].compId
          this.datasource.orgnOrder = selectedEmp[0].orgnOrder
          this.datasource.esgHrNo = selectedEmp[0].esgHrNo
          this.datasource.korNm = selectedEmp[0].korNm
          this.datasource.jbrp = selectedEmp[0].jbrp
          this.datasource.jbrpNm = selectedEmp[0].jbrpNm
          this.datasource.riskAssRole = selectedEmp[0].riskAssRole
          this.datasource.riskAssRoleNm = selectedEmp[0].riskAssRoleNm
        }
      }
    },

    createNode(node) {
      this.$EventBus.$emit('createNode', node)
    },
    deleteNode(node) {
      this.$EventBus.$emit('deleteNode', node)
    }
  }
}
</script>

<style scoped>
.btn_empty {
  color: #f72c08 !important;
}

::v-deep .roleSelected .v-select__selection {
  font-size: 11px;
  margin-left: 5px;
}

::v-deep .roleSelected .v-label {
  font-size: 11px;
  /* line-height: 12px;
  top: 0px; */
  margin-left: 5px;
}

::v-deep .roleSelected .v-select-select option {
  padding: 4px;
  line-height: 24px;
  height: 24px;
  font-family: Tahoma;
  font-size: 11px;
  color: #003399;
}
</style>
