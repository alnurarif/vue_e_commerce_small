<script setup>
import {ref, reactive} from 'vue'
import { useProductStore } from '../stores/productStore';
import router from '../router/index.js'

const productStore = useProductStore()

let product = ref({
	title: '',
	description: '',
	price: '',
	quantity: '',
	image_link: '',
})

const addProdcut = ()=>{
	productStore.addProduct({...product.value })
	product.value = {
		title: '',
		description: '',
		price: '',
		quantity: '',
		image_link: '',
	}
	router.push('/')
}


</script>
<template>
	
	<form @submit.prevent="addProdcut">
		<div class="mb-6">
			<label for="title" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
			<input v-model="product.title" type="text" id="title"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
		</div>
		<div class="mb-6">
			<label for="description"
				class="block mb-2 text-sm font-medium text-gray-900">Description</label>
			<input v-model="product.description" type="text" id="description"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
		</div>
		<div class="mb-6">
			<label for="price"
				class="block mb-2 text-sm font-medium text-gray-900">Price</label>
			<input v-model="product.price" type="number" id="price"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
		</div>
		<div class="mb-6">
			<label for="quantity"
				class="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
			<input v-model="product.quantity" type="number" id="quantity"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
		</div>
		<div class="mb-6">
			<label for="image_link"
				class="block mb-2 text-sm font-medium text-gray-900">Image Link</label>
			<input v-model="product.image_link" type="text" id="image_link"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
		</div>
		<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
	</form>
</template>