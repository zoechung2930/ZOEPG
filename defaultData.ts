import { TripData, EventType } from './types';

export const DEFAULT_TRIP_DATA: TripData = {
  itinerary: [
    {
      "date": "3/26 (三)",
      "weatherInfo": "晴朗炎熱，約 28°C",
      "events": [
        {
          "id": "e1",
          "type": EventType.TRANSPORT,
          "time": "14:00 - 16:50",
          "title": "桃園機場 (TPE) - 富國島機場 (PQC)",
          "location": "Phu Quoc International Airport",
          "description": "越捷航空",
          "highlightTags": []
        },
        {
          "id": "e2",
          "type": EventType.TRANSPORT,
          "time": "17:30",
          "title": "搭乘 VinBus 17 前往 Grand World",
          "location": "Grand World Phu Quoc",
          "description": "機場站搭車到 Grand World 下車，步行 50m 到飯店。",
          "guideTips": "VinBus 是富國島非常方便的免費巴士，車上有冷氣且舒適。",
          "highlightTags": ["Free Bus"]
        },
        {
          "id": "e3",
          "type": EventType.ACCOMMODATION,
          "time": "18:30",
          "title": "入住: 201 Freya Retreat",
          "location": "201 Freya Retreat",
          "description": "中區住宿",
          "highlightTags": []
        },
        {
          "id": "e4",
          "type": EventType.ATTRACTION,
          "time": "19:00",
          "title": "富國大世界 (Grand World)",
          "location": "Grand World Phu Quoc",
          "description": "貢多拉船水上威尼斯。KKday 訂票：大人 240 元，小孩 180 元。",
          "guideTips": "被稱為『不夜城』，晚上的威尼斯運河燈光秀非常迷人，必看！",
          "highlightTags": ["Must See", "KKday"]
        }
      ]
    },
    {
      "date": "3/27 (四)",
      "weatherInfo": "晴朗，約 29°C",
      "events": [
        {
          "id": "e5",
          "type": EventType.TRANSPORT,
          "time": "09:00",
          "title": "搭乘 VinBus V1 前往 VinWonders",
          "location": "VinWonders Phu Quoc",
          "description": "Grand World 搭車到 Vinwonder 下車",
          "guideTips": "建議早點出發，避開人潮。",
          "highlightTags": ["Free Bus"]
        },
        {
          "id": "e6",
          "type": EventType.ATTRACTION,
          "time": "09:30 - 18:00",
          "title": "珍珠奇幻樂園 (VinWonders)",
          "location": "VinWonders Phu Quoc",
          "description": "使用 2 日套票 (樂園+野生動物園+遊園車+Grab券)。",
          "guideTips": "巨型海龜水族館是必打卡的地標，造型非常壯觀！",
          "highlightTags": ["KKday", "2-Day Pass"]
        },
        {
          "id": "e7",
          "type": EventType.ACCOMMODATION,
          "time": "Night",
          "title": "住宿: 201 Freya Retreat",
          "location": "201 Freya Retreat",
          "description": "續住",
          "highlightTags": []
        }
      ]
    },
    {
      "date": "3/28 (五)",
      "weatherInfo": "晴時多雲，約 30°C",
      "events": [
        {
          "id": "e8",
          "type": EventType.OTHER,
          "time": "08:30",
          "title": "辦理退房 & 寄放行李",
          "location": "201 Freya Retreat",
          "description": "行李暫放飯店",
          "highlightTags": []
        },
        {
          "id": "e9",
          "type": EventType.ATTRACTION,
          "time": "09:00 - 15:00",
          "title": "珍珠野生動物園 (Vinpearl Safari)",
          "location": "Vinpearl Safari Phu Quoc",
          "description": "搭 VinBus V1 前往。野生動物園遊園車。",
          "guideTips": "這裡有獨特的『長頸鹿餐廳』，可以一邊用餐一邊餵食長頸鹿，非常受歡迎！",
          "highlightTags": ["Must Eat", "Giraffe Restaurant"]
        },
        {
          "id": "e10",
          "type": EventType.TRANSPORT,
          "time": "15:30",
          "title": "返回取行李 & 移動至陽東",
          "location": "Duong Dong",
          "description": "Safari -> Grand World 取行李 -> Grab/Bus 17 到 Duong Dong -> 步行/車到 Philip Bungalow",
          "highlightTags": []
        },
        {
          "id": "e11",
          "type": EventType.ACCOMMODATION,
          "time": "17:00",
          "title": "入住: Philip Bungalow",
          "location": "Philip Bungalow Phu Quoc",
          "description": "位於陽東市區附近",
          "highlightTags": []
        }
      ]
    },
    {
      "date": "3/29 (六)",
      "weatherInfo": "晴朗，約 29°C",
      "events": [
        {
          "id": "e12",
          "type": EventType.TRANSPORT,
          "time": "08:30",
          "title": "搭乘 Grab 前往南區",
          "location": "Sun World Hon Thom Nature Park",
          "description": "前往太陽世界",
          "highlightTags": []
        },
        {
          "id": "e13",
          "type": EventType.ATTRACTION,
          "time": "09:30",
          "title": "太陽世界跨海纜車",
          "location": "Hon Thom Cable Car Station",
          "description": "世界最長跨海纜車。營運時間: 09:30~11:30, 13:30~14:30, 15:30~17:00",
          "guideTips": "纜車上海景絕美，360度俯瞰海景，是富國島最經典的體驗之一。",
          "highlightTags": ["Must See", "Cable Car"]
        },
        {
          "id": "e14",
          "type": EventType.ATTRACTION,
          "time": "11:00",
          "title": "Aquatopia 水上樂園 & 自助午餐",
          "location": "Aquatopia Water Park",
          "description": "Buffet Mango 用餐 (11:00-14:30)。水上樂園遊玩。",
          "guideTips": "Mango 餐廳菜色豐富，玩累了剛好大吃一頓。",
          "highlightTags": ["Buffet"]
        },
        {
          "id": "e15",
          "type": EventType.ATTRACTION,
          "time": "16:00",
          "title": "日落小鎮 & 接吻橋 (Kiss Bridge)",
          "location": "Kiss Bridge Vietnam",
          "description": "接吻橋入場。逛日落小鎮。",
          "guideTips": "日落時分在接吻橋拍照最美，充滿浪漫氛圍。",
          "highlightTags": ["Sunset", "Photo Spot"]
        },
        {
          "id": "e16",
          "type": EventType.TRANSPORT,
          "time": "Night",
          "title": "返回住宿",
          "location": "Philip Bungalow",
          "description": "搭 Grab 回 Philip Bungalow",
          "highlightTags": []
        }
      ]
    },
    {
      "date": "3/30 (日)",
      "weatherInfo": "晴朗，約 28°C",
      "events": [
        {
          "id": "e17",
          "type": EventType.TRANSPORT,
          "time": "06:00",
          "title": "搭乘 Grab 前往機場",
          "location": "Phu Quoc International Airport",
          "description": "準備搭機返台",
          "highlightTags": []
        },
        {
          "id": "e18",
          "type": EventType.TRANSPORT,
          "time": "08:20 - 13:00",
          "title": "富國島機場 (PQC) - 桃園機場 (TPE)",
          "location": "Taoyuan International Airport",
          "description": "越捷航空",
          "highlightTags": []
        }
      ]
    }
  ],
  "flights": [
    { "route": "TPE~PQC", "time": "3/26 14:00 - 16:50", "number": "VJ" },
    { "route": "PQC~TPE", "time": "3/30 08:20 - 13:00", "number": "VJ" }
  ],
  "hotels": [
    { "name": "201 Freya Retreat", "address": "Grand World Area", "dates": "3/26 - 3/28", "note": "中區 / Grand World 步行 1 min" },
    { "name": "Philip Bungalow", "address": "Duong Dong", "dates": "3/28 - 3/30", "note": "北區轉中區 / 離夜市較近" }
  ],
  "budget": [
    { "category": "機票", "description": "大姊 (含託運)", "amount": 17823, "currency": "TWD" },
    { "category": "機票", "description": "淇淇一家 (含託運)", "amount": 62848, "currency": "TWD" },
    { "category": "住宿", "description": "201 Freya Retreat (2晚)", "amount": 2266, "currency": "TWD" },
    { "category": "住宿", "description": "Philip Bungalow (2晚)", "amount": 2775, "currency": "TWD" },
    { "category": "門票", "description": "貢多拉船 (大人x3 小孩x2)", "amount": 1080, "currency": "TWD" },
    { "category": "門票", "description": "珍珠奇幻+Safari套票 (大人x3 小孩x2)", "amount": 8882, "currency": "TWD" },
    { "category": "門票", "description": "纜車+水樂園套票 (大人x3 小孩x2)", "amount": 4791, "currency": "TWD" }
  ],
  "shoppingList": [
    { "id": "s1", "name": "山竹", "checked": false, "note": "水果" },
    { "id": "s2", "name": "酪梨冰沙", "checked": false, "note": "必喝" },
    { "id": "s3", "name": "雨傘/雨衣", "checked": false, "note": "必備" },
    { "id": "s4", "name": "美金", "checked": false, "note": "換匯用" }
  ],
  "emergencyContacts": [
    { "name": "警察局", "number": "113" },
    { "name": "救護車", "number": "115" },
    { "name": "外交部緊急聯絡", "number": "+84-913-219-986" }
  ]
};