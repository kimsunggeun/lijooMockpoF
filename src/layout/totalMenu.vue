<template>
  <v-list dense nav class="textA">
    <template v-for="(item, index) in menuList">
      <default-list-group v-if="item.subMenu" :key="`group-${index}`" :item="item" @towDepthMenuClick="towDepthMenuClick(item, $event)" />
      <default-list-item v-else :key="`item-${index}`" :item="item" @towDepthMenuClick="towDepthMenuClick(item, $event)" />
    </template>
  </v-list>
</template>
<script>
import DefaultListItem from '@/layout/navbar/ListItem' // 단일 메뉴
import DefaultListGroup from '@/layout/navbar/ListGroup' // 그룹 메뉴

export default {
  name: 'totalMenu',
  props: {
    menuList: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: { DefaultListItem, DefaultListGroup },
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
.textA > div {
  text-align: left;
}
</style>
