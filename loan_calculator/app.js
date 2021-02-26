const HTTP = require('http');
const URL = require('url').URL;
const FS = require('fs');
const PATH = require('path');
const ROUTER = require('router');
const FINALHANDLER = require('finalhandler');
const SERVESTATIC = require('serve-static');
const REQUEST_HANDLERS = require('./handlers');
const PORT = 3000;

let router = ROUTER();
router.use(SERVESTATIC('public'));

router.get('/', function(req, res) {
  REQUEST_HANDLERS.getIndex(res);
});

router.get('/loan-offer', function(req, res) {
  REQUEST_HANDLERS.getLoanOffer(res, req.url);
});

router.post('/loan-offer', function(req, res) {
  REQUEST_HANDLERS.postLoanOffer(req, res);
});

router.get('*', function(req, res) {
  REQUEST_HANDLERS.getNotFound(res);
});

const SERVER = HTTP.createServer((req, res) => {
  router(req, res, FINALHANDLER(req, res));
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}....`);
});