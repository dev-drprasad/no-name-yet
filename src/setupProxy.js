const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api/tweet", {
      target: "https://tweeter.dev-drprasad.now.sh",
      pathRewrite: { "^/api/tweet": "/handler.go" },
      changeOrigin: true,
    })
  );
};

function add(a, b) {
  return a + b;
}
