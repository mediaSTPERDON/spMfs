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
			req.body.vacances = 'non' ;
		} else {
			req.body.vacances = 'oui' ;
		}
		if (req.body.consult_place == undefined) {
			req.body.consult_place = 'non' ;
		} else {
			req.body.consult_place = 'oui' ;
		}
		if (req.body.vne == undefined) {
			req.body.vne = 'non' ;
		} else {
			req.body.vne = 'oui' ;
		}
		if (req.body.presence == undefined) {
			req.body.presence = 'non' ;
		} else {
			req.body.presence = 'oui' ;
		}
		if (req.body.mdl_checkbox1 == undefined) {
			req.body.mdl_checkbox1 = 'non';
		} else {
			req.body.mdl_checkbox1 = 'oui';
		}
		if (req.body.mdl_checkbox2 == undefined) {
			req.body.mdl_checkbox2 = 'non';
		} else {
			req.body.mdl_checkbox2 = 'oui';
		}
		if (req.body.mdl_checkbox3 == undefined) {
			req.body.mdl_checkbox3 = 'non';
		} else {
			req.body.mdl_checkbox3 = 'oui';
		}
		if (req.body.mdl_checkbox4 == undefined) {
			req.body.mdl_checkbox4 = 'non';
		} else {
			req.body.mdl_checkbox4 = 'oui';
		}
		if (req.body.mdl_checkbox5 == undefined) {
			req.body.mdl_checkbox5 = 'non';
		} else {
			req.body.mdl_checkbox5 = 'oui';
		}
		if (req.body.mdl_checkbox6 == undefined) {
			req.body.mdl_checkbox6 = 'non';
		} else {
			req.body.mdl_checkbox6 = 'oui';
		}
		
		if (req.body.emprunt_retour == undefined) {
			var sql = "INSERT INTO frequentation (jour_semaine, date, heure, consult_place, vne, vacances, id_lecteurs) VALUES ('"+req.body.jour+"', '"+req.body.date+"', '"+req.body.hours+"', '"+req.body.consult_place+"', '"+req.body.vne+"', '"+req.body.vacances+"', '"+req.body.lecteur+"')";
		} else if (req.body.nombre6 != '') {
			sql = "INSERT INTO frequentation (jour_semaine, date, heure, consult_place, vne, vacances, id_lecteurs, type_action, nbr_doc1, nbr_doc2, nbr_doc3, nbr_doc4, nbr_doc5, nbr_doc6, type_doc1, type_doc2, type_doc3, type_doc4, type_doc5, type_doc6, cat_doc1, cat_doc2, cat_doc3, cat_doc4, cat_doc5, cat_doc6, mdl_doc1, mdl_doc2, mdl_doc3, mdl_doc4, mdl_doc5, mdl_doc6, ppm) VALUES ('"+req.body.jour+"', '"+req.body.date+"', '"+req.body.hours+"', '"+req.body.consult_place+"', '"+req.body.vne+"', '"+req.body.vacances+"', '"+req.body.lecteur+"', '"+req.body.emprunt_retour+"', '"+req.body.nombre1+"', '"+req.body.nombre2+"', '"+req.body.nombre3+"', '"+req.body.nombre4+"', '"+req.body.nombre5+"', '"+req.body.nombre6+"', '"+req.body.type1+"', '"+req.body.type2+"', '"+req.body.type3+"', '"+req.body.type4+"', '"+req.body.type5+"', '"+req.body.type6+"', '"+req.body.categorie1+"', '"+req.body.categorie2+"', '"+req.body.categorie3+"', '"+req.body.categorie4+"', '"+req.body.categorie5+"', '"+req.body.categorie6+"', '"+req.body.mdl_checkbox1+"', '"+req.body.mdl_checkbox2+"', '"+req.body.mdl_checkbox3+"', '"+req.body.mdl_checkbox4+"', '"+req.body.mdl_checkbox5+"', '"+req.body.mdl_checkbox6+"', '"+req.body.presence+"')";
		} else if (req.body.nombre5 != '') {
			sql = "INSERT INTO frequentation (jour_semaine, date, heure, consult_place, vne, vacances, id_lecteurs, type_action, nbr_doc1, nbr_doc2, nbr_doc3, nbr_doc4, nbr_doc5, type_doc1, type_doc2, type_doc3, type_doc4, type_doc5, cat_doc1, cat_doc2, cat_doc3, cat_doc4, cat_doc5, mdl_doc1, mdl_doc2, mdl_doc3, mdl_doc4, mdl_doc5, ppm) VALUES ('"+req.body.jour+"', '"+req.body.date+"', '"+req.body.hours+"', '"+req.body.consult_place+"', '"+req.body.vne+"', '"+req.body.vacances+"', '"+req.body.lecteur+"', '"+req.body.emprunt_retour+"', '"+req.body.nombre1+"', '"+req.body.nombre2+"', '"+req.body.nombre3+"', '"+req.body.nombre4+"', '"+req.body.nombre5+"', '"+req.body.type1+"', '"+req.body.type2+"', '"+req.body.type3+"', '"+req.body.type4+"', '"+req.body.type5+"', '"+req.body.categorie1+"', '"+req.body.categorie2+"', '"+req.body.categorie3+"', '"+req.body.categorie4+"', '"+req.body.categorie5+"', '"+req.body.mdl_checkbox1+"', '"+req.body.mdl_checkbox2+"', '"+req.body.mdl_checkbox3+"', '"+req.body.mdl_checkbox4+"', '"+req.body.mdl_checkbox5+"', '"+req.body.presence+"')";
		} else if (req.body.nombre4 != '') {
			sql = "INSERT INTO frequentation (jour_semaine, date, heure, consult_place, vne, vacances, id_lecteurs, type_action, nbr_doc1, nbr_doc2, nbr_doc3, nbr_doc4, type_doc1, type_doc2, type_doc3, type_doc4, cat_doc1, cat_doc2, cat_doc3, cat_doc4, mdl_doc1, mdl_doc2, mdl_doc3, mdl_doc4, ppm) VALUES ('"+req.body.jour+"', '"+req.body.date+"', '"+req.body.hours+"', '"+req.body.consult_place+"', '"+req.body.vne+"', '"+req.body.vacances+"', '"+req.body.lecteur+"', '"+req.body.emprunt_retour+"', '"+req.body.nombre1+"', '"+req.body.nombre2+"', '"+req.body.nombre3+"', '"+req.body.nombre4+"', '"+req.body.type1+"', '"+req.body.type2+"', '"+req.body.type3+"', '"+req.body.type4+"', '"+req.body.categorie1+"', '"+req.body.categorie2+"', '"+req.body.categorie3+"', '"+req.body.categorie4+"', '"+req.body.mdl_checkbox1+"', '"+req.body.mdl_checkbox2+"', '"+req.body.mdl_checkbox3+"', '"+req.body.mdl_checkbox4+"', '"+req.body.presence+"')";
		} else if (req.body.nombre3 != '') {
			sql = "INSERT INTO frequentation (jour_semaine, date, heure, consult_place, vne, vacances, id_lecteurs, type_action, nbr_doc1, nbr_doc2, nbr_doc3, type_doc1, type_doc2, type_doc3, cat_doc1, cat_doc2, cat_doc3, mdl_doc1, mdl_doc2, mdl_doc3, ppm) VALUES ('"+req.body.jour+"', '"+req.body.date+"', '"+req.body.hours+"', '"+req.body.consult_place+"', '"+req.body.vne+"', '"+req.body.vacances+"', '"+req.body.lecteur+"', '"+req.body.emprunt_retour+"', '"+req.body.nombre1+"', '"+req.body.nombre2+"', '"+req.body.nombre3+"', '"+req.body.type1+"', '"+req.body.type2+"', '"+req.body.type3+"', '"+req.body.categorie1+"', '"+req.body.categorie2+"', '"+req.body.categorie3+"', '"+req.body.mdl_checkbox1+"', '"+req.body.mdl_checkbox2+"', '"+req.body.mdl_checkbox3+"', '"+req.body.presence+"')";
		} else if (req.body.nombre2 != '') {
			sql = "INSERT INTO frequentation (jour_semaine, date, heure, consult_place, vne, vacances, id_lecteurs, type_action, nbr_doc1, nbr_doc2, type_doc1, type_doc2, cat_doc1, cat_doc2, mdl_doc1, mdl_doc2, ppm) VALUES ('"+req.body.jour+"', '"+req.body.date+"', '"+req.body.hours+"', '"+req.body.consult_place+"', '"+req.body.vne+"', '"+req.body.vacances+"', '"+req.body.lecteur+"', '"+req.body.emprunt_retour+"', '"+req.body.nombre1+"', '"+req.body.nombre2+"', '"+req.body.type1+"', '"+req.body.type2+"', '"+req.body.categorie1+"', '"+req.body.categorie2+"', '"+req.body.mdl_checkbox1+"', '"+req.body.mdl_checkbox2+"', '"+req.body.presence+"')";
		} else {
			sql = "INSERT INTO frequentation (jour_semaine, date, heure, consult_place, vne, vacances, id_lecteurs, type_action, nbr_doc1, type_doc1, cat_doc1, mdl_doc1, ppm) VALUES ('"+req.body.jour+"', '"+req.body.date+"', '"+req.body.hours+"', '"+req.body.consult_place+"', '"+req.body.vne+"', '"+req.body.vacances+"', '"+req.body.lecteur+"', '"+req.body.emprunt_retour+"', '"+req.body.nombre1+"', '"+req.body.type1+"', '"+req.body.categorie1+"', '"+req.body.mdl_checkbox1+"', '"+req.body.presence+"')";
		}
		
		console.log(req.body.nombre6);
		//var values = [jour_semaine, date, heure, consult_place, vne, vacances];
		connection.query(sql, function(err, result) {
			if(err) throw err;
			console.log("result : ", result.affectedRows);
		});
	});

res.render('frequentation', { title: 'Formulaire enregistré avec succès' });
});



module.exports = router;