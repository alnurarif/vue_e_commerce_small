<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useAuthStore } from '../stores/authStore';
import router from '../router/index';

const authStore = useAuthStore()

onBeforeMount(() => {
    authStore.users = JSON.parse(localStorage.getItem('users')) || []
    authStore.loginError = ""
})


const user = reactive({
    'email': '',
    'password': '',
})

const login = () => {
    if (authStore.loginUser(user)) {
        router.push('/order_history')
    } else {
        authStore.loginError = "Email & password didn't match"
    }
}
</script>
<template>
    <section class="bg-gray-50">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"> Sign in to your account</h1>
                    <p v-if="authStore.loginError != ''" class="font-bold text-red-500 mt-1">{{ authStore.loginError }}</p>
                    <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="login()">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input v-model="user.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input v-model="user.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="">
                        </div>
                        <button type="submit" class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">Don’t have an account yet? <RouterLink to="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</RouterLink></p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>