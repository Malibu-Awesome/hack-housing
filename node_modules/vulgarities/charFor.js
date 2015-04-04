var vulgarities = require('./index')
  , gcd = require('gcd')
  , vulgarFractionFor;

vulgarFractionFor = function (numerator, denominator) {
  var divisor = gcd(numerator, denominator)
    , searchFor = (numerator/divisor) + '/' + (denominator/divisor);

  return vulgarities[searchFor] || null;
};

module.exports = vulgarFractionFor;
