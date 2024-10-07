import fs from "fs/promises";
import path from "path";

const productosFilePath= path.resolve("data","productos.json")

export default class ProductManager{
    constructor (){
        this.products = [];
        this.init()
    }

    async init() {
        try {
            const data = await fs.readFile(productosFilePath, "utf-8");
            this.products = JSON.parse(data);
            // console.log(this.products); // para ver los productos cargados
        } catch (error) {

            if(error.code == "ENOENT"){
                this.products = [];
                await this.saveToFile();

            }
            console.log('Error al cargar los productos:', error);
            this.products = [];
        }
    }
    


    async saveToFile() {
        await fs.writeFile(productosFilePath, JSON.stringify(this.products, null, 2));
    }
    

    getAllProducts(limit) {
        console.log(this.products); 
        if (limit) {
            return this.products.slice(0, limit);
        }
        return this.products;
    }
    


    getProductsById(productid){
        return this.products.find(product => product.id ===productid)

    }  


    addProduct(product) {
        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            ...product,
            status: true,
        };
        this.products.push(newProduct);
        this.saveToFile();  // Corrección del método llamado
        return newProduct;
    }
    


    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id); 
        
        if (productIndex === -1) return null; 
    
        const updatedProduct = {
            ...this.products[productIndex], 
            ...updatedFields, 
            id: this.products[productIndex].id 
        };
    
        this.products[productIndex] = updatedProduct; 
    
        return updatedProduct; 
    }
    

    deleteProduct(){
        const productIndex = this.product.findIndex(product => productid === id);
        if(productIndex ==-1 ) return null;
        const deleteProduct = this.product.splice(productIndex,1);

        this.saveToFile();
        return deleteProduct[0]
    }






}

