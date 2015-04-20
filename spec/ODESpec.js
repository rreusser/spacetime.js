'use strict';

describe("ODE Solver", function() {

  var Integrator = window.Spacetime.ODE.Integrator;

  describe("Integrator defaults",function() {

    it("has timestep 1.0", function() {
      var i = new Integrator();
      expect(i.dt).toBeCloseTo(1.0);
    });

    it("uses Euler integration", function() {
      var i = new Integrator();
      expect(i.method).toBe('euler');
    });

    it("creates a workspace", function() {
      var i = new Integrator(undefined,[1,2,3]);
      expect(i.workspace.w0.length).toEqual(3);
    });

  });


  describe("Integrating around a circle", function() {

    var f, y0;

    beforeEach(function() {
      f = function(dydt, y) {
        dydt[0] = -y[1];
        dydt[1] =  y[0];
      };

      y0 = [1,0];
    });

    describe("Euler integration", function() {
      var i;

      beforeEach(function() {
        i = new Integrator( f, y0, {method: 'euler'});
      });
      

      it("Takes a single timestep",function() {
        i.step();
        expect(i.y[0]).toBeCloseTo(1);
        expect(i.y[1]).toBeCloseTo(1);
      });

      it("Takes two timesteps",function() {
        i.steps(2);
        expect(i.y[0]).toBeCloseTo(0);
        expect(i.y[1]).toBeCloseTo(2);
      });

      it("is first order accurate",function() {
        // Compute two approximations that differ by a refinement factor and confirm
        // that the error is reduced by (1/factor)^2:
        var expectedOrder = 1;
        var j, n = 10, factor = 3;

        // Integrate one quadrant of a circle:
        var y1 = [1,0];
        var y2 = [1,0];
        var i1 = new Integrator( f, y1, {method: 'euler', dt: 0.5 * Math.PI / n } );
        var i2 = new Integrator( f, y2, {method: 'euler', dt: 0.5 * Math.PI / (factor*n) } );
        for(j=0; j<n; j++) i1.step();
        for(j=0; j<n*factor; j++) i2.step();

        // Calculate the error of each approximation:
        var error1 = Math.sqrt(Math.pow(y1[0],2) + Math.pow(y1[1]-1,2));
        var error2 = Math.sqrt(Math.pow(y2[0],2) + Math.pow(y2[1]-1,2));

        // Calculate the observed order of convergence:
        var observedOrder = Math.log( error1 / error2 ) / Math.log(factor);

        expect( observedOrder ).toBeCloseTo( expectedOrder, 1 );
      });

    });


    describe("RK-2 Midpoint integration", function() {
      var i;

      beforeEach(function() {
        i = new Integrator( f, y0, {method: 'rk2'} );
      });

      it("Takes a single timestep",function() {
        i.dt = 1.0;
        i.step();
        expect(i.y[0]).toBeCloseTo(0.5);
        expect(i.y[1]).toBeCloseTo(1);
      });

      it("Integrates halfway around the circle",function() {
        var n = 20;
        i.dt = Math.PI / n;
        for(var j=0; j<n; j++) i.step();
        expect(i.y[0]).toBeCloseTo(-1,1);
        expect(i.y[1]).toBeCloseTo(0,1);
      });

      it("is second order accurate",function() {
        // Compute two approximations that differ by a refinement factor and confirm
        // that the error is reduced by (1/factor)^2:
        var expectedOrder = 2;
        var j, n = 10, factor = 3;

        // Integrate one quadrant of a circle:
        var y1 = [1,0];
        var y2 = [1,0];
        var i1 = new Integrator( f, y1, {method: 'rk2', dt: 0.5 * Math.PI / n } );
        var i2 = new Integrator( f, y2, {method: 'rk2', dt: 0.5 * Math.PI / (factor*n) } );
        for(j=0; j<n; j++) i1.step();
        for(j=0; j<n*factor; j++) i2.step();

        // Calculate the error of each approximation:
        var error1 = Math.sqrt(Math.pow(y1[0],2) + Math.pow(y1[1]-1,2));
        var error2 = Math.sqrt(Math.pow(y2[0],2) + Math.pow(y2[1]-1,2));

        // Calculate the observed order of convergence:
        var observedOrder = Math.log( error1 / error2 ) / Math.log(factor);

        expect( observedOrder ).toBeCloseTo( expectedOrder );
      });

    });

    describe("RK-4 integration", function() {
      var i;

      beforeEach(function() {
        i = new Integrator( f, y0, {method: 'rk4'} );
      });

      it("Integrates halfway around the circle",function() {
        var n = 20;
        i.dt = Math.PI / n;
        for(var j=0; j<n; j++) i.step();
        expect(i.y[0]).toBeCloseTo(-1,2);
        expect(i.y[1]).toBeCloseTo(0,2);
      });

      it("is fourth order accurate",function() {
        // Compute two approximations that differ by a refinement factor and confirm
        // that the error is reduced by (1/factor)^2:
        var expectedOrder = 4;
        var j, n = 10, factor = 3;

        // Integrate one quadrant of a circle:
        var y1 = [1,0];
        var y2 = [1,0];
        var i1 = new Integrator( f, y1, {method: 'rk4', dt: 0.5 * Math.PI / n } );
        var i2 = new Integrator( f, y2, {method: 'rk4', dt: 0.5 * Math.PI / (factor*n) } );
        for(j=0; j<n; j++) i1.step();
        for(j=0; j<n*factor; j++) i2.step();

        // Calculate the error of each approximation:
        var error1 = Math.sqrt(Math.pow(y1[0],2) + Math.pow(y1[1]-1,2));
        var error2 = Math.sqrt(Math.pow(y2[0],2) + Math.pow(y2[1]-1,2));

        // Calculate the observed order of convergence:
        var observedOrder = Math.log( error1 / error2 ) / Math.log(factor);

        expect( observedOrder ).toBeCloseTo( expectedOrder );
      });

    });


  });

});
