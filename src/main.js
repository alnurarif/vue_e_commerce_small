import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";


const app = createApp(App)

app.use(VueAwesomePaginate)
app.use(createPinia())
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable)

app.mount('#app')
