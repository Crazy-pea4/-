<template>
	<view class="homePage">
		<view class="icon">
			<image src="../../static/xia.png"></image>
			<text>智能数虾小程序</text>
		</view>
		<view class="photo">
			<view class="choosePic">
				<image src="../../static/pic.png" @click="getPicture" class="a" />
				<text>选择照片</text>
			</view>
			<view class="takePic">
				<image src="../../static/camera1.png" @click="takePicture" class="b" />
				<text>拍摄照片</text>
			</view>
		</view>
		<view class="pic_wave">
			<image src="../../static/wave2.jpg"></image>
		</view>
	</view>
</template>

<script setup>
	let getPicture = function() {
		uni.chooseImage({
			count: 1,
			sourceType: ['album'],
			success: (res) => {
				console.log(res);
				// 传一个标识，防止每次打开data页都发一次图片
				uni.setStorageSync('flag', true)
				uni.setStorage({
					key: 'picUrl',
					data: res.tempFilePaths[0],
					success() {
						console.log('存图片成功');
						uni.switchTab({
							url: `/pages/data/index`,
						})
					}
				})
			}
		});
	}
	let takePicture = function() {
		uni.chooseImage({
			count: 1,
			sourceType: ['camera'],
			success(res) {
				console.log(res);
				// 传一个标识，防止每次打开data页都发一次图片
				uni.setStorageSync('flag', true)
				uni.setStorage({
					key: 'picUrl',
					data: res.tempFilePaths[0],
					success() {
						console.log('存图片成功');
						uni.switchTab({
							url: `/pages/data/index`,
						})
					}
				})
			}
		})
	}
</script>

<style scoped lang="scss">
	.homePage {
		position: relative;
		height: 100vh;

		.icon {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			opacity: 0.6;

			image {
				width: 200rpx;
				height: 200rpx;
			}

			text {
				font-weight: 600;
			}
		}

		.photo {
			height: 260rpx;
			margin-top: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			opacity: 0.6;


			.choosePic,
			.takePic {
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				image {
					width: 220rpx;
					height: 100%;
					border: 4px dashed black;
					border-radius: 15rpx;
				}
				
				text {
					margin-top: 20rpx;
				}
			}
		}

		.pic_wave {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;

			image {
				width: 100%;
				height: 320rpx;
			}
		}
	}
</style>
