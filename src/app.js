import cors from "cors";
import express from "express";
import { connect } from "./config/database.js";
import especieRoutes from "../src/routes/especie.routes.js";
import categoriaRoutes from "../src/routes/categoria.routes.js";
import petProductRoutes from "../src/routes/petProduct.routes.js";
import detalleProductoRoutes from "../src/routes/detalleProducto.routes.js";
import userRoutes from "./routes/user.routes.js";
import ventaRoutes from "./routes/venta.routes.js";
import companyRoutes from "./routes/company.routes.js";
import bussinessCategoryRoutes from "./routes/businessCategory.routes.js";
import rolRoutes from "./routes/rol.routes.js";


const app = express();
app.use(cors());

//Middleware
app.use(express.json());
connect();

app.get("/", (req, res) => {
  res.json("funcion");
});

app.use("/especie", especieRoutes);
app.use("/categoria", categoriaRoutes);
app.use("/petProducts", petProductRoutes);
app.use("/detalleProducto", detalleProductoRoutes);
app.use("/user", userRoutes);
app.use("/venta", ventaRoutes);
app.use("/company", companyRoutes);
app.use("/businessCategory", bussinessCategoryRoutes);
app.use("/rol", rolRoutes);

export default app;
