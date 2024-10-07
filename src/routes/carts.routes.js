import {Router} from "express";
import CartManager from "../services/cartmanager.js"



const router = Router();

const cartManager = new CartManager();


router.post("/", async (req, res) => {
    try {
        const { id , products} = req.body;

        // Validación de campos obligatorios
        if (!id || !products) {
            return res.status(400).json({ error: "Campos incorrectos para generar el carrito" });
        }

        // Crear el objeto del producto
        const newCartData = {
            id,
            products
        };

        // Añadir el producto utilizando el método addProduct
        const product = await cartManager.addCart(newCartData);

        res.status(201).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
});





export default router;

