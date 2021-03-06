import axios from 'axios'

let baseURL = process.env.baseUrl + '/api'

if (!process.BROWSER_BUILD) {
  baseURL = process.env.serverBaseUrl + '/api'
}

export default axios.create({
  baseURL
})
