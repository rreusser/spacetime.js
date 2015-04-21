'use strict';

describe("Complex Numbers", function() {

  var Complex = window.Spacetime.Complex;

  describe("Initializing complex numbers",function() {

    it("sets the real part of a complex number",function() {
      var z = new Complex(1,2);
      expect(z.real).toBeCloseTo(1);
    });

    it("sets the imaginary part of a complex number",function() {
      var z = new Complex(1,2);
      expect(z.imag).toBeCloseTo(2);
    });

    it("copies complex numbers",function() {
      var a = new Complex(1,2);
      var b = a.copy();
      expect( a === b ).toBe(false);
      expect(a).not.toBe(b);
      expect(a).toEqual(b);
    });

  });

  describe("Representing complex numbers",function() {

    it("creates a complex number in rectangular coordinates",function() {
      var z = Complex.rect(3,4);
      expect(z.real).toBeCloseTo(3);
      expect(z.imag).toBeCloseTo(4);
    });

    it("creates a complex number in polar coordinates",function() {
      var z = Complex.polar(2, Math.PI*0.5);
      expect(z.real).toBeCloseTo(0);
      expect(z.imag).toBeCloseTo(2);
    });

    it("creates real numbers",function() {
      var z = Complex.real(20);
      expect(z).toBeComplexCloseTo([20,0]);
    });

    it("creates real numbers",function() {
      var z = Complex.imag(20);
      expect(z).toBeComplexCloseTo([0,20]);
    });
  });

  describe("Interpreting complex numbers",function() {

    it("Complex.create(2): interprets a single number as a real number",function() {
      var z = Complex.create(2);
      expect(z).toBeComplexCloseTo( Complex.rect(2,0) );
    });

    it("Complex.create(2,3): interprets multiple arguments as real and imaginary components of a complex number",function() {
      var z = Complex.create(2,3);
      expect(z).toBeComplexCloseTo( Complex.rect(2,3) );
    });

    it("Complex.create([a]): interprets an array with a single component as a real number",function() {
      var z = Complex.create([2]);
      expect(z).toBeComplexCloseTo( Complex.rect(2,0) );
    });
    
    it("Complex.create([2,3]): interprets an array as real and imaginary components of a complex number",function() {
      var z = Complex.create([2,3]);
      expect(z).toBeComplexCloseTo( Complex.rect(2,3) );
    });
    
    it("Complex.create(): is zero when passed no arguments",function() {
      var z = Complex.create();
      expect(z).toEqual( Complex.ZERO );
    });

    it("Complex.create(z): copies a complex number when created from a complex number",function() {
      var a = Complex.rect(2,3);
      var b = Complex.create( a );
      expect(a).toEqual( b );
      expect(a).not.toBe( b );
    });
  });

  describe("Conversion to string",function() {
    it("casts to a string",function() {
      var z = new Complex(2.5,3.5);
      expect(z.toString()).toMatch(/^\(2.5[0-9]*\+3.5[0-9]*i\)$/);
    });

    it("omits the '+' when the complex part is negative",function() {
      var z = new Complex(2.5,-3.5);
      expect(z.toString()).toMatch(/^\(2.5[0-9]*\-3.5[0-9]*i\)$/);
    });
  });

  describe("Constants",function() {

    it("expects constants to be immutable",function() {
      Complex.ONE.real = 2;
      expect( Complex.ONE ).toEqual( new Complex(1,0) );
    })

    it("defines zero", function() {
      expect( Complex.ZERO.real ).toEqual( 0 );
      expect( Complex.ZERO.imag ).toEqual( 0 );
    });

    it("defines one", function() {
      expect( Complex.ONE.real ).toEqual( 1 );
      expect( Complex.ONE.imag ).toEqual( 0 );
    });

    it("defines i", function() {
      expect( Complex.I.real ).toEqual( 0 );
      expect( Complex.I.imag ).toEqual( 1 );
    });

    it("defines j in case you're an electrical engineer", function() {
      expect( Complex.J.real ).toEqual( 0 );
      expect( Complex.J.imag ).toEqual( 1 );
    });

    it("defines pi", function() {
      expect( Complex.PI.real ).toBeCloseTo( Math.PI, 1e-8 );
      expect( Complex.PI.imag ).toEqual( 0 );
    });

    it("defines e", function() {
      expect( Complex.E.real ).toBeCloseTo( Math.E, 1e-8 );
      expect( Complex.E.imag ).toEqual( 0 );
    });

  });

  describe("Has properties",function() {

    var a;

    beforeEach(function() {
      a = new Complex(1,2);
    });

    it("has a modulus",function() {
      expect(a.mod).toBeCloseTo( Math.sqrt(5) );
    });

    it("has a squared modulus",function() {
      expect(a.mod2).toBeCloseTo( 5 );
    });

    it("has an argument",function() {
      expect(a.arg).toBeCloseTo( Math.atan2(2,1) );
    });

    it("calculates the complex conjugate",function() {
      expect(a.conj).toBeComplexCloseTo([1,-2]);
    });

    it("negates the number",function() {
      expect(a.neg).toBeComplexCloseTo([-1,-2]);
    });

    it("inverts the number",function() {
      expect(a.inv).toBeComplexCloseTo([0.2,-0.4]);
    });
  });

  describe("Arithmetic operations",function() {
    
    var a, b;
    
    beforeEach(function() {
      a = new Complex(1,2);
      b = new Complex(3,5);
    });

    it("adds complex numbers",function() {
      var c = Complex.add( a, b );
      expect(c).toBeComplexCloseTo([4,7]);
    });

    it("subtracts complex numbers",function() {
      var c = Complex.sub( a, b );
      expect(c).toBeComplexCloseTo([-2,-3]);
    });

    it("multiples complex numbers",function() {
      var c = Complex.mul( a, b );
      expect(c).toBeComplexCloseTo([-7,11]);
    });

    it("multiples a complex number by a real number",function() {
      var c = Complex.fmul( a, 2 );
      expect(c).toBeComplexCloseTo([2,4]);
    });

    it("divides complex numbers",function() {
      var c = Complex.div( a, b );
      expect(c).toBeComplexCloseTo([13/34,1/34]);
    });

  });

  describe("In-place arithmetic",function() {
    
    var a, b;
    
    beforeEach(function() {
      a = new Complex(1,2);
      b = new Complex(3,5);
    });

    it("adds a complex number and returns self",function() {
      var c = a.add(b);
      expect(a).toBeComplexCloseTo([4,7]);
      expect(c).toEqual(a);
    });

    it("subtracts a complex number and returns self",function() {
      var c = a.sub(b);
      expect(a).toBeComplexCloseTo([-2,-3]);
      expect(c).toEqual(a);
    });

    it("multiples by a complex number and returns self",function() {
      var c = a.mul(b);
      expect(a).toBeComplexCloseTo([-7,11]);
      expect(c).toEqual(a);
    });

    it("multiples by a real number and returns self",function() {
      var c = a.fmul(2);
      expect(a).toBeComplexCloseTo([2,4]);
      expect(c).toEqual(a);
    });

    it("divides by a complex number and returns self",function() {
      var c = a.div(b);
      expect(a).toBeComplexCloseTo([13/34,1/34]);
      expect(c).toEqual(a);
    });

  });

  describe("Algebraic operations",function() {
    var a, b;

    beforeEach(function() {
      a = new Complex(1,2);
      b = new Complex(3,5);
    });

    it("calculates the square root",function() {
      var c = Complex.sqrt( a );
      expect(c).toBeComplexCloseTo([1.272019649514069, 0.7861513777574233]);
    });

    it("calculates the principle nth root",function() {
      var n = 4.5;
      var c = Complex.nthRoot( a, n );
      expect(c).toBeComplexCloseTo([1.1598027375011442, 0.29125033629779823]);
    });

    it("calculates the nth power",function() {
      var n = 4.5;
      var c = Complex.rpow( a, n );
      expect(c).toBeComplexCloseTo([9.963495519579647, -36.03153123263964]);

      n = 0.2;
      c = Complex.rpow( a, n );
      expect(c).toBeComplexCloseTo([1.1459399633250584, 0.2579753126091295]);

      n = 0.0;
      c = Complex.rpow( a, n );
      expect(c).toBeComplexCloseTo([1,0]);
    });

    it("calculates complex powers of complex numbers",function() {
      var c = Complex.cpow( a, b );
      expect(c).toBeComplexCloseTo([0.02148157726686086, 0.038499602830024626]);
    });

    it("calculates the complex exponential",function() {
      var c = Complex.exp(a);
      expect(c).toBeComplexCloseTo([-1.1312043837568135, 2.4717266720048188]);
    });

    it("calculates the principle value of the logarithm", function() {
      var c = Complex.log(a);
      expect(c).toBeComplexCloseTo([0.8047189562170503, 1.1071487177940904]);
    });

  });

  describe("Complex trigonometric functions",function() {

    var a;

    beforeEach(function() {
      a = new Complex(1,2);
    });

    it("calculates the complex cosine",function() {
      var c = Complex.cos(a);
      expect(c).toBeComplexCloseTo([2.0327230070196656, -3.0518977991517997]);
    });

    it("calculates the complex sine",function() {
      var c = Complex.sin(a);
      expect(c).toBeComplexCloseTo([3.165778513216168, 1.959601041421606]);
    });

    it("calculates the complex tangent",function() {
      var c = Complex.tan(a);
      expect(c).toBeComplexCloseTo([0.0338128260798967, 1.0147936161466333]);
    });

    it("calculates the complex secant",function() {
      var c = Complex.sec(a);
      expect(c).toBeComplexCloseTo( Complex.rect(2.0327230070196656, -3.0518977991517997).inv );
    });

    it("calculates the complex cosecant",function() {
      var c = Complex.cosec(a);
      expect(c).toBeComplexCloseTo( Complex.rect(3.165778513216168, 1.959601041421606).inv );
    });

    it("calculates the complex cotangent",function() {
      var c = Complex.cotan(a);
      expect(c).toBeComplexCloseTo( Complex.rect(0.0338128260798967, 1.0147936161466333 ).inv );
    });

  });

  describe("Complex hyperbolic trigonometric functions",function() {

    var a;

    beforeEach(function() {
      a = new Complex(1,2);
    });

    it("calculates the complex hyperbolic cosine",function() {
      var c = Complex.cosh(a);
      expect(c).toBeComplexCloseTo([-0.64214812471552, 1.0686074213827783]);
    });

    it("calculates the complex hyperbolic sine",function() {
      var c = Complex.sinh(a);
      expect(c).toBeComplexCloseTo([-0.4890562590412937, 1.4031192506220405]);
    });

    it("calculates the complex hyperbolic tangent",function() {
      var c = Complex.tanh(a);
      expect(c).toBeComplexCloseTo([1.16673625724092, -0.24345820118572534]);
    });

    it("calculates the complex hyperbolic secant",function() {
      var c = Complex.sech(a);
      expect(c).toBeComplexCloseTo( Complex.rect(-0.64214812471552, 1.0686074213827783).inv );
    });

    it("calculates the complex hyperbolic cosecant",function() {
      var c = Complex.cosech(a);
      expect(c).toBeComplexCloseTo( Complex.rect(-0.4890562590412937, 1.4031192506220405).inv );
    });

    it("calculates the complex hyperbolic cotangent",function() {
      var c = Complex.cotanh(a);
      expect(c).toBeComplexCloseTo( Complex.rect(1.16673625724092, -0.24345820118572534).inv );
    });

  });

  describe("Specific examples",function() {

    it("satisfies Euler's formula, e^(i*pi) + 1 == 0",function() {
      var sum = Complex.add( Complex.cpow( Complex.E, Complex.imag(Math.PI) ), Complex.ONE );
      expect(sum.real).toBeCloseTo(0);
      expect(sum.imag).toBeCloseTo(0);
    });

    it("satisfies log(-1) = i*pi",function() {
      expect( Complex.log(Complex.ONE.neg) ).toBeComplexCloseTo( [0,Math.PI] );
    });

  });


});
