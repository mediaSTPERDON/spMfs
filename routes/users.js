var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    global.schemas["Users"].find({}, function(err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
        res.render('users', {title: 'Liste Users', users: result});
    });

});

module.exports = router;
