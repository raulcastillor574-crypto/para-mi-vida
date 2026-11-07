import { defineRailway, project, service } from "railway/iac";

export default defineRailway(() => {
  const web = service("para-ti", {
    build: "npm run build",
    start: "npm start",
    healthcheck: "/health",
  });

  return project("para-ti-giselle", { resources: [web] });
});
