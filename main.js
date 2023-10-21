const express = require("express");
const customersRouter = require("./routers/customers");

const cors = require("cors");

var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8080;

require("./configs/database");

app.use("/customers", customersRouter);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
