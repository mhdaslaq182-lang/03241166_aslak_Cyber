import React from 'react';

const Newsletter = ({ isDarkMode }) => {
  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Subscribe to our newsletter</h2>
        <form className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="First Name" className={`p-3 rounded-md border ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`} />
          <input type="text" placeholder="Last Name" className={`p-3 rounded-md border ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`} />
          <input type="email" placeholder="Email" className={`p-3 rounded-md border md:col-span-2 ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`} />
          <label className="flex items-center gap-2 md:col-span-2">
            <input type="checkbox" className="accent-primary-600" />
            <span className="text-sm">I agree to the Privacy Policy</span>
          </label>
          <button type="submit" className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition md:col-span-2">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
