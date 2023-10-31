import { defineStore } from 'pinia';
import { ref } from 'vue';
import productRatingData from '../data/productRatingData';

export const useProductRatingStore = defineStore('ProductRatingStore', () => {
    let productRatingAlways = productRatingData
    if(!localStorage.getItem('product_ratings')){
        localStorage.setItem('product_ratings', JSON.stringify(productRatingAlways))
    }
    const productRatings = ref(JSON.parse(localStorage.getItem('product_ratings')) || [])

    const addProductRating = (rating) => {
        const newProduct = { ...rating };
        let found = productRatings.value.find(p => p.product_id === rating.product_id && p.customer_id === rating.customer_id)
        if(!found){
            productRatings.value.push(newProduct);
        }
        
        localStorage.setItem('product_ratings',JSON.stringify(productRatings.value))
        
    }

    const getProductRatings = (product) => {

        let totalRating =  productRatings.value.reduce((total, r) => {
            return (product.id == r.product_id) ? total + r.rating : total + 0;
          }, 0)
        let ratingsForTheProduct = productRatings.value.reduce((total, r) => {
            return (product.id == r.product_id) ? total + 1 : total + 0;
          }, 0)
          console.log(product, totalRating/ratingsForTheProduct, totalRating, ratingsForTheProduct)
          let totalRatingAverage = (totalRating/ratingsForTheProduct).toFixed(2)
          
        return totalRatingAverage
    }

    const getProductOneStar = (product) => {

        let oneStar = productRatings.value.reduce((total, r) => {
            return (product.id == r.product_id && r.rating == 1) ? total + 1 : total + 0;
          }, 0)
          
        return oneStar
    }

    const getProductTwoStar = (product) => {

        let twoStar = productRatings.value.reduce((total, r) => {
            return (product.id == r.product_id && r.rating == 2) ? total + 1 : total + 0;
          }, 0)
          
        return twoStar
    }

    const getProductThreeStar = (product) => {

        let threeStar = productRatings.value.reduce((total, r) => {
            return (product.id == r.product_id && r.rating == 3) ? total + 1 : total + 0;
          }, 0)
          
        return threeStar
    }

    const getProductFourStar = (product) => {

        let fourStar = productRatings.value.reduce((total, r) => {
            return (product.id == r.product_id && r.rating == 4) ? total + 1 : total + 0;
          }, 0)
          
        return fourStar
    }

    const getProductFiveStar = (product) => {

        let fiveStar = productRatings.value.reduce((total, r) => {
            return (product.id == r.product_id && r.rating == 5) ? total + 1 : total + 0;
          }, 0)
          
        return fiveStar
    }

    const ratingAlreadyGiven = (data) => {
        let found = productRatings.value.find(p => p.product_id === data.product_id && p.customer_id === data.customer_id)
        return (found) ? true : false
    }

    return {
        productRatings, addProductRating, getProductRatings,getProductOneStar, getProductTwoStar, getProductThreeStar, getProductFourStar, getProductFiveStar,ratingAlreadyGiven
    }

});