<template>
  <v-list-group color="primary">
    <v-icon slot="appendIcon" color="nav_title">$arrow_d</v-icon>
    <template v-slot:activator>
      <v-list-item-title class="pl-3"> {{ $t(item.menuNm) }}</v-list-item-title>
    </template>

    <template v-for="(child, index) in item.subMenu">
      <default-list-group v-if="child.subMenu" :key="`sub-group-${index}`" :item="child" />
      <default-list-item v-else :key="`child-${index}`" :item="child" @towDepthMenuClick="towDepthMenuClick(item, $event)" />
    </template>
  </v-list-group>
</template>

<script>
import DefaultListGroup from './ListGroup'
import DefaultListItem from './ListItem'
export default {
  name: 'DefaultListGroup',
  components: {
    DefaultListItem,
    DefaultListGroup
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
  },
  methods: {
    towDepthMenuClick(item, to) {
      this.$emit('towDepthMenuClick', { topIndex: item.topIndex, currentId: to.currentId, zeroLevelId: to.zeroLevelId })
    }
  }
}
</script>
