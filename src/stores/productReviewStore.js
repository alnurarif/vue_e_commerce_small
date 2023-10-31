import { defineStore } from 'pinia';
import { ref } from 'vue';
import productReviewData from '../data/productReviewData';

export const useProductReviewStore = defineStore('ProductReviewStore', () => {
    let productReviewAlways = productReviewData
    if(!localStorage.getItem('product_reviews')){
        localStorage.setItem('product_reviews', JSON.stringify(productReviewAlways))
    }
    const productReviews = ref(JSON.parse(localStorage.getItem('product_reviews')) || [])

    const addProductReview = (review) => {
        const newProduct = { ...review };
        let found = productReviews.value.find(p => p.product_id === review.product_id && p.customer_id === review.customer_id)
        if(!found){
            productReviews.value.push(newProduct);
        }
        
        localStorage.setItem('product_reviews',JSON.stringify(productReviews.value))
        
    }

    const getTotalProductReviews = (product) => {

        let reviewsForTheProduct = productReviews.value.reduce((total, r) => {
            return (product.id == r.product_id) ? total + 1 : total + 0;
          }, 0)

        return reviewsForTheProduct
    }

    const reviewAlreadyGiven = (data) => {
        let found = productReviews.value.find(p => p.product_id === data.product_id && p.customer_id === data.customer_id)
        return (found) ? true : false
    }

    const allReviews = (product) => {
        return productReviews.value.filter(review => review.product_id == product.id)
    }

    return {
        productReviews, addProductReview, getTotalProductReviews, reviewAlreadyGiven, allReviews
    }

});