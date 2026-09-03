import { createFileRoute } from "@tanstack/react-router";

import { isDatabaseHealthy } from "@/db/health.server";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const databaseHealthy = await isDatabaseHealthy();
        return Response.json(
          { status: databaseHealthy ? "ok" : "unavailable" },
          { status: databaseHealthy ? 200 : 503 },
        );
      },
      ANY: () =>
        Response.json({ status: "method_not_allowed" }, { status: 405, headers: { Allow: "GET" } }),
    },
  },
});
