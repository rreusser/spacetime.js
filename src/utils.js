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
