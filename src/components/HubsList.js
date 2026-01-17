import React from 'react';

const HubCard = ({ country, flagUrl, isDarkMode }) => {
  return (
    <div className={`p-4 rounded-xl shadow-md flex flex-col items-center text-center ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-xl'} transition-all duration-300 transform hover:-translate-y-2`}>
      {/* Smaller circle with full flag inside + waving animation */}
      <div className="relative w-20 h-20 mb-3">
        {/* Full flag as circle background with waving effect */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden flag-wave"
          style={{
            backgroundImage: `url(${flagUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>

      <h3 className="font-semibold text-base">{country} CyberHub</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">National Hub</p>
    </div>
  );
};

const HubsList = ({ isDarkMode }) => {
  // Real official flag images (Wikimedia – public domain, high quality)
  const hubs = [
    {
      country: "Sri Lanka",
      flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/1280px-Flag_of_Sri_Lanka.svg.png"
    },
    {
      country: "India",
      flagUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1280px-Flag_of_India.svg.png"
    },
    {
      country: "Singapore",
      flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1280px-Flag_of_Singapore.svg.png"
    },
    {
      country: "Japan",
      flagUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png"
    }
  ];

  return (
    <section id="hubs" className={`py-12 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Our Asian Cyber Hubs</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {hubs.map((hub, index) => (
            <HubCard 
              key={index}
              country={hub.country}
              flagUrl={hub.flagUrl}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400">
          Connecting national hubs to promote cyber awareness and skills across Asia
        </p>
      </div>
    </section>
  );
};

export default HubsList;
