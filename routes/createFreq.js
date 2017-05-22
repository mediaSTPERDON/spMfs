var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.route('/').post(function(req, res, next) {
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'username',
		password: 'mdp',
		database: 'mediatheque'
	});
	connection.connect(function(err){
		if(err){
			throw err;
			console.log('error connecting database');
			return;
		}
		console.log("Database is connected");

		if (req.body.vacances == undefined) {
			req.body.vacances = 0 ;
		} else {
			req.body.vacances = 1 ;
		}
		if (req.body.consult_place == undefined) {
			req.body.consult_place = 0 ;
		} else {
			req.body.consult_place = 1 ;
		}
		if (req.body.vne == undefined) {
			req.body.vne = 0 ;
		} else {
			req.body.vne = 1 ;
		}
		var sql = "INSERT INTO frequentation (jour_semaine, date, heure, consult_place, vne, vacances) VALUES ('"+req.body.jour+"', '"+req.body.date+"', '"+req.body.hours+"', '"+req.body.consult_place+"', '"+req.body.vne+"', '"+req.body.vacances+"')";
		//var values = [jour_semaine, date, heure, consult_place, vne, vacances];
		connection.query(sql, function(err, result) {
			if(err) throw err;
			console.log("result : ", result.affectedRows);
		});
	});

	
	
	/*console.log('jour : '+jour_semaine);
	console.log('date : '+date);
	console.log('heure : '+heure);
	console.log('vne : '+ vne);
	console.log('vacances : ' + vacances);
	console.log('consult_place : '+ consult_place);*/
	
	res.render('frequentation', { title: 'Formulaire enregistré avec succès' });
});

module.exports = router;