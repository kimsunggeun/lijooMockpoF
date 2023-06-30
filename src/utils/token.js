import Cookies from 'js-cookie'
import localStore from '@/utils/localStore'

const TokenKey = 'Token'
const RefreshTokenKey = 'RefreshToken'
const JWTKey = 'JWT'
const UserKey = 'UserCd'
const DomainKey = 'DomainCd'

export function getToken() {
  let token = window.sessionStorage.getItem(TokenKey) != null ? window.sessionStorage.getItem(TokenKey) : localStore.get('token')
  return token

  // return Cookies.get(TokenKey)
}

export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
}

export function getRefreshToken() {
  return window.sessionStorage.getItem(RefreshTokenKey)
  // return Cookies.get(TokenKey)
}

export function setRefreshToken(token) {
  return window.sessionStorage.setItem(RefreshTokenKey, token)
}

export function setCookieToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  removeUser()
  //return window.sessionStorage.removeItem(TokenKey)
  return Cookies.remove(TokenKey)
}

export function getUserCd() {
  //return Cookies.get(UserKey)
  return localStore.get(UserKey)
}

export function setUserCd(token) {
  //return Cookies.set(UserKey, token)
  return localStore.set(UserKey, token)
}

export function getDomainCd() {
  return Cookies.get(DomainKey)
}

export function setDomainCd(token) {
  return Cookies.set(DomainKey, token)
}

export function removeUser() {
  return Cookies.remove(UserKey)
}

export function setJWT(token) {
  return window.sessionStorage.setItem(JWTKey, token)
}

export function getJWT() {
  return window.sessionStorage.getItem(JWTKey)
}

export function removeJWT() {
  return window.sessionStorage.removeItem(JWTKey)
}

export function setID(usercd) {
  return window.sessionStorage.setItem(UserKey, usercd)
}

export function getID(usercd) {
  return window.sessionStorage.getItem(usercd)
}

export function removeID(usercd) {
  return window.sessionStorage.removeItem(usercd)
}
