import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Landingpage = () => {
  const [activeTab, setActiveTab] = useState('need-based')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F8F9F4]">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                
                <span className="text-xl font-bold text-[#1B2022]">🌿 AuraCare</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-[#6C757D] hover:text-[#2D6A4F] transition-colors font-medium">Features</a>
              <a href="#pwa" className="text-[#6C757D] hover:text-[#2D6A4F] transition-colors font-medium">PWA</a>
              <a href="#contact" className="text-[#6C757D] hover:text-[#2D6A4F] transition-colors font-medium">Contact</a>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => navigate('/auth')}
                  className="border border-[#2D6A4F] text-[#2D6A4F] px-4 py-2 rounded-lg hover:bg-[#2D6A4F] hover:text-white transition-colors font-medium"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/auth')}
                  className="bg-[#2D6A4F] text-white px-4 py-2 rounded-lg hover:bg-[#74C69D] transition-colors font-medium"
                >
                  Signup
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <button className="text-[#6C757D] hover:text-[#2D6A4F]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div>
              {/* Top Tag */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-[#2D6A4F] tracking-wider">INTELLIGENT PLANT CARE SYSTEM FOR NURSERIES.</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl font-serif text-[#1B2022] mb-6 leading-tight">
                Plants shouldn't die on a schedule.
                <br />
                <span className="text-2xl md:text-3xl font-serif text-[#6C757D] italic">They should be cared for when they actually need it.</span>
              </h1>
              
              {/* Introductory Text */}
              <p className="text-lg text-[#6C757D] mb-8 leading-relaxed">
                AuraCare combines live weather data with plant biology to tell your team exactly when to act 
                <span className="font-semibold"> not Monday, not Friday, but right now</span>, because it's 31°C in Birmingham today.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-[#2D6A4F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1B2022] transition-colors">
                  START FREE TRIAL
                </button>
                <button className="border border-[#2D6A4F] text-[#2D6A4F] px-8 py-3 rounded-lg font-semibold hover:bg-[#2D6A4F] hover:text-white transition-colors">
                  See how it works
                  <span className="ml-1">?</span>
                </button>
              </div>
            </div>

            {/* Right Side - Comparison Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-2">
                {/* Schedule-Based Column */}
                <div className="bg-orange-50 p-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="ml-2 font-semibold text-orange-600">SCHEDULE-BASED</span>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="text-gray-700">
                      Water every Monday regardless of conditions
                    </div>
                    <div className="text-gray-700">
                      Fertilize in 30 days calendar reminder
                    </div>
                    <div className="text-gray-700">
                      No record of who did what or when
                    </div>
                  </div>
                </div>
                
                {/* Need-Based Column */}
                <div className="bg-green-50 p-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2 font-semibold text-green-600">NEED-BASED</span>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="text-green-700 font-medium">
                      This week Water Wednesday - heat spike detected
                    </div>
                    <div className="text-green-700 font-medium">
                      Adjusted Fertilize in 18 days - low humidity stress
                    </div>
                    <div className="text-green-700 font-medium">
                      Audit Trail J. Okafor - 09:42 GMT - Room 3
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Weather Data */}
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">LIVE · KATHMANDU, NEPAL</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-lg font-semibold text-gray-800">31°C</span>
                  <span className="text-gray-600 mx-2">·</span>
                  <span className="text-gray-600">Humidity 18%</span>
                  <span className="text-gray-600 mx-2">·</span>
                  <span className="text-gray-600">Sunny</span>
                </div>
              </div>

              {/* Action Required Button */}
              <div className="p-4">
                <button className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  ACTION REQUIRED
                </button>
              </div>
            </div>
          </div>

         
        </div>
      </section>
      



      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F8F9F4] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B2022] mb-4">
              Real-Time Environmental Monitoring
            </h2>
            <p className="text-xl text-[#6C757D] max-w-3xl mx-auto">
              Advanced sensors and data visualization keep you informed about every aspect of plant health
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Temperature Monitoring */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F4A261] to-[#E76F51] rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-[#1B2022]">24°C</span>
              </div>
              <h3 className="text-lg font-semibold text-[#1B2022] mb-2">Temperature</h3>
              <p className="text-[#6C757D] text-sm mb-4">Optimal range maintained</p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-[#52B788] to-[#74C69D] rounded-full"></div>
              </div>
              <p className="text-xs text-[#6C757D] mt-2 font-medium">75% optimal</p>
            </div>

            {/* Humidity Monitoring */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#74C69D] to-[#52B788] rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-[#1B2022]">65%</span>
              </div>
              <h3 className="text-lg font-semibold text-[#1B2022] mb-2">Humidity</h3>
              <p className="text-[#6C757D] text-sm mb-4">Perfect moisture level</p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-5/6 bg-gradient-to-r from-[#52B788] to-[#74C69D] rounded-full"></div>
              </div>
              <p className="text-xs text-[#6C757D] mt-2 font-medium">85% optimal</p>
            </div>

            {/* Soil Moisture */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2D6A4F] to-[#1B2022] rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-[#1B2022]">42%</span>
              </div>
              <h3 className="text-lg font-semibold text-[#1B2022] mb-2">Soil Moisture</h3>
              <p className="text-[#6C757D] text-sm mb-4">Needs watering soon</p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-2/5 bg-gradient-to-r from-[#F4A261] to-[#E76F51] rounded-full"></div>
              </div>
              <p className="text-xs text-[#F4A261] mt-2 font-medium">Action needed</p>
            </div>

            {/* Light Levels */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F4A261] to-[#E76F51] rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-[#1B2022]">850 lux</span>
              </div>
              <h3 className="text-lg font-semibold text-[#1B2022] mb-2">Light Intensity</h3>
              <p className="text-[#6C757D] text-sm mb-4">Bright indirect light</p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-[#52B788] to-[#74C69D] rounded-full"></div>
              </div>
              <p className="text-xs text-[#6C757D] mt-2 font-medium">80% optimal</p>
            </div>

            {/* Nutrient Levels */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#52B788] to-[#74C69D] rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-[#1B2022]">Good</span>
              </div>
              <h3 className="text-lg font-semibold text-[#1B2022] mb-2">Nutrient Levels</h3>
              <p className="text-[#6C757D] text-sm mb-4">Balanced NPK ratio</p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-[#52B788] to-[#74C69D] rounded-full"></div>
              </div>
              <p className="text-xs text-[#6C757D] mt-2 font-medium">Healthy levels</p>
            </div>

            {/* pH Levels */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E63946] to-[#D62828] rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-[#1B2022]">6.8</span>
              </div>
              <h3 className="text-lg font-semibold text-[#1B2022] mb-2">pH Level</h3>
              <p className="text-[#6C757D] text-sm mb-4">Slightly acidic</p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-5/6 bg-gradient-to-r from-[#E63946] to-[#D62828] rounded-full"></div>
              </div>
              <p className="text-xs text-[#E63946] mt-2 font-medium">Adjustment needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* PWA Capabilities Section */}
      <section id="pwa" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B2022] mb-4">
              Progressive Web App Features
            </h2>
            <p className="text-xl text-[#6C757D] max-w-3xl mx-auto">
              Experience the power of native app functionality with web convenience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#2D6A4F] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1B2022] mb-2">Offline Mode</h3>
                  <p className="text-[#6C757D]">
                    Monitor and manage your plants even without internet connection. Critical data syncs automatically when you're back online.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#74C69D] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1B2022] mb-2">Instant Installation</h3>
                  <p className="text-[#6C757D]">
                    Add AuraCare to your home screen with one click. No app store downloads required - works on any modern device.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#52B788] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1B2022] mb-2">Lightning Fast</h3>
                  <p className="text-[#6C757D]">
                    Optimized performance with instant loading. Real-time updates and push notifications keep you informed.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#F4A261] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1B2022] mb-2">Secure & Reliable</h3>
                  <p className="text-[#6C757D]">
                    Enterprise-grade security with automatic updates. Your plant data is encrypted and backed up safely.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2D6A4F] to-[#74C69D] rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Install AuraCare</h3>
                <p className="mb-6 opacity-90">
                  Get instant access to your plant care system from any device
                </p>
                <button className="bg-white text-[#2D6A4F] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                  Add to Home Screen
                </button>
                <p className="text-sm mt-4 opacity-75">
                  Works on iOS, Android, and desktop browsers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
     

     <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm text-[#6C757D] font-mono">// START TODAY</p>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif text-[#1B2022] mb-6">
              Your plants are waiting for
              <span className="italic text-[#2D6A4F]"> better care.</span>
            </h1>
            <p className="text-xl text-[#6C757D] max-w-3xl mx-auto mb-12">
              Join supported living facilities across the world using AuraCare to protect their green spaces and their compliance records.
            </p>
          </div>

          {/* Email Signup Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="manager@yourfacility.com.np"
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent"
                />
                <button className="bg-[#2D6A4F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1B2022] transition-colors">
                  Get Early Access
                </button>
              </div>
              <p className="text-center text-sm text-[#6C757D] mt-4">
                Free 30-day trial · No credit card · Setup in under 10 minutes
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-[#1B2022] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
               
                <span className="text-xl font-bold"> 🌿 AuraCare</span>
              </div>
              <p className="text-gray-400 text-sm">
                Smart plant care for modern spaces
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PWA</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 AuraCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;