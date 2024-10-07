import express from "express";
import cartsRoutes from "./routes/carts.routes.js"
import productsRoutes from "./routes/products.routes.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/products",productsRoutes)
app.use("/api/carts",cartsRoutes);

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`)
})