import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const handler = async (event: any): Promise<any> => {
  console.debug('received new request', JSON.stringify(event, null, 2))
  const VS_BASE_URL = process.env.VS_BASE_URL
  const API_BASE_URL = `https://auth.${VS_BASE_URL}`
  const API_KEY = process.env.VS_API_KEY

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-vs-apikey': API_KEY
    }
  })

  let body, displayName, room
  try {
    body = JSON.parse(event.body)
    displayName = body.displayName
    room = body.room
  } catch (e) {
    console.error('unable to process received body', e.message, e.stack)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: 'invalid body'
    }
  }

  const handle = uuidv4()
  let response
  try {
    response = await api.post('/auth', {
      room,
      handle,
      permissions: {
        audio: true,
        video: true,
      },
      appData: {
        displayName
      }
    })
  } catch (e) {
    console.error('unable to fetch token from visualsignal', e.message, e.stack)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: 'error fetching token'
    }
  }

  const { token, id } = response.data

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ token, id, handle, room })
  }
}
