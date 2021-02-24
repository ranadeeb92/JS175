const HTTP = require('http');
const URL = require('url').URL;
const PORT = 3000;

function dieRoll(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getParams(path) {
  const myURL = new URL(path, `http://localhost:${PORT}`);
  return myURL.searchParams;
}

function rollDice(params) {
  let rolls = Number(params.get('rolls'));
  let sides = Number(params.get('sides'));

  let content = '';
  for (let roll = 1; roll <= rolls; roll++) {
    content += `Die number ${roll} is ${dieRoll(1, sides)}\n`;
  }
  return content;
}

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path =  req.url;

  let body = rollDice(getParams(path));
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write(`${body}\n`);
  res.write(`${method} ${path}`);
  res.end();
});

SERVER.listen(PORT, ()=> {
  console.log(`Server listening on the port ${PORT}...`);
});