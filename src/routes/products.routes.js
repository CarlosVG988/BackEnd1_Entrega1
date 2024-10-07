import {Router} from "express";
import ProductManager from "../services/productmanager.js"



const router = Router();

const productManager = new ProductManager();


router.get("/", async (req,res)=>{
    try {
        const limit = req.query.limit ? parseInt(req.query.limit):undefined;
        const products = await productManager.getAllProducts(limit);
        res.json(products)

    } catch (error) {
        console.log(error)
    }

})

router.get("/:pid", async (req,res)=>{
    try {
        const productid = parseInt(req.params.pid)
        const product = await productManager.getProductsById(productid);
        
    if(product){
        res.json(product)
    } else{
        res.status(404).json({error: "producto no encontrado"})
    }

    } catch (error) {
        console.log(error)
    }

})

// router.post("/", async (req,res)=>{
//     try {
//         const {title, descripcion,code, price,stock,category,thumbnails} = req.body;

//         if(!title||!descripcion||!code|| !price||!stock||!category){
//             return res.status(400).json({error:"Faltan campos del producto"})
//         }
        
//         const product = await productManager.addProduct(title, descripcion,code, price,stock,category,thumbnails);

//         res.status(201).json(product)
        

//     } catch (error) {
//         console.log(error)
//     }

// })

router.post("/", async (req, res) => {
    try {
        const { title, descripcion, code, price, stock, category, thumbnails } = req.body;

        // Validación de campos obligatorios
        if (!title || !descripcion || !code || !price || !stock || !category) {
            return res.status(400).json({ error: "Faltan campos del producto" });
        }

        // Crear el objeto del producto
        const newProductData = {
            title,
            descripcion,
            code,
            price,
            stock,
            category,
            thumbnails
        };

        // Añadir el producto utilizando el método addProduct
        const product = await productManager.addProduct(newProductData);

        res.status(201).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
});


router.put("/:pid", async (req,res)=>{
    try {
        const productId = parseInt(req.params.pid)
        const updateProduct = await productManager.updateProduct(productId,req.body);

        if(updateProduct){
            res.json(updateProduct)
        }else{
            res.status(401).json({error : "Producto no encontrado"})
        }
        

    } catch (error) {
        console.log(error)
    }

})

router.delete("/:pid", async (req,res)=>{
    try {
        const products = parseInt(req.params.pid)
        const deletedProduct = productManager.deleteProduct(productId);

        if(deletedProduct){
            res.json(deletedProduct);
        }else{
            res.status(401).json({error : "Producto no encontrado"})
        }
        

    } catch (error) {
        console.log(error)
    }

})


export default router;

