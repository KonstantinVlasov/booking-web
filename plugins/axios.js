import axios from 'axios'

let baseURL = process.env.baseUrl

if (!process.BROWSER_BUILD) {
  baseURL = process.env.serverBaseUrl
}

export default axios.create({
  baseURL
})
