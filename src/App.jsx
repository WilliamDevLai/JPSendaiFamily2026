import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Info, Sun, CloudRain, 
  Wallet, Plus, Users, Utensils, Train, Ticket, 
  Heart, Home, Cloud, Receipt, Navigation, 
  Briefcase, AlertCircle, CheckCircle2, Circle, Gift
} from 'lucide-react';

// --- 行程資料 ---
const itinerary = [
  {
    day: "Day 1",
    date: "6/18 (四)",
    title: "啟程與仙台東口黃金生活圈補給",
    location: "仙台",
    intro: "第一天輕鬆為主，讓長輩與孕婦有充足的休息時間，用熱騰騰的牛舌開啟完美旅程！",
    banner: "https://github.com/user-attachments/assets/195435c9-887a-48c3-b346-356bb63c055a", 
    schedule: [
      { time: "16:00", event: "星宇航空降落仙台機場，辦理出關", icon: <Sun size={18} />, mapQuery: "仙台機場" },
      { time: "16:40", event: "前往機場鐵道車站。自動售票機現金購買實體交通卡(icsca/Suica)並幫每人儲值 10,000 日圓", icon: <Wallet size={18} /> },
      { time: "16:42 - 17:07", event: "搭乘【仙台機場線】直達仙台車站（車程約 25 分鐘）", icon: <Train size={18} /> },
      { time: "17:30", event: "抵達仙台車站，平地推行李步行 4 分鐘辦理 Check-in。晚上過馬路衝進 Yodobashi 3 樓【LOPIA 超市】，現金爆買水果與壽司熟食", icon: <Utensils size={18} />, mapQuery: "LOPIA 仙台ヨドバシ店" },
      { time: "晚上", event: "入住【Hotel Vista 仙台】（東口・連住第 1 晚），回房享用宵夜水果並休息", icon: <Home size={18} />, mapQuery: "ホテルビスタ仙台" }
    ]
  },
  {
    day: "Day 2",
    date: "6/19 (五)",
    title: "水族館 ➡️ 鹽釜熟食 ➡️ 松島逆向遊湖",
    location: "水族館、鹽釜、松島",
    intro: "全天搭 JR 仙石線單向推進不走回頭路，完美避開松島排隊修羅場。",
    banner: "https://github.com/user-attachments/assets/fb2aaaa8-e41f-41fe-9faf-d7760199bdfc",
    schedule: [
      { time: "08:30", event: "輕鬆出發：全家從仙台站東口搭乘【JR 仙石線】往石卷方向", icon: <Train size={18} />, mapQuery: "仙台駅" },
      { time: "09:30 - 11:30", event: "【仙台海洋森林水族館】中野榮站出站搭接駁車(5分)直達。早鳥人少，全室內平地看企鵝與海豚表演", icon: <Heart size={18} />, mapQuery: "仙台うみの杜水族館" },
      { time: "11:30 - 12:05", event: "搭計程車回中野榮站，繼續搭 JR 仙石線抵達【本鹽釜站】(12分)", icon: <Train size={18} />, mapQuery: "本塩釜駅" },
      { time: "12:15 - 13:30", event: "【午餐：鹽釜港口大樓】平路走 5 分鐘抵達。享用現烤牡蠣定食、酥炸海鮮天婦羅等 100% 熟食，看海港窗景", icon: <Utensils size={18} />, mapQuery: "マリンゲート塩釜" },
      { time: "14:00 - 14:50", event: "【松島灣逆向遊覽船】同棟大樓買票上船。避開團客，全家鎖定窗邊沙發座舒服吹冷氣，看奇岩絕景", icon: <Ticket size={18} />, mapQuery: "丸文松島汽船" },
      { time: "15:00 - 16:30", event: "【松島海岸精華散步】下船秒進景區，參拜【五大堂】。帶孕婦長輩去【洗心庵】吃烤團子下午茶歇腳", icon: <MapPin size={18} />, mapQuery: "五大堂" },
      { time: "16:45", event: "從平坦的松島海岸站搭乘 JR 仙石線直達順向返回仙台站", icon: <Train size={18} />, mapQuery: "松島海岸駅" },
      { time: "17:45", event: "【晚餐】開箱全熟、外脆內多汁的頂級炭烤厚切牛舌定食，100% 熟食安全美味", icon: <Utensils size={18} /> }
    ]
  },
  {
    day: "Day 3",
    date: "6/20 (六)",
    title: "無重力盛岡古都大正浪漫與黑毛和牛",
    location: "盛岡",
    intro: "採取無重力行李調度與「東端起點、逆向西行」戰略，景點物理融合免回頭路。",
    banner: "https://github.com/user-attachments/assets/28942bfa-3a12-4d82-bf27-9bf23eb26360",
    schedule: [
      { time: "08:30", event: "無重力退房：大行李直接寄放飯店前台。全家空手只帶隨身輕便小包出發", icon: <Briefcase size={18} /> },
      { time: "09:54 - 10:33", event: "搭乘【新幹線 Hayabusa 13號】飛快抵達盛岡，免去拖拉行李的狼狽", icon: <Train size={18} />, mapQuery: "盛岡駅" },
      { time: "10:40 - 11:45", event: "【盛岡八幡宮】車站搭計程車一氣呵成拉到市區最東端。平坦參拜、玩「鯛魚開運籤」", icon: <Heart size={18} />, mapQuery: "盛岡八幡宮" },
      { time: "12:00 - 13:30", event: "【午餐與參拜物理融合】長輩在【櫻山神社】樹下休息，您排隊【白龍本店】吃熱騰騰炸醬麵與雞蛋味噌湯", icon: <Utensils size={18} />, mapQuery: "白龍 本店" },
      { time: "14:15 - 15:00", event: "漫步櫻山商店街，順著護城河平路散步抵達【岩手銀行赤レンガ館(紅磚館)】拍文青家族照", icon: <MapPin size={18} />, mapQuery: "岩手銀行赤レンガ館" },
      { time: "15:00 - 16:50", event: "【南昌莊】搭計程車(4分)直達。全家靠在廊柱上，看庭園流水吃抹茶和菓子，在榻榻米上優雅充電", icon: <Heart size={18} />, mapQuery: "南昌荘" },
      { time: "17:00", event: "【晚餐：盛樓閣】搭計程車回盛岡站。長輩孕婦吃全熟「前澤牛燒肉/溫麵」，您挑戰名物「冷麵」", icon: <Utensils size={18} />, mapQuery: "盛楼閣" },
      { time: "19:50 - 20:29", event: "搭乘【新幹線 Hayabusa 42號】高速回航，讓全家在車上舒適小憩", icon: <Train size={18} /> },
      { time: "晚上", event: "輕鬆空手回到仙台飯店取行李、辦理新房間 Check-in，泡澡休息", icon: <Home size={18} />, mapQuery: "ホテルビスタ仙台" }
    ]
  },
  {
    day: "Day 4",
    date: "6/21 (日)",
    title: "奧入瀨綠意自駕 ➡️ 十和田湖慢活全紀錄",
    location: "八戶、奧入瀨、十和田湖",
    intro: "全天開著 ORIX 頂規 7 人座大保姆車，全程走免費國道，並利用黃金 55 號班次環遊中湖。",
    banner: "https://github.com/user-attachments/assets/e23aa815-5037-43e1-90bd-6d1273448023",
    schedule: [
      { time: "08:48 - 09:19", event: "搭乘【新幹線 Hayabusa 4 號】（盛岡 ➡️ 八戶）。提早劃位，車上安穩休息保留戰力", icon: <Train size={18} />, mapQuery: "八戸駅" },
      { time: "09:20 - 09:50", event: "【ORIX 八戶站前店】西口取車。出示預約單刷卡結清加租 ETC，確認導航切換中文與一般道路優先", icon: <Wallet size={18} />, mapQuery: "オリックスレンタカー 八戸駅西口店" },
      { time: "10:45 - 11:15", event: "【十和田市區大超市】MaxValu 採購補給。掃貨炸豬排便當、青森當季大草莓，100% 避開山上排隊與生食風險", icon: <Utensils size={18} />, mapQuery: "マックスバリュ 十和田" },
      { time: "11:45 - 14:00", event: "【奧入瀨溪流精華慢遊】自駕隨踩隨停。累了立刻回車內吹空調大躺平，中午停專用車位在車內奢華野餐", icon: <MapPin size={18} />, mapQuery: "奥入瀬渓流" },
      { time: "14:40 - 15:30", event: "【十和田湖遊覽船】搭乘 55號班次 B路線。坐在冷氣船艙沙發座，穿梭半島看千仞絕壁，免淋雨吹風", icon: <Ticket size={18} />, mapQuery: "十和田湖遊覧船" },
      { time: "15:30 - 16:30", event: "【休屋國寶散步圈】下船平地散步拍「少女雕像」，往內參拜隱匿在參天巨木杉林中的古老「十和田神社」", icon: <Heart size={18} />, mapQuery: "十和田神社" },
      { time: "18:30 - 19:00", event: "【加滿還車】八戶站前 ENEOS 喊口訣加滿油，開回 ORIX 西口還車並結算 0 元 ETC 費用", icon: <MapPin size={18} />, mapQuery: "ENEOS 八戸駅西口" },
      { time: "19:15 - 晚上", event: "【八戶站前覓食與回航】八戶站前晚餐。依全家當下體力隨性劃位新幹線回程，徹底告別趕車焦慮", icon: <Train size={18} /> }
    ]
  },
  {
    day: "Day 5",
    date: "6/22 (一)",
    title: "百年小岩井農場 slow-life ➡️ 回防仙台",
    location: "盛岡、仙台",
    intro: "輕鬆坐拖拉機遊牧場，下午太太在飯店睡午覺，妹妹與您去市區採購補貨。",
    banner: "https://github.com/user-attachments/assets/1c3f3ab6-6fbf-475e-ac0f-e4edd6ba7937",
    schedule: [
      { time: "09:00 - 10:05", event: "退房，盛岡站前搭乘「岩手縣交通巴士」直達「小岩井農場」", icon: <Train size={18} />, mapQuery: "小岩井農場まきば園" },
      { time: "上午", event: "【小岩井農場】預約拖拉機遊覽車繞草原看一本櫻與岩手山。吃最新鮮現榨牛乳霜淇淋與香濃起司", icon: <Ticket size={18} /> },
      { time: "13:30 - 14:54", event: "搭巴士回盛岡站，轉乘東北新幹線【隼號】39 分鐘重返仙台車站", icon: <Train size={18} />, mapQuery: "仙台駅" },
      { time: "傍晚", event: "全家輕鬆逛極具質感的「S-PAL 東館」百貨，晚餐挑選精緻日式壽司或割烹料理", icon: <Utensils size={18} />, mapQuery: "S-PAL 仙台" },
      { time: "晚上", event: "散步回【Hotel Vista 仙台】（東口），憑收據提領 5 個大行李箱辦理入住，全家洗澡泡大浴場", icon: <Home size={18} />, mapQuery: "ホテルビスタ仙台" }
    ]
  },
  {
    day: "Day 6",
    date: "6/23 (二)",
    title: "秋保溫泉溪谷祕境與資福寺初夏紫陽花",
    location: "仙台、秋保",
    intro: "初夏限定滿開繡球花，下午安排私密湯屋，讓孕婦完全0勞動放鬆舒緩水腫。",
    banner: "https://github.com/user-attachments/assets/f2f69ad2-bccc-4487-af21-8666d463037c",
    schedule: [
      { time: "09:30", event: "飯店招兩台計程車直達北山祕境「資福寺」。全平地庭園散步，拍紫陽花滿開的絕美家族大合照", icon: <MapPin size={18} />, mapQuery: "資福寺 仙台" },
      { time: "12:00", event: "搭計程車回仙台站午餐，隨後於西口搭乘「西部線大巴」前往「秋保溫泉」", icon: <Train size={18} />, mapQuery: "秋保温泉" },
      { time: "下午", event: "【秋保溫泉慢活】參觀秋保工藝之里看傳統木芥子娃娃，秋保磊磊峽平坦步道眺望奇岩溪谷", icon: <Heart size={18} />, mapQuery: "秋保工芸の里" },
      { time: "傍晚", event: "【頂級體貼孕婦退路】免排隊擠公車，直接從秋保溫泉招兩台計程車直達飯店，太太與長輩後座吹冷氣睡覺", icon: <Train size={18} /> },
      { time: "晚上", event: "返回【Hotel Vista 仙台】（東口），去對面 LOPIA 現金出清爆買零食乾貨裝箱", icon: <Home size={18} />, mapQuery: "ホテルビスタ仙台" }
    ]
  },
  {
    day: "Day 7",
    date: "6/24 (三)",
    title: "大崎八幡宮黑金參拜 ➡️ 仙台機場",
    location: "仙台",
    intro: "完美避開階梯參拜國寶八幡宮，車站最後大掃貨，帶著滿滿回憶返家。",
    banner: "https://github.com/user-attachments/assets/9c842f58-fd78-4af7-99b0-e8b940222537",
    schedule: [
      { time: "09:30", event: "辦理 Check-out，行李寄放櫃檯。搭短程計程車直達國寶「大崎八幡宮」（叮嚀司機停北參道入口，完美避開100階長石階）", icon: <MapPin size={18} />, mapQuery: "大崎八幡宮 北参道" },
      { time: "上午", event: "欣賞安土桃山時代華麗的「黑金漆藝與金箔」建築之美，為太太孕期與全家健康祈福", icon: <Heart size={18} /> },
      { time: "12:00", event: "搭計程車回飯店提領行李。在仙台東口吃完最後的美味午餐", icon: <Utensils size={18} /> },
      { time: "13:30 - 14:15", event: "搭乘【仙台機場線】直達機場，辦理登機。免稅店「嗶」卡買伴手禮", icon: <Train size={18} />, mapQuery: "仙台空港駅" },
      { time: "17:10", event: "搭乘星宇航空平安返台，結束完美的家族旅行！", icon: <Sun size={18} /> }
    ]
  }
];

// --- 模擬天氣資料 (6月中旬平均) ---
const mockWeather = [
  { dt: 1, temp: { min: 18, max: 25 }, weather: [{ main: 'Clear', description: '晴天' }] },
  { dt: 2, temp: { min: 17, max: 23 }, weather: [{ main: 'Clouds', description: '多雲' }] },
  { dt: 3, temp: { min: 19, max: 26 }, weather: [{ main: 'Clear', description: '晴時多雲' }] },
  { dt: 4, temp: { min: 16, max: 22 }, weather: [{ main: 'Rain', description: '短暫陣雨' }] },
  { dt: 5, temp: { min: 18, max: 24 }, weather: [{ main: 'Clouds', description: '陰天' }] },
  { dt: 6, temp: { min: 17, max: 25 }, weather: [{ main: 'Clear', description: '晴天' }] },
  { dt: 7, temp: { min: 19, max: 27 }, weather: [{ main: 'Clouds', description: '多雲' }] }
];

// --- 必帶物品清單資料 ---
const checklistData = [
  {
    title: "📄 必備證件與財物",
    items: [
      { name: "護照 (效期需超過6個月)", note: "隨身攜帶", type: "must" },
      { name: "日幣現金與信用卡", note: "隨身攜帶", type: "must" },
      { name: "機票與住宿確認信 (可存手機)", note: "隨身攜帶", type: "normal" }
    ]
  },
  {
    title: "🔋 電子產品 (注意電池規範)",
    items: [
      { name: "行動電源 (建議每人1顆)", note: "⚠️ 嚴禁托運，一定要放在隨身包包", type: "alert" },
      { name: "手機、相機與充電線", note: "隨身或托運皆可", type: "normal" },
      { name: "日本上網卡 或 Wi-Fi 機", note: "隨身攜帶 (下機馬上要用)", type: "must" }
    ]
  },
  {
    title: "🤰 長輩與孕婦專屬",
    items: [
      { name: "媽媽手冊 / 備用安胎藥物", note: "隨身攜帶，以備不時之需", type: "must" },
      { name: "長輩日常慢性病藥物", note: "隨身帶幾天份，其餘放托運行李", type: "must" },
      { name: "舒適好走的休閒鞋 / 運動鞋", note: "直接穿在身上最保險", type: "normal" }
    ]
  },
  {
    title: "👕 衣物與日常用品",
    items: [
      { name: "短袖衣物 + 薄防風外套", note: "托運 (洋蔥式穿搭應對溫差)", type: "normal" },
      { name: "個人常備藥 (腸胃、止痛、暈車)", note: "托運 / 隨身皆可", type: "normal" },
      { name: "防曬乳、太陽眼鏡、輕便摺疊傘", note: "托運 (傘若隨身需符合安檢長度)", type: "normal" },
      { name: "環保購物袋", note: "隨身帶一個，買伴手禮很好裝", type: "normal" }
    ]
  }
];

// --- 伴手禮清單資料 ---
const souvenirData = [
  {
    title: "👑 戰線一：仙台車站與機場（帶回台灣送親友、長輩最愛）",
    items: [
      { name: "菓匠三全「萩之月」", where: "仙台站、機場", desc: "仙台伴手禮絕對王者！卡士達奶油內餡外包蛋糕，口感綿密。機場免稅店可用西瓜卡刷。" },
      { name: "白松がモナカ (白松が最中)", where: "仙台車站 S-PAL", desc: "日本傳統「最中餅」，外皮酥脆內餡細緻。送長輩或主管非常有面子，長輩圈神物。" },
      { name: "伊達の牛たん「牛舌真空包」", where: "仙台車站", desc: "店裡吃不夠可買急速冷凍真空包！回台灣稍微兩面煎，在家就能還原仙台的爽脆炭烤牛舌風味！" },
      { name: "鐘崎「笹かまぼこ」(竹葉魚板)", where: "仙台站、機場", desc: "用高級魚肉做成竹葉形狀的魚板。微甜帶有海味，口感Ｑ彈，現場有真空包裝可帶回。" }
    ]
  },
  {
    title: "🛒 戰線二：LOPIA 超市與盛岡（現場吃、辦公室分發、妹妹最愛）",
    items: [
      { name: "當季新鮮水果（哈密瓜/櫻桃/葡萄）", where: "Day 1 & Day 6 LOPIA", desc: "初夏限定！LOPIA便宜到驚人。頭尾幾天在房間每天洗洗切切給太太和爸媽吃，幸福感爆棚！" },
      { name: "Calbee 仙台限定牛舌洋芋片", where: "LOPIA、超商", desc: "東北限定口味！帶有炙烤牛舌與黑胡椒香氣，價格便宜又好分，帶去辦公室給同事最適合。" },
      { name: "小岩井農場「濃厚起司條/牛奶糖」", where: "Day 5 盛岡站/農場", desc: "常溫起司條、高純度鮮乳奶糖，奶香濃郁到像在喝現榨牛奶，妹妹跟太太絕對大愛。" },
      { name: "南部鐵器「彩色急須」 (茶壺)", where: "Day 4 盛岡商店街", desc: "若爸媽有泡茶習慣，可以順路看一具小巧南部鐵器茶壺。粉嫩的初夏彩色改良版放在家裡質感極高。" }
    ]
  }
];

export default function App() {
  // 頁籤狀態
  const [mainTab, setMainTab] = useState('itinerary');
  const [activeDay, setActiveDay] = useState(0);

  // 天氣狀態
  const [weatherData, setWeatherData] = useState(null);
  const [isUsingMockWeather, setIsUsingMockWeather] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // 記帳狀態 (5個人)
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', payer: '爸爸' });
  const members = ['爸爸', '媽媽', '老公', '老婆', '妹妹'];

  // 行李清單打勾狀態
  const [checkedItems, setCheckedItems] = useState({});

  // 🌟 圖片背景預載入
  useEffect(() => {
    itinerary.forEach((day) => {
      if (day.banner) {
        const img = new Image();
        img.src = day.banner;
      }
    });
  }, []);

  // 取得天氣 (OpenWeatherMap)
  useEffect(() => {
    const fetchWeather = async () => {
      setWeatherLoading(true);
      const apiKey = 'ffc25a88fba418a3b33c788d933e6756';
      const lat = 38.2682; // 仙台
      const lon = 140.8694;
      
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=zh_tw`);
        if (!res.ok) throw new Error('API Rate limit or Unauthorized');
        const data = await res.json();
        
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 7);
        const formattedWeather = dailyData.map(item => ({
          dt: item.dt,
          temp: {
            min: Math.round(item.main.temp_min - 2), 
            max: Math.round(item.main.temp_max + 2)  
          },
          weather: item.weather
        }));

        if(formattedWeather.length < 7) {
            const paddedWeather = [...formattedWeather];
            for(let i = formattedWeather.length; i < 7; i++) {
                paddedWeather.push(mockWeather[i]);
            }
            setWeatherData(paddedWeather);
        } else {
            setWeatherData(formattedWeather);
        }
        setIsUsingMockWeather(false);
      } catch (error) {
        setWeatherData(mockWeather);
        setIsUsingMockWeather(true);
      } finally {
        setWeatherLoading(false);
      }
    };
    fetchWeather();
  }, []);

  // 穿搭建議邏輯
  const getClothingAdvice = (min, max, condition) => {
    let advice = "短袖上衣 + 薄長袖外套 (洋蔥式穿法)。";
    if (max >= 26) advice = "透氣短袖為主，防曬帽、太陽眼鏡必備。";
    if (min <= 16) advice = "早晚偏涼，請為長輩與孕婦準備防風薄外套。";
    if (condition.includes('雨') || condition.includes('Rain')) {
      advice += " 記得隨身攜帶折疊傘與防滑好走的鞋。";
    }
    return advice;
  };

  // 記帳邏輯
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) return;
    setExpenses([...expenses, { ...newExpense, amount: Number(newExpense.amount), id: Date.now() }]);
    setNewExpense({ title: '', amount: '', payer: '爸爸' });
  };

  const calculateSplit = () => {
    const totals = members.reduce((acc, member) => ({ ...acc, [member]: 0 }), {});
    let grandTotal = 0;
    expenses.forEach(exp => {
      totals[exp.payer] += exp.amount;
      grandTotal += exp.amount;
    });
    const average = grandTotal / 5;
    return members.map(member => ({
      name: member,
      paid: totals[member],
      balance: totals[member] - average
    }));
  };

  const getGoogleMapsUrl = (destination) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=transit&hl=zh-TW`;
  };

  // 打勾切換邏輯
  const toggleCheck = (categoryIdx, itemIdx) => {
    const key = `${categoryIdx}-${itemIdx}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      {/* 頂部 Header */}
      <div className="bg-teal-500 text-white p-6 shadow-md rounded-b-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Sun size={120} className="-mt-4 -mr-4" />
        </div>
        <h1 className="text-2xl font-bold mb-1 relative z-10">2026日本東北自由行 🎋</h1>
        <p className="text-teal-50 text-sm relative z-10">6/18 - 6/24 · 仙台、松島、盛岡、奧入瀨</p>
      </div>

      {/* 主導航 (放大、滿版四宮格設計) */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6 px-3 sm:px-4 max-w-3xl mx-auto">
        <button 
          onClick={() => setMainTab('itinerary')}
          className={`flex flex-col items-center justify-center p-3 sm:py-4 rounded-2xl transition-all shadow-sm ${mainTab === 'itinerary' ? 'bg-white shadow-lg text-teal-600 scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          <MapPin size={26} className="mb-1 sm:mb-2" />
          <span className="text-[11px] sm:text-sm font-bold">行程表</span>
        </button>
        <button 
          onClick={() => setMainTab('weather')}
          className={`flex flex-col items-center justify-center p-3 sm:py-4 rounded-2xl transition-all shadow-sm ${mainTab === 'weather' ? 'bg-white shadow-lg text-teal-600 scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          <Sun size={26} className="mb-1 sm:mb-2" />
          <span className="text-[11px] sm:text-sm font-bold">天氣預報</span>
        </button>
        <button 
          onClick={() => setMainTab('checklist')}
          className={`flex flex-col items-center justify-center p-3 sm:py-4 rounded-2xl transition-all shadow-sm ${mainTab === 'checklist' ? 'bg-white shadow-lg text-teal-600 scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          <Briefcase size={26} className="mb-1 sm:mb-2" />
          <span className="text-[11px] sm:text-sm font-bold">必帶物品</span>
        </button>
        <button 
          onClick={() => setMainTab('expenses')}
          className={`flex flex-col items-center justify-center p-3 sm:py-4 rounded-2xl transition-all shadow-sm ${mainTab === 'expenses' ? 'bg-white shadow-lg text-teal-600 scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          <Receipt size={26} className="mb-1 sm:mb-2" />
          <span className="text-[11px] sm:text-sm font-bold">分帳計算</span>
        </button>
      </div>

      <div className="p-4 mt-2 max-w-3xl mx-auto">
        
        {/* ================= 行程表 View ================= */}
        {mainTab === 'itinerary' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex overflow-x-auto gap-3 pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {itinerary.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDay(idx)}
                    className={`flex-none snap-center px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                      activeDay === idx
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-teal-700 border border-teal-100 hover:bg-teal-50'
                    }`}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mt-2 overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-teal-600 font-bold text-sm mb-1">{itinerary[activeDay].day} • {itinerary[activeDay].date}</p>
                  <h2 className="text-xl font-bold text-slate-800">{itinerary[activeDay].title}</h2>
                </div>
                <div className="bg-teal-50 p-2 rounded-full text-teal-600">
                  <MapPin size={20} />
                </div>
              </div>
              
              <div className="bg-orange-50 text-orange-800 p-4 rounded-2xl text-sm leading-relaxed mb-4 flex items-start gap-3">
                <Info size={20} className="shrink-0 mt-0.5 text-orange-500" />
                <p>{itinerary[activeDay].intro}</p>
              </div>

              {itinerary[activeDay].banner && (
                <div className="mb-6 relative w-full h-32 sm:h-40 rounded-2xl overflow-hidden shadow-inner bg-slate-100 flex items-center justify-center">
                  <img 
                    src={itinerary[activeDay].banner} 
                    alt={`Day ${activeDay + 1} Theme`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span class="text-slate-400 text-sm">圖片載入失敗</span>';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {itinerary[activeDay].schedule.map((item, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-teal-100 text-teal-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                      {item.icon}
                    </div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm ml-4 md:ml-0 flex justify-between items-center group-hover:border-teal-200 transition-colors">
                      <div className="flex-1 pr-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock size={14} className="text-slate-400" />
                          <span className="font-bold text-slate-700">{item.time}</span>
                        </div>
                        <p className="text-slate-600 text-sm leading-snug">{item.event}</p>
                      </div>
                      {item.mapQuery && (
                        <a 
                          href={getGoogleMapsUrl(item.mapQuery)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-shrink-0 w-10 h-10 bg-white border border-slate-200 rounded-full flex flex-col items-center justify-center text-blue-500 shadow-sm hover:bg-blue-50 hover:border-blue-200 transition-all active:scale-95"
                          title={`導航至：${item.mapQuery}`}
                        >
                          <Navigation size={16} className="mb-0.5" />
                          <span className="text-[9px] font-bold">導航</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🎁 伴手禮推薦區塊 (附加在行程表最下方) */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mt-6 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-rose-50 p-2 rounded-full text-rose-500">
                  <Gift size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">最強伴手禮必買清單</h2>
              </div>
              
              <div className="space-y-6">
                {souvenirData.map((category, catIdx) => (
                  <div key={catIdx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <h3 className="font-bold text-rose-700 mb-3 border-b border-rose-100 pb-2">
                      {category.title}
                    </h3>
                    <div className="space-y-3">
                      {category.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                              <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                                📍 {item.where}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 必帶物品清單 View ================= */}
        {mainTab === 'checklist' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
                  <Briefcase className="text-teal-500" /> 
                  行前行李檢查表
                </h2>
                <p className="text-sm text-slate-500">點擊項目可打勾確認，確保萬無一失！您可依需求再自行斟酌增減。</p>
              </div>

              <div className="space-y-6">
                {checklistData.map((category, catIdx) => (
                  <div key={catIdx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <h3 className="font-bold text-teal-700 mb-3 border-b border-teal-100 pb-2">
                      {category.title}
                    </h3>
                    <div className="space-y-3">
                      {category.items.map((item, itemIdx) => {
                        const isChecked = checkedItems[`${catIdx}-${itemIdx}`];
                        const isAlert = item.type === 'alert';
                        
                        return (
                          <div 
                            key={itemIdx} 
                            onClick={() => toggleCheck(catIdx, itemIdx)}
                            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                              isChecked 
                                ? 'bg-teal-50/50 border-teal-200 opacity-75' 
                                : isAlert 
                                  ? 'bg-rose-50 border-rose-200 hover:bg-rose-100' 
                                  : 'bg-white border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {isChecked ? (
                                <CheckCircle2 size={22} className="text-teal-500" />
                              ) : (
                                <Circle size={22} className={isAlert ? "text-rose-400" : "text-slate-300"} />
                              )}
                            </div>
                            <div>
                              <p className={`font-bold text-sm ${isChecked ? 'text-teal-700 line-through' : isAlert ? 'text-rose-700' : 'text-slate-700'}`}>
                                {item.name}
                              </p>
                              <p className={`text-xs mt-1 flex items-center gap-1 ${isAlert && !isChecked ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                                {isAlert && <AlertCircle size={12} />}
                                {item.note}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 天氣穿搭 View ================= */}
        {mainTab === 'weather' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {isUsingMockWeather && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-xl text-sm mb-4 flex gap-2">
                <Info size={18} className="shrink-0" />
                <p>因未來預報或 API 限制，目前顯示<strong>6月中旬歷史平均與穿搭建議</strong>。</p>
              </div>
            )}
            
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
              <CloudRain size={20} className="text-teal-500" /> 
              行程天氣預報
            </h2>
            
            {weatherLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {weatherData.map((day, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="bg-teal-50 w-12 h-12 rounded-full flex items-center justify-center text-teal-600 shrink-0">
                        {day.weather[0].main.includes('Rain') ? <CloudRain size={24} /> : 
                         day.weather[0].main.includes('Cloud') ? <Cloud size={24} /> : <Sun size={24} />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700">{itinerary[idx] ? itinerary[idx].date : `Day ${idx + 1}`}</p>
                        <p className="text-xs text-slate-500">{itinerary[idx] ? itinerary[idx].location : '東北地區'} • {day.weather[0].description}</p>
                      </div>
                      <div className="ml-auto sm:ml-4 text-right">
                        <p className="font-bold text-lg text-slate-800">{day.temp.max}° <span className="text-sm text-slate-400 font-normal">/ {day.temp.min}°</span></p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded-xl w-full sm:w-2/3 text-xs text-slate-600 leading-relaxed border border-slate-100">
                      <span className="font-bold text-teal-600">👗 穿搭建議：</span><br/>
                      {getClothingAdvice(day.temp.min, day.temp.max, day.weather[0].main)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= 分帳計算 View ================= */}
        {mainTab === 'expenses' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
              <Wallet size={20} className="text-teal-500" /> 
              公費記帳 (5人)
            </h2>

            <form onSubmit={handleAddExpense} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col gap-3">
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="花費項目 (例: 牛舌晚餐)" 
                  className="flex-1 bg-slate-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all border border-slate-200"
                  value={newExpense.title}
                  onChange={e => setNewExpense({...newExpense, title: e.target.value})}
                />
                <input 
                  type="number" 
                  placeholder="日幣(¥)" 
                  className="w-24 bg-slate-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all border border-slate-200"
                  value={newExpense.amount}
                  onChange={e => setNewExpense({...newExpense, amount: e.target.value})}
                />
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-sm text-slate-500 shrink-0">代墊人:</span>
                <select 
                  className="flex-1 bg-slate-50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-200"
                  value={newExpense.payer}
                  onChange={e => setNewExpense({...newExpense, payer: e.target.value})}
                >
                  {members.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <button type="submit" className="bg-teal-600 text-white p-3 rounded-xl flex items-center justify-center shrink-0 hover:bg-teal-700 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
            </form>

            {expenses.length > 0 && (
              <div className="bg-teal-50 p-5 rounded-2xl mb-6 shadow-sm">
                <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                  <Users size={18} /> 最佳分帳結果
                </h3>
                <div className="space-y-2">
                  {calculateSplit().map((res, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm bg-white p-3 rounded-xl">
                      <span className="font-medium">{res.name}</span>
                      {res.balance > 0 ? (
                        <span className="text-teal-600 font-bold">應收回 ¥{Math.round(res.balance).toLocaleString()}</span>
                      ) : res.balance < 0 ? (
                        <span className="text-rose-500 font-bold">應支付 ¥{Math.round(Math.abs(res.balance)).toLocaleString()}</span>
                      ) : (
                        <span className="text-slate-400">已結清</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-500 px-2">歷史明細</h3>
              {expenses.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-6">目前還沒有任何花費紀錄喔！</p>
              ) : (
                expenses.map(exp => (
                  <div key={exp.id} className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{exp.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{exp.payer} 代墊</p>
                    </div>
                    <p className="font-bold text-teal-600">¥{exp.amount.toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}