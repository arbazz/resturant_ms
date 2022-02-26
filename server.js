const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // old version
const routes = require("./api/routes");

const port = process.env.PORT || 8000;

app.use(bodyParser.json()); // old versionn
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, token, X-Requested-With, Content-Type, Accept"
  );
  next();
});

routes(app);

app.listen(port, () => {
  console.log("server is running at ", port);
});
