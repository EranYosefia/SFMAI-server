const express = require("express");
const customerRouter = require("./routers/customer");
const accountRouter = require("./routers/account");
const productRouter = require("./routers/product");
require("dotenv").config();

const cors = require("cors");

var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8080;

require("./configs/database");

app.use("/customer", customerRouter);
app.use("/account", accountRouter);
app.use("/product", productRouter);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
