import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/auth');
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} · ${h}:${m}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('auraCareToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F0EDE6] font-sans antialiased">
      {/* Topbar */}
      <header className="bg-[#1C3D2E] px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div />
          <span className="font-['Cormorant_Garamond'] text-white text-xl tracking-wide"> 🌿 AuraCare</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm font-['JetBrains_Mono'] text-white/90">
            <span className="text-[#74C69D] font-medium">28°C</span> · Kathmandu · Sunny · 35% RH
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#74C69D]/20 flex items-center justify-center text-base font-medium text-[#74C69D] shadow-sm">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden">
              <div className="text-sm text-white/90">{user?.name || 'User'}</div>
              <span className="text-[10px] px-2 py-0.5 bg-[#74C69D]/15 text-[#74C69D] font-['JetBrains_Mono'] rounded tracking-wide">
                ADMIN
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-[#74C69D]/20 hover:bg-[#74C69D]/30 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-[#74C69D]/30"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <aside className="w-56 bg-[#1C3D2E] py-6 border-r border-[#74C69D]/10 overflow-y-auto flex flex-col">
          <nav className="flex-1">
            <div className="px-5 py-2 text-[10px] text-white/30 font-['JetBrains_Mono'] uppercase tracking-[0.15em]">
              Overview
            </div>
            <a className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 rounded-r-lg transition-all cursor-pointer border-l-[3px] border-transparent hover:border-[#74C69D]">
              <span className="text-base w-5 text-center">◈</span> Dashboard
            </a>
            <a className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 rounded-r-lg transition-all cursor-pointer border-l-[3px] border-transparent hover:border-[#74C69D]">
              <span className="text-base w-5 text-center">❧</span> All Plants
              <span className="ml-auto bg-[#C1440E] text-white text-[10px] px-2 py-0.5 rounded-full font-['JetBrains_Mono']">5</span>
            </a>
            <a className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 rounded-r-lg transition-all cursor-pointer border-l-[3px] border-transparent hover:border-[#74C69D]">
              <span className="text-base w-5 text-center">✦</span> Daily Tasks
              <span className="ml-auto bg-[#C9821A] text-white text-[10px] px-2 py-0.5 rounded-full font-['JetBrains_Mono']">8</span>
            </a>

            <div className="px-5 py-2 mt-6 text-[10px] text-white/30 font-['JetBrains_Mono'] uppercase tracking-[0.15em]">
              Management
            </div>
            <a className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 rounded-r-lg transition-all cursor-pointer border-l-[3px] border-transparent hover:border-[#74C69D]">
              <span className="text-base w-5 text-center">◎</span> Staff
            </a>
            <a className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 rounded-r-lg transition-all cursor-pointer border-l-[3px] border-transparent hover:border-[#74C69D]">
              <span className="text-base w-5 text-center">⊡</span> Rooms
            </a>
            <a className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 rounded-r-lg transition-all cursor-pointer border-l-[3px] border-transparent hover:border-[#74C69D]">
              <span className="text-base w-5 text-center">◻</span> Audit Log
            </a>

            <div className="px-5 py-2 mt-6 text-[10px] text-white/30 font-['JetBrains_Mono'] uppercase tracking-[0.15em]">
              Communication
            </div>
            <a className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 rounded-r-lg transition-all cursor-pointer border-l-[3px] border-transparent hover:border-[#74C69D]">
              <span className="text-base w-5 text-center">⋮⋮</span> Team Chat
            </a>
            <a className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 rounded-r-lg transition-all cursor-pointer border-l-[3px] border-transparent hover:border-[#74C69D]">
              <span className="text-base w-5 text-center">◈</span> Reports
            </a>
          </nav>

          <div className="mt-auto px-5 pt-4 border-t border-white/10">
            <p className="text-xs text-white/30 font-['JetBrains_Mono'] leading-relaxed">
              Green Valley Nursery<br />
              B1 1AA · Kathmandu
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1C3D2E]">
              Facility Overview
            </h1>
            <div className="text-sm text-[#8A9BA3] mt-2 font-['JetBrains_Mono'] tracking-wide">
              {formatTime(currentTime)} · 6 rooms · 4 staff on shift
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-5 mb-8">
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm">
              <div className="font-['Cormorant_Garamond'] text-5xl text-[#1C3D2E] leading-tight">32</div>
              <div className="text-sm text-[#8A9BA3] mt-2 font-['JetBrains_Mono'] uppercase tracking-wider">Total Plants</div>
              <div className="text-xs mt-3 flex gap-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#2D6A4F] rounded-full" />
                  <span className="text-[#2D6A4F] font-medium">24 healthy</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#C9821A] rounded-full" />
                  <span className="text-[#C9821A] font-medium">5 warning</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#C1440E] rounded-full" />
                  <span className="text-[#C1440E] font-medium">3 urgent</span>
                </span>
              </div>
            </div>
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm">
              <div className="font-['Cormorant_Garamond'] text-5xl text-[#C1440E] leading-tight">12</div>
              <div className="text-sm text-[#8A9BA3] mt-2 font-['JetBrains_Mono'] uppercase tracking-wider">Tasks Due Today</div>
              <div className="text-xs mt-3 flex gap-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#C1440E] rounded-full" />
                  <span className="text-[#C1440E] font-medium">6 urgent</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#C9821A] rounded-full" />
                  <span className="text-[#C9821A] font-medium">4 warn</span>
                </span>
              </div>
            </div>
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm">
              <div className="font-['Cormorant_Garamond'] text-5xl text-[#2D6A4F] leading-tight">87%</div>
              <div className="text-sm text-[#8A9BA3] mt-2 font-['JetBrains_Mono'] uppercase tracking-wider">Compliance Rate</div>
              <div className="text-sm mt-3 text-[#8A9BA3]">Tasks completed on time this week</div>
            </div>
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm">
              <div className="font-['Cormorant_Garamond'] text-5xl text-[#1C3D2E] leading-tight">4/6</div>
              <div className="text-sm text-[#8A9BA3] mt-2 font-['JetBrains_Mono'] uppercase tracking-wider">Staff Active</div>
              <div className="text-sm mt-3 text-[#8A9BA3]">2 staff off shift today</div>
            </div>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-[1.4fr_1fr_0.9fr] gap-5 mb-8">
            {/* Room Health */}
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm">
              <div className="text-sm text-[#8A9BA3] uppercase tracking-wider font-['JetBrains_Mono'] mb-4">
                Plant health by room
              </div>

              {[
                { room: 'Living Room A', healthy: 3, urgent: 1, warning: 1, total: 6 },
                { room: 'Dining Area', healthy: 4, warning: 1, total: 5 },
                { room: 'Garden Terrace', healthy: 5, urgent: 1, total: 8 },
                { room: 'Room 1 — Bedroom', healthy: 4, total: 4 },
                { room: 'Room 3 — Bedroom', healthy: 3, warning: 1, total: 3 },
                { room: 'Balcony', healthy: 6, total: 6 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 py-2.5 border-b border-[#EDE8DF] last:border-0">
                  <div className="text-base text-[#1C3D2E] flex-1 font-medium">{item.room}</div>
                  <div className="flex-1 h-1.5 bg-[#EDE8DF] rounded-full overflow-hidden flex gap-0.5">
                    {item.healthy && <div className="h-full bg-[#2D6A4F]" style={{ flex: item.healthy }} />}
                    {item.warning && <div className="h-full bg-[#C9821A]" style={{ flex: item.warning }} />}
                    {item.urgent && <div className="h-full bg-[#C1440E]" style={{ flex: item.urgent }} />}
                  </div>
                  <div className="text-sm text-[#8A9BA3] font-['JetBrains_Mono'] min-w-[52px] text-right">
                    {item.total} plants
                  </div>
                </div>
              ))}

              <div className="flex gap-5 mt-4 text-sm text-[#8A9BA3]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#2D6A4F] rounded-sm" /> Healthy
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#C9821A] rounded-sm" /> Warning
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#C1440E] rounded-sm" /> Urgent
                </span>
              </div>
            </div>

            {/* Task Activity */}
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm">
              <div className="text-sm text-[#8A9BA3] uppercase tracking-wider font-['JetBrains_Mono'] mb-4">
                Task activity today
              </div>

              <div className="space-y-1">
                {[
                  { time: '09:42', status: 'completed', name: 'P. Sharma', action: 'watered Snake Plant', location: 'Room 3', state: 'Completed' },
                  { time: '10:15', status: 'completed', name: 'R. Gurung', action: 'inspected Peace Lily', location: 'Living Room A', state: 'Completed' },
                  { time: '11:30', status: 'completed', name: 'M. Karki', action: 'watered Spider Plant', location: 'Dining Area', state: 'Completed' },
                  { time: '13:45', status: 'warning', name: 'S. Tamang', action: 'watering Rubber Fig', location: 'Garden Terrace', state: 'Pending' },
                  { time: '—', status: 'urgent', name: 'Unassigned', action: 'Money Plant urgent', location: 'Balcony', state: 'Not started', overdue: true },
                  { time: '—', status: 'urgent', name: 'Unassigned', action: 'Aloe vera critical', location: 'Living Room A', state: 'Not started', overdue: true },
                ].map((task, i) => (
                  <div key={i} className="flex gap-3 py-2 border-b border-[#EDE8DF] last:border-0 items-start">
                    <div className="font-['JetBrains_Mono'] text-base text-[#8A9BA3] min-w-[44px] pt-0.5">{task.time}</div>
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      task.status === 'completed' ? 'bg-[#2D6A4F]' : task.status === 'warning' ? 'bg-[#C9821A]' : 'bg-[#C1440E]'
                    }`} />
                    <div className="text-lg text-[#1C3D2E] leading-relaxed flex-1">
                      <strong className={
                        task.status === 'completed' ? 'text-[#2D6A4F]' : task.status === 'warning' ? 'text-[#C9821A]' : 'text-[#C1440E]'
                      }>{task.name}</strong> {task.action}
                      {task.overdue && (
                        <span className="inline-block text-[12px] px-2 py-0.5 bg-[#C1440E]/10 text-[#C1440E] font-['JetBrains_Mono'] rounded ml-2">Overdue</span>
                      )}
                      <div className="text-base text-[#8A9BA3] mt-1">{task.location} · {task.state}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather & Care Engine */}
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm">
              <div className="text-sm text-[#8A9BA3] uppercase tracking-wider font-['JetBrains_Mono'] mb-4">
                Weather & care engine
              </div>

              <div className="bg-[#1C3D2E] rounded-xl p-5 mb-4">
                <div className="font-['Cormorant_Garamond'] text-6xl text-white leading-none">28°C</div>
                <div className="text-sm text-white/70 font-['JetBrains_Mono'] mt-2">Kathmandu, B1 1AA · Sunny</div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/8 rounded-lg p-3">
                    <div className="font-['JetBrains_Mono'] text-base text-[#74C69D]">35%</div>
                    <div className="text-sm text-white/50 uppercase tracking-wider mt-1">Humidity</div>
                  </div>
                  <div className="bg-white/8 rounded-lg p-3">
                    <div className="font-['JetBrains_Mono'] text-base text-[#74C69D]">9</div>
                    <div className="text-sm text-white/50 uppercase tracking-wider mt-1">UV Index</div>
                  </div>
                  <div className="bg-white/8 rounded-lg p-3">
                    <div className="font-['JetBrains_Mono'] text-base text-[#74C69D]">12 km/h</div>
                    <div className="text-sm text-white/50 uppercase tracking-wider mt-1">Wind</div>
                  </div>
                  <div className="bg-white/8 rounded-lg p-3">
                    <div className="font-['JetBrains_Mono'] text-base text-[#C1440E]">High</div>
                    <div className="text-sm text-white/50 uppercase tracking-wider mt-1">Risk Level</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#C1440E]/8 border border-[#C1440E]/20 rounded-lg p-4 text-base text-[#C1440E] leading-relaxed mb-4">
                <strong className="block mb-1 text-sm uppercase tracking-wider font-['JetBrains_Mono']">Care Engine · Today's Adjustments</strong>
                28°C detected · 8 tasks rescheduled earlier. Humidity 35% below threshold for 6 species. Next engine run 18:00.
              </div>

              <div className="text-base text-[#3D4A4F] bg-[#F5F2EB] rounded-lg p-4 leading-relaxed">
                <strong className="block mb-1 text-sm uppercase tracking-wider font-['JetBrains_Mono'] text-[#2D6A4F]">Next 48hr forecast</strong>
                Tue: 30°C · High risk · Wed: 26°C · Medium risk
              </div>
            </div>
          </div>

          {/* Audit Log */}
          <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm mb-6">
            <div className="text-sm text-[#8A9BA3] uppercase tracking-wider font-['JetBrains_Mono'] mb-4">
              Recent audit log
            </div>
            <div className="grid grid-cols-2 gap-0">
              <div className="pr-5 border-r border-[#EDE8DF]">
                {[
                  { time: '09:42:17', name: 'P. Sharma', action: 'completed WATER · Snake Plant · Room 3', id: 'uid_041' },
                  { time: '10:15:55', name: 'R. Gurung', action: 'completed INSPECT · Peace Lily · Living Room A', id: 'uid_041' },
                  { time: '11:30:02', name: 'M. Karki', action: 'completed WATER · Spider Plant · Dining Area', id: 'uid_022' },
                ].map((log, i) => (
                  <div key={i} className="flex gap-3 py-2 border-b border-[#EDE8DF] last:border-0 items-baseline">
                    <div className="font-['JetBrains_Mono'] text-sm text-[#8A9BA3] min-w-[64px]">{log.time}</div>
                    <div className="text-base text-[#1C3D2E] leading-relaxed flex-1">
                      <strong className="text-[#2D6A4F]">{log.name}</strong> {log.action}
                    </div>
                    <div className="font-['JetBrains_Mono'] text-sm text-[#8A9BA3]">{log.id}</div>
                  </div>
                ))}
              </div>
              <div className="pl-5">
                {[
                  { time: '13:31:44', name: 'S. Tamang', action: 'added plant · Money Plant · Balcony', id: 'uid_001' },
                  { time: '15:00:00', name: 'System', action: 'regenerated daily tasks · 4 workers · weather updated', id: 'cron' },
                  { time: '15:02:11', name: 'System', action: 'flagged Money Plant URGENT · Balcony · 28°C', id: 'engine' },
                ].map((log, i) => (
                  <div key={i} className="flex gap-3 py-2 border-b border-[#EDE8DF] last:border-0 items-baseline">
                    <div className="font-['JetBrains_Mono'] text-sm text-[#8A9BA3] min-w-[64px]">{log.time}</div>
                    <div className="text-sm text-[#1C3D2E] leading-relaxed flex-1">
                      <strong className="text-[#2D6A4F]">{log.name}</strong> {log.action}
                    </div>
                    <div className="font-['JetBrains_Mono'] text-sm text-[#8A9BA3]">{log.id}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          </main>
      </div>
    </div>
  );
};

export default Dashboard;