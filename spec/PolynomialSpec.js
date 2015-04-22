'use strict';

describe("Complex Polynomials", function() {

  var Complex = window.Spacetime.Complex;
  var CPoly = window.Spacetime.Polynomial.CPoly;

  describe("Initializing polynomials",function() {

    var z1, z2, z3, z4;

    beforeEach(function() {
      z1 = Complex.rect(1,0);
      z2 = Complex.rect(0,0);
      z3 = Complex.rect(-2,0);
      z4 = Complex.rect(4,0);
    });

    it('initializes a polynomial from an array of numbers',function() {
      var p = new CPoly([z1,z2,z3,z4]);
      expect(p.a).toEqual([z1,z2,z3,z4]);
    });
  });

  describe("Creates polynomials",function() {
    var z1, z2, z3, z4, a;

    beforeEach(function() {
      z1 = Complex.rect(1,0);
      z2 = Complex.rect(0,0);
      z3 = Complex.rect(-2,0);
      z4 = Complex.rect(4,0);
      a = [z4, z3, z2, z1];
    });

    it('creates a polynomial from a polynomial',function() {
      var p1 = new CPoly(a);
      var p2 = CPoly.create(p1);
      expect(p1.a).toEqual(p2.a);
      expect(p1.a[0]).not.toBe(p2.a[0]);
      expect(p1).not.toBe(p2);
    });

    it('creates a polynomial from a list of coefficients',function() {
      var p = CPoly.create(a);
      expect(p.a).toEqual(a);
      expect(p.a[0]).not.toBe(a[0]);
    });

    it('creates a polynomial from a list of ordered [real,imag] pairs',function() {
      var p = CPoly.create([4,0],[-2,0],[0,0],[1,0]);
      expect(p.a).toEqual(a);
      expect(p.a[0]).not.toBe(a[0]);
    });

    it('creates a polynomial from a list of arguments',function() {
      var p = CPoly.create(z4, z3, z2, z1);
      expect(p.a).toEqual(a);
      expect(p.a[0]).not.toBe(a[0]);
    });

    it('copies a polynomial',function() {
      var p1 = new CPoly([z1,z2,z3,z4]);
      var p2 = p1.copy();
      expect(p1.a).toEqual(p2.a);
      expect(p1.a[0]).not.toBe(p2.a[0]);
      expect(p1).not.toBe(p2);
    });
  });

  describe("Properties",function() {
    var p;

    beforeEach(function() {
      p = CPoly.create([4,0],[-2,0],[0,0],[1,0]);
    });

    beforeEach(function() {
    });

    it("has an order",function() {
      expect(p.order).toEqual(3);
    });

    it('represents the polynomial as a string',function() {
      expect(p.toString()).toBe('(4+0i) + (-2+0i)z + (0+0i)z^2 + (1+0i)z^3');
    });
  });

  describe("Evaluation",function() {
    var p;

    beforeEach(function() {
      p = CPoly.create([4,0],[-2,0],[0,0],[1,0]);
    });

    it("evalutes the polynomial",function() {
      var value = p.evaluate( Complex.rect(3,4) );
      expect(value).toBeComplexCloseTo([-119,36]);
    });
  });

  describe("Algebraic Operations",function() {
    var z1, z2, z3, z4, z5, p1, p2, p3;
    beforeEach(function() {
      z1 = Complex.rect( 1, 0);
      z2 = Complex.rect( 0, 0);
      z3 = Complex.rect(-2, 0);
      z4 = Complex.rect( 4, 0);
      z5 = Complex.rect( 2, 3);
      p1 = new CPoly([z1,z2,z3]);
      p2 = new CPoly([z4,z5   ]);
    });

    it("adds two polynomials of different lengths",function() {
      p3 = CPoly.add(p1,p2);
      expect(p3.a[0]).toBeComplexCloseTo( Complex.add(z1,z4) );
      expect(p3.a[1]).toBeComplexCloseTo( Complex.add(z2,z5) );
      expect(p3.a[2]).toBeComplexCloseTo( z3 );
    });

    it("addition is commutative",function() {
      expect( CPoly.add(p1,p2) ).toEqual( CPoly.add(p2,p1) );
    });

    it('multiplies two polynomials',function() {
      expect( CPoly.mul(p1,p2) ).toEqual( CPoly.create([4,0],[2,3],[-8,0],[-4,-6]) );
    });

    it('multiplies a polynomial by a scalar',function() {
      var z = Complex.rect(2,3);
      var pz = CPoly.cmul(p1,z);
      expect(pz).toEqual( CPoly.create( [z1.mul(z), z2.mul(z), z3.mul(z)] ) );
    });

  });

  describe("In-place algebraic Operations",function() {
    var z5, p1, p2, p3;
    beforeEach(function() {
      z5 = Complex.rect(2,3);
      p1 = new CPoly([z1,z2,z3]);
      p2 = new CPoly([z4,z5   ]);
    });

    xit('adds a shorter polynomial to a longer polynomial',function() {
      expect(p1.add(p2)).toEqual( CPoly.create([]) );
    });

    xit('adds a longer polynomial to a shorter polynomial',function() {
    });
  });

  describe("Calculus Operations",function() {

    var p;

    beforeEach(function() {
      p = new CPoly([z1,z2,z3,z4]);
    });

    it("differentiates polynomials",function() {
      var dp = new CPoly([ z2, Complex.fmul(z3,2), Complex.fmul(z4,3) ]);
      expect( CPoly.diff(p).a ).toEqual( dp.a );
    });

    it("differentiates polynomials in place",function() {
      var dp = new CPoly([ z2, Complex.fmul(z3,2), Complex.fmul(z4,3) ]);
      p.diff();
      expect( p.a ).toEqual( dp.a );
    });

  });
});
