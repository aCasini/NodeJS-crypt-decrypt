var express 				= require('express');
var crypto 					= require('crypto');
var algorithm 			= 'aes-128-ecb';
var secret 					= 'yoursecret';

var app = express();


app.get('/crypto', function(req, res){
	var password 			= req.query.password;
	var cipher 				= crypto.createCipher(algorithm, secret);
	var crypted 			= cipher.update(password, 'utf-8', 'hex');

	crypted += cipher.final('hex');

	var result = {
		"crypted": crypted
	}

	res.send(result);
});

app.get('/decrypt', function(req, res) {
	var cryptedPass 		= req.query.cryptpass;
	var decipher 				= crypto.createDecipher(algorithm, secret);
	var decrypted 			= decipher.update(cryptedPass, 'hex', 'utf8');

	decrypted += decipher.final('utf8');

	var result = {
		"decrypted": decrypted
	}

	res.send(result);
});

app.listen(3000, function(){
	console.log("NodeJS Express ....");
	console.log("Started!");
});
