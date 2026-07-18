const liveServer = require("live-server");

const params = {
  port: 3000,
  host: "0.0.0.0",
  root: "./",
  open: true,
  wait: 500,
  middleware: [
    function(req, res, next) {
      // Strip query parameters to check url path
      const urlPath = req.url.split('?')[0];
      if (urlPath !== '/' && !urlPath.includes('.')) {
        req.url = urlPath + '.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
      }
      next();
    }
  ]
};

liveServer.start(params);
