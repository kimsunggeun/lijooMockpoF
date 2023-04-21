<template>
  <svg class="template">
    <text x="50%" y="40%">New</text>
  </svg>
</template>

<script>
export default {
  props: {
    employees: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {},
  computed: {}
}
</script>

<style scopded lang="scss">
#diagram .template .template-name {
  // color: #000 !important;
  font-weight: bold;
  text-decoration: underline;
}

.dxdi-canvas .shape rect,
.dxdi-canvas .shape path,
.dxdi-canvas .shape line,
.dxdi-canvas .shape ellipse,
.dxdi-canvas .toolbox-item rect,
.dxdi-canvas .toolbox-item path,
.dxdi-canvas .toolbox-item line,
.dxdi-canvas .toolbox-item ellipse,
.dxdi-canvas .shape rect,
.dxdi-canvas .shape path,
.dxdi-canvas .shape line,
.dxdi-canvas .shape ellipse,
.dxdi-canvas .toolbox-item rect,
.dxdi-canvas .toolbox-item path,
.dxdi-canvas .toolbox-item line,
.dxdi-canvas .toolbox-item ellipse {
  stroke: inherit;
}
</style>
