import cors from "cors";
import express from "express";
import { connect } from "./config/database.js";
import especieRoutes from "../src/routes/especie.routes.js";
import categoriaRoutes from "../src/routes/categoria.routes.js";
import productoRoutes from "../src/routes/product.routes.js";
import detalleProductoRoutes from "../src/routes/detalleProducto.routes.js";
import userRoutes from "./routes/user.routes.js";
import ventaRoutes from "./routes/venta.routes.js";

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
app.use("/producto", productoRoutes);
app.use("/detalleProducto", detalleProductoRoutes);
app.use("/user", userRoutes);
app.use("/venta", ventaRoutes);

export default app;
