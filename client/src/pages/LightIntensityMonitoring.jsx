import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LightIntensityMonitoring = () => {
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState('24h')

  const currentLight = 850

  return (
    <div className="min-h-screen bg-[#F0EDE6]">
      <header className="bg-[#1C3D2E] px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-['Cormorant_Garamond'] text-white text-xl tracking-wide">Light Intensity</span>
        </div>
        <div className="text-sm font-['JetBrains_Mono'] text-white/90">
          <span className="text-[#74C69D] font-medium">{currentLight} lux</span> · Optimal
        </div>
      </header>

      <div className="flex">
        <aside className="w-56 bg-[#1C3D2E] py-6 border-r border-[#74C69D]/10 overflow-y-auto flex flex-col h-[calc(100vh-60px)]">
          <nav className="flex-1">
            <div className="px-5 py-2 text-[10px] text-white/30 font-['JetBrains_Mono'] uppercase tracking-[0.15em]">Monitoring</div>
            <button onClick={() => navigate('/dashboard/temperature')} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 border-l-[3px] border-transparent hover:border-[#74C69D] transition-all">
              <span className="w-5">T</span> Temperature
            </button>
            <button onClick={() => navigate('/dashboard/humidity')} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 border-l-[3px] border-transparent hover:border-[#74C69D] transition-all">
              <span className="w-5">H</span> Humidity
            </button>
            <button onClick={() => navigate('/dashboard/soil-moisture')} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 border-l-[3px] border-transparent hover:border-[#74C69D] transition-all">
              <span className="w-5">S</span> Soil
            </button>
            <button onClick={() => navigate('/dashboard/light-intensity')} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-white hover:bg-[#74C69D]/8 border-l-[3px] border-[#74C69D] transition-all">
              <span className="w-5">L</span> Light
            </button>
            <button onClick={() => navigate('/dashboard/nutrients')} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 border-l-[3px] border-transparent hover:border-[#74C69D] transition-all">
              <span className="w-5">N</span> Nutrients
            </button>
            <button onClick={() => navigate('/dashboard/ph-level')} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-[#74C69D]/8 border-l-[3px] border-transparent hover:border-[#74C69D] transition-all">
              <span className="w-5">P</span> pH
            </button>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mb-6">
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1C3D2E]">Light Intensity</h1>
            <div className="text-sm text-[#8A9BA3] mt-2 font-['JetBrains_Mono'] tracking-wide">Main Greenhouse · Last updated just now</div>
          </div>

          <div className="bg-white border border-[#DDD9D2] rounded-xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-[#8A9BA3] font-['JetBrains_Mono'] uppercase tracking-wide mb-2">Current</div>
                <div className="font-['Cormorant_Garamond'] text-4xl text-[#1C3D2E]">{currentLight}</div>
                <div className="text-xs text-[#8A9BA3] mt-1">lux</div>
              </div>
              <div>
                <div className="text-sm text-[#8A9BA3] font-['JetBrains_Mono'] uppercase tracking-wide mb-2">Type</div>
                <div className="text-[#1C3D2E] font-medium">Bright Indirect</div>
              </div>
              <div>
                <div className="text-sm text-[#8A9BA3] font-['JetBrains_Mono'] uppercase tracking-wide mb-2">Optimal</div>
                <div className="text-[#2D6A4F] font-medium">800 — 1200</div>
              </div>
              <div>
                <div className="text-sm text-[#8A9BA3] font-['JetBrains_Mono'] uppercase tracking-wide mb-2">Status</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-[#2D6A4F] rounded-full"></span><span className="text-[#2D6A4F] font-medium">Optimal</span></div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {['1h', '24h', '7d', '30d'].map((range) => (
              <button key={range} onClick={() => setTimeRange(range)} className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${timeRange === range ? 'bg-[#2D6A4F] text-white' : 'bg-white text-[#8A9BA3] border border-[#DDD9D2]'}`}>
                {range}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm">
              <div className="text-sm text-[#8A9BA3] font-['JetBrains_Mono'] uppercase tracking-wide mb-3">Assessment</div>
              <div className="text-[#1C3D2E] text-sm">Light levels perfect for current plants and growth</div>
            </div>
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm">
              <div className="text-sm text-[#8A9BA3] font-['JetBrains_Mono'] uppercase tracking-wide mb-3">Trend</div>
              <div className="text-[#2D6A4F] text-sm font-medium">Stable throughout day</div>
            </div>
            <div className="bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm">
              <div className="text-sm text-[#8A9BA3] font-['JetBrains_Mono'] uppercase tracking-wide mb-3">Action</div>
              <button className="text-[#2D6A4F] text-sm font-medium hover:text-[#1C3D2E] transition-colors">Maintain position</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default LightIntensityMonitoring
