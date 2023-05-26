const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const passport = require("passport");
const passportJwt = require("./config/passport_jwt_strategy");

// app.set("view engine", "ejs");
// app.set("views", "./views");

app.use(express.urlencoded());
// app.use(express.static("assets"));

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
