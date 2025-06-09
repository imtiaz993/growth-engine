import { removeToken } from './auth'

export function ssoLogin() {
  removeToken()
  window.location.href = `${
    import.meta.env.VITE_APP_SSO_URL
  }/auth?callback_url=${encodeURIComponent(location.origin)}`
}

export function ssoLogout() {
  removeToken()
  window.location.href = `${import.meta.env.VITE_APP_SSO_URL}/api/yodo1/logout`
}

export function getSSOToken() {
  return window.location.search.replace('?access_token=', '')
}
