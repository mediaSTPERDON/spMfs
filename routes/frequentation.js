var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * FROM lecteurs ORDER BY Noms' , function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.render('frequentation', { title: 'Frequency view', lecteurs: results });
    });
});

module.exports = router;