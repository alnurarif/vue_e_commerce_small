import { defineStore } from 'pinia';
import { ref } from 'vue';
// import ordersData from '../data/prodcutData';

export const useOrderStore = defineStore('OrderStore', () => {
    // let productAlways = ordersData
    // if(!localStorage.getItem('orders')){
    //     localStorage.setItem('products', JSON.stringify(productAlways))
    // }
    const orders = ref(JSON.parse(localStorage.getItem('orders')) || [])

    const addOrder = (order) => {
        console.log(order)
        const id = Date.now();
        const newOrder = { id, ...order };
        orders.value.push(newOrder);
        localStorage.setItem('orders',JSON.stringify(orders.value))
        
    }

    const totalProducts = () => {
        return orders.value.products;
    }

    const getAllOrdersByUser = (user) => {
        return orders.value.filter(order => order.customer.id === user.id)
    }

    return {
        orders, addOrder, totalProducts, getAllOrdersByUser
    }

});