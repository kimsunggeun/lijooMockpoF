// import envs from '@/envs'
// import _ from 'lodash'

// var target = _.find(envs.framework.template.pcThemes, { id: envs.framework.template.pc })

// Echart
import * as echarts from 'echarts/core'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/map'
// import 'echarts/lib/chart/radar'
// import 'echarts/lib/chart/scatter'
// import 'echarts/lib/chart/effectScatter'
// import 'echarts/lib/component/tooltip' // 툴팁을 표시하기 위해서 import
// import 'echarts/lib/component/toolbox' // toolbox 표시하기 위해서 import
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/geo'
// import 'echarts/lib/component/legend' // legend 표시하기 위해서 import
// import 'echarts/lib/component/title' // title 표시하기 위해서 import
// import 'echarts/lib/component/markLine'
// import 'echarts/lib/component/markPoint'
// import 'echarts/lib/component/dataZoom' // dataZoom 표시하기 위해서 import
// import 'echarts/lib/component/visualMap'
// import 'echarts/lib/component/dataset'
// import 'zrender/lib/svg/svg'
// import 'echarts-liquidfill/index'
// import 'echarts/extension/bmap/bmap'
// import 'echarts/map/js/world'
// import 'echarts-gl'

import { BarChart, LineChart, PieChart, MapChart, RadarChart, ScatterChart, EffectScatterChart, LinesChart } from 'echarts/charts'
import {
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent
} from 'echarts/components'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import 'echarts-liquidfill/index'
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  CanvasRenderer,
  SVGRenderer
])

// Map of China
import chinaMap from '@/assets/theme/echart/map/china.json'
import worldMap from '@/assets/theme/echart/map/world.json'

// default theme
import 'echarts/theme/azul'
import 'echarts/theme/bee-inspired'
import 'echarts/theme/blue'
import 'echarts/theme/caravan'
import 'echarts/theme/carp'
import 'echarts/theme/cool'
import 'echarts/theme/dark-blue'
import 'echarts/theme/dark-bold'
import 'echarts/theme/dark-digerati'
import 'echarts/theme/dark-fresh-cut'
import 'echarts/theme/dark-mushroom'
import 'echarts/theme/eduardo'
import 'echarts/theme/forest'
import 'echarts/theme/fresh-cut'
import 'echarts/theme/gray'
import 'echarts/theme/green'
import 'echarts/theme/helianthus'
import 'echarts/theme/infographic'
import 'echarts/theme/inspired'
import 'echarts/theme/jazz'
import 'echarts/theme/london'
import 'echarts/theme/macarons'
import 'echarts/theme/macarons2'
import 'echarts/theme/mint'
import 'echarts/theme/red'
import 'echarts/theme/red-velvet'
import 'echarts/theme/roma'
import 'echarts/theme/royal'
import 'echarts/theme/sakura'
import 'echarts/theme/shine'
import 'echarts/theme/tech-blue'
import 'echarts/theme/vintage'

const { registerMap, registerTheme } = echarts
// registering map data
registerMap('china', chinaMap)
registerMap('world', worldMap)

// custom theme
// registerTheme(target.echart, require('@/assets/theme/echart/' + 'themeA' + '.json'))
// registerTheme(target.echart, require('@/assets/theme/echart/' + 'themeB' + '.json'))
// registerTheme(target.echart, require('@/assets/theme/echart/' + 'themeC' + '.json'))

// registering theme, 수동 선택
registerTheme('light01', require('./json/light01.json'))
registerTheme('light02', require('./json/light02.json'))
registerTheme('light03', require('./json/light03.json'))
registerTheme('dark01', require('./json/dark01.json'))
registerTheme('dark02', require('./json/dark02.json'))
registerTheme('dark03', require('./json/dark03.json'))
registerTheme('dark04', require('./json/dark04.json'))
registerTheme('dark05', require('./json/dark05.json'))
registerTheme('dark06', require('./json/dark06.json'))
registerTheme('dark07', require('./json/dark07.json'))
registerTheme('dark08', require('./json/dark08.json'))
registerTheme('dark09', require('./json/dark09.json'))
registerTheme('dark10', require('./json/dark10.json'))
registerTheme('dark11', require('./json/dark11.json'))
registerTheme('dark12', require('./json/dark12.json'))
registerTheme('dark13', require('./json/dark13.json'))

// registering default theme (light & dark), Vuetify 테마와 연계 자동 선택
registerTheme('light', require('./json/light01.json'))
registerTheme('dark', require('./json/dark04.json'))

