'use strict';

describe("Spacetime", function() {

  xit("mixes methods into the prototype of another object",function() {
    var x = function() {};
    var y = Spacetime.Mixin(x);

    expect(y.on).toBeDefined();
  });

});
