
beforeEach(function() {

  'use strict';

  var Complex = window.Spacetime.Complex;

  jasmine.addMatchers({
    toHaveArgumentCloseTo: function( util, customEqualityTesters) {
      return {
        compare: function(actual, expected, precision) {

          var anorm = actual < 0 ? (actual + Math.ceil(-actual/(2*Math.PI))*Math.PI*2) : actual;
          var enorm = expected < 0 ? (expected + Math.ceil(-expected/(2*Math.PI))*Math.PI*2) : expected;

          anorm %= Math.PI*2;
          enorm %= Math.PI*2;
          
          if (precision !== 0) { 
            precision = precision || 2;
          }    

          return {
            pass: Math.abs(enorm - anorm) < (Math.pow(10, -precision) / 2) 
          };   
        }  
      };
    },
    toBeComplexCloseTo: function( util, customEqualityTesters) {
      return {
        compare: function(actual, expected, precision) {

          if (precision !== 0) { 
            precision = precision || 2;
          }    

          return {
            pass: Complex.sub(Complex.create(actual),Complex.create(expected)).mod < (Math.pow(10, -precision) / 2) 
          };   
        }  
      };
    }
  });
});
