import React from 'react';

const tips = [
  'Use strong, unique passwords and a password manager.',
  'Enable Multi-Factor Authentication (MFA) everywhere.',
  'Keep software and devices updated with latest patches.',
  'Backup data regularly (offline and cloud).',
  'Be cautious with emails – verify senders and links.',
  'Use antivirus software and firewalls.',
  'Avoid public Wi-Fi for sensitive activities; use VPN.',
  'Educate yourself on phishing and social engineering.',
  'Monitor accounts for unusual activity.',
  'Limit sharing personal info online.'
];

const proTips = [
  'Use passkeys instead of passwords where possible.',
  'Enable dark mode for eye comfort during long sessions (like in this app!).',
  'Test your own security with tools like our checkers.',
  'Follow NIST guidelines for business security.',
  'Stay updated via sources like CISA alerts.'
];

const ProtectionTips = ({ isDarkMode }) => {
  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">How to Protect from Cyber Attacks</h2>
        <div className={`grid md:grid-cols-2 gap-8 mb-8`}>
          <div>
            <h3 className="text-2xl font-bold mb-4">Essential Tips</h3>
            <ul className={`list-disc pl-6 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Pro Tips for 2026</h3>
            <ul className={`list-disc pl-6 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {proTips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        </div>
        <div className={`mt-8 p-6 rounded-lg text-center ${isDarkMode ? 'bg-primary-900' : 'bg-primary-50'}`}>
          <h3 className="text-xl font-bold mb-4">Stay Protected</h3>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Cybersecurity is everyone's responsibility. Start implementing these tips today to keep your digital life secure.
          </p>
          <button className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition">
            Download Security Guide
          </button>
        </div>
        <img src="https://secureclaw.com/assets/image/posters/0b61b674-016f-4cb7-a256-af2ca7715a80/10-CYBERSECURITY-TIPS-FOR-EMPLOYEES-SecureClaw.png" alt="Cybersecurity Tips Poster" className="mt-8 rounded-md mx-auto w-full max-w-4xl" />
      </div>
    </section>
  );
};

export default ProtectionTips;
