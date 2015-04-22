'use strict';

describe("Complex vectors", function() {

  var CVector = window.Spacetime.Linalg.CVector;
  var Complex = window.Spacetime.Complex;

  describe("Initializing vectors",function() {

    it("Initializes a vector with a length",function() {
      var x = new CVector(10);
      expect( x.data[0] ).toBe( 0 );
      expect( x.data[19] ).toBe( 0 );
      expect( x.data.length ).toBe( 20 );
    });

    it("Initializes a vector from an array",function() {
      var x = new CVector([1,2,3,5]);
      expect( x.data[0] ).toBe( 1 );
      expect( x.data[1] ).toBe( 2 );
      expect( x.data[2] ).toBe( 3 );
      expect( x.data[3] ).toBe( 5 );
      expect( x.data.length ).toBe( 4 );
    });

    it("Fails if passed an odd-lengthed array of real/imaginary pairs",function() {
      expect(function() {
        new CVector([1,2,3]);
      }).toThrowError( TypeError );
    });

    it("Initializes an Array vector",function() {
      var x = new CVector(10, {type: Array});
      expect(x.type).toBe(Array);
    });

    it("Initializes an Int16Array vector",function() {
      var x = new CVector(10, {type: Int16Array});
      expect(x.type).toBe(Int16Array);
    });

    it("Initializes a Float32Array vector",function() {
      var x = new CVector(10, {type: Float32Array});
      expect(x.type).toBe(Float32Array);
    });

  });

  describe("Getters/setters",function() {
    var v;

    beforeEach(function() {
      v = new CVector(5);
    });

    it("returns a complex number when a value is queried",function() {
      expect( v.get(0) instanceof Complex ).toBe( true );
    });

    it("sets the value of an element from a [real,imag] pair",function() {
      v.set(1, [2,3] );
      expect( v.data[2] ).toBeCloseTo(2);
      expect( v.data[3] ).toBeCloseTo(3);
    });

    it("sets the value of an element from a complex number",function() {
      v.set(1, new Complex(2,3) );
      expect( v.data[2] ).toBeCloseTo(2);
      expect( v.data[3] ).toBeCloseTo(3);
    });

  });

  describe("Output",function() {
    it("outputs the vector as a string",function() {
      expect( (new CVector([1,2,3,4])).toString() ).toBe("[(1+2i), (3+4i)]");
    });
  });

  describe("Properties",function() {
    it("has a length property",function() {
      var x = new CVector(5);
      expect(x.length).toBe(5);
    });

    it("has a norm",function() {
      var x = new CVector([5,4]);
      expect(x.norm).toBeCloseTo(3);
    });

    it("has a squared norm",function() {
      var x = new CVector([5,4]);
      expect(x.squaredNorm).toBeCloseTo(9);
    });
  });

  describe("CVector algebra",function() {
    var v1, v2;

    beforeEach(function() {
      v1 = new CVector([1,2,3,4]);
      v2 = new CVector([5,6,7,8]);
    });
    
    it("adds two vectors",function() {
      var result = CVector.add(v1,v2);
      var expected = new CVector([6,8,10,12]);
      expect( result ).toBeCVectorCloseTo( expected );
    });

    it("subtracts two vectors",function() {
      var result = CVector.sub(v2,v1);
      var expected = new CVector([4,4,4,4]);
      expect( result ).toBeCVectorCloseTo( expected );
    });

    it("performs per-element multiplication of vectors",function() {
      var result = CVector.mul(v1,v2);
      var expected = new CVector([1*5-2*6, 1*6+2*5, 3*7-4*8, 3*8+4*7]);
      expect( result ).toBeCVectorCloseTo( expected );
    });

    it("performs per-element division of vectors",function() {
      var result = CVector.div(v2,v1);
      var expected = new CVector([ 3.4, -0.8 , 2.12, -0.16 ])
      expect( result ).toBeCVectorCloseTo( expected );
    });

    it("fails to add vectors of different lengths",function() {
      expect(function() {
        CVector.add(v1, new CVector([5,7]) );
      }).toThrowError( TypeError );
    });

  });

  describe("In-place vector algebra",function() {
    var v1, v2;

    beforeEach(function() {
      v1 = new CVector([1,2,3,4]);
      v2 = new CVector([5,6,7,8]);
    });
    
    it("adds two vectors",function() {
      v1.add(v2);
      expect( v1 ).toBeCVectorCloseTo( new CVector([6,8,10,12]) );
    });

    it("subtracts two vectors",function() {
      v2.sub(v1);
      expect( v2 ).toBeCVectorCloseTo( new CVector([4,4,4,4]) );
    });

    it("performs per-element multiplication of vectors",function() {
      v1.mul(v2);
      var expected = new CVector([1*5-2*6, 1*6+2*5, 3*7-4*8, 3*8+4*7]);
      expect( v1 ).toBeCVectorCloseTo( expected );
    })

    it("performs per-element division of vectors",function() {
      v2.div(v1);
      var expected = new CVector([ 3.4, -0.8 , 2.12, -0.16 ])
      expect( v2 ).toBeCVectorCloseTo( expected );
    });

    it("fails to add a vector with a different length",function() {
      expect(function() {
        v1.add( new CVector([5]) );
      }).toThrowError( TypeError );
    });


  });
});
