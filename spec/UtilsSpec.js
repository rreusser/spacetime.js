
'use strict';

describe("Utilities", function() {

  var Utils = Spacetime.Utils;

  describe("extend()",function() {

    it("extends an object with by a key/value",function() {
      var x = Utils.extend({}, {
        foo: 'bar'
      });

      expect(x).toEqual(jasmine.objectContaining({
        foo: 'bar'
      }));
    });

    it("extends an object by multiple key/value pairs",function() {
      var x = Utils.extend({}, {
        foo: 'bar',
        baz: 'bop'
      });

      expect(x).toEqual(jasmine.objectContaining({
        foo: 'bar',
        baz: 'bop'
      }));
    });

    it("extends an object by multiple objects",function() {
      var x = Utils.extend({}, {foo: 'bar'}, {baz: 'bop'} );

      expect(x).toEqual(jasmine.objectContaining({
        foo: 'bar',
        baz: 'bop'
      }));
    });

  });


});
