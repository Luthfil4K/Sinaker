// "start": "next start",
import axios from 'axios'
import url from 'url'

const baseURL = `${process.env.BASE_URL}/api/`
// const baseURL2 = `https://sinaker-tapv.onrender.com/` //render
const baseURLLocal = `http://localhost:3000/`
const baseUrlCpanel = `www.simantan.web.bps.go.id/`
const apiEndPoint = `/api`
const fullUrl = url.resolve(baseUrlCpanel, apiEndPoint)

export default axios.create({
  baseURL: fullUrl
})

export const axiosAuth = token =>
  axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
