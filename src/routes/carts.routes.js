import {Router} from "express";
import CartManager from "../services/cartmanager.js"



const router = Router();

const cartManager = new CartManager();


router.post("/", async (req, res) => {
    try {
        const {products} = req.body;

        // Validación de campos obligatorios
        if (!products) {
            return res.status(400).json({ error: "Campos incorrectos para generar el carrito" });
        }

        // Crear el objeto del producto
        const newCartData = {
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


router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid); // Obtener el ID del producto desde los parámetros
        const updatedProduct = await productManager.updateProduct(productId, req.body); // Llamar  al método pasando el ID y los datos a actualizar

        if (updatedProduct) {
            res.json(updatedProduct); // Si se actualizó correctamente, devolver el producto
        } else {
            res.status(404).json({ error: "Producto no encontrado" }); // 404 si no existe el producto
        }

    } catch (error) {
        console.log(error);
        
    }
});




export default router;

