#!/bin/bash

echo "🛡️ Fixing Firefox Security Warning for 10.195.179.160"
echo "===================================================="

# Get current IP
IP="10.195.179.160"
PORT="8080"

echo "Detected IP: $IP"
echo ""

# Option 1: Use HTTP instead
echo "🎯 RECOMMENDED: Use HTTP (No certificate warnings)"
echo "Run: node server-http.js"
echo "Then visit: http://$IP:$PORT"
echo ""

# Create HTTP server file
cat > server-http.js << 'EOF'
const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Cyber Awareness Hub (HTTP)');
  console.log('============================');
  console.log(`Local:    http://localhost:${PORT}`);
  console.log(`Network:  http://10.195.179.160:${PORT}`);
  console.log('Share this HTTP URL with others');
});
EOF

echo "📋 Firefox Manual Fix:"
echo "1. Type in Firefox address bar: about:config"
echo "2. Search: security.enterprise_roots.enabled"
echo "3. Set to: true"
echo "4. Restart Firefox"
echo "5. Visit: https://$IP:$PORT"
echo "6. Click 'Advanced' → 'Accept the Risk and Continue'"
echo ""
echo "📱 Chrome/Edge Fix:"
echo "Just type 'thisisunsafe' on the warning page"
