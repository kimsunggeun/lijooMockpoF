<template>
  <v-btn
    class="rounded-0"
    outlined
    :color="backgrounColor"
    :style="`height: ${height};`"
    :fontWeight="fontWeight"
    :height="height"
    :max-height="height"
    :min-height="height"
    :disabled="disabled"
    @click="click"
  >
    <v-icon v-if="iconPre === true" class="float-left" :size="iconSize" :color="fontColor"> ${{ icon }} </v-icon>

    <div class="float-center mx-1" :style="computedFontStyle">
      {{ text }}
    </div>

    <v-icon v-if="iconOnly === true" class="mr-2" :size="iconSize" :color="fontColor">
      {{ icon }}
    </v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'i-button',

  props: {
    //버튼 배경 색상
    backgrounColor: { type: String, default: 'btn_bg' },
    //버튼 내 문자열
    text: {
      type: String,
      default: () => {
        return ''
      }
    },

    //버튼 내 문자열 색상
    fontColor: { default: '#000' },

    //버튼 내 문자열 두께
    fontWeight: { type: String, default: 'bold' },

    //버튼 테두리 색상
    borderColor: { type: String },

    //버튼 너비 값
    // width: {
    //   type: String,
    //   default: function() {
    //     return '80px'
    //   }
    // },

    //버튼 높이 값
    height: {
      type: String,
      default: function() {
        return '30px'
      }
    },

    //문자열 폰트 크기
    fontSize: { default: '13px' },

    //문자열 disabled 처리
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },

    //icon
    icon: {
      type: String,
      default: function() {
        return ''
      }
    },

    //아이콘 삽입
    iconPre: {
      type: Boolean,
      default: () => {
        return false
      }
    },

    //아이콘만 표기
    iconOnly: {
      type: Boolean,
      default: () => {
        return false
      }
    },

    //아이콘 크기
    iconSize: { type: String }
  },

  computed: {
    computedFontStyle() {
      let fontColor = this.fontColor
      if (this.disabled) {
        fontColor = 'content'
      }
      return {
        color: '#000',
        'font-size': this.fontSize + 'px',
        'letter-spacing': '0.5px',
        'font-weight': this.fontWeight,
        'line-height': 1.8
      }
    }
  },

  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
.v-btn {
  background: #ffffff;
}

.v-btn.v-size--default {
  font-size: 13px;
}

.v-icon.v-icon {
  font-size: 20px;
  padding-right: 4px;
  padding-top: 3px;
}
</style>
