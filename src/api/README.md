# API futura

El servidor actual solo entrega `dist/` y responde en `/health`. Cuando se prepare una API de álbum, las credenciales de Neon vivirán exclusivamente en el servidor mediante `DATABASE_URL`. No se deben exponer en variables `VITE_*` ni en el navegador.
