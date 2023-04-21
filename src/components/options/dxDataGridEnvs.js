import DataGrid from "devextreme/ui/data_grid";
// 그리드 옵션들을 알고 싶으면 그리드 인스턴스의 option()을 콘솔찍으면 나옵니다
DataGrid.defaultOptions({
  options : {
    noDataText : "데이터가 없습니다.",
    dateSerializationFormat :'yyyy-MM-dd hh:mm:ss',
    // 페이지
    pager: {

      visible: true,
      allowedPageSizes : [],
      displayMode : "full",
      showInfo: true,
      showNavigationButtons: true,
      showPageSizeSelector: false,
      infoText : "{0} / {1} ({2} 개)"
    },
    paging: {
      enabled: false,
      pageSize: 15
    },
    scrolling : {
      // 대용량 데이터일 경우 로딩 딜레이 문제로 virtual 사용 , 반대의 경우 standard 사용
      rowRenderingMode :  'standard'
      // rowRenderingMode :  'standard'
      // mode :  'virtual'
    },
    remoteOperations : {
      filtering : true,
      paging :true,
      sorting : true
    },
    // 편집모드
    editing : {
      mode: "batch",
      allowUpdating: true,
      selectTextOnEditStart: true,
      startEditAction: 'dblClick'
    },
    // 선택모드
    selection : {
      mode: "multiple",
      selectAllMode: "allPages",
      showCheckBoxesMode : "always",
      deferred: true
    },
    // 짝수 줄 색
    rowAlternationEnabled : true,
    // 컬럼이 많아질때 가로스크롤 없이 ... 생기는것
    columnHidingEnabled : true,    
       
    onContentReady (e) {
      let gridInstance = e.component

      if(gridInstance.option("defaultPaging")) {
        // 화면에따른 페이징 맞추기
        setPageCount(gridInstance)        
      }
      if(gridInstance.option("isAdding")) {
        gridInstance.option('focusedRowIndex', 0)
        gridInstance.option("isAdding", false)
      }
    },
    
    // 툴바 제거
    onToolbarPreparing(e){
      e.toolbarOptions.visible = false;  
    },
  
    // UI 컴포넌트가 처음 initial 될때 이벤트
    // onInitialized(e) {
    //   // 맨 앞 컬럼에 번호 넣어주는것
    //   setRowIndex(e.component)
    // },
    defaultPaging : true,
    isAdding : false,

    

  }
})

// 그리드 열 추가
DataGrid.prototype.newRow =  function(newRow) {  
  let dataSource = this.option("dataSource")
  let visibleRow = this.getVisibleRows()
 let fristRowIndex = visibleRow.length !== 0 ? dataSource.findIndex(element => element === visibleRow[0].data) : 0
  if(this.option("paging.pageSize") !== 0) {
    dataSource.splice(fristRowIndex !== -1 ? fristRowIndex : 0, 0, newRow)
  } else {
    dataSource.splice(0, 0, newRow)
  }


  this.option("isAdding", true)
}

// 맨 앞 컬럼에 번호 넣어주는것
function setRowIndex(gridInstance) {
  let column = {        
    name: "번호",
    caption : "번호",
    visible: true,
    alignment : "center",
    allowEditing : false,
    width : 60,
    visibleIndex : 0
  }
  // 번호 계산해서 넣어주는것
  column.calculateDisplayValue = function (rowData) {
    let dataSource = gridInstance.option("dataSource")
    let isMasterDetail = gridInstance.option("masterDetail.enabled")
    if(isMasterDetail) {
      // isMasterDetail 은 렌더링 문제때문에 번호가 엉클수 있어서 신규 열은 제외 시켰음
      dataSource = dataSource.filter(element => !element.__created__)
      return dataSource.findIndex(element => element === rowData) + 1
    } else {
      return dataSource.findIndex(element => element === rowData) + 1
    }
  }
  gridInstance.addColumn(column)
}

// 화면에따른 페이징 맞추기
function setPageCount(gridInstance) {
  // dev의 onContentReady 이벤트에 넣으면 됨
  let rowOffsetHight = 31.28
  // 그리드 내용의 DOM      
  let gridContentElement = gridInstance.element().querySelector(".dx-datagrid-rowsview")
  let FirstRow = gridContentElement.querySelector(".dx-data-row")
  if(FirstRow == null) return 
  // 각각의 높이
  let contentHight = gridContentElement.offsetHeight
  // 나누기
  let value = Math.floor(contentHight  / rowOffsetHight)      
  // 페이징 계산
  // gridInstance.option('paging.pageSize', value);
  // gridInstance.option("defaultPaging", false)
  
  // allowedPageSizes 에 페이지 기능 설정
  // setPageSizes(gridInstance, value)

} 

// // 첫번째 값을 페이징 된 값으로 들어가게끔 처리
// function setPageSizes(gridInstance, pageSize) { 
//   gridInstance.option("pager.allowedPageSizes", [pageSize,'all'])
//   var pager = gridInstance._views.pagerView._pager;
//   var pageElement = pager._$element[0].querySelector('.dx-page-sizes');  
//   // 첫번째
//   // pageElement.firstChild.innerText = `${pageSize}`
//   // 마지막
//   pageElement.lastChild.innerText = "전체"
//   // pageElement.innerText = "페이지" 
// }