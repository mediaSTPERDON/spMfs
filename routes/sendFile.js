var express = require('express');
var router = express.Router();
var fs = require('fs');
var csvParser = require('csv-parse');

router.post('/', function(req, res, next) {
	fs.readFile('public/upload/test_fonds.csv', {encoding: 'utf-8'}, function(err, csvData){
		if(err){
			console.log(err);
		}
		csvParser(csvData, {delimiter: ','}, function(err, data){
			if(err){
				console.log(err);
			} else {

				// On déclare les tableaux pour la table documents
				var barcode = [];
				var provenance = []; // homebranch
				var cote = []; // itemcallnumber
				var comment = []; // itemnotes


				for(var i = 0 ; i < data.length ; i++) {
					for(var j = 0 ; j < data[0].length ; j++){

						
							
							// On Rempli les tableaux vides pour chaque colonnes de la table 'documents'
							if(data[0][j] == 'barcode' && i>0){
								barcode.push(data[i][j]);
							}
							if(data[0][j] == 'homebranch' && i>0){
								provenance.push(data[i][j]);
							}
							if(data[0][j] == 'itemcallnumber' && i>0){
								cote.push(data[i][j]);
							}
							if(data[0][j] == 'itemnotes' && i>0){
								comment.push(data[i][j]);
							}
						

						
					}
				}
				if (barcode != []) {
					// Nettoyage de la base existante
					global.connection.query("DELETE FROM documents", function(err, result){
						if(err) throw err;
						console.log("Table 'documents' cleared");
					});

					for(var i = 0 ; i < barcode.length ; i++) {
						var sql = 'INSERT INTO documents (id, cote, note, provenance) VALUES ("'+barcode[i]+'", "'+cote[i]+'", "'+comment[i]+'", "'+provenance[i]+'")';
						global.connection.query(sql, function(err, result){
							if(err) throw err;
						});
					}
				}
			}
		});
	});
	fs.readFile('public/upload/test_adherent.csv', {encoding: 'utf-8'}, function(err, csvData){
		if(err){
			console.log(err);
		}
		csvParser(csvData, {delimiter: ','}, function(err, data){
			if(err){
				console.log(err);
			} else {

				// Et pour la table lecteurs
				var idLecteur = []; // borrowernumber
				var nomLecteur = []; // surname
				var prenomLecteur = []; // firstname
				var adresse = []; // address
				var adresse2 = []; // address2
				var ville = []; // city
				var code_postale = []; // zipĉode
				var date_naiss = []; // dateofbirth
				var lieu_inscription = []; // branchcode
				var statut = []; // categorycode
				var sexe = []; // sex

				for(var i = 0 ; i < data.length ; i++) {
					for(var j = 0 ; j < data[0].length ; j++){
							
							if(data[0][j] == 'borrowernumber' && i>0) {
								idLecteur.push(data[i][j]);
							}
							if(data[0][j] == 'surname' && i>0) {
								nomLecteur.push(data[i][j]);
							}
							if(data[0][j] == 'firstname' && i>0) {
								prenomLecteur.push(data[i][j]);
							}
							if(data[0][j] == 'address' && i>0) {
								adresse.push(data[i][j]);
							}
							if(data[0][j] == 'address2' && i>0) {
								adresse2.push(data[i][j]);
							}
							if(data[0][j] == 'city' && i>0) {
								ville.push(data[i][j]);
							}
							if(data[0][j] == 'zipcode' && i>0) {
								code_postale.push(data[i][j]);
							}
							if(data[0][j] == 'dateofbirth' && i>0) {
								date_naiss.push(data[i][j]);
							}
							if(data[0][j] == 'branchcode' && i>0) {
								lieu_inscription.push(data[i][j]);
							}
							if(data[0][j] == 'categorycode' && i>0) {
								statut.push(data[i][j]);
							}
							if(data[0][j] == 'sex' && i>0) {
								sexe.push(data[i][j]);
							}
						
					}
				}
				if (idLecteur != []) {
					// Nettoyage de la base existante
					global.connection.query("DELETE FROM lecteurs", function(err, result){
						if(err) throw err;
						console.log("Table 'lecteurs' cleared");
					});
					// Création du lecteur 'NON AHERENT'
					global.connection.query("INSERT INTO lecteurs (id, Noms) VALUES ('0', 'NON ADHERENT')", function(err, result){
						if(err) throw err;
						console.log("Lecteur 'NON ADHERENT' created");
					});
					// Création du lecteur 'EVENEMENT'
					global.connection.query("INSERT INTO lecteurs (id, Noms) VALUES ('1', 'EVENEMENT')", function(err, result){
						if(err) throw err;
						console.log("Lecteur 'EVENEMENT created");
					});

					for(var i = 0 ; i < idLecteur.length ; i++) {
						var sql = 'INSERT INTO lecteurs (id, Noms, Prenoms, status, lieu_inscription, date_naiss, adresse1, adresse2, cp, villes, sexe) VALUES ("'+idLecteur[i]+'", "'+nomLecteur[i]+'", "'+prenomLecteur[i]+'", "'+statut[i]+'", "'+lieu_inscription[i]+'", "'+date_naiss[i]+'", "'+adresse[i]+'", "'+adresse2[i]+'", "'+code_postale[i]+'", "'+ville[i]+'", "'+sexe[i]+'")';
						global.connection.query(sql, function(err, result){
							if(err) throw err;
						});
					}
				}
				
			}
		});
	});
	res.render('gestion', {title: "Envoi terminé avec succès"});
});


module.exports = router;