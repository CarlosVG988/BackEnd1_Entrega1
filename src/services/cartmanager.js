import fs from "fs/promises";
import path from "path";

const cartsFilePath= path.resolve("data","carro.json")

export default class CartManager{
    constructor (){
        this.carts = [];
        this.init()
    }

    async init() {
        try {
            await fs.access(cartsFilePath);
            const data = await fs.readFile(cartsFilePath, "utf-8");
            this.carts = JSON.parse(data);
            console.log(this.carts); // para ver los productos cargados
        } catch (error) {
            console.log('Error al cargar el carro', error);
            this.carts = [];
        }
    }
    


    async saveToFile() {
        await fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
    }
    

    addCart(){}




}

