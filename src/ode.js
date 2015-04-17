window.Spacetime = window.Spacetime || {};

window.Spacetime.ODE = (function(Spacetime, Math) {

  var Workspace = function Workspace( count, n ) {
    this.count = count;
    // TODO: Convert this to typed arrays:
    for(var i=0; i<this.count; i++) {
      var label = 'w' + (i+1);
      this[label] = new Array( n );
    }
  };

  Workspace.prototype.mixInto = function mixInto(integrator) {
    this.w = this.w || [];
    for(var i=0; i<this.count; i++) {
      var label = 'w' + (i+1);
      integrator[label] = this[label];
    }
  };


  var Integrators = {
    euler: {
      workspaceCount: 1,
      stepper: function EulerStepper() {
        this.f( this.w1, this.y, this.t, this.data );
        for(var i=0; i<this.n; i++) {
          this.y[i] += this.w1[i] * this.dt;
        }
      }
    },
    midpoint: {
      workspaceCount: 2,
      stepper: function MidpointStepper() {
        this.f( this.w1, this.y, this.t );
        for(var i=0; i<this.n; i++) {
          this.w2[i] = this.y[i] + this.dt * 0.5 * this.w1[i];
        }
        this.f( this.w1, this.w2, this.t + this.dt * 0.5 );
        for(i=0; i<this.n; i++) {
          this.y[i] += this.w1[i] * this.dt;
        }
      }
    },
    rk4: {
      workspaceCount: 5,
      stepper: function MidpointStepper() {

        /*this.f( this.w1, this.y, this.t );

        this.f( this.w2, this.y, 
        k1 = deriv(y[i],t);

        for(j=0;j<l;j++) w[j] = y[i][j] + 0.5*k1[j]*dt;

        k2 = deriv(w, t+dt*0.5);

        for(j=0;j<l;j++) w[j] = y[i][j] + 0.5*k2[j]*dt;

        k3 = deriv(w, t+dt*0.5);

        for(j=0;j<l;j++) w[j] = y[i][j] + k3[j]*dt;

        k4 = deriv(w, t+dt);

        for(var j=0; j<l; j++) y[i+1][j] = y[i][j] +
            dt/3.0*(0.5*(k1[j]+k4[j])+k2[j]+k3[j]);

        }
        this.f( this.w1, this.y, this.t );
        for(var i=0; i<this.n; i++) {
          this.w2[i] = this.y[i] + this.dt * 0.5 * this.w1[i];
        }
        this.f( this.w1, this.w2, this.t + this.dt * 0.5 );
        for(i=0; i<this.n; i++) {
          this.y[i] += this.w1[i] * this.dt;
        }*/
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

  return {
    Integrator: Integrator
  };

})(window.Spacetime, Math);
