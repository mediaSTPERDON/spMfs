var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    global.connection.query('SELECT * FROM lecteurs ORDER BY Noms' , function (error, results, fields) {
        if (error) throw error;
        res.render('frequentation', { title: 'Frequency view', lecteurs: results });
    });
});

module.exports = router;