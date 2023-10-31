<script setup>
import {ref, reactive,onBeforeMount, watch} from 'vue'
import router from '../router/index';
import { useProductStore } from '../stores/productStore';
import SingleProductCard from '../components/SingleProductCard.vue';

const productStore = useProductStore()


let items = ref([])
let selectedSort = ref('')
let filter_text = ref('')
let fixedItems = ref([])
const onClickHandler = (page) => {
    console.log(page);
  };

  const currentPage = ref(1);
onBeforeMount(() => {
    items.value = productStore.products.map((product,index) => {
        return {
            "id": product.id,
            "title" : product.title,
            "price" : product.price,
            "description" : product.description,
            "quantity": product.quantity,
            "product_id": product.id,
            "image_link":product.image_link
        }
    })
    fixedItems.value = [...items.value]
})

watch(selectedSort, (newValue) => {
    if(selectedSort.value == 'priceLowToHigh'){
        items.value.sort((a, b) => a.price - b.price);
    }
    if(selectedSort.value == 'priceHighToLow'){
        items.value.sort((a, b) => b.price - a.price);
    }
    if(selectedSort.value == 'nameAscending'){
        items.value.sort((a, b) => a.title.localeCompare(b.title));
    }
    if(selectedSort.value == 'nameDescending'){
        items.value.sort((a, b) => b.title.localeCompare(a.title));
    }
    
})

watch(filter_text, (newValue) => {
    if(filter_text.value == ''){
        items.value = fixedItems.value
        return false;
    }
    let allFoundItems = fixedItems.value.filter((a) => a.title.toLowerCase().includes(filter_text.value))
    allFoundItems = [...allFoundItems,...fixedItems.value.filter((a) => a.description.toLowerCase().includes(filter_text.value))]
    allFoundItems = [...allFoundItems,...fixedItems.value.filter((a) => a.price.toString().includes(filter_text.value))]

    const uniqueProductsMap = new Map();

    for (const product of allFoundItems) {
        uniqueProductsMap.set(product.id, product);
    }

    // Convert the unique Map values back to an array
    const uniqueProducts = Array.from(uniqueProductsMap.values());
    items.value = uniqueProducts

    
})
const headers = [
      { text: "Sl", value: "sl", sortable: true },
      { text: "Image", value: "image" },
      { text: "Title", value: "title", sortable: true },
      { text: "Price", value: "price", sortable: true },
      { text: "Quantity", value: "quantity", sortable: true },
      { text: "Operation", value: "operation" }
    ];
const showDetails = (item)=>{
    router.push(`/product_details/${item.product_id}`)
}

</script>
<template>

    <!-- Sort and Filter Controls -->
    <div class="flex justify-between items-center mb-4">
        <div>
            <label for="sort" class="mr-2">Sort by:</label>
            <select id="sort" class="px-2 py-1 border border-gray-300 rounded" v-model="selectedSort">
                <option value="">Select</option>
                <option value="priceLowToHigh">Price Low to High</option>
                <option value="priceHighToLow">Price High to Low</option>
                <option value="nameAscending">Name Ascending Order</option>
                <option value="nameDescending">Name Descending Order</option>
                

                <!-- Add more sorting options if needed -->
            </select>
        </div>
        <div>
            <label for="filter" class="mr-2">Filter by:</label>
            <input type="text" class="px-2 py-1 border border-gray-300 rounded" v-model="filter_text">
            
        </div>
    </div>

    <!-- Product List -->
    <div id="product-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <SingleProductCard v-for="(product,index) in items" :key="index" :product="product"/>

    </div>
    <!-- Pagination -->
    <!-- <div id="pagination" class="mt-20 flex-wrap">
        <vue-awesome-paginate
        :total-items="fixedItems.length"
        :items-per-page="3"
        :max-pages-shown="2"
        v-model="currentPage"
        :on-click="onClickHandler"
        prev-button-content="Prev"
        next-button-content="Next"
      />
        
    </div> -->
    
    <!-- <header class="bg-white shadow-md p-4 flex justify-between items-center">
        <div>
            <h2 class="text-2xl font-semibold">Products</h2>
        </div>
        
    </header>

    <div class="bg-white shadow-md p-6 mt-4 rounded-lg">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			<div v-for="product in items" :key="product?.id">
				<div class="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
					<img :src="`${product?.image_link}`" alt="" class="w-full h-60 object-cover rounded-t-lg">
					<div class="p-4">
						<h2 class="text-lg font-semibold mb-2">{{ product?.title.slice(0,40) }}</h2>
						<p class="text-gray-600">${{ product?.price }}</p>
						<p class="mt-2">{{ product?.description.slice(0,40) }}...</p>
						<router-link :to="`/product_details/${product?.id}`" class="block mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out text-center">View Details</router-link>
					</div>
				</div>
			</div>
		</div> -->

        

        <!-- <EasyDataTable
        buttons-pagination
            :headers="headers"
            :items="items"
            :rows-per-page="5"
            theme-color="#2563eb"
        >
        <template #item-image="{ image_link }">
            <div class="player-wrapper">
              <img class=" w-20" :src="image_link" alt="" />
            </div>
          </template>
        <template #item-operation="item">
            <div class="operation-wrapper">
                <button type="button" @click="showDetails(item)" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Details</button>
                
            </div>
          </template>
        </EasyDataTable> -->
    <!-- </div> -->
</template>

<style>
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #342ae7;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2d23db;
  }
  .btn {
    height: 40px;
    width: 40px;
    border: none;
    margin-inline: 5px;
    cursor: pointer;
  }
  .back-btn {
    background-color: red;
  }
  .next-btn {
    background-color: red;
  }
  .btn-active {
    background-color: blue;
    color: white;
  }
</style>