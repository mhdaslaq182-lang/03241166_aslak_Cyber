const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle all routes by serving index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Cyber Awareness Hub is running on:`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Network: http://YOUR_IP_ADDRESS:${PORT}`);
  console.log(`   HTTPS: https://YOUR_IP_ADDRESS:${PORT}`);
  console.log(`   (Replace YOUR_IP_ADDRESS with your public IP)`);
});
