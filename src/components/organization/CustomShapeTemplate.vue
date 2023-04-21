<template>
  <svg class="template" style="position:relative;">
    <rect width="100%" height="100%" :style="getDelStyle" />

    <rect x="1%" y="1%" width="98%" height="30%" rx="0" :style="getDelStyleIcon" />
    <text class="template-name person_role" x="50%" y="22%" fill="white">
      {{ employeeInfo ? employeeInfo.riskAssRoleNm : '' }}
    </text>
    <text
      class="template-name person_name"
      x="55%"
      y="58%"
      :class="employeeInfo && employeeInfo.hrDelYn == 'Y' ? 'template-title-delete' : 'template-title'"
    >
      {{ employeeInfo ? employeeInfo.korNm : '' }}
      <tspan>{{ employeeInfo ? employeeInfo.jbrpNm : '' }}</tspan>
    </text>

    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" x="9%" y="40%">
      <circle cx="11.181" cy="11.773" r="11.072" :style="getDelStyleIcon" />
      <path
        :style="getStyleIcon"
        d="M11.181 4.837a3.001 3.001 0 1 0 0 6.002 3.001 3.001 0 0 0 0-6.002ZM7.98 12.44a3.001 3.001 0 0 0-3.001 3v.952a1.23 1.23 0 0 0 1.031 1.214c3.425.559 6.917.559 10.342 0a1.23 1.23 0 0 0 1.032-1.214v-.951a3.001 3.001 0 0 0-3.002-3.001h-.272c-.148 0-.295.023-.435.069l-.693.226a5.801 5.801 0 0 1-3.602 0l-.693-.226a1.401 1.401 0 0 0-.434-.07H7.98Z"
        fill="#fff"
      />

      <path
        :style="getDelStyleIcon2"
        d="M8.007 8.045a2.867 2.867 0 1 1 5.735 0 2.867 2.867 0 0 1-5.735 0ZM4.948 15.31a2.867 2.867 0 0 1 2.868-2.868h.26c.141 0 .282.022.416.066l.661.216c.736.24 1.508.322 2.27.247a.168.168 0 0 1 .17.229 4.575 4.575 0 0 0-.336 1.727c0 .958.293 1.847.795 2.582.07.103.002.247-.122.251a30.667 30.667 0 0 1-5.996-.382 1.175 1.175 0 0 1-.986-1.16v-.909Z"
        fill="#fff"
      />
      <path
        :style="getDelStyleIcon2"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.403 14.927a3.425 3.425 0 0 0 1.448 2.805 3.44 3.44 0 1 0-1.447-2.805Zm3.441 2.294c-.425 0-.823-.116-1.165-.318l3.142-3.141a2.294 2.294 0 0 1-1.976 3.46Zm-1.976-1.129 3.142-3.141a2.294 2.294 0 0 0-3.142 3.142Z"
        fill="#fff"
      />
    </svg>

    <text class="template-name" x="18%" y="86%">사번</text>
    <text class="template-title" x="58%" y="86%">
      {{ employeeInfo ? employeeInfo.sabun : '' }}
    </text>
    <!-- 
    <rect x="1%" y="79%" width="99%" height="1px" fill="black" fill-opacity="0.8" rx="0" :style="getDelStyleIcon" />
    <text class="template-button" x="50%" y="91%" @click="deleteEmployeeFunc">
      삭제
    </text> -->
  </svg>
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      required: true,
      default: () => ({})
    },
    riskHr: {
      type: Array,
      required: true,
      default: () => []
    }
    // editEmployee: {
    //   type: Function,
    //   required: true,
    //   default: () => {}
    // },
    // deleteEmployee: {
    //   type: Function,
    //   required: true,
    //   default: () => {}
    // }
  },
  data() {
    return {}
  },
  computed: {
    employeeInfo() {
      let hr = this.riskHr.find(x => x.esgHrNo == this.employee.esgHrNo)
      return hr
    },

    getDelStyle() {
      // if (this.employee && this.employee.hrDelYn == 'Y') {
      //   return 'stroke:#FF0000;stroke-width:1'
      // } else
      return this.employeeInfo && this.employeeInfo.hrDelYn == 'Y' ? ' stroke:#F21B1B;stroke-width:4' : 'stroke:#686868;stroke-width:4'
    },
    getDelStyleIcon() {
      return this.employeeInfo && this.employeeInfo.hrDelYn == 'Y' ? ' fill:#F21B1B;fill-opacity:0.8 ' : 'fill:#686868;fill-opacity:0.4 '
    },
    getStyleIcon() {
      return this.employeeInfo && this.employeeInfo.hrDelYn == 'Y' ? ' display: none; ' : 'display: block; '
    },
    getDelStyleIcon2() {
      return this.employeeInfo && this.employeeInfo.hrDelYn == 'Y' ? ' display: block; ' : 'display: none; '
    }
  },
  methods: {
    editEmployeeFunc() {
      this.editEmployee(this.employee)
    },
    deleteEmployeeFunc() {
      this.deleteEmployee(this.employee)
    }
  }
}
</script>

<style lang="scss" scoped>
#diagram .template .template-title {
  font-style: normal;
}

#diagram .template .template-name {
  font-weight: bold;
  text-decoration: none;
  fill: #333;
}

#diagram .template .template-title {
  // font-style: italic;
  font-weight: bold;
  fill: #333;
}

#diagram .template .template-button {
  cursor: pointer;
  font-size: 8pt;
  font-weight: bold;
  fill: navy;
}

#diagram .template .template-button:hover {
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
  // fill: inherit !important;
  stroke: inherit;
  // stroke: none
}

.dxdi-canvas .shape text,
.dxdi-canvas .toolbox-item text {
  fill: #fff;
}

.person_name {
  font-size: 1.1rem;
  fill: #333 !important;
  // transform: translate(-50%);
  tspan {
    font-size: 0.8rem;
  }
}

#diagram .template .template-title-delete {
  // font-style: italic;
  font-weight: bold;
  fill: #a06b6b !important;
  text-decoration: line-through !important;
}

.person_role {
  font-size: 1rem;
}
</style>
