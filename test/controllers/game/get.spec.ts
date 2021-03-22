import { getGame } from '../../../src/controllers/game/get';
import * as gameService from '../../../src/services/game-service';
import chai from 'chai';
import sinon from 'sinon';
import { GameModel } from '../../../src/models/game-model';
const expect = chai.expect;

const logger = {
  debug: () => null,
  info: () => null,
  error: () => null,
} as any;

describe('controllers/game/get', () => {
  it('should return game item', async() => {
    const _id = '69d6e22a-1100-460f-819a-642a9280712a';
    const request = {
      params: {
        id: _id,
      }
    } as any;
    const response = {
      json: sinon.spy(),
    } as any;
    const next = sinon.spy();

    const resource = new GameModel({
      _id,
      playerIdTurn: 0,
      players: [{
        name: 'One'
      }, {
        name: 'Two'
      }]
    });

    const stubFindGame = sinon.stub(gameService, 'findGame').resolves(resource);

    await getGame(request, response, next);

    stubFindGame.restore();

    expect(response.json.args[0][0] instanceof GameModel).to.be.true;
    expect(response.json.calledOnce).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it('should throw error if not found', async() => {
    const _id = '69d6e22a-1100-460f-819a-642a9280712a';
    const request = {
      params: {
        id: _id,
      }
    } as any;
    const response = {
      json: sinon.spy(),
    } as any;
    const next = sinon.spy();

    const stubFindGame = sinon.stub(gameService, 'findGame').resolves(null);

    await getGame(request, response, next);

    stubFindGame.restore();

    expect(response.json.notCalled).to.be.true;
    expect(next.calledOnce).to.be.true;
    expect(next.args[0][0].message).to.be.equal('Resource not found');
  });
});
