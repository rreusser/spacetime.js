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
    str += ']';
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
  };

  RVector.prototype.sub = function RVectorInPlaceSub( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('RVector length mismatch'); }
    for(var i=this.length-1; i>=0; i--) {
      this.data[i] -= v.data[i];
    }
    return this;
  };

  RVector.prototype.mul = function RVectorInPlaceMul( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('RVector length mismatch'); }
    for(var i=this.length-1; i>=0; i--) {
      this.data[i] *= v.data[i];
    }
    return this;
  };

  RVector.prototype.div = function RVectorInPlaceDiv( v ) {
    var l = v.length;
    if(this.length !== l) { throw new TypeError('RVector length mismatch'); }
    for(var i=this.length-1; i>=0; i--) {
      this.data[i] /= v.data[i];
    }
    return this;
  };

  RVector.add = function RVectorAdd( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('RVector length mismatch'); }
    var v3 = new RVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] += v2.data[i];
    }
    return v3;
  };

  RVector.sub = function RVectorSub( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('RVector length mismatch'); }
    var v3 = new RVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] -= v2.data[i];
    }
    return v3;
  };

  RVector.mul = function RVectorMul( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('RVector length mismatch'); }
    var v3 = new RVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] *= v2.data[i];
    }
    return v3;
  };

  RVector.div = function RVectorDiv( v1, v2 ) {
    var l1 = v1.length, l2 = v2.length;
    if(l1 !== l2) { throw new TypeError('RVector length mismatch'); }
    var v3 = new RVector(v1.data);
    for(var i=l1-1; i>=0; i--) {
      v3.data[i] /= v2.data[i];
    }
    return v3;
  };

  Spacetime.Linalg.RVector = RVector;

}(window.Spacetime, Math));
