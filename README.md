# TRABAJO FINAL - SPRINT 5 - MODULO 3

El trabajo practico final consiste de un sistema de gestión de países, está aplicación web podremos visualizar y realizar diferentes acciones a países de América que hablan en español, vamos a usar datos de la API REST Countries.


## Objetivo

El objetivo del proyecto final es crear una aplicación web donde vamos a poder crear, editar y eliminar países cargados desde la api Countries y las mismas se guardan en la base de datos de "MongoDB".

## Tecnologías usadas

**Backend:**
- Node.js con Express
- MongoDB para la base de datos
- Mongoose para trabajar con MongoDB desde JavaScript

**Frontend:**
- EJS para las vistas HTML
- CSS para los estilos
- JavaScript para la interacción
- SweetAlert2 para las alertas con mejor aspecto

**Otras herramientas:**
- express-ejs-layouts (para no repetir código HTML en cada vista)
- express-validator (para validar los datos que llegan al servidor)

## Cómo instalar y ejecutar

### 1. Clonar el proyecto
```bash
git clone git@github.com:Emiliano-Herrera/NodoDiplo-M3-S5-PROYECTO-FINAL.git
cd proyecto-final
```

### 2. Instalar las dependencias
```bash
npm install
```

### 3. Ejecutar la aplicación
```bash
node app.mjs
```

### 4. Abrir en el navegador
```
http://localhost:3000/api
```

### 5. Cargar los países desde la API
Desde la interfaz web INDEX
```
POST http://localhost:3000/api/api-insert
```

Esto descarga todos los países de América que tienen español como idioma y los guarda en la base de datos.

## Estructura del proyecto

```
paises/
│
├── config/
│   └── dbConfig.mjs              (conexión a MongoDB)
│
├── controllers/
│   └── paisController.mjs        (maneja las peticiones HTTP)
│
├── models/
│   └── Pais.mjs                  (estructura de cómo se guarda un país)
│
├── public/
│   ├── css/                      (hojas de estilo para mejorar el aspecto visual)
│   ├── icons/                    (iconos SVG utilizados para dar representación visual)
│   ├── images/                   (carpeta de imagenes, en este proyecto no contiene nada)
│   └── js/                       (lógica frontend, validación de formularios, paginación, etc.)
│
├── repositories/
│   ├── IRepository.mjs           (plantilla base)
│   └── PaisRepository.mjs        (todas las consultas a la base de datos)
│
├── routes/
│   └── PaisRoutes.mjs            (define las URLs de la app)
│
├── services/
│   └── PaisService.mjs           (lógica de negocio, intermediario)
│
├── validation/
|   ├── errorMiddleware.js        (manejo de errores)
│   └── validationRules.js        (reglas para validar datos)
│
├── views/
│   ├── partials/                
│   │   ├── navbar.ejs            (plantilla navbar reutilizable)
│   │   └── footer.ejs            (plantilla footer reutilizable)
│   ├── layout.ejs                (plantilla base con header/footer)
│   ├── index.ejs                 (página de inicio)
│   ├── dashboard.ejs             (lista de todos los países)
│   ├── addPais.ejs               (formulario para agregar país)
│   ├── editPais.ejs              (formulario para editar país)
│   └── responseView.mjs          (renderizado del objeto pais a una respuesta más legible)
│
└── app.mjs                       (archivo principal que inicia todo)
```

## Cómo funciona el código

### Controladores (PaisController.mjs)
Es el archivo que recibe las peticiones del navegador y decide qué hacer:
- `indexController`: muestra la página de inicio y también envia "paises" con los que vamos a interactuar en el index.
- `insertarPaisesAPIController`: descarga y guarda países desde la API externa.
- `vistaDashboardController`: muestra todos los países.
- `mostrarFormularioAgregarController`: muestra la página para crear un pais.
- `crearPaisController`: guarda un nuevo país.
- `mostrarFormularioEditarController`: muestra la página para editar un pais, verifica que el "id" exista.
- `actualizarPaisController`: modifica un país existente.
- `eliminarPaisController`: borra un país.

### Servicios (paisesService.mjs)
Funciones que están "en el medio". Se usan para que los controladores no tengan que hablar directamente con la base de datos. Hacen el código más ordenado.
Es por eso que utilizamos el modelo vista controlador "MVC".

### Repositorio (PaisesRepository.mjs)
Acá están todas las consultas a MongoDB:
- `obtenerDesdeApi()`: consulta la API de REST Countries y filtra solo los países de América con español, calcula el promedio de gini.
- `insertarDesdeApi()`: guarda todos los países con el filtro del creador "Emiliano Olivera Herrera" traídos desde la API de REST Countries y la guarda en la BD MongoDB.
- `obtenerTodos()`: trae todos los países con el filtro del creador "Emiliano Olivera Herrera".
- `obtenerPorId(id)`: trae un país específico en base al "id".
- `buscarPorAtributo(atributo, valor)`: trae un país en específico filtrado por el atributo y su valor.
- `crear(paisData)`: guarda un nuevo país.
- `actualizar(id, paisData)`: actualiza un país en base al "id".
- `eliminar(id)`: elimina un país en base al "id".

### Modelo (Pais.mjs)
Define cómo se estructura un país en la base de datos:
```javascript
{
  pais: "Argentina",
  nombreOficial: "República Argentina",
  capital: ["Buenos Aires"],
  habitantes: 45376763,
  gini: 42.9,
  region: "Americas",
  subRegion: "South America",
  lenguajes: ["Spanish"],
  latitudLongitud: [-34, -64],
  area: 2780400,
  zonasHorarias: ["UTC-03:00"],
  paisesVecinos: ["BOL", "BRA", "CHL", "PRY", "URY"],
  creador: "Emiliano Olivera Herrera"
}
```

### Vistas (dashboard.ejs)
Página principal donde se muestran todos los países en tarjetas. Incluye:
- Estadísticas generales (población total, área total, promedio GINI).
- Paginación (muestra 4 países por página por defecto).
- Botones para editar y eliminar cada país.

## Consideraciones importantes

### Validaciones
Antes de guardar o actualizar un país, se valida que:
- Los campos obligatorios estén presentes (pais, nombreOficial, capital, habitantes, lenguajes, latitud/longitud, area)
- Los números sean positivos
- El nombre oficial no esté repetido
- Los arrays no estén vacíos

### Paginación
El dashboard implementa paginación del lado del cliente (JavaScript):
- Se pueden mostrar 4, 8, 12, 16 o todos los países
- Los botones de navegación se actualizan automáticamente
- Muestra cuántos países hay en total

### Confirmación de eliminación
Cuando se presiona "Eliminar", sale una alerta de SweetAlert2 pidiendo confirmación. Si se confirma, se hace una petición DELETE al servidor.

## Rutas disponibles

**Vistas:**
- `GET /api` - Página de inicio "index.ejs"
- `GET /api/dashboard` - Lista de países "dashboard.ejs"
- `GET /api/pais/nuevo` - Formulario para agregar país "addPais.ejs"
- `GET /api/pais/editar/:id` - Formulario para editar país "editPais.ejs"

**API:**
- `POST /api/api-insert` - Importar países desde REST Countries
- `POST /api/crearPais` - Crear un nuevo país
- `PUT /api/actualizarPais/:id` - Actualizar un país
- `DELETE /api/eliminarPais/:id` - Eliminar un país

## Demostración

### Validaciones
Si se intenta crear un país que ya existe (mismo nombreOficial), el servidor responde:
```json
{
  "mensaje": "Ya existe un pais con ese nombre oficial"
}
```

### Comportamiento ante datos inválidos
El middleware `handleValidationErrors` captura los errores de validación y los devuelve en formato JSON para que el frontend pueda mostrarlos.

---

## Validaciones del Sistema

### 1. Creación de País con Nombre Oficial Duplicado
Cuando se intenta crear un país cuyo nombre oficial ya existe en la base de datos:

Entrada del usuario:

````json
{
  "pais": "Argentina",
  "nombreOficial": "República Argentina",  // ← Ya existe en la BD
  "capital": ["Buenos Aires"],
  "habitantes": 45000000
}
````
Respuesta del servidor:

````json
{
  "mensaje": "Ya existe un pais con ese nombre oficial"
}
````
Resultado: El país no se crea y se muestra un mensaje de error.

### 2. Validación de Campos Obligatorios
Cuando faltan campos requeridos:

Entrada del usuario (falta 'habitantes'):

```` json
{
  "pais": "Chile",
  "nombreOficial": "República de Chile",
  "capital": ["Santiago"]
  // ← Falta el campo 'habitantes'
}
````
Respuesta del servidor:

````json
{
  "errores": [
    {
      "campo": "habitantes",
      "mensaje": "La cantidad de habitantes es requerida"
    }
  ]
}
````
Frontend: Muestra el mensaje de error debajo del campo "Habitantes".

### 3. Validación de Longitud de Texto
Cuando un campo de texto es muy corto:

Entrada del usuario:

```` json
{
  "pais": "AB",  // ← Solo 2 caracteres (mínimo: 3)
  "nombreOficial": "República de Bolivia",
  "capital": ["La Paz"],
  "habitantes": 11673021
}
````
Respuesta del servidor:

```` json
{
  "errores": [
    {
      "campo": "pais",
      "mensaje": "El nombre del pais debe tener entre 3 y 90 caracteres"
    }
  ]
}
````

### 4. Validación de Números
Cuando se ingresa un número inválido:

Entrada del usuario:

```` json
{
  "pais": "Perú",
  "nombreOficial": "República del Perú",
  "capital": ["Lima"],
  "habitantes": -1000000,  // ← Número negativo (inválido)
  "gini": 150  // ← Fuera de rango 0-100
}
````
Respuesta del servidor:

```` json
{
  "errores": [
    {
      "campo": "habitantes",
      "mensaje": "La cantidad de habitantes debe ser un número entero positivo"
    },
    {
      "campo": "gini",
      "mensaje": "Gini debe ser un número entre 0 y 100"
    }
  ]
}
````

### 5. Validación de Arrays
Cuando los arrays no cumplen los requisitos:

Entrada del usuario:

```` json
{
  "pais": "Paraguay",
  "nombreOficial": "República del Paraguay",
  "capital": [],  // ← Array vacío (inválido)
  "habitantes": 7132538,
  "lenguajes": ["", "Guaraní"]  // ← String vacío (inválido)
}
````
Respuesta del servidor:

```` json
{
  "errores": [
    {
      "campo": "capital",
      "mensaje": "Las capitales deben ser un array con al menos un elemento"
    },
    {
      "campo": "lenguajes",
      "mensaje": "Los lenguajes no pueden estar vacíos"
    }
  ]
}
````

### 6. Validación de Códigos de Países Vecinos
Cuando los códigos de países vecinos tienen formato incorrecto:

Entrada del usuario:

```` json
{
  "pais": "Uruguay",
  "nombreOficial": "República Oriental del Uruguay",
  "capital": ["Montevideo"],
  "habitantes": 3473730,
  "paisesVecinos": ["arg", "BRA123", "BR"]  // ← Formatos incorrectos
}
````
Respuesta del servidor:

````json
{
  "errores": [
    {
      "campo": "paisesVecinos",
      "mensaje": "Cada código debe tener exactamente 3 caracteres"
    },
    {
      "campo": "paisesVecinos",
      "mensaje": "Los códigos deben estar en mayúsculas"
    }
  ]
}
````
Formato correcto: ["ARG", "BRA"] (3 letras mayúsculas)

### 7. Caso de Éxito - País Creado Correctamente
Cuando todos los datos son válidos:

Entrada del usuario:

````json
{
  "pais": "Colombia",
  "nombreOficial": "República de Colombia",
  "capital": ["Bogotá"],
  "habitantes": 50882891,
  "gini": 51.3,
  "region": "Americas",
  "subRegion": "South America",
  "lenguajes": ["Spanish"],
  "latitudLongitud": [4.0, -72.0],
  "area": 1141748,
  "zonasHorarias": ["UTC-05:00"],
  "paisesVecinos": ["BRA", "ECU", "PAN", "PER", "VEN"],
  "creador": "Emiliano Olivera Herrera"
}
````
Respuesta del servidor:

````json
{
  "mensaje": "País creado exitosamente",
  "id": "507f1f77bcf86cd799439011"
}
````
Frontend: Muestra SweetAlert2 de éxito y redirige al dashboard.

### 8. Validación en Formulario de Edición
Al editar un país existente:

Entrada (ID válido pero datos inválidos):

text
PUT /api/actualizarPais/507f1f77bcf86cd799439011
````json
{
  "habitantes": "no es un número",  // ← String en lugar de número
  "area": -1000  // ← Área negativa
}
````
Respuesta del servidor:

````json
{
  "errores": [
    {
      "campo": "habitantes",
      "mensaje": "La cantidad de habitantes debe ser un número entero positivo"
    },
    {
      "campo": "area",
      "mensaje": "El area debe ser un número positivo"
    }
  ]
}
````

### 9. ID Inválido
Cuando se intenta acceder con un ID de MongoDB inválido:

Petición:

text
GET /api/pais/editar/123-invalido
Respuesta del servidor:

````json
{
  "mensaje": "ID inválido"
}
````

Proyecto final - S5 - M3 by Emiliano Olivera Herrera - https://github.com/Emiliano-Herrera
