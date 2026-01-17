#!/bin/bash

echo "Setting up HTTPS for development..."
echo "This will add the localhost certificate to your system's trust store"
echo ""

# Create certificate if it doesn't exist
if [ ! -f "localhost.pem" ]; then
    echo "Creating SSL certificate..."
    openssl req -x509 -newkey rsa:2048 -keyout localhost-key.pem -out localhost.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Local Development/CN=localhost" -addext "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:172.20.10.2"
fi

echo ""
echo "Certificate created successfully!"
echo ""
echo "To bypass Firefox security warning:"
echo "1. Go to https://localhost:3000"
echo "2. Click 'Advanced' on the security warning page"
echo "3. Click 'Accept the Risk and Continue'"
echo "4. The site will load and certificate will be trusted"
echo ""
echo "Alternative: Import certificate manually"
echo "1. Open Firefox Settings > Privacy & Security > Certificates"
echo "2. Import localhost.pem and trust for 'Websites'"
echo ""
echo "Starting development server..."
npm start
