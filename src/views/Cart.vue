<script setup>
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import { computed } from 'vue';
let props = defineProps(['product'])

const productStore = useProductStore()
const cartStore = useCartStore()

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
</script>
<template>
    <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div id="cart-items" class="min-h-[400px] bg-white shadow-md p-4 min-h-102">
            <div class="flex justify-between items-center mb-4 pb-4 border-b " v-for="(product, index) in allProductsInCart()" :key="index">
                <span class="text-lg font-semibold w-1/2">{{product?.title}}</span>
                <div class="flex items-center space-x-4">
                    <button class="bg-indigo-600 text-white px-2 rounded-full hover:bg-indigo-700" @click="decreaseProduct(product?.id)">-</button>
                    <span class="text-lg font-semibold">{{product?.quantity_in_cart}}</span>
                    <button class="bg-indigo-600 text-white px-2 rounded-full hover-bg-indigo-700" @click="increaseProduct(product?.id)">+</button>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-lg font-semibold">${{(product?.price * product?.quantity_in_cart).toFixed(2)}}</span>
                    <button class="text-red-600 font-semibold" @click="removeProductFromCart(product)">Remove</button>
                </div>
            </div>
            <div class="min-h-[200px] flex justify-center items-center" v-if="allProductsInCart().length == 0">
                <p class="text-red-600 text-lg font-semibold">No products added to the cart yet</p>
            </div>
        </div>

        <div class="flex justify-between items-center mt-4">
            <p class="text-xl font-semibold" v-if="totalAmount() > 0">Total: <span id="total-price">${{totalAmount()}}</span></p>
            <RouterLink to="/checkout" class="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700" v-if="allProductsInCart().length > 0">Checkout</RouterLink>
        </div>
</template>

