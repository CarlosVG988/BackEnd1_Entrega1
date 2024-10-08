import fs from "fs/promises";
import path from "path";

const cartsFilePath= path.resolve("data","carros.json")

export default class CartManager{
    constructor (){
        this.carts = [];
        this.init()
    }

    async init() {
        try {
            const data = await fs.readFile(cartsFilePath, "utf-8");
            this.carts = JSON.parse(data);
            // console.log(this.carts); 
        } catch (error) {

            if(error.code == "ENOENT"){
                this.carts = [];
                await this.saveToFile();

            }
            // console.log('Error al cargar el carro', error);
            this.carts = [];
        }
    }
    


    async saveToFile() {
        await fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
    }
    

    addCart(newCartData){
        const newCart = {
            id:this.carts.length ? this.carts[this.carts.length-1].id+1 :1,
            products: newCartData.products 
        }
        this.carts.push(newCart);
        this.saveToFile();
        return newCart;
    }

    getcartById(cartId){
        return this.carts.find (cart => cart.id === cartId)

    }


}

