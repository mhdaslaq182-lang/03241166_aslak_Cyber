import React from 'react';

const Focus = ({ isDarkMode }) => {
  return (
    <section id="focus" className={`py-16 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">Our Focus</h2>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Text + Explanation */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              The Asian Network of Cyber Awareness Skills Hubs focuses on building strong cyber resilience across the region through education, community hubs, and practical tools.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
              <li>Raising awareness about phishing, ransomware, and emerging threats</li>
              <li>Promoting strong passwords, MFA, and safe online habits</li>
              <li>Supporting national hubs in Sri Lanka, India, Singapore, and beyond</li>
              <li>Empowering individuals and organizations against cyber attacks</li>
            </ul>
            <p className="text-lg font-medium text-primary-600">
              Watch this short educational video to understand common phishing tactics:
            </p>
          </div>

          {/* Right: YouTube Video Embed - Multimedia Integration */}
          <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-primary-600/30 aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/WNVTGTrWcvw"
              title="Cyber Security Awareness: Phishing - A Game of Deception"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-2 bg-gray-100 dark:bg-gray-800">
              Educational video on spotting and avoiding phishing attacks (Source: Security Quotient)
            </p>
          </div>
        </div>

        {/* Extra note for report */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          Video embedded from YouTube (royalty-free for educational use) • Optimized for fast loading and responsiveness.
        </div>
      </div>
    </section>
  );
};

export default Focus;
