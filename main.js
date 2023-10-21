const express = require("express");
const customersRouter = require("./routers/customers");

const cors = require("cors");

const app = express();

const port = 8080;

app.use("/customers", customersRouter);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
