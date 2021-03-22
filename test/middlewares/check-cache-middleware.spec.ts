import { checkCache } from '../../src/middlewares/check-cache-middleware';
import chai from 'chai';
import sinon from 'sinon';
import { Cache } from '../../src/lib/cache';
const expect = chai.expect;


describe('middlewares/check-cache-middleware', () => {
  it('should reply with cache', () => {
    Cache.getInstance().set('anotherNamespace_valuex', '123');
    const request = {
      params: {
        anotherId: 'valuex'
      }
    } as any;
    const response = {
      json: sinon.spy(),
    } as any;
    const next = sinon.spy();


    checkCache('anotherId', 'anotherNamespace_')(request, response, next);

    Cache.getInstance().flush();
    expect(next.getCall(0)).to.be.null;
    expect(response.json.getCall(0).firstArg).to.be.equal('123');
  });


  it('should continue with middleware if no cache found', () => {
    const request = {
      params: {
        someId: 'valuex'
      }
    } as any;
    const response = {
      json: sinon.spy(),
    } as any;
    const next = sinon.spy();

    const cache = Cache.getInstance();
    const stubGet = sinon.stub(cache, 'get').returns(false);

    checkCache('someId', 'someNamespace_')(request, response, next);

    stubGet.restore();
    expect(stubGet.getCall(0).firstArg).to.be.equal('someNamespace_valuex');
    expect(next.calledOnce).to.be.true;
    expect(response.json.getCall(0)).to.be.null;
  });

  it('should continue with middleware if query parameter is not found', () => {
    const request = {
      params: {
        anotherId: 'valuex'
      }
    } as any;
    const response = {
      json: sinon.spy(),
    } as any;
    const next = sinon.spy();


    checkCache('notExistsId', 'anotherNamespace_')(request, response, next);

    expect(next.calledOnce).to.be.true;
    expect(response.json.getCall(0)).to.be.null;
  });
});