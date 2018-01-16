const http = require('http');
const url = require('url');
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, function(){
  console.log('server running on port 5000');
});
