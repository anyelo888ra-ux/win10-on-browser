const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Esto soluciona la pantalla blanca buscando la ruta exacta de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/sistema', (req, res) => {
    res.json({
        estado: "Conectado al Servidor Node.js",
        ram_virtual: "8 GB Simulados",
        usuario: "Administrador_Web"
    });
});

// Ruta de respaldo: si entran a la raíz, les entrega el index.html obligatoriamente
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Windows 10 Web corriendo en el puerto ${PORT}`);
});
