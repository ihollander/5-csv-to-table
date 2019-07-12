const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

// minimal code for known files
const getMimeType = pathName => {
  switch (path.extname(pathName)) {
    case ".html":
      return "text/html";
    case ".csv":
      return "text/csv";
    case ".js":
      return "application/javascript";
    case ".css":
      return "text/css";
    default:
      return "text/plain";
  }
};

const server = http.createServer((req, res) => {
  let pathName;
  if (req.url === "/") {
    pathName = "/index.html";
  } else {
    pathName = url.parse(req.url).pathname;
  }
  fs.readFile(__dirname + pathName, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("Page Not Found");
      res.end();
    } else {
      const mimeType = getMimeType(pathName);
      res.writeHead(200, { "Content-Type": mimeType });
      res.write(data);
      res.end();
    }
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(
    "Server listening on " + "\x1b[36m" + `http://localhost:${port}` + "\x1b[0m"
  );
});
