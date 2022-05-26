import jwtDecode from 'jwt-decode';

export function setToken(token) {
  localStorage.setItem('accessToken', token);
}

export function removeToken() {
  localStorage.removeItem('accessToken');
}

export function parse(accessToken) {
  if (!accessToken) {
    return {
      valid: false,
      payload: null,
    };
  }

  const decode = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return {
    valid: decode.exp > currentTime,
    payload: decode.payload,
  };
}
