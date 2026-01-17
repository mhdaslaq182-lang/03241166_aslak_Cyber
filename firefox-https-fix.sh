#!/bin/bash

echo "🔐 Firefox HTTPS Certificate Fix"
echo "================================"

# Step 1: Create certificate
echo "1. Creating SSL certificate..."
openssl req -x509 -newkey rsa:2048 \
    -keyout localhost-key.pem \
    -out localhost.pem \
    -days 365 -nodes \
    -subj "/C=US/ST=State/L=City/O=Local Development/CN=localhost" \
    -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

echo ""
echo "✅ Certificate created: localhost.pem"
echo ""

# Step 2: Instructions
cat << 'EOF'

2. HOW TO FIX FIREFOX:
======================
Method A (Easy - Temporary):
---------------------------
1. Visit https://localhost:8080
2. Click "Advanced"
3. Click "Accept the Risk and Continue"

Method B (Permanent):
--------------------
1. Open Firefox → Settings (☰) → Settings
2. Go to "Privacy & Security" 
3. Scroll to "Certificates" section
4. Click "View Certificates"
5. Go to "Authorities" tab
6. Click "Import"
7. Select the "localhost.pem" file
8. Check "Trust this CA to identify websites"
9. Click "OK"
10. Restart Firefox

Method C (Easiest - Use HTTP):
-----------------------------
Edit your .env file and change:
HTTPS=true → HTTPS=false

Then restart with: npm start
Visit: http://localhost:8080
EOF
