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
