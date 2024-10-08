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
        
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        const addProductToCart = await cartManager.loadProductToCart(cartId,productId);

        if (addProductToCart) {
            res.json(addProductToCart); 
        } else {
            res.status(404).json({ error: "No se actualizo el carrito" }); // 404 si no existe el producto
        }

    } catch (error) {
        console.log(error);
        
    }
});

router.get("/:cid", async (req,res)=>{
    try {
        const cartId = parseInt(req.params.cid)
        const cart = await cartManager.getcartById(cartId);
        
        
    if(cart){
        res.json(cart)
    } else{
        res.status(404).json({error: "Carro no encontrado"})
    }

    } catch (error) {
        console.log(error)
    }

})


export default router;

