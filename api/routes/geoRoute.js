'use strict';


function calculateAffordability ( medianIncome, percentTransCost, houseBudget, transBudget){
	var avgMoneySpentOnHT = medianIncome * percentTransCost/100;
	console.log(medianIncome);
	console.log(percentTransCost/100);
	console.log(avgMoneySpentOnHT);
	var inputMoneySpentOnHT = parseFloat(houseBudget) + parseFloat(transBudget);
	console.log(inputMoneySpentOnHT);
	if ((inputMoneySpentOnHT > 0.95*avgMoneySpentOnHT) && (inputMoneySpentOnHT < avgMoneySpentOnHT)) return {result: 'yellow'};
	if (inputMoneySpentOnHT > avgMoneySpentOnHT) return {result: 'green'};
	if (inputMoneySpentOnHT < 0.95*avgMoneySpentOnHT) return {result: 'red'};

}

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


  	app.get('/api/v0/geo-route/:a/:b/:c/:d/:e', function (req, res) {
	    addressString = 'http://geocoding.geo.census.gov/' + 
	    'geocoder/geographies/address?street=' + 
	    req.params.a + 
	    '&city=' + 
	    req.params.b + 
	    '&state=' + 
	    req.params.c + 
	    '&benchmark=Public_AR_Census2010&vintage=' +
	    'Census2010_Census2010&layers=14&format=json'
		
	    var financialData = {
	    	yearlyHousingBudget: req.params.d,
	    	yearlyTransCostBudget: req.params.e
	    }

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
				url: 'http://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/LocationAffordabilityIndexData/FeatureServer/0/query?where=blkgrp%3D' + addressToGEOID + '&outFields=hh_type1_ht_own%2C+blkgrp_median_income_owners&f=json'
			}
			request(affordabilityOptions, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					affordabilityResult = JSON.parse(body);
					var blkgrpMedianIncome = affordabilityResult.features[0].attributes.blkgrp_median_income_owners;
					var houseAndTransPercentageOfIncome = affordabilityResult.features[0].attributes.hh_type1_ht_own;
				}

				var colorMeAffordable = calculateAffordability(blkgrpMedianIncome
					, houseAndTransPercentageOfIncome
					, financialData.yearlyHousingBudget
					, financialData.yearlyTransCostBudget)
				res.send(colorMeAffordable)
	    });
		})
	});
}