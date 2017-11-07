	<template>
	<div class="container-fluid">
	<!-- top -->
	<div class="row text-center">
	<div class="col">
		学习video 只读属性，设置属性，事件
	</div>
	</div>
	<!-- video center -->
	<div class="row justify-content-center" id="videoBOX2">
	<div class="col-xs-6 col-md-10 p-1 border" v-for="(el,index) of videoData">
		<video  
		class="embed-responsive" 
		controls="" 
		id="video"
		ref="video" 
		@click="eee"
		 @ended="videoEndedFn" 
		 @timeupdate="timeChange"
		 >
			<source :src="el.src" type="video/mp4" />
			 Your browser does not support HTML5 video.
		</video>
		
	</div>
	</div>
	<!-- my controllls -->
	<div class="row p-1 border border-success">
	<!-- 播放和暂停 -->
	<div 
		class="col-1 p-0 align-self-center" 
		@click="playORpause" 
		:title="bPlayIco ? '播放' : '暂停' "
	>
		<img :src="playIco" class="img-fluid">
	</div>
	<!-- 播放时间 -->
	<div class="col-1 p-0 align-self-center small text-muted">
		<span v-text="cT" title="当前播放时间"></span>&nbsp;/&nbsp;<span v-text="cAllT" title="视频总时间"></span>
	</div>
	<!-- 进度条 -->
	<div 
		class="col-5 align-self-center p-0"
		title="视频播放进度条"
	>
		<el-slider v-model="t" :max="allT" @change="sliderChange"></el-slider>
	</div>
	<!-- 音量 -->
	<div class="col-1 align-self-center" @click="toggleVolume">
		<img :src="vomumeIco" class="img-fluid">
	</div>
	<div class="col-2 align-self-center">
		<el-slider v-model="videoVolume" :max="1" :step="0.1" @change="videoVolumeChange"></el-slider>
	</div>
	<div class="col-2 align-self-center">
		 <select class="form-control text-center"  v-model="changePlaybackRate">
	        <option 
		        v-for="(el, index) of selectPlaybackRate" 
		        v-text="el+'倍'"
		        :value="el"
	        ></option>
	     </select>
	</div>
	</div>

	<div class="row">
	<div class="col-12 text-center">
		<p>canvas 绘制video的每一帧</p>
		<canvas id="canvas" ref="canvas" style="background:#ccc"></canvas>
	</div>
	</div>
	</div>
	</template>
	<script>
	var {log} = console;
	export default {
		data() {
				return {
					videoData: [{
						src: 'http://ystsj.net:80/ybwsc/upload/2017/10/19//BACKEND/prodImgs/CC7B2AED23BD4D18A1978CB6D5143AE1.mp4'
					}],
					bPlayIco: null,
					allT: 0, //总时间
					t: 0, //当前播放时间
					startTimer: 0, // 滑动播放条数据
					bVolumeIco: null,
					videoVolume: 1, //视频音量
					videoVolume2: null, //用来保存上一个值，好安全返回
					selectPlaybackRate: ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0'], // 播放倍速
					changePlaybackRate: '1.0',
				}
			},
			created() {

			},
			computed: {

				playIco() {
					if (this.bPlayIco) {
						return require('@src/assets/svg/video/play.svg')
					} else {
						return require('@src/assets/svg/video/pause.svg')
					}
				},
				cAllT() { // 返回00:00:00格式
					return this.sTimeChange(this.allT)
				},
				cT() { // 返回00:00:00格式
					return this.sTimeChange(this.t)
				},
				vomumeIco() {
					if (this.bVolumeIco) {
						return require('@src/assets/svg/video/volume0.svg')
					} else {
						return require('@src/assets/svg/video/volume1.svg')
					}
				}
			},
			watch: {
				startTimer(newV) {
					this.$refs.video[0].currentTime = newV;
				},
				videoVolume(newV) {
					this.bVolumeIco = newV === 0 ? true : false;
					this.$refs.video[0].volume = newV;
				},
				changePlaybackRate(newV) {
					// 用户改变 播放频率
					var video = this.$refs.video[0]
					video.playbackRate = newV
				}
			},
			methods: {
				timeChange(e) {
					// 视屏time被更新
					this.t = e.target.currentTime;
					this.eee()
				},
				videoEndedFn(e) {
					// 视频播放结束
					if (e.target.loop) {
						e.target.paly()
					} else {
						this.bPlayIco = true;
					}
				},
				toggleVolume() {
					var video = this.$refs.video[0];
					if (video.volume !== 0) {
						log('关闭音')
						video.volume = 0;
						this.videoVolume2 = this.videoVolume;
						this.videoVolume = video.volume;
						this.bVolumeIco = true;
						return false;
					} else {
						log('开启音')
						video.volume = this.videoVolume;
						this.videoVolume = this.videoVolume2;
						this.bVolumeIco = false;
						return false;
					}
				},
				eee(e) {
					// 把video绘制在canvas上
					var video = $('#video')[0];
					var canvasP = document.createElement('canvas')
					var ctxP = canvasP.getContext('2d');
					canvasP.width = video.offsetWidth;
					canvasP.height = video.offsetHeight;
					ctxP.drawImage(video, 0, 0, canvasP.width, canvasP.height)

					var canvas = $('#canvas').get(0)
					canvas.width = video.offsetWidth
					canvas.height = video.offsetHeight
						// context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
						// [img,video,canvas] 抓取对象
						// sx sy 裁剪位置
						// sw sh 裁剪宽高
						// x y 放置位置
						// w h 放置宽高
					var ctx = canvas.getContext('2d')
					ctx.drawImage(canvasP, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
				},
				sliderChange(int) {
					this.startTimer = int;
				},
				videoVolumeChange(double) {
					this.videoVolume = (double);
				},
				inPlay(b) {
					this.t += 1
					if (b) {
						setTimeout(this.inPlay, 1200);
					}
				},
				playORpause(e) {
					var video = this.$refs.video[0];
					if (video.paused) {
						video.play();
						this.inPlay(true);
						this.bPlayIco = false;
					} else {
						video.pause();
						this.inPlay(false);
						this.bPlayIco = true;
					}
				},
				initPlayIco(video) {
					if (video.paused) {
						// 
						this.bPlayIco = true;
					} else {
						// 
						this.bPlayIco = false;
					}
				},
				initVolumeIco(video) {
					// 静音返回 true,
					video.volume = this.videoVolume;
					this.bVolumeIco = video.volume === 0 ? true : false;
				},
				sTimeChange(timer) {
					var t = timer
					var nowTime = '';
					var hour = 0,
						minute = 0,
						second = 0;
					hour = Math.floor(t / 60 / 60) >= 60 ? Math.floor(t / 60 / 60) : '0' + Math.floor(t / 60 / 60);
					minute = Math.floor(t / 60 % 60) >= 60 ? 　Math.floor(t / 60 % 60) : '0' + Math.floor(t / 60 % 60);
					second = Math.floor(t % 60) >= 10 ? Math.floor(t % 60) : '0' + Math.floor(t % 60);
					nowTime = timer >= (60 * 60) ? hour + ":" + minute + ":" + second : minute + ":" + second;
					return nowTime;
				}
			},
			mounted() {
				this.eee()
				var self = this;
				var video = this.$refs.video[0];
				video.currentTime = 60; //从一分钟的时候开始播放 读取或设置
				$(video).bind('canplay', (e) => { // 判断视频能否播放[bool]
					self.initPlayIco(video); //初始化[播放按钮]
					self.initVolumeIco(video); //初始化[音量控制按钮]
					self.allT = parseInt(video.duration) // video.duration 总时间长度[double]
					self.t = parseInt(video.currentTime); //video.currentTime 当前时间长度[double]
				})

				log(video.autoplay /*获取或设置媒体自动播放[bool]*/ )
				log(video.controls /*获取或设置媒体内置控件[bool]*/ )
				log(video.currentTime /*已播放秒数[double]*/ )
				log(video.muted ? '静音模式' : '非静音模式')
				log(video.networkState /*媒体网络连接状态,0:表示空,1:怎在加载,2:怎在加载元数据,3:加载到第一帧,4加载完成[n]*/ )
				log(video.paused /*当前播放器是否暂停[bool]*/ )
				log(video.playbackRate /*当前的播放速度，可以改变这个值[n]*/ )
				log(video.played /*到目前为止播放的时间范围*/ )
				log(video.readyState /*0:元数据不可用,2:可以显示当前帧,3:可以播放,4:播放没问题*/ )
				log(video.seekable /*可以搜索的时间范围[n]*/ )
				log(video.seeking, '用户是否在媒体中进行查找、跳转[bool]')
				log(video.currentSrc /*媒体文件的来源，随时可以修改*/ )
				log(video.volume /*取得或设置当前音量 0.0静音[double] */ )
					//video.volume=0.1
					// 事件
				$(video).bind('seeking', () => {
					log('正在移动到新位置')
				})
				$(video).bind('seeked', () => {
					this.bPlayIco = false;
					log('搜索结束')
				})
				$(video).bind('abort', (e) => {
					log('下载中断')
				})
				$(video).bind('canplay', () => {
					log('视频可以播放')
				})
				$(video).bind('canplaythrough', () => {
					log('当浏览器可在 不因缓冲而停顿的情况下进行播放时')
				})
				$(video).bind('dataunavailable', () => {
					log('没有数据不能播放')
				})
				$(video).bind('durationchange', () => {
					log('duration属性发生变化，视屏加速播放会改变')
				})
				$(video).bind('emptied', () => {
					alert('网络链接被关闭')
				})
				$(video).bind('empty', () => {
					alert('发生错误阻止了媒体下载')
				})
				$(video).bind('ended', () => {
					log('视屏播放到尾', video.loop ? '循环播放' : '不循环播放')
				})
				$(video).bind('error', () => {
					log('下载期间发生网络错误')
				})
				$(video).bind('loadeddata', () => {
					log('媒体第一帧加载完成')
				})
				$(video).bind('loadedmetadata', () => {
					log('媒体元数据加载完成')
				})
				$(video).bind('loadstart', () => {
					log('下载已开始')
				})
				$(video).bind('pause', () => {
					log('播放已暂停')
				})
				$(video).bind('play', () => {
					log('媒体接收到命令开始播放')
				})
				$(video).bind('playing', () => {
					log('媒体已经实际开始播放')
				})
				$(video).bind('progress', () => {
					log('怎在下载。。。')
				})
				$(video).bind('ratechange', () => {
					log('媒体播放速度改变')
				})
				$(video).bind('seeked', () => {
					log('媒体播放速度改变')
				})
				$(video).bind('stalled', () => {
					log('浏览器怎在下载，但未接收到数据')
				})
				$(video).bind('timeupdate', () => {
					log('currenTime被不合理或意外发生更新')
				})
				$(video).bind('volumechange', () => {
					log('volume属性值或muted属性发生改变')
				})
				$(video).bind('waiting', () => {
					alert('播放暂停，等待下载更多数据')
				})
			}
	}
	</script>
	<style scoped>

	</style>