import React, { useState, useMemo, useEffect } from 'react';
import { 
  Map, 
  CloudSun, 
  Receipt, 
  MapPin, 
  Clock, 
  Info, 
  Train, 
  Utensils, 
  Camera, 
  Bed, 
  Plus, 
  Trash2,
  ChevronRight,
  Sun,
  CloudRain,
  Wind,
  Snowflake,
  Cloud,
  Loader2,
  AlertCircle
} from 'lucide-react';

const MEMBERS = ['老公', '太太', '爸爸', '媽媽', '妹妹'];
const API_KEY = 'ffc25a88fba418a3b33c788d933e6756';

const ITINERARY = [
  {
    day: 1,
    date: '6/18 (四)',
    title: '啟程：抵達杜之都仙台',
    location: '仙台',
    intro: '【仙台】日本東北最大的城市，被譽為「杜之都（森林之都）」。市區綠意盎然，以碳烤牛舌、毛豆泥甜點聞名，是我們這次旅行溫暖的大本營。',
    events: [
      { time: '11:35', type: 'flight', desc: '星宇航空 JX862 桃園 TPE 起飛' },
      { time: '18:00', type: 'flight', desc: '抵達仙台 SDJ 機場' },
      { time: '19:00', type: 'train', desc: '搭乘機場快速線（25分鐘）直達仙台站，入住直結飯店' },
      { time: '晚上', type: 'food', desc: '車站3樓享用熱騰騰的「善治郎牛舌」，早點讓太太和爸媽休息補眠' }
    ]
  },
  {
    day: 2,
    date: '6/19 (五)',
    title: '日本三景與海洋療癒',
    location: '松島',
    intro: '【松島】日本三景之一，海灣內有260多個長滿松樹的島嶼。夏天海風徐徐，非常適合搭船遊覽。',
    events: [
      { time: '10:30', type: 'train', desc: '搭 JR 仙石線前往松島海岸站（約40分鐘）' },
      { time: '上午', type: 'camera', desc: '全家搭乘「松島灣觀光船」（特別客室沙發座），坐著輕鬆看海' },
      { time: '中午', type: 'food', desc: '搭計程車（5分鐘）上「松島全景咖啡廳」吹冷氣看海景吃午餐' },
      { time: '下午', type: 'camera', desc: '回程順路在「中野榮站」下車，轉接駁車至「仙台海洋森林水族館」。全室內冷氣、無障礙平路，看海豚與海獅露天秀' },
      { time: '晚上', type: 'bed', desc: '返回仙台飯店休息' }
    ]
  },
  {
    day: 3,
    date: '6/20 (六)',
    title: '盛岡祈願與海鮮之夜',
    location: '盛岡 / 八戶',
    intro: '【盛岡】岩手縣首府，以三大麵（冷麵、炸醬麵、一口蕎麥麵）聞名。盛岡八幡宮是當地信仰中心，非常適合祈求平安。',
    events: [
      { time: '10:30', type: 'train', desc: '輕鬆背上小包，搭乘東北新幹線前往盛岡站（只需40分鐘）' },
      { time: '中午', type: 'food', desc: '小包丟車站置物櫃。站前享用酸甜開胃的「盛岡冷麵」搭配熟食燒肉' },
      { time: '下午', type: 'camera', desc: '搭計程車直達「盛岡八幡宮」。陪太太玩「釣鯛魚籤」，為寶寶求安產御守，爸媽祈福' },
      { time: '傍晚', type: 'train', desc: '回盛岡站拿小包，搭新幹線（30分鐘）直達八戶站，過馬路飯店 Check-in' },
      { time: '晚上', type: 'food', desc: '拆搭兩台計程車去「八食中心」吃頂級熟食海鮮' }
    ]
  },
  {
    day: 4,
    date: '6/21 (日)',
    title: '奧入瀨溪流綠意洗禮',
    location: '奧入瀨溪流',
    intro: '【奧入瀨溪流】被列為特別名勝與天然紀念物。初夏的新綠是最美的季節，溪水聲與芬多精讓人徹底放鬆。今日免換飯店、免搬行李！',
    events: [
      { time: '10:00', type: 'train', desc: '八戶站西口直搭 JR 巴士' },
      { time: '11:44', type: 'camera', desc: '抵達「石之戶」（平路散步、溪畔野餐）' },
      { time: '14:07', type: 'train', desc: '換短程巴士前往「銚子大瀑布」（看震撼瀑布、拍全家福大合照）' },
      { time: '16:18', type: 'train', desc: '搭末班車返回' },
      { time: '18:20', type: 'bed', desc: '回到八戶站前續住' }
    ]
  },
  {
    day: 5,
    date: '6/22 (一)',
    title: '小岩井農場與市區採購',
    location: '盛岡 / 仙台',
    intro: '【小岩井農場】日本最大的民營農場，擁有百年歷史。以岩手山為背景的廣闊草原令人心曠神怡，鮮奶製品是必吃美食。',
    events: [
      { time: '09:30', type: 'train', desc: '退房，搭新幹線（30分鐘）回盛岡站寄放小包，轉乘巴士（35分鐘）直達農場' },
      { time: '上午', type: 'camera', desc: '預約「拖拉機遊覽車」。坐大車繞行大草原、看綠色一本櫻與岩手山，免動腿力' },
      { time: '中午', type: 'food', desc: '喝濃郁現擠鮮乳、吃霜淇淋' },
      { time: '下午', type: 'train', desc: '搭新幹線（40分鐘）回仙台。入住原飯店（大行李已在房間）' },
      { time: '傍晚', type: 'camera', desc: '太太房間睡午覺，其他人可下樓逛街幫太太補貨吉伊卡哇' }
    ]
  },
  {
    day: 6,
    date: '6/23 (二)',
    title: '紫陽花海與奢華溫泉',
    location: '仙台 / 秋保溫泉',
    intro: '【秋保溫泉】奧州三名湯之一，歷史悠久，自古為伊達政宗的御用溫泉。搭配初夏限定的繡球花（紫陽花），體驗極致日式風情。',
    events: [
      { time: '10:00', type: 'camera', desc: '搭計程車（10分鐘）直達資福寺（紫陽花寺）。6月下旬繡球花滿開，拍初夏花海合照' },
      { time: '中午', type: 'food', desc: '吃完仙台牛燒肉後，搭計程車（30分鐘）前往秋保溫泉高級旅館（如佐勘）' },
      { time: '下午', type: 'bed', desc: '享用日歸懷石午餐。爸媽妹妹泡大眾池。陪太太泡預約好的「專屬私密湯屋」15分鐘，隨後在榻榻米小憩' }
    ]
  },
  {
    day: 7,
    date: '6/24 (三)',
    title: '國寶巡禮與滿載而歸',
    location: '仙台',
    intro: '旅程的最後一天，走訪充滿歷史底蘊的國寶建築，並將東北的美好回憶與伴手禮一起打包回家。',
    events: [
      { time: '10:00', type: 'camera', desc: '搭計程車前往國寶「大崎八幡宮」。（停「北參道入口」下車，全平路避開階梯）' },
      { time: '中午', type: 'food', desc: '仙台車站 S-PAL 百貨做伴手禮（萩之月、毛豆泥大福）最後大掃貨' },
      { time: '14:45', type: 'train', desc: '搭乘機場快速線（25分鐘）前往機場' },
      { time: '17:20', type: 'flight', desc: '搭乘星宇航空 JX863 返回台灣，旅途平安！' }
    ]
  }
];

const getWeatherIcon = (main) => {
  switch(main) {
    case 'Clear': return <Sun className="w-8 h-8 text-orange-400" />;
    case 'Clouds': return <CloudSun className="w-8 h-8 text-gray-400" />;
    case 'Rain': return <CloudRain className="w-8 h-8 text-blue-400" />;
    case 'Snow': return <Snowflake className="w-8 h-8 text-teal-300" />;
    default: return <Cloud className="w-8 h-8 text-gray-400" />;
  }
};

const EventIcon = ({ type }) => {
  switch(type) {
    case 'flight': return <MapPin className="w-5 h-5 text-teal-600" />;
    case 'train': return <Train className="w-5 h-5 text-blue-500" />;
    case 'food': return <Utensils className="w-5 h-5 text-orange-500" />;
    case 'camera': return <Camera className="w-5 h-5 text-purple-500" />;
    case 'bed': return <Bed className="w-5 h-5 text-indigo-500" />;
    default: return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [selectedDay, setSelectedDay] = useState(1); // 新增：控制目前顯示的天數
  
  // 天氣 API 狀態
  const [weatherData, setWeatherData] = useState([]);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);
  const [isUsingMock, setIsUsingMock] = useState(false);

  // 記帳相關狀態 (修復 expenses is not defined 錯誤)
  const [expenses, setExpenses] = useState([]);
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expPayer, setExpPayer] = useState(MEMBERS[0]);
  const [expSplitters, setExpSplitters] = useState(MEMBERS);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        // 抓取仙台 (大本營) 的 5 天每 3 小時預報
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Sendai,jp&appid=${API_KEY}&units=metric&lang=zh_tw`);
        if (!res.ok) throw new Error('Weather API request failed');
        const data = await res.json();
        
        // 將每 3 小時的資料依據日期分組
        const daily = {};
        data.list.forEach(item => {
          // dt_txt 格式為 "2026-05-17 12:00:00"
          const date = item.dt_txt.split(' ')[0];
          if (!daily[date]) {
            daily[date] = { temps: [], weathers: [], descriptions: [] };
          }
          daily[date].temps.push(item.main.temp);
          daily[date].weathers.push(item.weather[0].main);
          daily[date].descriptions.push(item.weather[0].description);
        });

        // 處理並精煉出每天的最高低溫與穿衣建議
        const processedData = Object.keys(daily).slice(0, 5).map(date => {
          const temps = daily[date].temps;
          const minTemp = Math.round(Math.min(...temps));
          const maxTemp = Math.round(Math.max(...temps));
          
          // 找出當天出現最多次的天氣狀態
          const weathers = daily[date].weathers;
          const mainWeather = weathers.sort((a,b) =>
            weathers.filter(v => v===a).length - weathers.filter(v => v===b).length
          ).pop();
          
          // 抓取中午時段或隨機的描述
          const desc = daily[date].descriptions[Math.floor(daily[date].descriptions.length / 2)];

          // 根據氣溫與天氣給予動態穿衣建議
          let advice = '';
          if (mainWeather === 'Rain') {
            advice = '預報有雨，請隨身攜帶雨具，並穿著防潑水鞋子，小心地滑。';
          } else if (maxTemp >= 28) {
            advice = '天氣炎熱，請準備短袖、防曬乳與太陽眼鏡，外出請多補充水分。';
          } else if (maxTemp >= 22) {
            advice = '氣溫舒適宜人，建議短袖搭配薄外套，方便進出冷氣房時穿脫。';
          } else {
            advice = '氣溫稍涼，建議採用「洋蔥式穿搭」，以薄長袖搭配防風外套為主。';
          }

          // 格式化日期 (MM/DD)
          const formattedDate = date.substring(5).replace('-', '/');

          return {
            date: formattedDate,
            temp: `${minTemp}°C / ${maxTemp}°C`,
            desc: desc,
            main: mainWeather,
            advice: advice
          };
        });

        setWeatherData(processedData);
        setWeatherError(false);
        setIsUsingMock(false);
      } catch (err) {
        console.error("Weather Fetch Error:", err);
        // 當 API 尚未啟用或失敗時，啟用備用模擬資料
        setWeatherData([
          { date: '06/18', temp: '18°C / 26°C', desc: '晴時多雲', main: 'Clear', advice: '氣溫舒適宜人，建議短袖搭配薄外套，方便進出冷氣房時穿脫。' },
          { date: '06/19', temp: '19°C / 25°C', desc: '多雲', main: 'Clouds', advice: '氣溫稍涼，建議採用「洋蔥式穿搭」，以薄長袖搭配防風外套為主。' },
          { date: '06/20', temp: '17°C / 24°C', desc: '小雨', main: 'Rain', advice: '預報有雨，請隨身攜帶雨具，並穿著防潑水鞋子，小心地滑。' },
          { date: '06/21', temp: '19°C / 27°C', desc: '多雲時晴', main: 'Clouds', advice: '氣溫舒適宜人，建議短袖搭配薄外套，方便進出冷氣房時穿脫。' },
          { date: '06/22', temp: '20°C / 29°C', desc: '晴朗', main: 'Clear', advice: '天氣炎熱，請準備短袖、防曬乳與太陽眼鏡，外出請多補充水分。' }
        ]);
        setIsUsingMock(true);
        setWeatherError(false); // 使用模擬資料就不顯示嚴重錯誤
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expTitle || !expAmount || expSplitters.length === 0) return;

    const newExpense = {
      id: Date.now(),
      title: expTitle,
      amount: parseFloat(expAmount),
      payer: expPayer,
      splitters: expSplitters,
      date: new Date().toLocaleDateString()
    };

    setExpenses([newExpense, ...expenses]);
    setExpTitle('');
    setExpAmount('');
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const toggleSplitter = (member) => {
    if (expSplitters.includes(member)) {
      setExpSplitters(expSplitters.filter(m => m !== member));
    } else {
      setExpSplitters([...expSplitters, member]);
    }
  };

  const settlements = useMemo(() => {
    const balances = {};
    MEMBERS.forEach(m => balances[m] = 0);

    expenses.forEach(exp => {
      balances[exp.payer] += exp.amount;
      const splitAmount = exp.amount / exp.splitters.length;
      exp.splitters.forEach(splitter => {
        balances[splitter] -= splitAmount;
      });
    });

    const debtors = [];
    const creditors = [];
    for (const [person, amount] of Object.entries(balances)) {
      if (amount < -0.01) debtors.push({ person, amount: Math.abs(amount) });
      else if (amount > 0.01) creditors.push({ person, amount });
    }

    const transactions = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const amount = Math.min(debtor.amount, creditor.amount);

      transactions.push({
        from: debtor.person,
        to: creditor.person,
        amount: Math.round(amount)
      });

      debtor.amount -= amount;
      creditor.amount -= amount;

      if (debtor.amount < 0.01) i++;
      if (creditor.amount < 0.01) j++;
    }

    return transactions;
  }, [expenses]);

  const renderItinerary = () => {
    // 根據 selectedDay 篩選出當天行程
    const currentDayData = ITINERARY.find(d => d.day === selectedDay) || ITINERARY[0];

    return (
      <div className="space-y-4 pb-24 animate-fade-in">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-400 p-6 rounded-2xl shadow-md text-white mb-2">
          <h2 className="text-2xl font-bold mb-1">日本東北夏日行 🎋</h2>
          <p className="text-teal-50 text-sm opacity-90">6/18 - 6/24・仙台、松島、盛岡、奧入瀨</p>
        </div>

        {/* 左右滑動的日期選擇器 */}
        <div className="flex overflow-x-auto gap-3 pb-2 pt-2 hide-scrollbar">
          {ITINERARY.map((d) => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                selectedDay === d.day
                  ? 'bg-teal-600 text-white shadow-md transform scale-105'
                  : 'bg-white text-teal-700 border border-teal-100 shadow-sm hover:bg-teal-50'
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>

        {/* 當天詳細行程卡片 */}
        <div key={currentDayData.day} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-slide-up">
          <div className="bg-teal-50 px-5 py-4 border-b border-teal-100 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-teal-600 mb-1 block">Day {currentDayData.day} • {currentDayData.date}</span>
              <h3 className="text-lg font-bold text-gray-800">{currentDayData.title}</h3>
            </div>
            <div className="bg-white p-2 rounded-full shadow-sm">
              <MapPin className="w-5 h-5 text-teal-500" />
            </div>
          </div>
          
          <div className="p-5">
            <div className="mb-6 bg-blue-50/50 p-4 rounded-xl text-sm text-gray-700 flex items-start gap-3 border border-blue-100 shadow-sm">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">{currentDayData.intro}</p>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-teal-200 before:to-transparent">
              {currentDayData.events.map((evt, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-teal-200 flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                    <EventIcon type={evt.type} />
                  </div>
                  <div className="pt-2 flex-1 pb-2">
                    <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600 mb-2">
                      {evt.time}
                    </span>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">{evt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWeather = () => (
    <div className="space-y-4 pb-24 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-6 rounded-2xl shadow-md text-white mb-4">
        <h2 className="text-2xl font-bold mb-1">即時天氣與穿搭 🌤️</h2>
        <p className="text-blue-50 text-sm opacity-90">仙台地區未來五天預報與建議</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl flex items-start gap-2 mb-4">
        <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-yellow-800 leading-relaxed">
          <p>由於氣象 API 限制，目前顯示為「近 5 天」的即時預報。6 月出發前打開此網頁，將自動載入您旅行當下的真實天氣！</p>
          {isUsingMock && (
            <p className="mt-2 font-bold text-red-500 bg-red-50 p-2 rounded border border-red-100">
              ⚠️ 無法連線至氣象 API (可能是 Key 尚未啟用)。已自動為您切換為 6 月初夏模擬天氣。
            </p>
          )}
        </div>
      </div>

      {weatherLoading && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400 mb-2" />
          <p className="text-sm font-bold">正在連線至氣象局...</p>
        </div>
      )}

      {weatherError && (
        <div className="bg-red-50 p-6 rounded-2xl flex flex-col items-center text-center border border-red-100">
          <AlertCircle className="w-10 h-10 text-red-400 mb-2" />
          <p className="text-red-600 font-bold mb-1">無法取得天氣資料</p>
          <p className="text-xs text-red-500">請確認您的網路連線或 API Key 是否有效</p>
        </div>
      )}

      {!weatherLoading && !weatherError && weatherData.map((w, idx) => (
        <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center md:items-start transition-all hover:shadow-md">
          <div className="flex flex-col items-center justify-center w-24 flex-shrink-0">
            <span className="font-bold text-gray-500 mb-2">{w.date}</span>
            <div className="p-3 bg-blue-50 rounded-full mb-2">
              {getWeatherIcon(w.main)}
            </div>
            <span className="text-sm font-bold text-gray-800">{w.temp}</span>
            <span className="text-xs text-gray-500 mt-1 capitalize">{w.desc}</span>
          </div>
          
          <div className="h-px w-full md:h-full md:w-px bg-gray-100 my-2 md:my-0"></div>
          
          <div className="flex-1 bg-amber-50/50 p-4 rounded-xl border border-amber-100 w-full h-full flex flex-col justify-center">
            <h4 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" /> 穿搭與提醒
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">{w.advice}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderExpenses = () => (
    <div className="space-y-6 pb-24 animate-fade-in">
      <div className="bg-gradient-to-r from-orange-400 to-amber-400 p-6 rounded-2xl shadow-md text-white mb-6">
        <h2 className="text-2xl font-bold mb-1">公費與分帳計算 💰</h2>
        <p className="text-orange-50 text-sm opacity-90">系統將自動算出最少轉帳次數</p>
      </div>

      <form onSubmit={handleAddExpense} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-orange-500" /> 新增花費
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">項目</label>
              <input 
                type="text" 
                required
                value={expTitle}
                onChange={e => setExpTitle(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white transition-all" 
                placeholder="例如：善治郎牛舌"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">金額 (日幣)</label>
              <input 
                type="number" 
                required
                value={expAmount}
                onChange={e => setExpAmount(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white transition-all" 
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">誰先代墊的？</label>
            <div className="flex flex-wrap gap-2">
              {MEMBERS.map(m => (
                <button
                  key={`payer-${m}`}
                  type="button"
                  onClick={() => setExpPayer(m)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${expPayer === m ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">誰要分攤？(可多選)</label>
            <div className="flex flex-wrap gap-2">
              {MEMBERS.map(m => (
                <button
                  key={`split-${m}`}
                  type="button"
                  onClick={() => toggleSplitter(m)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${expSplitters.includes(m) ? 'bg-teal-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-orange-100 text-orange-700 font-bold rounded-xl hover:bg-orange-200 transition-colors mt-2">
            加入花費紀錄
          </button>
        </div>
      </form>

      {expenses.length > 0 && (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 animate-slide-up">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-500" /> 最終結算建議
          </h3>
          {settlements.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4 bg-gray-50 rounded-xl">目前帳目清爽，無人欠款 🎉</p>
          ) : (
            <div className="space-y-3">
              {settlements.map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm">{tx.from}</span>
                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-emerald-700 bg-white px-3 py-1 rounded-lg shadow-sm">{tx.to}</span>
                  </div>
                  <span className="font-bold text-gray-800 tracking-wide">¥ {tx.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {expenses.length > 0 && (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 animate-slide-up">
          <h3 className="font-bold text-gray-800 mb-4 text-sm">花費明細</h3>
          <div className="space-y-2">
            {expenses.map(exp => (
              <div key={exp.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 group">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{exp.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {exp.payer} 先付 • 分給: {exp.splitters.join(', ')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-orange-600">¥ {exp.amount.toLocaleString()}</span>
                  <button onClick={() => handleDeleteExpense(exp.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-teal-200">
      <div className="max-w-md mx-auto bg-[#F8FAFC] min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        
        {/* 主要內容區 */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          {activeTab === 'itinerary' && renderItinerary()}
          {activeTab === 'weather' && renderWeather()}
          {activeTab === 'expense' && renderExpenses()}
        </div>

        {/* 底部導覽列 */}
        <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-100 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-3xl z-50">
          <div className="flex justify-around items-center p-2">
            <button 
              onClick={() => setActiveTab('itinerary')}
              className={`flex flex-col items-center justify-center w-full py-2 px-1 rounded-2xl transition-all duration-300 ${activeTab === 'itinerary' ? 'text-teal-600 font-bold bg-teal-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
            >
              <Map className={`w-6 h-6 mb-1 ${activeTab === 'itinerary' ? 'animate-bounce-slow' : ''}`} />
              <span className="text-[11px]">行程</span>
            </button>
            <button 
              onClick={() => setActiveTab('weather')}
              className={`flex flex-col items-center justify-center w-full py-2 px-1 rounded-2xl transition-all duration-300 ${activeTab === 'weather' ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
            >
              <CloudSun className={`w-6 h-6 mb-1 ${activeTab === 'weather' ? 'animate-pulse' : ''}`} />
              <span className="text-[11px]">天氣</span>
            </button>
            <button 
              onClick={() => setActiveTab('expense')}
              className={`flex flex-col items-center justify-center w-full py-2 px-1 rounded-2xl transition-all duration-300 ${activeTab === 'expense' ? 'text-orange-600 font-bold bg-orange-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
            >
              <Receipt className="w-6 h-6 mb-1" />
              <span className="text-[11px]">記帳</span>
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 24px); }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
        
        /* 隱藏水平滾動條但保持可滾動 */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}} />
    </div>
  );
}