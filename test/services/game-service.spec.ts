import * as gameService from '../../src/services/game-service';
import { GameModel } from '../../src/models/game-model';
import chai from 'chai';
import sinon from 'sinon';
const expect = chai.expect;

const logger = {
  debug: () => null,
  info: () => null,
  error: () => null,
} as any;

describe('services/game-service', () => {
  describe('findGame()', () => {
    it('should find game', async() => {
      const _id = 'ff26325e-15c7-4c85-a6a2-14df26dd7c91';
      const resource = new GameModel({
        _id,
        playerIdTurn: 0,
        players: [{
          name: 'One'
        }, {
          name: 'Two'
        }]
      });

      const stubGameFindById = sinon.stub(GameModel, 'findById').resolves(resource);
      const result = await gameService.findGame(_id);

      // Reset stub.
      stubGameFindById.restore();
  
      const data = result?.toJSON();
      expect(result instanceof GameModel).to.be.true;
      expect(data).to.deep.equal({
        _id: 'ff26325e-15c7-4c85-a6a2-14df26dd7c91',
        playerIdTurn: 0,
        players: [{
          name: 'One'
        },
        {
          name: 'Two'
        }]
      });
    });
  });

  describe('updateGame()', () => {
    it('should update a game', async() => {
      const _id = '838c252c-ebc7-438e-b29b-64bce553d2fb';
      const resource = new GameModel({
        _id,
        playerIdTurn: 0,
        players: [{
          name: 'OneX'
        }, {
          name: 'TwoX'
        }]
      });

      const updateData = {
        playerIdTurn: 1,
        players: [{
          name: 'OneY'
        }, {
          name: 'TwoY'
        }]
      } as any

      const query = {
        exec: () => Promise.resolve(resource),
      } as any
      const stubFindByIdAndUpdate = sinon.stub(GameModel, 'findByIdAndUpdate').returns(query);
      const result = await gameService.updateGame(_id, updateData);
      stubFindByIdAndUpdate.restore();

      expect(result instanceof GameModel).to.be.true;
      expect(result.get('_id')).to.be.equal(_id);
    });
  });
});