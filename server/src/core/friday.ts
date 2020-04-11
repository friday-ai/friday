import Action from './action';
import Device from './device';
import House from './house';
import Plugin from './plugin';
import Room from './room';
import Satellite from './satellite';
import Scene from './scene';
import Script from './script';
import Session from './session';
import State from './state';
import Trigger from './trigger';
import User from './user';
import Variable from './variable';
import Event from '../utils/event';
import * as Constants from '../utils/constants';
import { generateJwtSecret } from '../utils/jwt';

/**
 * Friday
 * @returns friday object
 */
export default class Friday {
  readonly secretJwt: string = generateJwtSecret();

  public event = new Event();
  public action = new Action();
  public device = new Device();
  public house = new House();
  public plugin = new Plugin();
  public room = new Room();
  public satellite = new Satellite();
  public scene = new Scene();
  public script = new Script();
  public session = new Session(this.secretJwt);
  public state = new State();
  public trigger = new Trigger();
  public user = new User();
  public variable = new Variable();
  public state = new State(this.event, this.variable);
  public constants = Constants;
}
