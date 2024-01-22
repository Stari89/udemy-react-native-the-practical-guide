import axios from 'axios';

const API_KEY = 'AIzaSyDLqxsEzXX-tp_Z5OSK8FLsKqhno_7EKCA';

async function createUser(email, password) {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
    });
}
