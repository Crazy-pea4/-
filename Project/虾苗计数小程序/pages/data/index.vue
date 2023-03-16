<template>
	<view class="dataPage">
		<view class="text">监测数据</view>
		<view class="img">
			<image :src="imgSrc" />
			<view v-show="shrimpSeedNum">
				<text>虾苗数量：</text>
				<text class="num">{{shrimpSeedNum}}</text>
			</view>
		</view>
	</view>
</template>

<!-- 
	http://nnf8xj.natappfree.cc/toReceiveAndPressSave
 -->
<script setup>
	// 关于使用vue3的setup语法糖时，不能直接在里面写页面的生命周期函数，需要从Dcloud引入
	import {
		onShow
	} from '@dcloudio/uni-app';
	import {
		ref
	} from 'vue'

	// 拍摄的图片
	const imgSrc = ref("../../static/empty.png")
	// 虾苗数量
	const shrimpSeedNum = ref(null)

	/*
		这里犯了一个小错误，tabbar间切换不会导致页面销毁，所以onShow钩子外面的代码只会执行一次
	*/
	onShow(() => {
		let flag = uni.getStorageSync('flag')
		if (flag) {
			uni.getStorage({
				key: 'picUrl',
				success({
					data
				}) {
					console.log('data', data);
					imgSrc.value = data;
					uni.setStorageSync('flag', false);
					uni.uploadFile({
						url: 'http://nnf8xj.natappfree.cc/toReceiveAndPressSave',
						name: 'img',
						filePath: data,
						fileType: 'image',
						success(res) {
							setTimeout(() => {
								uni.request({
									url: 'http://nnf8xj.natappfree.cc/getShrimpData',
									success(res) {
										console.log('返回来的数据', res);
									}
								})
							}, 2000)
						},
						fail(err) {
							console.log(err);
						}
					})
				},
			})
		} else {
			console.log('flag是false');
		}
	})
</script>

<style scoped lang="scss">
	.dataPage {
		height: 100vh;

		.text {
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			opacity: 0.6;
			font-size: 40rpx;
			font-weight: 600;
		}

		.img {
			margin-top: 120rpx;
			height: 680rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			view {
				.num {
					opacity: 0.9;
					font-size: 18px;
				}
			}
		}
	}
</style>
