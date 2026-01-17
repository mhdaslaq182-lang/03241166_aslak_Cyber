// Debug script to identify console errors
console.log('=== DEBUG: Starting app ===');
console.log('=== DEBUG: Checking for errors ===');

// Check for common issues
window.addEventListener('error', function(e) {
    console.error('=== ERROR: Window Error ===', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('=== ERROR: Unhandled Promise Rejection ===', e.reason);
});

// Check if all required elements exist
setTimeout(() => {
    console.log('=== DEBUG: Checking DOM elements ===');
    const root = document.getElementById('root');
    console.log('Root element:', root ? 'EXISTS' : 'MISSING');
    
    // Check navigation
    const navButtons = document.querySelectorAll('button[onclick*="handleNavClick"]');
    console.log('Navigation buttons:', navButtons.length);
    
    // Check mobile menu
    const mobileMenu = document.querySelector('.fixed.inset-0');
    console.log('Mobile menu:', mobileMenu ? 'EXISTS' : 'NOT OPEN');
    
    console.log('=== DEBUG: Environment ===');
    console.log('Protocol:', window.location.protocol);
    console.log('Hostname:', window.location.hostname);
    console.log('Port:', window.location.port);
}, 2000);
