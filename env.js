let env = {
  baseUrl: 'http://ibookingnet.com',
  serverBaseUrl: 'http://localhost:8181',
  staticUrl: 'http://ibookingnet.com'
}

try {
  const localEnv = require('./local.env.js')
  Object.assign(env, localEnv)
} catch (e) {
  console.info('no local.env.js file, using production env')
}

module.exports = env
