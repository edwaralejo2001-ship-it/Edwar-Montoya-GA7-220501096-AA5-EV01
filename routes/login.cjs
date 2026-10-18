const pool = require('../db');

async function login(req, res) {
    const usuario = req.body.usuario;
    const clave = req.body.clave;
    try {
        // Using placeholders
        const results = await pool.query('SELECT * FROM usuarios WHERE usuario = ? AND clave = ?', [usuario, clave]);

        console.log(results);

        if (results.length > 0) {
            res.send('Login exitoso');
        } else {
            res.send('Usuario o clave incorrectos');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la consulta');
    }
};

module.exports = login;