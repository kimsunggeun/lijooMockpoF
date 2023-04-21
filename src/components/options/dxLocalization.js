import { loadMessages } from 'devextreme/localization';
// 한글은 지원하지 않아 en을 수정
// 지원언어
// English (en) (default)
// German (de)
// Japanese (ja)
// Russian (ru)

// https://github.com/DevExpress/DevExtreme/blob/19_1/js/localization/messages/en.json#L114 참조
loadMessages({
    "en" : {
        "dxDataGrid-filterRowResetOperationText": "리셋",
        "dxDataGrid-filterRowOperationEquals": "같음",
        "dxDataGrid-filterRowOperationNotEquals": "같지않음",
        "dxDataGrid-filterRowOperationLess": "미만",
        "dxDataGrid-filterRowOperationLessOrEquals": "이하",
        "dxDataGrid-filterRowOperationGreater": "초과",
        "dxDataGrid-filterRowOperationGreaterOrEquals": "이상",
        "dxDataGrid-filterRowOperationStartsWith": "~로 시작",
        "dxDataGrid-filterRowOperationContains": "포함",
        "dxDataGrid-filterRowOperationNotContains": "미포함",
        "dxDataGrid-filterRowOperationEndsWith": "~로 끝남",
        "dxDataGrid-filterRowOperationBetween": "사이에",
        "dxDataGrid-filterRowOperationBetweenStartText": "시작",
        "dxDataGrid-filterRowOperationBetweenEndText": "끝",
        "dxDataGrid-sortingAscendingText": "오름차순",
        "dxDataGrid-sortingDescendingText": "내림차순",        
        "dxDataGrid-sortingClearText": "정렬 취소",
        "Cancel": "취소",
    }
})