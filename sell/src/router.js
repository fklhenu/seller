import Vue from 'vue'
import Router from 'vue-router'
import Goods from "./views/goods.vue"
import Ratings from "./views/ratings.vue"
import Seller from "./views/seller.vue"



Vue.use(Router)

export default new Router({
  routes: [
   {
   	path:'/',
   	name:"goods",
   	component:Goods
   },
   {
   	path:'/ratings',
   	name:"ratings",
   	component:Ratings
   },
   {
   	path:'/seller',
   	name:'seller',
   	component:Seller
   }
    
  ]
})
