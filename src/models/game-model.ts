import { IGame } from '@interfaces/game-interface';
import { IPlayer } from '@interfaces/player-interface';
import { model, Schema, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const GameSchema: Schema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  shortId: {
    type: String,
  },
  players: {
    type: Array,
    required: true,
  },
  playerIdTurn: {
    type: Number,
  },
});

/**
 * Before saving a new Game, set/update the following properties:
 * - For players, set the default pits and score.
 * - Set the playerIdTurn to first player.
 * - Set shortId (random string of 6 characters)
 */
GameSchema.pre('save', function(next) {
  // set first turn to player 0.
  this.set('playerIdTurn', 0);
  this.set('shortId', randomString(6));

  // update all players to default pits.
  let players = this.get('players') as IPlayer[];
  players = players.map(player => {
    return Object.assign({
      score: 0,
      pits: [6, 6, 6, 6, 6, 6],
    }, player)
  });
  this.set('players', players);

  return next();
});

export const randomString = (l: number) => [...Array(l)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

export const GameModel: Model<IGame> = model('Game', GameSchema);
