const path = require('path');
const fileName = path.basename(__filename, '.js'); // gives the filename without the .js extension

module.exports = function mountRestApi(server) {
  var restApiRoot = server.get('restApiRoot');
  server.use(restApiRoot, server.loopback.rest());
};
