import React, { useState } from 'react';

const Hero = ({ isDarkMode }) => {
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section id="home" className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-indigo-950' : 'bg-gradient-to-br from-gray-50 to-indigo-100'}`}>
      {/* Animated Background Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(79,70,229,0.3)_0%,transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(67,56,202,0.25)_0%,transparent_50%)] animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text & CTA */}
        <div>
          {/* At the top of the left column in Hero */}
          <div className="mb-8 flex justify-center md:justify-start">
            <img 
              src={`${process.env.PUBLIC_URL}/images/logo-${isDarkMode ? 'dark' : 'light'}.jpeg`}
              alt="Cyber Awareness Hub Logo"
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl animate-pulse-slow hover:scale-105 transition-all duration-700"
              onError={(e) => {
                e.target.onerror = null;
                // Create a fallback SVG logo
                e.target.src = `data:image/svg+xml;base64,${btoa(` 
                  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                    <rect width="200" height="200" fill="${isDarkMode ? '#1f2937' : '#3b82f6'}" rx="20"/>
                    <circle cx="100" cy="80" r="30" fill="white" opacity="0.9"/>
                    <path d="M70,120 L130,120 L130,150 L70,150 Z" fill="white" opacity="0.9"/>
                    <circle cx="100" cy="65" r="8" fill="${isDarkMode ? '#3b82f6' : '#1f2937'}"/>
                    <rect x="85" y="125" width="30" height="10" fill="${isDarkMode ? '#3b82f6' : '#1f2937'}" rx="2"/>
                  </svg>
                `)}`;
              }}
            />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Asian Network of Cyber <span className="text-primary-600">Awareness</span> Skills Hubs
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl">
            Empowering Asia with knowledge, tools, and protection against cyber threats.
          </p>

          <button
            onClick={handleGetStarted}
            className="group mt-10 inline-flex items-center gap-3 px-10 py-5 bg-primary-600 text-white text-xl font-semibold rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
          >
            Get Started
            <span className="group-hover:translate-x-2 transition-transform duration-300 text-2xl">→</span>
          </button>
        </div>

        {/* Right: Masonry Grid + Multimedia */}
        <div className="grid grid-cols-4 gap-4 auto-rows-[120px] md:auto-rows-[140px]">
          <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/secure-technology-abstract-background_23-2148331625.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="col-span-2 rounded-xl overflow-hidden shadow-xl" style={{ backgroundImage: "url('https://thumbs.dreamstime.com/b/technological-cybersecurity-eye-scanning-vector-background-abstr-abstract-design-90991626.jpg')", backgroundSize: 'cover' }}></div>
          <div className="rounded-xl overflow-hidden shadow-xl" style={{ backgroundImage: "url('https://www.shutterstock.com/image-vector/poster-brochure-cover-banner-presentation-260nw-2426661537.jpg')", backgroundSize: 'cover' }}></div>
          <div className="rounded-xl overflow-hidden shadow-xl" style={{ backgroundImage: "url('https://thumbs.dreamstime.com/b/cyber-security-banner-digital-padlock-circuit-board-dark-blue-background-tech-protection-concept-ai-image-cyber-344369485.jpg')", backgroundSize: 'cover' }}></div>
        </div>
      </div>

      {/* Welcome Modal / Interactive Get Started */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className={`relative p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg w-full mx-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl">&times;</button>
            
            <h2 className="text-3xl font-bold mb-6 text-center">Welcome to Cyber Awareness Hub!</h2>
            <p className="text-center mb-8">Choose how you'd like to begin your cyber safety journey:</p>
            
            <div className="grid gap-4">
              <button className="p-5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">I'm a Beginner – Show Basics</button>
              <button className="p-5 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-600 hover:text-white transition">Explore Tools (Password & Phishing Checker)</button>
              <button className="p-5 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-600 hover:text-white transition">Discover Asian Cyber Hubs</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
