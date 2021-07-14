require('dotenv').config()
const express = require("express");
const cors = require("cors");

const { sequelize } = require("./models");
const PORT = process.env.PORT;
const app = express();

app.use(cors());


app.use(express.json());


const funcionariosRouter = require("./routes/funcionarios.routes");
app.use("/", funcionariosRouter);


app.listen(process.env.PORT || PORT, async () => {
  console.log(`server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected ");
});