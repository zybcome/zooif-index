import Cookies from 'js-cookie'
import api from '~/plugins/api'
const TokenKey = 'ZooIf-Token'

const ExpiresInKey = 'Admin-Expires-In'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, null,null,api.ServerDomain)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time, null,null,api.ServerDomain)
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey)
}
