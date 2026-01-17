#!/bin/bash

echo "🌍 Deploying Cyber Awareness Hub for Public Access"
echo "================================================"

# 1. Build the app
echo "1. Building React app..."
npm run build

# 2. Create production server
cat > server.js << 'EOF'
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static(path.join(__dirname, 'build')));

// All routes to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const networkInterfaces = os.networkInterfaces();
  let localIp = 'localhost';
  
  // Get local IP
  for (const name of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        localIp = net.address;
        break;
      }
    }
  }
  
  console.log('\n✅ Cyber Awareness Hub is LIVE!');
  console.log('================================');
  console.log('📱 Local: http://localhost:' + PORT);
  console.log('🏠 Network: http://' + localIp + ':' + PORT);
  console.log('\n🌍 To make it PUBLIC:');
  console.log('   1. Get your public IP: curl ifconfig.me');
  console.log('   2. Configure router port forwarding: Port 8080 TCP');
  console.log('   3. Share: http://YOUR_PUBLIC_IP:8080');
  console.log('\n🎯 Quick public URL (temporary):');
  console.log('   Install ngrok: npm install -g ngrok');
  console.log('   Run: ngrok http 8080');
});
EOF

# 3. Install express
echo "2. Installing dependencies..."
npm install express

# 4. Start server
echo "3. Starting public server..."
echo ""
node server.js
