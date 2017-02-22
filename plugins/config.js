// console.log('env', process.env)

export default {
  baseURL: process.env.dev ? 'localhost:8181/api' : 'https://ibookingnet.com/api'
}
