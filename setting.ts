
const Env = require('./next.config.js');

const isProd = process.env.NODE_ENV === 'production';

const Setting = {
  title: '🌐 Learning Network 🌐',
  isProd,
  basePath: Env.basePath,
  apiPath: process.env.NEXT_PUBLIC_LAMBDA_API_URL,
};

export default Setting;
