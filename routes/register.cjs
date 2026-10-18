
const pool = require('../db');


async function register(req, res) {
    const usuario = req.body.usuario;
    const clave = req.body.clave;
    // Using placeholders
    try {
        const results = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

        if (results.length > 0) {
            res.status(400).send('El usuario ya existe');
        } else {
            await pool.query('INSERT INTO usuarios (usuario, clave) VALUES (?, ?)', [usuario, clave]);
            res.send('Usuario registrado exitosamente');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la consulta');
    }
};

module.exports = register;