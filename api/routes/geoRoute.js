'use strict';


module.exports.findAddress = function(app) {
	var request = require('request');
	var addressToGEOID;
	var addressString = '';
	var affordabilityResult;

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
				addressToGEOID = JSON.parse(body).result.addressMatches[0].geographies["Census Blocks"][0].GEOID.slice(0,12);
			}
			var affordabilityOptions = {
				url: 'http://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/LocationAffordabilityIndexData/FeatureServer/0/query?where=blkgrp%3D' + addressToGEOID + '&outFields=hh_type1_ht_own%2C+area_median_income&f=json'
			}
			request(affordabilityOptions, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					affordabilityResult = JSON.parse(body);
				}
				res.send({
		    		result: affordabilityResult
		    	})
	    });
		})
	});
}