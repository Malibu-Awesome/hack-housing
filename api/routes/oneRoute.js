'use strict';

module.exports = function(app) {
  app.get('/api/v0/one-route/:x/:y', function (req, res) {
    res.send({
      x: req.params.x,
      y: req.params.y
    });
  });
};
