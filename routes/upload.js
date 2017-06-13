var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');


router.post('/', function(req, res, next) {
	
	
	var form = new formidable.IncomingForm();
	form.uploadDir =  'public/upload/';

	// Rename the incoming file to the file's name
	form.on('file', function(field, file) {
		fs.rename(file.path, form.uploadDir + "/" + file.name);
	});

	form.parse(req, function() {
		res.render('gestion', {title: 'Téléchargement réussi'});
	});

	return;

	//res.render('gestion', { title: 'Gestion de la base de données' });
});



module.exports = router;