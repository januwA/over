import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let state = {
    imgs: []
}

let mutations = {
    getImgs (state, data) {
        console.log(data.data.v_hot );
        data.data.v_hot.map( (i, item) => {
            // console.log( i.content_id, i.cover )
            state.imgs.push({
                src: i.cover,
                link: 'https://y.qq.com/n/yqq/playlist/'+ i.content_id +'.html'
            });
        });
       /* Vue.set(state, 'imgs',{
            src: data.data.v_hot.cover,
            link: 'https://y.qq.com/n/yqq/playlist/'+ data.data.v_hot.content_id +'.html'
        } );
        console.log( state.imgs)*/
    } 
}
let actions ={
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
    }
}

let getters = {
    imgs (state) {
        return state.imgs
    }
    
}

export default new Vuex.Store({
    actions,
    getters,
    mutations,
    state
})