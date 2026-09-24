const http = require('http');

const data = JSON.stringify({
  name: "Test",
  email: "test@test.com",
  message: "This is a test message to see what is failing"
});

const options = {
  hostname: '127.0.0.1',
  port: 8000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Status:', res.statusCode, 'Headers:', JSON.stringify(res.headers), 'Body:', body));
});

req.on('error', error => {
  console.error('Error:', error);
});

req.write(data);
req.end();
