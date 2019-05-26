
export enum User_role {
    ADMIN = 'admin',
    HABITANT = 'habitant',
    GUEST = 'guest'
}

export enum Available_languages {
    EN = 'en',
    FR = 'fr'
}

export enum Variable_owner {
    USER = 'user',
    PLUGIN = 'plugin',
    SATELLITE = 'satellite'
}

export enum State_owner {
    USER = 'user',
    HOUSE = 'house',
    ROOM = 'room',
    PLUGIN = 'plugin',
    SATELLITE = 'satellite',
    DEVICE = 'device'
}

// TODO = Create a Json file with all type of device available
export enum Available_type_of_device {
    LIGHT = 'light',
    SENSOR = 'sensor'
}

// TODO = Create a Json file with all sub type of device available
export enum Available_sub_type_of_device {
    LIGHT_W = 'light_w',
    LIGHT_RGB = 'light_rgb',
    LIGHT_RGBW = 'light_rgbw',
    SENSOR_TEMPERATURE = 'sensor_temperature',
    SENSOR_HUMIDITY = 'sensor_humidity'
}
