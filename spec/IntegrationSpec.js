'use strict';

describe("Function Integration", function() {

  var Integrate = window.Spacetime.Integration.Integrate;
  var Integrator = window.Spacetime.Integration.Integrator;

  describe("Integrator Setup",function() {

    it("defaults to 100 bins",function() {
      var i = new Integrator( undefined, 1, 4 );
      expect(i.bins).toEqual(100);
    });

    it("calculates the partition size",function() {
      var i = new Integrator( undefined, 1, 4, {bins: 10} );
      expect(i.bins).toEqual(10);
      expect(i.h).toBeCloseTo(0.3);
    });

    it("defaults to simpson integration", function() {
      var i = new Integrator( undefined, 1, 4, {bins: 10} );
      expect(i.method).toBe('simpson');
    });

  });

  describe("Test cases", function() {
    
    describe("Trapezoidal Integration",function() {
      it("integrates y=1 from x=1 to x=4", function() {
        var f = function(x) { return 1; };
        var i = Integrate( f, 1, 4, { bins: 4, method: 'trapezoidal' });
        expect( i ).toBeCloseTo( 3, 8 );
      });

      it("integrates y=x from x=1 to x=4", function() {
        var f = function(x) { return x; };
        var i = Integrate( f, 1, 4, { bins: 4, method: 'trapezoidal' });
        expect( i ).toBeCloseTo( 7.5, 8 );
      });

      it("integrates -5x^3 + 3x^2 - 2x + 1 from x=1 to x=4", function() {
        var f = function(x) { return -5*x*x*x + 3*x*x - 2*x + 1; };
        var i = Integrate( f, 1, 4, { bins: 100, method: 'trapezoidal' });
        expect( i ).toBeCloseTo( -267.75, 1 );
      });

      it("integrates sin(x) from x=0 to x=pi", function() {
        var f = function(x) { return Math.sin(x) };
        var i = Integrate( f, 0, Math.PI, { bins: 100, method: 'trapezoidal' });
        expect( i ).toBeCloseTo( 2 );
      });

    });

    describe("Simpson's Rule",function() {

      it("throws an error if bin count is odd", function() {
        var f = function(x) { return 1; };
        expect(function() {
          Integrate( f, 1, 4, { bins: 5, method: 'simpson' });
        }).toThrowError(RangeError);
      });

      it("integrates y=1 from x=1 to x=4", function() {
        var f = function(x) { return 1; };
        var i = Integrate( f, 1, 4, { bins: 4, method: 'simpson' });
        expect( i ).toBeCloseTo( 3, 8 );
      });

      it("integrates y=x from x=1 to x=4", function() {
        var f = function(x) { return x; };
        var i = Integrate( f, 1, 4, { bins: 4, method: 'simpson' });
        expect( i ).toBeCloseTo( 7.5, 8 );
      });

      it("integrates -5x^3 + 3x^2 - 2x + 1 from x=1 to x=4", function() {
        var f = function(x) { return -5*x*x*x + 3*x*x - 2*x + 1; };
        var i = Integrate( f, 1, 4, { bins: 4, method: 'simpson' });
        expect( i ).toBeCloseTo( -267.75, 8 );
      });

      it("integrates sin(x) from x=0 to x=pi", function() {
        var f = function(x) { return Math.sin(x) };
        var i = Integrate( f, 0, Math.PI, { bins: 8, method: 'simpson' });
        expect( i ).toBeCloseTo( 2, 2 );
      });

      it("is fourth order accurate",function() {
        var f = function(x) { return Math.sin(x) };
        var answer = 2;

        // Calculate an integral:
        var i32 = Integrate( f, 0, Math.PI, { bins: 32, method: 'simpson' });

        // And the same integral with the step size cut in half:
        var i64 = Integrate( f, 0, Math.PI, { bins: 64, method: 'simpson' });

        var error32 = Math.abs(i32 - answer);
        var error64 = Math.abs(i64 - answer);

        // The ratio of the error should be less than (0.5)^4, give or take
        expect( Math.abs(error64 / error32) ).toBeLessThan( Math.pow(0.5,4) * 1.1 );
      });

    });


    describe("Euler Integration",function() {
      it("integrates y=1 from x=1 to x=4", function() {
        var f = function(x) { return 1; };
        var i = Integrate( f, 1, 4, { bins: 4, method: 'euler' });
        expect( i ).toBeCloseTo( 3, 8 );
      });

      it("integrates y=x from x=1 to x=4", function() {
        var f = function(x) { return x; };
        var i = Integrate( f, 1, 4, { bins: 100, method: 'euler' });
        expect( i ).toBeCloseTo( 7.5, 1 );
      });

      it("integrates -5x^3 + 3x^2 - 2x + 1 from x=1 to x=4", function() {
        var f = function(x) { return -5*x*x*x + 3*x*x - 2*x + 1; };
        var i = Integrate( f, 1, 4, { bins: 100, method: 'euler' });
        expect( i ).toBeCloseTo( -267.75, -1 );
      });

      it("integrates sin(x) from x=0 to x=pi", function() {
        var f = function(x) { return Math.sin(x) };
        var i = Integrate( f, 0, Math.PI, { bins: 100, method: 'euler' });
        expect( i ).toBeCloseTo( 2 );
      });

    });

    describe("RK-2 Midpoint Integration",function() {
      it("integrates y=1 from x=1 to x=4", function() {
        var f = function(x) { return 1; };
        var i = Integrate( f, 1, 4, { bins: 2, method: 'rk2' });
        expect( i ).toBeCloseTo( 3, 8 );
      });

      it("integrates y=x from x=1 to x=4", function() {
        var f = function(x) { return x; };
        var i = Integrate( f, 1, 4, { bins: 2, method: 'rk2' });
        expect( i ).toBeCloseTo( 7.5, 8 );
      });

      it("integrates -5x^3 + 3x^2 - 2x + 1 from x=1 to x=4", function() {
        var f = function(x) { return -5*x*x*x + 3*x*x - 2*x + 1; };
        var i = Integrate( f, 1, 4, { bins: 20, method: 'rk2' });
        expect( i ).toBeCloseTo( -267.75, 0 );
      });

      it("integrates sin(x) from x=0 to x=pi", function() {
        var f = function(x) { return Math.sin(x) };
        var i = Integrate( f, 0, Math.PI, { bins: 8, method: 'rk2' });
        expect( i ).toBeCloseTo( 2, 1 );
      });
    });

    describe("RK-4 Integration",function() {
      it("integrates y=1 from x=1 to x=4", function() {
        var f = function(x) { return 1; };
        var i = Integrate( f, 1, 4, { bins: 2, method: 'rk4' });
        expect( i ).toBeCloseTo( 3, 8 );
      });

      it("integrates y=x from x=1 to x=4", function() {
        var f = function(x) { return x; };
        var i = Integrate( f, 1, 4, { bins: 2, method: 'rk4' });
        expect( i ).toBeCloseTo( 7.5, 8 );
      });

      it("integrates -5x^3 + 3x^2 - 2x + 1 from x=1 to x=4", function() {
        var f = function(x) { return -5*x*x*x + 3*x*x - 2*x + 1; };
        var i = Integrate( f, 1, 4, { bins: 8, method: 'rk4' });
        expect( i ).toBeCloseTo( -267.75, 4 );
      });

      it("integrates sin(x) from x=0 to x=pi", function() {
        var f = function(x) { return Math.sin(x) };
        var i = Integrate( f, 0, Math.PI, { bins: 8, method: 'rk4' });
        expect( i ).toBeCloseTo( 2, 4 );
      });

    });


  });

});
