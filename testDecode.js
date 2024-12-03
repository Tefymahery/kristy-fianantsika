const jwt_decode = require('jwt-decode');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzNmMjZkNGYyZjRkNzA1OGI3MDRlMjgiLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoibWlob3NzaXJhbWFuIiwiaWF0IjoxNzMyNzExMDU3LCJleHAiOjE3MzI3MTQ2NTd9.H0UmvLVhOY4X8KEMIdmT0fczVdsRR9OY1pstG57614o';

try {
    const decoded = jwt_decode(token); // Décodage du token
    console.log('Token décodé :', decoded);
} catch (error) {
    console.error('Erreur lors du décodage :', error.message);
}
