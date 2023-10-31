<script setup>
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import { useOrderStore } from '../stores/orderStore';
import { computed, ref } from 'vue';
import router from '../router/index';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useAuthStore } from '../stores/authStore';

let props = defineProps(['product'])
let errors = ref({
    name : "",
    phone : "",
    address : ""
})

let checkOutInfo = ref({
    name : "",
    phone : "",
    address : ""
})

const productStore = useProductStore()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const authStore = useAuthStore()

const getLoggedInUser = () => {
    return authStore.getLoggedInUser()
}
const addProductToCart = () => {
    cartStore.addProductToCart({...props.product})
}
const removeProductFromCart = (product) => {
    cartStore.removeProductFromCart({...product})
}
const foundInCart = () => {
    return cartStore.foundInCart({...props.product})
}
const allProductsInCart = () => {
    return cartStore.totalProducts()
}
const decreaseProduct = (id) => {
    cartStore.decreaseProduct(id)
}
const increaseProduct = (id) => {
    cartStore.increaseProduct(id)
}
const totalAmount = () => {
    return cartStore.totalAmount()
}
const checkIsValid = () => {
    let errorsNumber = 0 
    if(checkOutInfo.value.name == ""){
        errors.value.name = "Required"
        errorsNumber++
    }else{
        errors.value.name = ""
    }

    if(checkOutInfo.value.phone == ""){
        errors.value.phone = "Required"
        errorsNumber++
    }else{
        errors.value.phone = ""
    }

    if(checkOutInfo.value.address == ""){
        errors.value.address = "Required"
        errorsNumber++
    }else{
        errors.value.address = ""
    }

    return (errorsNumber > 0) ? false : true
}
const payForTheOrder = () => {
    toast.success('Order place successfully!');
    let isValid = checkIsValid()

    if(!isValid){
        return false
    }
    let order = {
        ...checkOutInfo.value,
        products : allProductsInCart(),
        customer : getLoggedInUser()
    }
    cartStore.removeAllProductFromCart()
    orderStore.addOrder({...order})
    router.push('/order_created')



}
</script>
<template>
    <!-- Checkout Steps -->
    <RouterLink to="/cart" class=" inline-block px-5 py-2 bg-indigo-600 text-white px-2 hover:bg-indigo-700">Back to Cart</RouterLink>
    <div class="container mx-auto mt-8 flex">
        <div class="w-2/3 pr-8">
            <h1 class="text-2xl font-semibold mb-4">Checkout</h1>
            <div id="checkout-steps">
                <!-- Step 1: Shipping Information -->
                <div class="step" id="step-shipping">
                    <h2 class="text-lg font-semibold mb-4">Step 1: Shipping Information</h2>
                    <form id="shipping-form" @submit.prevent="payForTheOrder">
                        <div class="mb-4">
                            <label for="name">Name* <span class="text-red-500 text-xs" v-if="errors.name != ''">{{errors.name}}</span> </label>
                            <input v-model="checkOutInfo.name" type="text" id="name" class="w-full px-3 py-2 border border-gray-300 rounded">
                        </div>
                        <div class="mb-4">
                            <label for="phone">Phone* <span class="text-red-500 text-xs" v-if="errors.phone != ''">{{errors.phone}}</span></label>
                            <input v-model="checkOutInfo.phone" type="text" id="phone" class="w-full px-3 py-2 border border-gray-300 rounded">
                        </div>
                        <div class="mb-4">
                            <label for="address">Address* <span class="text-red-500 text-xs" v-if="errors.address != ''">{{errors.address}}</span></label>
                            <input v-model="checkOutInfo.address" type="text" id="address" class="w-full px-3 py-2 border border-gray-300 rounded">
                        </div>
                        <button class="inline-block px-5 py-2 bg-indigo-600 text-white px-2 hover:bg-indigo-700 w-full text-3xl">Pay</button>
                    </form>
                </div>
    
                <!-- Step 2: Payment Information -->
                <div class="step hidden" id="step-payment">
                    <h2 class="text-lg font-semibold mb-4">Step 2: Payment Information</h2>
                    <form id="payment-form">
                        <div class="mb-4">
                            <label for="card-number">Card Number</label>
                            <input type="text" id="card-number" class="w-full px-3 py-2 border border-gray-300 rounded">
                        </div>
                        <div class="mb-4">
                            <label for="expiration-date">Expiration Date</label>
                            <input type="text" id="expiration-date" class="w-full px-3 py-2 border border-gray-300 rounded">
                        </div>
                        <!-- Add more payment information form fields as needed -->
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Cart Summary -->
        <div class="w-1/3 pl-8 border-l">
            <h2 class="text-xl font-semibold mb-4">Cart Summary</h2>
            <div class="bg-slate-200 shadow-md p-4">
                <!-- Cart summary details (e.g., product names, quantities, prices, total) -->
                <div class="mb-4" v-for="(product, index) in allProductsInCart()" :key="index">
                    <p class="font-semibold">{{product.title}}</p>
                    <p>Quantity: {{product.quantity_in_cart}}</p>
                    <p>Price: ${{product.quantity_in_cart*product.price}}</p>
                </div>
                <!-- Add more product details as needed -->
                <div class="mt-4">
                    <p class="text-lg font-semibold">Total: ${{totalAmount()}}</p>
                </div>


            </div>
        </div>
    </div>
</template>

