import { useState, useRef, useEffect } from "react";
import {
  Home,
  Calendar,
  BarChart3,
  User,
  Plus,
  Bell,
  Settings,
  Camera,
  MoreHorizontal,
  ListChecks,
  BookHeart,
  Image as ImageIcon,
  Sparkles,
  Heart,
  Trophy,
  Dumbbell,
  Bike,
  HeartPulse,
  Moon,
  Coffee,
  Apple,
  Droplets,
  PenLine,
  Laptop,
  BookOpen,
  Brain,
  Leaf,
  Music,
  Timer,
  Smile,
  Wind,
  Flame,
  Star,
  Sun,
  Utensils,
} from "lucide-react";

const today = new Date();

const ICON_MAP = {
  Dumbbell,
  Bike,
  HeartPulse,
  Moon,
  Coffee,
  Apple,
  Droplets,
  PenLine,
  Laptop,
  BookOpen,
  Brain,
  Leaf,
  Music,
  Timer,
  Smile,
  Wind,
  Flame,
  Star,
  Sun,
  Utensils,
};

function RoutineIcon({ name, size = 18, color = "#555" }) {
  const Comp = ICON_MAP[name];
  if (!Comp) return null;
  return <Comp size={size} color={color} strokeWidth={2} />;
}

const GREEN = "#34C759";
const GREEN_LIGHT = "#E8F5E9";
const GREEN_DARK = "#2BA84A";

// 🌱 진화 단계
const EVO_STAGES = [
  { level: 1, name: "씨앗", emoji: "🌰", expNeeded: 0, color: "#A89070" },
  { level: 2, name: "새싹", emoji: "🌱", expNeeded: 30, color: "#A8D88A" },
  { level: 3, name: "어린나무", emoji: "🌿", expNeeded: 100, color: "#7BC74D" },
  { level: 4, name: "큰나무", emoji: "🌳", expNeeded: 250, color: "#52B788" },
  { level: 5, name: "꽃나무", emoji: "🌸", expNeeded: 500, color: "#FFB7C5" },
  {
    level: 6,
    name: "열매나무",
    emoji: "🍎",
    expNeeded: 1000,
    color: "#FF8C42",
  },
];

function getStage(exp) {
  for (let i = EVO_STAGES.length - 1; i >= 0; i--) {
    if (exp >= EVO_STAGES[i].expNeeded) return EVO_STAGES[i];
  }
  return EVO_STAGES[0];
}

function getNextStage(exp) {
  for (let i = 0; i < EVO_STAGES.length; i++) {
    if (exp < EVO_STAGES[i].expNeeded) return EVO_STAGES[i];
  }
  return null;
}

const toKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const todayKey = toKey(today);

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s !== null ? JSON.parse(s) : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, [key, val]);
  return [val, setVal];
}

function calculateStreak(dailyRecords, fromKey) {
  let streak = 0;
  const d = new Date(fromKey + "T12:00:00");
  for (let i = 0; i < 365; i++) {
    const k = toKey(d);
    const hasDone = (dailyRecords[k]?.todos || []).some((t) => t.done);
    if (!hasDone) break;
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

// 🌱 새싹 캐릭터 (진화 단계별)
function Sprout({ size = 80, stage = 2 }) {
  const stageData = EVO_STAGES.find((s) => s.level === stage) || EVO_STAGES[1];

  // Stage 1: 씨앗
  if (stage === 1) {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <ellipse cx="50" cy="65" rx="20" ry="22" fill="#A89070" />
        <ellipse cx="50" cy="68" rx="16" ry="18" fill="#C4A883" />
        <ellipse cx="42" cy="62" rx="2" ry="3" fill="#2d2d2d" />
        <ellipse cx="58" cy="62" rx="2" ry="3" fill="#2d2d2d" />
        <path
          d="M 46 72 Q 50 75 54 72"
          stroke="#2d2d2d"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Stage 2: 새싹 (기본)
  if (stage === 2) {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <ellipse
          cx="35"
          cy="20"
          rx="12"
          ry="18"
          fill="#7BC74D"
          transform="rotate(-30 35 20)"
        />
        <ellipse
          cx="55"
          cy="18"
          rx="10"
          ry="15"
          fill="#A8D88A"
          transform="rotate(20 55 18)"
        />
        <ellipse cx="50" cy="60" rx="28" ry="30" fill="#A8D88A" />
        <ellipse cx="50" cy="63" rx="24" ry="26" fill="#C5E5A4" />
        <circle cx="32" cy="65" r="4" fill="#FFB7C5" opacity="0.7" />
        <circle cx="68" cy="65" r="4" fill="#FFB7C5" opacity="0.7" />
        <ellipse cx="40" cy="55" rx="2.5" ry="3.5" fill="#2d2d2d" />
        <ellipse cx="60" cy="55" rx="2.5" ry="3.5" fill="#2d2d2d" />
        <circle cx="41" cy="54" r="1" fill="#fff" />
        <circle cx="61" cy="54" r="1" fill="#fff" />
        <path
          d="M 44 65 Q 50 70 56 65"
          stroke="#2d2d2d"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Stage 3: 어린나무
  if (stage === 3) {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <rect x="46" y="65" width="8" height="20" fill="#8B6F47" rx="2" />
        <ellipse cx="50" cy="40" rx="32" ry="28" fill="#7BC74D" />
        <ellipse cx="35" cy="35" rx="14" ry="12" fill="#8DD96A" />
        <ellipse cx="65" cy="35" rx="14" ry="12" fill="#8DD96A" />
        <ellipse cx="42" cy="40" rx="2.5" ry="3.5" fill="#2d2d2d" />
        <ellipse cx="58" cy="40" rx="2.5" ry="3.5" fill="#2d2d2d" />
        <circle cx="43" cy="39" r="1" fill="#fff" />
        <circle cx="59" cy="39" r="1" fill="#fff" />
        <path
          d="M 44 50 Q 50 55 56 50"
          stroke="#2d2d2d"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="32" cy="50" r="3" fill="#FFB7C5" opacity="0.6" />
        <circle cx="68" cy="50" r="3" fill="#FFB7C5" opacity="0.6" />
      </svg>
    );
  }

  // Stage 4: 큰나무
  if (stage === 4) {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <rect x="44" y="60" width="12" height="28" fill="#7B5E3F" rx="3" />
        <ellipse cx="50" cy="38" rx="38" ry="32" fill="#52B788" />
        <ellipse cx="30" cy="30" rx="16" ry="14" fill="#6BC68F" />
        <ellipse cx="70" cy="30" rx="16" ry="14" fill="#6BC68F" />
        <ellipse cx="50" cy="22" rx="14" ry="10" fill="#7BD498" />
        <ellipse cx="42" cy="38" rx="3" ry="4" fill="#2d2d2d" />
        <ellipse cx="58" cy="38" rx="3" ry="4" fill="#2d2d2d" />
        <circle cx="43" cy="37" r="1.2" fill="#fff" />
        <circle cx="59" cy="37" r="1.2" fill="#fff" />
        <path
          d="M 43 48 Q 50 54 57 48"
          stroke="#2d2d2d"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="30" cy="46" r="3" fill="#FFB7C5" opacity="0.6" />
        <circle cx="70" cy="46" r="3" fill="#FFB7C5" opacity="0.6" />
      </svg>
    );
  }

  // Stage 5: 꽃나무
  if (stage === 5) {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <rect x="44" y="62" width="12" height="26" fill="#7B5E3F" rx="3" />
        <ellipse cx="50" cy="38" rx="38" ry="32" fill="#52B788" />
        <ellipse cx="30" cy="30" rx="16" ry="14" fill="#6BC68F" />
        <ellipse cx="70" cy="30" rx="16" ry="14" fill="#6BC68F" />
        {/* 꽃들 */}
        <circle cx="25" cy="22" r="4" fill="#FFB7C5" />
        <circle cx="75" cy="22" r="4" fill="#FFB7C5" />
        <circle cx="50" cy="14" r="5" fill="#FF9BB5" />
        <circle cx="20" cy="40" r="4" fill="#FFC9D6" />
        <circle cx="80" cy="40" r="4" fill="#FFC9D6" />
        <circle cx="50" cy="40" r="3" fill="#FFD5DD" />
        {/* 얼굴 */}
        <ellipse cx="42" cy="42" rx="3" ry="4" fill="#2d2d2d" />
        <ellipse cx="58" cy="42" rx="3" ry="4" fill="#2d2d2d" />
        <circle cx="43" cy="41" r="1.2" fill="#fff" />
        <circle cx="59" cy="41" r="1.2" fill="#fff" />
        <path
          d="M 43 51 Q 50 57 57 51"
          stroke="#2d2d2d"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Stage 6: 열매나무
  if (stage === 6) {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <rect x="44" y="62" width="12" height="26" fill="#7B5E3F" rx="3" />
        <ellipse cx="50" cy="38" rx="40" ry="34" fill="#3F9F70" />
        <ellipse cx="28" cy="28" rx="18" ry="15" fill="#52B788" />
        <ellipse cx="72" cy="28" rx="18" ry="15" fill="#52B788" />
        {/* 열매들 */}
        <circle cx="25" cy="40" r="5" fill="#FF6B6B" />
        <circle cx="75" cy="40" r="5" fill="#FF6B6B" />
        <circle cx="20" cy="25" r="4" fill="#FF8C42" />
        <circle cx="80" cy="25" r="4" fill="#FF8C42" />
        <circle cx="50" cy="18" r="5" fill="#FFD93D" />
        <circle cx="35" cy="50" r="4" fill="#FF6B6B" />
        <circle cx="65" cy="50" r="4" fill="#FF6B6B" />
        {/* 반짝임 */}
        <circle cx="22" cy="38" r="1.5" fill="#fff" opacity="0.8" />
        <circle cx="72" cy="38" r="1.5" fill="#fff" opacity="0.8" />
        {/* 얼굴 */}
        <ellipse cx="42" cy="40" rx="3" ry="4" fill="#2d2d2d" />
        <ellipse cx="58" cy="40" rx="3" ry="4" fill="#2d2d2d" />
        <circle cx="43" cy="39" r="1.2" fill="#fff" />
        <circle cx="59" cy="39" r="1.2" fill="#fff" />
        <path
          d="M 42 50 Q 50 58 58 50"
          stroke="#2d2d2d"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return null;
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [exp, setExp] = useLocalStorage("exp", 0);
  const [photos, setPhotos] = useLocalStorage("photos", []);
  const [diaries, setDiaries] = useLocalStorage("diaries", []);
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [dailyRecords, setDailyRecords] = useLocalStorage("dailyRecords", {});
  const [profileName, setProfileName] = useLocalStorage("profileName", "루프");
  const [routines, setRoutines] = useLocalStorage("routines", [
    { id: 1, name: "물 마시기", desc: "오늘 8잔 목표", icon: "💧", color: "#4A90E2", bgColor: "#E3F2FD", streak: 0, todayDone: 0, target: 8, totalDays: 0, history: [false,false,false,false,false,false,false] },
    { id: 2, name: "운동", desc: "건강한 몸", icon: "🏃", color: "#FF6B6B", bgColor: "#FFE0E0", streak: 0, todayDone: 0, target: 1, totalDays: 0, history: [false,false,false,false,false,false,false] },
    { id: 3, name: "독서", desc: "매일 30분", icon: "📚", color: "#F5A623", bgColor: "#FFF3D6", streak: 0, todayDone: 0, target: 5, totalDays: 0, history: [false,false,false,false,false,false,false] },
    { id: 4, name: "명상", desc: "마음 챙기기", icon: "🧘", color: "#9B7EBD", bgColor: "#F3E5F5", streak: 0, todayDone: 0, target: 6, totalDays: 0, history: [false,false,false,false,false,false,false] },
    { id: 5, name: "식단", desc: "건강하게", icon: "🍎", color: "#52B788", bgColor: "#E8F5E9", streak: 0, todayDone: 0, target: 3, totalDays: 0, history: [false,false,false,false,false,false,false] },
  ]);

  const stage = getStage(exp);
  const nextStage = getNextStage(exp);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
        minHeight: "100vh",
        fontFamily:
          "'Pretendard', 'Apple SD Gothic Neo', -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#F4F8F2",
        color: "#2d2d2d",
        paddingBottom: 90,
        position: "relative",
      }}
    >
      {tab === "home" && (
        <HomeScreen
          exp={exp}
          setExp={setExp}
          stage={stage}
          nextStage={nextStage}
          setTab={setTab}
          todos={todos}
          setTodos={setTodos}
          dailyRecords={dailyRecords}
          setDailyRecords={setDailyRecords}
        />
      )}
      {tab === "routine" && <RoutineGridScreen exp={exp} setExp={setExp} routines={routines} setRoutines={setRoutines} />}
      {tab === "record" && (
        <RecordScreen
          photos={photos}
          setPhotos={setPhotos}
          diaries={diaries}
          setDiaries={setDiaries}
        />
      )}
      {tab === "focus" && <FocusScreen exp={exp} setExp={setExp} />}
      {tab === "profile" && (
        <ProfileScreen
          exp={exp}
          stage={stage}
          routines={routines}
          photos={photos}
          diaries={diaries}
          dailyRecords={dailyRecords}
          profileName={profileName}
          setProfileName={setProfileName}
        />
      )}

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

// ========== 홈 화면 ==========
function HomeScreen({ exp, setExp, stage, nextStage, setTab, todos, setTodos, dailyRecords, setDailyRecords }) {
  const [selectedKey, setSelectedKey] = useState(todayKey);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [weekCenter, setWeekCenter] = useState(today);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newText, setNewText] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const selectedDateObj = new Date(selectedKey + "T12:00:00");
  const isSelectedToday = selectedKey === todayKey;
  const isSelectedFuture = selectedDateObj > today && !isSelectedToday;

  const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];
  const weekDates = [];
  for (let i = -6; i <= 6; i++) {
    const d = new Date(weekCenter);
    d.setDate(weekCenter.getDate() + i);
    weekDates.push(d);
  }

  const openCalendar = () => {
    setCalendarYear(selectedDateObj.getFullYear());
    setCalendarMonth(selectedDateObj.getMonth());
    setShowCalendar(true);
  };

  const handleCalendarSelect = (key) => {
    setSelectedKey(key);
    setWeekCenter(new Date(key + "T12:00:00"));
    setShowCalendar(false);
  };

  const prevCalMonth = () => {
    if (calendarMonth === 0) {
      setCalendarYear((y) => y - 1);
      setCalendarMonth(11);
    } else setCalendarMonth((m) => m - 1);
  };

  const nextCalMonth = () => {
    if (calendarMonth === 11) {
      setCalendarYear((y) => y + 1);
      setCalendarMonth(0);
    } else setCalendarMonth((m) => m + 1);
  };

  const saveSnapshot = (newTodos) => {
    setDailyRecords((prev) => ({
      ...prev,
      [todayKey]: { todos: newTodos },
    }));
  };

  const addItem = () => {
    if (!newText.trim()) return;
    const next = [
      ...todos,
      { id: Date.now(), text: newText.trim(), done: false },
    ];
    setTodos(next);
    saveSnapshot(next);
    setNewText("");
    setShowAddForm(false);
  };

  const deleteItem = (id) => {
    const item = todos.find((r) => r.id === id);
    if (item && item.done) setExp(Math.max(0, exp - 10));
    const next = todos.filter((r) => r.id !== id);
    setTodos(next);
    saveSnapshot(next);
    setOpenMenuId(null);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.text);
    setOpenMenuId(null);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    const next = todos.map((r) =>
      r.id === editingId ? { ...r, text: editText.trim() } : r,
    );
    setTodos(next);
    saveSnapshot(next);
    setEditingId(null);
  };

  const toggle = (id) => {
    const item = todos.find((r) => r.id === id);
    if (item && !item.done) setExp(exp + 10);
    if (item && item.done) setExp(Math.max(0, exp - 10));
    const next = todos.map((r) => (r.id === id ? { ...r, done: !r.done } : r));
    setTodos(next);
    saveSnapshot(next);
  };

  const getDotsForDate = (d) => {
    const key = toKey(d);
    const rec = dailyRecords[key];
    if (!rec) return [];
    const t = rec.todos || [];
    if (t.length === 0) return [];
    const doneCount = t.filter((x) => x.done).length;
    const rate = doneCount / t.length;
    if (rate === 1) return [GREEN, GREEN];
    if (rate >= 0.5) return [GREEN, "#F5C518"];
    return ["#F5C518"];
  };

  const displayList = isSelectedToday
    ? todos
    : dailyRecords[selectedKey]?.todos || [];

  const done = displayList.filter((r) => r.done).length;
  const total = displayList.length;

  return (
    <div style={{ background: "#F2F2F7", minHeight: "100vh", paddingBottom: 20 }}>
      {showCalendar && (
        <MonthCalendarPopup
          year={calendarYear} month={calendarMonth} selectedKey={selectedKey}
          todayKey={todayKey} dailyRecords={dailyRecords} toKey={toKey}
          onSelect={handleCalendarSelect} onClose={() => setShowCalendar(false)}
          onPrevMonth={prevCalMonth} onNextMonth={nextCalMonth}
        />
      )}

      {/* 헤더 */}
      <div style={{ padding: "22px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: "#aaa", margin: 0 }}>
          {isSelectedToday
            ? total === 0 ? "오늘 할 일을 추가해보세요" : `오늘 ${done}/${total}개 완료`
            : `${selectedDateObj.getMonth() + 1}월 ${selectedDateObj.getDate()}일 기록`}
        </p>
        <div onClick={openCalendar} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 3, padding: "6px 10px", background: "#fff", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#555" }}>
            {selectedDateObj.getFullYear()}년 {selectedDateObj.getMonth() + 1}월
          </span>
          <span style={{ fontSize: 10, color: "#bbb" }}>▾</span>
        </div>
      </div>

      {/* 날짜 스크롤 */}
      <div style={{ background: "#fff", borderRadius: 16, marginBottom: 14, marginLeft: 16, marginRight: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", padding: "12px 0" }}>
        <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", padding: "0 12px" }}>
          {weekDates.map((d, i) => {
            const date = d.getDate();
            const dow = d.getDay();
            const isToday = d.toDateString() === today.toDateString();
            const isSelected = toKey(d) === selectedKey;
            const dots = getDotsForDate(d);
            return (
              <button key={i} onClick={() => setSelectedKey(toKey(d))}
                style={{ flexShrink: 0, width: 44, padding: "2px 0", background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: dow === 0 ? "#FF453A" : dow === 6 ? "#0A84FF" : "#C0C0C0", letterSpacing: "0.2px" }}>
                  {dayLabels[dow]}
                </span>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: isSelected ? GREEN : "transparent",
                  border: isToday && !isSelected ? `2px solid ${GREEN}` : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15, fontWeight: isSelected || isToday ? 700 : 400,
                  color: isSelected ? "#fff" : isToday ? GREEN : "#1a1a1a",
                }}>
                  {date}
                </div>
                <div style={{ display: "flex", gap: 2 }}>
                  {dots.slice(0, 2).map((c, idx) => (
                    <div key={idx} style={{ width: 4, height: 4, borderRadius: "50%", background: c }} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

        {/* 할일 목록 */}
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden", marginLeft: 16, marginRight: 16 }}>
          {/* 미래 날짜 */}
          {isSelectedFuture && (
            <div style={{ padding: "32px 12px", textAlign: "center", color: "#CCC", fontSize: 13 }}>
              아직 오지 않은 날이에요
            </div>
          )}

          {/* 과거 기록 없음 */}
          {!isSelectedToday && !isSelectedFuture && displayList.length === 0 && (
            <div style={{ padding: "32px 12px", textAlign: "center", color: "#CCC", fontSize: 13 }}>
              이날 기록이 없어요
            </div>
          )}

          {/* 과거: 읽기 전용 */}
          {!isSelectedToday && !isSelectedFuture && displayList.map((item, idx) => (
            <div
              key={item.id}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "13px 14px",
                borderTop: idx > 0 ? "1px solid #F5F5F5" : "none",
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                border: `1.5px solid ${item.done ? GREEN : "#DDD"}`,
                background: item.done ? GREEN : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {item.done && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
              </div>
              <span style={{ flex: 1, fontSize: 14, color: item.done ? "#bbb" : "#1a1a1a", textDecoration: item.done ? "line-through" : "none" }}>
                {item.text}
              </span>
            </div>
          ))}

          {/* 오늘: 인터랙티브 */}
          {isSelectedToday && displayList.map((item, idx) =>
            editingId === item.id ? (
              <div key={item.id} style={{ padding: "8px 12px 4px", borderTop: idx > 0 ? "1px solid #F5F5F5" : "none" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    autoFocus value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditingId(null); }}
                    style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1.5px solid #EBEBEB", fontSize: 14, outline: "none", fontFamily: "inherit", color: "#1a1a1a" }}
                  />
                  <button onClick={saveEdit} style={{ height: 42, padding: "0 14px", borderRadius: 10, border: "none", background: GREEN, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>저장</button>
                  <button onClick={() => setEditingId(null)} style={{ height: 42, padding: "0 12px", borderRadius: 10, border: "1px solid #EBEBEB", background: "#fff", color: "#999", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>취소</button>
                </div>
              </div>
            ) : openMenuId === item.id ? (
              <div
                key={item.id}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "#F7F7F8", borderTop: idx > 0 ? "1px solid #F5F5F5" : "none" }}
              >
                <span style={{ flex: 1, fontSize: 14, color: "#bbb", textDecoration: item.done ? "line-through" : "none" }}>{item.text}</span>
                <button onClick={() => startEdit(item)} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#EBEBEB", color: "#555", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>수정</button>
                <button onClick={() => deleteItem(item.id)} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#FEF2F2", color: "#EF4444", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>삭제</button>
                <button onClick={() => setOpenMenuId(null)} style={{ padding: "4px 6px", border: "none", background: "transparent", color: "#CCC", fontSize: 15, cursor: "pointer", lineHeight: 1 }}>✕</button>
              </div>
            ) : (
              /* 일반 */
              <div
                key={item.id}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "13px 14px",
                  borderTop: idx > 0 ? "1px solid #F5F5F5" : "none",
                }}
              >
                <div
                  onClick={() => toggle(item.id)}
                  style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                    border: `1.5px solid ${item.done ? GREEN : "#DDD"}`,
                    background: item.done ? GREEN : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.done && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
                  </div>
                  <span style={{ flex: 1, fontSize: 14, color: item.done ? "#bbb" : "#1a1a1a", textDecoration: item.done ? "line-through" : "none" }}>
                    {item.text}
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setOpenMenuId(item.id); setShowAddForm(false); }}
                  style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", flexShrink: 0 }}
                >
                  <MoreHorizontal size={16} color="#CCC" />
                </button>
              </div>
            ),
          )}

          {/* 추가 폼 */}
          {isSelectedToday && showAddForm && (
            <div style={{ padding: "8px 12px", borderTop: displayList.length > 0 ? "1px solid #F5F5F5" : "none" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  autoFocus value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") addItem(); if (e.key === "Escape") setShowAddForm(false); }}
                  placeholder="할 일 입력"
                  style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1.5px solid #EBEBEB", fontSize: 14, outline: "none", fontFamily: "inherit", color: "#1a1a1a" }}
                />
                <button onClick={addItem} style={{ height: 42, padding: "0 14px", borderRadius: 10, border: "none", background: GREEN, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>추가</button>
                <button onClick={() => { setShowAddForm(false); setNewText(""); }} style={{ height: 42, padding: "0 12px", borderRadius: 10, border: "1px solid #EBEBEB", background: "#fff", color: "#999", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>취소</button>
              </div>
            </div>
          )}

          {/* 추가 버튼 */}
          {isSelectedToday && !showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                width: "100%", padding: "12px 14px", border: "none",
                borderTop: displayList.length > 0 ? "1px solid #F5F5F5" : "none",
                background: "transparent", color: "#bbb", fontSize: 13,
                fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <Plus size={14} strokeWidth={2} color="#CCC" /> 할 일 추가
            </button>
          )}
        </div>
    </div>
  );
}

// ========== 풀 캘린더 팝업 ==========
function MonthCalendarPopup({
  year,
  month,
  selectedKey,
  todayKey,
  dailyRecords,
  toKey,
  onSelect,
  onClose,
  onPrevMonth,
  onNextMonth,
}) {
  const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 50,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          borderRadius: 24,
          padding: "20px 16px 16px",
          width: "min(360px, calc(100vw - 40px))",
          zIndex: 51,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* 월 네비게이션 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <button
            onClick={onPrevMonth}
            style={{
              border: "none",
              background: "#F0F4ED",
              borderRadius: 10,
              width: 36,
              height: 36,
              fontSize: 18,
              cursor: "pointer",
              color: "#555",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>
          <span style={{ fontSize: 16, fontWeight: 800 }}>
            {year}년 {month + 1}월
          </span>
          <button
            onClick={onNextMonth}
            style={{
              border: "none",
              background: "#F0F4ED",
              borderRadius: 10,
              width: 36,
              height: 36,
              fontSize: 18,
              cursor: "pointer",
              color: "#555",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
        </div>

        {/* 요일 헤더 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            marginBottom: 4,
          }}
        >
          {dayLabels.map((d, i) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 0",
                color: i === 0 ? "#FF6B6B" : i === 6 ? "#4A90E2" : "#999",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* 날짜 셀 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2,
          }}
        >
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const dateObj = new Date(year, month, d);
            const key = toKey(dateObj);
            const isToday = key === todayKey;
            const isSelected = key === selectedKey;
            const rec = dailyRecords[key];
            const routineList = rec?.routines || [];
            const doneCount = routineList.filter((r) => r.done).length;
            const rate =
              routineList.length > 0 ? doneCount / routineList.length : 0;
            const dots =
              rate === 1
                ? [GREEN, GREEN]
                : rate >= 0.5
                  ? [GREEN, "#F5C518"]
                  : rate > 0
                    ? ["#F5C518"]
                    : [];
            const dow = dateObj.getDay();

            return (
              <button
                key={i}
                onClick={() => onSelect(key)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  padding: "4px 0",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: isSelected
                      ? GREEN
                      : isToday
                        ? GREEN_LIGHT
                        : "transparent",
                    border:
                      isToday && !isSelected ? `1.5px solid ${GREEN}` : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: isToday || isSelected ? 700 : 400,
                    color: isSelected
                      ? "#fff"
                      : isToday
                        ? GREEN_DARK
                        : dow === 0
                          ? "#FF6B6B"
                          : dow === 6
                            ? "#4A90E2"
                            : "#2d2d2d",
                  }}
                >
                  {d}
                </div>
                <div style={{ height: 4, display: "flex", gap: 2 }}>
                  {dots.map((c, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        background: c,
                      }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          style={{
            display: "block",
            margin: "14px auto 0",
            padding: "10px 40px",
            border: "none",
            background: "#F0F4ED",
            color: GREEN_DARK,
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          닫기
        </button>
      </div>
    </>
  );
}

// ========== 루틴 화면 ==========
function RoutineGridScreen({ exp, setExp, routines, setRoutines }) {
  const [confetti, setConfetti] = useState(null);
  const [completionModal, setCompletionModal] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formTarget, setFormTarget] = useState(1);
  const [formIcon, setFormIcon] = useState("⭐");
  const [formColorIdx, setFormColorIdx] = useState(0);

  const ICON_OPTIONS = ["💧","🏃","📚","🧘","🍎","💪","🎵","🌙","✏️","💻","🧠","⭐","🔥","🏆","🎯"];
  const COLOR_OPTIONS = [
    { color: "#4A90E2", bg: "#E3F2FD" },
    { color: "#FF6B6B", bg: "#FFE0E0" },
    { color: "#F5A623", bg: "#FFF3D6" },
    { color: "#9B7EBD", bg: "#F3E5F5" },
    { color: "#52B788", bg: "#E8F5E9" },
    { color: "#FF8C42", bg: "#FFF0E5" },
  ];

  const triggerConfetti = (routine) => {
    setConfetti({ id: Date.now(), color: routine.color });
    setTimeout(() => setConfetti(null), 1500);
  };

  const incrementRoutine = (id) => {
    setRoutines(routines.map((r) => {
      if (r.id !== id) return r;
      const newDone = Math.min(r.target, r.todayDone + 1);
      const justCompleted = newDone === r.target && r.todayDone < r.target;
      if (justCompleted) {
        setCompletionModal(r);
        setExp(exp + 20);
      } else if (newDone > r.todayDone) {
        setExp(exp + 5);
      }
      const newHistory = justCompleted
        ? [...r.history.slice(0, 6), true]
        : r.history;
      return { ...r, todayDone: newDone, history: newHistory };
    }));
  };

  const deleteRoutine = (id) => {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
    setOpenMenuId(null);
  };

  const openAdd = () => {
    setFormMode("add");
    setFormName(""); setFormDesc(""); setFormTarget(1);
    setFormIcon("⭐"); setFormColorIdx(0);
    setShowForm(true);
    setOpenMenuId(null);
  };

  const openEdit = (r) => {
    setFormMode("edit");
    setEditingId(r.id);
    setFormName(r.name); setFormDesc(r.desc); setFormTarget(r.target);
    setFormIcon(r.icon);
    const idx = COLOR_OPTIONS.findIndex((c) => c.color === r.color);
    setFormColorIdx(idx >= 0 ? idx : 0);
    setOpenMenuId(null);
    setShowForm(true);
  };

  const submitForm = () => {
    if (!formName.trim()) return;
    const col = COLOR_OPTIONS[formColorIdx];
    if (formMode === "add") {
      setRoutines((prev) => [...prev, {
        id: Date.now(),
        name: formName.trim(),
        desc: formDesc.trim() || "매일 실천하기",
        icon: formIcon,
        color: col.color,
        bgColor: col.bg,
        streak: 0, todayDone: 0, target: formTarget, totalDays: 0,
        history: [false, false, false, false, false, false, false],
      }]);
    } else {
      setRoutines((prev) => prev.map((r) => r.id === editingId
        ? { ...r, name: formName.trim(), desc: formDesc.trim() || r.desc, icon: formIcon, color: col.color, bgColor: col.bg, target: formTarget }
        : r
      ));
    }
    setShowForm(false);
  };

  const totalCompleted = routines.filter((r) => r.todayDone >= r.target).length;
  const totalRoutines = routines.length;
  const overallPercent = totalRoutines > 0 ? Math.round((totalCompleted / totalRoutines) * 100) : 0;
  const selectedColor = COLOR_OPTIONS[formColorIdx];

  return (
    <div style={{ background: "#F2F2F7", minHeight: "100vh", paddingBottom: 20 }}>
      {confetti && <Confetti color={confetti.color} key={confetti.id} />}

      {/* 루틴 완료 모달 */}
      {completionModal && (() => {
        const doneCount = routines.filter((r) => r.todayDone >= r.target).length;
        return (
          <>
            <div onClick={() => setCompletionModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 60 }} />
            <div style={{
              position: "fixed", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "calc(100% - 48px)", maxWidth: 320,
              background: "#fff", borderRadius: 20,
              padding: "28px 24px 24px",
              zIndex: 61, textAlign: "center",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: GREEN_LIGHT, margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 24, color: GREEN_DARK }}>✓</span>
              </div>
              <p style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a", margin: "0 0 6px" }}>완료!</p>
              <p style={{ fontSize: 13, color: "#999", margin: "0 0 20px", lineHeight: 1.6 }}>
                {doneCount}번째 루틴을 달성했어요
              </p>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "#F7F7F8", borderRadius: 12,
                padding: "12px 14px", marginBottom: 20,
              }}>
                <span style={{ fontSize: 20 }}>{completionModal.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: "#1a1a1a" }}>{completionModal.name}</p>
                  <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>+20 EXP</p>
                </div>
              </div>
              <button onClick={() => setCompletionModal(null)} style={{
                width: "100%", padding: "12px 0", borderRadius: 12,
                border: "none", background: GREEN, color: "#fff",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}>
                확인
              </button>
            </div>
          </>
        );
      })()}

      {/* 추가/수정 폼 바텀시트 */}
      {showForm && (
        <>
          <div onClick={() => setShowForm(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 50 }} />
          <div style={{
            position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: "100%", maxWidth: 420, background: "#fff",
            borderRadius: "20px 20px 0 0", padding: "16px 20px 40px",
            zIndex: 51, boxShadow: "0 -4px 24px rgba(0,0,0,0.1)",
          }}>
            <div style={{ width: 36, height: 4, background: "#E5E5E5", borderRadius: 2, margin: "0 auto 20px" }} />
            <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 20px", textAlign: "center", color: "#1a1a1a" }}>
              {formMode === "add" ? "루틴 추가" : "루틴 수정"}
            </p>

            <p style={{ fontSize: 11, color: "#aaa", fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>아이콘</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
              {ICON_OPTIONS.map((ic) => (
                <button key={ic} onClick={() => setFormIcon(ic)} style={{
                  width: 40, height: 40, borderRadius: 10, border: "1.5px solid",
                  borderColor: formIcon === ic ? selectedColor.color : "#EBEBEB",
                  background: formIcon === ic ? selectedColor.bg : "#fff",
                  fontSize: 18, cursor: "pointer",
                }}>{ic}</button>
              ))}
            </div>

            <p style={{ fontSize: 11, color: "#aaa", fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>색상</p>
            <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
              {COLOR_OPTIONS.map((c, i) => (
                <button key={i} onClick={() => setFormColorIdx(i)} style={{
                  width: 28, height: 28, borderRadius: "50%", background: c.color,
                  border: formColorIdx === i ? `3px solid #1a1a1a` : "3px solid transparent",
                  cursor: "pointer", outline: "none", flexShrink: 0,
                }} />
              ))}
            </div>

            <p style={{ fontSize: 11, color: "#aaa", fontWeight: 600, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>이름</p>
            <input
              autoFocus value={formName} onChange={(e) => setFormName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitForm()}
              placeholder="루틴 이름"
              style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #EBEBEB", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 12, color: "#1a1a1a" }}
            />

            <p style={{ fontSize: 11, color: "#aaa", fontWeight: 600, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>설명 (선택)</p>
            <input
              value={formDesc} onChange={(e) => setFormDesc(e.target.value)}
              placeholder="간단한 설명"
              style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #EBEBEB", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 18, color: "#1a1a1a" }}
            />

            <p style={{ fontSize: 11, color: "#aaa", fontWeight: 600, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>목표 횟수</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <button onClick={() => setFormTarget((t) => Math.max(1, t - 1))} style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #EBEBEB", background: "#fff", fontSize: 18, cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>−</button>
              <span style={{ fontSize: 22, fontWeight: 700, minWidth: 36, textAlign: "center", color: "#1a1a1a" }}>{formTarget}</span>
              <button onClick={() => setFormTarget((t) => Math.min(30, t + 1))} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: GREEN, color: "#fff", fontSize: 18, cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              <span style={{ fontSize: 13, color: "#aaa" }}>회</span>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "1.5px solid #EBEBEB", background: "#fff", color: "#999", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>취소</button>
              <button onClick={submitForm} style={{ flex: 2, padding: "13px 0", borderRadius: 12, border: "none", background: selectedColor.color, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                {formMode === "add" ? "추가" : "저장"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* 헤더 */}
      <div style={{ padding: "22px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: "#aaa", margin: 0 }}>
          오늘 {totalCompleted}/{totalRoutines} 완료
        </p>
        <button onClick={openAdd} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 14px", borderRadius: 10, border: "none",
          background: "#1a1a1a", color: "#fff",
          fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}>
          <Plus size={14} strokeWidth={2.5} /> 추가
        </button>
      </div>

      {/* 진행률 */}
      <div style={{ padding: "0 20px", marginBottom: 16 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>오늘의 달성률</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: overallPercent === 100 ? GREEN : "#1a1a1a", letterSpacing: "-0.5px" }}>{overallPercent}%</span>
          </div>
          <div style={{ height: 5, background: "#F0F0F0", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: `${overallPercent}%`, height: "100%", background: GREEN, borderRadius: 3, transition: "width 0.5s" }} />
          </div>
        </div>
      </div>

      {/* 루틴 리스트 */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {routines.map((r) => {
          const isComplete = r.todayDone >= r.target;
          const percent = r.target > 0 ? (r.todayDone / r.target) * 100 : 0;

          if (openMenuId === r.id) {
            return (
              <div key={r.id} style={{
                background: "#fff", borderRadius: 14, padding: "12px 14px",
                border: "1px solid #EBEBEB", display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#aaa" }}>{r.icon} {r.name}</span>
                <button onClick={() => openEdit(r)} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#F7F7F8", color: "#555", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>수정</button>
                <button onClick={() => deleteRoutine(r.id)} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#FEF2F2", color: "#EF4444", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>삭제</button>
                <button onClick={() => setOpenMenuId(null)} style={{ padding: "4px 6px", border: "none", background: "transparent", color: "#CCC", fontSize: 15, cursor: "pointer", lineHeight: 1 }}>✕</button>
              </div>
            );
          }

          return (
            <div key={r.id} style={{
              background: "#fff",
              borderRadius: 16,
              border: isComplete ? `1.5px solid ${r.color}30` : "none",
              padding: "14px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 11, background: r.bgColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, flexShrink: 0,
                }}>
                  {r.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: "#1a1a1a" }}>{r.name}</p>
                    {r.streak > 0 && (
                      <span style={{ fontSize: 10, color: "#FF8C42", fontWeight: 600, background: "#FFF4EC", borderRadius: 5, padding: "1px 5px" }}>
                        {r.streak}일
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: "#bbb", margin: "2px 0 0" }}>{r.desc}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <button onClick={() => setOpenMenuId(r.id)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px", lineHeight: 1, display: "flex", alignItems: "center" }}>
                    <MoreHorizontal size={16} color="#CCC" />
                  </button>
                  <button
                    onClick={() => !isComplete && incrementRoutine(r.id)}
                    disabled={isComplete}
                    style={{
                      width: 36, height: 36, borderRadius: "50%", border: "none",
                      background: isComplete ? r.color : r.bgColor,
                      color: isComplete ? "#fff" : r.color,
                      cursor: isComplete ? "default" : "pointer",
                      fontSize: 14, fontWeight: 700, flexShrink: 0,
                      transition: "all 0.2s",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >{isComplete ? "✓" : "+"}</button>
                </div>
              </div>

              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 4, background: "#F0F0F0", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${percent}%`, height: "100%", background: r.color, borderRadius: 2, transition: "width 0.3s" }} />
                </div>
                <span style={{ fontSize: 11, color: isComplete ? r.color : "#bbb", fontWeight: 600, minWidth: 28, textAlign: "right" }}>
                  {r.todayDone}/{r.target}
                </span>
              </div>

            </div>
          );
        })}

        {routines.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#CCC" }}>
            <p style={{ fontSize: 36, margin: 0 }}>🌱</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>루틴을 추가해보세요</p>
          </div>
        )}

        <button onClick={openAdd} style={{
          width: "100%", marginTop: 4, padding: "14px 0", borderRadius: 14,
          border: "1.5px dashed #DCDCDC", background: "transparent", color: "#bbb",
          fontSize: 13, fontWeight: 500, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <Plus size={15} strokeWidth={2} /> 새 루틴 추가
        </button>
      </div>
    </div>
  );
}

// 🎉 폭죽 애니메이션
function Confetti({ color }) {
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    angle: (Math.PI * 2 * i) / 40 + Math.random() * 0.3,
    distance: 100 + Math.random() * 200,
    size: 6 + Math.random() * 8,
    color: [color, "#FFD93D", "#FF6B9D", "#52B788", "#4A90E2"][
      Math.floor(Math.random() * 5)
    ],
    delay: Math.random() * 0.2,
    rotation: Math.random() * 360,
  }));

  return (
    <>
      <style>{`
        @keyframes burst-${color.replace("#", "")} {
          0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 1; }
          50% { opacity: 1; }
          100% { 
            transform: translate(var(--tx), var(--ty)) scale(1) rotate(var(--rot)); 
            opacity: 0; 
          }
        }
        @keyframes pop-text {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%, -150%) scale(1); opacity: 0; }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: 0, height: 0 }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              color: color,
              fontSize: 28,
              fontWeight: 900,
              whiteSpace: "nowrap",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              animation: "pop-text 1.2s ease-out forwards",
              transform: "translate(-50%, -50%)",
            }}
          >
            완료! 🎉
          </div>
          {particles.map((p) => {
            const tx = Math.cos(p.angle) * p.distance;
            const ty = Math.sin(p.angle) * p.distance;
            return (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: p.size,
                  height: p.size,
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                  background: p.color,
                  "--tx": `${tx}px`,
                  "--ty": `${ty}px`,
                  "--rot": `${p.rotation}deg`,
                  animation: `burst-${color.replace("#", "")} 1.2s cubic-bezier(0.2, 0.8, 0.4, 1) ${p.delay}s forwards`,
                  boxShadow: `0 0 8px ${p.color}80`,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function getInitialPattern(type) {
  const result = {};
  if (type === "recent_strong") {
    for (let i = 0; i < 12; i++) result[i] = true;
    [15, 18, 20, 25, 30, 40, 50, 60, 70].forEach((d) => {
      result[d] = true;
    });
  } else if (type === "scattered") {
    [0, 1, 2, 3, 4, 7, 10, 15, 20, 25, 30].forEach((d) => {
      result[d] = true;
    });
  } else if (type === "regular") {
    for (let i = 0; i < 90; i += 2) result[i] = true;
  } else if (type === "weekend") {
    for (let i = 0; i < 90; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      if (d.getDay() === 0 || d.getDay() === 6) result[i] = true;
    }
  }
  return result;
}

// ========== 기록 화면 (인증샷 + 회고) ==========
function RecordScreen({ photos, setPhotos, diaries, setDiaries }) {
  const [innerTab, setInnerTab] = useState("photos");
  const [showDiaryForm, setShowDiaryForm] = useState(false);

  return (
    <div style={{ background: "#F2F2F7", minHeight: "100vh", paddingBottom: 20 }}>
      {/* 세그먼트 */}
      <div style={{ padding: "22px 20px 0", marginBottom: 16 }}>
        <div style={{ display: "flex", background: "#EBEBEB", borderRadius: 10, padding: 3 }}>
          {[["photos", "인증샷"], ["diary", "회고"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setInnerTab(key)}
              style={{
                flex: 1, padding: "9px 0", border: "none", borderRadius: 8,
                background: innerTab === key ? "#fff" : "transparent",
                color: innerTab === key ? "#1a1a1a" : "#999",
                fontSize: 13, fontWeight: innerTab === key ? 600 : 500,
                cursor: "pointer",
                boxShadow: innerTab === key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        {innerTab === "photos" ? (
          <PhotosTab photos={photos} setPhotos={setPhotos} />
        ) : (
          <DiaryTab
            diaries={diaries}
            setDiaries={setDiaries}
            showForm={showDiaryForm}
            setShowForm={setShowDiaryForm}
          />
        )}
      </div>
    </div>
  );
}

function PhotosTab({ photos, setPhotos }) {
  const fileInputRef = useRef(null);
  const [pendingPhoto, setPendingPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editCaption, setEditCaption] = useState("");
  const [editSrc, setEditSrc] = useState("");
  const editFileRef = useRef(null);
  const deletePhoto = (id) => setPhotos((prev) => prev.filter((p) => p.id !== id));
  const openEdit = (p) => { setEditingPhoto(p); setEditCaption(p.text); setEditSrc(p.src); };
  const handleEditFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setEditSrc(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const saveEdit = () => {
    setPhotos((prev) => prev.map((p) => p.id === editingPhoto.id ? { ...p, text: editCaption.trim() || p.text, src: editSrc } : p));
    setEditingPhoto(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPendingPhoto({ src: ev.target.result, date: todayKey });
      setCaption("");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const savePhoto = () => {
    if (!pendingPhoto) return;
    setPhotos((prev) => [
      { id: Date.now(), date: pendingPhoto.date, src: pendingPhoto.src, text: caption.trim() || "인증샷" },
      ...prev,
    ]);
    setPendingPhoto(null);
    setCaption("");
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* 사진+코멘트 수정 모달 */}
      {editingPhoto && (
        <>
          <input ref={editFileRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={handleEditFile} />
          <div onClick={() => setEditingPhoto(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 60 }} />
          <div style={{
            position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: "100%", maxWidth: 420, background: "#fff",
            borderRadius: "20px 20px 0 0", padding: "16px 20px 40px",
            zIndex: 61, boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
          }}>
            <div style={{ width: 36, height: 4, background: "#E5E5E5", borderRadius: 2, margin: "0 auto 16px" }} />
            <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px", color: "#1a1a1a" }}>사진 수정</p>

            {/* 사진 미리보기 + 교체 버튼 */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <img
                src={editSrc}
                alt="preview"
                style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 12, display: "block" }}
              />
              <button
                onClick={() => editFileRef.current?.click()}
                style={{
                  position: "absolute", bottom: 8, right: 8,
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "6px 12px", borderRadius: 20,
                  border: "none", background: "rgba(0,0,0,0.55)",
                  color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer",
                }}
              >
                <Camera size={13} strokeWidth={2} /> 사진 교체
              </button>
            </div>

            <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.4px" }}>코멘트</p>
            <input
              autoFocus
              value={editCaption}
              onChange={(e) => setEditCaption(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditingPhoto(null); }}
              placeholder="느낀 점을 남겨보세요"
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 12,
                border: "1.5px solid #EBEBEB", fontSize: 14,
                fontFamily: "inherit", outline: "none",
                boxSizing: "border-box", color: "#1a1a1a", marginBottom: 14,
              }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditingPhoto(null)} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "1.5px solid #EBEBEB", background: "#fff", color: "#999", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>취소</button>
              <button onClick={saveEdit} style={{ flex: 2, padding: "13px 0", borderRadius: 12, border: "none", background: "#1a1a1a", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>저장</button>
            </div>
          </div>
        </>
      )}

      {/* 사진 캡션 입력 모달 */}
      {pendingPhoto && (
        <>
          <div onClick={() => setPendingPhoto(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 60 }} />
          <div style={{
            position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: "100%", maxWidth: 420, background: "#fff",
            borderRadius: "20px 20px 0 0", padding: "16px 20px 40px",
            zIndex: 61, boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
          }}>
            <div style={{ width: 36, height: 4, background: "#E5E5E5", borderRadius: 2, margin: "0 auto 16px" }} />
            <img
              src={pendingPhoto.src}
              alt="preview"
              style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 12, marginBottom: 14, display: "block" }}
            />
            <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.4px" }}>
              한줄 코멘트 (선택)
            </p>
            <input
              autoFocus
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") savePhoto(); if (e.key === "Escape") setPendingPhoto(null); }}
              placeholder="오늘 어땠나요? 느낀 점을 남겨보세요"
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 12,
                border: "1.5px solid #EBEBEB", fontSize: 14,
                fontFamily: "inherit", outline: "none",
                boxSizing: "border-box", color: "#1a1a1a", marginBottom: 14,
              }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setPendingPhoto(null)} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "1.5px solid #EBEBEB", background: "#fff", color: "#999", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>취소</button>
              <button onClick={savePhoto} style={{ flex: 2, padding: "13px 0", borderRadius: 12, border: "none", background: "#1a1a1a", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>저장</button>
            </div>
          </div>
        </>
      )}

      {/* 상단 카운트 + 추가 버튼 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: "#aaa" }}>
          {photos.length > 0 ? `${photos.length}장` : "아직 인증샷이 없어요"}
        </span>
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 10, border: "none",
            background: "#1a1a1a", color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}
        >
          <Camera size={14} strokeWidth={2} /> 사진 추가
        </button>
      </div>

      {photos.length === 0 ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: "100%", aspectRatio: "16/9", borderRadius: 14,
            border: "1.5px dashed #DCDCDC", background: "#fff",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 8, cursor: "pointer", color: "#bbb",
          }}
        >
          <Camera size={28} strokeWidth={1.5} color="#CCC" />
          <span style={{ fontSize: 13, fontWeight: 500 }}>인증샷을 추가해보세요</span>
        </button>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {photos.map((p) => (
            <div
              key={p.id}
              style={{
                aspectRatio: "1", borderRadius: 12, overflow: "hidden",
                background: p.color || "#F0F0F0",
                position: "relative", cursor: "pointer",
              }}
            >
              {p.src ? (
                <img
                  src={p.src}
                  alt={p.text}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
                  {p.emoji}
                </div>
              )}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.55))",
                padding: "20px 10px 8px",
              }}>
                <p style={{ fontSize: 11, margin: 0, color: "#fff", fontWeight: 600, lineHeight: 1.4 }}>{p.text}</p>
                <p style={{ fontSize: 9, margin: "2px 0 0", color: "rgba(255,255,255,0.7)" }}>{p.date}</p>
              </div>
              <button
                onClick={() => deletePhoto(p.id)}
                style={{
                  position: "absolute", top: 6, right: 6,
                  width: 22, height: 22, borderRadius: "50%",
                  border: "none", background: "rgba(0,0,0,0.45)",
                  color: "#fff", fontSize: 10, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  lineHeight: 1,
                }}
              >✕</button>
              <button
                onClick={() => openEdit(p)}
                style={{
                  position: "absolute", top: 6, right: 34,
                  width: 22, height: 22, borderRadius: "50%",
                  border: "none", background: "rgba(0,0,0,0.45)",
                  color: "#fff", fontSize: 10, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  lineHeight: 1,
                }}
              >✏️</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function DiaryTab({ diaries, setDiaries, showForm, setShowForm }) {
  const deleteDiary = (id) => setDiaries((prev) => prev.filter((d) => d.id !== id));
  const [best, setBest] = useState("");
  const [grateful, setGrateful] = useState(["", "", ""]);
  const [tomorrow, setTomorrow] = useState("");
  const [editingId, setEditingId] = useState(null);

  const openEdit = (d) => {
    setEditingId(d.id);
    setBest(d.best);
    setGrateful([...(d.grateful || []), "", "", ""].slice(0, 3));
    setTomorrow(d.tomorrow || "");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setBest(""); setGrateful(["", "", ""]); setTomorrow("");
  };

  const hasToday = diaries.some((d) => d.date === todayKey);
  const dayLabels = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const todayLabel = `${today.getMonth() + 1}월 ${today.getDate()}일 ${dayLabels[today.getDay()]}`;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + "T12:00:00");
    return `${d.getMonth() + 1}월 ${d.getDate()}일 ${dayLabels[d.getDay()]}`;
  };

  const submit = () => {
    if (!best.trim()) return;
    const filtered = grateful.filter((g) => g.trim());
    if (editingId) {
      setDiaries((prev) => prev.map((d) => d.id === editingId ? { ...d, best, grateful: filtered, tomorrow } : d));
    } else {
      setDiaries((prev) => [{ id: Date.now(), date: todayKey, best, grateful: filtered, tomorrow }, ...prev]);
    }
    closeForm();
  };

  const fieldStyle = {
    width: "100%", padding: "13px 14px", borderRadius: 12,
    border: "1.5px solid #F0F0F0", fontSize: 14,
    fontFamily: "inherit", outline: "none",
    boxSizing: "border-box", color: "#1a1a1a",
    background: "#FAFAFA",
  };

  return (
    <>
      {/* 작성 바텀시트 */}
      {showForm && (
        <>
          <div onClick={closeForm} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 60 }} />
          <div style={{
            position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: "100%", maxWidth: 420, background: "#fff",
            borderRadius: "24px 24px 0 0", padding: "0 20px 40px",
            zIndex: 61, boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
            maxHeight: "92vh", overflowY: "auto",
          }}>
            <div style={{ position: "sticky", top: 0, background: "#fff", paddingTop: 14, paddingBottom: 4, zIndex: 1 }}>
              <div style={{ width: 36, height: 4, background: "#E5E5E5", borderRadius: 2, margin: "0 auto 16px" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#1a1a1a" }}>{editingId ? "회고 수정" : "회고 작성"}</p>
                  <p style={{ fontSize: 12, color: "#bbb", margin: "3px 0 0" }}>{todayLabel}</p>
                </div>
                <button onClick={closeForm} style={{ background: "#F5F5F5", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", color: "#999", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", margin: "0 0 8px", letterSpacing: "0.3px" }}>가장 좋았던 일</p>
              <textarea
                autoFocus
                value={best}
                onChange={(e) => setBest(e.target.value)}
                placeholder="오늘 기억에 남는 순간"
                style={{ ...fieldStyle, minHeight: 96, resize: "none", lineHeight: 1.7 }}
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", margin: "0 0 8px", letterSpacing: "0.3px" }}>감사한 일 3가지</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {grateful.map((g, i) => (
                  <input
                    key={i}
                    value={g}
                    onChange={(e) => { const n = [...grateful]; n[i] = e.target.value; setGrateful(n); }}
                    placeholder={`${i + 1}번째`}
                    style={fieldStyle}
                  />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", margin: "0 0 8px", letterSpacing: "0.3px" }}>내일의 목표</p>
              <input
                value={tomorrow}
                onChange={(e) => setTomorrow(e.target.value)}
                placeholder="내일 하고 싶은 것"
                style={fieldStyle}
              />
            </div>

            <button
              onClick={submit}
              style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: "none", background: best.trim() ? "#1a1a1a" : "#E5E5E5", color: best.trim() ? "#fff" : "#bbb", fontSize: 14, fontWeight: 600, cursor: best.trim() ? "pointer" : "default", transition: "background 0.2s" }}
            >
              저장
            </button>
          </div>
        </>
      )}

      {/* 상단 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: "#aaa" }}>
          {diaries.length > 0 ? `${diaries.length}개` : "아직 작성한 회고가 없어요"}
        </span>
        <button
          onClick={() => setShowForm(true)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 10, border: "none",
            background: "#1a1a1a", color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}
        >
          <PenLine size={14} strokeWidth={2} /> 회고 추가
        </button>
      </div>

      {/* 빈 상태 */}
      {diaries.length === 0 && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            width: "100%", padding: "40px 0", borderRadius: 14,
            border: "1.5px dashed #DCDCDC", background: "#fff",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 8, cursor: "pointer",
          }}
        >
          <PenLine size={26} strokeWidth={1.5} color="#CCC" />
          <span style={{ fontSize: 13, fontWeight: 500, color: "#bbb" }}>회고를 작성해보세요</span>
        </button>
      )}

      {/* 회고 카드 목록 */}
      {diaries.map((d) => (
        <div
          key={d.id}
          style={{
            background: "#fff", borderRadius: 14,
            boxShadow: "0 1px 8px rgba(0,0,0,0.05)", marginBottom: 10,
            overflow: "hidden",
          }}
        >
          {/* 헤더 */}
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #F5F5F5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: 12, fontWeight: 600, margin: 0, color: "#888" }}>{formatDate(d.date)}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button onClick={() => openEdit(d)} style={{ background: "none", border: "none", cursor: "pointer", color: "#C0C0C0", fontSize: 11, padding: "3px 7px", borderRadius: 6, fontWeight: 600, fontFamily: "inherit" }}>수정</button>
              <button onClick={() => deleteDiary(d.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#C0C0C0", fontSize: 11, padding: "3px 7px", borderRadius: 6, fontWeight: 600, fontFamily: "inherit" }}>삭제</button>
            </div>
          </div>

          <div style={{ padding: "13px 14px", display: "flex", flexDirection: "column", gap: 11 }}>
            <div>
              <p style={{ fontSize: 10, color: "#bbb", fontWeight: 600, margin: "0 0 4px", letterSpacing: "0.3px", textTransform: "uppercase" }}>가장 좋았던 일</p>
              <p style={{ fontSize: 14, color: "#1a1a1a", margin: 0, lineHeight: 1.7 }}>{d.best}</p>
            </div>

            {d.grateful.length > 0 && (
              <div>
                <p style={{ fontSize: 10, color: "#bbb", fontWeight: 600, margin: "0 0 5px", letterSpacing: "0.3px", textTransform: "uppercase" }}>감사한 일</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {d.grateful.map((g, i) => (
                    <p key={i} style={{ fontSize: 13, color: "#555", margin: 0, lineHeight: 1.6 }}>— {g}</p>
                  ))}
                </div>
              </div>
            )}

            {d.tomorrow && (
              <div style={{ borderTop: "1px solid #F5F5F5", paddingTop: 10, display: "flex", gap: 8 }}>
                <p style={{ fontSize: 10, color: "#bbb", fontWeight: 600, margin: 0, flexShrink: 0, paddingTop: 2, textTransform: "uppercase", letterSpacing: "0.3px" }}>내일</p>
                <p style={{ fontSize: 13, color: "#1a1a1a", margin: 0, fontWeight: 500 }}>{d.tomorrow}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

// ========== 통계 ==========
function StatsScreen({ exp, stage }) {
  const data = [
    { day: "월", value: 80 },
    { day: "화", value: 60 },
    { day: "수", value: 100 },
    { day: "목", value: 70 },
    { day: "금", value: 90 },
    { day: "토", value: 50 },
    { day: "오늘", value: 40 },
  ];
  const avg = Math.round(data.reduce((a, b) => a + b.value, 0) / data.length);

  return (
    <div style={{ padding: "24px 20px 20px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, marginBottom: 4 }}>
        통계 📊
      </h1>
      <p style={{ fontSize: 12, color: "#999", margin: 0, marginBottom: 24 }}>
        나의 루틴 성장 기록을 확인해보세요
      </p>

      {/* 성장 카드 */}
      <div
        style={{
          background: `linear-gradient(135deg, ${stage.color}25 0%, ${stage.color}10 100%)`,
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,
          border: `1px solid ${stage.color}40`,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Sprout size={64} stage={stage.level} />
        <div>
          <p style={{ fontSize: 11, color: "#999", margin: 0 }}>현재 레벨</p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 800,
              margin: 0,
              color: stage.color,
            }}
          >
            Lv.{stage.level} {stage.name}
          </p>
          <p style={{ fontSize: 11, color: "#666", margin: 0, marginTop: 2 }}>
            총 {exp} EXP 달성 ✨
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 20,
          border: "1px solid #F0F4ED",
          boxShadow: "0 2px 12px rgba(52, 199, 89, 0.06)",
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: 12, color: "#999", margin: 0, marginBottom: 4 }}>
          최근 7일 평균 완료율
        </p>
        <p
          style={{
            fontSize: 32,
            fontWeight: 800,
            margin: 0,
            color: GREEN_DARK,
            letterSpacing: "-1px",
          }}
        >
          {avg}%
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            height: 120,
            gap: 8,
            marginTop: 20,
          }}
        >
          {data.map((d, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${d.value}%`,
                  background:
                    i === data.length - 1
                      ? GREEN_DARK
                      : `linear-gradient(180deg, ${GREEN} 0%, #A8D88A 100%)`,
                  borderRadius: 8,
                  minHeight: 4,
                }}
              />
              <span style={{ fontSize: 10, color: "#999", fontWeight: 600 }}>
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <StatCard emoji="🔥" label="최대 스트릭" value="12일" />
        <StatCard emoji="🌱" label="전체 루틴 수" value="15개" />
        <StatCard emoji="📸" label="인증샷" value="24장" />
        <StatCard emoji="📔" label="회고 작성" value="18일" />
      </div>
    </div>
  );
}

function StatCard({ emoji, label, value, bg = "#F8FBF4" }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "14px 12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex", flexDirection: "column", gap: 4,
      }}
    >
      <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>{label}</p>
      <p style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "#1a1a1a" }}>
        {value}
      </p>
    </div>
  );
}

// ========== 마이 페이지 ==========
function ProfileScreen({ exp, stage, routines, photos, diaries, dailyRecords, profileName, setProfileName }) {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profileName);

  const streak = calculateStreak(dailyRecords, todayKey);
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const k = toKey(d);
    const ts = dailyRecords[k]?.todos || [];
    const rate = ts.length > 0 ? Math.round((ts.filter((t) => t.done).length / ts.length) * 100) : 0;
    const labels = ["일", "월", "화", "수", "목", "금", "토"];
    return { day: i === 6 ? "오늘" : labels[d.getDay()], v: rate };
  });
  const weekAvg = Math.round(weekData.reduce((a, b) => a + b.v, 0) / 7);

  const nextStageData = EVO_STAGES.find((s) => s.expNeeded > exp);
  const expForNext = nextStageData ? nextStageData.expNeeded - stage.expNeeded : 0;
  const expProgress = nextStageData ? exp - stage.expNeeded : expForNext;
  const expPct = expForNext > 0 ? Math.min(100, Math.round((expProgress / expForNext) * 100)) : 100;

  const handleReset = () => {
    if (!window.confirm("모든 데이터를 초기화할까요? 이 작업은 되돌릴 수 없어요.")) return;
    ["exp","photos","diaries","todos","dailyRecords","profileName","routines","focusWorkMins","focusBreakMins"].forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  };

  const settings = [
    { label: "데이터 초기화", danger: true, onPress: handleReset },
    { label: "앱 정보", value: "v1.0.0", onPress: null },
  ];

  return (
    <div style={{ padding: "22px 20px 20px", background: "#F2F2F7", minHeight: "100%" }}>

      {/* 프로필 카드 */}
      <div style={{
        background: "#fff", borderRadius: 20, padding: 20, marginBottom: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: "#F2F2F7",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Sprout size={48} stage={stage.level} />
        </div>
        <div style={{ flex: 1 }}>
          {editingName ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                autoFocus
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { setProfileName(nameInput.trim() || "루프"); setEditingName(false); }
                  if (e.key === "Escape") setEditingName(false);
                }}
                style={{ fontSize: 15, fontWeight: 700, background: "#F2F2F7", border: "none", borderRadius: 8, padding: "4px 8px", color: "#1a1a1a", outline: "none", width: 100 }}
              />
              <button onClick={() => { setProfileName(nameInput.trim() || "루프"); setEditingName(false); }} style={{ background: "#1a1a1a", border: "none", borderRadius: 6, padding: "4px 10px", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>저장</button>
            </div>
          ) : (
            <p onClick={() => { setNameInput(profileName); setEditingName(true); }} style={{ fontSize: 16, fontWeight: 700, margin: 0, cursor: "pointer", color: "#1a1a1a" }}>
              {profileName}님
            </p>
          )}
          <p style={{ fontSize: 12, margin: "3px 0 8px", color: "#aaa" }}>
            Lv.{stage.level} {stage.name} · {exp} EXP
          </p>
          <div style={{ background: "#F2F2F7", borderRadius: 99, height: 5 }}>
            <div style={{ height: "100%", borderRadius: 99, background: "#1a1a1a", width: `${expPct}%`, transition: "width 0.5s ease" }} />
          </div>
          <p style={{ fontSize: 10, color: "#aaa", margin: "4px 0 0" }}>
            {nextStageData ? `다음 레벨까지 ${nextStageData.expNeeded - exp} EXP` : "최고 레벨"}
          </p>
        </div>
      </div>

      {/* 이번 주 통계 */}
      <div style={{ background: "#fff", borderRadius: 20, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: "#1a1a1a" }}>이번 주</p>
          <span style={{ fontSize: 11, color: "#aaa", marginLeft: "auto" }}>평균 {weekAvg}%</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 70, gap: 6, marginBottom: 14 }}>
          {weekData.map((d, i, arr) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", height: `${Math.max(d.v, 4)}%`, background: i === arr.length - 1 ? "#1a1a1a" : "#E0E0E0", borderRadius: 4, minHeight: 4 }} />
              <span style={{ fontSize: 9, color: "#aaa" }}>{d.day}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <StatCard label="현재 스트릭" value={`${streak}일`} />
          <StatCard label="전체 루틴" value={`${routines.length}개`} />
          <StatCard label="인증샷" value={`${photos.length}장`} />
          <StatCard label="회고 작성" value={`${diaries.length}개`} />
        </div>
      </div>

      {/* 나의 정원 */}
      <div style={{ background: "#fff", borderRadius: 20, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: "#1a1a1a" }}>나의 정원</p>
          <span style={{ fontSize: 11, color: "#aaa", marginLeft: "auto" }}>
            {EVO_STAGES.findIndex((s) => s.level === stage.level) + 1} / {EVO_STAGES.length}
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {EVO_STAGES.map((s) => {
            const unlocked = exp >= s.expNeeded;
            const isCurrent = s.level === stage.level;
            return (
              <div key={s.level} style={{
                aspectRatio: "1", borderRadius: 14,
                background: isCurrent ? "#F2F2F7" : unlocked ? "#FAFAFA" : "#F5F5F5",
                border: isCurrent ? "2px solid #1a1a1a" : "1px solid #EBEBEB",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 4,
                position: "relative", opacity: unlocked ? 1 : 0.35,
              }}>
                {unlocked ? <Sprout size={44} stage={s.level} /> : <span style={{ fontSize: 20 }}>🔒</span>}
                <p style={{ fontSize: 9, fontWeight: 700, margin: 0, color: unlocked ? "#1a1a1a" : "#bbb" }}>
                  Lv.{s.level} {s.name}
                </p>
                {isCurrent && (
                  <div style={{ position: "absolute", top: 4, right: 4, background: "#1a1a1a", color: "#fff", fontSize: 8, fontWeight: 800, padding: "2px 5px", borderRadius: 4 }}>NOW</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 설정 */}
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        {settings.map((s, i) => (
          <div key={i} onClick={s.onPress || undefined} style={{
            display: "flex", alignItems: "center", padding: "15px 16px",
            cursor: s.onPress ? "pointer" : "default",
            borderBottom: i < settings.length - 1 ? "1px solid #F5F5F5" : "none",
          }}>
            <span style={{ flex: 1, fontSize: 13, color: s.danger ? "#FF3B30" : "#1a1a1a", fontWeight: s.danger ? 600 : 400 }}>
              {s.label}
            </span>
            {s.value
              ? <span style={{ fontSize: 12, color: "#aaa" }}>{s.value}</span>
              : s.onPress && <span style={{ color: "#ccc", fontSize: 16 }}>›</span>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== 집중 (포모도로) ==========
function FocusScreen({ exp, setExp }) {
  const [workMins, setWorkMins] = useLocalStorage("focusWorkMins", 25);
  const [breakMins, setBreakMins] = useLocalStorage("focusBreakMins", 5);

  const WORK_SEC = workMins * 60;
  const BREAK_SEC = breakMins * 60;

  const [todayMins, setTodayMins] = useLocalStorage(`focusTodayMins_${todayKey}`, 0);

  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(workMins * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);
  const modeRef = useRef("work");
  const secondsRef = useRef(workMins * 60);

  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { secondsRef.current = secondsLeft; }, [secondsLeft]);

  useEffect(() => {
    if (!running) {
      const s = mode === "work" ? workMins * 60 : breakMins * 60;
      secondsRef.current = s;
      setSecondsLeft(s);
    }
  }, [workMins, breakMins]);

  const workSecRef = useRef(WORK_SEC);
  const breakSecRef = useRef(BREAK_SEC);
  useEffect(() => { workSecRef.current = workMins * 60; }, [workMins]);
  useEffect(() => { breakSecRef.current = breakMins * 60; }, [breakMins]);

  const tick = () => {
    const next = secondsRef.current - 1;
    if (next < 0) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      if (modeRef.current === "work") {
        setExp((e) => e + 30);
        setSessions((s) => s + 1);
        setTodayMins((m) => m + workSecRef.current / 60);
        setMode("break");
        modeRef.current = "break";
        secondsRef.current = breakSecRef.current;
        setSecondsLeft(breakSecRef.current);
      } else {
        setMode("work");
        modeRef.current = "work";
        secondsRef.current = workSecRef.current;
        setSecondsLeft(workSecRef.current);
      }
      setRunning(false);
      return;
    }
    secondsRef.current = next;
    setSecondsLeft(next);
  };

  const toggle = () => {
    if (running) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setRunning(false);
    } else {
      intervalRef.current = setInterval(tick, 1000);
      setRunning(true);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
    const s = mode === "work" ? workMins * 60 : breakMins * 60;
    secondsRef.current = s;
    setSecondsLeft(s);
  };

  const skip = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
    if (mode === "work") {
      setMode("break");
      modeRef.current = "break";
      secondsRef.current = breakSecRef.current;
      setSecondsLeft(breakSecRef.current);
    } else {
      setMode("work");
      modeRef.current = "work";
      secondsRef.current = workSecRef.current;
      setSecondsLeft(workSecRef.current);
    }
  };

  const adjustMins = (type, delta) => {
    if (running) return;
    if (type === "work") {
      setWorkMins((v) => Math.min(60, Math.max(1, v + delta)));
    } else {
      setBreakMins((v) => Math.min(60, Math.max(1, v + delta)));
    }
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const isWork = mode === "work";
  const total = isWork ? WORK_SEC : BREAK_SEC;
  const elapsed = total - secondsLeft;
  const radius = 90;
  const circ = 2 * Math.PI * radius;
  const dash = (elapsed / total) * circ;
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");
  const progressPct = Math.round((elapsed / total) * 100);

  const accent = isWork ? GREEN : "#4A90E2";
  const accentDark = isWork ? GREEN_DARK : "#2565B0";
  const accentLight = isWork ? "#E8F5E9" : "#E3F2FD";
  const accentGlow = isWork ? "#34C75938" : "#4A90E238";
  return (
    <div style={{
      padding: "32px 20px 20px",
      display: "flex", flexDirection: "column", alignItems: "center",
      minHeight: "100%",
      background: "#F2F2F7",
    }}>
      {/* 모드 토글 */}
      <div style={{
        display: "flex", background: "#E5E5EA", borderRadius: 12, padding: 4, gap: 4,
        marginBottom: 28, width: "100%", maxWidth: 280,
      }}>
        {[["work", "집중"], ["break", "휴식"]].map(([m, label]) => (
          <button
            key={m}
            onClick={() => {
              if (running) return;
              setMode(m);
              modeRef.current = m;
              const s = m === "work" ? WORK_SEC : BREAK_SEC;
              secondsRef.current = s;
              setSecondsLeft(s);
            }}
            style={{
              flex: 1, padding: "10px 0", border: "none", borderRadius: 9,
              background: mode === m ? "#fff" : "transparent",
              color: mode === m ? "#1a1a1a" : "#999",
              fontSize: 13, fontWeight: mode === m ? 700 : 500,
              cursor: running ? "default" : "pointer",
              boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.25s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 원형 타이머 */}
      <div style={{ position: "relative", width: 220, height: 220, marginBottom: 20 }}>
        <svg width="220" height="220" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="110" cy="110" r={radius} stroke="#E5E5EA" strokeWidth="14" fill="none" />
          <circle
            cx="110" cy="110" r={radius}
            stroke={accent} strokeWidth="14" fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            style={{ transition: "stroke-dasharray 0.5s ease, stroke 0.6s ease" }}
          />
        </svg>
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
        }}>
          <span style={{ fontSize: 46, fontWeight: 900, letterSpacing: "-2px", color: "#1a1a1a", lineHeight: 1 }}>
            {mins}:{secs}
          </span>
          <span style={{ fontSize: 11, color: "#999", fontWeight: 500, marginTop: 6 }}>
            {progressPct}% 완료
          </span>
        </div>
      </div>

      {/* 오늘 집중 시간 */}
      <div style={{ marginBottom: 28 }}>
        <span style={{ fontSize: 13, color: "#888" }}>
          오늘{" "}
          <span style={{ fontWeight: 700, color: "#1a1a1a" }}>
            {Math.floor(todayMins + (isWork ? (WORK_SEC - secondsLeft) / 60 : 0))}분
          </span>{" "}
          집중했어요
        </span>
      </div>

      {/* 컨트롤 */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28, alignItems: "center" }}>
        <button
          onClick={reset}
          style={{
            width: 50, height: 50, borderRadius: "50%", border: "none",
            background: "#fff", color: "#aaa", fontSize: 20, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            transition: "all 0.2s",
          }}
        >
          ↺
        </button>
        <button
          onClick={toggle}
          style={{
            width: 76, height: 76, borderRadius: "50%", border: "none",
            background: accent,
            color: "#fff", fontSize: 28, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            transition: "all 0.25s",
          }}
        >
          {running ? "⏸" : "▶"}
        </button>
      </div>

      {/* 세션 통계 */}
      <div style={{
        background: "#fff", borderRadius: 16, padding: "20px 12px",
        width: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex", justifyContent: "space-around",
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#1a1a1a" }}>{sessions}</p>
          <p style={{ fontSize: 11, color: "#aaa", margin: 0, marginTop: 4 }}>완료 세션</p>
        </div>
        <div style={{ width: 1, background: "#F0F0F0" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#1a1a1a" }}>{sessions * 30}</p>
          <p style={{ fontSize: 11, color: "#aaa", margin: 0, marginTop: 4 }}>획득 EXP</p>
        </div>
        <div style={{ width: 1, background: "#F0F0F0" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#1a1a1a" }}>{sessions * 25}분</p>
          <p style={{ fontSize: 11, color: "#aaa", margin: 0, marginTop: 4 }}>집중 시간</p>
        </div>
      </div>

      {sessions > 0 && (
        <div style={{
          marginTop: 12,
          background: "#fff",
          borderRadius: 12, padding: "12px 16px", width: "100%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          textAlign: "center",
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>
            집중 완료 +{sessions * 30} EXP
          </span>
        </div>
      )}

      {/* 타이머 설정 */}
      <div style={{
        marginTop: 12, background: "#fff", borderRadius: 16, padding: "16px 20px",
        width: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#aaa", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          시간 설정 {running && <span style={{ color: "#ccc", fontWeight: 400 }}>(타이머 중지 후 변경 가능)</span>}
        </p>
        {[["work", "집중", workMins, setWorkMins], ["break", "휴식", breakMins, setBreakMins]].map(([type, label, val, setter]) => {
          const isEditing = !running;
          return (
            <div key={type} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: type === "work" ? 10 : 0,
            }}>
              <span style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>{label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  onClick={() => adjustMins(type, -5)}
                  disabled={running}
                  style={{
                    width: 32, height: 32, borderRadius: 8, border: "none",
                    background: running ? "#F5F5F5" : "#F0F0F0",
                    color: running ? "#ccc" : "#555", fontSize: 16, cursor: running ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >−</button>
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={val}
                    disabled={running}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      if (raw === "") { setter(""); return; }
                      const n = parseInt(raw, 10);
                      setter(Math.min(60, Math.max(1, n)));
                    }}
                    onBlur={(e) => {
                      const n = parseInt(e.target.value, 10);
                      if (isNaN(n) || n < 1) setter(1);
                    }}
                    onFocus={(e) => e.target.select()}
                    style={{
                      width: 36, textAlign: "center",
                      border: running ? "none" : "1.5px solid #E0E0E0",
                      borderRadius: 6,
                      background: running ? "transparent" : "#fff",
                      fontSize: 15, fontWeight: 700,
                      color: running ? "#aaa" : "#1a1a1a",
                      padding: "4px 0", outline: "none",
                    }}
                  />
                  <span style={{ fontSize: 13, color: running ? "#ccc" : "#555" }}>분</span>
                </div>
                <button
                  onClick={() => adjustMins(type, 5)}
                  disabled={running}
                  style={{
                    width: 32, height: 32, borderRadius: 8, border: "none",
                    background: running ? "#F5F5F5" : "#F0F0F0",
                    color: running ? "#ccc" : "#555", fontSize: 16, cursor: running ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >+</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ========== 하단 네비 (5개 탭) ==========
function BottomNav({ tab, setTab }) {
  const items = [
    { id: "home", Icon: Home, label: "할 일" },
    { id: "routine", Icon: ListChecks, label: "루틴" },
    { id: "record", Icon: BookHeart, label: "기록" },
    { id: "focus", Icon: Timer, label: "집중" },
    { id: "profile", Icon: User, label: "마이" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 420,
        background: "rgba(255, 255, 255, 0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid #F0F4ED",
        padding: "10px 8px 22px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      {items.map((item) => {
        const active = tab === item.id;
        const { Icon } = item;
        return (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "4px 0 6px",
              color: active ? GREEN_DARK : "#C0C4C8",
              transition: "color 0.2s",
            }}
          >
            <div style={{
              width: 50,
              height: 32,
              borderRadius: 16,
              background: active ? "rgba(52, 199, 89, 0.13)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.25s",
              marginBottom: 1,
            }}>
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            </div>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, letterSpacing: "0.1px" }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
