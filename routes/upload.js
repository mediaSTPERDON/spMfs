var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
	/*fs.readFile(req.files.image_file.path, function (err, data) {
  		// ...
  		var newPath = __dirname + "/uploads/uploadedFileName";
  		fs.writeFile(newPath, data, function (err) {
  			res.redirect("back");
  		});
  	});*/


	res.render('gestion', { title: 'Gestion de la base de données' });
});


module.exports = router;