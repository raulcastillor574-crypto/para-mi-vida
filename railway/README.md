# Railway

La compilación de Vite produce `dist/`; `npm start` sirve ese directorio con el servidor Node y expone `/health` para el health check. Los ajustes de proyecto están descritos en [`.railway/railway.ts`](../.railway/railway.ts).

Para usar Infrastructure as Code, instala Railway CLI, inicia sesión, enlaza el proyecto y revisa primero `railway config plan`. La configuración se aplica solo después de revisar el plan con `railway config apply`. El archivo viejo `railway.toml` no se conserva porque Railway lo deprecó para proyectos nuevos.

Las fotos que una persona suba desde la interfaz permanecen en el almacenamiento local de ese navegador. Railway no conservará uploads compartidos hasta añadir API y almacenamiento persistente.
