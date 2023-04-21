<template>
  <div>
    <!--the appropriate input should go here-->
    <!-- 베이스 다이아그램  BY LYJ -->
  </div>
</template>
<script>
// ////common component
import iCardTop from '@/components/common/iCardTop.vue'
import iPageTitle from '@/components/common/iPageTitle.vue'
import iCardVertical from '@/components/common/iCardVertical.vue'
import {
  DxDiagram,
  DxNodes,
  DxEdges,
  DxAutoLayout,
  DxCustomShape,
  DxContextToolbox,
  DxPropertiesPanel,
  DxGroup,
  DxTab,
  DxToolbox,
  DxContextMenu
} from 'devextreme-vue/diagram'
import CustomShapeTemplate from '@/components/organization/CustomShapeTemplate.vue'
import CustomShapeToolboxTemplate from '@/components/organization/CustomShapeToolboxTemplate.vue'

export default {
  name: 'BaseDiagram',
  components: {
    //
    //
    'i-card-top': iCardTop,
    'i-page-title': iPageTitle,
    'i-card-vertical': iCardVertical,
    //
    DxDiagram,
    DxNodes,
    DxEdges,
    DxAutoLayout,
    DxCustomShape,
    DxContextToolbox,
    DxPropertiesPanel,
    DxGroup,
    DxTab,
    DxToolbox,
    DxContextMenu
  },
  data() {
    return {
      diagramRfs: []
    }
  },
  computed: {
    Diagrams: function() {
      var instances = []
      this.diagramRfs.forEach(ref => {
        instances.push(this.$refs[ref].instance)
      })
      //return this.$refs[this.dxDataGridRef].instance
      return instances
    }
  }
}
</script>
