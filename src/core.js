window.Spacetime = window.Spacetime || {};

window.Spacetime.Core = (function(Spacetime, Math) {
  'use strict';


  // PhantomJS uses some old something or other that breaks tests
  // because Float64Array doesn't exist. Instead of some polyfill,
  // let's just abstract out the default data type.
  var floatingPointArrayType;
  try {
    floatingPointArrayType =  Float64Array;
  } catch (e) {
    floatingPointArrayType =  Float32Array;
  }


  return {
    floatingPointArrayType: floatingPointArrayType
  };

}(window.Spacetime, Math));
