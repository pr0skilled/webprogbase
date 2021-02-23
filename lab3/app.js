const express = require('express');
const path = require('path');
const mustache = require('mustache-express');
const body_parser = require('body-parser')
const busboyBodyParser = require('busboy-body-parser');
const morgan = require('morgan');


var app = express();

const viewsDir = path.join(__dirname, 'views');
app.engine('mst', mustache());
app.set('view engine', 'mst');
app.set('views', viewsDir);

app.engine("mst", mustache(path.join(viewsDir, "partials")));
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));

const mstRouter = require('./routes/apiRouter');

app.use(morgan('dev'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(busboyBodyParser());

const expressSwaggerGenerator = require('express-swagger-generator');
const expressSwagger = expressSwaggerGenerator(app);
 
const options = {
    swaggerDefinition: {
        info: {
            description: 'Planets',
            title: 'LAB3',
            version: '1.0.0',
        },
        host: 'localhost:' + String(port),
        produces: [ "application/json" ],
    },
    basedir: __dirname,
    files: ['./routes/**/*.js', './models/**/*.js'],
};
expressSwagger(options);

app.get('/', function(req, res) {
  res.render('index', {disabled: "disabled"});
});

app.get('/about', function(req, res) {
  res.render('about', {aboutDisabled: "disabled"});
});

app.use('', mstRouter);
app.use((req, res) => {
    res.status(400).send({ message: "Error in route."});
});

app.listen(port, function() {
  console.log('Server is ready');
});