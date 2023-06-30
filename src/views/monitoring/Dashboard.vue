<template>
  <v-container class="pa-0">
    <v-row
      no-gutters
      style="background-color: #131419"
      :class="{
        'normal-screen': !$store.state.app.isScreenFull,
        'full-screen': $store.state.app.isScreenFull
      }"
    >
      <v-col cols="auto" style="background-color: #131419; height:100%; width:23%">
        <v-sheet dark color="transparent" height="8%">
          <v-container fluid fill-height>
            <span class="text-h5">KIER</span>
            <v-spacer />
            <span class="text-h5">{{ currentDate }}</span>
          </v-container>
        </v-sheet>
        <v-sheet dark color="transparent" class="communicationStatusHeight">
          <v-container fill-height class="text-body-2">
            <span class="text-dash-1">통신상태</span>
            <v-card class="rounded-card" color="#222631" height="60%" width="100%">
              <v-container fluid fill-height>
                <v-row align="center">
                  <span>Miniload</span>
                  <v-spacer></v-spacer>
                  <span v-if="scRealJob.sigStatus == 'SIG-1'" style="color: #31CE9A;">양호</span>
                  <span v-if="scRealJob.sigStatus == 'SIG-2'" style="color: #0177FB;">약함</span>
                  <span v-if="scRealJob.sigStatus == 'SIG-3'" style="color: #FF852E;">불량</span>
                  <v-card
                    v-if="$vuetify.breakpoint.width > 1500 || scRealJob.sigStatus == 'SIG-1'"
                    class="rounded-lg mx-2"
                    height="32px"
                    width="32px"
                    :elevation="scRealJob.sigStatus == 'SIG-1' ? 8 : 0"
                    :style="{ background: scRealJob.sigStatus == 'SIG-1' ? 'linear-gradient(225deg, #31CE9A 15%, transparent)' : '#3C424E' }"
                  />
                  <v-card
                    v-if="$vuetify.breakpoint.width > 1500 || scRealJob.sigStatus == 'SIG-2'"
                    class="rounded-lg mx-2"
                    height="32px"
                    width="32px"
                    :elevation="scRealJob.sigStatus == 'SIG-2' ? 8 : 0"
                    :style="{ background: scRealJob.sigStatus == 'SIG-2' ? 'linear-gradient(225deg, #0177FB 15%, transparent)' : '#3C424E' }"
                  />
                  <v-card
                    v-if="$vuetify.breakpoint.width > 1500 || scRealJob.sigStatus == 'SIG-3'"
                    class="rounded-lg mx-2"
                    height="32px"
                    width="32px"
                    :elevation="scRealJob.sigStatus == 'SIG-3' ? 8 : 0"
                    :style="{ background: scRealJob.sigStatus == 'SIG-3' ? 'linear-gradient(225deg, #FF852E 15%, transparent)' : '#3C424E' }"
                  />
                </v-row>
              </v-container>
            </v-card>

            <!-- 스테커 크레인 -->
            <!-- <v-card class="rounded-card" color="#222631" height="40%" width="100%">
              <v-container fluid fill-height>
                <v-row align="center">
                  <span>Conveyor</span>
                  <v-spacer></v-spacer>
                  <span v-if="cvRealStatus.sigStatus == 'SIG-1'" style="color: #31CE9A;">양호</span>
                  <span v-if="cvRealStatus.sigStatus == 'SIG-2'" style="color: #0177FB;">약함</span>
                  <span v-if="cvRealStatus.sigStatus == 'SIG-3'" style="color: #FF852E;">불량</span>
                  <v-card
                    v-if="$vuetify.breakpoint.width > 1500 || cvRealStatus.sigStatus == 'SIG-1'"
                    class="rounded-lg mx-2" height="32px" width="32px"
                    :elevation="cvRealStatus.sigStatus == 'SIG-1' ? 8 : 0"
                    :style="{background: cvRealStatus.sigStatus == 'SIG-1' ? 'linear-gradient(225deg, #31CE9A 15%, transparent)' : '#3C424E' }"
                  />
                  <v-card
                    v-if="$vuetify.breakpoint.width > 1500 || cvRealStatus.sigStatus == 'SIG-2'"
                    class="rounded-lg mx-2" height="32px" width="32px"
                    :elevation="cvRealStatus.sigStatus == 'SIG-2' ? 8 : 0"
                    :style="{ background: cvRealStatus.sigStatus == 'SIG-2' ? 'linear-gradient(225deg, #0177FB 15%, transparent)' : '#3C424E' }"
                  />
                  <v-card
                    v-if="$vuetify.breakpoint.width > 1500 || cvRealStatus.sigStatus == 'SIG-3'"
                    class="rounded-lg mx-2" height="32px" width="32px"
                    :elevation="cvRealStatus.sigStatus == 'SIG-3' ? 8 : 0"
                    :style="{ background: cvRealStatus.sigStatus == 'SIG-3' ? 'linear-gradient(225deg, #FF852E 15%, transparent)' : '#3C424E' }"
                  />
                </v-row>
              </v-container>
            </v-card> -->

            <!--  -->
          </v-container>
        </v-sheet>
        <v-sheet dark color="transparent" class="equipmentAlarmHeight">
          <v-container fill-height class="text-body-2">
            <span class="text-dash-1 mb-3">장비 알람</span>
            <v-card class="rounded-card" color="#222631" height="95%" width="100%">
              <v-container fluid>
                <DxList :data-source="errorHistory" height="90%" :active-state-enabled="false" :focus-state-enabled="false">
                  <template #item="{ data: item }">
                    <v-card class="d-flex align-center rounded-lg my-1 px-3 " height="calc(12vh - 66px)" color="#2E3442">
                      <!-- <div>{{item.errorCd}}</div> -->
                      <!-- <v-icon color="#FF852F">{{'warning'}}</v-icon> -->
                      <v-img
                        v-if="item.scNo == 'AUTO_LINE'"
                        :src="require(`@/assets/images/kier/dashboard/conveyor_o.png`)"
                        contain
                        max-height="100%"
                        max-width="45"
                      />
                      <v-img v-else :src="require(`@/assets/images/kier/dashboard/stacker_crane.png`)" contain max-height="100%" max-width="45" />
                      <v-spacer />
                      <div class="mx-2">{{ item.minorNm }}</div>
                      <v-spacer />
                      <div>{{ `${item.errorAt.slice(5, 7)}:${item.errorAt.slice(8, 10)}` }}</div>
                    </v-card>
                  </template>
                </DxList>
              </v-container>
            </v-card>
          </v-container>
        </v-sheet>
        <v-sheet dark color="transparent" class="Within3MonthsHeight">
          <v-container fill-height class="text-body-2">
            <v-row>
              <span class="text-dash-1">3개월 이내 주문/출하 의뢰 접수</span>
            </v-row>
            <v-sheet class="pt-2 pr-2" color="transparent" height="85%" width="50%">
              <v-card class="rounded-card" color="#222631" height="100%">
                <v-card-title class="d-flex justify-center pa-2 rounded-b-0 text-body-2" style="background-color: #1F2D47;">
                  <span style="color: #0274F2">발주 진행</span>
                </v-card-title>
                <v-sheet class="text-caption" color="transparent" height="calc(100% - 38px)">
                  <v-container fill-height class="pa-1 pa-lg-3">
                    <v-card class="rounded-card" color="#2E3442" height="40%" width="100%">
                      <v-container fill-height class="pa-1 pa-lg-3">
                        <span>총 건수</span>
                        <v-spacer />
                        <v-sheet class="rounded-lg d-flex justify-center align-center" height="32px" width="32px" color="#3F475A">
                          <span class="text-dash-1">
                            {{ purchasingOrder.cnt }}
                          </span>
                        </v-sheet>
                      </v-container>
                    </v-card>
                    <v-card class="rounded-card" color="#2E3442" height="40%" width="100%">
                      <v-container fill-height class="pa-1 pa-lg-3">
                        <span>접수</span>
                        <v-spacer />
                        <v-badge color="#FF852F" dot overlap :value="purchasingOrder.hasWating">
                          <v-btn
                            class="rounded-lg d-flex justify-center align-center text-dash-1"
                            elevation="0"
                            height="32px"
                            width="32px"
                            color="#3F475A"
                            @click="
                              $router.push({ name: 'PurchasingOrderManage', params: { fromDashboard: true, hasWating: purchasingOrder.hasWating } })
                            "
                          >
                            {{ purchasingOrder.receipts }}
                          </v-btn>
                        </v-badge>
                      </v-container>
                    </v-card>
                  </v-container>
                </v-sheet>
              </v-card>
            </v-sheet>
            <v-sheet class="pt-2 pl-2" color="transparent" height="85%" width="50%">
              <v-card class="rounded-card" color="#222631" height="100%">
                <v-card-title class="d-flex justify-center pa-2 rounded-b-0 text-body-2" style="background-color: #1F2D47;">
                  <span style="color: #0274F2">출하 의뢰</span>
                </v-card-title>
                <v-sheet class="text-caption" color="transparent" height="calc(100% - 38px)">
                  <v-container fill-height class="pa-1 pa-lg-3">
                    <v-card class="rounded-card" color="#2E3442" height="40%" width="100%">
                      <v-container fill-height class="pa-1 pa-lg-3">
                        <span>총 건수</span>
                        <v-spacer />
                        <v-sheet class="rounded-lg d-flex justify-center align-center" height="32px" width="32px" color="#3F475A">
                          <span class="text-dash-1">
                            {{ customerOrder.cnt }}
                          </span>
                        </v-sheet>
                      </v-container>
                    </v-card>
                    <v-card class="rounded-card" color="#2E3442" height="40%" width="100%">
                      <v-container fill-height class="pa-1 pa-lg-3">
                        <span>접수</span>
                        <v-spacer />
                        <v-badge color="#FF852F" dot overlap :value="customerOrder.hasWating">
                          <v-btn
                            class="rounded-lg d-flex justify-center align-center text-dash-1"
                            elevation="0"
                            height="32px"
                            width="32px"
                            color="#3F475A"
                            @click="
                              $router.push({ name: 'CustomerOrderManage', params: { fromDashboard: true, hasWating: customerOrder.hasWating } })
                            "
                          >
                            {{ customerOrder.receipts }}
                          </v-btn>
                        </v-badge>
                      </v-container>
                    </v-card>
                  </v-container>
                </v-sheet>
              </v-card>
            </v-sheet>
          </v-container>
        </v-sheet>
      </v-col>

      <v-col cols="auto" style="background-color: #0D0E13; height:100% ;width: 57%;">
        <v-sheet dark color="transparent" height="120px">
          <v-container fill-height>
            <v-card class="rounded-card d-flex flex-column justify-center align-center pa-2" color="#222631" height="100%">
              <span class="text-dash-1 mt-1 mb-3">입고</span>
              <v-card
                class="rounded-card d-flex justify-center align-center"
                height="50px"
                width="90px"
                style="background: linear-gradient(240deg, #0177FB, transparent);"
              >
                <span class="text-dash-3">{{ inOutQty.inQty }}</span>
              </v-card>
            </v-card>
            <v-sheet width="12px"></v-sheet>
            <v-card class="rounded-card d-flex flex-column justify-center align-center pa-2" color="#222631" height="100%">
              <span class="text-dash-1 mt-1 mb-3">출고</span>
              <v-card
                class="rounded-card d-flex justify-center align-center"
                height="50px"
                width="90px"
                style="background: linear-gradient(240deg, #9A47F6, transparent);"
              >
                <span class="text-dash-3">{{ inOutQty.outQty }}</span>
              </v-card>
            </v-card>
            <v-spacer />
            <v-btn
              class="align-self-start mt-2"
              icon
              @click="
                e => {
                  getDashboard()
                  getDashboardTen()
                }
              "
            >
              <v-icon :size="36">refresh</v-icon>
            </v-btn>
          </v-container>
        </v-sheet>
        <v-sheet dark color="transparent" height="calc(70% - 120px)">
          <DxDiagram
            class="dash-diagram"
            ref="diagram"
            height="calc(109% - 34px)"
            width="100%"
            units="px"
            view-units="px"
            auto-zoom-mode="fitContent"
            :history-toolbar="{ visible: false }"
            :toolbox="{ visibility: 'disabled' }"
            :view-toolbar="{ visible: false }"
            :context-menu="{ enabled: false }"
            :read-only="true"
            :simple-view="true"
            :nodes="{
              dataSource: nodes,
              leftExpr: data => data.x * containerSize.width,
              topExpr: data => data.y * containerSize.height,
              zIndexExpr: 'z',
              lockedExpr: 'locked'
            }"
          >
            <DxCustomShape
              type="container"
              :background-image-url="require(`@/assets/images/kier/dashboard/container.png`)"
              :default-width="containerSize.width"
              :default-height="containerSize.height"
            />
            <DxCustomShape
              type="rack_0"
              :background-image-url="require(`@/assets/images/kier/dashboard/rack_${rackRateManual}.png`)"
              :default-width="containerSize.width * 0.25"
              :default-height="containerSize.height * 0.35"
            />
            <DxCustomShape
              type="rack_1"
              :background-image-url="require(`@/assets/images/kier/dashboard/rack_${rackRate}.png`)"
              :default-width="containerSize.width * 0.25"
              :default-height="containerSize.height * 0.35"
            />
            <DxCustomShape
              type="rack_2"
              :background-image-url="require(`@/assets/images/kier/dashboard/rack_${rackRate}.png`)"
              :default-width="containerSize.width * 0.25"
              :default-height="containerSize.height * 0.35"
            />
            <!-- <DxCustomShape
              type="rack_single_0"
              :background-image-url="require(`@/assets/images/kier/dashboard/rack_single_${rackRateAuto1}.png`)"
              :default-width="containerSize.width * 0.28"
              :default-height="containerSize.height * 0.28"
            />
            <DxCustomShape
              type="rack_single_1"
              :background-image-url="require(`@/assets/images/kier/dashboard/rack_single_${rackRateAuto2}.png`)"
              :default-width="containerSize.width * 0.28"
              :default-height="containerSize.height * 0.28"
            />
            <DxCustomShape
              type="rack_single_2"
              :background-image-url="require(`@/assets/images/kier/dashboard/rack_single_${rackRateManual}.png`)"
              :default-width="containerSize.width * 0.28"
              :default-height="containerSize.height * 0.28"
            /> -->
            <DxCustomShape
              type="conveyor_o"
              :default-width="containerSize.width * 0.13"
              :default-height="containerSize.height * 0.18"
              template="Conveyor"
            />

            <!--  컨베어 밸트  -->
            <!-- <template #Conveyor>
              <svg>
                <circle :cx="10" :cy="10" :r="9" :fill="stausColor[cvRealStatus.status]" />
              </svg>
            </template> -->
            <!-- <DxCustomShape
              type="conveyor_u"
              :background-image-url="require(`@/assets/images/kier/dashboard/conveyor_u.png`)"
              :default-width="containerSize.width * 0.11"
              :default-height="containerSize.height * 0.21"
            /> -->
            <DxCustomShape
              type="stacker_crane"
              :background-image-url="require(`@/assets/images/kier/dashboard/stacker_crane.png`)"
              :default-width="containerSize.width * 0.12"
              :default-height="containerSize.height * 0.2"
              template="StackerCrane"
            />
            <template #StackerCrane>
              <svg x="30" y="00">
                <circle :cx="10" :cy="10" :r="9" :fill="stausColor[scRealJob.status]" />
              </svg>
            </template>
            <!-- <DxCustomShape
              type="truck"
              :background-image-url="require(`@/assets/images/kier/dashboard/truck.png`)"
              :default-width="containerSize.width * 0.12"
              :default-height="containerSize.height * 0.12"
            />
            <DxCustomShape
              type="folk_lift"
              :background-image-url="require(`@/assets/images/kier/dashboard/folk_lift.png`)"
              :default-width="containerSize.width * 0.11"
              :default-height="containerSize.height * 0.22"
            /> -->
            <DxCustomShape
              type="legend"
              :default-width="containerSize.width * 0.35"
              :default-height="containerSize.height * 0.1"
              template="LegendShape"
            />
            <template #LegendShape>
              <svg>
                <circle cx="5%" cy="50%" :r="9" fill="grey" />
                <text class="text-legned" x="11%" y="50%" dominant-baseline="middle">
                  {{ '대기' }}
                </text>
                <circle cx="39%" cy="50%" :r="9" fill="green" />
                <text class="text-legned" x="45%" y="50%" dominant-baseline="middle">
                  {{ '동작' }}
                </text>
                <circle cx="74%" cy="50%" :r="9" fill="red" />
                <text class="text-legned" x="79%" y="50%" dominant-baseline="middle">
                  {{ '에러' }}
                </text>
              </svg>
            </template>
          </DxDiagram>
        </v-sheet>
        <v-sheet dark color="transparent" height="30%" width="100%">
          <v-container fill-height>
            <span class="text-dash-1">일일 입출고 추이</span>
            <v-sheet class="pt-2" color="transparent" height="85%" width="100%">
              <v-card
                class="rounded-card d-flex justify-center align-center"
                color="#181C25"
                height="100%"
                width="100%"
                @click="$router.push({ name: 'InOutInfo', params: { fromDashboard: true } })"
                @wheel="
                  e => {
                    if (e.deltaY < 0) {
                      trendSeries.push(trendSeries.shift())
                    } else {
                      trendSeries.unshift(trendSeries.pop())
                    }
                  }
                "
              >
                <svg :style="{ height: 0, width: 0 }">
                  <linearGradient id="gradIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#0177FB" />
                    <stop offset="100%" stop-color="#1B1F28" stop-opacity="0.8" />
                  </linearGradient>
                  <linearGradient id="gradOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#9A47F6" />
                    <stop offset="100%" stop-color="#1B1F28" stop-opacity="0.8" />
                  </linearGradient>
                </svg>
                <DxChart
                  ref="trendChart"
                  :style="{ height: '90%', width: '95%' }"
                  :data-source="trend"
                  :animation="false"
                  theme="generic.darkviolet"
                  :series="trendSeries"
                  @series-hover-changed="
                    e => {
                      if (e.target.isHovered()) {
                        const marker = $refs[`${e.target.name}Marker`]
                        marker.setAttribute('fill', 'black')
                        marker.setAttribute('stroke', markerColor[e.target.name])
                        marker.setAttribute('r', '6')
                        marker.setAttribute('stroke-width', '4')
                      }
                    }
                  "
                >
                  <DxCommonAxisSettings :tick="{ visible: false }" :visible="false" />
                  <DxArgumentAxis argument-type="datetime" />
                  <DxValueAxis :grid="{ opacity: 0.3 }" />
                  <DxCommonSeriesSettings type="area" argument-field="matTransDt" hover-mode="none" />
                  <DxLegend
                    vertical-alignment="top"
                    horizontal-alignment="right"
                    orientation="horizontal"
                    item-text-position="right"
                    marker-template="markerTemplate"
                  />
                  <template #markerTemplate="{ data }">
                    <svg>
                      <circle
                        :ref="`${data.series.name}Marker`"
                        :cx="10"
                        :cy="10"
                        :r="5"
                        stroke="white"
                        stroke-width="2"
                        :fill="markerColor[data.series.name]"
                      />
                    </svg>
                  </template>
                  <DxTooltip :enabled="true" />
                </DxChart>
              </v-card>
            </v-sheet>
          </v-container>
        </v-sheet>
      </v-col>
      <v-col cols="auto" style="background-color: #0D0E13; height:100%; width:20%;">
        <v-sheet dark color="transparent" height="100%">
          <v-container fill-height>
            <v-card class="rounded-card text-caption d-flex justify-space-between align-center px-1 px-lg-6" height="4.5%" width="100%">
              <div class="d-flex justify-center align-center">
                <v-avatar color="#A0AAC1" size="11" />
                <span class="mx-1">미완료</span>
              </div>
              <div class="d-flex justify-center align-center">
                <v-avatar color="#47B9F8" size="11" />
                <span class="mx-1">부분완료</span>
              </div>
              <div class="d-flex justify-center align-center">
                <v-avatar color="#143775" size="11" />
                <span class="mx-1">완료</span>
              </div>
            </v-card>
            <v-card class="rounded-card pl-lg-3" height="15%" width="100%" style="background: linear-gradient(245deg, #007BFF, rgba(0,123,255,0.2));">
              <v-container fill-height>
                <div class="d-flex flex-column justify-center" style="height: 100%; width: 40%;">
                  <span class="text-dash-1 my-3">입하장</span>
                  <span class="text-caption grey--text my-3">Incoming</span>
                </div>
                <v-spacer />
                <DxPieChart
                  class="d-flex flex-column justify-center"
                  ref="incommingChart"
                  type="doughnut"
                  :rtl-enabled="true"
                  :adaptive-layout="{ width: 50, height: 50, keepLabels: true }"
                  style="height: 100%; width: 60%; max-height: 104px;"
                  :data-source="invoice"
                  :inner-radius="0.25"
                  :animation="false"
                  :palette="['#A0AAC1', '#47B9F8', '#143775']"
                  :diameter="1"
                  resolve-label-overlapping="shift"
                >
                  <DxSeries argument-field="status" value-field="cnt" hover-mode="none">
                    <DxLabel
                      :visible="true"
                      position="columns"
                      background-color="none"
                      text-overflow="none"
                      format="fixedPoint"
                      :font="{ color: 'white', size: 11, weight: 750 }"
                      :customize-text="pointInfo => (pointInfo.value ? `${pointInfo.valueText}\n(${pointInfo.percentText})` : '')"
                      :connector="{ visible: true }"
                    />
                  </DxSeries>
                  <DxLegend :visible="false" />
                </DxPieChart>
              </v-container>
              <div class="d-inline-flex justify-center" style="position: absolute; top: -9px; left: -10px;">
                <v-card class="rounded-lg" color="#007BFF" elevation="7">
                  <v-icon class="pa-1" dense>arrow_downward</v-icon>
                </v-card>
              </div>
            </v-card>
            <v-card
              class="rounded-card pl-lg-3"
              height="15%"
              width="100%"
              style="background: linear-gradient(245deg, #47B9F8, rgba(71,185,248,0.2));"
            >
              <v-container fill-height>
                <div class="d-flex flex-column justify-center" style="height: 100%; width: 40%;">
                  <span class="text-dash-1 my-3">출하장</span>
                  <span class="text-caption grey--text my-3">Outcoming</span>
                </div>
                <v-spacer />
                <DxPieChart
                  class="d-flex flex-column justify-center"
                  ref="outcomingChart"
                  type="doughnut"
                  :rtl-enabled="true"
                  :adaptive-layout="{ width: 50, height: 50, keepLabels: true }"
                  style="height: 100%; width: 60%; max-height: 104px;"
                  :data-source="delivery"
                  :inner-radius="0.25"
                  :animation="false"
                  :palette="['#A0AAC1', '#47B9F8', '#143775']"
                  :diameter="1"
                  resolve-label-overlapping="shift"
                >
                  <DxSeries argument-field="status" value-field="cnt" hover-mode="none">
                    <DxLabel
                      :visible="true"
                      position="columns"
                      background-color="none"
                      text-overflow="none"
                      format="fixedPoint"
                      :font="{ color: 'white', size: 11, weight: 750 }"
                      :customize-text="pointInfo => (pointInfo.value ? `${pointInfo.valueText}\n(${pointInfo.percentText})` : '')"
                      :connector="{ visible: true }"
                    />
                  </DxSeries>
                  <DxLegend :visible="false" />
                </DxPieChart>
              </v-container>
              <div class="d-inline-flex justify-center" style="position: absolute; top: -9px; left: -10px;">
                <v-card class="rounded-lg" color="#47B9F8" elevation="7">
                  <v-icon class="pa-1" dense>arrow_upward</v-icon>
                </v-card>
              </div>
            </v-card>
            <v-card
              class="rounded-card px-lg-3 areaHeight"
              width="100%"
              color="#181C25"
              @click="$router.push({ name: 'MaterialInfo', params: { type: 'area' } })"
            >
              <v-container fill-height>
                <span class="text-dash-1 my-3">AREA</span>
                <v-row no-gutters justify="center">
                  <v-col class="d-flex align-center">
                    <span class="text-caption">입하장</span>
                    <v-spacer />
                    <v-card class="rounded-lg d-flex justify-center align-center" color="rgba(1,119,251, 0.1)" width="40px" height="40px">
                      <span class="text-h5" style="color: #0177FB;">{{ area.in }}</span>
                    </v-card>
                  </v-col>
                  <div class="mx-3"></div>
                  <v-col class="d-flex align-center">
                    <span class="text-caption">출하장</span>
                    <v-spacer />
                    <v-card class="rounded-lg d-flex justify-center align-center" color="rgba(71,185,248, 0.1)" width="40px" height="40px">
                      <span class="text-h5" style="color: #47B9F8;">{{ area.out }}</span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
            <v-card
              class="rounded-card px-lg-3"
              height="20%"
              width="100%"
              color="#181C25"
              @click="$router.push({ name: 'MaterialInfo', params: { type: 'auto' } })"
            >
              <v-container fill-height>
                <v-row no-gutters align="center">
                  <span class="text-dash-1">자동 창고</span>
                  <v-spacer />
                  <div>
                    <span class="text-h5">{{ storageA.rate }}</span>
                    <span class="text-caption">%</span>
                  </div>
                </v-row>
                <v-row no-gutters justify="center">
                  <v-progress-linear
                    style="border: 1px solid; border-color: #0177FB; border-radius: 10px / 50%;"
                    color="progress-linear-auto"
                    background-opacity="0"
                    class="rounded-xl"
                    height="20px"
                    :value="storageA.rate"
                  />
                </v-row>
                <v-row no-gutters justify="center">
                  <v-col class="d-flex align-center">
                    <span class="text-caption">적재</span>
                    <v-spacer />
                    <v-card class="rounded-lg px-3" color="#3F475A">
                      <span class="text-h6">{{ storageA.jjt }}</span>
                    </v-card>
                  </v-col>
                  <v-divider class="mx-3" vertical />
                  <v-col class="d-flex align-center">
                    <span class="text-caption">공백</span>
                    <v-spacer />
                    <v-card class="rounded-lg px-3" color="#3F475A">
                      <span class="text-h6">{{ storageA.gbt }}</span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
            <v-card
              class="rounded-card px-lg-3"
              height="20%"
              width="100%"
              color="#181C25"
              @click="$router.push({ name: 'MaterialInfo', params: { type: 'manual' } })"
            >
              <v-container fill-height>
                <v-row no-gutters align="center">
                  <span class="text-dash-1">수동 창고</span>
                  <v-spacer />
                  <div>
                    <span class="text-h5">{{ storageM.rate }}</span>
                    <span class="text-caption">%</span>
                  </div>
                </v-row>
                <v-row no-gutters justify="center">
                  <v-progress-linear
                    style="border: 1px solid; border-color: #47B9F8; border-radius: 10px / 50%;"
                    color="progress-linear-manual"
                    background-opacity="0"
                    height="20px"
                    :value="storageM.rate"
                  />
                </v-row>
                <v-row no-gutters justify="center">
                  <v-col class="d-flex align-center">
                    <span class="text-caption">적재</span>
                    <v-spacer />
                    <v-card class="rounded-lg px-3" color="#3F475A">
                      <span class="text-h6">{{ storageM.jjt }}</span>
                    </v-card>
                  </v-col>
                  <v-divider class="mx-3" vertical />
                  <v-col class="d-flex align-center">
                    <span class="text-caption">공백</span>
                    <v-spacer />
                    <v-card class="rounded-lg px-3" color="#3F475A">
                      <span class="text-h6">{{ storageM.gbt }}</span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DxList from 'devextreme-vue/list'
import { DxDiagram, DxCustomShape } from 'devextreme-vue/diagram'

import {
  DxChart,
  DxCommonAxisSettings,
  DxArgumentAxis,
  DxValueAxis,
  DxSeries,
  DxCommonSeriesSettings,
  DxLegend,
  DxTooltip
} from 'devextreme-vue/chart'

import { DxPieChart, DxLabel } from 'devextreme-vue/pie-chart'

import { getMonDashBoard, getMonDashBoardTenMin } from '@/api/kier/monitoring/dashBoard'

import { getCurrentDate } from '@/utils/common.js'

export default {
  name: 'Dashboard',
  components: {
    DxList,
    DxDiagram,
    DxCustomShape,
    DxChart,
    DxCommonAxisSettings,
    DxArgumentAxis,
    DxValueAxis,
    DxCommonSeriesSettings,
    DxSeries,
    DxLegend,
    DxTooltip,
    DxPieChart,
    DxLabel
  },
  data() {
    return {
      dashInterval: null,
      dashIntervalTen: null,
      currentDate: getCurrentDate(),
      markerColor: {
        입고: '#0177FB',
        출고: '#9A47F6'
      },
      scRealJob: {
        sigStatus: '',
        status: ''
      },
      cvRealStatus: {
        sigStatus: '',
        status: ''
      },
      stausColor: {
        STS01: 'grey',
        STS02: 'green',
        STS03: 'red'
      },
      errorHistory: [],
      purchasingOrder: {
        cnt: 0,
        receipts: 0,
        hasWating: false
      },
      customerOrder: {
        cnt: 0,
        receipts: 0,
        hasWating: false
      },
      inOutQty: {
        inQty: 0,
        outQty: 0
      },
      containerSize: {
        width: 1920,
        height: 1080
      },
      nodes: [
        { id: 0, type: 'container', x: 0, y: 0, z: 0, locked: true },
        { id: 1, type: 'rack_0', x: 0.4, y: 0.01, z: 0, locked: true },
        { id: 2, type: 'rack_1', x: 0.43, y: 0.04, z: 0, locked: true },
        { id: 3, type: 'rack_2', x: 0.46, y: 0.06, z: 0, locked: true },
        // {id: 1, type: 'rack_single_0', x: 0.4, y: 0, z: 0, locked: true},
        // {id: 2, type: 'rack_single_1', x: 0.43, y: 0.08, z: 2, locked: true},
        // {id: 3, type: 'rack_single_2', x: 0.46, y: 0.16, z: 4, locked: true},
        { id: 4, type: 'conveyor_o', x: 0.15, y: 0.32, z: 5 },
        // // {id: 5, type: 'conveyor_u', x: 0.38, y: 0.46, z: 5},
        { id: 6, type: 'stacker_crane', x: 0.35, y: 0.2, z: 1 },
        // {id: 7, type: 'truck', x: 0.7, y: 0.35, z: 5},
        // {id: 8, type: 'folk_lift', x: 0.55, y: 0.35, z: 5},
        { id: 9, type: 'legend', x: 0.78, y: 0.9, z: 6 }
      ],
      resizeObserver: new ResizeObserver((entries, observer) => {
        this.$refs['diagram'].instance.beginUpdate()
        for (let entry of entries) {
          this.containerSize.width = entry.contentRect.width
          this.containerSize.height = entry.contentRect.height
        }
        this.$refs['diagram'].instance.endUpdate()
      }),
      trend: [],
      trendSeries: [
        {
          name: '입고',
          valueField: 'inQty',
          color: 'url(#gradIn)',
          border: { visible: true, color: '#0177FB' },
          point: {
            visible: true,
            size: 8,
            color: '#0177FB',
            border: { visible: true, color: '#FFFFFF', width: 2 }
          },
          hoverStyle: { color: '#0177FB' }
        },
        {
          name: '출고',
          valueField: 'outQty',
          color: 'url(#gradOut)',
          border: { visible: true, color: '#9A47F6' },
          point: {
            visible: true,
            size: 8,
            color: '#9A47F6',
            border: { visible: true, color: '#FFFFFF', width: 2 }
          },
          hoverStyle: { color: '#9A47F6' }
        }
      ],
      invoice: [
        { status: '예정', cnt: 0 },
        { status: '진행중', cnt: 0 },
        { status: '완료', cnt: 0 }
      ],
      delivery: [
        { status: '예정', cnt: 0 },
        { status: '진행중', cnt: 0 },
        { status: '완료', cnt: 0 }
      ],
      area: {
        in: 0,
        out: 0
      },
      storageA: {
        rate: 0,
        jjt: 0,
        gbt: 0
      },
      storageM: {
        rate: 0,
        jjt: 0,
        gbt: 0
      }
    }
  },
  computed: {
    rackRate() {
      //
      let rate = this.storageA.rate == undefined || this.storageA.rate == '' || this.storageA.rate == null ? 0 : this.storageA.rate
      return rate < 10 ? 0 : rate < 50 ? 30 : rate < 70 ? 50 : rate < 99 ? 70 : 100
    },
    rackRateAuto1() {
      return this.storageA.rate < 50 ? 0 : 1
    },
    rackRateAuto2() {
      return this.storageA.rate < 100 ? 0 : 1
    },
    rackRateManual() {
      let rate = this.storageM.rate == undefined || this.storageM.rate == '' || this.storageM.rate == null ? 0 : this.storageM.rate
      return rate < 10 ? 0 : rate < 50 ? 30 : rate < 70 ? 50 : rate < 99 ? 70 : 100
    }
  },
  activated() {
    this.getDashboard()
    this.dashInterval = setInterval(this.getDashboard, 10000)
    this.getDashboardTen()
    this.dashIntervalTen = setInterval(this.getDashboardTen, 10 * 60 * 1000)
    this.$refs['trendChart'].instance.render()
    this.$refs['incommingChart'].instance.render()
    this.$refs['outcomingChart'].instance.render()
    this.resizeObserver.observe(this.$refs['diagram'].$el)
  },
  deactivated() {
    clearInterval(this.dashInterval)
    clearInterval(this.dashInterval10)
    this.resizeObserver.disconnect()
  },
  methods: {
    getDashboard() {
      getMonDashBoard({})
        .then(res => {
          let map = res.listResponse.map

          if (map.scRealJob[0] == null) {
            this.scRealJob.sigStatus = 'SIG-3'
            this.scRealJob.status = 'STS03'
          } else {
            this.scRealJob.sigStatus = map.scRealJob[0].sigStatus
            this.scRealJob.status = map.scRealJob[0].status
          }

          this.errorHistory = map.errorHistory

          this.trend = map.trend.map(e => ({
            matTransDt: e.matTransDt,
            inQty: Number(e.inQty || 0),
            outQty: Number(e.outQty || 0)
          }))

          this.storageA.rate = Math.round(Number(map.storageA[0].rate))
          this.storageA.jjt = Number(map.storageA[0].jjt || 0)
          this.storageA.gbt = Number(map.storageA[0].gbt || 0)

          this.storageM.rate = Math.round(Number(map.storageM[0].rate))
          this.storageM.jjt = Number(map.storageM[0].jjt || 0)
          this.storageM.gbt = Number(map.storageM[0].gbt || 0)
        })
        .catch(error => {})
    },
    getDashboardTen() {
      getMonDashBoardTenMin({})
        .then(res => {
          let map = res.listResponse.map
          this.purchasingOrder.cnt = map.purchasingOrder[0].cnt || 0
          this.purchasingOrder.receipts = map.purchasingOrder[0].cnt02 || 0
          this.purchasingOrder.hasWating = this.purchasingOrder.cnt != this.purchasingOrder.receipts

          this.customerOrder.cnt = map.customerOrder[0].cnt || 0
          this.customerOrder.receipts = map.customerOrder[0].cnt02 || 0
          this.customerOrder.hasWating = this.customerOrder.cnt != this.customerOrder.receipts

          this.inOutQty.inQty = map.inOutQty[0].inQty || 0
          this.inOutQty.outQty = map.inOutQty[0].outQty || 0

          this.invoice[0].cnt = Number(map.invoice[0].cnt01 || 0)
          this.invoice[1].cnt = Number(map.invoice[0].cnt02 || 0)
          this.invoice[2].cnt = Number(map.invoice[0].cnt03 || 0)

          this.delivery[0].cnt = Number(map.delivery[0].cnt01 || 0)
          this.delivery[1].cnt = Number(map.delivery[0].cnt02 || 0)
          this.delivery[2].cnt = Number(map.delivery[0].cnt03 || 0)

          this.area.in = map.area[0].qty || 0
          this.area.out = map.area[1].qty || 0
        })
        .catch(error => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.communicationStatusHeight {
  height: 20%;
}
.equipmentAlarmHeight {
  height: 42%;
}
.Within3MonthsHeight {
  height: 30%;
}
.areaHeight {
  height: 14%;
}
.normal-screen {
  height: calc(100vh - 80px);
  width: 100vw;
}
.full-screen {
  height: 100vh;
  width: 100vw;
}
.rounded-card {
  border-radius: 14px !important;
}
.rounded-card {
  border-radius: 14px !important;
}
.text-dash-1 {
  font-size: 1rem !important;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: 0.009375em !important;
}
.text-dash-2 {
  font-size: 1.5rem !important;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: 0.009375em !important;
}
.text-dash-3 {
  font-size: 1.8rem !important;
  font-weight: 700;
  line-height: 1.8rem;
  letter-spacing: 0.009375em !important;
}
.text-legned {
  font-size: 1.4rem;
  fill: white !important;
  text-anchor: start !important;
}

@media (max-width: 1440px) {
  .communicationStatusHeight {
    height: 22%;
  }
  .equipmentAlarmHeight {
    height: 30%;
  }
  .Within3MonthsHeight {
    height: 40%;
  }
  .areaHeight {
    height: 18%;
  }
}
</style>
