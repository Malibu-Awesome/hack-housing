'use strict';


module.exports.findAddress = function(app) {
	var request = require('request');
	var addressToGEOID;
	var addressString = '';

	//"Request" - GET Request
	var headers = {
		'User-Agent'                  : 'Super Agent/0.0.1',
		'Access-Control-Allow-Origin' : 'http://localhost:4000',
		'Content-Type'                : 'application/x-www-form-urlencoded'
	};


  	app.get('/api/v0/geo-route/:x/:y/:z', function (req, res) {
	    addressString = 'http://geocoding.geo.census.gov/geocoder/geographies/address?street=' + req.params.x + 
	    '&city=' + req.params.y + '&state=' + req.params.z + '&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=json'
		
		var options = {
			url: addressString,
			method: 'GET',
			headers: headers
		};	
		
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				addressToGEOID = JSON.parse(body).result.addressMatches[0].geographies["Census Blocks"][0].BLKGRP;
			}
			res.send({
	    	result: addressToGEOID
	    });
		})
	});
}