window.Spacetime = window.Spacetime || {};

window.Spacetime.Integration = (function(Spacetime, Math) {
  'use strict';

  var FunctionIntegrators = {
    trapezoidal: function(integrator) {
      var h = integrator.h;
      var sum = 0;
      sum += integrator.f(integrator.a) * 0.5;
      sum += integrator.f(integrator.b) * 0.5;
      for(var i=1; i<integrator.bins; i++) {
        sum += integrator.f( integrator.a + i*h );
      }
      return sum * h;
    },
    simpson: function(integrator) {
      if( integrator.bins %2 !== 0 || integrator.bins < 2 ) {
        throw new RangeError("Simpson Integrator: Invalid number of bins ("+integrator.bins+"). Bins must be even.");
      }

      var h = integrator.h;
      var sum = 0;
      sum += integrator.f(integrator.a);
      sum += integrator.f(integrator.b);
      for(var i=1; i<integrator.bins; i++) {
        sum += (i%2===0 ? 2 : 4 ) * integrator.f( integrator.a + i*h );
      }
      return sum * h / 3;
    }
  };

  var Integrator = function Integrator( f, a, b, options ) {
    this.f = f;
    this.a = a;
    this.b = b;

    var defaults = {
      bins: 100,
      method: 'simpson'
    };

    Spacetime.Utils.extend(this, defaults, options);
    this.integrator = FunctionIntegrators[this.method];
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
