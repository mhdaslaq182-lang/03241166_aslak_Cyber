# Router/Firewall Setup Instructions

## ✅ Current Status
- **Public IP**: 203.189.185.196
- **Local server**: Running on port 8080
- **Base URL configured**: https://203.189.185.196:8080/
- **Build updated**: ✅ With public IP base href

## 🔧 Router Configuration Steps

### Step 1: Access Router Admin
1. **Open browser**: http://192.168.1.1
2. **Login**: Router username/password
3. **Find**: "Port Forwarding" or "NAT" section

### Step 2: Add Port Forwarding Rule
```
External Port: 8080
Internal Port: 8080
Internal IP: [YOUR_COMPUTER_IP] (e.g., 192.168.1.100)
Protocol: TCP
Status: Enabled
```

### Step 3: Find Your Internal IP
```bash
# Linux/Mac
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig | findstr "IPv4"
```

### Step 4: Save & Restart Router
- **Save settings**
- **Restart router**
- **Wait 2-3 minutes**

## 🌐 Access URLs After Configuration

### Public Access
```
http://203.189.185.196:8080
https://203.189.185.196:8080 (if SSL configured)
```

### Local Access
```
http://localhost:8080
http://192.168.1.[YOUR_IP]:8080
```

## ⚠️ Important Notes

### Security Considerations
- **Firewall**: Allow port 8080 inbound
- **Antivirus**: May block - add exception
- **ISP**: Some block port 8080 - try 80, 8081, 3000

### Alternative Ports
If 8080 doesn't work, try:
- **Port 80**: Standard HTTP
- **Port 8081**: Alternative HTTP
- **Port 3000**: Development port

### Troubleshooting
1. **Check port**: `netstat -tlnp | grep 8080`
2. **Test locally**: `curl http://localhost:8080`
3. **Check firewall**: `sudo ufw status`
4. **Verify router**: Port forwarding active

## 📋 Testing Checklist
- [ ] Router port forwarding configured
- [ ] Firewall allows port 8080
- [ ] Server running on port 8080
- [ ] Public IP correct (203.189.185.196)
- [ ] Test from external network/phone

## 🚀 Ready to Go
Once configured, your Cyber Awareness Hub will be accessible at:
**https://203.189.185.196:8080**
