<template>
  <v-container fluid fill-height align-start ma-0 pa-2>
    <v-row no-gutters class="matgrid-height">
      <v-col cols="12" class="page_size pa-0">
        <v-carousel height="100%" :show-arrows="false" v-model="carouselIdx">
          <v-carousel-item>
            <v-row no-gutters>
              <v-col cols="12" align="center" style="width:95%; border: thin solid rgba(0, 0, 0, 0.12); background-color: rgb(217,222,238);">
                <div class="headGubun">자동화 라인</div>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="8">
                <v-row>
                  <v-col cols="6" align="left">
                    <v-text-field v-model="palletId" label="Pallet ID" outlined hide-details="auto" clearable
                      class="pl-0" style="font-size:30px;" autofocus @keydown.enter="btnSearch()" />
                  </v-col>
                  <v-col cols="6" align="right">
                    <v-btn
                      class="rounded-0 ml-1 pr-3 pl-1"
                      outlined
                      color="btn_bg"
                      height="56px"
                      width="120px"
                      fontWeight="bold"
                      @click="btnSearch()"
                    >
                      <v-icon class="float-left pt-1" color="#000" x-large>${{'search'}}</v-icon>
                      <div
                        class="float-center mx-1"
                        :style="btnTextStyle"
                      >
                        조회
                      </div>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <span class="ml-4 pa-2 mTitle">{{this.palletNm}}</span>
                    <span class="ml-4 pa-2 mTitle">{{this.rfidTag}}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="12" class="pa-2">
                    <i-card-vertical headerTitle="■ Pallet 품목 리스트">
                      <template v-slot:body>
                        <v-layout column overflow-auto class="pa-0 pt-0">
                          <v-col cols="12" class="pa-0">
                            <div class="listStyle">
                              <DxList
                                :data-source="qtyList"
                                class="listHeight"
                                :activeStateEnabled="false"
                                :focusStateEnabled="false"
                              >
                                <template #item="{ data: item }">
                                  <div>
                                    <span :style="item.style">{{item.barcodeNo}}<br>{{item.qty}}</span>
                                    <span><img :src="item.image" style="width:4.5%; float: right;"></span>
                                  </div>
                                </template>
                              </DxList>
                            </div>
                          </v-col>
                        </v-layout>
                      </template>
                    </i-card-vertical>
                  </v-col>
                </v-row>
                <v-row class="leftbottom">
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="6" align="right">
                        <img :src="require(`@/assets/images/itemCount.png`)" class="bottomImg">
                      </v-col>
                      <v-col cols="6"  class="pt-12">
                        <span style="font-size:30pt;">품목 수 : {{this.itemCount}}개</span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="4">
                <v-row>
                  <v-col cols="12" class="rightCols">
                    <!-- <div style="border: 1px solid; border-radius: 10px; height: 100%;" class="pa-0"> -->
                      <span class="ml-2 pa-3 mTitle2"><br><br>잔량 입고<br>품목 수<br>{{this.plan_In_Qty}}</span>
                      <span class="ml-2 pa-3 mTitle2"><br><br>출고<br>품목 수<br><span style="color:#368AFF">{{this.plan_Out_Qty}}</span></span>
                    <!-- </div> -->
                  </v-col>
                </v-row>
                <v-row class="rightCols2">
                  <v-col cols="12" align="center">
                    <v-btn style="border:1px solid black; border-radius:10px; background-color:#D9DEEE;" tile outlined color="btn_bg" height="100%" width="98%" @click="btnSave()">
                      <div class="button" :style="btnTextStyle2"><v-icon id="test" class="pr-4" x-large >mdi-tray-arrow-down</v-icon>잔량 입고 처리</div>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

          </v-carousel-item>
          
          <!--두번째 화면-->
          <v-carousel-item>
            <v-row no-gutters>
              <v-col cols="12" align="center" style="width:95%; border: thin solid rgba(0, 0, 0, 0.12); background-color: rgb(217,222,238);">
                <div class="headGubun">지게차 라인</div>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="8">
                <v-row>
                  <v-col cols="6" align="left">
                    <v-text-field v-model="palletId2" label="Pallet ID" outlined hide-details="auto" clearable
                      class="pl-0" style="font-size:30px;" autofocus @keydown.enter="btnSearch2()" />
                  </v-col>
                  <v-col cols="6" align="right">
                    <v-btn
                      class="rounded-0 ml-1 pr-3 pl-1"
                      outlined
                      color="btn_bg"
                      height="56px"
                      width="120px"
                      fontWeight="bold"
                      @click="btnSearch2()"
                    >
                      <v-icon class="float-left pt-1" color="#000" x-large>${{'search'}}</v-icon>
                      <div
                        class="float-center mx-1"
                        :style="btnTextStyle"
                      >
                        조회
                      </div>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <span class="ml-4 pa-2 mTitle">{{this.palletNm2}}</span>
                    <span class="ml-4 pa-2 mTitle">{{this.rfidTag2}}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="12" class="pa-2">
                    <i-card-vertical headerTitle="■ Pallet 품목 리스트">
                      <template v-slot:body>
                        <v-layout column overflow-auto class="pa-0 pt-0">
                          <v-col cols="12" class="pa-0">
                            <div class="listStyle">
                              <DxList
                                :data-source="qtyList2"
                                class="listHeight"
                                :activeStateEnabled="false"
                                :focusStateEnabled="false"
                              >
                                <template #item="{ data: item }">
                                  <div>
                                    <span :style="item.style">{{item.barcodeNo}}<br>{{item.qty}}</span>
                                    <span><img :src="item.image" style="width:4.5%; float: right;"></span>
                                  </div>
                                </template>
                              </DxList>
                            </div>
                          </v-col>
                        </v-layout>
                      </template>
                    </i-card-vertical>
                  </v-col>
                </v-row>
                <v-row class="leftbottom">
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="6" align="right">
                        <img :src="require(`@/assets/images/itemCount.png`)" class="bottomImg">
                      </v-col>
                      <v-col cols="6"  class="pt-12">
                        <span style="font-size:30pt;">품목 수 : {{this.itemCount2}}개</span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="4">
                <v-row>
                  <v-col cols="12" class="rightCols">
                    <!-- <div style="border: 1px solid; border-radius: 10px; height: 100%;" class="pa-0"> -->
                      <span class="ml-2 pa-3 mTitle2"><br><br>잔량 입고<br>품목 수<br>{{this.plan_In_Qty2}}</span>
                      <span class="ml-2 pa-3 mTitle2"><br><br>출고<br>품목 수<br><span style="color:#368AFF">{{this.plan_Out_Qty2}}</span></span>
                    <!-- </div> -->
                  </v-col>
                </v-row>
                <v-row class="rightCols2">
                  <v-col cols="12" align="center">
                    <v-btn style="border:1px solid black; border-radius:10px; background-color:#D9DEEE;" tile outlined color="btn_bg" height="100%" width="98%" @click="btnSave2()">
                      <div class="button" :style="btnTextStyle2"><v-icon id="test" class="pr-4" x-large >mdi-tray-arrow-down</v-icon>잔량 입고 처리</div>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// let obj = document.getElementById('jae1');
import {
  getPalletInRemainMain,
  savePalletInRemainMainCase
} from '@/api/kier/pop/palletInRemain'
import { stringRepeat } from 'vue-json-editor/assets/jsoneditor';
import { DxList } from 'devextreme-vue/list'
  import {
    getComboMultipalletIdWmsMaterialInfo,
  } from '@/api/kier/wms/materialInfo'
import baseview from '@/components/base/baseview.vue' // base page 추가
import BaseDataGrid from '@/components/base/BaseDataGrid.vue' // 데이타 그리드 사용시 베이스 추가

export default {
  name: 'PalletInRemain',
  mixins: [baseview, BaseDataGrid], // base page 추가 및 권한 처리
  components: {
    DxList
  },
  data() {
    return {
      carouselIdx: 0,
      palletId: '',
      rfidTag: 'RFID Tag',
      palletNm: 'Pallet 명',
      btnTextStyle: { color: '#000', 'font-size': '20pt', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
      btnTextStyle2: { color: '#000', 'font-size': '30pt', 'letter-spacing': '0.5px', 'font-weight': 'bold', 'line-height': 1.8 },
      plan_In_Qty: 0,
      plan_Out_Qty:0,
      itemCount:0,
      qtyList: [],

      palletId2: '',
      rfidTag2: 'RFID Tag',
      palletNm2: 'Pallet 명',
      plan_In_Qty2: 0,
      plan_Out_Qty2: 0,
      itemCount2: 0,
      qtyList2:[],

      qty: '',
      barcodeNo: '',
      matCd: '',
      outQty: '',
      palletIdlimt:[],
      plaa:'',
      orgRes : [],
      orgRes2 : [],
    }
  },

   beforeMount() {
    Promise.all([
      getComboMultipalletIdWmsMaterialInfo()
    ])
      .then( res => {
        this.palletIdlimt = res[0].listResponse.list.slice()
      })
      .catch(error => {})
  },
  mounted() {
  },
  methods: {
    btnSearch(){
    
      this.openLoading('searching')
      if (this.palletId.length == 0) {
        this.vToastify(this.$t('입력된 Pallet ID가 없습니다.'), 'warn')
        this.endLoading()
        return
      }

     if(!this.palletIdlimt.some(e =>e.palletId == this.palletId)){
        this.vToastify(this.$t('등록된 Pallet ID가 없습니다.'), 'warn')
        this.endLoading()
        return
        }   
     
      
       
      
  


      this.qtyList = []
      this.plan_In_Qty = 0
      this.plan_Out_Qty = 0
      this.itemCount = 0
      this.doSearchMainList(true)
        .finally(() => {
          this.endLoading()
        })
    },
    btnSearch2(){
      this.openLoading('searching')
      if (this.palletId2.length == 0) {
        this.vToastify(this.$t('입력된 Pallet ID가 없습니다.'), 'warn')
        this.endLoading()
        return
      }
        if(!this.palletIdlimt.some(e =>e.palletId == this.palletId2)){
        this.vToastify(this.$t('등록된 Pallet ID가 없습니다.'), 'warn')
        this.endLoading()
        return
        }   
      this.qtyList2 = []
      this.plan_In_Qty2 = 0
      this.plan_Out_Qty2 = 0
      this.itemCount2 = 0
      this.doSearchMainList2()
        .finally(() => {
          this.endLoading()
        })
    },
    doSearchMainList(isProgress) {
      let params = {
        matDiv: 'AUTO_LINE',
        palletId: this.palletId,
        //P000000001
      }

      return getPalletInRemainMain(params, isProgress)
        .then(res => {
          if(res.listResponse.list[0]){
            // console.log("RES : ", res)
            this.palletNm = res.listResponse.list[0].palletNm // Pallet 명
            this.rfidTag = res.listResponse.list[0].rfidTag   // RFID Tag

            for (let i = 0; i < res.listResponse.list.length; i++ ){
              this.qtyList.push({ 
                barcodeNo: res.listResponse.list[i].barcodeNo + ' [' + res.listResponse.list[i].matNm + ']' , qty: ' ( 재고 수량 : ' + res.listResponse.list[i].qty + ' 작업 수량 : ' + res.listResponse.list[i].workQty + ' )'
                , style: 'font-size: 18pt; float: left;', image:require(`@/assets/images/downArrow.png`)})
              this.plan_In_Qty += Number(res.listResponse.list[i].planInQty)  // 잔량 입고 품목 수
              this.plan_Out_Qty += Number(res.listResponse.list[i].planOutQty) // 출고 품목 수
              if (res.listResponse.list[i].qty == res.listResponse.list[i].workQty){
                this.qtyList[i].style = 'font-size: 18pt; float: left; color:#368AFF'
                this.qtyList[i].image = require(`@/assets/images/upArrow.png`)
              }

            }
            this.itemCount += this.plan_In_Qty + this.plan_Out_Qty
            this.orgRes = res.listResponse.list
          }
        })
    },

    doSearchMainList2(isProgress) {
      let params2 = {
        matDiv: 'MANUAL_LINE',
        palletId: this.palletId2,
        //P000000001
      }
      return getPalletInRemainMain(params2, isProgress)
        .then(res => {
          if(res.listResponse.list[0]){
            // console.log("RES 지게차 : ", res)
            this.palletNm2 = res.listResponse.list[0].palletNm // Pallet 명
            this.rfidTag2 = res.listResponse.list[0].rfidTag   // RFID Tag
            for (let i = 0; i < res.listResponse.list.length; i++) {
              this.qtyList2.push({
                barcodeNo: res.listResponse.list[i].barcodeNo + ' [' + res.listResponse.list[i].matNm + ']', qty: ' ( 재고 수량 : ' + res.listResponse.list[i].qty + ' 작업 수량 : ' + res.listResponse.list[i].workQty + ' )'
                , style: 'font-size: 18pt; float: left;', image: require(`@/assets/images/downArrow.png`)
              })
              this.plan_In_Qty2 += Number(res.listResponse.list[i].planInQty)  // 잔량 입고 품목 수
              this.plan_Out_Qty2 += Number(res.listResponse.list[i].planOutQty) // 출고 품목 수
              if (res.listResponse.list[i].qty == res.listResponse.list[i].workQty) {
                this.qtyList2[i].style = 'font-size: 18pt; float: left; color:#368AFF'
                this.qtyList2[i].image = require(`@/assets/images/upArrow.png`)
              }
            }
            this.itemCount2 += this.plan_In_Qty2 + this.plan_Out_Qty2
            this.orgRes2 = res.listResponse.list
          }
        })
    },

    btnSave(){
      if (!this.palletId.length) {
        this.vToastify(this.$t('Pallet ID를 입력해주세요.'), 'warn')
        return
      }

      //유효성 검사
      if(!this.qtyList.length){
         this.vToastify(this.$t('품목리스트가 없습니다.'), 'warn')
        return
      }

      this.vToastifyPrompt(
      this.$t('doSaveData'),
      'info',
      current => {
        this.openLoading()
        savePalletInRemainMainCase(this.orgRes, true)
          .then(res => {
            // console.log(res)
            this.btnSearch(false)
          })
          .finally(() => {
            this.endLoading()
          })
        },
        null,
        true
      )
 
    },

    btnSave2(){
      if (!this.palletId2.length) {
        this.vToastify(this.$t('Pallet ID를 입력해주세요.'), 'warn')
        return
      }
       if(!this.qtyList2.length){
         this.vToastify(this.$t('품목리스트가 없습니다.'), 'warn')
        return
      }

      this.vToastifyPrompt(
      this.$t('doSaveData'),
      'info',
      current => {
        this.openLoading()
        savePalletInRemainMainCase(this.orgRes2, true)
          .then(res => {
            this.btnSearch2(false)
          })
          .finally(() => {
            this.endLoading()
          })
        },
        null,
        true
      )
 
    }
  }
}
</script>
<style lang="scss" scoped>

  .matgrid-height {
    height: calc(100vh - 126px);
  }

  .mTitle {
    border: 1px solid;
    border-radius: 10px;
    font-size: 29pt;
    width: 47%;
    float: left;
    font-weight: bold;
    text-align: center;
  }
  .mTitle2 {
    border: 1px solid;
    border-radius: 10px;
    font-size: 29pt;
    width: 47%;
    float: left;
    font-weight: bold;
    text-align: center;
    height: 100%;
  }

  .listStyle {
    border-top: 2px solid rgb(41,74,130);
    border-bottom: 2px solid rgb(41,74,130);
    border-left: thin solid rgba(0, 0, 0, 0.12);
    border-right: thin solid rgba(0, 0, 0, 0.12);
   }

  .listHeight {
    height: 28vh;
  }

  .bottomImg {
    height: 15vh;
  }
  .rightCols {
    height: 50vh;
  }
  .rightCols2 {
    height: 20vh;
  }
  .leftbottom {
    height: 25vh;
  }
  .headGubun {
    font-weight: bold;
    font-size: 32px;
  }
</style>
