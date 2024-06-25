import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { save,  resetForTesting, recipeInfos } from './routes';


describe('routes', function() {

 

  it('save', function() {
    // First branch, straight line code, error case
    const req = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {name: 1086, content: "some stuff"}});
    const res = httpMocks.createResponse();
    save(req, res);

    assert.deepStrictEqual(res._getStatusCode(), 400);
    assert.deepStrictEqual(res._getData(),
        'required argument "name" was missing');

    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {content: "some stuff"}});
    const res1 = httpMocks.createResponse();
    save(req1, res1);

    assert.deepStrictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(),
        'required argument "name" was missing');

    // Second branch, straight line code, error case
    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {name: "A"}});
    const res2 = httpMocks.createResponse();
    save(req2, res2);

    assert.deepStrictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(),
        'required argument "content" was missing');

    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/save', body: {name: "L"}});
    const res3 = httpMocks.createResponse();
    save(req3, res3);
    
    assert.deepStrictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(),
        'required argument "content" was missing');

    // Third branch, straight line code

    const req4 = httpMocks.createRequest({method: 'POST', url: '/save',
        body: {name: "A", content: "some stuff"}});
    const res4 = httpMocks.createResponse();
    save(req4, res4);

    assert.deepStrictEqual(res4._getStatusCode(), 200);
    assert.deepStrictEqual(res4._getData(), {saved: false});

    const req5 = httpMocks.createRequest({method: 'POST', url: '/save',
        body: {name: "A", content: "different stuff"}});
    const res5 = httpMocks.createResponse();
    save(req5, res5);

    assert.deepStrictEqual(res5._getStatusCode(), 200);
    assert.deepStrictEqual(res5._getData(), {saved: true});

    // Called to clear all saved files created in this test
    //    to not effect future tests
    resetForTesting();
  });


    it('recipeInfos', function() {

      const req = httpMocks.createRequest({ method: 'GET', url: '/recipeInfos' });
      const res = httpMocks.createResponse();
      recipeInfos(req, res);
      assert.deepStrictEqual(res._getStatusCode(), 200);
      assert.deepStrictEqual(res._getData(), { recipeInfos: [] });
  
      const saveReq1 = httpMocks.createRequest({ method: 'POST', url: '/save', body: { name: 'gorilla', content: 'content1' } });
      const saveRes1 = httpMocks.createResponse();
      save(saveReq1, saveRes1);
  
      // Check the values list again
      const req2 = httpMocks.createRequest({ method: 'GET', url: '/recipeInfos' });
      const res2 = httpMocks.createResponse();
      recipeInfos(req2, res2);
      assert.deepStrictEqual(res2._getStatusCode(), 200);
      assert.deepStrictEqual(res2._getData(), { recipeInfos: ['content1'] });
  
      const saveReq2 = httpMocks.createRequest({ method: 'POST', url: '/save', body: { name: 'monkey', content: 'content2' } });
      const saveRes2 = httpMocks.createResponse();
      save(saveReq2, saveRes2);
    
  
      // Check the values list again
      const req3 = httpMocks.createRequest({ method: 'GET', url: '/recipeInfos' });
      const res3 = httpMocks.createResponse();
      recipeInfos(req3, res3);
      assert.deepStrictEqual(res3._getStatusCode(), 200);
      assert.deepStrictEqual(res3._getData(), { recipeInfos: ['content1', 'content2'] });
  
      const saveReq3 = httpMocks.createRequest({ method: 'POST', url: '/save', body: { name: 'gorilla', content: 'new content' } });
      const saveRes3 = httpMocks.createResponse();
      save(saveReq3, saveRes3);
  
      // Check the values list again to ensure no duplicates
      const req4 = httpMocks.createRequest({ method: 'GET', url: '/recipeInfos' });
      const res4 = httpMocks.createResponse();
      recipeInfos(req4, res4);
      assert.deepStrictEqual(res4._getStatusCode(), 200);
      assert.deepStrictEqual(res4._getData(), { recipeInfos: ['new content', 'content2'] });
      });
 
});
