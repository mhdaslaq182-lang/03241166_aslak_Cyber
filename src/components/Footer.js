import React from 'react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer className="relative bg-gradient-to-r from-red-950 via-red-900 to-black text-white py-12 md:py-16 overflow-hidden">
      {/* Top curved accent */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-red-900/40 transform -skew-y-2 origin-top-left"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start md:items-center">
          {/* Left: Logo + Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <img 
                src={`${process.env.PUBLIC_URL}/images/logo-${isDarkMode ? 'dark' : 'light'}.jpeg`}
                alt="Cyber Awareness Hub Logo"
                className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-6"
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
              <span className="text-2xl md:text-3xl font-bold tracking-tight">Cyber Awareness Hub</span>
            </div>
            <p className="text-sm opacity-90 mb-2">
              © {new Date().getFullYear()} Cyber Awareness Hub. All rights reserved.
            </p>
            <p className="text-xs opacity-70 italic">
              Co-funded by Asian Union – Empowering Asia through cyber awareness and skills development.
            </p>
          </div>

          {/* Center: Full Social Media Icons (with X instead of Twitter) */}
          <div className="flex justify-center gap-6 md:gap-8 flex-wrap">
            {[
              { icon: 'facebook-f', name: 'Facebook', url: 'https://facebook.com/cybersecurityhub' },
              { icon: 'x-twitter', name: 'X', url: 'https://twitter.com/cybersecurityhub' },               // Official X icon
              { icon: 'linkedin-in', name: 'LinkedIn', url: 'https://linkedin.com/company/cybersecurityhub' },
              { icon: 'youtube', name: 'YouTube', url: 'https://youtube.com/cybersecurityhub' },
              { icon: 'instagram', name: 'Instagram', url: 'https://instagram.com/cybersecurityhub' },
              { icon: 'telegram', name: 'Telegram', url: 'https://t.me/cybersecurityhub' }           // Telegram icon
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1 text-white hover:text-indigo-300 transition-colors duration-300"
                aria-label={item.name}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-purple-700 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-xl">
                  <i className={`fab fa-${item.icon} text-2xl`}></i>
                </div>
                <span className="text-xs opacity-80 group-hover:opacity-100">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Right: Links */}
          <div className="flex flex-col items-center md:items-end gap-3 text-sm">
            <a href="/privacy" className="hover:text-indigo-300 transition-colors duration-200">Privacy Policy</a>
            <a href="/terms" className="hover:text-indigo-300 transition-colors duration-200">Terms of Use</a>
            <a href="/contact" className="hover:text-indigo-300 transition-colors duration-200">Contact Us</a>
          </div>
        </div>
      </div>

      {/* Bottom curve accent */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent opacity-60 transform skew-y-3 origin-bottom-right"></div>
    </footer>
  );
};

export default Footer;
