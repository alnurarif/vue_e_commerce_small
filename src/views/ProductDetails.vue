<script setup>
import {ref, reactive,onBeforeMount} from 'vue'
import router from '../router/index';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';
import {useAuthStore} from '../stores/authStore';
import {useRoute, useRouter} from 'vue-router'
import { useProductRatingStore } from '../stores/productRatingStore';
import { useProductReviewStore } from '../stores/productReviewStore';

const cartStore = useCartStore()
const authStore = useAuthStore()
const productStore = useProductStore()
const productRatingStore = useProductRatingStore()
const productReviewStore = useProductReviewStore()


const route = useRoute()
const route2 = useRouter()

let product = ref({})
let loggedInUser = ref({})
let reviewRating = ref({
    review : '',
    rating : 1
})


onBeforeMount(() => {
    loggedInUser.value = authStore.getLoggedInUser()
})

onBeforeMount(() => {
    product.value = productStore.products.find(product => product.id == route.params.product_id)
})

const addProductToCart = () => {
    cartStore.addProductToCart({...product.value})
}
const foundInCart = () => {
    return cartStore.foundInCart({...product.value})
}
const removeProductFromCart = () => {
    cartStore.removeProductFromCart({...product.value})
}
const goToCart = () => {
    route2.push('/cart')
}

const getProductRatings = () => {
    return productRatingStore.getProductRatings({...product.value})
}
const getProductReviews = () => {
    return productReviewStore.getTotalProductReviews({...product.value})
}

const getProductOneStar = () => {
    return productRatingStore.getProductOneStar({...product.value})
}
const getProductTwoStar = () => {
    return productRatingStore.getProductTwoStar({...product.value})
}
const getProductThreeStar = () => {
    return productRatingStore.getProductThreeStar({...product.value})
}
const getProductFourStar = () => {
    return productRatingStore.getProductFourStar({...product.value})
}
const getProductFiveStar = () => {
    return productRatingStore.getProductFiveStar({...product.value})
}
const addRatingAndReview = () => {
    let ratingData = {
        product_id: product.value.id,
        customer_id: loggedInUser.value.id,
        rating: reviewRating.value.rating
      }
    let reviewData = {
        product_id: product.value.id,
        customer_id: loggedInUser.value.id,
        review: reviewRating.value.review
    }
    productRatingStore.addProductRating({...ratingData})
    productReviewStore.addProductReview({...reviewData})
    // productReviewStore.
}
const reviewAlreadyGiven = () => {
    let reviewData = {
        product_id: product.value.id,
        customer_id: loggedInUser?.value?.id,
    }
    return productReviewStore.reviewAlreadyGiven(reviewData)
}
const ratingAlreadyGiven = () => {
    let ratingData = {
        product_id: product.value.id,
        customer_id: loggedInUser?.value?.id,
    }
    return productRatingStore.ratingAlreadyGiven(ratingData)
}
const allReviews = () => {
    return productReviewStore.allReviews({...product.value})
}

const isAuthenticated = () => {
    return authStore.isAuthenticated()
}
</script>
<template>
    <div class="flex">
        
    <div class="w-1/3 p-4">
        <img :src="product.image_link" alt="Product Image" class="w-full h-auto">
    </div>
    
    <div class="w-2/3 p-4">
        <h2 class="text-3xl font-semibold">{{product.title}}</h2>
        <p class=" mt-10 text-xl text-gray-600">{{product.description}}</p>
        <p class="mt-5 text-xl text-gray-600">Quantity: {{product.quantity}}</p>
        

        <p class="mt-5 text-lg font-semibold text-blue-500">Price: ${{product.price}}</p>
        <button class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"  @click="addProductToCart" v-if="!foundInCart()">Add to Cart</button>
        <button class="mt-4 bg-orange-500 text-white px-4 py-2 rounded-full hover:hover:bg-orange-600" @click="goToCart" v-if="foundInCart()">Go To Cart</button>
    </div>

    
    </div>
    <div class="flex">
        <div class="w-1/2">
            <div class="flex items-center mb-4 mt-10">
                <div class="mr-4">
                    <div class="text-4xl font-semibold text-yellow-500">{{getProductRatings()}}</div>
                    <div class="text-gray-600">Average Rating</div>
                </div>
                <div class="flex">
                    <div class="mr-4">
                        <div class="text-2xl font-semibold">{{getProductFiveStar()}}</div>
                        <div class="text-gray-600">5 Stars</div>
                    </div>
                    <div class="mr-4">
                        <div class="text-2xl font-semibold">{{getProductFourStar()}}</div>
                        <div class="text-gray-600">4 Stars</div>
                    </div>
                    <div class="mr-4">
                        <div class="text-2xl font-semibold">{{getProductThreeStar()}}</div>
                        <div class="text-gray-600">3 Stars</div>
                    </div>
                    <div class="mr-4">
                        <div class="text-2xl font-semibold">{{getProductTwoStar()}}</div>
                        <div class="text-gray-600">2 Stars</div>
                    </div>
                    <div>
                        <div class="text-2xl font-semibold">{{getProductOneStar()}}</div>
                        <div class="text-gray-600">1 Star</div>
                    </div>
                </div>
            </div>
            <div class="bg-white mt-14">
                <h2 class="text-xl font-semibold mb-4">Customer Reviews</h2>
                <div class="mb-4" v-for="(review, index) in allReviews()" :key="index">
                    <div class="flex items-center mb-2">
                        <div class="text-2xl font-semibold text-yellow-500 mr-2">#user_{{review.customer_id}}</div>
                        <!-- <div class="text-gray-600">Jane Smith</div> -->
                    </div>
                    <p>{{review.review}}</p>
                </div>
            </div>
        </div>
        <div class="w-1/2">
            <div class="container mx-auto mt-8" v-if="(!reviewAlreadyGiven() && !ratingAlreadyGiven() && isAuthenticated())">
                <h1 class="text-2xl font-semibold mb-4">Product Review</h1>
                <form id="review-form" class="bg-white p-4 shadow-md rounded-lg" @submit.prevent="addRatingAndReview">
                    <div class="mb-4">
                        <label for="rating" class="block text-gray-600">Rating (1 to 5):</label>
                        <input v-model="reviewRating.rating" type="number" id="rating" name="rating" min="1" max="5" class="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-indigo-600" required>
                    </div>
                    <div class="mb-4">
                        <label for="review" class="block text-gray-600">Review:</label>
                        <textarea v-model="reviewRating.review" id="review" name="review" rows="4" class="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-indigo-600" required></textarea>
                    </div>
                    <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Submit Review</button>
                </form>
            </div>
            <div class="min-h-[400px] flex justify-center items-center" v-if="(reviewAlreadyGiven() || ratingAlreadyGiven() && isAuthenticated())">
                <p class="text-red-600 text-lg font-semibold">You have given your review/rating already</p>
            </div>
        </div>
    </div>
</template>