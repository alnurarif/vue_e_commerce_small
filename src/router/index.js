import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ProductDetails from '../views/ProductDetails.vue'
import AddProduct from '../views/AddProduct.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import OrderHistory from '../views/OrderHistory.vue'
import OrderCreated from '../views/OrderCreated.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import {useAuthStore} from '../stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        autProperty: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        autProperty: true
      }
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/product_details/:product_id',
      name: 'product_details',
      component: ProductDetails
    },
    {
      path: '/add_product',
      name: 'add_product',
      component: AddProduct
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/order_history',
      name: 'order_history',
      component: OrderHistory,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/order_created',
      name: 'order_created',
      component: OrderCreated
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !useAuthStore().isAuthenticated()){
    next('/login')
  }

  if(to.meta.autProperty && useAuthStore().isAuthenticated()){
  next('/order_history')
  }
  next()
  
})
export default router
