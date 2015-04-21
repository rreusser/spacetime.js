'use strict';

describe("Path Integrals of Complex Analytic Functions", function() {

  var Complex = window.Spacetime.Complex;
  var PI = window.Spacetime.PathIntegration;


  describe("Integrating around the unit circle", function() {

    it("integrates around a unit circle",function() {
      var circle = PI.Path.Circle( Complex.rect(0,0), 1 );
      var f = function(z) { return Complex.ONE; };

      var i = PI.Integrate( f, circle, {method: 'rk4', steps: 10});

      expect(i).toBeComplexCloseTo([0,0]);
    });

  });

  describe("The Residue Theorem", function() {

    for(var j=0; j<2; j++) {
      (function(numPoles) {
        it('Satisfies the residue theorem for ' + numPoles + ' poles',function() {
          var circle = PI.Path.Circle( Complex.rect(0,0), 1 );
          var f = function(z) { return Complex.rpow(z,-numPoles); };
          var i = PI.Integrate( f, circle, {method: 'rk4', steps: 100});
          expect(i).toBeComplexCloseTo( Complex.rect(0, Math.PI * 2 * numPoles ) );
        });
      }(j));
    }

  });

});
