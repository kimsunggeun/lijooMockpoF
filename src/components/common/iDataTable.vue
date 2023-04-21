<template>
  <v-layout column fill-height>
      <v-data-table
        :search="search"
        
        :fixed-header="fixedHeader"

        :headers="headers"      
        :items="items"

        :items-per-page="itemsPerPage"
        :page.sync="page"
        @page-count="clickPage($event)"
        @pagination="pagination"

        class="card_bg fill-height"
        :height="calcHeight"

        :hide-default-footer="hideDefaultFooter"

        :disable-sort="disableSort"
        :disable-pagination="disablePagination" 

        :loading="loading"
        :loading-text="loadingText"
      >
        <template v-for="slot in btnSlots" v-slot:[slot.slotName]="{ item }">
          <slot :name="`${slot.name}_btn`" v-bind:item="item"/>
        </template>
        <template v-slot:top v-if="searchUse">
          <v-layout d-flex class="search-height">
            <v-text-field :label="$t('search')" single-line hide-details class="pa-1" v-on:input="txtSearch($event)"/>
            <v-btn class="my-2" icon color="primary">
              <v-icon>$search</v-icon>
            </v-btn>  
          </v-layout>
        </template>
        <template v-slot:footer>
          <v-layout d-flex align-center>
            <v-layout align-center class="footer-height">
              <v-card-text class="pa-0 total-width"><v-icon >$list</v-icon> Total : {{ totalCount }}</v-card-text>
            </v-layout>
            <v-layout align-center justify-end class="footer-height" v-if="!disablePagination">
              <v-pagination
                v-model="page" 
                :length="pageCount" 
                :total-visible="pageTotal"
                class="pa-0"
              />
            </v-layout>
          </v-layout>
        </template>
      </v-data-table>
  </v-layout>
</template>

<script>
export default {
  name: 'i-data-table',
  props: {
    searchUse: { // 상단 검색 사용 여부 (사용:true / 미사용:false)
      type: Boolean,
      default: true
    },
    fixedHeader: { // 헤더 고정 여부 (고정:true / 미고정:false)
      type: Boolean,
      default: true
    },
    headers: { // 헤더 데이터
      type: Array,
      default: () => {
        return {}
      },
    },
    items: { // row 데이터
      type: Array,
      default: () => {
        return {}
      },
    },
    itemsPerPage: { // 페이지당 아이템 갯수
      type: Number,
      default: 10,
    },
    hideDefaultFooter: { // 푸터 여부 (숨김:true / 표시:false) *기본적으로 사용하지 않음 사용 시 페이징 스타일 커스텀 필요
      type: Boolean,
      default: true
    },
    disableSort: { // 정렬 기능 사용 (사용안함:true / 사용:false)
      type: Boolean,
      default: true
    },
    disablePagination: { // 페이징 여부 (사용안함:true / 사용:false)
      type: Boolean,
      default: true
    },
    loading: { // 로딩 progress 표시 여부 (표시:true / 미표시:false)
      type: Boolean,
      default: false
    },
    loadingText: { // 로딩 시 텍스트
      type: String,
      default: 'Loading...'
    },
    pageTotal: { // 보여줄 페이징 버튼의 갯수
      type: Number,
      default: 10
    },
    pagingClass: { // 페이징 부분의 사용자 정의 스타일
      type: String,
      default: 'pt-md-2'
    },
    customClass: { // 스타일
      type: String,
      default: ''
    },
    btnSlots: Array // 커스텀 버튼
  },
  data() {
    return {
      search: '', // 검색 val
      page: 1, // 현재 보여줄 페이지 번호
      pageCount: 10, // 페이지 구성 요소 길이
      totalCount: 0, // 데이터 총 갯수
      calcHeight: ''
    }
  },
  created() {
    this.settingGrid()
  },
  methods: {
    txtSearch: function (value) {      
      this.search = value
      this.$emit('search', this.search)
    },
    clickPage: function (value){      
      this.pageCount = value
    },
    pagination(pagination) {
      this.totalCount = pagination.itemsLength
    },
    settingGrid() {
      if (this.searchUse && !this.disablePagination){
        // 검색, 페이징 모두 사용
        this.calcHeight = 'calc(100% - 90px)'
      } else if (this.searchUse && this.disablePagination){
        // 검색만 사용
        this.calcHeight = 'calc(100% - 90px)'
      } else if (!this.searchUse && !this.disablePagination){
        // 페이징만 사용
        this.calcHeight = 'calc(100% - 45px)'
      } else {
        // 검색, 페이징 모두 사용하지 않음
        this.calcHeight = 'calc(100% - 45px)'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .search-height {
    height: 45px !important;
  }
  .footer-height {
    height: 45px !important;
  }
  .total-width {
    width: 150px !important;    
  }
</style>