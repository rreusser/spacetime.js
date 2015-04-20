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
