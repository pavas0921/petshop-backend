import express from "express";
import cors from "cors";
import animalRoutes from "./routes/animal.routes.js";
import productRoutes from "./routes/product.routes.js";
import animalProductRoutes from "./routes/animalProduct.routes.js";

const app = express();
app.use(cors());

//Middleware
app.use(express.json());
app.use("/animal", animalRoutes);
app.use("/product", productRoutes);
app.use("/animalProduct", animalProductRoutes);

export default app;
