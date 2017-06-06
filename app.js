var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var hbs = require('hbs');
var mysql = require('mysql');

hbs.registerPartials(__dirname + '/views/partials', function () {
    console.log('partials registered');
});


global.connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'mdp',
    database: 'mediatheque'
});

connection.connect(function (err) {
    if (err) {
        throw err;
        console.log('error connecting mysql database');
        return;
    }
    console.log("Mysql database is connected");
});

//----------------------------------------------------------------------------------------------------------------------
// Configuration de la connexion à la base de données mysql : avec sequelize
var Sequelize = require ("sequelize");
global.sequelize = new Sequelize('mediatheque', 'username', 'mdp', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
sequelize  // la syntaxe est celle d’une Promise
    .authenticate()
    .then(function(err) {
        console.log('Connection msql sequelize has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });
//----------------------------------------------------------------------------------------------------------------------

var app = express();

//----------------------------------------------------------------------------------------------------------------------
// Configuration de la connexion à la base de données mongodb: avec mongoose
global.schemas = {};
var mongoose = require('mongoose');
    console.log("Mongoose version : " + mongoose.version);
var db = mongoose.connect("mongodb://127.0.0.1/spMfs");
    //console.log(db)

mongoose.connection.on("error", function () {
    console.log("Erreur de connexion a la base mongoDB");
});
mongoose.connection.on("open", function () {
    console.log("Connexion réussie a la base mongoDB");
});
// chargement des schémas depuis le fichier de configuration JSON dans une variable
var database_schemas = JSON.parse(fs.readFileSync("database_schemas.json", 'utf8'));
// Initialisation de chaque schéma par association entre le schéma et la collection
for (modelName in database_schemas) {
    global.schemas[modelName] = mongoose.model(modelName,
        database_schemas[modelName].schema,
        database_schemas[modelName].collection);
}
/* chargement configuration JSON des actions --> controleurs */
global.actions_json = JSON.parse(fs.readFileSync("./routes/config_actions.json", 'utf8'));
    //console.log('data_schemas : ', database_schemas);
    //console.log('actions_json : ', actions_json);

/* On obtient un tableau de Models à partir des schémas accessible via
 * la variable global.schemas qui permettent d'exécuter des requêtes.*/


//----------------------------------------------------------------------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Chargement configuration json des actions ==> controleurs
global.actions_json = JSON.parse(fs.readFileSync("./routes/config_actions.json", "utf-8"));

// Gestion des routes dynamiques via configuration json
require('./dynamicRouteur')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
