var express = require('express'),
	mysql   = require('mysql'),
	bodyParser = require('body-parser'),
	app     = express();



var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'neurona'
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(bodyParser.json())


connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn"+err);    
}
});

app.get("/weight/new",function(req,res,next){
	var weights = [];
	var query = connection.query('DELETE FROM peso', function(err, result) {
		if (!err){
 			console.log(result);
		}
		else{
			console.log('Error while performing Query.');
		}
	});
	for(x=1 ; x <= 9 ; x++){
	var weight = {
			id_neurona : x,
			p1 : Math.random(),
			p2 : Math.random(),
			p3 : Math.random(),
			p4 : Math.random(),
			p5 : Math.random(),
			p6 : Math.random(), 
			p7 : Math.random(),
			p8 : Math.random(),
			p9 : Math.random(),
			p1 : Math.random(),	
			umbral : Math.random()			
		}

    
		var query = connection.query('INSERT INTO peso SET ?', weight, function(err, result) {
	  		if (!err){
	  		}
	  		else{
	    		console.log('Error while performing Query.');
	  		}
	  	});
	};
	res.end(query.sql); 
});

app.post("/weight/change",function(req,res,next){
	var weights = [];
	var query = connection.query('DELETE FROM peso', function(err, result) {
	});

	for(x=0 ; x <= 8 ; x++){
    
		var query = connection.query('INSERT INTO peso SET ?', req.body[x], function(err, result) {
	  		if (!err){
	  		}
	  		else{
	    		console.log('Error while performing Query.');
	  		}
	  	});
	};
	res.end(query.sql); 
});

app.get('/weight',function(req,res,next){
	connection.query('SELECT * from peso', function(err, rows, fields) {
  	if (!err)
     	res.json(rows);
  	else
    	console.log('Error while performing Query.');
  	});
})

function insertEntrada(fila){
	var query = connection.query('INSERT INTO entradas SET ?', fila, function(err, result) {
	  		if (!err){
	     		
	  		}
	  		else{
	    		console.log('Error while performing Query.');
	  		}
	});
	return query.sql;
}
app.post('/letter/new',function(req,res,next){
	req.body.map((v) =>{ 
		v.id_entrada = null
		v.id_letra = 1
		v.objeto = 2
		insertEntrada(v)
	})
})



app.get('/letters',function(req,res,next){
	var  letters = [];	
	var  letter = [];	
  	var query = connection.query('SELECT * from entradas where objeto = 1',function(err, rows, fields) {
	  		if (!err){
	  			
	  			for(x=1;x<6;x++){
	  				rows.forEach(function(val,key) {
    					if(val.id_letra === x) {
    					letter.push(val);
    					}
					});
					letters.push({id:x,val:letter})	
					letter = []
	  			}
	  			
	  			
	       		res.json(letters);
	  		}
	  		else{
	    		console.log('Error while performing Query.');
	  		}	
	  		
  		});

})


app.listen(1111,function(err){
	if(err) return console.log("Hay un error"), process.exit(1);
	console.log('listen 1111')
})