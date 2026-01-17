import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Focus from './components/Focus';
import News from './components/News';
import HubsList from './components/HubsList';
import SecurityTools from './components/ToolsSection';
import FAQSection from './components/FAQSection';
import ProtectionTips from './components/ProtectionTips';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="pt-16 md:pt-20">
        <Hero id="home" isDarkMode={isDarkMode} />
        <Focus id="focus" isDarkMode={isDarkMode} />
        <SecurityTools id="tools" isDarkMode={isDarkMode} />
        <FAQSection id="faq" isDarkMode={isDarkMode} />
        <ProtectionTips id="tips" isDarkMode={isDarkMode} />
        <News id="news" isDarkMode={isDarkMode} />
        <HubsList id="hubs" isDarkMode={isDarkMode} />
        <Newsletter isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
