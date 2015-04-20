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
