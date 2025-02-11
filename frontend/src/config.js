const config = {
  serverUrl: 'http://localhost:4000',
}

export const createUrl = (endpoint) => `${config.serverUrl}/api/${endpoint}`;

export default config;