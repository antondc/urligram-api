import config from '@root/config.test.json';

export const ENVIRONMENT = process.env.NODE_ENV;
export const DEVELOPMENT = ENVIRONMENT === 'development';
export const PRODUCTION = ENVIRONMENT === 'production';
export const STAGING = ENVIRONMENT === 'staging';
export const DATABASE_SETTINGS = config[process.env.NODE_ENV].database;
export const PROTOCOL_SERVER = config[process.env.NODE_ENV].PROTOCOL_SERVER;
export const HOST_SERVER = config[process.env.NODE_ENV].HOST_SERVER;
export const PORT_SERVER = config[process.env.NODE_ENV].PORT_SERVER;
export const VERSION_SERVER = config[process.env.NODE_ENV].VERSION_SERVER;
export const LOGGING = config[process.env.NODE_ENV].LOGGING;
export const ENDPOINT_CLIENTS = config[process.env.NODE_ENV].ENDPOINT_CLIENTS;
export const URL_SERVER = PROTOCOL_SERVER + HOST_SERVER + ':' + PORT_SERVER + '/' + VERSION_SERVER;

export const SECRET = config[process.env.NODE_ENV].SECRET;
