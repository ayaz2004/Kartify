import React from 'react';

const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="page-header">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 gradient-text">
              About Kartify
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing how families shop together by combining collaborative tools with intelligent predictions to make shopping smarter, faster, and more efficient.
            </p>
            <div className="mt-12 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-6xl">🏪</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Shopping for a family shouldn't be stressful or wasteful. Our mission is to empower families with the tools they need to shop collaboratively, reduce food waste, and make informed purchasing decisions.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By combining the power of artificial intelligence with intuitive collaborative features, we help families save time, money, and reduce their environmental impact.
              </p>
              <div className="space-y-6 mt-8">
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <span className="text-lg font-medium text-gray-700">Reduce food waste by 40%</span>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <span className="text-white text-xl">💰</span>
                  </div>
                  <span className="text-lg font-medium text-gray-700">Save families an average of 25% on groceries</span>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <span className="text-white text-xl">👨‍👩‍👧‍👦</span>
                  </div>
                  <span className="text-lg font-medium text-gray-700">Streamline family shopping coordination</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="card text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                  <span className="text-white text-4xl">🌟</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Smart Shopping Revolution</h3>
                <p className="text-gray-600 leading-relaxed">
                  Experience the future of family retail with AI-powered insights, collaborative tools, and intelligent automation.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary-600">10K+</div>
                      <div className="text-sm text-gray-500">Happy Families</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary-600">25%</div>
                      <div className="text-sm text-gray-500">Average Savings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-gray-600">
                We believe shopping is better when families work together. Our platform makes it easy for everyone to contribute and stay informed.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                Reducing waste and promoting mindful consumption helps families save money while protecting the environment.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our AI algorithms and features to provide the most intelligent shopping experience possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-24 h-24 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
              <p className="text-green-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Former retail executive with 15 years of experience in consumer behavior and family shopping patterns.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-24 h-24 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mike Chen</h3>
              <p className="text-green-600 mb-2">CTO</p>
              <p className="text-gray-600 text-sm">
                AI and machine learning expert who previously built recommendation systems for major e-commerce platforms.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-24 h-24 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Emma Rodriguez</h3>
              <p className="text-green-600 mb-2">Head of Design</p>
              <p className="text-gray-600 text-sm">
                UX designer passionate about creating intuitive interfaces that make complex tasks simple for families.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powered by Advanced Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">🤖 Artificial Intelligence</h3>
              <p className="text-gray-600">
                Our AI analyzes your family's shopping patterns, seasonal trends, and consumption habits to provide personalized recommendations and predict when you'll need to restock items.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">☁️ Cloud-First Architecture</h3>
              <p className="text-gray-600">
                Built on modern cloud infrastructure to ensure your data is always accessible, secure, and synchronized across all family members' devices in real-time.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">📱 Mobile-Optimized</h3>
              <p className="text-gray-600">
                Responsive design ensures a seamless experience whether you're planning at home on your computer or shopping in-store with your mobile device.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">🔒 Privacy-Focused</h3>
              <p className="text-gray-600">
                Your family's data is encrypted and secure. We never sell your information and give you full control over your privacy settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Future of Family Shopping?
          </h2>
          <p className="text-xl mb-8">
            Experience the difference intelligent shopping can make for your family.
          </p>
          <a href="/register" className="btn-primary bg-white text-green-600 hover:bg-gray-100">
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
