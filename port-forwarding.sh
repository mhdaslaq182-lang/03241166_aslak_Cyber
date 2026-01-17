#!/bin/bash

echo "=== Port Forwarding Setup for Phone Access ==="
echo ""

# Get the current IP address
IP=$(hostname -I | awk '{print $1}' 2>/dev/null || ip route get 1.1.1.1 | awk '{print $7}' | head -1 2>/dev/null || echo "127.0.0.1")
echo "🌐 Your Local IP: $IP"
echo ""

# Check if server is running
if netstat -tuln 2>/dev/null | grep -q ":443 "; then
    echo "✅ Server is running on port 443"
else
    echo "❌ Server is not running on port 443"
    echo "Starting server in background..."
    nohup npm start > server.log 2>&1 &
    sleep 8
fi

echo ""
echo "📱 Phone Access Instructions:"
echo "1. Make sure phone and computer are on same WiFi"
echo "2. Open browser on phone"
echo "3. Go to: https://$IP:443"
echo "4. Accept security warning (Advanced → Proceed to site)"
echo ""

# Alternative: Use ngrok for external access
echo "🌍 External Access Option (ngrok):"
echo "If you want to access from anywhere:"
echo "1. Install ngrok: npm install -g ngrok"
echo "2. Run: ngrok http 443"
echo "3. Use the ngrok URL provided"
echo ""

# Simple firewall check
echo "🔥 Firewall Check:"
if command -v ufw > /dev/null 2>&1; then
    echo "UFW Status:"
    sudo ufw status 2>/dev/null || echo "UFW not available"
    echo ""
    echo "To allow port 443:"
    echo "sudo ufw allow 443/tcp"
    echo "sudo ufw reload"
fi

echo ""
echo "🚀 Server Status:"
if pgrep -f "npm start" > /dev/null; then
    echo "✅ React server is running"
else
    echo "❌ React server not found"
fi

echo ""
echo "📱 Access from phone: https://$IP:443"
echo "💡 Press Ctrl+C to stop monitoring"
echo ""

# Monitor server
while true; do
    if netstat -tuln 2>/dev/null | grep -q ":443 "; then
        echo "✅ Server accessible on https://$IP:443"
    else
        echo "❌ Server not responding"
    fi
    sleep 10
done
