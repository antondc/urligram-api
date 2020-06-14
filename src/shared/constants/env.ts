import config from '@root/config.test.json';

export const DATABASE_SETTINGS = config[process.env.NODE_ENV].database;
export const HOST_SERVER = config[process.env.NODE_ENV].HOST_SERVER;
export const PORT_SERVER = config[process.env.NODE_ENV].PORT_SERVER;
export const LOGGING = config[process.env.NODE_ENV].LOGGING;
export const ENDPOINT_CLIENT = config[process.env.NODE_ENV].ENDPOINT_CLIENT;
export const SECRET = config[process.env.NODE_ENV].SECRET;
