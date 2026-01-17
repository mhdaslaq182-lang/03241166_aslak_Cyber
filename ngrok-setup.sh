#!/bin/bash

echo "=== Ngrok Setup for External Phone Access ==="
echo ""

# Check if ngrok is installed
if ! command -v ngrok > /dev/null 2>&1; then
    echo "📦 Installing ngrok..."
    npm install -g ngrok 2>/dev/null || {
        echo "❌ Failed to install ngrok with npm, trying direct download..."
        wget https://bin.equinox.io/ngrok/ngrok-stable-linux-amd64.zip -O ngrok.zip 2>/dev/null
        unzip ngrok.zip 2>/dev/null
        chmod +x ngrok 2>/dev/null
    }
fi

echo "🚀 Starting ngrok tunnel..."
echo ""

# Start server first if not running
if ! netstat -tuln 2>/dev/null | grep -q ":443 "; then
    echo "🔧 Starting React server first..."
    nohup npm start > server.log 2>&1 &
    sleep 10
fi

# Start ngrok for HTTPS port 443
ngrok http 443 --log=stdout > ngrok.log 2>&1 &
NGROK_PID=$!

echo "⏳ Waiting for ngrok to start..."
sleep 8

# Get ngrok URL (multiple methods)
NGROK_URL=""
for i in {1..5}; do
    NGROK_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | grep -o 'https://[^"]*ngrok[^"]*' | head -1 2>/dev/null)
    if [ ! -z "$NGROK_URL" ]; then
        break
    fi
    sleep 2
done

if [ ! -z "$NGROK_URL" ]; then
    echo "✅ Ngrok URL: $NGROK_URL"
    echo ""
    echo "📱 Phone Access Instructions:"
    echo "1. Open browser on phone"
    echo "2. Go to: $NGROK_URL"
    echo "3. Your Cyber Awareness Hub will load!"
    echo ""
    echo "🌍 This URL works from ANYWHERE in the world!"
    echo "📊 Ngrok Dashboard: http://localhost:4040"
else
    echo "❌ Failed to get ngrok URL automatically"
    echo ""
    echo "🔍 Manual check options:"
    echo "1. Ngrok dashboard: http://localhost:4040"
    echo "2. Ngrok log: tail -f ngrok.log"
    echo "3. Server log: tail -f server.log"
fi

echo ""
echo "💡 To stop ngrok: kill $NGROK_PID"
echo "💡 To stop server: pkill -f 'npm start'"
echo ""

# Keep script running and show status
while true; do
    if pgrep -f "ngrok" > /dev/null; then
        echo "✅ Ngrok tunnel active"
    else
        echo "❌ Ngrok tunnel stopped"
        break
    fi
    sleep 15
done
