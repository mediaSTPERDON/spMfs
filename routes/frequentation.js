var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('frequentation', { title: 'Frequency view' });
});

module.exports = router;