#!/bin/bash

echo "🔐 Fixing Firefox HTTPS Certificate Warning"
echo "=========================================="
echo ""

# Create certificate if it doesn't exist
if [ ! -f "localhost.pem" ]; then
    echo "Creating SSL certificate..."
    openssl req -x509 -newkey rsa:2048 -keyout localhost-key.pem -out localhost.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Local Development/CN=localhost" -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
fi

echo ""
echo "📋 Certificate created at: localhost.pem"
echo ""
echo "🔥 FIREFOX INSTRUCTIONS:"
echo "========================="
echo "1. Open Firefox and go to: about:preferences#privacy"
echo "2. Scroll down to 'Certificates' section"
echo "3. Click 'View Certificates'"
echo "4. Go to 'Authorities' tab"
echo "5. Click 'Import'"
echo "6. Select 'localhost.pem' from this folder"
echo "7. Check 'Trust this CA to identify websites'"
echo "8. Click 'OK'"
echo ""
echo "🔄 Restart Firefox and visit: https://localhost:3000"
echo ""
echo "💡 Alternative: For quick testing, just click 'Advanced' → 'Accept the Risk and Continue'"
