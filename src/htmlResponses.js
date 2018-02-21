const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const bundle = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);
const css = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const bootstrapCSS = fs.readFileSync(`${__dirname}/../hosted/bootstrap.css`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getBundle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/js' });
  response.write(bundle);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getBootstrapCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(bootstrapCSS);
  response.end();
};

module.exports = {
  getIndex,
  getBundle,
  getCSS,
  getBootstrapCSS,
};
