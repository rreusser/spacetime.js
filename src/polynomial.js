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
