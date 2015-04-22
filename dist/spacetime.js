window.ComplexRootFinder = window.ComplexRootFinder || {};

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

  Complex.fromArray = function ComplexFromArray( arr ) {
    return new Complex( arr[0], arr[1] );
  };

  Complex.polar = function ComplexPolar( mod, arg ) {
    return new Complex( mod*Math.cos(arg), mod*Math.sin(arg) );
  };

  Complex.real = function ComplexReal(a) {
    return new Complex(a,0);
  };

  Complex.imag = function ComplexReal(b) {
    return new Complex(0,b);
  };

  Complex.prototype.toString = function ComplexToString () {
    return "("+this.real+(this.imag >= 0 ? "+" : "")+this.imag+"i)";
  };

  Complex.create = function ComplexNew () {
    switch( arguments.length ) {
      case 0:
        return new Complex(0,0);
      case 1:
        if( typeof arguments[0] === 'number' ) {
          return new Complex(arguments[0], 0);

        } else if( arguments[0] instanceof Complex ) {
          return arguments[0].copy();

        } else if( arguments[0] instanceof Array ) {
          return new Complex( arguments[0][0] || 0, arguments[0][1] || 0 );
        }
        break;
      case 2:
        if( typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ) {
          return new Complex( arguments[0], arguments[1] );
        }
        break;
    }
  };

  Complex.prototype.copy = function ComplexCopy() {
    return new Complex( this.real, this.imag );
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

  Object.defineProperties(Complex,{
    I:    { get: function() { return new Complex(0,1); } },
    J:    { get: function() { return new Complex(0,1); } },
    ONE:  { get: function() { return new Complex(1,0); } },
    ZERO: { get: function() { return new Complex(0,0); } },
    PI:   { get: function() { return new Complex(Math.PI,0); } },
    E:    { get: function() { return new Complex(Math.E,0); } },
  });

  return Complex;


}(window.Spacetime, Math));

window.Spacetime = window.Spacetime || {};
window.Spacetime.Linalg = window.Spacetime.Linalg || {};

(function(Spacetime, Math) {
  'use strict';

  var CVector = function CVector(data, options) {
    var defaults = {
      type: Spacetime.Core.floatingPointArrayType
    };

    var opts = Spacetime.Utils.extend({}, defaults, options);
    this.type = opts.type;
    this.data = new (opts.type)( data );
  };

  CVector.prototype.toString = function CVectorToString() {
    var str = '[';
    var l = this.length;
    for(var i=0; i<l; i++) {
      str += new Spacetime.Complex( this.data[2*i], this.data[2*i+1] );
      if( i<l-1 ) {
        str += ', ';
      }
    }
    str += ']'
    return str;
  };

  Object.defineProperties(CVector.prototype,{
    length: {
      get: function() {
        return this.data.length;
      }
    },
    norm: {
      get: function() {
        var sum = 0;
        for(var i=this.data.length-1; i>=0; i--) {
          sum += this.data[i]*this.data[i];
        }
        return Math.sqrt(sum);
      }
    },
    squaredNorm: {
      get: function() {
        var sum = 0;
        for(var i=this.data.length-1; i>=0; i--) {
          sum += this.data[i]*this.data[i];
        }
        return sum;
      }
    }
  });

  CVector.prototype.add = function CVectorAdd( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('CVector length mismatch'); }
    for(var i=this.length-1; i>=0; i--) {
      this.data[i] += v.data[i];
    }
    return this;
  }

  CVector.prototype.sub = function CVectorSub( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('CVector length mismatch'); }
    for(var i=this.length-1; i>=0; i--) {
      this.data[i] -= v.data[i];
    }
    return this;
  }

  CVector.prototype.mul = function CVectorMul( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('CVector length mismatch'); }
    for(var i=this.length-1; i>=0; i--) {
      this.data[i] *= v.data[i];
    }
    return this;
  }

  CVector.prototype.div = function CVectorDiv( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('CVector length mismatch'); }
    for(var i=this.length-1; i>=0; i--) {
      this.data[i] /= v.data[i];
    }
    return this;
  }

  CVector.add = function CVectorAdd( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('CVector length mismatch'); }
    var v3 = new CVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] += v2.data[i];
    }
    return v3;
  }

  CVector.sub = function CVectorSub( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('CVector length mismatch'); }
    var v3 = new CVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] -= v2.data[i];
    }
    return v3;
  }

  CVector.mul = function CVectorMul( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('CVector length mismatch'); }
    var v3 = new CVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] *= v2.data[i];
    }
    return v3;
  }

  CVector.div = function CVectorDiv( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('CVector length mismatch'); }
    var v3 = new CVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] /= v2.data[i];
    }
    return v3;
  }

  Spacetime.Linalg.CVector = CVector;

}(window.Spacetime, Math));

window.Spacetime = window.Spacetime || {};

window.Spacetime.Core = (function(Spacetime, Math) {
  'use strict';


  // PhantomJS uses some old something or other that breaks tests
  // because Float64Array doesn't exist. Instead of some polyfill,
  // let's just abstract out the default data type.
  var floatingPointArrayType;
  try {
    floatingPointArrayType =  Float64Array;
  } catch (e) {
    floatingPointArrayType =  Float32Array;
  }


  return {
    floatingPointArrayType: floatingPointArrayType
  }

}(window.Spacetime, Math));

window.Spacetime = window.Spacetime || {};

window.Spacetime.Derivation = (function(Spacetime, Math) {
  'use strict';


  var deriv = function deriv( func, x, dx ) {
    dx = dx===undefined ? 1e-4 : dx;
    var fp = func(x+dx);
    var fm = func(x-dx);

    return (fp - fm) * 0.5 / dx;
  };

  var deriv2 = function deriv2( func, x, dx ) {
    dx = dx===undefined ? 1e-4 : dx;
    var fp = func(x+dx);
    var f0 = func(x);
    var fm = func(x-dx);

    return (fp - 2*f0 + fm)  / dx / dx;
  };

  // Derivative of a complex analytic function:
  var cderiv = function cderiv( func, z, dz ) {
    dz = dz===undefined ? Spacetime.Complex.Real(1e-4) : dz;
    var fp = func(Spacetime.Complex.add(z,dz));
    var fm = func(Spacetime.Complex.sub(z,dz));

    return Spacetime.Complex.sub(fp,fm).fmul(0.5).div(dz);
  };

  var cderiv2 = function cderiv2( func, z, dz ) {
    dz = dz===undefined ? Spacetime.Complex.Real(1e-4) : dz;
    var fp = func(Spacetime.Complex.add(z,dz));
    var f0 = func(z);
    var fm = func(Spacetime.Complex.sub(z,dz));
    return Spacetime.Complex.add(fp,fm).sub(f0.fmul(2)).div(dz).div(dz);
  };

  return {
    deriv: deriv,
    deriv2: deriv2,

    cderiv: cderiv,
    cderiv2: cderiv2,
  };


}(window.Spacetime, Math));

window.Spacetime = window.Spacetime || {};

window.Spacetime.Integration = (function(Spacetime, Math) {
  'use strict';

  var FunctionIntegrators = {
    trapezoidal: function() {
      var h = this.h;
      var sum = 0;
      sum += this.f(this.a,this.data) * 0.5;
      sum += this.f(this.b,this.data) * 0.5;
      for(var i=1; i<this.bins; i++) {
        sum += this.f( this.a + i*h, this.data );
      }
      return sum * h;
    },
    simpson: function(integrator) {
      if( this.bins %2 !== 0 || this.bins < 2 ) {
        throw new RangeError("Simpson Integrator: Invalid number of bins ("+this.bins+"). Bins must be even.");
      }

      var h = this.h;
      var sum = 0;
      sum += this.f(this.a, this.data);
      sum += this.f(this.b, this.data);
      for(var i=1; i<this.bins; i++) {
        sum += (i%2===0 ? 2 : 4 ) * this.f( this.a + i*h, this.data );
      }
      return sum * h / 3;
    },
  };

  var addMethod = function(method) {
    FunctionIntegrators[method] = function() {

      // The initial condition is zero since the integral from x=a to x=a
      // is zero:
      var y = [0];

      // Integrating functions of a single variable is a special case of
      // integrating an ODE, so take the more general ODE integrators and
      // specialize them to function integration:
      var integrand = function(dydt,y,t,data) {
        dydt[0] = this.f(t, data);
      }.bind(this);

      var i = new Spacetime.ODE.Integrator(integrand, y, {
        method: method,
        dt: this.h,
        t: this.a
      });

      i.steps(this.bins);

      return y[0];
    };
  };

  addMethod('euler');
  addMethod('rk2');
  addMethod('rk4');
  FunctionIntegrators.midpoint = FunctionIntegrators.rk2;

  var Integrator = function Integrator( f, a, b, options ) {
    this.f = f;
    this.a = a;
    this.b = b;

    var defaults = {
      bins: 100,
      method: 'simpson'
    };

    Spacetime.Utils.extend(this, defaults, options);
    this.integrator = FunctionIntegrators[this.method].bind(this);
  };

  Object.defineProperties( Integrator.prototype, {
    h: {
      get: function() {
        return (this.b - this.a) / this.bins;
      }
    }
  });

  Integrator.prototype.integrate = function(method) {
    return this.integrator(this);
  };

  var Integrate = function Integrate( f, a, b, options ) {
    return (new Integrator(f,a,b,options)).integrate();
  };

  return {
    Integrator: Integrator,
    Integrate: Integrate
  };

}(window.Spacetime, Math));


window.Spacetime = window.Spacetime || {};

window.Spacetime.ODE = (function(Spacetime, Math) {

  var Workspace = function Workspace( count, n ) {
    this.count = count;
    // TODO: Convert this to typed arrays:
    for(var i=0; i<this.count; i++) {
      var label = 'w' + i;
      this[label] = new Array( n );
    }
  };

  Workspace.prototype.mixInto = function mixInto(integrator) {
    this.w = this.w || [];
    for(var i=0; i<this.count; i++) {
      var label = 'w' + i;
      integrator[label] = this[label];
    }
  };


  var Integrators = {

    euler: {

      workspaceCount: 1,

      stepper: function EulerStepper() {
        this.f( this.w0, this.y, this.t, this.data );
        for(var i=0; i<this.n; i++) {
          this.y[i] += this.w0[i] * this.dt;
        }
        this.t += this.dt;
      }

    },

    midpoint: {

      workspaceCount: 2,

      stepper: function MidpointStepper() {
        this.f( this.w0, this.y, this.t, this.data );
        for(var i=0; i<this.n; i++) {
          this.w1[i] = this.y[i] + this.dt * 0.5 * this.w0[i];
        }
        this.f( this.w0, this.w1, this.t + this.dt * 0.5, this.data );
        for(i=0; i<this.n; i++) {
          this.y[i] += this.w0[i] * this.dt;
        }
        this.t += this.dt;
      }

    },

    rk4: {

      workspaceCount: 5,

      stepper: function MidpointStepper() {
        var i, n = this.n, t = this.t,
            y  = this.y,  f  = this.f,
            dt = this.dt, w = this.w0,
            k1 = this.w1, k2 = this.w2,
            k3 = this.w3, k4 = this.w4,
            data = this.data;

        f(k1, y, t, data);
        for(i=0;i<n;i++) {
          w[i] = y[i] + 0.5*k1[i]*dt;
        }
        f(k2, w, t+dt*0.5, data);
        for(i=0;i<n;i++) {
          w[i] = y[i] + 0.5*k2[i]*dt;
        }
        f(k3, w, t+dt*0.5, data);
        for(i=0;i<n;i++) {
          w[i] = y[i] + k3[i]*dt;
        }
        f(k4, w, t+dt, data);
        for(i=0;i<n;i++) {
          y[i] += dt/3*(0.5*(k1[i]+k4[i])+k2[i]+k3[i]);
        }

        this.t += this.dt;
      }

    }
  };

  // Aliases:
  Integrators.rk2 = Integrators.midpoint;

  var Integrator = function Integrator ( f, y, options ) {
    this.f = f;
    this.y = y;
    this.n = y===undefined ? 0 : y.length;

    var defaults = {
      method: 'euler',
      dt: 1,
      t: 0
    };

    this.options = Spacetime.Utils.extend(this, defaults, options);

    this.integrator = Integrators[this.method];
    this.workspace = new Workspace( this.integrator.workspaceCount, this.n );
    this.workspace.mixInto(this);
    this.step = this.integrator.stepper.bind(this);
  };

  Integrator.prototype.steps = function(n) {
    for(var i=0; i<n; i++) { this.step(); }
  };

  return {
    Integrator: Integrator
  };

})(window.Spacetime, Math);

window.Spacetime = window.Spacetime || {};

window.Spacetime.PathIntegration = (function(Spacetime, Math, Complex) {
  'use strict';


  var defaults = {
    method: 'rk4',
    steps: 10
  };

  var Integrator = function Integrator ( f, path, options ) {

    Spacetime.Utils.extend(this, defaults, options);

    this.y = [0,0];

    this.odeFunc = function(dfdt, y, t) {
      var z = path.z(t);
      var dz = path.dz(t);
      var g = f(z);

      dfdt[0] = g.real * dz.real - g.imag * dz.imag;
      dfdt[1] = g.imag * dz.real + g.real * dz.imag;
    };

    this.ode = new Spacetime.ODE.Integrator( this.odeFunc, this.y, {
      method: this.method,
      t: path.s1,
      dt: (path.s2 - path.s1) / this.steps
    });

  };

  Integrator.prototype.integrate = function() {
    this.ode.steps(this.steps);
    return this;
  };

  var Integrate = function(f, path, options) {
    var i = new Integrator(f, path, options).integrate();
    return Spacetime.Complex.rect(i.y[0], i.y[1]);
  };

  var Path = function Path( z, dz, s1, s2 ) {
    var cderiv = Spacetime.Derivation.cderiv;

    // Use numerical differentiation if no derivative function is provided:
    dz = dz || function(s) { return cderiv(z, z(s)); };

    this.dz = dz;
    this.z = z;
    this.s1 = s1;
    this.s2 = s2;

  };

  Path.Circle = function(center, radius) {
    var Complex = Spacetime.Complex;
    var z = function(s) { return Complex.polar(radius,s).add(center); };
    var dz = function(s) { return Complex.polar(radius,s+0.5*Math.PI).fmul(radius); };

    return new Path( z, dz, 0, Math.PI*2 );
  };


  
  return {
    Integrator: Integrator,
    Integrate: Integrate,
    Path: Path
  };


}(window.Spacetime, Math, window.Complex));

window.Spacetime = window.Spacetime || {};

window.Spacetime.Polynomial = (function(Spacetime, Math) {
  'use strict';

  var cloneNumberArray = function cloneNumberArray(arr) {
    var copy = [];
    var obj;
    for(var i=0; i<arr.length; i++) {
      obj = arr[i];
      if( null==obj || 'object' !== typeof obj ) {
        copy[i] = obj;
      } else {
        copy[i] = Spacetime.Complex.create(obj);
      }
    }
    return copy;
  };

  var CPoly = function CPoly() {
    this.a = arguments[0] || [];
  };

  CPoly.prototype.copy = function PolynomialCopy () {
    return new CPoly(cloneNumberArray(this.a));
  };

  CPoly.create = function PolynomialCreate() {
    if( arguments.length === 1 && arguments[0] instanceof CPoly ) {
      return arguments[0].copy();
    } else if( arguments.length === 1 && arguments[0] instanceof Array ) {
      return new CPoly(cloneNumberArray(arguments[0]));
    } else {
      return new CPoly( cloneNumberArray(Array.apply(this,arguments)) );
    }
  };

  Object.defineProperties(CPoly.prototype,{
    order: {
      get: function() {
        return this.a.length-1;
      }
    }
  });

  CPoly.prototype.toString = function() {
    var str = '';
    var o = this.order;
    for(var i=0; i<=o; i++) {
      str += this.a[i].toString();
      if( i > 0 ) { str += 'z';   }
      if( i > 1 ) { str += '^'+i; }
      if( i < o ) { str += ' + '; }
    }
    return str;
  };

  CPoly.prototype.evaluate = function CPolyEval (z) {
    var o = this.order;
    var zn = Spacetime.Complex.ONE;
    var r = this.a[0];
    for(var i=1;i<=o;i++) {
      r.add( Spacetime.Complex.mul( zn.mul(z), this.a[i] ) );
    }
    return r;
  };

  CPoly.add = function CPolyAdd (p1, p2) {
    var order = Math.max(p1.order, p2.order);
    var p = new CPoly();
    var c, i;
    for(i=0; i<=order; i++) {
      c = Spacetime.Complex.ZERO;
      if( p1.a[i] !== undefined ) { c.add(p1.a[i]); }
      if( p2.a[i] !== undefined ) { c.add(p2.a[i]); }
      p.a[i] = c;
    }
    return p;
  };

  CPoly.diff = function CPolyDiff (p) {
    var i, o=p.order, p2 = new CPoly();
    for(i=1; i<=o; i++) {
      p2.a[i-1] = Spacetime.Complex.fmul(p.a[i],i);
    }
    return p2;
  };

  CPoly.prototype.diff = function CPolyDiffInPlace () {
    this.a.shift();
    var i, o=this.order;
    for(i=1; i<=o; i++) {
      this.a[i].fmul(i+1);
    }
    return this;
  };

  CPoly.mul = function(p1,p2) {
    var i,j;
    var o1 = p1.order;
    var o2 = p2.order;
    var o3 = o1 + o2;
    var p3 = new CPoly();

    // TODO: use typed arrays everywhere
    for(i=0; i<o3+1; i++) { p3.a[i] = Spacetime.Complex.ZERO; }

    for(i=0; i<=o1; i++) {
      for(j=0; j<=o2; j++) {
        p3.a[i+j].add( Spacetime.Complex.mul(p1.a[i],p2.a[j]) );
      }
    }

    return p3;
  };


  CPoly.cmul = function(p,z) {
    var p2 = p.copy();
    for(var i=p2.order; i>=0; i--) { p2.a[i].mul(z); }
    return p2;
  };

  return {
    CPoly: CPoly
  };

}(window.Spacetime, Math));

/*var window.Spacetime = window.Spacetime || {};

window.Spacetime.mixin = function( destObject ) {
  var props = ['on', 'off', 'once', 'trigger'];

  for(var i=props.length-1; i>=0; --i) {
    destObject.prototype[props[i]] = window.Spacetime.prototype[props[i]];
  }
};
window.Spacetime = (function(window) {
  'use strict';


  var EV = {
    on: function() {
    }
  };


  return {
    Mixin: function(object) {

    }
  };

}(this));
*/

window.Spacetime = window.Spacetime || {};

window.Spacetime.Utils = {
  extend:
    function extend() {
      for(var i=1; i<arguments.length; i++) {
        for(var key in arguments[i]) {
          if(arguments[i].hasOwnProperty(key)) {
            arguments[0][key] = arguments[i][key];
          }
        }
      }
      return arguments[0];
    }
};

window.Spacetime = window.Spacetime || {};
window.Spacetime.Linalg = window.Spacetime.Linalg || {};


(function(Spacetime, Math) {
  'use strict';

  var defaults = {
    type: Spacetime.Core.floatingPointArrayType
  };

  var RVector = function RVector(data, options) {
    var opts = Spacetime.Utils.extend({}, defaults, options);
    this.type = opts.type;
    this.data = new (opts.type)( data );
  };

  RVector.prototype.toString = function RVectorToString() {
    var str = '[';
    var l = this.length;
    for(var i=0; i<l; i++) {
      str += this.data[i];
      if( i<l-1 ) {
        str += ', ';
      }
    }
    str += ']'
    return str;
  };

  Object.defineProperties(RVector.prototype,{
    length: {
      get: function() {
        return this.data.length;
      }
    },
    norm: {
      get: function() {
        var sum = 0;
        for(var i=this.data.length-1; i>=0; i--) {
          sum += this.data[i]*this.data[i];
        }
        return Math.sqrt(sum);
      }
    },
    squaredNorm: {
      get: function() {
        var sum = 0;
        for(var i=this.data.length-1; i>=0; i--) {
          sum += this.data[i]*this.data[i];
        }
        return sum;
      }
    }
  });

  RVector.prototype.add = function RVectorInPlaceAdd( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('RVector length mismatch'); }
    for(var i=this.length-1; i>=0; i--) {
      this.data[i] += v.data[i];
    }
    return this;
  }

  RVector.prototype.sub = function RVectorInPlaceSub( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('RVector length mismatch'); }
    for(var i=this.length-1; i>=0; i--) {
      this.data[i] -= v.data[i];
    }
    return this;
  }

  RVector.prototype.mul = function RVectorInPlaceMul( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('RVector length mismatch'); }
    for(var i=this.length-1; i>=0; i--) {
      this.data[i] *= v.data[i];
    }
    return this;
  }

  RVector.prototype.div = function RVectorInPlaceDiv( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('RVector length mismatch'); }
    for(var i=this.length-1; i>=0; i--) {
      this.data[i] /= v.data[i];
    }
    return this;
  }

  RVector.add = function RVectorAdd( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('RVector length mismatch'); }
    var v3 = new RVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] += v2.data[i];
    }
    return v3;
  }

  RVector.sub = function RVectorSub( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('RVector length mismatch'); }
    var v3 = new RVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] -= v2.data[i];
    }
    return v3;
  }

  RVector.mul = function RVectorMul( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('RVector length mismatch'); }
    var v3 = new RVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] *= v2.data[i];
    }
    return v3;
  }

  RVector.div = function RVectorDiv( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('RVector length mismatch'); }
    var v3 = new RVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] /= v2.data[i];
    }
    return v3;
  }

  Spacetime.Linalg.RVector = RVector;

}(window.Spacetime, Math));
