<template>
	<div class="cartcontrol">
		<transition
		    name="decrease-classes-transition"
		    enter-active-class="animated rotateInDownRight"
		    leave-active-class="animated rollOut"
		  >
		<div class="decrease" v-show="food.count>0" @click="addDecrease">
			<i class="icon-remove_circle_outline"></i>
		</div>
		</transition>
		<transition
		    name="count-classes-transition"
		    enter-active-class="animated rotateInDownRight"
		    leave-active-class="animated rollOut"
		  >
		<div class="num" v-show="food.count>0">
			{{food.count}}
		</div>
		</transition>
		<div class="add" @click="addCart">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	export default{
		name:'cartcontroll',
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			addCart(){
				//判断
				if(!this.food.count){
					Vue.set(this.food,'count',1)
				}else{
					this.food.count++
				}
				//派发一个事件
				this.$root.eventHub.$emit('cart_add', event.target)
			},
			addDecrease(){
				if(this.food.count>0){
				this.food.count--
				}
			}
			
		}
	}
</script>

<style lang="scss">
.cartcontrol{
	z-index: 10;
	.decrease,.add{
		vertical-align: top;
		display: inline-block;
		padding: 6px;
		font-size: 24px;
		line-height: 24px;
		color: rgb(0,160,220);
	}
	.num{
		vertical-align: top;
		display: inline-block;
		width: 12px;
		font-size: 10px;
		margin-top: 7px;
		padding-top: 6px;
		text-align: center;
		color: rgb(147,153,159);
		font-weight: 200;
	}
}
</style>