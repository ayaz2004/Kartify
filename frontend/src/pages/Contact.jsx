import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="animate-fade-in min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="page-header bg-gradient-to-r from-primary-500 to-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text-white">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Have questions about Kartify? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl">💬</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card-modern">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">📝</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-field"
                    placeholder="Tell us more about your question or feedback..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Support</h3>
                      <p className="text-gray-600 mb-2">Our support team is here to help</p>
                      <a href="mailto:support@kartify.com" className="text-green-600 hover:text-green-700">
                        support@kartify.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Support</h3>
                      <p className="text-gray-600 mb-2">Mon-Fri 9am-6pm EST</p>
                      <a href="tel:+15551234567" className="text-green-600 hover:text-green-700">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Address</h3>
                      <p className="text-gray-600">
                        123 Shopping Street<br />
                        Retail City, RC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Live Chat</h3>
                      <p className="text-gray-600 mb-2">Available 24/7 for urgent issues</p>
                      <button className="text-green-600 hover:text-green-700">
                        Start Live Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <h3 className="font-semibold mb-3">How does the family sharing work?</h3>
              <p className="text-gray-600">
                Create a family group and invite members with a simple invite code. Everyone can add items to shared lists and see real-time updates.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-3">Is my data secure?</h3>
              <p className="text-gray-600">
                Yes! We use industry-standard encryption and never sell your data. Your shopping habits and family information are completely private.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-3">How does AI prediction work?</h3>
              <p className="text-gray-600">
                Our AI analyzes your shopping patterns, seasonal trends, and consumption habits to predict when you'll need to restock items.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-3">Can I use this offline?</h3>
              <p className="text-gray-600">
                The app works best with an internet connection, but you can view your lists offline. Changes sync when you're back online.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
