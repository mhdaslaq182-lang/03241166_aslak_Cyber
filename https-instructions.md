# HTTPS Setup Instructions

## Problem: Browser blocks HTTPS with self-signed certificate

## Solution 1: Bypass Security Warning (Quick)
1. Go to `https://localhost:8080`
2. You'll see "Your connection is not private" warning
3. Click **"Advanced"** button
4. Click **"Proceed to localhost (unsafe)"**
5. Page will load and work normally

## Solution 2: Trust Certificate (Permanent)
### Chrome/Edge:
1. Go to `https://localhost:8080`
2. Click the "Not Secure" icon in address bar
3. Click "Certificate is not valid"
4. Click "Details" → "Export" → save certificate
5. Go to Chrome Settings → Privacy and security → Manage certificates
6. Import the saved certificate to "Trusted Root Certification Authorities"
7. **Windows users**: Use `certmgr.msc` → Trusted Root Certification Authorities → Import

### Firefox:
1. Go to `https://localhost:8080`
2. Click "Advanced" → "Accept the Risk and Continue"
3. **For permanent trust**: Go to Firefox Settings → Privacy & Security → Certificates
4. Click "View Certificates" → "Authorities" tab → "Import"
5. Select `localhost.pem` from project folder
6. Check "Trust this CA to identify websites"
7. Click "OK" and restart Firefox

## Solution 3: Use HTTP for Development
If you don't need HTTPS for development, edit `.env`:
```
HTTPS=false
# SSL_CRT_FILE=localhost.pem
# SSL_KEY_FILE=localhost-key.pem
```

## Why HTTPS?
- Better security testing
- Cookies work properly
- Matches production environment
- CSP compliance

## Recommendation:
Use Solution 1 for quick testing, or Solution 2 for permanent trust.
