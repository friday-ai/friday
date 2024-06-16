import * as auto from "./auto";
import * as brightness from "./brightness";
import * as energyConsumption from "./energyConsumption";
import * as hue from "./hue";
import * as luminosity from "./luminosity";
import * as motion from "./motion";
import * as onOff from "./onOff";
import * as openClose from "./openClose";
import * as temperatureHumidity from "./temperatureHumidity";

const capabilities = {
  auto,
  brightness,
  energyConsumption,
  hue,
  luminosity,
  motion,
  onOff,
  openClose,
  temperatureHumidity,
};

export default capabilities;
