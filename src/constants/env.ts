import packageJson from '../../package.json';
export const ENV = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ENDPOINT: import.meta.env.VITE_APP_BASE_ENDPOINT,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  NODE_ENV: import.meta.env.VITE_APP_NODE_ENV,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  GOOGLE_CLIENT_ID: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  GOOGLE_MAP_KEY: import.meta.env.VITE_APP_GOOGLE_MAP_KEY,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ENV_TYPE: import.meta.env.VITE_APP_ENV,
  VERSION: packageJson.version,
};
