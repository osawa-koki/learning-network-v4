
const Env = require('./next.config.js');

const isProd = process.env.NODE_ENV === 'production';

const Setting = {
  title: '🐟 nextjs-template.modern 🐟',
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:80',
};

export default Setting;
