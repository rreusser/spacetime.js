window.Spacetime = window.Spacetime || {};

window.Spacetime.Complex = (function(Spacetime, Math) {
  'use strict';


  Math.cosh = Math.cosh || function(x) {
    return 0.5*(Math.exp(x) + Math.exp(-x));
  };

  Math.sinh = Math.sinh || function(x) {
    return 0.5*(Math.exp(x) - Math.exp(-x));
  };

  Math.tanh = Math.tanh || function(x) {
    var y = Math.exp(2*x);
    return (y-1)/(y+1);
  };



  var Complex = function Complex(real,imag) {
    this.real = real;
    this.imag = imag;
  };

  Complex.rect = function ComplexPolar( a, b ) {
    return new Complex( a, b );
  };

  Complex.polar = function ComplexPolar( mod, arg ) {
    return new Complex( mod*Math.cos(arg), mod*Math.sin(arg) );
  };

  Complex.Real = function ComplexReal(a) {
    return new Complex(a,0);
  };

  Complex.Imag = function ComplexReal(b) {
    return new Complex(0,b);
  };

  Object.defineProperties(Complex.prototype,{
    mod: {
      get: function ComplexMod () {
        return Math.sqrt(this.real*this.real + this.imag*this.imag);
      }
    },
    mod2: {
      get: function ComplexMod () {
        return this.real*this.real + this.imag*this.imag;
      }
    },
    arg: {
      get: function ComplexArg () {
        return Math.atan2(this.imag, this.real);
      }
    },
    conj: {
      get: function ComplexConjugate() {
        return new Complex(this.real, -this.imag);
      }
    },
    neg: {
      get: function ComplexNegative() {
        return new Complex(-this.real, -this.imag);
      }
    },
    inv: {
      get: function ComplexNegative() {
        var m2 = this.real*this.real + this.imag*this.imag;
        return new Complex(this.real/m2, -this.imag/m2);
      }
    }
  });

  Complex.add = function ComplexAdd( a, b ) {
    return new Complex( a.real + b.real, a.imag + b.imag );
  };

  Complex.sub = function ComplexSub( a, b ) {
    return new Complex( a.real - b.real, a.imag - b.imag );
  };

  Complex.mul = function ComplexMul( a, b ) {
    return new Complex( a.real*b.real - a.imag*b.imag,
                        a.imag*b.real + a.real*b.imag );
  };

  Complex.fmul = function ComplexMul( z, x ) {
    return new Complex( x*z.real, x*z.imag );
  };

  Complex.div = function ComplexMul( a, b ) {
    var denom = b.real*b.real + b.imag*b.imag;
    return new Complex( (a.real*b.real + a.imag*b.imag)/denom,
                        (a.imag*b.real - a.real*b.imag)/denom );
  };

  // In-place operations
  Complex.prototype.add = function ComplexAdd( b ) {
    this.real += b.real;
    this.imag += b.imag;
    return this;
  };

  Complex.prototype.sub = function ComplexSub( b ) {
    this.real -= b.real;
    this.imag -= b.imag;
    return this;
  };

  Complex.prototype.mul = function ComplexMul( b ) {
    var ar=this.real;
    this.real = this.real*b.real - this.imag*b.imag;
    this.imag = this.imag*b.real + ar*b.imag;
    return this;
                        
  };

  Complex.prototype.fmul = function ComplexMul( x ) {
    this.real *= x;
    this.imag *= x;
    return this;
  };

  Complex.prototype.div = function ComplexMul( b ) {
    var ar=this.real;
    var denom = b.real*b.real + b.imag*b.imag;
    this.real = (this.real*b.real + this.imag*b.imag)/denom;
    this.imag = (this.imag*b.real - ar*b.imag)/denom;
    return this;
  };

  Complex.sqrt = function ComplexSqrt( a ) {
    return Complex.polar( Math.sqrt(a.mod), a.arg * 0.5 );
  };

  Complex.nthRoot = function ComplexNthRoot( a, n ) {
    return Complex.polar( Math.pow(a.mod, 1/n), a.arg / n);
  };

  Complex.exp = function ComplexExp( a ) {
    return Complex.polar( Math.exp(a.real), a.imag );
  };

  Complex.log = function ComplexLog( a ) {
    var imag = (a.arg + Math.PI*2)%(Math.PI*2);
    return new Complex( Math.log(a.mod), imag);
  };

  Complex.rpow = function CpmplexRealPow( a, n ) {
    return Complex.polar( Math.pow(a.mod, n), a.arg * n);
  };

  Complex.cpow = function ComplexComplexPow( a, b ) {
    var moda2 = a.mod2;
    var arga = a.arg;
    var r = Math.pow(moda2, 0.5*b.real) * Math.exp(-b.imag*arga);
    var arg = b.real*arga + 0.5*b.imag*Math.log(moda2);
    return new Complex( r * Math.cos(arg), r * Math.sin(arg) );
  };

  Complex.cos = function ComplexCosine( a ) {
    return new Complex( Math.cos(a.real) * Math.cosh(a.imag), -Math.sin(a.real)*Math.sinh(a.imag) );
  };

  Complex.sin = function ComplexSine( a ) {
    return new Complex( Math.sin(a.real) * Math.cosh(a.imag), Math.cos(a.real)*Math.sinh(a.imag) );
  };

  Complex.tan = function ComplexTangent( a ) {
    var x = Math.cos(a.real);
    var y = Math.sinh(a.imag);
    var denom = x*x+y*y;
    return new Complex( Math.sin(a.real)*x/denom, y*Math.cosh(a.imag)/denom );
  };

  // TODO: Optimize these so they don't refer to other methods:
  Complex.sec = function ComplexSecant( a ) {
    return Complex.cos(a).inv;
  };

  Complex.cosec = function ComplexCosecant( a ) {
    return Complex.sin(a).inv;
  };

  Complex.cotan = function ComplexCotangent( a ) {
    return Complex.tan(a).inv;
  };
  
  // Aliases:
  Complex.csc = Complex.cosec;
  Complex.cot = Complex.cotan;

  Complex.cosh = function ComplexHyperbolicCosine( a ) {
    return Complex.fmul( Complex.add(Complex.exp(a), Complex.exp(a.neg)), 0.5 );
  };

  Complex.sinh = function ComplexHyperbolicSine( a ) {
    return Complex.fmul( Complex.sub(Complex.exp(a), Complex.exp(a.neg)), 0.5 );
  };

  Complex.tanh = function ComplexHyperbolicTangent( a ) {
    var ex = Complex.exp(a);
    var enx = Complex.exp(a.neg);
    return Complex.div(Complex.sub(ex,enx), Complex.add(ex,enx));
  };

  Complex.cotanh = function ComplexHyperbolicCotangent( a ) {
    var ex = Complex.exp(a);
    var enx = Complex.exp(a.neg);
    return Complex.div(Complex.add(ex,enx), Complex.sub(ex,enx));
  };

  // TODO: Optimize these so they don't refer to other methods:
  Complex.sech = function ComplexSecant( a ) {
    return Complex.cosh(a).inv;
  };

  Complex.cosech = function ComplexCosecant( a ) {
    return Complex.sinh(a).inv;
  };

  // Aliases:
  Complex.csch = Complex.cosech;
  Complex.coth = Complex.cotanh;

  Complex.I    = new Complex(0,1);
  Complex.J    = new Complex(0,1);
  Complex.ONE  = new Complex(1,0);
  Complex.PI   = new Complex(Math.PI,0);
  Complex.E    = new Complex(Math.E,0);

  return Complex;


}(window.Spacetime, Math));
