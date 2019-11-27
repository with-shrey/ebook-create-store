const path = require('path');
const fileName = path.basename(__filename, '.js'); // gives the filename without the .js extension

module.exports = function mountRestApi(server) {
  var restApiRoot = server.get('restApiRoot');
  const dir = path.join(__dirname, '..', '..', 'uploads');
  server.use('/api/uploads', server.loopback.static(dir));
  server.use(restApiRoot, server.loopback.rest());
};
