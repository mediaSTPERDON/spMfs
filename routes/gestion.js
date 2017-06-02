var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('gestion', { title: 'Gestion de la base de données' });
	});


module.exports = router;