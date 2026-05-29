import { serve } from "bun";
import index from "./index.html";

const API_URL = process.env.BUN_PUBLIC_API_URL ?? "http://localhost:8000";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    // Dev proxy — forwards /proxy/* to the backend to avoid CORS issues.
    "/proxy/*": async req => {
      const url = new URL(req.url);
      const target = API_URL + url.pathname.replace("/proxy", "") + url.search;
      const headers = new Headers(req.headers);
      headers.delete("host");
      return fetch(target, { method: req.method, headers, body: req.body });
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
