import { signupBody, loginBody } from './bodymaker.js';
import { renderProducts } from './renderProcuts.js';
const url = 'http://localhost:3000/api';

let token;

async function signup(e) {
  e.preventDefault();

  const curUrl = `${url}/users/signup`;
  $.ajax({
    type: 'POST',
    url: curUrl,
    ContentType: 'application/json',
    data: signupBody(),
    success: function (data) {
      token = data.token;
      const isAdmin = data.user.role === 'admin';
      const user = { isLoggedIn: true, isAdmin };
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = 'index.html';
    },
    error: function (error) {
      alert(error.responseText);
    },
  });
}

async function login(e) {
  e.preventDefault();
  const curUrl = `${url}/users/login`;

  $.ajax({
    type: 'POST',
    url: curUrl,
    data: loginBody(),
    ContentType: 'application/json',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function (data) {
      token = data.token;

      const isAdmin = data.user.role === 'admin';
      const user = { isLoggedIn: true, isAdmin };
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = 'index.html';
    },
    error: function (error) {
      console.log(error);
      alert(error.responseText);
    },
  });
}

async function getAllProducts(e) {
  const curUrl = `${url}/products`;
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: curUrl,
      ContentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function (products) {
        resolve(products); // Resolve the promise with the fetched products
      },
      error: function (error) {
        reject(error); // Reject the promise with the error
      },
    });
  });
}

export { login, signup, getAllProducts };