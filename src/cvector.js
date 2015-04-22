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

    if( typeof data === 'number' ) {
      this.data = new (opts.type)( data * 2 );
    } else {
      if( data.length % 2 !== 0 ) { throw new TypeError(); }
      this.data = new (opts.type)( data );
    }
  };

  CVector.prototype.toString = function CVectorToString() {
    var str = '[';
    var l = this.length;
    for(var i=0; i<l; i++) {
      str += this.get(i);
      if( i<l-1 ) {
        str += ', ';
      }
    }
    str += ']';
    return str;
  };

  CVector.prototype.get = function CVectorGet (i) {
    return new Spacetime.Complex( this.data[2*i], this.data[2*i+1] );
  };

  CVector.prototype.set = function CVectorSet () {
    var i = arguments[0];
    var z = Spacetime.Complex.create.apply(this, Array.prototype.slice.call(arguments, 1));
    this.data[2*i] = z.real;
    this.data[2*i+1] = z.imag;
    return this;
  };

  Object.defineProperties(CVector.prototype,{
    length: {
      get: function() {
        return Math.floor(this.data.length/2);
      }
    },
    norm: {
      get: function() {
        var sum = 0;
        for(var i=this.length-1; i>=0; i--) {
          sum += this.data[2*i]*this.data[2*i] - this.data[2*i+1]*this.data[2*i+1];
        }
        return Math.sqrt(sum);
      }
    },
    squaredNorm: {
      get: function() {
        var sum = 0;
        for(var i=this.length-1; i>=0; i--) {
          sum += this.data[2*i]*this.data[2*i] - this.data[2*i+1]*this.data[2*i+1];
        }
        return sum;
      }
    }
  });

  CVector.prototype.add = function CVectorAdd( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('CVector length mismatch'); }
    for(var i=this.data.length-1; i>=0; i--) {
      this.data[i] += v.data[i];
    }
    return this;
  };

  CVector.prototype.merge = function CVectorAdd( v ) {
  };

  CVector.prototype.sub = function CVectorSub( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('CVector length mismatch'); }
    for(var i=this.data.length-1; i>=0; i--) {
      this.data[i] -= v.data[i];
    }
    return this;
  };

  CVector.prototype.mul = function CVectorMul( v2 ) {
    var l = v2.length;
    if(this.length !== l) { throw new TypeError('CVector length mismatch'); }
    var d1=this.data, d2=v2.data, a;
    for(var i=d1.length-2; i>=0; i-=2) {
      a = d1[i];
      d1[i  ] = a * d2[i  ] - d1[i+1] * d2[i+1];
      d1[i+1] = a * d2[i+1] + d1[i+1] * d2[i  ];
    }
    return this;
  };

  CVector.prototype.div = function CVectorDiv( v2 ) {
    var l = v2.length;
    if(this.length !== l) { throw new TypeError('CVector length mismatch'); }
    var d1=this.data, d2=v2.data, a, m;
    for(var i=d1.length-2; i>=0; i-=2) {
      a = d1[i];
      m = d2[i]*d2[i] + d2[i+1]*d2[i+1];
      d1[i  ] = (a * d2[i  ] + d1[i+1] * d2[i+1]) / m;
      d1[i+1] = (d1[i+1] * d2[i  ] - a * d2[i+1]) / m;
    }
    return this;
  };

  CVector.add = function CVectorAdd( v1, v2 ) {
    var l1 = v1.data.length, l2 = v2.data.length;
    if(l1 !== l2) { throw new TypeError('CVector length mismatch'); }
    var v3 = new CVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] += v2.data[i];
    }
    return v3;
  };

  CVector.sub = function CVectorSub( v1, v2 ) {
    var l1 = v1.data.length, l2 = v2.data.length;
    if(l1 !== l2) { throw new TypeError('CVector length mismatch'); }
    var v3 = new CVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] -= v2.data[i];
    }
    return v3;
  };

  CVector.mul = function CVectorMul( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('CVector length mismatch'); }
    var v3 = new CVector(v1.length);
    var d1=v1.data, d2=v2.data, d3=v3.data;
    for(var i=d1.length-2; i>=0; i-=2) {
      d3[i  ] = d1[i] * d2[i  ] - d1[i+1] * d2[i+1];
      d3[i+1] = d1[i] * d2[i+1] + d1[i+1] * d2[i  ];
    }
    return v3;
  };

  CVector.div = function CVectorDiv( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('CVector length mismatch'); }
    var m = 0;
    var v3 = new CVector(v1.length);
    var d1=v1.data, d2=v2.data, d3=v3.data, i2;
    for(var i=d1.length-2; i>=0; i-=2) {
      m = d2[i]*d2[i] + d2[i+1]*d2[i+1];
      d3[i  ] = (d1[i  ] * d2[i  ] + d1[i+1] * d2[i+1]) / m;
      d3[i+1] = (d1[i+1] * d2[i  ] - d1[i  ] * d2[i+1]) / m;
    }
    return v3;
  };

  Spacetime.Linalg.CVector = CVector;

}(window.Spacetime, Math));
