# Neon: preparación de base de datos

La página funciona sin Neon conectado. `schema.sql` reserva una tabla para metadatos de fotografías (texto, URL y fecha), sin guardar los archivos binarios dentro de Postgres.

## Conectar cuando crees el proyecto

1. Crea un proyecto en Neon y copia la cadena de conexión pooled.
2. En el SQL Editor de Neon ejecuta [`schema.sql`](./schema.sql).
3. Configura `DATABASE_URL` en las variables privadas del servicio Railway. Para desarrollo local, copia `.env.example` a `.env` y rellena el valor; `.env` está ignorado por Git.

No pongas `DATABASE_URL` en React, `VITE_*`, ni en archivos versionados. Todavía no existe una API que escriba en Neon: la subida actual usa IndexedDB del navegador y no comparte fotos entre visitantes/dispositivos.

La aplicación de Railway necesitará además un almacenamiento de archivos (por ejemplo un bucket) y endpoints protegidos antes de aceptar fotos compartidas. Neon conserva sus metadatos, no las imágenes.
