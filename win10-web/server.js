// =======================================================
// TORRE 1: CONFIGURACIÓN E INICIALIZACIÓN
// =======================================================
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Forzar la lectura limpia de los recursos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// =======================================================
// TORRE 2: NÚCLEO DE LAS RUTAS API (BACKEND LÓGICO)
// =======================================================

// --- API 1: Datos Generales del Sistema ---
app.get('/api/sistema', (req, res) => {
    res.json({
        estado: "Conectado al Servidor Node.js",
        ram_virtual: "128 GB Simulados",
        usuario: "Administrador_Web"
    });
});

// --- API 2: Procesador de Comandos del Símbolo del Sistema (CMD) ---
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

// --- API 3: Lector de Comandos Remotos de la App Chat Control ---
app.get('/api/chat-control', (req, res) => {
    const videoId = req.query.id || '';
    
    // Simulación del flujo de comandos capturados en vivo desde el streaming
    const comandosSimulados = [
        { usuario: "HackerPro99", mensaje: "!dir", comando: "dir", ejecucion: "Directorio de C:\\Users\\Admin\n\n[Chat_Control_Activo.sys]" },
        { usuario: "ChronionFan", mensaje: "hola!", comando: null, ejecucion: null },
        { usuario: "AdminWeb", mensaje: "!systeminfo", comando: "systeminfo", ejecucion: "SO: Windows 10 Web OS\nControl: Remoto por Chat ID" }
    ];

    if (!videoId) {
        return res.json({ error: "Falta el ID del video" });
    }

    res.json({
        estado: "Conectado al stream ID: " + videoId,
        logs: comandosSimulados
    });
});

// =======================================================
// TORRE 3: ENRUTADO DE RESPALDO Y ARRANQUE
// =======================================================

// Asegurar que cualquier otra ruta secundaria cargue el index.html y no se quede en blanco
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lanzamiento oficial del servidor
app.listen(PORT, () => {
    console.log(`Servidor de Windows 10 corriendo en el puerto ${PORT}`);
});
