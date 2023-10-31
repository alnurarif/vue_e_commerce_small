import { defineStore } from 'pinia';
import { ref } from 'vue';
import productsData from '../data/prodcutData';

export const useProductStore = defineStore('ProductStore', () => {
    let productAlways = productsData
    if(!localStorage.getItem('products')){
        localStorage.setItem('products', JSON.stringify(productAlways))
    }
    const products = ref(JSON.parse(localStorage.getItem('products')) || [])

    const addProduct = (product) => {
        const id = Date.now();
        const newProduct = { id, ...product };
        products.value.push(newProduct);
        localStorage.setItem('products',JSON.stringify(products.value))
        
    }

    const totalProducts = () => {
        return products.value.length;
    }

    return {
        products, addProduct, totalProducts
    }

});