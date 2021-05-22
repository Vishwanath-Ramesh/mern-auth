import axios from 'axios'
import configs from '../../configs/configs'

const instance = axios.create({
  baseURL: configs.serverConfig?.baseURL ?? '',
  headers: {
    'content-type': 'application/json',
  },
})

const getAPIData = async (method, url, postData, headers) => {
  const response = await instance({
    method,
    url,
    data: postData,
    headers,
  })
  return response
}

export default getAPIData
