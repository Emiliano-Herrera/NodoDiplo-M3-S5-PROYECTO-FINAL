import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/PaisRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

connectDB();
// configuracion del motor de vistar ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Archivo base de layout


// esto es para archivos estaticos (css, js)...
app.use(express.static(path.join(__dirname, './public')));

app.use('/api', superHeroRoutes); // ← PARA API (/api/heroes, etc.)
// El manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: 'Ruta no encontrada' });
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});