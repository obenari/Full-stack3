
class ShoppingList{
    constructor(name){
        this.name=name;
        this.products=[];
    }
    AddProduct(product){
        this.products.push(product);

    }
    deleteProduct(name){
        let index= this.products.indexOf(x=>x.name===name);
        this.products.splice(index,1);
    }
    updateProduct(newProduct){
        let index= this.products.indexOf(x=>x.name===newProduct.name);
        this.products.splice(index,1,newProduct);

    }

}