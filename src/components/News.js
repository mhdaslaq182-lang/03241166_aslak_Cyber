import React from 'react';
import clsx from 'clsx';

const NewsCard = ({ tag, color, date, headline, summary, imageUrl, sourceUrl, isDarkMode }) => {
  const getColorClass = (color) => {
    const colorMap = {
      'cyan-600': 'bg-cyan-600',
      'orange-600': 'bg-orange-600',
      'teal-600': 'bg-teal-600',
      'blue-600': 'bg-blue-600',
      'purple-600': 'bg-purple-600',
      'red-600': 'bg-red-600',
      'green-600': 'bg-green-600'
    };
    return colorMap[color] || 'bg-indigo-600';
  };

  
  return (
    <div
      className={`p-5 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
        isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      <span className={`inline-block text-xs uppercase font-bold px-3 py-1 rounded-full text-white ${getColorClass(color)}`}>
        {tag}
      </span>
      <div
        className={clsx('mt-4', 'h-40', 'bg-gray-300', 'rounded-lg', 'overflow-hidden')}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Add a fallback image inside */}
        <img 
          src={imageUrl}
          alt={headline}
          className="opacity-0 w-full h-full"
          onError={(e) => {
            e.target.style.display = 'none';
            // Create a fallback background
            e.target.parentElement.style.background = 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)';
            e.target.parentElement.innerHTML = `
              <div class="w-full h-full flex items-center justify-center text-white p-4">
                <div class="text-center">
                  <div class="text-2xl mb-2">🔒</div>
                  <div class="text-sm font-bold">${headline}</div>
                </div>
              </div>
            `;
          }}
        />
      </div>
      <p className={clsx('mt-3', 'text-xs', 'text-gray-500', 'dark:text-gray-400')}>{date}</p>
      <h3 className={clsx('mt-2', 'font-bold', 'text-base', 'line-clamp-2')}>{headline}</h3>
      <p className={clsx('mt-2', 'text-xs', 'line-clamp-3', 'dark:text-gray-300')}>{summary}</p>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx('mt-3', 'inline-block', 'text-indigo-600', 'dark:text-indigo-400', 'hover:text-indigo-800', 'dark:hover:text-indigo-300', 'font-medium')}
      >
        Read more →
      </a>
    </div>
  );
};

const News = ({ isDarkMode }) => {
  const newsItems = [
    {
      tag: "Regional Conference",
      color: "cyan-600",
      date: "Jan 19-20, 2026",
      headline: "Ransomware Resilience 2026 Conference – Kuala Lumpur",
      summary: "Experts gather in Malaysia to discuss rising ransomware threats in Asia-Pacific.",
      imageUrl: "https://cxociety.com/wp-content/uploads/2025/11/masthead800x450_FutureCIO_TH_11-Feb-2026.jpg",
      sourceUrl: "https://cybersecurityasia.tech/"
    },
    {
      tag: "China Regulations",
      color: "orange-600",
      date: "Jan 8, 2026",
      headline: "China Cybersecurity Law Amendments with AI Focus",
      summary: "New provisions introduce stricter AI governance and penalties.",
      imageUrl: "https://carnegieendowment.org/static/media/images/Sheehan_fig2-policy-funnel-9.png",
      sourceUrl: "https://iapp.org/news/a/notes-from-the-asia-pacific-region-strong-start-to-2026-for-china-s-data-ai-governance-landscape"
    },
    {
      tag: "National Hubs News",
      color: "teal-600",
      date: "Jan 15, 2026",
      headline: "Sri Lanka Advances National Cybersecurity Strategy",
      summary: "SLCERT targets full NCSOC connection by December 2026.",
      imageUrl: "https://srilankamirror.com/wp-content/uploads/2025/09/NCSOC_1200x675px_19_09_25.jpg",
      sourceUrl: "https://news.lk/current-affairs/launch-of-national-cyber-protection-strategy-2025-2029-and-opening-of-national-cyber-security-operations-centre-ncsoc-under-presidents-patronage"
    },
    {
      tag: "Geopolitical Threats",
      color: "cyan-600",
      date: "Jan 12, 2026",
      headline: "Rising State-Sponsored Cyber Operations in Asia-Pacific",
      summary: "Experts warn of expanded attacks with AI reshaping threats.",
      imageUrl: "https://merics.org/sites/default/files/2023-11/MERICS%20Report%20medium_Hacking_exhibit3.png",
      sourceUrl: "https://www.euronews.com/next/2026/01/12/from-ai-breaches-to-rising-geopolitical-threats-heres-what-to-expect-from-cybersecurity-in"
    }
  ];

  return (
    <section id="news" className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={clsx('max-w-7xl', 'mx-auto', 'px-5', 'sm:px-6', 'lg:px-8')}>
        <div className={clsx('flex', 'items-center', 'mb-10', 'gap-4')}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/045/355/857/non_2x/cyber-security-icon-shield-with-padlock-icon-related-to-information-technology-flat-line-icon-style-technology-element-illustration-vector.jpg"
            alt="Cyber News Icon"
            className={clsx('w-12', 'h-12')}
          />
          <h2 className={clsx('text-4xl', 'font-bold')}>Must Reads</h2>
        </div>

        <p className={clsx('text-lg', 'text-gray-600', 'dark:text-gray-400', 'mb-10', 'text-center', 'md:text-left')}>
          Latest cybersecurity insights from across Asia – January 2026
        </p>

        <div className={clsx('grid', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-6')}>
          {newsItems.map((item, index) => (
            <NewsCard key={index} {...item} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;