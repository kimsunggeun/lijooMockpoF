<template>
  <v-list-item @click="moveTo(item)" :to="item.id" active-class="primary white--text">
    <!-- <v-list-item-icon>
      <v-icon color="nav_title">
        {{ item.icon }}
      </v-icon>
    </v-list-item-icon> -->
    <!-- 2022-03-21 lyj level 3까지 메뉴 처리 -->

    <v-list-item-title v-if="item.lvl <= 1" class="pl-0">
      <v-icon small class="pr-2" color="nav_title"> {{ item.icon }} </v-icon> {{ $t(item.menuNm) }}
    </v-list-item-title>
    <v-list-item-title v-else-if="item.lvl == 2" class="ml-2 ">
      <v-icon small class="pr-2" color="nav_title"> {{ item.icon }} </v-icon> {{ $t(item.menuNm) }}
    </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: 'DefaultListItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    moveTo(to) {
      this.$router.push(to.progCd)
      this.$emit('towDepthMenuClick', { topIndex: to.topIndex, currentId: to.id, zeroLevelId: to.zeroLevelId })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list-item .v-icon {
  color: inherit !important;
}
</style>
