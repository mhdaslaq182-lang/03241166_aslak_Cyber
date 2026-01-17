const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Cyber Awareness Hub (HTTP)');
  console.log('============================');
  console.log(`Local:    http://localhost:${PORT}`);
  console.log(`Network:  http://10.195.179.160:${PORT}`);
  console.log('Share this HTTP URL with others');
});
