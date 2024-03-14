require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const routes = require("./routes/index");
const db = require("./util/db");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "uhugwyygG6F4sdrTFEF@k9#",
    resave: true,
    saveUninitialized: true,
  })
);

db.connect();

app.use(routes);
app.use(errorHandler.errorHandler);

app.listen(port, () => {
  console.log("Server listening in port " + port);
});
