import React from 'react';

const Header = ({ isMenuOpen, toggleMenu, toggleDarkMode, isDarkMode }) => {
  
  const handleNavClick = (sectionId) => {
    // Close mobile menu if open
    if (isMenuOpen) {
      toggleMenu();
    }
    
    // Use timeout to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      } else {
        window.location.hash = sectionId;
      }
    }, 100);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={`${process.env.PUBLIC_URL}/images/logo-${isDarkMode ? 'dark' : 'light'}.jpeg`}
              alt="Cyber Awareness Hub Logo"
              className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-lg transition-all duration-500 hover:scale-110 hover:rotate-6"
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
            <span className="font-bold text-xl md:text-2xl">Cyber Awareness Hub</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => handleNavClick('home')} className="hover:text-primary-600 transition font-medium">Home</button>
            <button onClick={() => handleNavClick('focus')} className="hover:text-primary-600 transition font-medium">Focus</button>
            <button onClick={() => handleNavClick('tools')} className="hover:text-primary-600 transition font-medium">Tools</button>
            <button onClick={() => handleNavClick('news')} className="hover:text-primary-600 transition font-medium">News</button>
            <button onClick={() => handleNavClick('hubs')} className="hover:text-primary-600 transition font-medium">Hubs</button>
            <button onClick={toggleDarkMode} className="hover:text-primary-600 transition font-medium">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
          >
            <div className="w-6 h-5 flex flex-col justify-center space-y-1">
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div className={`fixed inset-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'} backdrop-blur-md z-[9999] flex flex-col items-center justify-center md:hidden transition-all duration-500 relative overflow-hidden`}>
          {/* Background Pattern - Dark Mode */}
          <div className={`absolute inset-0 transition-all duration-500 ${isDarkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.15)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(67,56,202,0.15)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1)_0%,transparent_70%)]"></div>
          </div>
          
          {/* Background Pattern - Light Mode */}
          <div className={`absolute inset-0 transition-all duration-500 ${isDarkMode ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(99,102,241,0.15)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1)_0%,transparent_70%)]"></div>
          </div>
          
          <button 
            onClick={toggleMenu} 
            className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-500 z-10 ${
              isDarkMode ? 'bg-gray-800/90 hover:bg-gray-700/90 text-white backdrop-blur-sm' : 'bg-white/90 hover:bg-gray-100/90 text-gray-800 backdrop-blur-sm'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Logo and Navigation */}
          <div className="text-center relative z-10 w-full px-6">
            <div className="mb-8">
              <img 
                src={`${process.env.PUBLIC_URL}/images/logo-${isDarkMode ? 'dark' : 'light'}.jpeg`}
                alt="Cyber Awareness Hub Logo" 
                className="w-28 h-28 mx-auto rounded-2xl shadow-2xl transition-all duration-500"
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
            <nav className="flex flex-col gap-4 text-lg max-w-xs mx-auto w-full">
              <button 
                onClick={() => handleNavClick('home')} 
                className={`px-6 py-4 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800/90 hover:bg-gray-700/90 text-white backdrop-blur-sm' : 'bg-white/90 hover:bg-gray-100/90 text-gray-800 backdrop-blur-sm'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('focus')} 
                className={`px-6 py-4 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800/90 hover:bg-gray-700/90 text-white backdrop-blur-sm' : 'bg-white/90 hover:bg-gray-100/90 text-gray-800 backdrop-blur-sm'
                }`}
              >
                Focus
              </button>
              <button 
                onClick={() => handleNavClick('tools')} 
                className={`px-6 py-4 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800/90 hover:bg-gray-700/90 text-white backdrop-blur-sm' : 'bg-white/90 hover:bg-gray-100/90 text-gray-800 backdrop-blur-sm'
                }`}
              >
                Tools
              </button>
              <button 
                onClick={() => handleNavClick('news')} 
                className={`px-6 py-4 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800/90 hover:bg-gray-700/90 text-white backdrop-blur-sm' : 'bg-white/90 hover:bg-gray-100/90 text-gray-800 backdrop-blur-sm'
                }`}
              >
                News
              </button>
              <button 
                onClick={() => handleNavClick('hubs')} 
                className={`px-6 py-4 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800/90 hover:bg-gray-700/90 text-white backdrop-blur-sm' : 'bg-white/90 hover:bg-gray-100/90 text-gray-800 backdrop-blur-sm'
                }`}
              >
                Hubs
              </button>
              <button 
                onClick={() => { toggleDarkMode(); }} 
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-500 transform hover:scale-105 text-white font-medium shadow-lg"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
