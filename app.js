require('dotenv').config()
const express = require("express");
const cors = require("cors");

const { sequelize } = require("./models");

const app = express();

app.use(cors());


app.use(express.json());


const funcionariosRouter = require("./routes/funcionarios.routes");
app.use("/", funcionariosRouter);


app.listen(process.env.PORT, async () => {
  console.log(`server running on port ${process.env.PORT}`);
  await sequelize.authenticate();
  console.log("Database connected ");
});