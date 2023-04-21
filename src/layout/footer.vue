<template>
  <v-container pa-0 ma-0>
    <v-col class="pa-0">
      <v-row style="backgroundColor:#474747; position:relative;" class="ma-0">
        <v-col class="pa-2 footerRow">
          <v-col cols="12" class="pa-0 mb-2">
            <v-row>
              <v-col cols="1" class="pa-0">
                <v-img width="120" :src="require(`@/assets/images/ci/bottom_logo.png`)"/>
              </v-col>
              <v-col cols="7" class="pa-0 pl-5">
                개인정보 처리방침 | 저작권 정책 | 이메일 무단수집 거부 | 사이트맵
              </v-col>
              <!-- <v-col cols="4" class="pa-0">
                <v-row>
                  <v-col class="pa-0 mx-2 snsDiv">
                    <v-img width="30" :src="require(`@/assets/images/etc/sns_icon01.png`)"/>
                  </v-col>
                  <v-col class="pa-0 mx-2 snsDiv">
                    <v-img width="30" :src="require(`@/assets/images/etc/sns_icon02.png`)"/>
                  </v-col>
                  <v-col class="pa-0 mx-2 snsDiv">
                    <v-img width="30" :src="require(`@/assets/images/etc/sns_icon03.png`)"/>
                  </v-col>
                  <v-col class="pa-0 mx-2 snsDiv">
                    <v-img width="30" :src="require(`@/assets/images/etc/sns_icon04.png`)"/>
                  </v-col>
                  <v-col class="pa-0 mx-2 snsDiv">
                    <v-img width="30" :src="require(`@/assets/images/etc/sns_icon05.png`)"/>
                  </v-col>
                  <v-col class="pa-0 mx-2">
                    <v-select
                      :items="items"
                      dense
                      label="관련사이트 바로가기"
                      height="20"
                      dark
                      background-color="#777"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col> -->
            </v-row>
            
          </v-col>
          <v-divider style="backgroundColor:#cccccc"/>
          <v-col cols="12" class="pa-0 mt-2">
            <v-row>
              <v-spacer />
              <v-col cols="11" class="pa-2 pl-5">
                <v-col class="pa-0">
                  본사주소 (우) 38120 경상북도 경주시 문무대왕면 불국로 1655<br />
                  대표전화 054-704-2114 야간(공휴일) 054-704-2203
                </v-col>
                <v-col />
                <v-col class="pa-0">
                  한국수력원자력주식회사 ⓒ 2022 KHNP CO.LTD.ALL RIGTHS RESERVED.
                </v-col>
              </v-col>
            </v-row>
          </v-col>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
  export default {
    name: 'DefaultFooter',
    components: {
    },
    data() {
      return {
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      }
    },
    computed: {

    },
    methods: {

    }
  }
</script>
<style scoped>
.footerRow {
  margin: 0 auto;
  max-width: 1500px;
}
.footerRow > div > div {
  align-items: center;
}
.footerRow > div > div > div:first-child {
  filter: opacity(0.5);
}
.footerRow > div > div > div:nth-child(2) {
  font-size: 13px;
  font-weight: 700;
  color: white;
}
.snsDiv {
  max-width: 30px;
  align-self: center;
}
</style>