import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('CartStore', () => {
    
    let products = ref(JSON.parse(localStorage.getItem('products_to_cart')) || [])

    const addProductToCart = (product) => {

        let foundProduct = products.value.find(singleProduct => singleProduct.id === product.id)
        product.quantity_in_cart = 1
        if(!foundProduct){
            products.value.push(product);
        }

        localStorage.setItem('products_to_cart', JSON.stringify(products.value))
        
    }

    const removeProductFromCart = (product) => {
        let newProducts = products.value.filter(singleProduct => singleProduct.id !== product.id)
        products.value = newProducts
        localStorage.setItem('products_to_cart',JSON.stringify(products.value))
        
    }

    const removeAllProductFromCart = () => {
        products.value = []
        localStorage.removeItem('products_to_cart')
    }

    const totalProducts = () => {
        return products.value;
    }

    const foundInCart = (product) => {
        let foundProduct = products.value.find(singleProduct => singleProduct.id === product.id)
        return (foundProduct) ? true : false
    }

    const decreaseProduct = (id) => {
        let foundProduct = products.value.find(product => product.id === id && product.quantity_in_cart > 1)
        let newProducts = []
        if(foundProduct){
            newProducts = products.value.map((product) => {
                if(product.id == id){
                    product.quantity_in_cart = product.quantity_in_cart - 1
                }
                return product
            })

        }else{
            newProducts = products.value.filter(product => product.id != id)
        }
        products.value = newProducts
        localStorage.setItem('products_to_cart',JSON.stringify(products.value))


    }
    const increaseProduct = (id) => {
        let newProducts = products.value.map((product) => {
            if(product.id == id){
                product.quantity_in_cart = product.quantity_in_cart + 1
            }
            return product
        })

        products.value = newProducts
        localStorage.setItem('products_to_cart',JSON.stringify(products.value))

    }

    const totalAmount = () => {
        return products.value.reduce((total, product) => {
            const productPrice = product.price * product.quantity_in_cart;
            return total + productPrice;
          }, 0)
    }

    return {
        products, removeAllProductFromCart, addProductToCart, totalProducts, removeProductFromCart, foundInCart,decreaseProduct, increaseProduct, totalAmount
    }

});