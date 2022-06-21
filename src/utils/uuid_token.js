/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid'
export const getuuid = () => {
  let uuid_token = localStorage.getItem('uuid_token')
  const token = localStorage.getItem('token')
  if (!uuid_token) {
    uuid_token = uuidv4()
    localStorage.setItem('uuid_token', uuid_token)
  }
  if (token) {
    localStorage.removeItem('uuid_token')
  }
  return uuid_token
}
