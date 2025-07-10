import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-bounce-in"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-yellow-300/20 rounded-full animate-bounce-in" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce-in" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-400/15 rounded-full animate-bounce-in" style={{animationDelay: '0.5s'}}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" 
                 style={{
                   backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                   backgroundSize: '50px 50px'
                 }}>
            </div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
              <span className="text-yellow-300 mr-2">✨</span>
              <span className="text-sm font-semibold">Trusted by 10,000+ families worldwide</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              Smart Family
              <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Shopping Revolution
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 leading-relaxed text-green-50/90 max-w-4xl mx-auto font-medium">
              Transform your family's shopping experience with AI-powered insights, real-time collaboration, 
              and intelligent inventory management that saves time, money, and eliminates stress.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white rounded-2xl shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <span className="mr-2 text-2xl group-hover:animate-bounce">🚀</span>
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-green-700 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 border-2 border-yellow-200"
                  >
                    <span className="mr-3 text-2xl group-hover:animate-bounce">🎉</span>
                    Start Free Today
                    <span className="ml-2 opacity-75">→</span>
                  </Link>
                  <Link 
                    to="/about" 
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/50 rounded-2xl hover:bg-white hover:text-green-600 transition-all duration-300 backdrop-blur-sm"
                  >
                    <span className="mr-2">📖</span>
                    Learn More
                  </Link>
                </>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-green-100/80">
              <div className="flex items-center">
                <span className="text-yellow-300 mr-2">⭐</span>
                <span className="font-medium">4.9/5 rating</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-300 mr-2">🔒</span>
                <span className="font-medium">100% secure</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-300 mr-2">⚡</span>
                <span className="font-medium">2-minute setup</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-green-100 text-green-700 rounded-full px-6 py-2 mb-6 font-semibold">
              <span className="mr-2">⚡</span>
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 gradient-text">
              Everything Your Family Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the future of family shopping with cutting-edge features designed to save you time, 
              money, and stress while bringing your family closer together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {/* Feature 1 */}
            <div className="group">
              <div className="card text-center h-full">
                <div className="feature-icon mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-4xl">📋</span>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Real-Time Collaboration</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Create and share shopping lists with family members instantly. Real-time updates ensure everyone 
                  stays synchronized, whether they're at home, work, or already at the store.
                </p>
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <span className="flex items-center text-green-600 font-semibold">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Live sync
                    </span>
                    <span className="flex items-center text-blue-600 font-semibold">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Multi-device
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="card text-center h-full">
                <div className="feature-icon mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-4xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Smart Inventory Tracking</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Track household essentials automatically with intelligent notifications. Get alerts when you're 
                  running low, with AI-powered predictions based on your family's consumption patterns.
                </p>
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <span className="flex items-center text-purple-600 font-semibold">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Auto alerts
                    </span>
                    <span className="flex items-center text-orange-600 font-semibold">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      AI insights
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="card text-center h-full">
                <div className="feature-icon mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-4xl">🤖</span>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">AI-Powered Predictions</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Machine learning analyzes your family's shopping patterns to predict needs, suggest optimal 
                  shopping times, and recommend seasonal purchases before you even think of them.
                </p>
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <span className="flex items-center text-indigo-600 font-semibold">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                      Smart predictions
                    </span>
                    <span className="flex items-center text-pink-600 font-semibold">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                      Pattern learning
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-bold text-gray-800 mb-2">Mobile First</h4>
              <p className="text-sm text-gray-600">Optimized for shopping on-the-go</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center">
              <div className="text-3xl mb-3">🔐</div>
              <h4 className="font-bold text-gray-800 mb-2">Secure & Private</h4>
              <p className="text-sm text-gray-600">Bank-level security for your data</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-bold text-gray-800 mb-2">Lightning Fast</h4>
              <p className="text-sm text-gray-600">Instant updates across all devices</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl text-center">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-bold text-gray-800 mb-2">Save Money</h4>
              <p className="text-sm text-gray-600">Reduce waste and overspending</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Families Everywhere
            </h2>
            <p className="text-xl text-green-100">
              Join thousands of families saving time and money
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-card bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <p className="text-green-100 font-medium">Happy Families</p>
            </div>
            <div className="stat-card bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <p className="text-green-100 font-medium">Lists Created</p>
            </div>
            <div className="stat-card bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">1M+</div>
              <p className="text-green-100 font-medium">Items Tracked</p>
            </div>
            <div className="stat-card bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">25%</div>
              <p className="text-green-100 font-medium">Average Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-32 hero-gradient text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" 
                 style={{
                   backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                   backgroundSize: '60px 60px'
                 }}>
            </div>
          </div>
          
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
                <span className="text-yellow-300 mr-2">🎉</span>
                <span className="text-sm font-semibold">Special Launch Offer - Limited Time</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8">
                Ready to Transform Your 
                <span className="block bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  Shopping Experience?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl mb-12 text-green-100 max-w-3xl mx-auto leading-relaxed">
                Join thousands of families already saving time, money, and stress with intelligent shopping.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Link 
                  to="/register" 
                  className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-green-700 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 border-2 border-yellow-200"
                >
                  <span className="mr-3 text-3xl group-hover:animate-bounce">🎉</span>
                  Start Your Free Trial
                  <span className="ml-2 opacity-75">→</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="group inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-white border-2 border-white/50 rounded-2xl hover:bg-white hover:text-green-600 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="mr-2">💬</span>
                  Talk to Sales
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-green-200">
                <div className="flex items-center justify-center">
                  <span className="text-yellow-300 mr-2 text-xl">✨</span>
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-green-300 mr-2 text-xl">🚀</span>
                  <span className="font-medium">Setup in 2 minutes</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-blue-300 mr-2 text-xl">🔒</span>
                  <span className="font-medium">100% secure & private</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
