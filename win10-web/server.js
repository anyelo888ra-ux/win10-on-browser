const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Forzar la lectura limpia de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// API del Sistema
app.get('/api/sistema', (req, res) => {
    res.json({
        estado: "Conectado al Servidor Node.js",
        ram_virtual: "128 GB Simulados",
        usuario: "Administrador_Web"
    });
});

// API del CMD e Historial (.bat simulado)
app.get('/api/cmd', (req, res) => {
    const comando = req.query.cmd ? req.query.cmd.toLowerCase().trim() : '';
    let respuesta = "";

    switch(comando) {
        case 'help':
            respuesta = "Comandos de lote (.bat) válidos:\n - dir : Lista carpetas virtuales\n - systeminfo : Ver specs del OS\n - chronion : Abre el navegador por comandos";
            break;
        case 'dir':
            respuesta = " Directorio de C:\\Users\\Admin\n\n17/07/2026  07:20 PM    <DIR>          Desktop\n17/07/2026  07:20 PM             4,512 chronion_demo.exe";
            break;
        case 'systeminfo':
            respuesta = "SO: Windows 10 Web-CMD Edition\nHost: Render Cloud v2026\nRAM Real ocupada: 0 MB";
            break;
        case 'chronion':
            respuesta = "Abriendo Chronioñ Browser... Por favor, usa el icono del escritorio para la interfaz gráfica.";
            break;
        default:
            respuesta = `'${comando}' no se reconoce como un comando interno o externo, archivo por lotes ejecutable o programa .bat válido.`;
    }
    res.json({ resultado: respuesta });
});

// Asegurar que cualquier otra ruta cargue el HTML y no se quede en blanco
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor de Windows 10 corriendo en el puerto ${PORT}`);
});
