<template>
  <div>
    <v-list dense nav expand outlined active-class="white--text" class="hidden-sm-and-down pa-0">
      <v-list-item class="pa-0">
        <v-list-item-content class="pa-0">
          <v-list-item-title align="center" class="side_title d-flex flex-column px-8 justify-start ma-0">
            <p class="font-weight-bold text-h6 d-inline-block text-left pt-7 pb-1 ma-0">{{ title }}</p>
            <div class="text-subtitle-2 pb-6 font-weight-bold text-left">
              <!-- {{ title }} -->
              <!-- english / explain -->
              {{ engTitle == null ? '' : engTitle }}
            </div>
          </v-list-item-title>
          <v-list-item-subtitle> </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <template v-for="(item, index) in subMenu">
        <default-list-group v-if="item.items" :key="`group-${index}`" :item="item" @towDepthMenuClick="towDepthMenuClick(item, $event)" />
        <default-list-item v-else :key="`item-${index}`" :item="item" @towDepthMenuClick="towDepthMenuClick(item, $event)"> </default-list-item>
      </template>
    </v-list>
  </div>
</template>
<script>
import DefaultListItem from '@/layout/navbar/ListItem' // 단일 메뉴
import DefaultListGroup from '@/layout/navbar/ListGroup' // 그룹 메뉴
// import { DxList } from 'devextreme-vue/list'

export default {
  name: 'pageInnerMenu',
  props: {
    subMenu: {
      type: Array,
      required: true,
      default: () => []
    },
    title: {
      type: String,
      required: true,
      default: () => ''
    },
    engTitle: {
      type: String,
      required: true,
      default: () => ''
    }
  },
  components: {
    //
    // DxList,
    DefaultListItem,
    DefaultListGroup
  },
  data() {
    return {}
  },
  mounted() {
  },
  computed: {},
  methods: {
    towDepthMenuClick(item, to) {
      this.$emit('towDepthMenuClick', { topIndex: item.topIndex, currentId: to.currentId, zeroLevelId: to.zeroLevelId })
    }
  },
  activated() {
  }
}
</script>

<style lang="scss" scoped>
.side_title {
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.997-.704-.707 10l.707.707L10.704.004l-.707-.708Z' fill='%23E2E2E2'/%3E%3C/svg%3E");
  background-repeat: repeat;
  border-top: 2px solid #214885;
  // background-color: #fafafa;
}
.text-subtitle-2 {
  color: #3b5e93;
  line-height: 1.2 !important;
}
</style>
