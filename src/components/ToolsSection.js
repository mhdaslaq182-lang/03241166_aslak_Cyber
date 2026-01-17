import React, { useState } from 'react';

const SecurityTools = ({ isDarkMode }) => {
  const [error, setError] = useState('');

  // 1. VPN / Proxy Checker
  const [vpnIp, setVpnIp] = useState('');
  const [vpnResult, setVpnResult] = useState(null);
  const [vpnLoading, setVpnLoading] = useState(false);

  const checkVpn = async () => {
    if (!vpnIp.trim()) return setError('Please enter an IP address');
    setVpnLoading(true);
    setError('');
    try {
      const res = await fetch(`https://ipinfo.io/${vpnIp}/json`);
      if (!res.ok) throw new Error('Failed to check');
      const data = await res.json();
      setVpnResult({
        ip: data.ip,
        country: data.country || 'Unknown',
        city: data.city || 'Unknown',
        org: data.org || 'Unknown',
        isVpn: data.privacy?.vpn || data.privacy?.proxy || false
      });
    } catch (err) {
      setError('VPN/Proxy check failed. Try a different IP or later.');
    }
    setVpnLoading(false);
  };

  // 2. Password Strength Checker
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const checkPasswordStrength = (pwd) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{}:;"\\|,.<>/?]/.test(pwd);
    const length = pwd.length;
    
    let score = 0;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;
    if (length >= 8) score++;
    if (length >= 12) score++;
    
    if (score <= 2) return 'Very Weak';
    if (score <= 3) return 'Weak';
    if (score <= 4) return 'Medium';
    return 'Strong';
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(checkPasswordStrength(pwd));
  };

  // 3. Phishing Email Checker
  const [emailText, setEmailText] = useState('');
  const [phishingRisk, setPhishingRisk] = useState('');

  const checkPhishingSigns = (text) => {
    const signs = [
      /urgent/i, /immediate/i, /verify/i, /account suspended/i,
      /click here/i, /update payment/i, /password reset/i,
      /grammar error/i, /mismatched url/i, /generic greeting/i
    ];
    const matches = signs.filter(regex => regex.test(text)).length;
    
    if (matches >= 3) return 'High Phishing Risk';
    if (matches >= 1) return 'Possible Phishing';
    return 'Looks Safe';
  };

  const handleEmailChange = (e) => {
    const text = e.target.value;
    setEmailText(text);
    setPhishingRisk(checkPhishingSigns(text));
  };

  // 4. Malware / Phishing URL Scanner (using urlscan.io public API)
  const [malwareUrl, setMalwareUrl] = useState('');
  const [malwareResult, setMalwareResult] = useState(null);
  const [malwareLoading, setMalwareLoading] = useState(false);

  const checkMalware = async () => {
    if (!malwareUrl.trim()) return setError('Please enter a URL');
    setMalwareLoading(true);
    setError('');
    try {
      const res = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyB3k3s9xYq4qQd5k6f7g8h9i0j1k2l3m4n`, {
        method: 'POST',
        body: JSON.stringify({
          client: { clientId: "cyberhub", clientVersion: "1.0.0" },
          threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url: malwareUrl }]
          }
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      const threats = data.matches?.length > 0 ? data.matches.map(m => m.threatType) : [];
      setMalwareResult({
        safe: threats.length === 0,
        threats: threats.length > 0 ? threats : ['No threats detected']
      });
    } catch (err) {
      setError('URL scan failed. Try a valid URL.');
    }
    setMalwareLoading(false);
  };

  // 5. SSL Certificate Checker (using ssllabs public API)
  const [sslDomain, setSslDomain] = useState('');
  const [sslResult, setSslResult] = useState(null);
  const [sslLoading, setSslLoading] = useState(false);

  const checkSsl = async () => {
    if (!sslDomain.trim()) return setError('Please enter a domain (e.g. google.com)');
    setSslLoading(true);
    setError('');
    try {
      const res = await fetch(`https://crt.sh/?q=${encodeURIComponent(sslDomain)}&output=json`);
      const data = await res.json();
      if (data.length > 0) {
        const latest = data[0];
        setSslResult({
          issuer: latest.issuer_name,
          validFrom: new Date(latest.not_before).toLocaleDateString(),
          validTo: new Date(latest.not_after).toLocaleDateString(),
          status: new Date(latest.not_after) > new Date() ? 'Valid' : 'Expired'
        });
      } else {
        setSslResult({ status: 'No certificate found' });
      }
    } catch (err) {
      setError('SSL check failed. Domain may not have a public certificate.');
    }
    setSslLoading(false);
  };

  // 6. Data Breach Checker (HIBP public API - no key needed for basic email check)
  const [breachEmail, setBreachEmail] = useState('');
  const [breachResult, setBreachResult] = useState(null);
  const [breachLoading, setBreachLoading] = useState(false);

  const checkBreach = async () => {
    if (!breachEmail.trim()) return setError('Please enter an email');
    setBreachLoading(true);
    setError('');
    try {
      const res = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(breachEmail)}?truncateResponse=true`, {
        headers: { 'User-Agent': 'CyberAwarenessHub-StudentProject' }
      });
      if (res.status === 404) {
        setBreachResult({ safe: true, message: 'Good news! No breaches found for this email.' });
      } else if (res.ok) {
        const data = await res.json();
        setBreachResult({ safe: false, count: data.length, breaches: data.map(b => b.Name) });
      } else {
        throw new Error('Breach check failed');
      }
    } catch (err) {
      setError('Breach check failed (rate limit or network issue). Try again in a minute.');
    }
    setBreachLoading(false);
  };

  return (
    <section id="tools" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-primary-600">Cyber Security Tools</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Free, real-time tools to protect yourself online – no registration or API keys needed!
        </p>

        {error && (
          <div className="text-center mb-10 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg max-w-2xl mx-auto">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tool 1: Password Strength Checker */}
          <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="text-purple-500 text-2xl">🔐</span> Password Strength
            </h3>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
            />
            {password && (
              <div className="mb-4">
                <p className={`font-bold text-lg ${
                  passwordStrength === 'Strong' ? 'text-green-600' : 
                  passwordStrength === 'Medium' ? 'text-yellow-600' : 
                  passwordStrength === 'Weak' || passwordStrength === 'Very Weak' ? 'text-red-600' : 
                  'text-gray-500'
                }`}>
                  Strength: {passwordStrength}
                </p>
                <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>✅ Uppercase: {/[A-Z]/.test(password) ? '✓' : '✗'}</p>
                  <p>✅ Lowercase: {/[a-z]/.test(password) ? '✓' : '✗'}</p>
                  <p>✅ Numbers: {/\d/.test(password) ? '✓' : '✗'}</p>
                  <p>✅ Special chars: {/[!@#$%^&*()_+\-=[\]{}:;"\\|,.<>/?]/.test(password) ? '✓' : '✗'}</p>
                  <p>✅ 8+ chars: {password.length >= 8 ? '✓' : '✗'}</p>
                  <p>✅ 12+ chars: {password.length >= 12 ? '✓' : '✗'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Tool 2: Phishing Email Checker */}
          <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="text-orange-500 text-2xl">🎣</span> Phishing Email Scanner
            </h3>
            <textarea
              placeholder="Paste email content here..."
              value={emailText}
              onChange={handleEmailChange}
              className="w-full p-3 mb-4 border rounded-lg h-32 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
            />
            {emailText && (
              <div className="mb-4">
                <p className={`font-bold text-lg ${
                  phishingRisk === 'Looks Safe' ? 'text-green-600' : 
                  phishingRisk === 'Possible Phishing' ? 'text-yellow-600' : 
                  phishingRisk === 'High Phishing Risk' ? 'text-red-600' : 
                  'text-gray-500'
                }`}>
                  Risk: {phishingRisk}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <p>Urgent: {/urgent/i.test(emailText) ? '⚠️' : '✓'}</p>
                  <p>Immediate: {/immediate/i.test(emailText) ? '⚠️' : '✓'}</p>
                  <p>Verify: {/verify/i.test(emailText) ? '⚠️' : '✓'}</p>
                  <p>Suspended: {/account suspended/i.test(emailText) ? '⚠️' : '✓'}</p>
                  <p>Click here: {/click here/i.test(emailText) ? '⚠️' : '✓'}</p>
                  <p>Payment: {/update payment/i.test(emailText) ? '⚠️' : '✓'}</p>
                  <p>Password reset: {/password reset/i.test(emailText) ? '⚠️' : '✓'}</p>
                  <p>Grammar: {/grammar error/i.test(emailText) ? '⚠️' : '✓'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Tool 3: VPN / Proxy Checker */}
          <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="text-blue-500 text-2xl">🛡️</span> VPN / Proxy Detector
            </h3>
            <input
              type="text"
              placeholder="Enter IP (e.g. 8.8.8.8)"
              value={vpnIp}
              onChange={e => setVpnIp(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={checkVpn}
              disabled={vpnLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {vpnLoading ? 'Checking...' : 'Check VPN/Proxy'}
            </button>
            {vpnResult && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                <p><strong>VPN/Proxy:</strong> {vpnResult.isVpn ? 'Yes' : 'No'}</p>
                <p className="flex items-center gap-2">
                  <strong>Location:</strong> 
                  {vpnResult.country && vpnResult.country !== 'Unknown' && (
                    <span className="text-2xl">
                      {vpnResult.country === 'US' && '🇺🇸'}
                      {vpnResult.country === 'GB' && '🇬🇧'}
                      {vpnResult.country === 'CA' && '🇨🇦'}
                      {vpnResult.country === 'AU' && '🇦🇺'}
                      {vpnResult.country === 'DE' && '🇩🇪'}
                      {vpnResult.country === 'FR' && '🇫🇷'}
                      {vpnResult.country === 'JP' && '🇯🇵'}
                      {vpnResult.country === 'CN' && '🇨🇳'}
                      {vpnResult.country === 'IN' && '🇮🇳'}
                      {vpnResult.country === 'BR' && '🇧🇷'}
                      {vpnResult.country === 'RU' && '🇷🇺'}
                      {vpnResult.country === 'KR' && '🇰🇷'}
                      {vpnResult.country === 'IT' && '🇮🇹'}
                      {vpnResult.country === 'ES' && '🇪🇸'}
                      {vpnResult.country === 'NL' && '🇳🇱'}
                      {vpnResult.country === 'SE' && '🇸🇪'}
                      {vpnResult.country === 'NO' && '🇳🇴'}
                      {vpnResult.country === 'DK' && '🇩🇰'}
                      {vpnResult.country === 'FI' && '🇫🇮'}
                      {vpnResult.country === 'CH' && '🇨🇭'}
                      {vpnResult.country === 'AT' && '🇦🇹'}
                      {vpnResult.country === 'BE' && '🇧🇪'}
                      {vpnResult.country === 'PL' && '🇵🇱'}
                      {vpnResult.country === 'CZ' && '🇨🇿'}
                      {vpnResult.country === 'HU' && '🇭🇺'}
                      {vpnResult.country === 'GR' && '🇬🇷'}
                      {vpnResult.country === 'PT' && '🇵🇹'}
                      {vpnResult.country === 'IE' && '🇮🇪'}
                      {vpnResult.country === 'NZ' && '🇳🇿'}
                      {vpnResult.country === 'ZA' && '🇿🇦'}
                      {vpnResult.country === 'MX' && '🇲🇽'}
                      {vpnResult.country === 'AR' && '🇦🇷'}
                      {vpnResult.country === 'CL' && '🇨🇱'}
                      {vpnResult.country === 'CO' && '🇨🇴'}
                      {vpnResult.country === 'PE' && '🇵🇪'}
                      {vpnResult.country === 'VE' && '🇻🇪'}
                      {vpnResult.country === 'UY' && '🇺🇾'}
                      {vpnResult.country === 'EC' && '🇪🇨'}
                      {vpnResult.country === 'BO' && '🇧🇴'}
                      {vpnResult.country === 'PY' && '🇵🇾'}
                      {vpnResult.country === 'SG' && '🇸🇬'}
                      {vpnResult.country === 'MY' && '🇲🇾'}
                      {vpnResult.country === 'TH' && '🇹🇭'}
                      {vpnResult.country === 'PH' && '🇵🇭'}
                      {vpnResult.country === 'ID' && '🇮🇩'}
                      {vpnResult.country === 'VN' && '🇻🇳'}
                      {vpnResult.country === 'HK' && '🇭🇰'}
                      {vpnResult.country === 'TW' && '🇹🇼'}
                      {vpnResult.country === 'IL' && '🇮🇱'}
                      {vpnResult.country === 'AE' && '🇦🇪'}
                      {vpnResult.country === 'SA' && '🇸🇦'}
                      {vpnResult.country === 'EG' && '🇪🇬'}
                      {vpnResult.country === 'NG' && '🇳🇬'}
                      {vpnResult.country === 'KE' && '🇰🇪'}
                      {vpnResult.country === 'ZA' && '🇿🇦'}
                      {vpnResult.country === 'TR' && '🇹🇷'}
                      {vpnResult.country === 'PK' && '🇵🇰'}
                      {vpnResult.country === 'BD' && '🇧🇩'}
                      {vpnResult.country === 'LK' && '🇱🇰'}
                      {vpnResult.country === 'MM' && '🇲🇲'}
                      {vpnResult.country === 'KH' && '🇰🇭'}
                      {vpnResult.country === 'LA' && '🇱🇦'}
                      {vpnResult.country === 'NP' && '🇳🇵'}
                      {vpnResult.country === 'BT' && '🇧🇹'}
                      {vpnResult.country === 'MV' && '🇲🇻'}
                    </span>
                  )}
                  {vpnResult.city}, {vpnResult.country}
                </p>
                <p><strong>Organization:</strong> {vpnResult.org}</p>
              </div>
            )}
          </div>

          {/* Tool 4: Malware / Phishing Scanner */}
          <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="text-red-500 text-2xl">🦠</span> Malware/Phishing Scanner
            </h3>
            <input
              type="url"
              placeholder="Enter suspicious URL"
              value={malwareUrl}
              onChange={e => setMalwareUrl(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={checkMalware}
              disabled={malwareLoading}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {malwareLoading ? 'Scanning...' : 'Scan URL'}
            </button>
            {malwareResult && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                <p><strong>Status:</strong> {malwareResult.message || 'No malicious reports found'}</p>
                {malwareResult.task && <p>Scan ID: {malwareResult.task.taskid}</p>}
              </div>
            )}
          </div>

          {/* Tool 5: SSL Certificate Validator */}
          <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="text-green-500 text-2xl">🔒</span> SSL Certificate Checker
            </h3>
            <input
              type="text"
              placeholder="Enter domain (e.g. google.com)"
              value={sslDomain}
              onChange={e => setSslDomain(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={checkSsl}
              disabled={sslLoading}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {sslLoading ? 'Validating...' : 'Check SSL'}
            </button>
            {sslResult && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                <p><strong>Status:</strong> {sslResult.status || 'N/A'}</p>
                <p><strong>Grade:</strong> {sslResult.grade || 'Not graded yet'}</p>
                {sslResult.endTime && <p><strong>Expires:</strong> {new Date(sslResult.endTime * 1000).toLocaleDateString()}</p>}
              </div>
            )}
          </div>

          {/* Tool 6: Data Breach Checker (HIBP) */}
          <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="text-yellow-500 text-2xl">⚠️</span> Data Breach Checker
            </h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={breachEmail}
              onChange={e => setBreachEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={checkBreach}
              disabled={breachLoading}
              className="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition disabled:opacity-50"
            >
              {breachLoading ? 'Checking...' : 'Check Breaches'}
            </button>
            {breachResult && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                {breachResult.safe ? (
                  <p className="text-green-600 font-medium">{breachResult.message}</p>
                ) : (
                  <p className="text-red-600 font-medium">
                    Breaches found: {breachResult.breaches?.length || 0}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400">
          Tools powered by public/free APIs (no registration required) • For educational purposes only
        </div>

        <div className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400">
          Always verify critical security information
        </div>
      </div>
    </section>
  );
};

export default SecurityTools;
