import action1 from './20200823170803-create-action';
import device1 from './20200823170940-create-device';
import house1 from './20200823171020-create-house';
import plugin1 from './20200823171132-create-plugin';
import room1 from './20200823171225-create-room';
import satellite1 from './20200823171346-create-satellite';
import scene1 from './20200823171455-create-scene';
import script1 from './20200823171612-create-script';
import session1 from './20200823171723-create-session';
import state1 from './20200823171832-create-state';
import trigger1 from './20200823171918-create-trigger';
import user1 from './20200823172042-create-user';
import variable1 from './20200823172203-create-variable';
import deviceCapability1 from './20220711073422-create-device-capability';
import deviceCapabilitySettings1 from './20220711073435-create-device-capability-settings';
import deviceCapabilityState1 from './20220711073505-create-device-capability-state';

const migrations = [
  action1,
  device1,
  house1,
  plugin1,
  room1,
  satellite1,
  scene1,
  script1,
  session1,
  state1,
  trigger1,
  user1,
  variable1,
  deviceCapability1,
  deviceCapabilitySettings1,
  deviceCapabilityState1,
];

export default migrations;
