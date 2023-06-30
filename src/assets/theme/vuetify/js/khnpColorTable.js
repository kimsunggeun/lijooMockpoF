export default {
  icons: {
    iconfont: 'mdi',
    values: {
      copy: 'mdi-content-copy', //20220509 LYJ 추가
      mail: 'mdi-email',
      person: 'mdi-account',
      setting: 'mdi-cog',
      lock: 'mdi-lock',
      dashboard: 'mdi-view-dashboard',
      monitor: 'mdi-monitor',
      data_search: 'mdi-database-search',
      info: 'mdi-information',
      tool: 'mdi-tools',
      tag: 'mdi-tag-multiple',
      user: 'mdi-account-circle',
      alarm: 'mdi-alarm-light-outline',
      play: 'mdi-play',
      calendar: 'mdi-calendar-today',
      search: 'mdi-magnify',
      save: 'mdi-content-save',
      delete: 'mdi-delete',
      welding: 'mdi-mace',
      camera: 'mdi-camera',
      data: 'mdi-database',
      graph: 'mdi-chart-line',
      excel: 'mdi-file-download-outline',
      arrow_r: 'mdi-chevron-right',
      arrow_d: 'mdi-chevron-down',
      close: 'mdi-close',
      electric_current: 'mdi-resistor',
      voltage: 'mdi-speedometer',
      gas: 'mdi-gas-cylinder',
      heart: 'mdi-heart',
      share: 'mdi-share-variant',
      on_eye: 'mdi-eye',
      off_eye: 'mdi-eye-off',
      list: 'mdi-view-list',
      reload: 'mdi-reload',
      pencil: 'mdi-pencil',
      upload: 'mdi-upload',
      print: 'mdi-printer',
      apply: 'mdi-check-underline'
    }
  },
  theme: {
    themes: {
      light: {
        primary: '#007CDC',         // 메인 버튼, 액티브
        secondary: '#38761d',       // 서브 버튼
        third: '#90CAF9',           //
        accent: '#0036DC',          // 강조 
        info: '#4DB6AC',            // 정보, 알림
        success: '#4caf50',         // 성공
        error: '#F44336',           // 실패, 오류
        warning: '#ff9800',         // 주의

        // text color
        app_bar_title: '#000000',   // app bar, tool bar
        app_bar_title_w: '#FFFFFF',// app bar, tool bar white
        nav_title: '#2A2A2A',       // navigation drawer title
        menu_title: '#2A2A2A',      // menu title
        list_title: '#2A2A2A',      // list title
        card_title: '#222',      // card title
        sub_title: '#757575',       // sub title
        content: '#2f323a',         // content, card text
        footer_title: '#333333', // app bar, tool bar

        // background color
        app_bar_bg: '#FFFFFF', // app bar, tool bar
        menu_active_bg: '#FFFFFF',
        footer_bg: '#f5f5f5', // app bar, tool bar
        nav_bg: '#007CDC', // navigation drawer
        menu_top_bg: '#e5f2fb', // menu
        btn_bg: '#9E9E9E', // 버튼
        condition_bg: '#ECEDF3', //조회조건
        menu_bg: '#f5f5f5', // 메뉴
        side_menu_bg: '#FFFFFF', // 사이드 메뉴
        side_menu_title_bg: '#124786',
        iframe_title_bg: '#d7e3f1',
        iframe_bg: '#FFFFFF',

        inner_active_menu: '#757575', //menu text
        tabview_bg: '#cccccc', //tabviewbg //2022-03-17 by lyj tabview테마적용22
        tabview_active_text: '#007CDC',
        tabview_text: '#007CDC',
        list_bg: '#FFFFFF', // list, list group
        container_bg: '#FFFFFF', // container
        login_bg: '#3b5e93', // login main color
        login_container_bg: '#f7f7f7', // login container
        card_bg: '#F2F2F2', // card
        sub_card_bg: '#e5f2fb',// sub card
        card_title_bg: '#cbd1d5', // card title
        card_alarm_bg: '#e5f2fb', // card alarm_bg 용접 이상 정보 (알람당일)
        tabs_bg: '#D9D9D9', // tabs bg

        devest_grid_reqheader: '#0000ff' // 그리드 헤더 필수 입력일 경우 색상 표시
      }
    }
  }
}
