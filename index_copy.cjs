const express = require('express');
const app = express();
const port = 3000;
const login = require('./routes/login.cjs');
const register = require('./routes/register.cjs');



// Get the client   
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



console.log("Cargando rutas de login..."); // <-- Añade esto para probar
app.post('/api/login', login);
app.post('/api/register', register);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});