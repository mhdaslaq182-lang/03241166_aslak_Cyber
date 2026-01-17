import React, { useState } from 'react';

const faqs = [
  { q: 'What is cybersecurity?', a: 'Cybersecurity protects systems, networks, and data from digital attacks.' },
  { q: 'What is a firewall?', a: 'A firewall monitors and controls incoming/outgoing network traffic based on security rules.' },
  { q: 'What is cryptography?', a: 'Cryptography secures information by converting it into code to prevent unauthorized access.' },
  { q: 'What is a VPN?', a: 'A VPN creates a secure connection over internet, masking your IP and encrypting data.' },
  { q: 'What is phishing?', a: 'Phishing is a scam where attackers trick you into revealing sensitive info via fake emails.' },
  { q: 'What is MFA?', a: 'Multi-Factor Authentication adds extra verification steps beyond just a password.' },
  { q: 'What is ransomware?', a: 'Ransomware encrypts files and demands payment for decryption key.' },
  { q: 'What is a brute force attack?', a: 'A brute force attack tries many passwords until finding the correct one.' },
  { q: 'What is CIA triad?', a: 'Confidentiality, Integrity, Availability – core principles of information security.' },
  { q: 'How to prevent cyber attacks?', a: 'Use strong passwords, update software, enable MFA, and be cautious with emails.' },
];

const FAQSection = ({ isDarkMode }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Cybersecurity Q&A</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={`border rounded-md ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full p-4 text-left font-semibold flex justify-between ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}
              >
                {faq.q}
                <span className={`text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {openIndex === index ? '-' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <p className={`p-4 border-t ${isDarkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'}`}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
        <img src="https://media.istockphoto.com/id/1338003094/vector/cyber-security-line-icons-set-vector-illustration-editable-stroke.jpg?s=612x612&w=0&k=20&c=cUEYhdXpvZddQ7zydrHQKqBc1gCI8lOWcm-CAJi8fKk=" alt="Cybersecurity Icons" className="mt-8 rounded-md mx-auto w-full max-w-2xl" />
      </div>
    </section>
  );
};

export default FAQSection;
