
beforeEach(function() {

  'use strict';

  var Complex = window.Spacetime.Complex;
  var RVector = window.Spacetime.Linalg.RVector;
  var CVector = window.Spacetime.Linalg.CVector;

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
    },
    toBeRVectorCloseTo: function( util, customEqualityTesters) {
      return {
        compare: function(actual, expected, precision) {

          if (precision !== 0) { 
            precision = precision || 2;
          }    

          if( actual.length != expected.length ) {
            return {
              pass: false,
              message: 'Expected RVector ' + actual.toString() + ' to be close to RVector ' + expected.toString() + ' (RVector dimension mismatch)'
            };
          } else {
            return {
              pass: RVector.sub(actual,expected).norm < (Math.pow(10, -precision) / 2),
              message: 'Expected RVector ' + actual.toString() + ' to be close to RVector ' + expected.toString()
            };   
          }
        }  
      }
    },
    toBeCVectorCloseTo: function( util, customEqualityTesters) {
      return {
        compare: function(actual, expected, precision) {

          if (precision !== 0) { 
            precision = precision || 2;
          }    

          if( actual.length != expected.length ) {
            return {
              pass: false,
              message: 'Expected CVector ' + actual.toString() + ' to be close to CVector ' + expected.toString() + ' (CVector dimension mismatch)'
            };
          } else {
            return {
              pass: CVector.sub(actual,expected).norm < (Math.pow(10, -precision) / 2),
              message: 'Expected CVector ' + actual.toString() + ' to be close to CVector ' + expected.toString()
            };   
          }
        }  
      };
    }
  });
});
