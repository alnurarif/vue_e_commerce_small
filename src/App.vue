<script setup>
import { useProductStore } from './stores/productStore';
import { useCartStore } from './stores/cartStore';
import { useAuthStore } from './stores/authStore';
import router from './router/index';
import { onBeforeMount, ref } from 'vue';

const productStore = useProductStore()

let authenticated = ref(false)


const cartStore = useCartStore()
const totalProductsInCart = () => {
    return cartStore.totalProducts().length
}
const authStore = useAuthStore()
const logoutUser = () => {
    authStore.logoutUser()
    router.push('/login')
}


const isAuthenticated = () => {
    return authStore.isAuthenticated()
}

</script>

<template>
    <header class="bg-white shadow-md p-4">
        <div class="container mx-auto flex justify-between items-center">
            <RouterLink to="/" class="text-2xl font-semibold text-indigo-600">E-Commerce</RouterLink>
            <nav>
                <ul class="flex space-x-6">
                    <li><RouterLink to="/" class="text-indigo-600">Home</RouterLink></li>
                    <li v-if="isAuthenticated()"><RouterLink to="/order_history" class="text-indigo-600">Order History</RouterLink></li>
                    <li><RouterLink to="/cart" class="text-gray-700">Cart <span class=" text-xs bg-indigo-600 text-white rounded-full p-2">{{totalProductsInCart()}}</span></RouterLink></li>
                    <!-- <li><RouterLink to="/checkout" class="text-gray-700">Checkout</RouterLink></li> -->
                    <li v-if="isAuthenticated()"><button @click="logoutUser" class="text-gray-700">Logout</button></li>
                    <li v-if="!isAuthenticated()"><RouterLink to="/login" class="text-gray-700">Login</RouterLink></li>
                </ul>
            </nav>
        </div>
    </header>


    <div class="container mx-auto mt-8 px-10">
        <RouterView />
    </div>

    <footer class="bg-gray-200 py-4 mt-8">
        <div class="container mx-auto text-center">
            <p>&copy; 2023 E-Commerce Store</p>
        </div>
    </footer>
	
</template>

<style scoped></style>
