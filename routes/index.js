var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Médiathèque de Saint-Perdon' });
});

module.exports = router;
