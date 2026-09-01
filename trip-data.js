/*
 * ベトナム旅行 2026 の表示データ
 * 必須タブ: itinerary（旅程）, packing（持ち物）, links（リンク先）
 */
window.TRIP_DATA = {
  id: "vietnam-trip-2026",
  storageKeyPrefix: "trip-vietnam-2026",

  meta: {
    documentTitle: "ベトナムのしおり'26",
    badge: "VIETNAM TRIP 2026",
    badgeIcon: "fa-solid fa-star",
    title: "ベトナムのしおり'26",
    dates: "2026年10月6日(火) 〜 10月16日(金)・11日間",
    subtitle: "東京 → メコンデルタ → フーコック島 → ホーチミン → 東京",
    appIcon: "assets/apple-touch-icon.png",
    heroImage: "",
    heroAlt: "",
    footerTitle: "ベトナムのしおり'26",
    footerText: "地域の違いを楽しみながら、疲れすぎない旅を。"
  },

  theme: {
    main: "#DA251D",
    dark: "#B71C1C",
    deep: "#64100C",
    navy: "#3D0A07",
    light: "#FFF6EF",
    accent: "#E7A900",
    yellow: "#FFDE00"
  },

  tabs: [
    { id: "itinerary", label: "旅程", icon: "fa-solid fa-calendar-days", enabled: true, required: true },
    { id: "packing", label: "持ち物", icon: "fa-solid fa-suitcase", enabled: true, required: true },
    { id: "links", label: "リンク先", icon: "fa-solid fa-link", enabled: true, required: true },
    { id: "escape", label: "雨天・緊急", icon: "fa-solid fa-umbrella", enabled: false },
    { id: "ai", label: "AIお守り", icon: "fa-solid fa-robot", enabled: false }
  ],

  itinerary: {
    days: [
      {
        id: "day1", quickLabel: "✈️ 10/6", label: "第1日", date: "10月6日（火）",
        title: "成田 → ホーチミン → カントー", summary: "移動日", summaryIcon: "fa-solid fa-plane",
        items: [
          { id: "d1-wakeup", time: "05:00", title: "起床", description: "" },
          { id: "d1-home-departure", time: "06:00", title: "自宅 出発", description: "" },
          { id: "d1-keisei-ueno", time: "06:20", title: "京成上野 発", description: "" },
          { id: "d1-airport-terminal2", time: "07:05", title: "空港第2ビル 着", description: "ベトジェットは第2ターミナル。" },
          { id: "d1-checkin", time: "07:30", title: "チェックイン", description: "" }
        ]
      },
      {
        id: "day2", quickLabel: "🛶 10/7", label: "第2日", date: "10月7日（水）",
        title: "カントー → チャウドック", summary: "水上マーケット", summaryIcon: "fa-solid fa-water",
        items: [
          { id: "d2-01", time: "04:30", badge: "早起き", title: "起床・04:45ロビー集合", description: "05:00にニンキウ埠頭へ。" },
          { id: "d2-02", time: "05:00頃", badge: "小型船", highlight: true, title: "カイラン水上マーケットへ出航", description: "大型ツアーではなく、可能なら小型船・少人数または貸切を利用。" },
          { id: "d2-03", time: "05:30～07:00", badge: "最優先", highlight: true, title: "カイラン水上マーケット見学", description: "商取引と早朝の雰囲気を楽しむ。06:00頃に船上で麺類とベトナムコーヒーの朝食。" },
          { id: "d2-04", time: "07:45頃", badge: "帰着", title: "ニンキウ埠頭へ戻る", description: "08:00～09:15はホテルでシャワー・休憩。" },
          { id: "d2-05", time: "09:30～10:30", badge: "街歩き", title: "ニンキウ周辺を散策", description: "10:30頃にオン寺等を見学。" },
          { id: "d2-06", time: "10:45～11:45", badge: "昼食", title: "カントーで昼食", description: "食後はホテルへ戻り荷物を回収。" },
          { id: "d2-07", time: "12:20頃", badge: "移動", title: "バスターミナルへ", description: "Grab等を利用。" },
          { id: "d2-08", time: "13:00頃", badge: "時刻要確認", highlight: true, title: "カントー発", description: "チャウドック行きバス／リムジン。正式な便と乗場は出発1～2週間前に再確認。" },
          { id: "d2-09", time: "16:30頃", badge: "到着", title: "チャウドック着・ホテルへ", description: "17:00頃、Chau Pho Hotel（第一候補）にチェックイン。" },
          { id: "d2-10", time: "17:30～19:30", badge: "散策・夕食", title: "川沿い・市場周辺と夕食", description: "軽く散策後に夕食。20:00頃ホテル帰着、22:00頃就寝。" }
        ]
      },
      {
        id: "day3", quickLabel: "🕌 10/8", label: "第3日", date: "10月8日（木）",
        title: "チャウドック → ハティエン", summary: "民族・宗教文化", summaryIcon: "fa-solid fa-mosque",
        items: [
          { id: "d3-01", time: "06:30～08:00", badge: "朝の市場", title: "起床・チャウドック市場", description: "07:00ホテル出発。07:10～08:00市場、07:20頃に周辺で朝食。ブンカー・チャウドック候補。" },
          { id: "d3-02", time: "08:15頃", badge: "優先観光", title: "チャム族集落方面へ出発", description: "ホテル等へは「Cham village + mosque. No fish farm.」と伝える。" },
          { id: "d3-03", time: "08:30～11:00", badge: "最優先", highlight: true, title: "チャム族集落・モスク散策", description: "集落、モスク、高床式住居、イスラム文化、ローカルな暮らしを見る。魚の養殖施設には行かない。" },
          { id: "d3-04", time: "11:30～14:00", badge: "昼食・休憩", title: "昼食後、ホテルで休憩", description: "11:15頃市街へ戻り、11:30～12:30昼食、12:30～14:00休憩。" },
          { id: "d3-05", time: "14:15～16:15", badge: "山麓のみ", highlight: true, title: "サム山麓の寺院・宗教施設巡り", description: "Ba Chua Xu Temple、Tay An Pagoda、Thoai Ngoc Hau Tomb候補。登山とトラスー水没林は行かない。" },
          { id: "d3-06", time: "16:30頃", badge: "荷物回収", title: "ホテル帰着", description: "荷物を回収して移動準備。" },
          { id: "d3-07", time: "17:00頃", badge: "専用車", highlight: true, title: "ハティエンへ出発", description: "公共バスの時間に縛られないよう専用車を利用。" },
          { id: "d3-08", time: "19:15～19:45頃", badge: "到着", title: "ハティエン着・チェックイン", description: "Ha Tien Hanh Phuc Hotel（第一候補）。港へのアクセス、個室、清潔さを優先。" },
          { id: "d3-09", time: "20:15～21:00", badge: "夜市", title: "ハティエン夜市・夕食", description: "21:15頃ホテルへ。" }
        ]
      },
      {
        id: "day4", quickLabel: "🏝️ 10/9", label: "第4日", date: "10月9日（金）",
        title: "ハティエン → フーコック島", summary: "リゾートへ", summaryIcon: "fa-solid fa-ship",
        items: [
          { id: "d4-wakeup", time: "08:00", title: "起床", description: "" },
          { id: "d4-hatien-arrival", time: "09:30", title: "ハティエン港 着", description: "" },
          { id: "d4-hatien-departure", time: "10:20", title: "ハティエン港 発", description: "" },
          { id: "d4-baivong-arrival", time: "12:00", title: "Bãi Vòng港 着", description: "" }
        ]
      },
      {
        id: "day5", quickLabel: "🌅 10/10", label: "第5日", date: "10月10日（土）",
        title: "フーコック島", summary: "休息日", summaryIcon: "fa-solid fa-umbrella-beach",
        items: [
          { id: "d5-01", time: "08:00～09:30", badge: "ゆっくり", title: "朝食", description: "時間をかけて朝食。" },
          { id: "d5-02", time: "09:30～14:30", badge: "完全自由", highlight: true, title: "ホテルで休息", description: "プール、ビーチ、昼寝、ホテル内散策。" },
          { id: "d5-03", time: "15:00頃", badge: "街へ", title: "ズオンドンへ移動", description: "タクシー等を利用。" },
          { id: "d5-04", time: "15:30～16:00", badge: "寺院", title: "ディンカウ寺院", description: "港、海沿い、街歩きと合わせて楽しむ。" },
          { id: "d5-05", time: "16:00～18:00", badge: "散歩・夕日", title: "港・街・海沿い散歩とサンセット", description: "17:15～18:00頃に夕日。" },
          { id: "d5-06", time: "18:00～20:00", badge: "夜市", highlight: true, title: "フーコック・ナイトマーケット", description: "シーフード、軽食、ローカルフードを複数店で少しずつ。" },
          { id: "d5-07", time: "20:30頃", badge: "ホテル", title: "SOL帰着", description: "雨天時は無理に街へ出ずホテル滞在へ変更。" }
        ]
      },
      {
        id: "day6", quickLabel: "✈️ 10/11", label: "第6日", date: "10月11日（日）",
        title: "フーコック島 → ホーチミン", summary: "便未定", summaryIcon: "fa-solid fa-plane-departure",
        items: [
          { id: "d6-01", time: "08:00～12:00", badge: "最終朝", title: "朝食・プール・ビーチ", description: "フーコック最終日も午前はゆっくり過ごす。" },
          { id: "d6-02", time: "12:00～16:00頃", badge: "ホテル", title: "チェックアウト・昼食・休憩", description: "荷物を預け、レイトチェックアウトまたはシャワー利用可否を事前確認。" },
          { id: "d6-03", time: "フライト約2時間前", badge: "空港へ", title: "ホテル出発", description: "着替えと荷物回収を済ませる。" },
          { id: "d6-04", time: "17:30～20:00頃【未定】", badge: "便未定", highlight: true, title: "フーコック発", description: "直行便、可能なら19時前後発を希望。" },
          { id: "d6-05", time: "21:00～22:30頃", badge: "ホーチミン", title: "Mai Houseチェックイン", description: "空港からGrab等でホテルへ。" }
        ]
      },
      {
        id: "day7", quickLabel: "🏛️ 10/12", label: "第7日", date: "10月12日（月）",
        title: "ホーチミン：戦争史と中心街", summary: "歴史・街歩き", summaryIcon: "fa-solid fa-landmark",
        items: [
          { id: "d7-01", time: "07:00～07:45", badge: "朝食", title: "ホテル出発・バインミー", description: "Bánh Mì Hồng Hoaを第一候補。雰囲気より味、地元客と回転の良さを優先。" },
          { id: "d7-02", time: "08:15～09:45", badge: "最優先", highlight: true, title: "戦争証跡博物館", description: "ベトナム戦争関連では最優先。" },
          { id: "d7-03", time: "10:15～11:45", badge: "歴史", highlight: true, title: "統一会堂", description: "サイゴン陥落の歴史的舞台。歴史系は基本この2か所。" },
          { id: "d7-04", time: "12:00～15:30", badge: "昼食・休憩", title: "昼食後、Mai Houseで休憩", description: "午後に備えてしっかり休む。" },
          { id: "d7-05", time: "16:00～17:30", badge: "中心街", title: "中央郵便局・ブックストリート・ドンコイ通り", description: "中心街を散策。" },
          { id: "d7-06", time: "17:30～18:00", badge: "散歩", title: "グエンフエ通り周辺", description: "夕食前の街歩き。" },
          { id: "d7-07", time: "18:30～20:00", badge: "食べ歩き", highlight: true, title: "ホーティーキー・フードストリート", description: "串物、麺、肉料理、シーフード、デザートなどを2～4軒で楽しむ。" },
          { id: "d7-08", time: "20:30頃", badge: "ホテル", title: "ホテル帰着", description: "休息。" }
        ]
      },
      {
        id: "day8", quickLabel: "🛍️ 10/13", label: "第8日", date: "10月13日（火）",
        title: "ホーチミン：チョロンと市場", summary: "市場・ローカル", summaryIcon: "fa-solid fa-store",
        items: [
          { id: "d8-01", time: "06:45～07:30", badge: "朝食", title: "Phở Minhでフォー", description: "南部ベトナムらしいフォーを朝食で。" },
          { id: "d8-02", time: "08:15～09:45", badge: "市場", highlight: true, title: "ビンタイ市場", description: "卸売と地元商業の雰囲気を楽しむ。" },
          { id: "d8-03", time: "10:00～10:45", badge: "寺院", title: "ティエンハウ寺", description: "チョロンの華人文化を感じる。" },
          { id: "d8-04", time: "10:45～13:00", badge: "街歩き・昼食", title: "チョロンの路地・商店街", description: "12:00～13:00はローカル食堂で昼食。" },
          { id: "d8-05", time: "13:30～15:30", badge: "休憩", title: "ホテルで休憩", description: "午後に備える。" },
          { id: "d8-06", time: "16:15～17:00", badge: "省略可", title: "タンディン市場", description: "疲れていれば省略してよい。" },
          { id: "d8-07", time: "17:10～18:15", badge: "夕食", highlight: true, title: "Bánh Xèo 46A", description: "バインセオを食べる。" },
          { id: "d8-08", time: "18:30～20:00頃", badge: "カフェ", title: "カフェ後、ホテル帰着", description: "18:30～19:15頃カフェ。" }
        ]
      },
      {
        id: "day9", quickLabel: "☕ 10/14", label: "第9日", date: "10月14日（水）",
        title: "ホーチミン：余白日", summary: "ゆっくり", summaryIcon: "fa-solid fa-mug-hot",
        items: [
          { id: "d9-01", time: "07:30～08:30", badge: "ゆっくり", title: "朝食", description: "余白日として無理をしない。" },
          { id: "d9-02", time: "09:00～10:30", badge: "市場・路地", title: "Bàn Cờ市場と周辺散策", description: "10:30～11:00にベトナムコーヒー。" },
          { id: "d9-03", time: "11:30～15:30", badge: "昼食・休憩", title: "昼食後、ホテルで休憩", description: "13:00～15:30は休む。" },
          { id: "d9-04", time: "16:00～17:30", badge: "散歩・カフェ", title: "Turtle Lake周辺", description: "16:30～17:30はカフェ。" },
          { id: "d9-05", time: "18:00～19:15", badge: "夕食", title: "夕食", description: "Quán Ăn Cô Liêng候補。Bò lá lốt（牛肉の葉包み炭火焼き）。" },
          { id: "d9-06", time: "19:30頃", badge: "予備日", title: "ホテル帰着", description: "行けなかった場所、再訪、雨天延期分への差し替え可。疲れていればホテル滞在。" }
        ]
      },
      {
        id: "day10", quickLabel: "🎁 10/15", label: "第10日", date: "10月15日（木）",
        title: "ホーチミン → 成田", summary: "お土産・帰国", summaryIcon: "fa-solid fa-gift",
        items: [
          { id: "d10-01", time: "07:30～09:00", badge: "最終朝", title: "朝食・チェックアウト", description: "荷物をMai Houseに預ける。" },
          { id: "d10-02", time: "09:30～10:45", badge: "お土産", title: "ベンタイン市場", description: "雑貨、Tシャツ、ベトナムらしい小物。言い値で即決せず複数店を比較。" },
          { id: "d10-03", time: "11:00～11:45", badge: "チョコレート", title: "Maison Marou", description: "ベトナム産チョコレート、配り土産候補。" },
          { id: "d10-04", time: "12:00～14:00", badge: "昼食・雑貨", title: "昼食・Saigon Kitsch等", description: "デザイン雑貨や現代的なベトナム土産。" },
          { id: "d10-05", time: "14:15～16:30", badge: "買い物", title: "Saigon Centre／高島屋・コーヒー", description: "食品、足りない土産、ベトナムコーヒーを購入。" },
          { id: "d10-06", time: "16:30～18:30", badge: "予備・夕食", title: "予備時間と最後の夕食", description: "17:30～18:30に食べ納め。" },
          { id: "d10-07", time: "19:00～20:00", badge: "出発準備", title: "Mai Houseへ戻る", description: "荷造り・着替え。" },
          { id: "d10-08", time: "20:15～20:30頃", badge: "空港へ", title: "ホテル発", description: "21:15頃タンソンニャット国際空港着。チェックイン・出国手続き。" },
          { id: "d10-09", time: "23:55", badge: "国際線", highlight: true, title: "ホーチミン発", description: "成田へ。" }
        ]
      },
      {
        id: "day11", quickLabel: "🏠 10/16", label: "第11日", date: "10月16日（金）",
        title: "成田着", summary: "帰宅", summaryIcon: "fa-solid fa-house",
        items: [
          { id: "d11-01", time: "07:20", badge: "到着", highlight: true, title: "成田空港着", description: "入国・荷物受取後、帰宅。" }
        ]
      }
    ]
  },

  packing: {
    title: "持ち物チェックリスト（10月のベトナム周遊版）",
    intro: "飛行機・専用車・バス・高速船を使う11日間を想定しています。チェック状態はこの端末のブラウザに保存されます。",
    allowCustomItems: true,
    categories: [
      { id: "essential", title: "基本・貴重品", icon: "fa-solid fa-passport", items: [
        { id: "passport", text: "パスポート・有効期限の確認" },
        { id: "tickets", text: "航空券・ホテル・移動予約の控え" },
        { id: "insurance", text: "海外旅行保険の情報" },
        { id: "money", text: "現金・クレジットカード（分散して保管）" },
        { id: "copies", text: "パスポート等の控え（紙・安全な保存先）" }
      ]},
      { id: "digital", title: "スマホ・通信", icon: "fa-solid fa-mobile-screen-button", items: [
        { id: "phone", text: "スマートフォン" },
        { id: "charger", text: "充電器・ケーブル" },
        { id: "battery", text: "モバイルバッテリー（預け荷物に入れない）" },
        { id: "sim", text: "eSIM／SIM・海外通信の準備" },
        { id: "adapter", text: "変換プラグ（使う機器に必要な場合）" },
        { id: "offline", text: "地図・予約情報のオフライン保存" }
      ]},
      { id: "weather", title: "暑さ・雨・虫対策", icon: "fa-solid fa-cloud-sun-rain", items: [
        { id: "umbrella", text: "折りたたみ傘・軽いレインコート" },
        { id: "quickdry", text: "乾きやすい服・替えの下着と靴下" },
        { id: "sun", text: "帽子・日焼け止め・サングラス" },
        { id: "bug", text: "虫よけ" },
        { id: "towel", text: "ハンカチ・汗拭きタオル" },
        { id: "bag", text: "濡れ物用の袋・防水ポーチ" }
      ]},
      { id: "health", title: "体調管理", icon: "fa-solid fa-kit-medical", items: [
        { id: "medicine", text: "常備薬・処方薬" },
        { id: "stomach", text: "胃腸薬・整腸薬" },
        { id: "seasick", text: "酔い止め（高速船・車移動用）" },
        { id: "mask", text: "マスク・ウェットティッシュ・消毒用品" },
        { id: "water", text: "携帯用の水分補給ボトル" }
      ]},
      { id: "clothes", title: "服・ホテル・海", icon: "fa-solid fa-shirt", items: [
        { id: "light", text: "薄手の羽織り（冷房対策）" },
        { id: "shoes", text: "歩きやすい靴" },
        { id: "sandals", text: "サンダル" },
        { id: "swim", text: "水着・ラッシュガード" },
        { id: "laundry", text: "小分け洗剤・洗濯袋" },
        { id: "toiletries", text: "洗面用品・スキンケア" }
      ]},
      { id: "transport", title: "移動前に確認", icon: "fa-solid fa-route", items: [
        { id: "transfer", text: "10/6 空港→カントー専用車の予約" },
        { id: "bus", text: "カントー→チャウドックの便・乗場" },
        { id: "car", text: "チャウドック→ハティエン専用車の予約" },
        { id: "ferry", text: "10/9 高速船の正式ダイヤ・料金・港・締切" },
        { id: "flight", text: "10/11 フーコック→ホーチミン便" }
      ]}
    ]
  },

  links: {
    title: "リンク先一覧",
    intro: "リンク先は未確定です。店名・施設名とURLが決まったら追加できます。URLがない項目も表示できます。",
    categories: [
      { id: "undecided", label: "未登録", icon: "📝", groups: [
        { label: "これから追加", items: [
          { name: "店名・施設名・予約先のリンク", note: "現在はURL未定", url: "" }
        ]}
      ]}
    ]
  }
};
