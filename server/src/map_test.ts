import * as assert from 'assert';
import { makeMutableMap } from './map';


describe('map', function() {
    const testMap = makeMutableMap();

    it('hasKey', function() {
        //0-1-many: base case
        assert.deepStrictEqual(testMap.hasKey('dog'), false); //empty map
        testMap.setVal('dog', 'gorilla');
        assert.deepStrictEqual(testMap.hasKey('dog'), true); //one element map
        testMap.setVal('cat', 'banana');
        assert.deepStrictEqual(testMap.hasKey('cat'), true); //two element map

        //0-1-many: 1-deep
        assert.deepStrictEqual(testMap.hasKey('dog'), true); //two element map
        testMap.clearMap();
        testMap.setVal('dog', 'gorilla');
        assert.deepStrictEqual(testMap.hasKey('puggy'), false); //one element map does not contain
        
        
        testMap.setVal('cat', 'banana');
        testMap.setVal('monkey', 'grape');
        testMap.setVal('orange', 'orangutan');
        testMap.setVal('super', 'man');
        // 0-1-many: 2+ calls
        assert.deepStrictEqual(testMap.hasKey('orange'), true);
        assert.deepStrictEqual(testMap.hasKey('boggger'), false);

    });

    

    it('getVal', function() {
        testMap.clearMap();
        //0-1-many: base case
        assert.deepStrictEqual(testMap.getVal('dog'), undefined); //empty map
        testMap.setVal('dog', 'gorilla');
        assert.deepStrictEqual(testMap.getVal('dog'), 'gorilla'); //one element map
        testMap.setVal('cat', 'banana');
        assert.deepStrictEqual(testMap.getVal('cat'), 'banana'); //two element map

        //0-1-many: 1-deep
        assert.deepStrictEqual(testMap.getVal('dog'), 'gorilla'); //two element map
        testMap.clearMap();
        testMap.setVal('dog', 'gorilla'); 
        assert.deepStrictEqual(testMap.getVal('puggy'), undefined); //one element map does not contain
        
        testMap.setVal('cat', 'banana');
        testMap.setVal('monkey', 'grape');
        testMap.setVal('orange', 'orangutan');
        testMap.setVal('super', 'man');
        // 0-1-many: 2+ calls
        assert.deepStrictEqual(testMap.getVal('orange'), 'orangutan');
        assert.deepStrictEqual(testMap.getVal('bogggggger'), undefined);
    });

    it('setVal', function() {
        testMap.clearMap();
        testMap.setVal('cat', 'banana');
        testMap.setVal('monkey', 'grape');
        testMap.setVal('orange', 'orangutan');
        testMap.setVal('super', 'man');
        testMap.setVal('dog', 'gorilla');

        // when the key already exists
        assert.deepStrictEqual(testMap.setVal('dog', 'newGorilla'), true);
        assert.deepStrictEqual(testMap.getVal('dog'), 'newGorilla');

        // when key does not exist
        assert.deepStrictEqual(testMap.setVal('boogie', 'newMonkey'), false);
        assert.deepStrictEqual(testMap.getVal('boogie'), 'newMonkey');

    });

    it('clearMap', function() {
        testMap.clearMap();
        testMap.setVal('cat', 'banana');
        testMap.setVal('monkey', 'grape');
        testMap.setVal('orange', 'orangutan');
        testMap.setVal('super', 'man');
        testMap.setVal('dog', 'gorilla');
        
        // check if map if filled
        assert.deepStrictEqual(testMap.hasKey('dog'), true);
        assert.deepStrictEqual(testMap.hasKey('orange'), true);

        testMap.clearMap();

        // check that map no longer contains keys
        assert.deepStrictEqual(testMap.hasKey('dog'), false);
        assert.deepStrictEqual(testMap.hasKey('orange'), false);


    });

    it('getKeys', function() {
        assert.deepStrictEqual(testMap.getKeys(), []); // empty map

        testMap.setVal('cat', 'banana');
        testMap.setVal('monkey', 'grape');

        assert.deepStrictEqual(testMap.getKeys(), ["cat", "monkey"]); //regular map

        testMap.setVal('orange', 'orangutan');
        testMap.setVal('super', 'man');
        testMap.setVal('dog', 'gorilla');

        assert.deepStrictEqual(testMap.getKeys(), ["cat", "monkey", "orange", "super", "dog"]); // regular map

        testMap.setVal('dog', 'cool');
        testMap.setVal('cat', 'apple');

        assert.deepStrictEqual(testMap.getKeys(), ["cat", "monkey", "orange", "super", "dog"]); // correct keys after setting new values

        testMap.clearMap();
        assert.deepStrictEqual(testMap.getKeys(), []); // empty map after deleting keys
    });


    it('getValues', function() {
        assert.deepStrictEqual(testMap.getValues(), []); // empty map

        testMap.setVal('cat', 'banana');
        testMap.setVal('monkey', 'grape');

        assert.deepStrictEqual(testMap.getValues(), ["banana", "grape"]); //regular map

        testMap.setVal('orange', 'orangutan');
        testMap.setVal('super', 'man');
        testMap.setVal('dog', 'gorilla');

        assert.deepStrictEqual(testMap.getValues(), ["banana", "grape", "orangutan", "man", "gorilla"]); // regular map

        testMap.setVal('dog', 'cool');
        testMap.setVal('cat', 'apple');

        assert.deepStrictEqual(testMap.getValues(), ["apple", "grape", "orangutan", "man", "cool"]); // correct values after setting new values

        testMap.clearMap();
        assert.deepStrictEqual(testMap.getValues(), []); // empty map after deleting keys
    });
    
});
