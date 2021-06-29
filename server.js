var express = require('express'); 
var bodyParser = require('body-parser'); 
var app = express(); 
var db_config = require(__dirname + '/mysql.js');
var conn = db_config.init();

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended : true})); 
app.set('view engine', 'ejs');

app.get('/', function (req, res) { 
   var data = req.body; 
   res.render('index', {name: data});
});

app.post('/', function (req, res) { 
   var data = req.body.name; 
   res.render('index', {name: data}); 
});

app.listen(3000, function(){ 
   console.log('App Listening on port 3000'); 
});

// crud handlers
db_config.connect(conn, {
	useUnifiedTopology: true
} , function(err, database) {
	if(err) {
		console.error("MySql 연결 실패", err);
		return;
	}
	console.log("Connected to Database")
	const db = database.db('star-wars-quotes')
	const quotesCollection = db.collection('quotes')

	// app.use , app.get , app.post, app.listen 사용해서 db작업!
	app.set('view engine', 'ejs');
	app.post('/quotes', (req, res) => {
		quotesCollection.insertOne(req.body)
		.then(result => {
			res.redirect('/')
		})
		.catch(error => console.error(error))
	});

        app.get('/', (req, res) => {
                // res.sendFile(__dirname + '/index.html')
                const cursor = db.collection('quotes').find().toArray()
        .then(results => {
                                res.render('index.ejs', { quotes: results })
        })
        .catch(error => console.error(error))

        })
});