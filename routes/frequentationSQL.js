/**
 * Created by jf on 13/06/17.
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    global.connection.query('SELECT * FROM frequentation' , function (error, results, fields) {
        if (error) throw error;
        //console.log('result : ', results);
        //console.log('fields: ', fields);
        var colonnes = [];
        for (var i=0; i<fields.length; i++ ){
            colonnes.push(fields[i].name);

        }
        var json2csv = require('json2csv');
        try {
            var resultcsv = json2csv({ data: results, fields: colonnes });
            console.log(resultcsv);
            fs.writeFileSync("public/csv/frequentation.csv", resultcsv, "UTF-8");

        } catch (err) {
            // Errors are thrown for bad options, or if the data is empty and no fields are provided.
            // Be sure to provide fields if it is possible that your data array will be empty.
            console.error(err);
        }
        res.render('stats', { title: 'Frequency view', frequentation: resultcsv });
    });
});

module.exports = router;