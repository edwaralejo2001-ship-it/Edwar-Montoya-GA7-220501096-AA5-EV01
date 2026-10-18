const express = require('express');
const app = express();
const port = 3000;

// Get the client
const mysql = require('mysql2');

// Create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'Edwar_Montoya_GA7_220501096_AA5_EV01',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});


// MODIFICACIÓN 1: Se agregó este middleware para que Express pueda leer
// el body de las peticiones con formato JSON (req.body).
// Sin esto, req.body sería undefined y el login nunca funcionaría.
app.use(express.json());

// MODIFICACIÓN 2: Se cambió app.get() por app.post() porque una petición
// de login envía datos sensibles (usuario y clave) en el body, no en la URL.
// Antes era: app.get('/api/login', ...) → causaba el error 404 al hacer POST.
app.post('/api/login',(req, res) => {
    // MODIFICACIÓN 3: Se cambió req.query por req.body para leer los datos
    // del cuerpo JSON de la petición en lugar de los parámetros de la URL.
    // Antes era: req.query.usuario / req.query.clave
    const usuario = req.body.usuario;
    const clave = req.body.clave;

    // Using placeholders
    pool.query(
        'SELECT * FROM usuarios WHERE usuario = ? AND clave = ?',
        [usuario, clave],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).send('Error en la consulta');
                return;
            }
            console.log(results);

            if (results.length > 0) {
                res.send('Login exitoso');
            } else {
                res.send('Usuario o clave incorrectos');
            }


        }
    );

});

// MODIFICACIÓN 4: Se cambió app.get() por app.post() — igual que en /api/login,
// la ruta debe aceptar POST para recibir datos en el body y no en la URL.
// Antes era: app.get('/api/register', ...) → causaba el error 404 al hacer POST.
app.post('/api/register', (req, res) => {
    // MODIFICACIÓN 5: Se cambió req.query por req.body para leer usuario y clave
    // desde el cuerpo JSON de la petición en lugar de los parámetros de la URL.
    // Antes era: req.query.usuario / req.query.clave
    const usuario = req.body.usuario;
    const clave = req.body.clave;

    // Using placeholders
    pool.query(
        'SELECT * FROM usuarios WHERE usuario = ?',
        [usuario],
        function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).send('Error en la consulta');
                return;
            }

            if (results.length > 0) {
                res.status(400).send('El usuario ya existe');

            } else {
                pool.query(
                    'INSERT INTO usuarios (usuario, clave) VALUES (?, ?)',
                    [usuario, clave],
                    function (err, results) {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Error en la consulta');
                            return;
                        }
                        res.send('Usuario registrado exitosamente');
                    }
                );
            }


        }
    );

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

