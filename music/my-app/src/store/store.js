import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import state from './state.js'

let mutations = {
    callThis (state, that) {
       Vue.set(state,'that', that);
    },
    // 获取swiper和推荐数据
    getImgs (state, data) {
        data.data.v_hot.map( (i, item) => {
            state.swiperImgs.push({
                src: i.cover,
                link: 'https://y.qq.com/n/yqq/playlist/'+ i.content_id +'.html'
            });
            state.hotSongs.push({
                src: i.cover,
                link: 'https://y.qq.com/n/yqq/playlist/'+ i.content_id +'.html',
                title: i.title,
                listen_num: i.listen_num
            });
        });
    },
    // 获取 歌手数据
    getSingers (state, data) {
        // console.log( data)
        state.singerLists = data;
    },
    Escroll (state) {
        let newY = state.scrollY;
        let listH = state.listHeight;
        // top
        if( newY > 0){
            state.currentIndex = 0
            return;
           }
        // center
        for (let i=0; i<listH.length - 1; i++) {
            let H1 = listH[i]
            let H2 = listH[i + 1]
            if (-newY >= H1 && -newY < H2 ) {
                state.currentIndex = i;
                state.diff = H2 + newY;
                return
                }
        }
        // down
        state.currentIndex = listH.length - 2;
    },
    toDetail(state,data){
        var self = this.that;
        /*var {data:{list} } = data;
        var detailData = state.detailData.slice();
        list.forEach(function(item){
            var{ musicData } = item;
            detailData.push(
            {
                id: musicData.songid,
                mid: musicData.songmid,
                singer: musicData.singer[0],
                name: musicData.songname,
                album: musicData.albumname,
                dur: musicData.interval,
                img: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+musicData.singer[0].mid+'.jpg',
                url: `http://ws.stream.qqmusic.qq.com/${musicData.congid}.m4a?fromtag=46`
            }
            );
        });*/
        Vue.set(state,'detailData',data);
    }
}
let actions ={
    callThis ({commit}, that) {
        commit('callThis', that)
    },
    getImgs ({commit}) {
        $.ajax({
            url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
            dataType: 'jsonp',
            data: {
                data:'{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}'
            },
            success: (res) => {
                let recomPlaylist = res.recomPlaylist;// 获取推荐列表
               //  console.log( res )
                commit('getImgs', recomPlaylist);
            },
            error: (err) =>{
                console.log( err.status )
            }
        });
    },
    getSingers ({commit}) {
        $.ajax({
            url: 'https://c.y.qq.com/v8/fcg-bin/v8.fcg',
            dataType: 'jsonp',
            jsonpCallback: 'GetSingerListCallback',
            data: {
                channel:'singer',
                page:'list',
                key:'all_all_all',
                pagesize:'100',
                pagenum:'1',
                g_tk:'5381',
                jsonpCallback:'GetSingerListCallback',
                format:'jsonp'
            },
            success: (res) => {
                let hot_len = 10;
                let hotName = '热门';
                let map = {
                    hot: {
                        title: hotName,
                        items: []
                    }
                }
                let list;// 所有歌手信息
                ({data: {list: list } } = res);// 在数据中提取list

                function* singer ({Fsinger_mid, Fsinger_name}) {
                    yield {
                        id: Fsinger_mid,
                        name: Fsinger_name,
                        src: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000'+ Fsinger_mid+'.jpg'
                    }
                    return;
                }
                
                list.forEach( (item, index) =>{
                    if( index< hot_len){
                       map.hot.items.push( [...singer(item)][0] );
                    }
                   let key = item.Findex; //  姓名头一个字母
                    if(!map[key]){ // 创建
                       map[key] = {
                           title: key,
                           items: []
                       }
                    }
                   map[key].items.push( [...singer(item)][0] );// 填充
                })

                let hot = [],//热门
                    ret = [];//字母排序
                for (let key in map ) {
                    let val =  map[key];
                    if (val.title.match(/[a-zA-Z]/) ) {
                        ret.push(val);
                        }else if(val.title === hotName){
                            hot.push(val)
                        }
                }
                ret.sort( (a,b)=>{
                    // 返回负数false从小到大排序
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                } );
                commit('getSingers', hot.concat(ret) );
                
            },
            error: (err) =>{
                console.log( err.status )
            }
        });
    },
    touch_Rbar ({commit},e) {
        let index = $(e.target).attr('data-index');
        if (index == undefined) {
                return false;
            }
        let self = state.that;
        let firstTouch = e.touches[0];
        
        
        state.touch.y1 = firstTouch.pageY;
        state.touch.startIndex = index;
        state.currentIndex = Number(index)
        self.$refs.listScroll.scrollToElement( self.$refs.lists[index],0 );
    },
    touchmove_Rbar ({commit}, e) {
        let self = state.that;
       let firstTouch = e.touches[0];
       state.touch.y2 = firstTouch.pageY;      
        // 获取y轴偏移量
        let delta = state.touch.y2 - state.touch.y1;
        // li的高度
        let li_list_height = $(self.$refs.ulBox).children().eq(0).height();
        // 获取差值
        delta = delta / li_list_height | 0;
        // 获取index
        let index = Number(state.touch.startIndex) + delta;
        if (index == undefined || index< 0 || index >self.$refs.lists.length-1 ) {
                return false;
            }
        console.log( index )
        state.currentIndex = index
        self.$refs.listScroll.scrollToElement( self.$refs.lists[index],0 );
    },
    Escroll ({commit}, pos) {
        state.listHeight = [];
        state.scrollY = pos.y;
        
        let self = state.that;
        let list = self.$refs.lists;
        let height = 0;
        state.listHeight.push(height)
        for (let i=0; i<list.length; i++){
            let item = list[i]
            height += item.clientHeight;
            state.listHeight.push(height)
        }
        // console.log(state.listHeight  )
        commit('Escroll');
    },
    toDetail ({commit},item){
        if(!item.id){
            self.$router.push({ path: '/index2/'}) 
           return;
           }
        var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
        
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'MusicJsonCallbacksinger_track',
            data: {
                'g_tk':'5381',
                'jsonpCallback':'MusicJsonCallbacksinger_track',
                'format':'jsonp',
                'inCharset':'utf8',
                'outCharset':'utf-8',
                'platform':'yqq',
                'singermid': item.id,
                'order':'listen',
                'begin':'0',
                'num':'30',
                'songstatus':'1',
            },
            success: (res) => {
                commit('toDetail',res);
            },
            error:(err)=>{
                console.log( err.status )
            }
        });
        let self = state.that;
         self.$router.push({ path: '/index2/'+ item.name }) 
    },
    closeDetail ({commit}) {
        let self = state.that;
        self.$router.back();
    }
}

let getters = {
    swiperImgs (state) {
        return state.swiperImgs
    },
    hotSongs (state) {
        return state.hotSongs
    },
    singerLists (state) {
        return state.singerLists;
    }
    ,
    rightBar (state) {
        return state.singerLists.map( (item)=>{
            return item.title.charAt(0);
        })
    },
    currrentIndex (state) {
        return state.currentIndex
    },
    fixedText (state) {
        if (state.scrollY > 0) {
            return false;
            }
        return state.singerLists[ state.currentIndex ]
                ? state.singerLists[ state.currentIndex ].title
                : false
    },
    diff (state) {
        return state.diff;
    },
    detailData(state){
        console.log(state.detailData )
        return state.detailData;
    }
}

export default new Vuex.Store({
    actions,
    getters,
    mutations,
    state
})