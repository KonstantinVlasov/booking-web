let env = {
  baseUrl: 'https://localhost:8181/api'
}

try {
  const localEnv = require('./local.env.js')
  Object.assign(env, localEnv)
} catch (e) {
  console.log('no local.env.js file, using production env')
}

module.exports = env
