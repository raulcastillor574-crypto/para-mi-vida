# Para ti — cumpleaños de Giselle

Una experiencia responsive hecha en React para celebrar su vida, sus pasiones y sus recuerdos. La interfaz usa Motion for React para revelados discretos, navegación con desplazamiento suave, lightbox fotográfico y la carta animada.

## Requisitos y desarrollo

- Node.js 20.19 o posterior, o 22.12 o posterior (requisito de Vite 8).

```bash
npm install
npm run dev
```

En Windows PowerShell, si aparece el error de ejecución de `npm.ps1`, usa el ejecutable `.cmd` equivalente:

```powershell
npm.cmd install
npm.cmd run dev
```

Vite muestra en la terminal la dirección local. Antes de desplegar, crea la versión de producción:

```bash
npm run build
npm start
```

En PowerShell, los mismos comandos se escriben como `npm.cmd run build` y `npm.cmd start`.

El servidor sirve `dist/` en `http://localhost:3000` (o el puerto indicado por `PORT`) y admite reproducción y búsqueda dentro de los videos MP4. `/health` responde para el chequeo de Railway.

## Carpetas

- `src/App.jsx`: componentes React y experiencia de navegación.
- `src/data/memories.js`: capítulos, fotografías y videos del álbum.
- `src/styles/`: estilos existentes y refinamientos de layout responsive.
- `src/tokens/`: colores, tipografía y medidas de diseño.
- `public/images_videos/`: fotografías y clips incluidos en la web.
- `neon/schema.sql`: esquema inicial para metadatos futuros.
- `.railway/railway.ts`: configuración de Infrastructure as Code para Railway.

## GitHub y Railway

1. El remoto `origin` ya apunta al repositorio `rcxx06/Pagina-para-mi-wewe` y la rama local está preparada como `main`.
2. Crea el primer commit y súbelo:

   ```bash
   git commit -m "Preparar experiencia de cumpleaños en React"
   git push -u origin main
   ```

3. En Railway crea un proyecto y despliega desde GitHub; habilita el deploy automático para la rama `main`.
5. El comando de compilación es `npm run build`; el de inicio es `npm start`. Railway ya puede detectarlos en `package.json`; `.railway/railway.ts` documenta el servicio/health check para el Railway CLI.

No se ha creado el proyecto Railway ni el primer commit desde esta preparación. Para aplicar la configuración IaC, enlaza el proyecto con Railway CLI y revisa `railway config plan` antes de `railway config apply`.

## Neon y fotos futuras

Neon no es necesario para servir la web. Al crear la base, ejecuta `neon/schema.sql` y guarda la conexión como `DATABASE_URL` privada en Railway. `.env.example` sirve de guía local; las credenciales reales no deben estar en Git ni en React.

El formulario actual conserva fotografías en IndexedDB del navegador en uso. No las comparte entre visitantes ni dispositivos. Para una galería compartida habrá que añadir endpoints protegidos y almacenamiento de archivos (un bucket o volumen persistente); Neon guardará referencias y metadatos, no el contenido de las imágenes.
