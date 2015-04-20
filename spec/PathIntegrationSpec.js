'use strict';

describe("Path Integrals of Complex Analytic Functions", function() {

  var Complex = window.Spacetime.Complex;
  var PI = window.Spacetime.PathIntegration;


  describe("Integrating around the unit circle", function() {

    it("integrates around a unit circle",function() {
      var circle = PI.Path.Circle( Complex.rect(0,0), 1 );
      var f = function(z) { return Complex.ONE; };

      var i = PI.Integrate( f, circle, {method: 'rk4', steps: 10});

      expect(i.real).toBeCloseTo(0);
      expect(i.imag).toBeCloseTo(0);
    });

  });

  describe("The Residue Theorem", function() {

    for(var j=0; j<3; j++) {
      (function(numPoles) {
        it('Satisfies the residue theorem for ' + numPoles + ' poles',function() {
          var circle = PI.Path.Circle( Complex.rect(0,0), 1 );
          var f = function(z) {
            var x = Complex.ONE;
            x.div( z );// Complex.add(z, Complex.Real( 0.5 + numPoles) ) );
            return x;
          };

          var i = PI.Integrate( f, circle, {method: 'rk4', steps: 100});

          expect(i.real).toBeCloseTo( 0 );
          expect(i.imag).toBeCloseTo( Math.PI * 2 * numPoles );
        });
      }(j));
    }

  });

});
