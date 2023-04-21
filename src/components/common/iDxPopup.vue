<template>
  <!-- 20220527 Created by LYJ COMMON POPUP COMPONENT USING <DXPOPUP> -->
  <DxPopup
    :width="width"
    :height="height"
    :visible="popupVisible"
    :show-title="useTitle"
    :close-on-outside-click="closeOnOutsideClick"
    :drag-enabled="enableDrag"
    :show-close-button="true"
    container=".dx-viewport"
    :title="title"
  >
    <template #content>
      <DxScrollView width="100%" height="100%">
        <!-- <img src="images/Popup-Scrolling-Image.jpg" /> -->
        <div id="textBlock"><slot name="content"></slot></div>
        <div id="gridBolck"><slot name="grid"></slot></div>
        <div id="imageBlock"><slot name="image"></slot></div>
      </DxScrollView>
    </template>
  </DxPopup>
</template>
<script>
import { DxPopup } from 'devextreme-vue/popup'
import { DxScrollView } from 'devextreme-vue/scroll-view'


export default {
  name: 'i-dxpopup',
  components: {
    DxPopup,
    DxScrollView
  },
  props: {
    popupVisible: {
      type: Boolean,
      default: () => false
    },
    width: {
      type: String,
      default: () => '550'
    },
    height: {
      type: String,
      default: () => '350'
    },
    useTitle: {
      type: Boolean,
      default: () => true
    },
    title: { type: String, default: () => 'title...' },
    enableDrag: { type: Boolean, default: () => true },
    vHtmlContent: {
      type: String,
      default: () => 'input popup content'
    }
  },
  data() {
    return {}
  },
  methods: {
    closeOnOutsideClick(e) {
      // console.log(e.target.className)
      if (
        e.target.className == 'dx-overlay-wrapper dx-popup-wrapper dx-overlay-shader' ||
        e.target.className == 'dx-icon dx-icon-close' ||
        e.target.className == 'dx-button-content'
      )
        this.$emit('popupCloseButtonClick', e)
    }
  }
}
</script>
<style lang="scss" scoped>
#textBlock {
  // padding-left: 20px;
  // padding-right: 20px;
  line-height: 1.6em;
}

#gridBolck {
  line-height: 2em;
  font-weight: bold;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  width: 300px;
}
</style>
