<template>
  <v-card outlined fill-height class="overflow-hidden">
    <v-card-text class="pa-0 d-block">
      <slot name="body">
        {{}}
      </slot>
    </v-card-text>
    <i-button-list :useBtnList="useBtnList" @btnClick="clickButton" class="d-block py-2 pr-3 pl-1 pl-md-0 btn_list"  />
  </v-card>
</template>

<script>
import iButtonList from './iButtonList.vue'

export default {
  name: 'i-card-top',
  components: {
    iButtonList
  },
  props: {
    headerTitle: {
      type: String,
      default: '제목'
    },
    color: {
      type: String,
      default: 'card_bg'
    },
    divider: {
      type: Boolean,
      default: false
    },
    // 버튼 리스트
    useBtnList: {
      type: Array,
      default: () => ['']
    }
  },
  methods: {
    // 버튼 클릭 시 각 id별로 이벤트생성
    clickButton(targetButton) {
      this.$emit(targetButton.id, targetButton.role)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  // background: #ecedf3;
  background-color: #e1e7f2;
  margin-bottom: 22px;
}
</style>
