const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
  console.log(res.status);
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка. Status: ${res.status}; Status text: ${res.statusText}`);
}

function getPromise(email, password, endPoint) {
  return fetch(`${BASE_URL}${endPoint}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then(checkResponse);
}

export function register(email, password) {
  return getPromise(email, password, '/signup');
}

export function authorize(email, password) {
  return getPromise(email, password, '/signin');
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
    .then(checkResponse);
}
