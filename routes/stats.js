var express = require('express');
var router = express.Router();
var Chart = require('chart.js');

/* GET home page. */
router.get('/', function(req, res, next) {

	
	res.render('stats', { title: 'Stats view', test: result });
	
	
	console.log(req.body.myChart);
});


module.exports = router;