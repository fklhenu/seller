<template>
	<transition
	    name="decrease-classes-transition"
	    enter-active-class="animated fadeInRight"
	    leave-active-class="animated fadeOutRight"
	>
	<div class="food" v-show="foodShow" ref="foodWrapper">
		<div class="content">
			<div class="image-wrapper">
				<img :src="food.image"/>
				<div class="back"@click="foodHide()">
					<span class="icon-arrow_lift"></span>
				</div>
			</div>
			<div class="message-wrapper">
				<h1 class="title">{{food.name}}</h1>
				<div class="message">
					<span class="sell">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span>
					<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
				<div class="controll-wrapper">
					<cartControll :food="food"></cartControll>
				</div>
				<div class="cart" @click="addFirst()" v-show="!food.count||food.count===0">
					加入购物车
				</div>
			</div>
			<split></split>
			<div class="desc-wrapper">
				<h1 class="title">商品介绍</h1>
				<p class="desc">{{food.info}}</p>
			</div>
			<split></split>
			<div class="rating-wrapper">
				<h1 class="title">商品评价</h1>
				<ratingSelect :selectType="selectType" :ratings="food.ratings" :onlyContent="onlyContent" :desc="desc"></ratingSelect>
				<div class="rating-content">
					<ul v-show="food.ratings&&food.ratings.length">
						<li v-if="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img class="icon" :src="rating.avatar" width="12" height="12"/>
							</div>
							<div class="time">
								{{rating.rateTime | dateFormat}}
							</div>
							<p class="text"><span :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></span>{{rating.text}}</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings||!food.ratings.length">
						暂无评价
					</div>
				</div>
			</div>
		</div>
	</div>
	</transition>
</template>

<script>
	const POSITIVE=0;//推荐
	const NEGATIVE=1;//吐槽
	const ALL=2;//全部
	import BScroll from "better-scroll"
	import cartControll from '@/components/CartControll.vue'
	import Vue from 'vue'
	import split from '@/components/split.vue'
	import ratingSelect from '@/components/ratingSelect.vue'
	import {formatDate} from '@/common/js/date.js'
	export default{
		name:"food",
		data(){
			return{
				foodShow:false,
				selectType:ALL,
				onlyContent:false,
				desc:{
					all:"全部",
					positive:"推荐",
					negative:"吐槽"
				}
			}
		},
		props:{
			food:{
				type:Object
			}
		},
		filters:{
			dateFormat(time){
				//获取当前的时间
				var date=new Date(time)
				return formatDate(date,"yy-MM-dd hh:mm:ss")
			}
		},
		methods:{
			show(){
				this.foodShow=true
				this.selectType=ALL
				this.onlyContent=false
				//滚动
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.foodWrapper,{
						click:true
					})
					}else{
						this.scroll.refresh()
					}
				})
			},
			foodHide(){
				this.foodShow=false
			},
			addFirst(){
				Vue.set(this.food,'count',1)
			},
			needShow(type,text){
				if(this.onlyContent&&!text){
					return false
				}
				if(this.selectType===ALL){
					return true
				}else {
					return this.selectType===type
				}
			},
			ratingSelectType(type){
				this.selectType=type
			},
			contentToggle(content){
				this.onlyContent=content
			}
		},
		created(){
			this.$root.eventHub.$on('selectType',(type)=>{
				this.ratingSelectType(type)
			})
			this.$root.eventHub.$on('selectContent',(content)=>{
				this.contentToggle(content)
			})
		},
		components:{
			cartControll,
			split,
			ratingSelect
		}
		
	}
</script>

<style lang="scss">
@import "../common/style/mixin.scss";
.food{
	position: fixed;
	top: 0;
	left: 0;
	bottom: 48px;
	width: 100%;
	z-index: 30;
	overflow: hidden;
	background: #fff;
	.image-wrapper{
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
		img{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.back{
			position: absolute;
			top: 10px;
			left: 2px;
			.icon-arrow_lift{
				font-size: 16px;
				font-weight: 700;
				color: #fff;
				padding: 10px;
			}
		}
	}
	.message-wrapper{
		position: relative;
		padding: 18px;
		.title{
			font-size: 14px;
			font-weight: 700;
			line-height: 14px;
			color: rgb(7,17,27);
			margin-bottom: 8px;
		}
		.message{
			margin-bottom: 18px;
			.sell,.rating{
				display: inline-block;
				font-size: 10px;
				line-height: 10px;
				color: rgb(147,153,159);
			}
			.rating{
				margin-left: 12px;
			}
		}
		.price{
			.now{
				font-size: 14px;
				line-height: 24px;
				color: rgb(240,20,20);
				font-weight: 700;
			}
			.old{
				font-size: 10px;
				font-weight: 200;
				color: rgb(147,153,159);
				text-decoration: line-through;
				margin-left: 12px;
			}
		}
		.controll-wrapper{
			position: absolute;
			right: 18px;
			bottom: 10px;
		}
		.cart{
			position: absolute;
			bottom: 18px;
			right:18px;
			box-sizing: border-box;
			padding: 6px 12px;
			background: rgb(0,160,220);
			border-radius: 12px;
			color:#ffffff;
			font-size: 10px;
			line-height: 12px;
			vertical-align: top;
		}
	}
	.desc-wrapper{
		padding: 18px;
		.title{
			font-size: 14px;
			line-height: 14px;
			font-weight: 700;
			color: rgb(7,17,27);
			margin-bottom: 6px;
		}
		.desc{
			padding: 0 8px;
			font-size: 12px;
			line-height: 24px;
			font-weight: 200;
			color: rgb(77,85,93);
		}
	}
	.rating-wrapper{
		margin-top: 18px;
		.title{
			font-size: 14px;
			line-height: 14px;
			font-weight: 700;
			color: rgb(7,17,27);
			margin-left: 18px;
			margin-bottom: 18px;
		}
		.rating-content{
			padding: 0 18px;
			.rating-item{
				position: relative;
				padding: 16px 0;
				@include border-1px(rgb(7,17,27,0.1));
				&:last-child{
					@include border-none()
				}
				.user{
					position: absolute;
					top: 16px;
					right: 0;
					.icon{
						display: inline-block;
						vertical-align: top;
						border-radius: 50%;
						margin-left: 6px;
					}
					.name{
						display: inline-block;
						vertical-align: top;
						font-size: 10px;
						line-height: 12px;
						color: rgb(147,153,159);
					}
				}
				.time{
					font-size: 10px;
					line-height: 12px;
					color: rgb(147,153,159);
					margin-bottom: 6px;
				}
				.text{
					font-size: 12px;
					line-height: 24px;
					color:rgb(7,17,27) ;
					.icon-thumb_down,.icon-thumb_up{
						margin-right: 4px;
					}
					.icon-thumb_down{
						color: rgb(147,153,159);
					}
					.icon-thumb_up{
						color: rgb(0,160,220);
					}
				}
			}
			.no-rating{
				color:rgb(7,17,27);
				font-weight: 700;
				font-size: 12px;
			}
		}
	}
}
</style>