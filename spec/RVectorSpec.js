'use strict';

describe("Real Vectors", function() {

  var RVector = window.Spacetime.Linalg.RVector;

  describe("Initializing vectors",function() {

    it("Initializes a vector with a length",function() {
      var x = new RVector(10);
      expect( x.data[0] ).toBe( 0 );
      expect( x.data[9] ).toBe( 0 );
      expect( x.data.length ).toBe( 10 );
    });

    it("Initializes a vector from an array",function() {
      var x = new RVector([1,2,3]);
      expect( x.data[0] ).toBe( 1 );
      expect( x.data[1] ).toBe( 2 );
      expect( x.data[2] ).toBe( 3 );
      expect( x.data.length ).toBe( 3 );
    });

    it("Initializes an Array vector",function() {
      var x = new RVector(10, {type: Array});
      expect(x.type).toBe(Array);
    });

    it("Initializes an Int16Array vector",function() {
      var x = new RVector(10, {type: Int16Array});
      expect(x.type).toBe(Int16Array);
    });

    it("Initializes a Float32Array vector",function() {
      var x = new RVector(10, {type: Float32Array});
      expect(x.type).toBe(Float32Array);
    });

  });

  describe("Output",function() {
    it("outputs the vector as a string",function() {
      expect( (new RVector([1,2,3])).toString() ).toBe("[1, 2, 3]");
    });
  });

  describe("Properties",function() {
    it("has a length property",function() {
      var x = new RVector(5);
      expect(x.length).toBe(5);
    });

    it("has a norm",function() {
      var x = new RVector([3,4]);
      expect(x.norm).toBeCloseTo(5);
    });

    it("has a squared norm",function() {
      var x = new RVector([3,4]);
      expect(x.squaredNorm).toBeCloseTo(25);
    });
  });

  describe("RVector algebra",function() {
    var v1, v2;

    beforeEach(function() {
      v1 = new RVector([1,2,3]);
      v2 = new RVector([4,5,6]);
    });
    
    it("adds two vectors",function() {
      var prod = RVector.add(v1,v2);
      var expected = new RVector([5,7,9]);
      expect( prod ).toBeRVectorCloseTo( expected );
    });

    it("subtracts two vectors",function() {
      var prod = RVector.sub(v2,v1);
      var expected = new RVector([3,3,3]);
      expect( prod ).toBeRVectorCloseTo( expected );
    });

    it("performs per-element multiplication of vectors",function() {
      var prod = RVector.mul(v1,v2);
      var expected = new RVector([4,10,18]);
      expect( prod ).toBeRVectorCloseTo( expected );
    });

    it("performs per-element division of vectors",function() {
      var prod = RVector.div(v1,v2);
      var expected = new RVector([0.25, 0.4, 0.5]);
      expect( prod ).toBeRVectorCloseTo( expected );
    });

    it("fails to add vectors of different lengths",function() {
      expect(function() {
        RVector.add(v1, new RVector([5]) );
      }).toThrowError( TypeError );
    });

  });

  describe("In-place vector algebra",function() {
    var v1, v2;

    beforeEach(function() {
      v1 = new RVector([1,2,3]);
      v2 = new RVector([4,5,6]);
    });
    
    it("adds two vectors",function() {
      v1.add(v2);
      expect( v1 ).toBeRVectorCloseTo( new RVector([5,7,9]) );
    });

    it("subtracts two vectors",function() {
      v2.sub(v1);
      expect( v2 ).toBeRVectorCloseTo( new RVector([3,3,3]) );
    });

    it("performs per-element multiplication of vectors",function() {
      v1.mul(v2);
      expect( v1 ).toBeRVectorCloseTo( new RVector([4,10,18]) );
    });

    it("performs per-element division of vectors",function() {
      v1.div(v2);
      expect( v1 ).toBeRVectorCloseTo( new RVector([0.25, 0.4, 0.5]) );
    });

    it("fails to add a vector with a different length",function() {
      expect(function() {
        v1.add( new RVector([5]) );
      }).toThrowError( TypeError );
    });


  });
});
