<script setup>
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import { useProductRatingStore } from '../stores/productRatingStore';
import { useProductReviewStore } from '../stores/productReviewStore';
import { useRouter } from 'vue-router';
let props = defineProps(['product'])


const productStore = useProductStore()
const cartStore = useCartStore()
const productRatingStore = useProductRatingStore()
const productReviewStore = useProductReviewStore()

const addProductToCart = () => {
    cartStore.addProductToCart({...props.product})
}
const foundInCart = () => {
    return cartStore.foundInCart({...props.product})
}
const removeProductFromCart = () => {
    cartStore.removeProductFromCart({...props.product})
}
const getProductRatings = () => {
    return productRatingStore.getProductRatings({...props.product})
}
const getProductReviews = () => {
    return productReviewStore.getTotalProductReviews({...props.product})
}


const route = useRouter()
const goToCart = () => {
    route.push('/cart')
}
</script>

<template>
    <div class="bg-white shadow-md p-4">
        <router-link :to="`/product_details/${product?.id}`">
            <img :src="`${product?.image_link}`" :alt="product?.title.slice(0,30)" class="w-full h-96">
            <h2 class="text-xl font-semibold mt-2">{{ product?.title.slice(0,30) }}</h2>
            <p class="text-gray-600">{{ product?.description.slice(0,50) }}...</p>
            <p class="text-indigo-600 font-semibold mt-2">${{ product?.price }}</p>
            <div class="mx-auto flex">
                <p class="w-1/2 font-semibold mt-2">Rating : {{getProductRatings()}}</p>
                <p class="w-1/2 font-semibold mt-2 text-right">Reviews : {{getProductReviews()}}</p>

            </div>
        </router-link>
        <button class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"  @click="addProductToCart" v-if="!foundInCart()">Add to Cart</button>
        <button class="mt-4 bg-orange-500 text-white px-4 py-2 rounded-full hover:hover:bg-orange-600" @click="goToCart" v-if="foundInCart()">Go To Cart</button>
    </div>
</template>