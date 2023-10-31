
<script setup>
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';
import { onBeforeMount, ref } from 'vue';

const orderStore = useOrderStore()
const authStore = useAuthStore()
const loggedInUser = ref({})

onBeforeMount(() => {
    loggedInUser.value = getLoggedInUser()
})

const getLoggedInUser = () => {
    return authStore.getLoggedInUser()
}

const getAllOrderOfCurrentUser = () => {
    console.log(loggedInUser.value,'hamm')
    return orderStore.getAllOrdersByUser({...loggedInUser.value})
}

const getTotalPriceOfAnOrder = (order) => {
    return order.products.reduce((total, product) => {
            const productPrice = product.price * product.quantity_in_cart;
            return total + productPrice;
          }, 0)

}

const getFormattedTime = (timestamp) => {
    const unixTimestamp = timestamp; 

    const date = new Date(unixTimestamp); 

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate
}





</script>

<template>
    <h1 class="text-2xl font-semibold mb-4">Order History</h1>
    <div class="bg-white shadow-md p-4 min-h-[400px]">
        <div class="mb-2 px-2 py-2 bg-slate-200" v-for="(order, index) in getAllOrderOfCurrentUser()" :key="index">
            <p class="font-semibold">Order #{{order.id}}</p>
            <p>Date: {{getFormattedTime(order.id)}}</p>
            <p>Total: ${{getTotalPriceOfAnOrder(order).toFixed(2)}}</p>
        </div>

        <div class="min-h-[200px] flex justify-center items-center" v-if="getAllOrderOfCurrentUser().length == 0">
            <p class="text-red-600 text-lg font-semibold">No order yet</p>
        </div>
    </div>
</template>