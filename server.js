import "dotenv/config";
import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectDirectory = fileURLToPath(new URL(".", import.meta.url));
const webDirectory = resolve(projectDirectory, "dist");
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"], [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"], [".jpeg", "image/jpeg"], [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"], [".json", "application/json; charset=utf-8"],
  [".mp4", "video/mp4"], [".png", "image/png"], [".svg", "image/svg+xml"], [".webp", "image/webp"]
]);

const server = createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end("Método no permitido");
    return;
  }

  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
  catch { response.writeHead(400).end("Solicitud no válida"); return; }

  if (pathname === "/health" || pathname === "/api/health") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }).end(JSON.stringify({ status: "ok" }));
    return;
  }

  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  let filePath = resolve(webDirectory, relativePath);
  const fromRoot = relative(webDirectory, filePath);
  if (fromRoot === ".." || fromRoot.startsWith(`..${sep}`) || fromRoot.startsWith(sep)) {
    response.writeHead(403).end("Acceso denegado"); return;
  }

  let fileStats;
  try { fileStats = statSync(filePath); }
  catch (error) {
    if (error.code !== "ENOENT" && error.code !== "ENOTDIR") {
      console.error("No se pudo consultar el archivo solicitado:", error);
      response.writeHead(500).end("Error interno del servidor"); return;
    }
  }
  // Vite routes are client-side: unknown extensionless paths should return the app shell.
  if (!fileStats?.isFile()) {
    if (extname(filePath)) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("No encontrado");
      return;
    }
    filePath = resolve(webDirectory, "index.html");
    try { fileStats = statSync(filePath); }
    catch { response.writeHead(503).end("La aplicación todavía no está compilada. Ejecuta npm run build."); return; }
  }

  const headers = {
    "Accept-Ranges": "bytes",
    "Content-Type": contentTypes.get(extname(filePath)) ?? "application/octet-stream",
    "X-Content-Type-Options": "nosniff"
  };
  const range = request.headers.range;
  if (range && extname(filePath) === ".mp4") {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (match) {
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Math.min(Number(match[2]), fileStats.size - 1) : fileStats.size - 1;
      if (start <= end && start < fileStats.size) {
        response.writeHead(206, { ...headers, "Content-Length": end - start + 1, "Content-Range": `bytes ${start}-${end}/${fileStats.size}` });
        if (request.method === "HEAD") response.end();
        else createReadStream(filePath, { start, end }).pipe(response);
        return;
      }
    }
    response.writeHead(416, { "Content-Range": `bytes */${fileStats.size}` }).end();
    return;
  }

  response.writeHead(200, { ...headers, "Content-Length": fileStats.size });
  if (request.method === "HEAD") response.end();
  else createReadStream(filePath).pipe(response);
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, "0.0.0.0", () => console.log(`Sitio disponible en el puerto ${port}`));
