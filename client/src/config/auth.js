import { navigate } from '@reach/router'

const accessTokenKey = 'accessToken';
const loginUrl = 'http://localhost:4000/login';


// function getUserFromToken(token) {
//     return jwtDecode(token).sub;
// }

//   export function getAccessToken() {
//     return localStorage.getItem(accessTokenKey);
//   }

//   export function getLoggedInUser() {
//     const token = getAccessToken();
//     if (!token) {
//       return null;
//     }
//     return getUserFromToken(token);
//   }

export function login(email, password) {

    const options = {
        method: 'post',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `email=${email}&password=${password}`
    }

    fetch(loginUrl, options)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    alert('Email not found, please retry')
                }
                if (response.status === 401) {
                    alert('Email and password do not match, please retry')
                }
            }
            return response
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data.token)
                localStorage.setItem(accessTokenKey, data.token);
                navigate('/')
            }
        })

}

export function logout() {
    localStorage.removeItem(accessTokenKey);
}