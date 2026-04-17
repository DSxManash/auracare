import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PlantCareTasks = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('today')
  const [completedTasks, setCompletedTasks] = useState([])

  const tasks = {
    today: [
      {
        id: 1,
        type: 'watering',
        title: 'Water Main Greenhouse',
        description: 'Soil moisture at 42%. Heat spike detected - increase watering frequency.',
        time: 'Morning (09:00-11:00)',
        priority: 'high',
        reason: 'Soil Moisture Low + Temperature High'
      },
      {
        id: 2,
        type: 'misting',
        title: 'Mist Tropical Plants',
        description: 'Humidity dropping below optimal. Afternoon mist recommended.',
        time: 'Afternoon (14:00-15:00)',
        priority: 'medium',
        reason: 'Humidity - Afternoon dip'
      },
      {
        id: 3,
        type: 'pruning',
        title: 'Check Plant Health',
        description: 'Inspect plants for pests or disease signs. General health check.',
        time: 'Evening (17:00-18:00)',
        priority: 'low',
        reason: 'Routine Maintenance'
      }
    ],
    upcoming: [
      {
        id: 4,
        type: 'feeding',
        title: 'Fertilize Plants',
        description: 'Nutrient levels will decrease within 1-2 weeks. Start preparation.',
        time: 'In 7 days',
        priority: 'medium',
        reason: 'Nutrient Depletion Scheduled',
        dueDate: 'Apr 24, 2026'
      },
      {
        id: 5,
        type: 'transplant',
        title: 'Repot Small Plants',
        description: 'Root development visible. Plants ready for larger containers.',
        time: 'In 14 days',
        priority: 'low',
        reason: 'Plant Development',
        dueDate: 'May 1, 2026'
      },
      {
        id: 6,
        type: 'pruning',
        title: 'Major Pruning & Shaping',
        description: 'Trim overgrown sections to promote bushier growth.',
        time: 'In 21 days',
        priority: 'low',
        reason: 'Growth Management',
        dueDate: 'May 8, 2026'
      }
    ]
  }

  const toggleComplete = (id) => {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter(t => t !== id))
    } else {
      setCompletedTasks([...completedTasks, id])
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high':
        return 'text-[#C1440E] bg-[#C1440E]/5'
      case 'medium':
        return 'text-[#C9821A] bg-[#C9821A]/5'
      case 'low':
        return 'text-[#2D6A4F] bg-[#2D6A4F]/5'
      default:
        return 'text-[#8A9BA3] bg-[#8A9BA3]/5'
    }
  }

  const getTaskTypeLabel = (type) => {
    switch(type) {
      case 'watering':
        return 'W'
      case 'misting':
        return 'M'
      case 'pruning':
        return 'P'
      case 'feeding':
        return 'F'
      case 'transplant':
        return 'T'
      default:
        return 'T'
    }
  }

  return (
    <div className="min-h-screen bg-[#F0EDE6]">
      <header className="bg-[#1C3D2E] px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-['Cormorant_Garamond'] text-white text-xl tracking-wide">Daily Tasks</span>
        </div>
        <div className="text-sm font-['JetBrains_Mono'] text-white/90">
          <span className="text-[#74C69D] font-medium">{completedTasks.length}/6</span> completed
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mb-6">
          <h1 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1C3D2E]">Task Management</h1>
          <div className="text-sm text-[#8A9BA3] mt-2 font-['JetBrains_Mono'] tracking-wide">Track and manage all plant care activities</div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#DDD9D2] rounded-xl p-4 shadow-sm">
            <div className="text-xs text-[#8A9BA3] font-['JetBrains_Mono'] uppercase tracking-wide mb-2">Today</div>
            <div className="font-['Cormorant_Garamond'] text-3xl text-[#C1440E]">3</div>
            <div className="text-xs text-[#8A9BA3] mt-1">tasks</div>
          </div>
          <div className="bg-white border border-[#DDD9D2] rounded-xl p-4 shadow-sm">
            <div className="text-xs text-[#8A9BA3] font-['JetBrains_Mono'] uppercase tracking-wide mb-2">Completed</div>
            <div className="font-['Cormorant_Garamond'] text-3xl text-[#2D6A4F]">{completedTasks.length}</div>
            <div className="text-xs text-[#8A9BA3] mt-1">this week</div>
          </div>
          <div className="bg-white border border-[#DDD9D2] rounded-xl p-4 shadow-sm">
            <div className="text-xs text-[#8A9BA3] font-['JetBrains_Mono'] uppercase tracking-wide mb-2">Upcoming</div>
            <div className="font-['Cormorant_Garamond'] text-3xl text-[#74C69D]">3</div>
            <div className="text-xs text-[#8A9BA3] mt-1">next 21 days</div>
          </div>
          <div className="bg-white border border-[#DDD9D2] rounded-xl p-4 shadow-sm">
            <div className="text-xs text-[#8A9BA3] font-['JetBrains_Mono'] uppercase tracking-wide mb-2">Status</div>
            <div className="font-['Cormorant_Garamond'] text-3xl text-[#2D6A4F]">Good</div>
            <div className="text-xs text-[#8A9BA3] mt-1">overall</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-[#DDD9D2]">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-3 font-medium transition-colors text-sm font-['JetBrains_Mono'] ${
              activeTab === 'today'
                ? 'text-[#1C3D2E] border-b-[3px] border-[#74C69D]'
                : 'text-[#8A9BA3] border-b-[3px] border-transparent hover:text-[#1C3D2E]'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-3 font-medium transition-colors text-sm font-['JetBrains_Mono'] ${
              activeTab === 'upcoming'
                ? 'text-[#1C3D2E] border-b-[3px] border-[#74C69D]'
                : 'text-[#8A9BA3] border-b-[3px] border-transparent hover:text-[#1C3D2E]'
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Tasks List */}
        <div className="space-y-4 mb-8">
          {tasks[activeTab].map((task) => (
            <div
              key={task.id}
              className={`bg-white border border-[#DDD9D2] rounded-xl p-5 shadow-sm transition-all ${
                completedTasks.includes(task.id) ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className="flex items-center pt-1">
                  <input
                    type="checkbox"
                    checked={completedTasks.includes(task.id)}
                    onChange={() => toggleComplete(task.id)}
                    className="w-5 h-5 rounded cursor-pointer accent-[#2D6A4F]"
                  />
                </div>

                {/* Type Badge */}
                <div className="w-10 h-10 rounded-lg bg-[#1C3D2E]/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-[#1C3D2E] font-['JetBrains_Mono']">{getTaskTypeLabel(task.type)}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className={`font-['Cormorant_Garamond'] text-lg font-semibold ${completedTasks.includes(task.id) ? 'line-through text-[#8A9BA3]' : 'text-[#1C3D2E]'}`}>
                        {task.title}
                      </h3>
                      <p className="text-[#8A9BA3] text-sm mt-1">{task.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap font-['JetBrains_Mono'] ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  {/* Task Details */}
                  <div className="flex flex-wrap gap-6 mt-3 text-sm text-[#8A9BA3] font-['JetBrains_Mono']">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{task.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{task.reason}</span>
                    </div>
                    {task.dueDate && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{task.dueDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-2 bg-[#2D6A4F] text-white text-sm font-medium rounded-lg hover:bg-[#1C3D2E] transition-colors font-['JetBrains_Mono']">
                      Start
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-white border border-[#DDD9D2] rounded-xl p-6 shadow-sm">
          <h3 className="font-['Cormorant_Garamond'] text-lg font-semibold text-[#1C3D2E] mb-4">Care Guidelines</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-[#8A9BA3]">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#2D6A4F]">1</span>
              </div>
              <div>
                <strong className="text-[#1C3D2E] block">Water Early</strong>
                <span>Complete before noon to allow foliage to dry</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#2D6A4F]">2</span>
              </div>
              <div>
                <strong className="text-[#1C3D2E] block">Keep Records</strong>
                <span>Log care actions to identify patterns</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#2D6A4F]">3</span>
              </div>
              <div>
                <strong className="text-[#1C3D2E] block">Group by Needs</strong>
                <span>Plants with similar requirements together</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#2D6A4F]">4</span>
              </div>
              <div>
                <strong className="text-[#1C3D2E] block">Weather Aware</strong>
                <span>Adjust watering during rainy seasons</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlantCareTasks
