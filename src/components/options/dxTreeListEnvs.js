import TreeList from "devextreme/ui/tree_list";

TreeList.defaultOptions({
    options : {
      noDataText : "데이터가 없습니다.",
      
      // 컬럼이 많아질때 가로스크롤 없이 ... 생기는것
      columnHidingEnabled : true,
      pager: {
        visible: true,
        displayMode : "full",
        showInfo: true,
        showNavigationButtons: false,
        showPageSizeSelector: false,
        infoText : "({2} 개)"
      },
      paging: {
        enabled: false,
        pageSize: 15
      },
      scrolling : {
        rowRenderingMode :  'virtual'
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
        allowSelectAll: true,
        recursive: false,
      },

      // 짝수 컬러
      rowAlternationEnabled : true,

      // 툴바 제거
      onToolbarPreparing(e){
        e.toolbarOptions.visible = false;  
      },

    }
  })