var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.route('/').post(function(req, res, next) {

	    console.log('req.body.data :',req.body.data);

        req.body = require("querystring").parse(req.body.data);

        console.log(' req.body :',req.body);

        var message = "données enregistrées";
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
		try {
            global.connection.query(sql, function (err, result) {
                console.log("result : ", result.affectedRows);
                res.send({message: message}, 200);
                res.end();
            });
        } catch (e){
            res.send({message: e.message}, 200);
            res.end();
        }
	
	/*console.log('jour : '+jour_semaine);
	console.log('date : '+date);
	console.log('heure : '+heure);
	console.log('vne : '+ vne);
	console.log('vacances : ' + vacances);
	console.log('consult_place : '+ consult_place);*/

	/*res.redirect('/frequentation', { title: 'Formulaire enregistré avec succès' });*/
});

module.exports = router;