'use strict';

describe("Numerical differentiation", function() {

  var Complex = window.Spacetime.Complex;
  var Derivation = window.Spacetime.Derivation;


  describe("Real-valued functions", function() {

    it("calculates the first derivative of a polynomial",function() {
      var d1 = Derivation.deriv( function(x) { return x*x*x; }, 4 );
      expect(d1).toBeCloseTo( 48 );
    });

    it("calculates the second derivative of a polynomial",function() {
      var d2 = Derivation.deriv2( function(x) { return x*x*x; }, 4 );
      expect(d2).toBeCloseTo( 24 );
    });

  });

  describe("Complex-valued functions", function() {

    var dz, z0, f;
    var Complex;
    
    beforeEach(function() {
      Complex = Spacetime.Complex;
      dz = Complex.rect(1e-4,1e-4);
      z0 = Complex.rect(2, 3);
      f = function(z) { return Complex.rpow(z,3); };
    });

    it("calculates the first derivative of a complex analytic function",function() {
      var d1 = Derivation.cderiv( f, z0, dz );
      expect(d1).toBeComplexCloseTo( new Complex(-15,36) );
    });

    it("calculates the second derivative of a complex analytic function",function() {
      var d2 = Derivation.cderiv2( f, z0, dz );
      expect(d2).toBeComplexCloseTo( new Complex(12,18) );
    });

  });

});
