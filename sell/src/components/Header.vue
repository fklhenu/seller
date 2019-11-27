<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<div class="name">{{seller.name}}</div>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="supports" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="detailShow(true)">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="detailShow(true)">
			<div class="bulletin-title"></div>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%"  height="100%"/>
		</div>
		<transition name="fade">
		<div class="detail" v-if="show">
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="detail-title">{{seller.name}}</h1>
					<div class="star-wrapper">
						<star :score="seller.score" :size="48"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="supports" v-if="seller.supports">
						<li v-for="item in seller.supports" class="support-item">
							<span class="icon" :class="classMap[item.type]"></span>
							<span class="text">{{item.description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="content">
						{{seller.bulletin}}
					</div>
				</div>
			</div>
			<div class="detail-close" @click="detailShow(false)">
				<i class="icon-close"></i>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
	import star from "../components/Star.vue"
	export default{
		name:"HeaderUI",
		data(){
			return{
				classMap:[],
				show:false
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		created(){
			this.classMap=['decrease','discount','guarantee','invoice','special']
		},
		methods:{
			detailShow(flag){
				this.show=flag
			}
		},
		components:{
			star
		}
	}
</script>

<style lang="scss">
	@import "../common/style/mixin.scss";
	.header{
		color:#fff;
		position:relative;
		background:rgba(7,17,27,0.5);
		overflow:hidden;
		.content-wrapper{
			position:relative;
			padding:24px 16px 18px 24px;
			.avatar{
				display: inline-block;
				vertical-align: top;
				img{
					border-radius: 2px;
				}
			}
			.content{
				display: inline-block;
				margin-left: 16px;
				vertical-align: top;
				font-size: 14px;
				font-weight:200;
				.title{
					margin: 2px 0 8px 0;
					.brand{
						display: inline-block;
						vertical-align: text-top;
						width: 30px;
						height: 18px;
						@include bg-image("../common/img/brand");
						background-size: 30px 18px;
						background-repeat: no-repeat;
					}
					.name{
						display: inline-block;
						vertical-align: top;
						margin-left: 6px;
						font-size: 16px;
						line-height: 18px;
						font-weight: bold;
					}
				}
				.description{
					font-size: 12px;
					line-height: 12px;
					margin-bottom: 10px;
				}
				.supports{
					.icon{
						display: inline-block;
						width:12px ;
						height: 12px;
						margin-right: 4px;
						vertical-align: top;
						background-size: 12px 12px;
						background-repeat: no-repeat;
						&.decrease{
							@include bg-image("../common/img/decrease_1")
						}
						&.discount{
							@include bg-image("../common/img/discount_1")
						}
						&.guarantee{
							@include bg-image("../common/img/guarantee_1")
						}
						&.invoice{
							@include bg-image("../common/img/invoice_1")
						}
						&.special{
							@include bg-image("../common/img/special_1")
						}
						
					}
					.text{
						font-size: 10px;
						line-height: 12px;
						vertical-align: top;
					}
				}
				
			}
			.support-count{
				position:absolute;
				right: 12px;
				bottom: 18px;
				height: 24px;
				line-height: 24px;
				background: rgba(0,0,0,0.2);
				border-radius: 14px;
				text-align: center;
				padding:2px 8px;
				.count{
					font-size: 10px;
					vertical-align: top;
				}
				.icon-keyboard_arrow_right{
					line-height: 24px;
					margin-left: 2px;
					font-size: 10px;
				}
			}
		}
		.bulletin-wrapper{
			position: relative;
			height: 28px;
			line-height: 28px;
			padding: 0 12px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			background: rgba(0,0,0,0.2);
			.bulletin-title{
				width: 22px;
				height: 12px;
				display: inline-block;
				@include bg-image("../common/img/bulletin");
				background-size: 22px 12px;
				vertical-align: middle;
			}
			.bulletin-text{
				font-size: 10px;
				margin:0 4px;
				font-weight: 200;
			}
			.icon-keyboard_arrow_right{
				position: absolute;
				top: 9px;
				right: 8px;
				font-size: 10px;
			}
		}
		.background{
			position: absolute;
			top: 0;
			left: 0;
			width:100%;
			height: 100%;
			z-index: -1;
			filter: blur(10px);
		}
		.fade-enter-active, .fade-leave-active {
		  transition: opacity 1.5s;
		}
		.fade-enter, .fade-leave-to{
		  opacity: 0;
		}
		.detail{
			position:fixed;
			top: 0;
			left: 0;
			text-align: center;
			width: 100%;
			height: 100%;
			overflow: auto;
			z-index: 100;
			background: rgba(7,17,27,0.8);
			.detail-wrapper{
				min-height: 100%;
				min-width: 100%;
				.detail-main{
					margin-top: 64px;
					padding-bottom: 64px;
					.detail-title{
						font-size: 16px;
						font-weight: 700;
						line-height: 16px;
						margin-bottom: 16px;
					}
					.star-wrapper{
						padding: 2px 0;
						text-align: center;
					}
					.title{
						margin: 28px auto 24px auto;
						display: flex;
						width: 80%;
						.line{
							flex: 1;
							position: relative;
							top: -6px;
							border-bottom: 1px solid rgba(255,255,255,0.2);
						}
						.text{
							padding: 0 12px;
							font-weight: 700;
							font-size: 14px;
						}
					}
					.supports{
						width: 80%;
						margin: 0 auto;
						text-align: left;
						.icon{
							display: inline-block;
							width: 12px;
							height: 12px;
							margin-right: 6px;
							background-size: 12px 12px;
							background-repeat: no-repeat;
							&.decrease{
								@include bg-image("../common/img/decrease_1")
							}
							&.discount{
								@include bg-image("../common/img/discount_1")
							}
							&.guarantee{
								@include bg-image("../common/img/guarantee_1")
							}
							&.invoice{
								@include bg-image("../common/img/invoice_1")
							}
							&.special{
								@include bg-image("../common/img/special_1")
							}
							
						}
						.text{
							font-size: 12px;
							line-height:1.5em;
						}
					}
					.content{
						font-size: 12px;
						line-height: 1.5em;
						width: 80%;
						margin: 0 auto;
						text-align: left;
					}
				}
			}
			.detail-close{
				position: relative;
				margin: -64px auto 0 auto;
				font-size: 32px;
				width: 32px;
				height: 32px;
				clear: both;
				
			}
		}
		
	}
</style>