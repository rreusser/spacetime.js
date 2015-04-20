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
