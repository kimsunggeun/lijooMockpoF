<template>
  <span v-if="searchPanel" class="ml-1">
    <v-row class="align-center">
      <v-btn-toggle multiple dense color="primary">
        <v-btn class="i-search-panel-button" @click="filterIconClick">
          <svg-icon icon-class="filter_line" />
        </v-btn>
      </v-btn-toggle>

      <v-btn-toggle multiple dense color="primary">
        <v-btn class="i-search-panel-button search_grid" @click="findIconClick">
          <svg-icon icon-class="search_grid" />
        </v-btn>
      </v-btn-toggle>

      <!-- <transition name="fade"> -->
      <v-text-field
        v-if="isFindOpen"
        ref="txtFindRef"
        label="search"
        class="i-search-panel-text-field rounded-2"
        outlined
        dense
        hide-details="auto"
        clearable
        @change="changeInput"
      />
      <!-- </transition> -->
    </v-row>
  </span>
</template>
<script>
import Baseview from '@/components/base/baseview.vue'

export default {
  extends: Baseview,
  name: 'iSearchPanel',
  props: {
    searchPanel: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      isFindOpen: false
    }
  },
  methods: {
    filterIconClick() {
      this.baseFilterIconClick()
    },
    findIconClick() {
      this.isFindOpen = !this.isFindOpen
      this.baseFindIconClick('')
    },
    changeInput(value) {
      this.baseFindIconClick(value)
    }
  }
}
</script>
<style lang="scss" scoped>
.i-search-panel-button {
  background-color: transparent !important;
}

.i-search-panel-text-field {
  width: 180px;
  position: relative;
  left: -1px;
}
.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn {
  border: none !important;
  color: #214885 !important;
  // background: #e1e7f2 !important;
  // border: 1px solid #9e9e9e !important;
  border-radius: 0 !important;
}

.v-btn .v-item--active {
  background: red !important;
}

.v-btn-toggle .v-btn.v-btn.v-size--default {
  min-width: 24px;
  min-height: 30px;
}

.v-btn:not(.v-btn--round).v-size--default {
  width: 24px;
  height: 30px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.svg-icon {
  height: 1.05rem !important;
}
</style>
