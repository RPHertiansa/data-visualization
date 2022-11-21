/* eslint-disable no-undef */
// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || "0.0.0.0";
// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 8081;

const cors_proxy = require("cors-anywhere");

cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [],
    removeHeaders: []
  })
  .listen(port, host, () => {
    console.log(`Running CORS Anywhere on ${host}:${port}`);
  });
