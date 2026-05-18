import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Info, Sun, CloudRain, Wind, 
  Wallet, Plus, Users, Utensils, Train, Ticket, 
  Heart, Home, Cloud, Receipt
} from 'lucide-react';

// --- 行程資料 ---
const itinerary = [
  {
    day: "Day 1",
    date: "6/18 (四)",
    title: "啟程：抵達杜之都仙台",
    location: "仙台",
    intro: "第一天輕鬆為主，讓長輩與孕婦有充足的休息時間，用熱騰騰的牛舌開啟完美旅程！",
    schedule: [
      { time: "11:35", event: "星宇航空 JX862 台北起飛", icon: <Sun size={18} /> },
      { time: "16:00", event: "抵達仙台機場", icon: <MapPin size={18} /> },
      { time: "16:45", event: "搭乘機場快速線 (25分) 直達仙台站", icon: <Train size={18} /> },
      { time: "17:30", event: "入住車站直結飯店", icon: <Home size={18} /> },
      { time: "18:30", event: "晚餐：車站3樓 善治郎牛舌", icon: <Utensils size={18} /> },
      { time: "20:00", event: "早點休息補眠", icon: <Heart size={18} /> }
    ]
  },
  {
    day: "Day 2",
    date: "6/19 (五)",
    title: "日本三景松島與療癒水族館",
    location: "松島、仙台",
    intro: "欣賞日本三景之一的松島，下午吹冷氣看海豚秀，全程平路無障礙。",
    schedule: [
      { time: "10:30", event: "搭乘 JR 仙石線前往松島海岸站", icon: <Train size={18} /> },
      { time: "11:15", event: "松島灣觀光船 (特別客室沙發座)", icon: <Ticket size={18} /> },
      { time: "12:30", event: "午餐：搭計程車上松島全景咖啡廳看海", icon: <Utensils size={18} /> },
      { time: "14:30", event: "回程順路於中野榮站下車，轉接駁車", icon: <Train size={18} /> },
      { time: "15:00", event: "仙台海洋森林水族館 (看海豚海獅秀)", icon: <Heart size={18} /> },
      { time: "18:00", event: "返回仙台市區晚餐與休息", icon: <Home size={18} /> }
    ]
  },
  {
    day: "Day 3",
    date: "6/20 (六)",
    title: "盛岡安產祈願與八戶前夜",
    location: "盛岡、八戶",
    intro: "前往盛岡品嚐特色冷麵，並到八幡宮為寶寶祈求安產，傍晚直達八戶。",
    schedule: [
      { time: "10:30", event: "新幹線前往盛岡站 (行李輕裝)", icon: <Train size={18} /> },
      { time: "11:30", event: "午餐：盛岡站前 盛岡冷麵+燒肉", icon: <Utensils size={18} /> },
      { time: "13:00", event: "拆搭計程車直達 盛岡八幡宮", icon: <MapPin size={18} /> },
      { time: "13:30", event: "釣鯛魚籤、求安產御守", icon: <Heart size={18} /> },
      { time: "16:00", event: "新幹線直達八戶站 (約30分)", icon: <Train size={18} /> },
      { time: "17:00", event: "八戶站前飯店 Check-in", icon: <Home size={18} /> },
      { time: "18:30", event: "晚餐：八食中心 頂級熟食海鮮", icon: <Utensils size={18} /> }
    ]
  },
  {
    day: "Day 4",
    date: "6/21 (日)",
    title: "奧入瀨溪流綠意精華遊",
    location: "奧入瀨 (續住八戶)",
    intro: "免換飯店！將坐車時間壓縮到最短，輕鬆享受奧入瀨溪流最精華的散步路段。",
    schedule: [
      { time: "10:00", event: "八戶站西口搭 JR 巴士", icon: <Train size={18} /> },
      { time: "11:44", event: "抵達 石之戶 (平路散步、溪畔野餐)", icon: <MapPin size={18} /> },
      { time: "14:07", event: "換短程巴士前往 銚子大瀑布", icon: <MapPin size={18} /> },
      { time: "14:30", event: "拍全家福大合照、吸收負離子", icon: <Heart size={18} /> },
      { time: "16:18", event: "搭乘末班車返回", icon: <Train size={18} /> },
      { time: "18:20", event: "回到八戶站前 (續住)", icon: <Home size={18} /> }
    ]
  },
  {
    day: "Day 5",
    date: "6/22 (一)",
    title: "小岩井農場大自然與吉伊卡哇",
    location: "盛岡、仙台",
    intro: "輕鬆坐拖拉機遊牧場，下午太太在飯店睡午覺，妹妹與您去市區採購補貨。",
    schedule: [
      { time: "09:30", event: "退房，新幹線返回盛岡站寄放小包", icon: <Train size={18} /> },
      { time: "10:30", event: "轉乘巴士前往 小岩井農場", icon: <MapPin size={18} /> },
      { time: "11:00", event: "農場拖拉機遊覽車 (0腿力遊草原)", icon: <Ticket size={18} /> },
      { time: "12:30", event: "午餐：喝鮮乳、吃霜淇淋", icon: <Utensils size={18} /> },
      { time: "14:30", event: "新幹線一路睡回仙台 (大行李已在房間)", icon: <Home size={18} /> },
      { time: "15:30", event: "太太午休，妹妹下樓逛街買吉伊卡哇", icon: <Heart size={18} /> }
    ]
  },
  {
    day: "Day 6",
    date: "6/23 (二)",
    title: "紫陽花花海與秋保溫泉奢華日",
    location: "仙台、秋保",
    intro: "初夏限定滿開繡球花，下午安排私密湯屋，讓孕婦完全0勞動放鬆舒緩水腫。",
    schedule: [
      { time: "10:00", event: "計程車前往 資福寺 (紫陽花寺)", icon: <MapPin size={18} /> },
      { time: "11:30", event: "午餐：仙台牛燒肉", icon: <Utensils size={18} /> },
      { time: "13:30", event: "計程車前往 秋保溫泉 (如佐勘)", icon: <MapPin size={18} /> },
      { time: "14:00", event: "爸媽妹妹：大眾池 / 太太：私密湯屋", icon: <Heart size={18} /> },
      { time: "15:00", event: "湯屋榻榻米包廂小憩睡午覺", icon: <Home size={18} /> },
      { time: "17:00", event: "返回仙台市區", icon: <Train size={18} /> }
    ]
  },
  {
    day: "Day 7",
    date: "6/24 (三)",
    title: "國寶巡禮與滿載而歸",
    location: "仙台",
    intro: "完美避開階梯參拜國寶八幡宮，車站最後大掃貨，帶著滿滿回憶返家。",
    schedule: [
      { time: "10:00", event: "計程車至 大崎八幡宮 (北參道下車避階梯)", icon: <MapPin size={18} /> },
      { time: "11:30", event: "返回仙台車站 S-PAL 百貨", icon: <MapPin size={18} /> },
      { time: "12:00", event: "午餐與伴手禮大掃貨 (萩之月、毛豆泥)", icon: <Utensils size={18} /> },
      { time: "14:45", event: "搭乘機場快速線前往機場", icon: <Train size={18} /> },
      { time: "17:20", event: "星宇航空 JX863 仙台起飛", icon: <Sun size={18} /> },
      { time: "20:35", event: "抵達台北，旅途平安結束！", icon: <Heart size={18} /> }
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

  // 取得天氣 (OpenWeatherMap)
  useEffect(() => {
    const fetchWeather = async () => {
      setWeatherLoading(true);
      const apiKey = 'ffc25a88fba418a3b33c788d933e6756';
      // 仙台市的座標
      const lat = 38.2682;
      const lon = 140.8694;
      
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=zh_tw`);
        
        if (!res.ok) throw new Error('API Rate limit or Unauthorized');
        
        const data = await res.json();
        
        // 處理 5 天預報資料 (API每3小時一筆，每天抓中午的資料代表)
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);
        
        const formattedWeather = dailyData.map(item => ({
          dt: item.dt,
          temp: {
            min: Math.round(item.main.temp_min - 2), // 簡易推算最低溫
            max: Math.round(item.main.temp_max + 2)  // 簡易推算最高溫
          },
          weather: item.weather
        }));

        setWeatherData(formattedWeather);
        setIsUsingMockWeather(false);
      } catch (error) {
        console.warn("Weather API Error, using mock data.", error);
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
    setNewExpense({ title: '', amount: '', payer: 'Papa' });
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

  // --- UI 元件 ---

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      {/* 頂部 Header */}
      <div className="bg-teal-500 text-white p-6 shadow-md rounded-b-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Sun size={120} className="-mt-4 -mr-4" />
        </div>
        <h1 className="text-2xl font-bold mb-1 relative z-10">日本東北夏日行 🎋</h1>
        <p className="text-teal-50 text-sm relative z-10">6/18 - 6/24 · 仙台、松島、盛岡、奧入瀨</p>
      </div>

      {/* 主導航 */}
      <div className="flex justify-center gap-4 mt-6 px-4">
        <button 
          onClick={() => setMainTab('itinerary')}
          className={`flex flex-col items-center p-3 rounded-2xl w-24 transition-all ${mainTab === 'itinerary' ? 'bg-white shadow-lg text-teal-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          <MapPin size={24} className="mb-1" />
          <span className="text-xs font-bold">行程表</span>
        </button>
        <button 
          onClick={() => setMainTab('weather')}
          className={`flex flex-col items-center p-3 rounded-2xl w-24 transition-all ${mainTab === 'weather' ? 'bg-white shadow-lg text-teal-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          <Sun size={24} className="mb-1" />
          <span className="text-xs font-bold">天氣穿搭</span>
        </button>
        <button 
          onClick={() => setMainTab('expenses')}
          className={`flex flex-col items-center p-3 rounded-2xl w-24 transition-all ${mainTab === 'expenses' ? 'bg-white shadow-lg text-teal-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          <Receipt size={24} className="mb-1" />
          <span className="text-xs font-bold">分帳計算</span>
        </button>
      </div>

      <div className="p-4 mt-2">
        {/* ================= 行程表 View ================= */}
        {mainTab === 'itinerary' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* 🌟 左右滑動的 Day Tabs (解決超出螢幕的問題) */}
            <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
              {/* [&::-webkit-scrollbar]:hidden 等語法用來隱藏捲軸，保持美觀 */}
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

            {/* 當天行程卡片 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mt-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-teal-600 font-bold text-sm mb-1">{itinerary[activeDay].day} • {itinerary[activeDay].date}</p>
                  <h2 className="text-xl font-bold text-slate-800">{itinerary[activeDay].title}</h2>
                </div>
                <div className="bg-teal-50 p-2 rounded-full text-teal-600">
                  <MapPin size={20} />
                </div>
              </div>
              
              <div className="bg-orange-50 text-orange-800 p-4 rounded-2xl text-sm leading-relaxed mb-6 flex items-start gap-3">
                <Info size={20} className="shrink-0 mt-0.5 text-orange-500" />
                <p>{itinerary[activeDay].intro}</p>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {itinerary[activeDay].schedule.map((item, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    
                    {/* 時間線圓點 */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-teal-100 text-teal-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                      {item.icon}
                    </div>
                    
                    {/* 內容區塊 */}
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm ml-4 md:ml-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={14} className="text-slate-400" />
                        <span className="font-bold text-slate-700">{item.time}</span>
                      </div>
                      <p className="text-slate-600 text-sm">{item.event}</p>
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

            {/* 新增花費表單 */}
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

            {/* 結算結果 */}
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

            {/* 花費明細列表 */}
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