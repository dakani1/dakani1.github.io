const miHttpError = require('./mi/mi-http-error.js');
function middle(app) {
  app.use(miHttpError())
}

module.exports = middle