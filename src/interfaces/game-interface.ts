import { IPlayer } from "./player-interface";
import { Document } from 'mongoose';

export interface IGame extends Document {
  id?: string;
  players: IPlayer[],
  playerIdTurn: number,
}
