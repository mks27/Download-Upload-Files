var express = require('express');
const fileUpload=require('express-fileupload');
var app = express();
const fs = require('fs');
var ejs = require('ejs');


app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(fileUpload());

var files1 = []; 
fs.readdir(__dirname + '/files', (err, files) => {
  files.forEach(file => {
	console.log(file);
	files1.push(file);	
  });
});


app.post('/upload',function(req,res){
	
	if(!req.files)
		return res.status(400).send("no files were up");
	
	let sampleFile= req.files.sampleFile;
	
	sampleFile.mv('/cli-ser/files/'+'abc.txt', function(err){
		if(err)
			return res.status(500).send(err);
		
		res.send('file uploaded');
		
		
	});
});





app.get('/', function(req, res){
	res.render('index', {files:files1});
});

app.get('/:filename', function(req, res){
	res.download(__dirname + '/files/' + req.params.filename);
});

app.listen(3000,'127.0.0.1',function(err){

 if(err)
 {
 	console.log(err);
 }
 else{
 	console.log("server is running on port 3000");
 }
});




