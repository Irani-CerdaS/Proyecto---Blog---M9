# Proyecto Final Módulo 9 - Blog de Noticias

Este proyecto es una aplicación web Full Stack de un **Blog de Noticias** con un backend construido en Node.js, Express, PostgreSQL y Sequelize (ORM), y un frontend interactivo desarrollado con HTML, CSS, y JavaScript puros.

El diseño del frontend tiene una estética minimalista, inspirada en las interfaces limpias de Apple, y cuenta con un sistema de autenticación completo basado en JSON Web Tokens (JWT).

## 🚀 Características Principales

*   **Autenticación y Autorización**: Sistema seguro de registro e inicio de sesión de usuarios utilizando `bcrypt` para el manejo de contraseñas y `jsonwebtoken` (JWT) para mantener y proteger la sesión.
*   **Gestión de Usuarios**: Los usuarios registrados pueden crear y gestionar noticias.
*   **Gestión de Noticias (Posts)**: Visualización completa de un feed de noticias. Cada publicación pertenece a un autor.
*   **Sistema de Comentarios**: Los usuarios autenticados pueden comentar en los diferentes posts y ver los comentarios asociados a cada noticia.
*   **Frontend Modular**: Frontend construido sin frameworks pesados, consumiendo el backend a través de endpoints RESTful con `fetch` nativo.
*   **Base de Datos Relacional**: Modelado estructurado utilizando PostgreSQL, donde interactúan las tablas de `Users`, `News` y `Comments` con sus debidas relaciones de llave foránea.

## 🛠️ Tecnologías Empleadas

### Backend
*   **Node.js & Express**: Entorno de ejecución y servidor web.
*   **PostgreSQL**: Motor de base de datos relacional.
*   **Sequelize**: ORM para gestionar los modelos y consultas a la base de datos de manera intuitiva y segura.
*   **Bcrypt & JSONWebToken**: Herramientas principales para la seguridad de acceso.
*   **Cors & Dotenv**: Manejo de CORS y variables de entorno.

### Frontend
*   **HTML5 & CSS3**: Maquetación y estilos orientados a un diseño responsivo y "clean".
*   **JavaScript (Vanilla)**: Lógica en el cliente para el consumo de la API, manejo del DOM y autenticación del lado del cliente guardando el token.

## 📁 Estructura del Proyecto

```text
├── .env                # Variables de entorno (puerto, conexión DB, JWT Secret)
├── index.js            # Punto de entrada de la aplicación y sincronización de DB
├── package.json        # Dependencias y scripts del proyecto
├── vercel.json         # Configuración de despliegue para Vercel
├── public/             # Servidor de archivos estáticos (Frontend)
│   ├── index.html      # Feed principal de noticias
│   ├── login.html      # Página de inicio de sesión
│   ├── register.html   # Página de registro
│   ├── postear.html    # Página para crear una nueva noticia
│   ├── detalle.html    # Vista en detalle de una noticia y sus comentarios
│   ├── css/            # Hojas de estilo
│   └── js/             # Lógica del cliente y consumo de API
└── src/                # Lógica de la API (Backend)
    ├── server.js       # Configuración de Express y middlewares
    ├── database.js     # Configuración de conexión a PostgreSQL
    ├── config/         # Archivos de configuración general
    ├── models/         # Modelos de Sequelize (User, News, Comment)
    ├── controllers/    # Controladores (lógica de negocio por ruta)
    ├── middlewares/    # Middlewares (verificación de JWT, validaciones)
    └── routes/         # Definición de rutas (Endpoints REST)
```

## ⚙️ Requisitos Previos

Asegúrate de contar con lo siguiente instalado en tu entorno local:
*   [Node.js](https://nodejs.org/) (Versión recomendada LTS)
*   [PostgreSQL](https://www.postgresql.org/) ejecutándose localmente o un servicio en la nube.

## 🔧 Instalación y Configuración Local

1.  **Instalar dependencias**:
    Abre una terminal en el directorio del proyecto y ejecuta:
    ```bash
    npm install
    ```

2.  **Configurar Variables de Entorno**:
    Crea un archivo llamado `.env` en la raíz del proyecto (basado en un posible archivo `.env.example` o sigue el formato inferior) y añade tus credenciales propias:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=tu_contraseña_aqui
    DB_NAME=news_blog_db
    JWT_SECRET=supersecretkey123
    ```

3.  **Preparar la Base de Datos**:
    Asegúrate de crear la base de datos `news_blog_db` en tu motor PostgreSQL antes de arrancar. El script inicial de la aplicación se encargará de crear y sincronizar las tablas de forma automática.

4.  **Ejecutar el Servidor**:
    Para modo de desarrollo (con recarga rápida):
    ```bash
    npm run dev
    ```
    Para modo producción:
    ```bash
    npm start
    ```

5.  **Abrir la Aplicación**:
    Ingresa desde tu navegador favorito a `http://localhost:3000`

## 🌐 Endpoints Principales (API REST)

| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Registro de un usuario nuevo | No |
| **POST** | `/api/auth/login` | Inicio de sesión y generación de JWT | No |
| **GET** | `/api/news` | Obtener todas las noticias | No |
| **POST** | `/api/news` | Crear una nueva noticia | **Sí** |
| **GET** | `/api/news/:id` | Obtener detalles de una sola noticia | No |
| **POST** | `/api/comments` | Agregar comentario a una noticia | **Sí** |

## 🚀 Despliegue

La aplicación actualmente soporta de manera nativa los lineamientos para ser desplegada. En los registros actuales se indica una configuración de servidor estático para **Vercel** (`vercel.json`) para el servicio de Frontend.

Para desplegar:
*   El backend puede ser alojado en plataformas como **Render** o **Railway**.
*   El frontend puede servirse configurando adecuadamente el `vercel.json` o subiendo la carpeta `public` y vinculando la URL de su API en los scripts de JavaScript.
