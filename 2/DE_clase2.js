class ProductManager {
    constructor(products){
        this.products = [products];
    }

    // metodo para agregar productos
    addProduct = (products) =>{

        //Creo Id desde el Time del sistema
        const milisegundos = new Date();
        let id = milisegundos.getTime();

        this.products.push(products);
    }

    getProducts = (products) =>{
        console.log(getTime())
    }
}



//Creo la instancia
let productos = new ProductManager();
console.log(productos);

//productos.addProduct({title:"producto prueba",description:"Este es un producto prueba",price:200,thumbnail:"Sin imagen",code:"abc123",stock:25});
console.log(productos);

