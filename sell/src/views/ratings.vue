<template>
	<div class="ratings" ref="ratingWrapper">
		<div class="rating-wrapper">
			<div class="rating-header">
				<div class="header-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">
						综合评分
					</div>
					<div class="rating">
						高于周边商家{{seller.rankRate}}%
					</div>
				</div>
				<div class="header-right">
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star class="star" :score="seller.foodScore" :size="36"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="server-wrapper">
						<span class="title">服务态度</span>
						<star class="star" :score="seller.serviceScore" :size="36"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="time-wrapper">
						<span class="title">送达时间</span>
						
						<span class="text">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingSelect class="ratingSelect" :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></ratingSelect>
			<div class="rating-content">
				<ul>
					<li v-for="rating in ratings" class="rating-item" v-if="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28"/>
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.scroe" class="star"></star>
								<span class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<div class="text">
								{{rating.text}}
							</div>
							<div class="recommend">
								<span :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'"></span>
								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | dateFormat}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	const POSITIVE=0;//推荐
	const NEGATIVE=1;//吐槽
	const ALL=2;//全部
	import BScroll from "better-scroll"
	import axios from "axios"
	import star from '@/components/Star.vue'
	import split from "@/components/split.vue"
	import ratingSelect from "@/components/ratingSelect.vue"
	import {formatDate} from '@/common/js/date.js'
	export default{
		name:'ratings',
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				ratings:[],
				selectType:ALL,
				onlyContent:false
				
			}
		},
		components:{
			star,
			split,
			ratingSelect
		},
		created(){
			axios.get("/data.json").then((res)=>{
				//console.log(res.data.ratings)
				this.ratings=res.data.ratings
				this.$nextTick(()=>{
					this.scroll=new BScroll(this.$refs.ratingWrapper,{
						click:true
					})
				})
			})
			this.$root.eventHub.$on('selectType',(type)=>{
				this.ratingSelectType(type)
			})
			this.$root.eventHub.$on('selectContent',(content)=>{
				this.contentToggle(content)
			})
		},
		methods:{
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
		filters:{
			dateFormat(time){
				//获取当前的时间
				var date=new Date(time)
				return formatDate(date,"yyyy年MM月dd日")
			}
		}
	}
</script>

<style lang="scss">
	@import "../common/style/mixin.scss";
	.ratings{
		position: absolute;
		top: 176px;
		left: 0;
		bottom: 0;
		overflow: hidden;
		.rating-header{
			display: flex;
			padding: 18px 0;
			.header-left{
				flex: 0 0 137px;
				width: 137px;
				text-align: center;
				padding: 6px 0;
				border-right: 1px solid rgba(7,17,27,0.1);
				@media only screen and(max-width:320px){
					flex: 0 0 120px;
					width: 120px;
				}
				.score{
					font-size: 24px;
					line-height: 28px;
					color: rgb(255,153,0);
				}
				.title{
					font-size: 12px;
					font-weight: 700;
					line-height: 12px;
					color: rgb(7,17,27);
					margin: 6px 0 8px 0;
				}
				.rating{
					font-size: 10px;
					line-height: 10px;
					font-weight: 200;
					color:rgba(7,17,27,0.7);
				}
			}
			.header-right{
				margin: 0 24px;
				padding: 6px 0;
				flex: 1;
				font-size: 0;
				@media only screen and(max-width:320px){
					margin:0 0 0 6px;
					}
				.server-wrapper{
					margin: 8px 0;
				}
				.title{
					display: inline-block;
					font-size: 12px;
					color: rgb(7,17,27);
					line-height: 18px;
					vertical-align: top;
					margin-right: 12px;
					@media only screen and(max-width:320px){
						margin-right: 6px;
						}
				}
				.star{
					display: inline-block;
					vertical-align: top;
				}
				.score{
					font-size: 12px;
					line-height: 18px;
					color: rgb(255,153,0);
					margin-left: 12px;
					@media only screen and(max-width:320px){
						margin-left: 6px;
						}
				}
				.text{
					font-size: 12px;
					line-height: 18px;
					color: rgb(147,153,159);
				}
			}
		}
		.ratingSelect{
			margin-top: 18px;
		}
		.rating-content{
			.rating-item{
				position:relative;
				display: flex;
				padding-bottom: 18px;
				margin: 18px;
				@include border-1px(rgba(7,17,27,0.1));
				&:last-child{
					@include border-none()
				}
				.avatar{
					flex: 0 0 28px;
					width: 28px;
					margin-right: 12px;
					img{
						border-radius: 50%;
					}
				}
				.content{
					flex: 1;
					.name{
						font-size: 10px;
						color: rgb(7,17,27);
						line-height: 12px;
						margin-bottom: 4px;
					}
					.star-wrapper{
						margin-bottom: 6px;
						font-size: 0;
						.star{
							display: inline-block;
							vertical-align: top;
							margin-right: 6px;
						}
						.deliveryTime{
							font-size: 10px;
							line-height: 12px;
							color: rgb(147,153,159);
							font-size: 200;
						}
					}
					.text{
						margin-bottom: 8px;
						font-size: 12px;
						line-height: 18px;
						color:rgb(7,17,27) ;
						font-weight: 700;
					}
					.recommend{
						line-height: 16px;
						.icon-thumb_up,.item{
							display: inline-block;
							margin: 0 8px 4px 0;
							font-size: 9px;
						}
						.icon-thumb_up,.icon-thumb_down{
							font-size: 12px;
							color: rgb(0,160,220);
						}
						.icon-thumb_down{
							color:rgb(183,187,191) ;
						}
						.item{
							padding: 0 6px;
							border: 1px solid rgba(7,17,27,0.1);
							border-radius: 2px;
							color: rgb(147,153,159);
							background-color: #FFFFFF;
						}
					}
					.time{
						position: absolute;
						top: 0;
						right: 0;
						font-size: 10px;
						line-height: 12px;
						color:rgb(147,153,159) ;
					}
				}
			}
		}
	}
</style>