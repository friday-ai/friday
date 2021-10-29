import powerOn from './common/common.power-on';
import powerOff from './common/common.power-off';
import { getState, setState } from './common/common.state';
import play from './media/media.play';
import pause from './media/media.pause';
import stop from './media/media.stop';
import next from './media/media.next';
import fastForward from './media/media.fast-forward';
import previous from './media/media.previous';
import rewind from './media/media.rewind';
import getTitle from './media/media.title';
import { setPlaylist, getPlaylist } from './media/media.playlist';
import getMetadata from './media/media.metadata';
import volumeUP from './media/media.volume-up';
import volumeDown from './media/media.volume-down';
import launchGame from './media/media.launch-game';
import { startRecord, stopRecord } from './media/media.record';
import { setChannel, getChannel } from './media/media.channel';
import pushButton from './media/media.push-button';
import DeviceClass from '../index';
import checkAvailableFeature from './checkAvailableFeature';
import { DeviceTypeParameter, FeatureParameter } from '../../../utils/interfaces';
import error from '../../../utils/errors/coreError';
import DeviceType from '../device.interface';

export default class Media {
  powerOn = powerOn;
  powerOff = powerOff;
  getState = getState;
  setState = setState;
  play = play;
  pause = pause;
  stop = stop;
  next = next;
  fastForward = fastForward;
  previous = previous;
  rewind = rewind;
  getTitle = getTitle;
  setPlaylist = setPlaylist;
  getPlaylist = getPlaylist;
  getMetadata = getMetadata;
  volumeUP = volumeUP;
  volumeDown = volumeDown;
  launchGame = launchGame;
  startRecord = startRecord;
  stopRecord = stopRecord;
  setChannel = setChannel;
  getChannel = getChannel;
  pushButton = pushButton;

  private device: DeviceClass;
  private readonly MEDIA_CONST = 'MEDIA';

  constructor(device: DeviceClass) {
    this.device = device;
  }

  public async command(action: string, params: DeviceTypeParameter) {
    try {
      const device = await this.device.getById(params.deviceId);

      checkAvailableFeature(device, action);

      if (this.checkMediaType(device)) {
        const paramFeature: FeatureParameter = {
          device,
          deviceClass: this.device,
          state: params.state,
        };
        // @ts-ignore
        return this[action](paramFeature);
      }
      throw new Error('This device is not a light type');
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { action, params },
      });
    }
  }

  private checkMediaType(device: DeviceType) {
    return device.type === this.MEDIA_CONST;
  }
}
