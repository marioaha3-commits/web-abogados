const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(helmet()); // Seguridad
app.use(express.json()); // Lectura de JSON

// Ruta para recibir el formulario
app.post('/api/contacto', (req, res) => {
  const { nombre, telefono, caso } = req.body;

  // Validación básica
  if (!nombre || !telefono || !caso) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // Aquí los datos se imprimen en tu terminal de VS Code
  console.log("-----------------------------------------");
  console.log("NUEVO CASO LEGAL RECIBIDO");
  console.log(`Cliente: ${nombre}`);
  console.log(`Teléfono: ${telefono}`);
  console.log(`Caso: ${caso}`);
  console.log("-----------------------------------------");

  // Respuesta exitosa al frontend
  res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 10000; // Render o Railway usan puertos variables
app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});